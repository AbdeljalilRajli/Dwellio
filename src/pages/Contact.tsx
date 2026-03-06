import { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export default function Contact() {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <div className="min-h-screen" style={{ background: '#FBF8F5' }}>
            <Navbar />

            {/* Header */}
            <div className="pt-24 pb-10" style={{ background: '#F5EEE8' }}>
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#7C5C44' }}>
                        Get in Touch
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                        Contact Us
                    </h1>
                    <p className="text-[15px]" style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}>
                        Have a question or want to schedule a property visit? We'd love to hear from you.
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A' }}>
                                Send Us a Message
                            </h2>

                            {sent && (
                                <div className="mb-6 p-4 rounded-xl text-[14px] font-medium" style={{ background: '#E8F5E9', color: '#2E7D32', fontFamily: "'Inter', sans-serif" }}>
                                    Thank you! Your message has been sent. We'll get back to you shortly.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#AAA' }}>
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your name"
                                            className="w-full px-4 py-3.5 rounded-xl text-[14px] font-medium outline-none"
                                            style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Inter', sans-serif" }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#AAA' }}>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-3.5 rounded-xl text-[14px] font-medium outline-none"
                                            style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Inter', sans-serif" }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#AAA' }}>
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="How can we help?"
                                        className="w-full px-4 py-3.5 rounded-xl text-[14px] font-medium outline-none"
                                        style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Inter', sans-serif" }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#AAA' }}>
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="Tell us more about what you're looking for..."
                                        className="w-full px-4 py-3.5 rounded-xl text-[14px] font-medium outline-none resize-none"
                                        style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Inter', sans-serif" }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-8 py-4 text-[15px] font-bold text-white rounded-xl transition-all duration-200"
                                    style={{ fontFamily: "'Outfit', sans-serif", background: '#1A1A1A' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = '#7C5C44')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = '#1A1A1A')}
                                >
                                    <Send size={16} />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Office Info */}
                        <div className="bg-white rounded-2xl p-7" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                            <h2 className="text-lg font-bold mb-5" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A' }}>
                                Our Office
                            </h2>
                            <div className="space-y-5">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#F5EEE8' }}>
                                        <MapPin size={16} style={{ color: '#7C5C44' }} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold mb-0.5" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A' }}>Address</p>
                                        <p className="text-[13px]" style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}>
                                            123 Boulevard Mohammed V<br />Casablanca, Morocco
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#F5EEE8' }}>
                                        <Phone size={16} style={{ color: '#7C5C44' }} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold mb-0.5" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A' }}>Phone</p>
                                        <p className="text-[13px]" style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}>+212 5 22 00 00 00</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#F5EEE8' }}>
                                        <Mail size={16} style={{ color: '#7C5C44' }} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold mb-0.5" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A' }}>Email</p>
                                        <p className="text-[13px]" style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}>hello@dwellio.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#F5EEE8' }}>
                                        <Clock size={16} style={{ color: '#7C5C44' }} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold mb-0.5" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A' }}>Working Hours</p>
                                        <p className="text-[13px]" style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}>
                                            Mon–Fri: 9:00 AM – 6:00 PM<br />Sat: 10:00 AM – 2:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="rounded-2xl overflow-hidden h-[220px] flex items-center justify-center" style={{ background: '#EDE0D5' }}>
                            <div className="text-center">
                                <MapPin size={32} style={{ color: '#7C5C44' }} className="mx-auto mb-2" />
                                <p className="text-[13px] font-semibold" style={{ fontFamily: "'Outfit', sans-serif", color: '#7C5C44' }}>
                                    Casablanca, Morocco
                                </p>
                                <p className="text-[11px] mt-1" style={{ fontFamily: "'Inter', sans-serif", color: '#999' }}>
                                    Interactive map coming soon
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
