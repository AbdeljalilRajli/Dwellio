import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Shield, Home, HeadphonesIcon, TrendingUp, ChevronDown } from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring, animate, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { PropertyCard } from '../components/ui/PropertyCard';
import { SkeletonListing } from '../components/ui/SkeletonListing';
import { listingService } from '../services/listingService';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

// Reusable animated counter component
function AnimatedCounter({ value, duration = 2 }: { value: string, duration?: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const count = useMotionValue(0);
    const rounded = useSpring(count, { stiffness: 50, damping: 20 });
    const [display, setDisplay] = useState('0');

    // Parse numeric part of value (e.g., "2,500+" -> 2500)
    const numericTarget = parseInt(value.replace(/[^0-9]/g, ''), 10);
    const suffix = value.replace(/[0-9,]/g, '');

    useEffect(() => {
        if (inView) {
            animate(count, numericTarget, { duration, ease: "easeOut" });
        }
    }, [inView, count, numericTarget, duration]);

    useEffect(() => {
        return rounded.on("change", (latest) => {
            setDisplay(Math.floor(latest).toLocaleString() + suffix);
        });
    }, [rounded, suffix]);

    return <span ref={ref}>{display}</span>;
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

function FAQItem({ question, answer, index }: { question: string; answer: string, index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div
            layout
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ 
                y: -5,
                borderColor: 'rgba(124, 92, 68, 0.4)',
                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)'
            }}
            variants={fadeInUp}
            className="rounded-[32px] p-6 lg:p-8 transition-all duration-300 border mb-4 bg-white overflow-hidden"
            style={{ 
                borderColor: isOpen ? '#7C5C44' : '#F0E6DB',
                background: isOpen ? '#FDFBFA' : '#FFF'
            }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-start justify-between w-full text-left group"
            >
                <div className="flex gap-6 items-start">
                    <span className="text-[13px] font-bold opacity-30 mt-1.5" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-bold transition-colors group-hover:text-[#7C5C44] pr-8" style={{ fontFamily: "'Cormorant', serif", color: '#1A1A1A' }}>
                        {question}
                    </h3>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0, backgroundColor: isOpen ? '#7C5C44' : 'transparent' }}
                    className="flex-shrink-0 w-8 h-8 rounded-full border border-[#EDE0D5] flex items-center justify-center transition-colors"
                >
                    <ChevronDown size={18} style={{ color: isOpen ? '#FFF' : '#7C5C44' }} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="pt-6 ml-11 text-[16px] leading-relaxed opacity-60" style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}>
                            {faq_answers[question] || answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

const faq_answers: Record<string, string> = {
    "How do I list my property on Dwellio?": "Simply create an account and head to your dashboard. Click the 'List a Property' button to fill in the details, set your price, and upload high-quality images.",
    "Is there a fee for using the platform?": "Browsing listings and contacting property owners is completely free. We believe in making the search for your next home as accessible as possible.",
    "Are the property listings verified?": "Every listing undergoes a manual review process to maintain our high standards. However, we always recommend a physical visit before making any financial commitments.",
    "How do I contact a property owner?": "Each property details page includes a direct inquiry form. Once submitted, the owner receives an instant notification in their Dwellio inbox.",
    "Can I save my favorite properties?": "Yes! By clicking the heart icon on any property card, you can save it to your personalized Favorites list for quick access at any time.",
    "What cities does Dwellio cover?": "We focus on premium residences across Morocco's most iconic destinations, including Marrakech, Casablanca, Rabat, Tangier, and Agadir."
};

export default function HomePage() {
    const { data: listings, isLoading } = useQuery({
        queryKey: ['listings'],
        queryFn: () => listingService.getAllListings(),
    });

    const featuredSale = listings?.filter(l => l.type === 'Sale').slice(0, 3) ?? [];


    return (
        <div className="min-h-screen" style={{ background: '#FBF8F5' }}>
            <Navbar />

            {/* Hero */}
            <HeroSection />

            {/* Featured For Sale */}
            <section className="py-24 max-w-7xl mx-auto px-5 sm:px-8 overflow-hidden">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="flex items-end justify-between mb-16"
                >
                    <div className="space-y-2">
                        <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "'Quicksand', sans-serif", color: '#7C5C44' }}>
                            Premium Collection
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'Cormorant', serif", color: '#1A1A1A', letterSpacing: '-0.04em' }}>
                            Featured Properties <span className="text-[#7C5C44]">For Sale</span>
                        </h2>
                    </div>
                    <Link
                        to="/properties?type=Sale"
                        className="hidden sm:flex items-center gap-3 px-6 py-3 rounded-full border border-[#EDE0D5] text-[13px] font-bold uppercase tracking-widest transition-all text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A]"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                    >
                        Explore More <ArrowRight size={16} />
                    </Link>
                </motion.div>

                <motion.div
                    key={isLoading ? 'loading' : 'ready'}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {isLoading ? (
                        Array(3).fill(0).map((_, i) => <SkeletonListing key={i} />)
                    ) : (
                        featuredSale.map(listing => (
                            <motion.div key={listing.id} variants={fadeInUp}>
                                <PropertyCard listing={listing} />
                            </motion.div>
                        ))
                    )}
                </motion.div>
                <Link
                    to="/properties?type=Sale"
                    className="sm:hidden flex items-center justify-center gap-2 mt-10 text-[13px] font-bold uppercase tracking-widest py-4 rounded-xl border border-[#EDE0D5]"
                    style={{ fontFamily: "'Quicksand', sans-serif", color: '#7C5C44' }}
                >
                    View All For Sale <ArrowRight size={16} />
                </Link>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 overflow-hidden" style={{ background: '#F5EEE8' }}>
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <p className="text-[12px] font-bold uppercase tracking-[0.25em] mb-4" style={{ fontFamily: "'Quicksand', sans-serif", color: '#7C5C44' }}>
                            The Dwellio Advantage
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "'Cormorant', serif", color: '#1A1A1A', letterSpacing: '-0.04em' }}>
                            Excellence in <span className="text-[#7C5C44]">Every Detail</span>
                        </h2>
                        <p className="text-[18px] leading-relaxed opacity-60" style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}>
                            We set the gold standard for real estate in Morocco, bridging the gap between historical charm and contemporary luxury.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        >
                            {[
                                { icon: Shield, title: 'Verified Listings', desc: 'Pre-vetted properties ensuring security and peace of mind.' },
                                { icon: Home, title: 'Bespoke Selection', desc: 'Hand-picked portfolio of Morocco\'s most iconic residences.' },
                                { icon: HeadphonesIcon, title: 'Expert Guidance', desc: 'Concierge-level service tailored to your lifestyle.' },
                                { icon: TrendingUp, title: 'Wealth Strategy', desc: 'Advanced analytics for high-yield real estate investments.' },
                            ].map(item => (
                                <motion.div
                                    variants={fadeInUp}
                                    key={item.title}
                                    className="bg-white rounded-[32px] p-8 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 group"
                                    style={{ border: '1px solid #F0E6DB' }}
                                >
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#1A1A1A]"
                                        style={{ background: '#F5EEE8' }}
                                    >
                                        <item.icon size={26} className="transition-colors duration-300 group-hover:text-white" style={{ color: '#7C5C44' }} />
                                    </div>
                                    <h3 className="text-[18px] font-bold mb-3" style={{ fontFamily: "'Cormorant', serif", color: '#1A1A1A' }}>
                                        {item.title}
                                    </h3>
                                    <p className="text-[14px] leading-relaxed opacity-50" style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}>
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000"
                                className="w-full h-full object-cover"
                                alt="Luxury Service"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10 p-8 rounded-[32px] bg-white/10 backdrop-blur-2xl border border-white/20">
                                <p className="text-white text-lg italic leading-relaxed font-light" style={{ fontFamily: "'Cormorant', serif" }}>
                                    "Dwellio isn't just a platform; it's the gateway to a refined Moroccan life."
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Popular Cities */}
            <section className="py-24 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="flex items-end justify-between mb-16"
                    >
                        <div className="space-y-2">
                            <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "'Quicksand', sans-serif", color: '#7C5C44' }}>
                                Discover the Kingdom
                            </p>
                            <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'Cormorant', serif", color: '#1A1A1A', letterSpacing: '-0.04em' }}>
                                Iconic <span className="text-[#7C5C44]">Destinations</span>
                            </h2>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="-mx-5 sm:-mx-8 px-5 sm:px-8"
                    >
                        <Swiper
                            modules={[FreeMode, Autoplay]}
                            freeMode={true}
                            grabCursor={true}
                            slidesPerView="auto"
                            spaceBetween={24}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            className="w-full !overflow-visible group/swiper"
                        >
                            {[
                                { city: 'Marrakech', img: '/images/cities/marrakech.jpg' },
                                { city: 'Casablanca', img: '/images/cities/casablanca.jpg' },
                                { city: 'Rabat', img: '/images/cities/rabat.jpg' },
                                { city: 'Tangier', img: '/images/cities/tangier.jpg' },
                                { city: 'Agadir', img: '/images/cities/agadir.jpg' },
                                { city: 'Essaouira', img: '/images/cities/essaouira.jpg' },
                                { city: 'Fes', img: '/images/cities/fes.jpg' },
                            ].map((item) => {
                                const cityCount = listings?.filter(l => l.city === item.city).length || 0;
                                return (
                                    <SwiperSlide key={item.city} className="!w-[280px] sm:!w-[340px]">
                                        <Link
                                            to={`/properties?city=${item.city}`}
                                            className="group relative h-[450px] rounded-[32px] overflow-hidden block"
                                        >
                                            <img
                                                src={item.img}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                alt={item.city}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity group-hover:opacity-80" />

                                            <div className="absolute bottom-8 left-8 right-8">
                                                <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Cormorant', serif" }}>
                                                    {item.city}
                                                </h3>
                                                <p className="text-[13px] font-bold text-[#EDE0D5] uppercase tracking-widest opacity-70">
                                                    <AnimatedCounter value={`${cityCount}`} /> Listings
                                                </p>
                                            </div>

                                            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                                <ArrowRight size={20} className="text-white" />
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-28 overflow-hidden" style={{ background: '#FBF8F5' }}>
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <p className="text-[12px] font-bold uppercase tracking-[0.25em] mb-3" style={{ fontFamily: "'Quicksand', sans-serif", color: '#7C5C44' }}>
                            Client Stories
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'Cormorant', serif", color: '#1A1A1A', letterSpacing: '-0.04em' }}>
                            What Our <span className="text-[#7C5C44]">Clients Say</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                name: 'Sarah Mitchell',
                                role: 'Property Investor',
                                text: 'Dwellio made finding our dream investment property effortless. The curated listings and attention to detail are unmatched. We closed on a stunning villa within weeks.',
                                rating: 5,
                                avatar: 'S'
                            },
                            {
                                name: 'James Thornton',
                                role: 'First-time Buyer',
                                text: 'As a first-time buyer, I was overwhelmed by the process. Dwellio simplified everything — from browsing to connecting with sellers. Couldn\'t recommend it more.',
                                rating: 5,
                                avatar: 'J'
                            },
                            {
                                name: 'Elena Rodriguez',
                                role: 'Relocating Professional',
                                text: 'Relocating to a new city was stressful until I found Dwellio. The platform\'s filtering and direct messaging features helped me find the perfect apartment fast.',
                                rating: 5,
                                avatar: 'E'
                            }
                        ].map((testimonial, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="relative bg-white rounded-[2rem] p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2"
                                style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.04)', border: '1px solid #F0E6DB' }}
                            >
                                {/* Quote mark */}
                                <div className="absolute top-6 right-8 text-[80px] font-bold leading-none select-none" style={{ fontFamily: "'Cormorant', serif", color: '#F0E6DB' }}>"</div>

                                {/* Stars */}
                                <div className="flex gap-1 mb-6">
                                    {Array(testimonial.rating).fill(0).map((_, j) => (
                                        <svg key={j} className="w-4 h-4" viewBox="0 0 20 20" fill="#F59E0B">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Text */}
                                <p className="text-[15px] leading-relaxed mb-8 relative z-10" style={{ fontFamily: "'Quicksand', sans-serif", color: '#555' }}>
                                    {testimonial.text}
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[16px] font-bold" style={{ background: '#7C5C44' }}>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="text-[15px] font-bold" style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}>
                                            {testimonial.name}
                                        </p>
                                        <p className="text-[12px] font-bold uppercase tracking-widest" style={{ fontFamily: "'Quicksand', sans-serif", color: '#AAA' }}>
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 overflow-hidden" style={{ background: '#FBF8F5' }}>
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <p className="text-[12px] font-bold uppercase tracking-[0.25em] mb-3" style={{ fontFamily: "'Quicksand', sans-serif", color: '#7C5C44' }}>
                            Support & Info
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'Cormorant', serif", color: '#1A1A1A', letterSpacing: '-0.04em' }}>
                            Frequently Asked <span className="text-[#7C5C44]">Questions</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                        {[
                            { q: "How do I list my property on Dwellio?", a: "" },
                            { q: "Is there a fee for using the platform?", a: "" },
                            { q: "Are the property listings verified?", a: "" },
                            { q: "How do I contact a property owner?", a: "" },
                            { q: "Can I save my favorite properties?", a: "" },
                            { q: "What cities does Dwellio cover?", a: "" }
                        ].map((faq, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                custom={i}
                            >
                                <FAQItem question={faq.q} answer={faq_answers[faq.q] || ""} index={i} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden" style={{ background: '#1A1A1A' }}>
                {/* Background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #7C5C44, transparent 70%)' }} />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #4A3528, transparent 70%)' }} />
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                </div>

                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-32 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <p className="text-[12px] font-bold uppercase tracking-[0.25em] mb-6" style={{ fontFamily: "'Quicksand', sans-serif", color: '#7C5C44' }}>
                                Start Today
                            </p>
                            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-[1.05]" style={{ fontFamily: "'Cormorant', serif", color: '#fff', letterSpacing: '-0.04em' }}>
                                Begin Your Search for the{' '}
                                <span className="italic font-light" style={{ color: '#EDE0D5' }}>Extraordinary.</span>
                            </h2>
                            <p className="text-[17px] leading-relaxed mb-10 max-w-lg" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.5)' }}>
                                Discover properties that match your lifestyle. Whether you're looking for a modern apartment or a luxury villa, your perfect home is just a click away.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                                    <Link
                                        to="/properties"
                                        className="block px-10 py-5 text-[14px] font-bold uppercase tracking-widest rounded-2xl text-[#1A1A1A] text-center transition-all hover:shadow-2xl"
                                        style={{ fontFamily: "'Quicksand', sans-serif", background: '#EDE0D5' }}
                                    >
                                        Explore Collection
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                                    <Link
                                        to="/contact"
                                        className="block px-10 py-5 text-[14px] font-bold uppercase tracking-widest rounded-2xl text-white text-center border border-white/20 transition-all hover:bg-white/5"
                                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                                    >
                                        Contact Us
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right — Stats cards */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                            className="grid grid-cols-2 gap-5"
                        >
                            {[
                                { value: '2,500+', label: 'Listed Properties' },
                                { value: '98%', label: 'Client Satisfaction' },
                                { value: '150+', label: 'Cities Covered' },
                                { value: '24/7', label: 'Support Available' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-1"
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                                >
                                    <p className="text-3xl sm:text-4xl font-bold mb-2" style={{ fontFamily: "'Cormorant', serif", color: '#EDE0D5' }}>
                                        {stat.value}
                                    </p>
                                    <p className="text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.4)' }}>
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
