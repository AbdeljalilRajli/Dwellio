import { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PageHeader } from '../components/ui/PageHeader';
import { PropertyMap } from '../components/ui/PropertyMap';

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

            <PageHeader
                title="Contact Us"
                subtitle="Have a question or want to schedule a property visit? We'd love to hear from you."
                breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Contact Us' }]}
            />

            <main className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "'Cormorant', serif", color: '#1A1A1A' }}>
                                Send Us a Message
                            </h2>

                            {sent && (
                                <div className="mb-6 p-4 rounded-xl text-[14px] font-medium" style={{ background: '#E8F5E9', color: '#2E7D32', fontFamily: "'Quicksand', sans-serif" }}>
                                    Thank you! Your message has been sent. We'll get back to you shortly.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Quicksand', sans-serif", color: '#AAA' }}>
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your name"
                                            className="w-full px-4 py-3.5 rounded-xl text-[14px] font-medium outline-none"
                                            style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Quicksand', sans-serif" }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Quicksand', sans-serif", color: '#AAA' }}>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-3.5 rounded-xl text-[14px] font-medium outline-none"
                                            style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Quicksand', sans-serif" }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Quicksand', sans-serif", color: '#AAA' }}>
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="How can we help?"
                                        className="w-full px-4 py-3.5 rounded-xl text-[14px] font-medium outline-none"
                                        style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Quicksand', sans-serif" }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Quicksand', sans-serif", color: '#AAA' }}>
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="Tell us more about what you're looking for..."
                                        className="w-full px-4 py-3.5 rounded-xl text-[14px] font-medium outline-none resize-none"
                                        style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Quicksand', sans-serif" }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-8 py-4 text-[15px] font-bold text-white rounded-xl transition-all duration-200"
                                    style={{ fontFamily: "'Quicksand', sans-serif", background: '#1A1A1A' }}
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
                            <h2 className="text-lg font-bold mb-5" style={{ fontFamily: "'Cormorant', serif", color: '#1A1A1A' }}>
                                Our Office
                            </h2>
                            <div className="space-y-5">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#F5EEE8' }}>
                                        <MapPin size={16} style={{ color: '#7C5C44' }} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold mb-0.5" style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}>Address</p>
                                        <p className="text-[13px]" style={{ fontFamily: "'Quicksand', sans-serif", color: '#888' }}>
                                            45 Avenue Mohamed VI<br />Hivernage, Marrakech, Morocco
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#F5EEE8' }}>
                                        <Phone size={16} style={{ color: '#7C5C44' }} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold mb-0.5" style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}>Phone</p>
                                        <p className="text-[13px]" style={{ fontFamily: "'Quicksand', sans-serif", color: '#888' }}>+212 5 24 40 00 00</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#F5EEE8' }}>
                                        <Mail size={16} style={{ color: '#7C5C44' }} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold mb-0.5" style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}>Email</p>
                                        <p className="text-[13px]" style={{ fontFamily: "'Quicksand', sans-serif", color: '#888' }}>concierge@dwellio.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#F5EEE8' }}>
                                        <Clock size={16} style={{ color: '#7C5C44' }} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold mb-0.5" style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}>Working Hours</p>
                                        <p className="text-[13px]" style={{ fontFamily: "'Quicksand', sans-serif", color: '#888' }}>
                                            Mon–Fri: 9:00 AM – 6:00 PM<br />Sat: 10:00 AM – 2:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Map */}
                        <div className="rounded-2xl overflow-hidden h-[300px] shadow-sm border border-[#EDE0D5]">
                            <PropertyMap 
                                latitude={31.6346} 
                                longitude={-8.0100} 
                                address="Dwellio Headquarters"
                                city="Marrakech"
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
