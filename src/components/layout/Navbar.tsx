import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

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
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: '#FFFFFF',
                    boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.06)' : 'none',
                }}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="flex items-center justify-between h-[72px]">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="text-[26px] font-bold tracking-tight"
                            style={{ fontFamily: "'Playfair Display', serif", color: '#1A1A1A' }}
                        >
                            Dwellio
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="relative px-5 py-2 text-[14px] font-medium rounded-xl transition-all duration-200"
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        color: isActive(link.path) ? '#1A1A1A' : '#888',
                                        background: isActive(link.path) ? '#F5EEE8' : 'transparent',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive(link.path)) e.currentTarget.style.color = '#1A1A1A';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive(link.path)) e.currentTarget.style.color = '#888';
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right Section */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                to="/dashboard/favorites"
                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-[#F5EEE8]"
                                style={{ color: '#888' }}
                            >
                                <Heart size={18} />
                            </Link>
                            <Link
                                to="/login"
                                className="px-5 py-2.5 text-[14px] font-semibold rounded-xl transition-all duration-200"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    color: '#1A1A1A',
                                    border: '1.5px solid #E0E0E0',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1A1A1A'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E0E0E0'; }}
                            >
                                Log In
                            </Link>
                            <Link
                                to="/signup"
                                className="px-5 py-2.5 text-[14px] font-semibold rounded-xl text-white transition-all duration-200"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    background: '#1A1A1A',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#7C5C44'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = '#1A1A1A'; }}
                            >
                                Sign Up
                            </Link>
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
