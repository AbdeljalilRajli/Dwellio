import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, User, Search, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const NAV_LINKS = [
    { label: 'Home', to: '/' },
    { label: 'Service', to: '/properties' },
    { label: 'Agents', to: '/agents' },
    { label: 'Contact', to: '/contact' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (to: string) =>
        to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
                }`}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-[22px] font-bold tracking-tight text-[#1A1A1A]"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Dwellio
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                to={link.to}
                                className={`text-sm font-medium transition-colors duration-150 ${isActive(link.to)
                                        ? 'text-[#1A1A1A]'
                                        : 'text-[#888888] hover:text-[#1A1A1A]'
                                    }`}
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Controls */}
                    <div className="hidden md:flex items-center gap-3">
                        <button className="p-2 rounded-full text-[#888888] hover:text-[#1A1A1A] hover:bg-[#F0E6DB] transition-all">
                            <Search size={18} strokeWidth={2} />
                        </button>
                        <button className="p-2 rounded-full text-[#888888] hover:text-[#1A1A1A] hover:bg-[#F0E6DB] transition-all">
                            <Heart size={18} strokeWidth={2} />
                        </button>
                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/dashboard"
                                    className="p-2 rounded-full text-[#888888] hover:text-[#1A1A1A] hover:bg-[#F0E6DB] transition-all"
                                >
                                    <User size={18} strokeWidth={2} />
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm font-medium text-[#888888] hover:text-[#1A1A1A] transition-colors"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-[#888888] hover:text-[#1A1A1A] transition-colors px-3 py-2"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Log In
                                </Link>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="bg-[#1A1A1A] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#7C5C44] transition-all duration-200"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 rounded-lg text-[#1A1A1A]"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden bg-white border-t border-[#EDE0D5] py-4 px-2 space-y-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                to={link.to}
                                onClick={() => setMenuOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive(link.to)
                                        ? 'bg-[#F0E6DB] text-[#1A1A1A]'
                                        : 'text-[#888888] hover:bg-[#F0E6DB] hover:text-[#1A1A1A]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-3 border-t border-[#EDE0D5] flex gap-2">
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="flex-1 text-center text-sm font-medium text-[#1A1A1A] border-2 border-[#1A1A1A] py-2.5 rounded-xl"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setMenuOpen(false)}
                                className="flex-1 text-center text-sm font-semibold text-white bg-[#1A1A1A] py-2.5 rounded-xl"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
