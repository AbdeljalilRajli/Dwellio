import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
    { label: 'Home', path: '/' },
    { label: 'For Rent', path: '/properties?type=Rent' },
    { label: 'For Sale', path: '/properties?type=Sale' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname + location.search === path || location.pathname.startsWith(path.split('?')[0]) && location.search.includes(path.split('?')[1] || '');
    };

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
                style={{
                    background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 1)',
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
                    boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.04)' : 'none',
                }}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="flex items-center justify-between h-[72px] sm:h-[84px]">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="text-[26px] font-bold tracking-tight group"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1A1A1A' }}
                        >
                            <span className="group-hover:text-[#7C5C44] transition-colors duration-300">Dwellio</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-10">
                            {NAV_LINKS.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="relative py-2 text-[13px] font-bold uppercase tracking-widest transition-all duration-300"
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        color: isActive(link.path) ? '#1A1A1A' : '#888',
                                    }}
                                >
                                    <span className="relative z-10">{link.label}</span>
                                    {isActive(link.path) && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-[6px] left-0 right-0 h-[2.5px] bg-[#7C5C44] rounded-full"
                                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Right Section */}
                        <div className="hidden md:flex items-center gap-5">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link
                                    to="/dashboard/favorites"
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-[#F5EEE8]"
                                    style={{ color: '#1A1A1A', border: '1px solid #E0E0E0' }}
                                >
                                    <Heart size={18} />
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                                <Link
                                    to="/login"
                                    className="text-[13px] font-bold uppercase tracking-widest transition-colors hover:text-[#7C5C44]"
                                    style={{ fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}
                                >
                                    Log In
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/signup"
                                    className="px-7 py-3 text-[13px] font-bold uppercase tracking-widest rounded-xl text-white shadow-xl transition-all duration-300"
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        background: '#1A1A1A',
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F5EEE8] transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{ color: '#1A1A1A' }}
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
                    <div
                        className="absolute top-[72px] left-0 right-0 p-5 space-y-2"
                        style={{ background: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                    >
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="block px-5 py-3.5 text-[15px] font-medium rounded-xl transition-colors"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    color: isActive(link.path) ? '#1A1A1A' : '#888',
                                    background: isActive(link.path) ? '#F5EEE8' : 'transparent',
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="border-t border-[#EDE0D5] pt-4 mt-4 flex gap-3">
                            <Link to="/login" className="flex-1 text-center py-3 text-[14px] font-semibold rounded-xl border border-[#E0E0E0]" style={{ fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}>
                                Log In
                            </Link>
                            <Link to="/signup" className="flex-1 text-center py-3 text-[14px] font-semibold rounded-xl text-white" style={{ fontFamily: "'Inter', sans-serif", background: '#1A1A1A' }}>
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
