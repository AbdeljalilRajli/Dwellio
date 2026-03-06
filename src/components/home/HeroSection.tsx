import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PropertySearchForm } from './PropertySearchForm';

export function HeroSection() {
    return (
        <section className="relative bg-[#FBF8F5] pt-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 min-h-[calc(100vh-64px)] py-12 lg:py-16">

                    {/* Left: Text */}
                    <div className="flex-1 max-w-xl z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                        >
                            <p
                                className="text-[#7C5C44] text-sm font-semibold tracking-widest uppercase mb-5"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Real Estate Agency
                            </p>
                            <h1
                                className="text-[#1A1A1A] leading-[1.08] mb-6"
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 700,
                                    fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                                    letterSpacing: '-0.03em',
                                }}
                            >
                                Find Your{' '}
                                <span
                                    style={{
                                        fontFamily: "'Playfair Display', Georgia, serif",
                                        fontStyle: 'italic',
                                        fontWeight: 600,
                                        color: '#7C5C44',
                                    }}
                                >
                                    Dream Home
                                </span>
                            </h1>
                            <p
                                className="text-[#888888] text-lg leading-relaxed mb-8 max-w-md"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                Explore our curated selection of ultra‑luxury properties. Finding the perfect home has never been easier.
                            </p>
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/properties"
                                    className="bg-[#1A1A1A] text-white text-sm font-semibold px-7 py-3.5 rounded-xl hover:bg-[#7C5C44] transition-all duration-200 shadow-sm"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    Explore Listings
                                </Link>
                                <Link
                                    to="/properties?type=Rent"
                                    className="text-[#1A1A1A] text-sm font-semibold px-7 py-3.5 rounded-xl border-2 border-[#EDE0D5] hover:border-[#1A1A1A] transition-all duration-200"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    Rent a Home
                                </Link>
                            </div>
                        </motion.div>

                        {/* Search Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                            className="mt-10"
                        >
                            <PropertySearchForm />
                        </motion.div>
                    </div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
                        className="flex-1 relative hidden lg:block"
                    >
                        <div className="relative">
                            {/* Soft background circle */}
                            <div
                                className="absolute inset-0 rounded-[3rem]"
                                style={{
                                    background: 'radial-gradient(ellipse at center, #EDE0D5 0%, #FBF8F5 70%)',
                                    transform: 'scale(1.08)',
                                }}
                            />
                            <img
                                src="/images/hero_luxury_villa_1772747122067.png"
                                alt="Luxury Villa"
                                className="relative w-full object-cover rounded-[3rem] shadow-[0_32px_80px_rgba(0,0,0,0.15)]"
                                style={{ maxHeight: '580px', objectPosition: 'center' }}
                            />

                            {/* Floating stat card */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-5 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 bg-[#F0E6DB] rounded-xl flex items-center justify-center">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C5C44" strokeWidth="2">
                                        <path d="M3 9.5L12 4l9 5.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                                        <path d="M9 21V12h6v9" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Outfit', sans-serif" }}>8K+</p>
                                    <p className="text-xs text-[#888888]" style={{ fontFamily: "'Inter', sans-serif" }}>Properties Listed</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
