import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, X, Bed, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PropertyCard } from '../components/ui/PropertyCard';
import { PageHeader } from '../components/ui/PageHeader';
import { listingService } from '../services/listingService';

const CITIES = ['All Cities', 'Marrakech', 'Casablanca', 'Rabat', 'Tangier', 'Agadir', 'Essaouira', 'Fes'];
const PROPERTY_TYPES = ['All Types', 'Villa', 'Apartment', 'House', 'Penthouse', 'Riad'];

export default function ListingPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState('');

    const dealType = (searchParams.get('type') as 'Sale' | 'Rent' | 'All') || 'All';
    const city = searchParams.get('city') || 'All Cities';
    const propertyType = searchParams.get('property_type') || 'All Types';
    const bedsMin = Number(searchParams.get('minBedrooms')) || 0;

    const updateFilter = (updates: Record<string, string | number | undefined>) => {
        const newParams = new URLSearchParams(searchParams);
        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === 'All' || value === 'All Cities' || value === 'All Types' || value === 0) {
                newParams.delete(key);
            } else {
                newParams.set(key, String(value));
            }
        });
        setSearchParams(newParams);
    };

    const filters = {
        type: dealType !== 'All' ? (dealType as 'Sale' | 'Rent') : undefined,
        city: city !== 'All Cities' ? city : undefined,
        property_type: propertyType !== 'All Types' ? propertyType : undefined,
        minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
        maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
        minBedrooms: bedsMin > 0 ? bedsMin : undefined,
    };

    const { data: listings, isLoading } = useQuery({
        queryKey: ['listings', filters],
        queryFn: () => listingService.getAllListings(filters),
    });

    const filteredListings = listings?.filter(l => {
        if (!search) return true;
        const q = search.toLowerCase();
        return l.title.toLowerCase().includes(q) || l.city.toLowerCase().includes(q) || l.address.toLowerCase().includes(q);
    });

    const hasFilters = dealType !== 'All' || city !== 'All Cities' || propertyType !== 'All Types' || search || bedsMin > 0;

    const clearFilters = () => {
        setSearch('');
        setSearchParams({}, { replace: true });
    };

    const pageTitle = dealType === 'Rent' ? 'Properties for Rent' : dealType === 'Sale' ? 'Properties for Sale' : 'All Properties';

    const breadcrumbs: { label: string; path?: string }[] = [
        { label: 'Home', path: '/' },
        { label: 'Properties', path: '/properties' }
    ];

    if (dealType !== 'All') {
        breadcrumbs.push({ label: `For ${dealType}` });
    } else if (city !== 'All Cities') {
        breadcrumbs.push({ label: city });
    } else if (propertyType !== 'All Types') {
        breadcrumbs.push({ label: propertyType });
    }

    return (
        <div className="min-h-screen" style={{ background: '#FBF8F5' }}>
            <Navbar />

            <PageHeader 
                title={pageTitle} 
                subtitle="Discover verified properties across Morocco's most desirable cities."
                breadcrumbs={breadcrumbs}
            />

            <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
                {/* Filter Bar */}
                <div className="bg-white rounded-2xl p-4 mb-8" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                    <div className="flex flex-wrap gap-3 items-center">
                        {/* Search */}
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: '#AAA' }} />
                            <input
                                type="text"
                                placeholder="Search by name, city, or address..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl text-[14px] font-medium outline-none"
                                style={{ fontFamily: "'Quicksand', sans-serif", background: '#FAFAFA', border: '1px solid #EDE0D5', color: '#1A1A1A' }}
                            />
                        </div>

                        {/* Deal Type */}
                        <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid #EDE0D5' }}>
                            {(['All', 'Sale', 'Rent'] as const).map(t => (
                                <button
                                    key={t}
                                    onClick={() => updateFilter({ type: t })}
                                    className="px-4 py-3 text-[13px] font-semibold transition-all"
                                    style={{
                                        fontFamily: "'Quicksand', sans-serif",
                                        background: dealType === t ? '#1A1A1A' : 'transparent',
                                        color: dealType === t ? '#fff' : '#888',
                                    }}
                                >
                                    {t === 'All' ? 'All' : t === 'Sale' ? 'Buy' : 'Rent'}
                                </button>
                            ))}
                        </div>

                        {/* City */}
                        <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#FAFAFA', border: '1px solid #EDE0D5' }}>
                            <MapPin size={14} style={{ color: '#7C5C44' }} />
                            <select
                                value={city}
                                onChange={(e) => updateFilter({ city: e.target.value })}
                                className="bg-transparent text-[13px] font-medium outline-none cursor-pointer appearance-none pr-4"
                                style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}
                            >
                                {CITIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <ChevronDown size={12} style={{ color: '#CCC' }} />
                        </div>

                        {/* Property Type */}
                        <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#FAFAFA', border: '1px solid #EDE0D5' }}>
                            <SlidersHorizontal size={14} style={{ color: '#7C5C44' }} />
                            <select
                                value={propertyType}
                                onChange={(e) => updateFilter({ property_type: e.target.value })}
                                className="bg-transparent text-[13px] font-medium outline-none cursor-pointer appearance-none pr-4"
                                style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}
                            >
                                {PROPERTY_TYPES.map(p => <option key={p}>{p}</option>)}
                            </select>
                            <ChevronDown size={12} style={{ color: '#CCC' }} />
                        </div>

                        {/* Bedrooms */}
                        <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: '#FAFAFA', border: '1px solid #EDE0D5' }}>
                            <Bed size={14} style={{ color: '#7C5C44' }} />
                            <select
                                value={bedsMin}
                                onChange={(e) => updateFilter({ minBedrooms: e.target.value })}
                                className="bg-transparent text-[13px] font-medium outline-none cursor-pointer appearance-none pr-4"
                                style={{ fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}
                            >
                                <option value={0}>Beds</option>
                                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+</option>)}
                            </select>
                            <ChevronDown size={12} style={{ color: '#CCC' }} />
                        </div>

                        {/* Clear */}
                        {hasFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-[13px] font-semibold transition-colors"
                                style={{ fontFamily: "'Quicksand', sans-serif", color: '#7C5C44', border: '1px solid #7C5C44' }}
                            >
                                <X size={13} /> Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Results info */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-[14px] font-medium" style={{ fontFamily: "'Quicksand', sans-serif", color: '#888' }}>
                        {isLoading ? 'Loading...' : `${filteredListings?.length ?? 0} ${(filteredListings?.length ?? 0) === 1 ? 'property' : 'properties'} found`}
                    </p>
                    <div className="flex gap-2 flex-wrap justify-end">
                        {dealType !== 'All' && (
                            <span className="text-[11px] font-bold px-3 py-1 rounded-full text-white" style={{ fontFamily: "'Quicksand', sans-serif", background: '#1A1A1A' }}>
                                {dealType === 'Sale' ? 'For Sale' : 'For Rent'}
                            </span>
                        )}
                        {city !== 'All Cities' && (
                            <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ fontFamily: "'Quicksand', sans-serif", background: '#F0E6DB', color: '#7C5C44' }}>
                                {city}
                            </span>
                        )}
                        {propertyType !== 'All Types' && (
                            <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ fontFamily: "'Quicksand', sans-serif", background: '#F0E6DB', color: '#7C5C44' }}>
                                {propertyType}
                            </span>
                        )}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-[400px] bg-[#EDE0D5]/40 animate-pulse rounded-2xl" />
                        ))
                        : filteredListings?.map(listing => (
                            <PropertyCard key={listing.id} listing={listing} />
                        ))
                    }
                </div>

                {/* Empty state */}
                {!isLoading && filteredListings?.length === 0 && (
                    <div className="text-center py-24">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: '#F0E6DB' }}>
                            <SlidersHorizontal size={26} style={{ color: '#7C5C44' }} />
                        </div>
                        <p className="text-xl font-bold mb-2" style={{ fontFamily: "'Cormorant', serif", color: '#1A1A1A' }}>
                            No properties found
                        </p>
                        <p className="text-[15px] mb-6" style={{ fontFamily: "'Quicksand', sans-serif", color: '#888' }}>
                            Try adjusting your search or filters.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="text-[14px] font-bold text-white px-6 py-3 rounded-xl transition-all"
                            style={{ fontFamily: "'Quicksand', sans-serif", background: '#1A1A1A' }}
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
