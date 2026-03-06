import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Shield, Home, HeadphonesIcon, TrendingUp, MapPin, Star } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { PropertyCard } from '../components/ui/PropertyCard';
import { listingService } from '../services/listingService';

export default function HomePage() {
    const { data: listings } = useQuery({
        queryKey: ['listings'],
        queryFn: () => listingService.getAllListings(),
    });

    const featuredSale = listings?.filter(l => l.type === 'Sale').slice(0, 3) ?? [];
    const featuredRent = listings?.filter(l => l.type === 'Rent').slice(0, 3) ?? [];

    return (
        <div className="min-h-screen" style={{ background: '#FBF8F5' }}>
            <Navbar />

            {/* Hero */}
            <HeroSection />

            {/* Featured For Sale */}
            <section className="py-20 max-w-7xl mx-auto px-5 sm:px-8">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#7C5C44' }}>
                            For Sale
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                            Popular Properties
                        </h2>
                    </div>
                    <Link
                        to="/properties?type=Sale"
                        className="hidden sm:flex items-center gap-2 text-[14px] font-semibold transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif", color: '#7C5C44' }}
                    >
                        View All <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredSale.map(listing => (
                        <PropertyCard key={listing.id} listing={listing} />
                    ))}
                </div>
                <Link
                    to="/properties?type=Sale"
                    className="sm:hidden flex items-center justify-center gap-2 mt-8 text-[14px] font-semibold py-3 rounded-xl border border-[#EDE0D5]"
                    style={{ fontFamily: "'Inter', sans-serif", color: '#7C5C44' }}
                >
                    View All For Sale <ArrowRight size={16} />
                </Link>
            </section>

            {/* Why Choose Us */}
            <section className="py-20" style={{ background: '#F5EEE8' }}>
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#7C5C44' }}>
                            Why Dwellio
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                            A Better Way to Find Home
                        </h2>
                        <p className="text-[16px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}>
                            We combine local expertise with modern technology to make your property search effortless.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Shield, title: 'Verified Listings', desc: 'Every property is personally verified by our team before it goes live.' },
                            { icon: Home, title: 'Curated Selection', desc: 'Handpicked homes that meet our high standards for quality and value.' },
                            { icon: HeadphonesIcon, title: 'Dedicated Support', desc: 'Expert agents available 7 days a week to guide you through every step.' },
                            { icon: TrendingUp, title: 'Market Insights', desc: 'Real-time pricing data and neighborhood trends to help you decide.' },
                        ].map(item => (
                            <div
                                key={item.title}
                                className="bg-white rounded-2xl p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                    style={{ background: '#F5EEE8' }}
                                >
                                    <item.icon size={22} style={{ color: '#7C5C44' }} />
                                </div>
                                <h3 className="text-[16px] font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A' }}>
                                    {item.title}
                                </h3>
                                <p className="text-[14px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: '#999' }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured For Rent */}
            <section className="py-20 max-w-7xl mx-auto px-5 sm:px-8">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#7C5C44' }}>
                            For Rent
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                            Available Rentals
                        </h2>
                    </div>
                    <Link
                        to="/properties?type=Rent"
                        className="hidden sm:flex items-center gap-2 text-[14px] font-semibold transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif", color: '#7C5C44' }}
                    >
                        View All <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredRent.map(listing => (
                        <PropertyCard key={listing.id} listing={listing} />
                    ))}
                </div>
                <Link
                    to="/properties?type=Rent"
                    className="sm:hidden flex items-center justify-center gap-2 mt-8 text-[14px] font-semibold py-3 rounded-xl border border-[#EDE0D5]"
                    style={{ fontFamily: "'Inter', sans-serif", color: '#7C5C44' }}
                >
                    View All For Rent <ArrowRight size={16} />
                </Link>
            </section>

            {/* Popular Cities */}
            <section className="py-20" style={{ background: '#F5EEE8' }}>
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="text-center mb-12">
                        <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#7C5C44' }}>
                            Explore Morocco
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                            Popular Cities
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                            { city: 'Marrakech', count: 45 },
                            { city: 'Casablanca', count: 62 },
                            { city: 'Rabat', count: 38 },
                            { city: 'Tangier', count: 29 },
                            { city: 'Agadir', count: 34 },
                            { city: 'Essaouira', count: 18 },
                            { city: 'Fes', count: 22 },
                            { city: 'Chefchaouen', count: 11 },
                        ].map(item => (
                            <Link
                                key={item.city}
                                to={`/properties?city=${item.city}`}
                                className="group bg-white rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#F5EEE8' }}>
                                    <MapPin size={18} style={{ color: '#7C5C44' }} />
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A' }}>
                                        {item.city}
                                    </p>
                                    <p className="text-[12px] font-medium" style={{ fontFamily: "'Inter', sans-serif", color: '#999' }}>
                                        {item.count} properties
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 max-w-7xl mx-auto px-5 sm:px-8">
                <div className="text-center mb-12">
                    <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#7C5C44' }}>
                        Testimonials
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                        What Our Clients Say
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { name: 'Sarah M.', role: 'Homeowner', text: 'Dwellio made finding our dream villa in Marrakech an absolute pleasure. Their team was professional, knowledgeable, and genuinely cared about our needs.' },
                        { name: 'Youssef B.', role: 'Investor', text: 'As an investor, I appreciate the quality of listings and the transparency in pricing. Dwellio is the only platform I trust for Moroccan real estate.' },
                        { name: 'Claire D.', role: 'Expat', text: 'Moving to Morocco was daunting until we found Dwellio. They helped us find the perfect apartment in Rabat and made the whole process seamless.' },
                    ].map(t => (
                        <div
                            key={t.name}
                            className="bg-white rounded-2xl p-7"
                            style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
                        >
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} size={14} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                                ))}
                            </div>
                            <p className="text-[15px] leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif", color: '#666' }}>
                                "{t.text}"
                            </p>
                            <div>
                                <p className="text-[14px] font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A' }}>
                                    {t.name}
                                </p>
                                <p className="text-[12px] font-medium" style={{ fontFamily: "'Inter', sans-serif", color: '#999' }}>
                                    {t.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 mb-0" style={{ background: '#1A1A1A' }}>
                <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ fontFamily: "'Outfit', sans-serif", color: '#fff', letterSpacing: '-0.02em' }}>
                        Ready to Find Your Perfect Home?
                    </h2>
                    <p className="text-[16px] leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.5)' }}>
                        Browse thousands of verified properties across Morocco. Start your journey today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/properties"
                            className="px-8 py-4 text-[15px] font-bold rounded-xl text-[#1A1A1A] transition-all duration-200"
                            style={{ fontFamily: "'Outfit', sans-serif", background: '#fff' }}
                        >
                            Browse Properties
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 text-[15px] font-bold rounded-xl text-white border border-white/20 transition-all duration-200 hover:bg-white/10"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
