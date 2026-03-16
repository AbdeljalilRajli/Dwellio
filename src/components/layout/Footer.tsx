import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Footer() {
    return (
        <footer style={{ background: '#1A1A1A' }}>
            {/* Newsletter Strip */}
            <div className="border-b border-white/5">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Cormorant', serif", color: '#fff' }}>
                                Stay in the Loop
                            </h3>
                            <p className="text-[14px] font-medium" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.4)' }}>
                                Get notified about new premium listings and market insights.
                            </p>
                        </div>
                        <div className="flex w-full lg:w-auto gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 lg:w-80 px-6 py-4 rounded-xl text-[14px] font-medium outline-none transition-all focus:ring-2 focus:ring-[#7C5C44]"
                                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: "'Quicksand', sans-serif", color: '#fff' }}
                            />
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="px-8 py-4 rounded-xl text-[13px] font-bold uppercase tracking-widest text-[#1A1A1A] shrink-0"
                                style={{ fontFamily: "'Quicksand', sans-serif", background: '#EDE0D5' }}
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
                    {/* Brand — wider */}
                    <div className="lg:col-span-4">
                        <Link
                            to="/"
                            className="text-[32px] font-bold tracking-tight block mb-5"
                            style={{ fontFamily: "'Cormorant', serif", color: '#fff' }}
                        >
                            Dwellio
                        </Link>
                        <p className="text-[14px] leading-relaxed mb-8 max-w-xs" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.4)' }}>
                            Your premier real estate platform. Find luxury villas, modern apartments, and unique properties worldwide.
                        </p>
                        <div className="flex items-center gap-3">
                            {[
                                { Icon: Instagram, href: '#' },
                                { Icon: Facebook, href: '#' },
                                { Icon: Twitter, href: '#' },
                            ].map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#7C5C44'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-[13px] font-bold uppercase tracking-widest mb-7" style={{ fontFamily: "'Quicksand', sans-serif", color: '#fff' }}>
                            Explore
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { label: 'About Us', path: '/about' },
                                { label: 'For Rent', path: '/properties?type=Rent' },
                                { label: 'For Sale', path: '/properties?type=Sale' },
                                { label: 'List Property', path: '/dashboard/listings/create' },
                                { label: 'Contact Us', path: '/contact' },
                            ].map(link => (
                                <li key={link.label}>
                                    <Link
                                        to={link.path}
                                        className="text-[14px] font-medium transition-all duration-200 flex items-center gap-2 group"
                                        style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.4)' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#EDE0D5'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
                                    >
                                        <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Property Types */}
                    <div className="lg:col-span-3">
                        <h3 className="text-[13px] font-bold uppercase tracking-widest mb-7" style={{ fontFamily: "'Quicksand', sans-serif", color: '#fff' }}>
                            Property Types
                        </h3>
                        <ul className="space-y-4">
                            {['Apartments', 'Houses', 'Villas', 'Penthouses', 'Riads'].map(type => (
                                <li key={type}>
                                    <Link
                                        to={`/properties`}
                                        className="text-[14px] font-medium transition-all duration-200 flex items-center gap-2 group"
                                        style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.4)' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#EDE0D5'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
                                    >
                                        <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                        {type}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-3">
                        <h3 className="text-[13px] font-bold uppercase tracking-widest mb-7" style={{ fontFamily: "'Quicksand', sans-serif", color: '#fff' }}>
                            Get in Touch
                        </h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(124,92,68,0.15)' }}>
                                    <MapPin size={15} style={{ color: '#7C5C44' }} />
                                </div>
                                <span className="text-[14px] font-medium leading-relaxed" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.4)' }}>
                                    123 Boulevard Mohammed V,<br />Casablanca, Morocco
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(124,92,68,0.15)' }}>
                                    <Mail size={15} style={{ color: '#7C5C44' }} />
                                </div>
                                <span className="text-[14px] font-medium" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.4)' }}>
                                    hello@dwellio.com
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(124,92,68,0.15)' }}>
                                    <Phone size={15} style={{ color: '#7C5C44' }} />
                                </div>
                                <span className="text-[14px] font-medium" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.4)' }}>
                                    +212 5 22 00 00 00
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[13px] font-medium" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.25)' }}>
                        © 2026 Dwellio. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-[13px] font-medium" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.25)' }}>
                        <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white/60 transition-colors">Terms of Use</a>
                        <a href="#" className="hover:text-white/60 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
