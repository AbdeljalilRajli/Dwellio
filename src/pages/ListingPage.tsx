import { useState } from 'react';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ListingCard } from '../components/ui/ListingCard';
import { listingService } from '../services/listingService';

export default function ListingPage() {
    const [search, setSearch] = useState('');

    const { data: listings, isLoading } = useQuery({
        queryKey: ['listings'],
        queryFn: () => listingService.getAllListings()
    });

    const filteredListings = listings?.filter(l =>
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.city.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen pt-20">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-xl">
                        <h1 className="text-4xl lg:text-5xl font-display font-bold text-brand-primary mb-4 italic">Find Your Perfect <span className="text-brand-accent italic font-normal">Living Space</span></h1>
                        <p className="text-brand-accent/80 font-medium italic">Discover over 1,200+ properties meticulously tailored to your unique lifestyle.</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-96 group shadow-lg shadow-brand-secondary/5">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search location, title..."
                                className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-3xl focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-medium shadow-inner"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        {/* Removed non-functional filter button to fix lint error */}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {isLoading ? (
                        [1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-[480px] bg-brand-secondary/5 animate-pulse rounded-[2.5rem]" />)
                    ) : (
                        filteredListings?.map(listing => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))
                    )}
                </div>

                {!isLoading && filteredListings?.length === 0 && (
                    <div className="text-center py-32 bg-brand-card/10 rounded-[3rem] mt-12 border-2 border-dashed border-brand-secondary/30">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <Search className="text-brand-accent" size={32} />
                        </div>
                        <p className="text-2xl font-display font-bold text-brand-primary mb-2">No properties found</p>
                        <p className="text-brand-accent">Try searching with a different term or location.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
