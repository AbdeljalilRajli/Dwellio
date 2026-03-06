import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, type MotionProps } from 'framer-motion';
import { MapPin, User as UserIcon, ClipboardList, Headphones, Star, Phone, Mail } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { PropertyCard } from '../components/ui/PropertyCard';
import { listingService } from '../services/listingService';

const FADE_UP: MotionProps = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: 'easeOut' },
};

export default function Home() {
    const { data: listings, isLoading } = useQuery({
        queryKey: ['listings'],
        queryFn: () => listingService.getAllListings(),
    });

    const reasons = [
        {
            icon: MapPin,
            title: 'Proximity Confidence',
            desc: 'Expertly curated locations for your dream home convenience.',
        },
        {
            icon: UserIcon,
            title: 'Personalized Service',
            desc: 'Our agents work tirelessly to match your unique needs.',
        },
        {
            icon: ClipboardList,
            title: 'Transparent Process',
            desc: 'Clear communication from initial tour to final closing.',
        },
        {
            icon: Headphones,
            title: 'Exceptional Support',
            desc: 'We are with you every step of the way, 24/7.',
        },
    ];

    const testimonials = [
        {
            name: 'Sarah Nguyen',
            role: 'Home Owner',
            text: 'Dwellio made the process of buying my first home incredibly smooth and stress-free. Highly recommended!',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
            rating: 4.8,
            image: '/images/mediterranean_villa_evening_1772747416506.png',
        },
        {
            name: 'Michael Rodriguez',
            role: 'Real Estate Investor',
            text: "I've used many platforms, but Dwellio's personalized service and curated listings are truly top-notch.",
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
            rating: 4.9,
            image: '/images/luxury_mansion_exterior_1772747329285.png',
        },
        {
            name: 'Emily Johnson',
            role: 'Renter',
            text: 'Found my perfect apartment within a week! The filtering options are amazing and the team was so helpful.',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
            rating: 5.0,
            image: '/images/contemporary_loft_interior_1772747344222.png',
        },
    ];

    const stats = [
        { value: '8K+', label: 'Properties Sold' },
        { value: '6K+', label: 'Happy Clients' },
        { value: '2K+', label: 'Active Listings' },
    ];

    return (
        <div className="min-h-screen" style={{ background: '#FBF8F5' }}>
            <Navbar />

            {/* ─── HERO ─── */}
            <HeroSection />

            {/* ─── ABOUT / STATS ─── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        {/* Left: Image with stat overlay */}
                        <motion.div {...FADE_UP} className="flex-1 relative">
                            <img
                                src="/images/luxury_mansion_exterior_1772747329285.png"
                                alt="Luxury Estate"
                                className="w-full h-[420px] object-cover rounded-[2rem] shadow-[0_24px_64px_rgba(0,0,0,0.12)]"
                            />
                            <div className="absolute -bottom-7 -right-7 bg-[#1A1A1A] text-white rounded-2xl p-6 shadow-2xl">
                                <p className="text-4xl font-bold mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>8K+</p>
                                <p className="text-[#EDE0D5] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Houses Sold</p>
                            </div>
                        </motion.div>

                        {/* Right: Stats + Text */}
                        <motion.div {...FADE_UP} className="flex-1">
                            <p
                                className="text-[#7C5C44] text-sm font-semibold tracking-widest uppercase mb-4"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                About Dwellio
                            </p>
                            <h2
                                className="text-[#1A1A1A] leading-tight mb-6"
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                                    fontWeight: 700,
                                    letterSpacing: '-0.025em',
                                }}
                            >
                                We Help You To Find<br />Your{' '}
                                <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#7C5C44' }}>
                                    Dream Home
                                </span>
                            </h2>
                            <p
                                className="text-[#888] text-base leading-relaxed mb-10 max-w-md"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                We have a huge variety of ultra luxury homes to match every taste and budget, helping thousands of families find their perfect place.
                            </p>
                            <div className="flex gap-12">
                                {stats.map((s) => (
                                    <div key={s.label}>
                                        <p
                                            className="text-3xl font-bold text-[#1A1A1A] mb-1"
                                            style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em' }}
                                        >
                                            {s.value}
                                        </p>
                                        <p className="text-[13px] text-[#888]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            {s.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── WHY CHOOSE US ─── */}
            <section className="py-24 bg-[#F5EEE8]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <motion.div {...FADE_UP} className="text-center mb-14">
                        <p
                            className="text-[#7C5C44] text-sm font-semibold tracking-widest uppercase mb-3"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Our Benefits
                        </p>
                        <h2
                            className="text-[#1A1A1A]"
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                                fontWeight: 700,
                                letterSpacing: '-0.025em',
                            }}
                        >
                            Why Choose Us
                        </h2>
                        <p
                            className="text-[#888] mt-4 max-w-xl mx-auto"
                            style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}
                        >
                            Our team's dedication and expertise ensure a seamless property experience with integrity and unmatched service.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {reasons.map((r, i) => (
                            <motion.div
                                key={r.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="bg-white rounded-2xl p-7 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#F0E6DB] flex items-center justify-center mb-5">
                                    <r.icon size={22} className="text-[#7C5C44]" strokeWidth={1.8} />
                                </div>
                                <h3
                                    className="text-[#1A1A1A] font-bold text-[16px] mb-2"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    {r.title}
                                </h3>
                                <p
                                    className="text-[#888] text-[14px] leading-relaxed"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    {r.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── POPULAR RESIDENCES ─── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <motion.div {...FADE_UP} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                        <div>
                            <p
                                className="text-[#7C5C44] text-sm font-semibold tracking-widest uppercase mb-2"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Featured
                            </p>
                            <h2
                                className="text-[#1A1A1A]"
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                                    fontWeight: 700,
                                    letterSpacing: '-0.025em',
                                }}
                            >
                                Our Popular Residences
                            </h2>
                        </div>
                        <Link
                            to="/properties"
                            className="shrink-0 text-sm font-semibold text-[#7C5C44] hover:text-[#1A1A1A] transition-colors underline underline-offset-4"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            View all →
                        </Link>
                    </motion.div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-96 bg-[#EDE0D5] rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings?.slice(0, 6).map((listing, i) => (
                                <motion.div
                                    key={listing.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.5 }}
                                >
                                    <PropertyCard listing={listing} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ─── TESTIMONIALS ─── */}
            <section className="py-24 bg-[#F5EEE8]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <motion.div {...FADE_UP} className="text-center mb-14">
                        <p
                            className="text-[#7C5C44] text-sm font-semibold tracking-widest uppercase mb-3"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Testimonials
                        </p>
                        <h2
                            className="text-[#1A1A1A]"
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                                fontWeight: 700,
                                letterSpacing: '-0.025em',
                            }}
                        >
                            What People Say About Dwellio
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.55 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="h-40 overflow-hidden">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                    {/* Stars */}
                                    <div className="flex items-center gap-1 mb-4">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                size={13}
                                                className={s <= Math.round(t.rating) ? 'fill-amber-400 text-amber-400' : 'text-[#ddd]'}
                                            />
                                        ))}
                                        <span className="text-[12px] text-[#888] ml-1 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            {t.rating}
                                        </span>
                                    </div>
                                    <p
                                        className="text-[#555] text-[14px] leading-relaxed mb-5"
                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                    >
                                        "{t.text}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={t.avatar}
                                            alt={t.name}
                                            className="w-9 h-9 rounded-full object-cover"
                                        />
                                        <div>
                                            <p
                                                className="text-[13px] font-bold text-[#1A1A1A]"
                                                style={{ fontFamily: "'Outfit', sans-serif" }}
                                            >
                                                {t.name}
                                            </p>
                                            <p className="text-[11px] text-[#888]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                {t.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA / CONTACT TEASER ─── */}
            <section className="py-24">
                <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
                    <motion.div {...FADE_UP}>
                        <p
                            className="text-[#7C5C44] text-sm font-semibold tracking-widest uppercase mb-3"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Get In Touch
                        </p>
                        <h2
                            className="text-[#1A1A1A] mb-4"
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                fontWeight: 700,
                                letterSpacing: '-0.025em',
                            }}
                        >
                            Do You Have Any Questions?<br />
                            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#7C5C44' }}>
                                Get Help From Us
                            </span>
                        </h2>
                        <p
                            className="text-[#888] mb-10 max-w-md mx-auto"
                            style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}
                        >
                            Our support team is available around the clock. We're here to help with anything you need.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-4 py-3.5 rounded-xl border border-[#EDE0D5] bg-white text-[14px] outline-none focus:border-[#7C5C44] transition-colors"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            />
                            <button
                                className="bg-[#1A1A1A] text-white text-sm font-semibold px-7 py-3.5 rounded-xl hover:bg-[#7C5C44] transition-all duration-200 whitespace-nowrap"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Submit
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-8 mt-8 text-[#888] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                            <a href="tel:+15550123456" className="flex items-center gap-2 hover:text-[#7C5C44] transition-colors">
                                <Phone size={15} />
                                +1 (555) 012-3456
                            </a>
                            <a href="mailto:hello@dwellio.com" className="flex items-center gap-2 hover:text-[#7C5C44] transition-colors">
                                <Mail size={15} />
                                hello@dwellio.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
