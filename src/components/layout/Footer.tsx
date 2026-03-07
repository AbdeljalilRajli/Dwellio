import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer style={{ background: '#1A1A1A' }} className="pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <Link
                            to="/"
                            className="text-[28px] font-bold tracking-tight block mb-5"
                            style={{ fontFamily: "'Cormorant', serif", color: '#fff' }}
                        >
                            Dwellio
                        </Link>
                        <p className="text-[15px] leading-relaxed mb-8" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.45)' }}>
                            Morocco's premier real estate platform. Find luxury villas, modern apartments, and charming riads across the kingdom.
                        </p>
                        <div className="flex items-center gap-3">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#7C5C44'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[14px] font-bold uppercase tracking-widest mb-6" style={{ fontFamily: "'Quicksand', sans-serif", color: '#fff' }}>
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'For Rent', path: '/properties?type=Rent' },
                                { label: 'For Sale', path: '/properties?type=Sale' },
                                { label: 'Contact Us', path: '/contact' },
                                { label: 'About Us', path: '/' },
                            ].map(link => (
                                <li key={link.label}>
                                    <Link
                                        to={link.path}
                                        className="text-[14px] font-medium transition-colors"
                                        style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.45)' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cities */}
                    <div>
                        <h3 className="text-[14px] font-bold uppercase tracking-widest mb-6" style={{ fontFamily: "'Quicksand', sans-serif", color: '#fff' }}>
                            Popular Cities
                        </h3>
                        <ul className="space-y-3">
                            {['Marrakech', 'Casablanca', 'Rabat', 'Tangier', 'Agadir', 'Fes'].map(city => (
                                <li key={city}>
                                    <Link
                                        to={`/properties?city=${city}`}
                                        className="text-[14px] font-medium transition-colors"
                                        style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.45)' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                                    >
                                        {city}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-[14px] font-bold uppercase tracking-widest mb-6" style={{ fontFamily: "'Quicksand', sans-serif", color: '#fff' }}>
                            Get in Touch
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: '#7C5C44' }} />
                                <span className="text-[14px] font-medium" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.45)' }}>
                                    123 Boulevard Mohammed V, Casablanca, Morocco
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="shrink-0" style={{ color: '#7C5C44' }} />
                                <span className="text-[14px] font-medium" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.45)' }}>
                                    hello@dwellio.com
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="shrink-0" style={{ color: '#7C5C44' }} />
                                <span className="text-[14px] font-medium" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.45)' }}>
                                    +212 5 22 00 00 00
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[13px] font-medium" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.3)' }}>
                        © 2026 Dwellio. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-[13px] font-medium" style={{ fontFamily: "'Quicksand', sans-serif", color: 'rgba(255,255,255,0.3)' }}>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
