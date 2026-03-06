import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PropertyCard } from '../components/ui/PropertyCard';
import { listingService } from '../services/listingService';

export default function ListingPage() {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<'All' | 'Sale' | 'Rent'>('All');

    const { data: listings, isLoading } = useQuery({
        queryKey: ['listings'],
        queryFn: () => listingService.getAllListings()
    });

    const filteredListings = listings?.filter(l => {
        const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase()) || l.city.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter === 'All' || l.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen" style={{ background: '#FBF8F5' }}>
            <Navbar />

            {/* Page Header */}
            <div className="pt-24 pb-12" style={{ background: '#F5EEE8' }}>
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <p className="text-[#7C5C44] text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Browse Properties</p>
                    <h1 className="text-[#1A1A1A] mb-2" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.025em' }}>
                        Find Your Perfect{' '}
                        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#7C5C44' }}>
                            Living Space
                        </span>
                    </h1>
                    <p className="text-[#888]" style={{ fontFamily: "'Inter', sans-serif" }}>Discover our curated selection of premium properties.</p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" size={18} />
                        <input
                            type="text"
                            placeholder="Search by location or title..."
                            className="w-full pl-12 pr-5 py-3.5 bg-white border border-[#EDE0D5] rounded-xl focus:outline-none focus:border-[#7C5C44] text-[14px] transition-colors"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        {(['All', 'Sale', 'Rent'] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setTypeFilter(f)}
                                className="px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    background: typeFilter === f ? '#1A1A1A' : '#fff',
                                    color: typeFilter === f ? '#fff' : '#888',
                                    border: `2px solid ${typeFilter === f ? '#1A1A1A' : '#EDE0D5'}`,
                                }}
                            >
                                {f === 'All' ? 'All Types' : `For ${f}`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results count */}
                {!isLoading && (
                    <p className="text-[#888] text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {filteredListings?.length} {filteredListings?.length === 1 ? 'property' : 'properties'} found
                    </p>
                )}

                {/* Listings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        [1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-96 bg-[#EDE0D5]/50 animate-pulse rounded-[1.75rem]" />
                        ))
                    ) : (
                        filteredListings?.map(listing => (
                            <PropertyCard key={listing.id} listing={listing} />
                        ))
                    )}
                </div>

                {/* Empty state */}
                {!isLoading && filteredListings?.length === 0 && (
                    <div className="text-center py-24">
                        <div className="w-16 h-16 bg-[#F0E6DB] rounded-2xl flex items-center justify-center mx-auto mb-5">
                            <SlidersHorizontal className="text-[#7C5C44]" size={26} />
                        </div>
                        <p className="text-xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>No properties found</p>
                        <p className="text-[#888]" style={{ fontFamily: "'Inter', sans-serif" }}>Try adjusting your search or filters.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
