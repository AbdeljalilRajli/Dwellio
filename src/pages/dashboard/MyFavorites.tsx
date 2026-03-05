import { Heart } from 'lucide-react';

export default function MyFavorites() {
    const favorites: any[] = [];

    return (
        <div>
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-display font-bold text-brand-primary mb-2">My Favorites</h1>
                    <p className="text-brand-accent italic">Properties you've saved for later</p>
                </div>
                <div className="bg-brand-secondary/10 px-4 py-2 rounded-full">
                    <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">{favorites.length} Saved</span>
                </div>
            </div>

            {favorites.length === 0 ? (
                <div className="text-center py-20 bg-brand-bg/50 rounded-[2.5rem] border-2 border-dashed border-brand-secondary/20">
                    <Heart className="mx-auto text-brand-accent/30 mb-6" size={64} />
                    <p className="text-xl font-bold text-brand-primary mb-2">Your wishlist is empty</p>
                    <p className="text-brand-accent max-w-xs mx-auto">Explore our listings and click the heart icon to save properties you love.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Listing cards for favorites would be mapped here */}
                </div>
            )}
        </div>
    );
}
