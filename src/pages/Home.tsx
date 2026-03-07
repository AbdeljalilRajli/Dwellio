import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Shield, Home, HeadphonesIcon, TrendingUp, MapPin, Star } from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { PropertyCard } from '../components/ui/PropertyCard';
import { SkeletonListing } from '../components/ui/SkeletonListing';
import { listingService } from '../services/listingService';

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

export default function HomePage() {
    const { data: listings, isLoading } = useQuery({
        queryKey: ['listings'],
        queryFn: () => listingService.getAllListings(),
    });

    const featuredSale = listings?.filter(l => l.type === 'Sale').slice(0, 3) ?? [];
    const featuredRent = listings?.filter(l => l.type === 'Rent').slice(0, 3) ?? [];

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
                        <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#7C5C44' }}>
                            Premium Collection
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A', letterSpacing: '-0.04em' }}>
                            Featured Properties <span className="text-[#7C5C44]">For Sale</span>
                        </h2>
                    </div>
                    <Link
                        to="/properties?type=Sale"
                        className="hidden sm:flex items-center gap-3 px-6 py-3 rounded-full border border-[#EDE0D5] text-[13px] font-bold uppercase tracking-widest transition-all hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A' }}
                    >
                        Explore More <ArrowRight size={16} />
                    </Link>
                </motion.div>

                <motion.div
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
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#7C5C44' }}
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
                        <p className="text-[12px] font-bold uppercase tracking-[0.25em] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#7C5C44' }}>
                            The Dwellio Advantage
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A', letterSpacing: '-0.04em' }}>
                            Excellence in Every Detail
                        </h2>
                        <p className="text-[18px] leading-relaxed opacity-60" style={{ fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}>
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
                                    <h3 className="text-[18px] font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A' }}>
                                        {item.title}
                                    </h3>
                                    <p className="text-[14px] leading-relaxed opacity-50" style={{ fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}>
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
                                <p className="text-white text-lg italic leading-relaxed font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                    "Dwellio isn't just a platform; it's the gateway to a refined Moroccan life."
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Popular Cities */}
            <section className="py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="flex items-end justify-between mb-16"
                    >
                        <div className="space-y-2">
                            <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#7C5C44' }}>
                                Discover the Kingdom
                            </p>
                            <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A', letterSpacing: '-0.04em' }}>
                                Iconic <span className="text-[#7C5C44]">Destinations</span>
                            </h2>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {[
                            { city: 'Marrakech', count: 45, img: 'https://images.unsplash.com/photo-1597212618440-806262de496b?auto=format&fit=crop&q=80&w=600' },
                            { city: 'Casablanca', count: 62, img: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600' },
                            { city: 'Rabat', count: 38, img: 'https://images.unsplash.com/photo-1590054320251-ce0f607d7301?auto=format&fit=crop&q=80&w=600' },
                            { city: 'Tangier', count: 29, img: 'https://images.unsplash.com/photo-1544971587-b842c2636c1e?auto=format&fit=crop&q=80&w=600' },
                        ].map(item => (
                            <motion.div key={item.city} variants={fadeInUp}>
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
                                        <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            {item.city}
                                        </h3>
                                        <p className="text-[13px] font-bold text-[#EDE0D5] uppercase tracking-widest opacity-70">
                                            <AnimatedCounter value={`${item.count}+`} /> Listings
                                        </p>
                                    </div>

                                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                        <ArrowRight size={20} className="text-white" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 overflow-hidden relative" style={{ background: '#1A1A1A' }}>
                <motion.div
                    className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{ duration: 15, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
                    style={{
                        backgroundImage: 'radial-gradient(circle at 70% 30%, #7C5C44 0%, transparent 50%), radial-gradient(circle at 20% 80%, #4A3528 0%, transparent 50%)',
                        backgroundSize: '200% 200%',
                    }}
                />
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10"
                >
                    <h2 className="text-5xl sm:text-6xl font-bold mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#fff', letterSpacing: '-0.04em' }}>
                        Begin Your Search for the <span className="text-[#EDE0D5] italic font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Extraordinary.</span>
                    </h2>
                    <p className="text-[20px] leading-relaxed mb-12 opacity-60 font-light" style={{ fontFamily: "'Inter', sans-serif", color: '#fff' }}>
                        Expertly curated Moroccan luxury, just one click away.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <motion.div whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/properties"
                                className="block px-10 py-5 text-[15px] font-bold uppercase tracking-widest rounded-2xl text-[#1A1A1A] transition-all"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#EDE0D5' }}
                            >
                                Explore Collection
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/contact"
                                className="block px-10 py-5 text-[15px] font-bold uppercase tracking-widest rounded-2xl text-white border border-[#EDE0D5] transition-all hover:bg-white/5"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                Personal Advisory
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
