import { MapPin, Bed, Maximize, Bath, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Listing } from '../../types';

interface ListingCardProps {
    listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
    return (
        <Link
            to={`/properties/${listing.id}`}
            className="group block bg-white rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_48px_80px_-16px_rgba(30,30,30,0.1)] hover:-translate-y-2 border border-brand-secondary/5"
        >
            <div className="relative h-72 overflow-hidden">
                <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg ${listing.type === 'Sale'
                        ? 'bg-brand-primary text-white'
                        : 'bg-white text-brand-primary'
                        }`}>
                        For {listing.type}
                    </span>
                </div>
            </div>

            <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center text-brand-accent/50 text-[10px] font-bold uppercase tracking-[0.1em] mb-2">
                            <MapPin size={12} className="mr-1.5" strokeWidth={2.5} />
                            <span>{listing.city}, California</span>
                        </div>
                        <h3 className="text-2xl font-display font-medium text-brand-primary group-hover:text-brand-accent transition-colors">{listing.title}</h3>
                    </div>
                </div>

                <div className="flex items-center gap-6 mb-8 py-6 border-y border-brand-secondary/10">
                    <div className="flex items-center gap-2">
                        <Bed size={18} className="text-brand-accent/40" strokeWidth={1.5} />
                        <span className="text-[14px] font-medium text-brand-accent/70">{listing.bedrooms} <span className="text-[12px] opacity-60">BR</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Bath size={18} className="text-brand-accent/40" strokeWidth={1.5} />
                        <span className="text-[14px] font-medium text-brand-accent/70">{listing.bathrooms} <span className="text-[12px] opacity-60">BA</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Maximize size={18} className="text-brand-accent/40" strokeWidth={1.5} />
                        <span className="text-[14px] font-medium text-brand-accent/70">{listing.area} <span className="text-[12px] opacity-60">SQFT</span></span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] uppercase font-bold text-brand-accent/40 tracking-[0.2em] mb-1">Price</p>
                        <span className="text-[28px] font-bold text-brand-primary font-display">
                            ${listing.price.toLocaleString()}
                        </span>
                    </div>
                    <div className="bg-brand-primary text-white p-4 rounded-2xl group-hover:bg-brand-accent transition-all duration-300">
                        <ArrowRight size={20} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
