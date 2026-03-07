import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Bed, Bath, Maximize, Calendar, ArrowLeft, Heart, Share2, CheckCircle2, Phone, MapPinned } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { listingService } from '../services/listingService';

export default function PropertyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: listing, isLoading } = useQuery({
        queryKey: ['listing', id],
        queryFn: () => listingService.getListingById(id!),
        enabled: !!id
    });

    const formatPrice = (price: number, type: string) => {
        return `${price.toLocaleString()} MAD${type === 'Rent' ? '/mo' : ''}`;
    };

    if (isLoading) return (
        <div className="h-screen flex items-center justify-center" style={{ background: '#FBF8F5' }}>
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2" style={{ borderColor: '#7C5C44' }} />
        </div>
    );

    if (!listing) return (
        <div className="h-screen flex items-center justify-center" style={{ background: '#FBF8F5' }}>
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A' }}>Property not found</h2>
                <button
                    onClick={() => navigate('/properties')}
                    className="px-6 py-3 text-[14px] font-bold text-white rounded-xl"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#1A1A1A' }}
                >
                    Back to Listings
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen" style={{ background: '#FBF8F5' }}>
            <Navbar />

            <main className="max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 mb-8 text-[14px] font-semibold transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to listings
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column */}
                    <div className="lg:col-span-8">
                        {/* Gallery */}
                        <div className="rounded-2xl overflow-hidden mb-8 h-[350px] sm:h-[480px]">
                            <img
                                src={listing.images[0]}
                                alt={listing.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Title & Location */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span
                                        className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg text-white"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: listing.type === 'Rent' ? '#7C5C44' : '#1A1A1A' }}
                                    >
                                        For {listing.type}
                                    </span>
                                    <span className="text-[12px] font-medium px-3 py-1 rounded-lg" style={{ fontFamily: "'Inter', sans-serif", background: '#F0E6DB', color: '#7C5C44' }}>
                                        {listing.property_type}
                                    </span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                                    {listing.title}
                                </h1>
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={15} style={{ color: '#7C5C44' }} />
                                    <span className="text-[14px] font-medium" style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}>
                                        {listing.address}, {listing.city}, Morocco
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors" style={{ border: '1px solid #EDE0D5', color: '#888' }}>
                                    <Heart size={18} />
                                </button>
                                <button className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors" style={{ border: '1px solid #EDE0D5', color: '#888' }}>
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                            {[
                                { icon: Bed, label: 'Bedrooms', value: listing.bedrooms },
                                { icon: Bath, label: 'Bathrooms', value: listing.bathrooms },
                                { icon: Maximize, label: 'Living Area', value: `${listing.area} m²` },
                                { icon: Calendar, label: 'Year Built', value: '2023' },
                            ].map(stat => (
                                <div key={stat.label} className="bg-white rounded-2xl p-5 text-center" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                    <stat.icon size={22} className="mx-auto mb-2" style={{ color: '#7C5C44' }} />
                                    <p className="text-[16px] font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A' }}>{stat.value}</p>
                                    <p className="text-[11px] font-medium uppercase tracking-wider mt-1" style={{ fontFamily: "'Inter', sans-serif", color: '#AAA' }}>{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A' }}>
                                About This Property
                            </h2>
                            <p className="text-[15px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: '#666' }}>
                                {listing.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A' }}>
                                Amenities & Features
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    'Private Swimming Pool',
                                    'Covered Parking',
                                    'Landscaped Garden',
                                    'Central Air Conditioning',
                                    'Smart Home System',
                                    '24/7 Security',
                                    'High-Speed Internet',
                                    'Marble Flooring',
                                ].map(item => (
                                    <div key={item} className="flex items-center gap-3 py-3 px-4 rounded-xl" style={{ background: '#F5EEE8' }}>
                                        <CheckCircle2 size={16} style={{ color: '#7C5C44' }} />
                                        <span className="text-[14px] font-medium" style={{ fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A' }}>
                                Location
                            </h2>
                            <div className="rounded-2xl overflow-hidden h-[280px] flex items-center justify-center" style={{ background: '#EDE0D5' }}>
                                <div className="text-center">
                                    <MapPinned size={40} style={{ color: '#7C5C44' }} className="mx-auto mb-3" />
                                    <p className="text-[14px] font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#7C5C44' }}>
                                        {listing.address}, {listing.city}
                                    </p>
                                    <p className="text-[12px] mt-1" style={{ fontFamily: "'Inter', sans-serif", color: '#999' }}>
                                        Interactive map coming soon
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column — Booking Card */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 bg-white rounded-2xl p-7" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                            {/* Price */}
                            <div className="mb-7">
                                <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#AAA' }}>
                                    {listing.type === 'Rent' ? 'Monthly Rent' : 'Asking Price'}
                                </p>
                                <p className="text-3xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A' }}>
                                    {formatPrice(listing.price, listing.type)}
                                </p>
                            </div>

                            {/* Visit Form */}
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#AAA' }}>
                                        Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3.5 rounded-xl text-[14px] font-medium outline-none"
                                        style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#AAA' }}>
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Full name"
                                        className="w-full px-4 py-3.5 rounded-xl text-[14px] font-medium outline-none"
                                        style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#AAA' }}>
                                        Your Phone
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+212 6XX XXX XXX"
                                        className="w-full px-4 py-3.5 rounded-xl text-[14px] font-medium outline-none"
                                        style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}
                                    />
                                </div>
                            </div>

                            <button
                                className="w-full py-4 text-[15px] font-bold text-white rounded-xl transition-all duration-200 mb-3"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#1A1A1A' }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = '#7C5C44')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = '#1A1A1A')}
                            >
                                Schedule a Visit
                            </button>

                            <button
                                className="w-full py-4 text-[15px] font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A', border: '1.5px solid #EDE0D5' }}
                            >
                                <Phone size={16} style={{ color: '#7C5C44' }} />
                                Contact Agent
                            </button>

                            <div className="mt-6 p-4 rounded-xl text-center" style={{ background: '#F5EEE8' }}>
                                <p className="text-[12px] font-medium" style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}>
                                    No commitment required. Visit first, decide later.
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
