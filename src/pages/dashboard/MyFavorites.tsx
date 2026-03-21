import { useQuery } from '@tanstack/react-query';
import { listingService } from '../../services/listingService';
import { useAuth } from '../../hooks/useAuth';
import { Heart, Loader2 } from 'lucide-react';
import { PropertyCard } from '../../components/ui/PropertyCard';
import { motion } from 'framer-motion';

export default function MyFavorites() {
    const { user } = useAuth();
    
    const { data: favorites, isLoading } = useQuery({
        queryKey: ['user-favorites', user?.id],
        queryFn: () => listingService.getFavorites(user!.id),
        enabled: !!user?.id
    });

    return (
        <div className="max-w-6xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12"
            >
                <div>
                    <h1 className="text-4xl font-display font-bold text-brand-primary mb-3">My Favorites</h1>
                    <p className="text-brand-accent italic text-lg opacity-80">Properties you've saved for later</p>
                </div>
                {!isLoading && favorites && favorites.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-brand-accent/10 px-6 py-2.5 rounded-2xl border border-brand-accent/20"
                    >
                        <span className="text-xs font-bold text-brand-accent uppercase tracking-[0.2em]">{favorites.length} Saved Properties</span>
                    </motion.div>
                )}
            </motion.div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                    <Loader2 className="animate-spin text-brand-accent" size={48} />
                    <p className="text-brand-accent font-bold italic animate-pulse">Retrieving your collection...</p>
                </div>
            ) : !favorites || favorites.length === 0 ? (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-[3rem] border-2 border-dashed border-brand-secondary/30 shadow-inner"
                >
                    <div className="bg-brand-accent/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Heart className="text-brand-accent/30" size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-primary mb-3">Your wishlist is empty</h3>
                    <p className="text-brand-accent max-w-sm mx-auto leading-relaxed">
                        Explore our luxury listings and click the heart icon to start building your dream collection.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-10 px-10 py-4 bg-brand-primary text-white rounded-2xl text-[13px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors shadow-xl"
                        onClick={() => window.location.href = '/properties'}
                    >
                        Browse Properties
                    </motion.button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 lg:gap-10">
                    {favorites.map((listing: any, index: number) => (
                        <motion.div
                            key={listing.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <PropertyCard listing={listing} />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
