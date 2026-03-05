import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="bg-[#F7F2EF] pt-24 pb-12 border-t border-brand-secondary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-20">
                    <div className="lg:col-span-2">
                        <Link to="/" className="text-[32px] font-display font-bold text-brand-primary mb-8 block tracking-tight">
                            Dwellio
                        </Link>
                        <p className="text-brand-accent/60 max-w-sm text-lg leading-relaxed font-medium">
                            Bringing you closer to your dream home, one click at a time. Explore our curated selection of ultra-luxury properties.
                        </p>
                        <div className="flex items-center gap-6 mt-10">
                            <a href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-brand-primary font-bold text-lg mb-8 tracking-tight">About</h3>
                        <ul className="space-y-5 text-[15px] font-medium text-brand-accent/70">
                            <li className="hover:text-brand-primary transition-colors cursor-pointer">Company</li>
                            <li className="hover:text-brand-primary transition-colors cursor-pointer">Careers</li>
                            <li className="hover:text-brand-primary transition-colors cursor-pointer">Our Story</li>
                            <li className="hover:text-brand-primary transition-colors cursor-pointer">Resources</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-brand-primary font-bold text-lg mb-8 tracking-tight">Support</h3>
                        <ul className="space-y-5 text-[15px] font-medium text-brand-accent/70">
                            <li className="hover:text-brand-primary transition-colors cursor-pointer">FAQ</li>
                            <li className="hover:text-brand-primary transition-colors cursor-pointer">Contact Us</li>
                            <li className="hover:text-brand-primary transition-colors cursor-pointer">Help Center</li>
                            <li className="hover:text-brand-primary transition-colors cursor-pointer">Terms of Service</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-brand-primary font-bold text-lg mb-8 tracking-tight">Get in Touch</h3>
                        <ul className="space-y-5 text-[15px] font-medium text-brand-accent/70">
                            <li className="flex items-center gap-3 hover:text-brand-primary transition-colors cursor-pointer">
                                <Mail size={16} strokeWidth={2.5} />
                                hello@dwellio.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-brand-secondary/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[13px] font-medium text-brand-accent/40">© 2024 Dwellio. All rights reserved.</p>
                    <div className="flex gap-10 text-[13px] font-medium text-brand-accent/40">
                        <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-brand-primary transition-colors">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
