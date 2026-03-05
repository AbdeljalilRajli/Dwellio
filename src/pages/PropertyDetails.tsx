import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Bed, Bath, Maximize, Calendar, ArrowLeft, Heart, Share2, Star, CheckCircle2 } from 'lucide-react';
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

    if (isLoading) return (
        <div className="h-screen flex items-center justify-center bg-brand-bg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
        </div>
    );

    if (!listing) return (
        <div className="h-screen flex items-center justify-center bg-brand-bg">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-brand-primary mb-4">Property not found</h2>
                <button onClick={() => navigate('/properties')} className="btn-primary">Back to Listings</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-brand-bg pt-20">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center text-brand-accent hover:text-brand-primary mb-10 transition-colors bg-white px-6 py-3 rounded-2xl shadow-sm"
                >
                    <ArrowLeft size={20} className="mr-3 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold">Back to Listings</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Gallery and Description */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            <div className="md:col-span-2 rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px]">
                                <img
                                    src={listing.images[0]}
                                    alt={listing.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {listing.images.slice(1).map((img, idx) => (
                                <div key={idx} className="rounded-[2rem] overflow-hidden shadow-lg h-[240px]">
                                    <img src={img} alt={`${listing.title} ${idx + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                            <div>
                                <div className="flex items-center space-x-2 mb-3">
                                    <span className="px-3 py-1 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Verified Listing</span>
                                    <div className="flex items-center text-amber-500">
                                        <Star size={14} fill="currentColor" />
                                        <span className="ml-1 text-xs font-bold">4.9 (124 reviews)</span>
                                    </div>
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-display font-bold text-brand-primary mb-2 leading-tight">{listing.title}</h1>
                                <div className="flex items-center text-brand-accent font-medium italic">
                                    <MapPin size={18} className="mr-2" />
                                    <span>{listing.address}, {listing.city}, California</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="p-4 bg-white border-none rounded-2xl shadow-lg shadow-brand-secondary/10 hover:bg-brand-secondary/5 transition-all text-brand-primary active:scale-95">
                                    <Heart size={24} />
                                </button>
                                <button className="p-4 bg-white border-none rounded-2xl shadow-lg shadow-brand-secondary/10 hover:bg-brand-secondary/5 transition-all text-brand-primary active:scale-95">
                                    <Share2 size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-8 bg-white rounded-[2.5rem] shadow-sm border border-brand-secondary/10">
                            <div className="text-center md:border-r border-brand-secondary/20">
                                <Bed size={28} className="mx-auto text-brand-accent mb-3" />
                                <p className="text-sm font-bold text-brand-primary">{listing.bedrooms} Bedrooms</p>
                                <p className="text-[10px] text-brand-accent uppercase font-bold tracking-tighter">Sleeping Space</p>
                            </div>
                            <div className="text-center md:border-r border-brand-secondary/20">
                                <Bath size={28} className="mx-auto text-brand-accent mb-3" />
                                <p className="text-sm font-bold text-brand-primary">{listing.bathrooms} Bathrooms</p>
                                <p className="text-[10px] text-brand-accent uppercase font-bold tracking-tighter">Personal Care</p>
                            </div>
                            <div className="text-center md:border-r border-brand-secondary/20">
                                <Maximize size={28} className="mx-auto text-brand-accent mb-3" />
                                <p className="text-sm font-bold text-brand-primary">{listing.area} sq ft</p>
                                <p className="text-[10px] text-brand-accent uppercase font-bold tracking-tighter">Total Area</p>
                            </div>
                            <div className="text-center">
                                <Calendar size={28} className="mx-auto text-brand-accent mb-3" />
                                <p className="text-sm font-bold text-brand-primary">Built 2022</p>
                                <p className="text-[10px] text-brand-accent uppercase font-bold tracking-tighter">Modern Build</p>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <section>
                                <h3 className="text-2xl font-display font-bold text-brand-primary mb-6">About This Property</h3>
                                <p className="text-brand-accent leading-relaxed text-lg italic font-medium">
                                    {listing.description}
                                </p>
                                <p className="text-brand-accent opacity-80 leading-relaxed mt-4">
                                    Experience the pinnacle of coastal California living. This residence is not just a house; it's a meticulously crafted environment designed to inspire and rejuvenate. From the moment you step through the custom entryway, you'll feel the harmony of light, space, and premium materials.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-display font-bold text-brand-primary mb-6">Premium Amenities</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['Smart Home Automation', 'Chef\'s Kitchen w/ High-end Appliances', 'Private Landscaped Garden', 'Electric Vehicle Charging Station', 'Infinity Pool & Spa', '24/7 Concierge Service'].map((item) => (
                                        <div key={item} className="flex items-center space-x-3 p-4 bg-brand-secondary/5 rounded-2xl">
                                            <CheckCircle2 size={20} className="text-brand-accent" />
                                            <span className="font-bold text-brand-primary text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Right Column: Booking Card */}
                    <div className="lg:col-span-4">
                        <div className="bg-white p-8 lg:p-10 rounded-[3rem] shadow-2xl shadow-brand-secondary/10 sticky top-32 border border-brand-secondary/5">
                            <div className="mb-10">
                                <p className="text-xs font-bold uppercase text-brand-accent tracking-widest mb-2">Investment</p>
                                <div className="flex items-baseline">
                                    <span className="text-5xl font-bold text-brand-primary">${listing.price.toLocaleString()}</span>
                                    {listing.type === 'Rent' && <span className="text-lg font-bold text-brand-accent ml-2">/ month</span>}
                                </div>
                            </div>

                            <div className="space-y-6 mb-10">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-brand-accent tracking-widest mb-3">Preferred Visit Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent" size={18} />
                                        <input type="date" className="w-full pl-14 pr-6 py-5 bg-brand-bg rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary shadow-inner" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-brand-accent tracking-widest mb-3">Visitors Count</label>
                                    <select className="w-full px-6 py-5 bg-brand-bg rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary appearance-none cursor-pointer shadow-inner">
                                        <option>1-2 Person</option>
                                        <option>3-5 Person</option>
                                        <option>6+ Person</option>
                                    </select>
                                </div>
                            </div>

                            <button className="btn-primary w-full py-6 text-xl shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Schedule a Visit
                            </button>

                            <div className="mt-8 p-6 bg-brand-secondary/5 rounded-[2rem] text-center">
                                <p className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">No upfront fee</p>
                                <p className="text-sm text-brand-primary italic">You only pay once you decide to move forward. Visit first, decide later.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
