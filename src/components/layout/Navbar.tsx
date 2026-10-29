import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

const NAV_LINKS = [
    { label: 'For Rent', path: '/properties?type=Rent' },
    { label: 'For Sale', path: '/properties?type=Sale' },
    { label: 'Sell Your Property', path: '/dashboard/listings/create' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const { user } = useAuth();

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

    const isHomePage = location.pathname === '/';
    const showSolidNav = scrolled || !isHomePage;

    const navStyles = {
        background: showSolidNav ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: showSolidNav ? 'blur(16px)' : 'none',
        borderBottom: showSolidNav ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
        boxShadow: showSolidNav ? '0 10px 40px rgba(0,0,0,0.04)' : 'none',
        color: showSolidNav ? '#1A1A1A' : '#FFFFFF'
    };

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full max-w-full"
                style={navStyles}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
                    <div className="flex items-center justify-between h-[72px] sm:h-[84px]">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="text-[26px] font-bold tracking-tight group no-underline"
                            style={{
                                fontFamily: "'Cormorant', serif",
                                color: showSolidNav ? '#1A1A1A' : '#FFFFFF'
                            }}
                        >
                            <span className="group-hover:text-[#7C5C44] transition-colors duration-300">NestLux</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-10">
                            {NAV_LINKS.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="relative py-2 text-[13px] font-bold uppercase tracking-widest transition-all duration-300 no-underline"
                                    style={{
                                        fontFamily: "'Quicksand', sans-serif",
                                        color: isActive(link.path)
                                            ? (showSolidNav ? '#1A1A1A' : '#FFFFFF')
                                            : (showSolidNav ? '#888' : 'rgba(255, 255, 255, 0.7)'),
                                    }}
                                >
                                    <motion.span 
                                        className="relative z-10"
                                        whileHover={{ color: showSolidNav ? '#7C5C44' : '#FFFFFF', opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {link.label}
                                    </motion.span>
                                </Link>
                            ))}
                        </div>

                        {/* Right Section */}
                        <div className="hidden md:flex items-center gap-5">
                            {user ? (
                                <>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <Link
                                            to="/dashboard/favorites"
                                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all no-underline"
                                            style={{
                                                color: showSolidNav ? '#1A1A1A' : '#FFFFFF',
                                                border: showSolidNav ? '1px solid #E0E0E0' : '1px solid rgba(255,255,255,0.3)',
                                                background: showSolidNav ? 'transparent' : 'rgba(255,255,255,0.1)'
                                            }}
                                        >
                                            <Heart size={18} />
                                        </Link>
                                    </motion.div>

                                    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                                        <Link
                                            to="/dashboard"
                                            className="text-[13px] font-bold uppercase tracking-widest transition-colors no-underline"
                                            style={{
                                                fontFamily: "'Quicksand', sans-serif",
                                                color: showSolidNav ? '#1A1A1A' : 'rgba(255, 255, 255, 0.7)'
                                            }}
                                        >
                                            <motion.span whileHover={{ color: showSolidNav ? '#7C5C44' : '#FFFFFF', opacity: 1 }}>
                                                Dashboard
                                            </motion.span>
                                        </Link>
                                    </motion.div>

                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link
                                            to="/dashboard/listings/create"
                                            className="px-7 py-3 text-[13px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadows-glow no-underline"
                                            style={{
                                                fontFamily: "'Quicksand', sans-serif",
                                                background: showSolidNav ? '#1A1A1A' : '#FFFFFF',
                                                color: showSolidNav ? '#FFFFFF' : '#1A1A1A',
                                                boxShadow: showSolidNav ? '0 8px 20px rgba(0,0,0,0.1)' : '0 8px 25px rgba(255,255,255,0.2)'
                                            }}
                                        >
                                            List a Property
                                        </Link>
                                    </motion.div>
                                </>
                            ) : (
                                <>
                                    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                                        <Link
                                            to="/login"
                                            className="text-[13px] font-bold uppercase tracking-widest transition-colors no-underline"
                                            style={{
                                                fontFamily: "'Quicksand', sans-serif",
                                                color: showSolidNav ? '#1A1A1A' : 'rgba(255, 255, 255, 0.7)'
                                            }}
                                        >
                                            <motion.span whileHover={{ color: showSolidNav ? '#7C5C44' : '#FFFFFF', opacity: 1 }}>
                                                Login
                                            </motion.span>
                                        </Link>
                                    </motion.div>

                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link
                                            to="/signup"
                                            className="px-7 py-3 text-[13px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadows-glow"
                                            style={{
                                                fontFamily: "'Quicksand', sans-serif",
                                                background: showSolidNav ? '#1A1A1A' : '#FFFFFF',
                                                color: showSolidNav ? '#FFFFFF' : '#1A1A1A',
                                                boxShadow: showSolidNav ? '0 8px 20px rgba(0,0,0,0.1)' : '0 8px 25px rgba(255,255,255,0.2)'
                                            }}
                                        >
                                            Sign Up
                                        </Link>
                                    </motion.div>
                                </>
                            )}
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{
                                color: showSolidNav ? '#1A1A1A' : '#FFFFFF',
                                background: showSolidNav ? 'transparent' : 'rgba(255,255,255,0.1)'
                            }}
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                    <div
                        className="absolute top-[72px] left-0 right-0 p-5 space-y-2 animate-in slide-in-from-top duration-300"
                        style={{ background: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                    >
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="block px-5 py-3.5 text-[15px] font-bold uppercase tracking-widest rounded-xl transition-colors"
                                style={{
                                    fontFamily: "'Quicksand', sans-serif",
                                    color: isActive(link.path) ? '#1A1A1A' : '#888',
                                    background: isActive(link.path) ? '#F5EEE8' : 'transparent',
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="border-t border-[#EDE0D5] pt-4 mt-4 flex flex-col gap-3">
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="w-full text-center py-3.5 text-[13px] font-bold uppercase tracking-widest rounded-xl border border-[#E0E0E0]" style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}>
                                        Dashboard
                                    </Link>
                                    <Link to="/dashboard/listings/create" className="w-full text-center py-3.5 text-[13px] font-bold uppercase tracking-widest rounded-xl text-white" style={{ fontFamily: "'Quicksand', sans-serif", background: '#1A1A1A' }}>
                                        List a Property
                                    </Link>
                                </>
                            ) : (
                                <div className="flex gap-3">
                                    <Link to="/login" className="flex-1 text-center py-3.5 text-[13px] font-bold uppercase tracking-widest rounded-xl border border-[#E0E0E0]" style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}>
                                        Log In
                                    </Link>
                                    <Link to="/signup" className="flex-1 text-center py-3.5 text-[13px] font-bold uppercase tracking-widest rounded-xl text-white" style={{ fontFamily: "'Quicksand', sans-serif", background: '#1A1A1A' }}>
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

