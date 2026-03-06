import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Heart, ArrowRight } from 'lucide-react';
import type { Listing } from '../../types';

interface Props {
    listing: Listing;
}

export function PropertyCard({ listing }: Props) {
    const [liked, setLiked] = useState(false);

    const formatPrice = (price: number, type: string) => {
        if (type === 'Rent') {
            return `${price.toLocaleString()} MAD/mo`;
        }
        if (price >= 1_000_000) {
            return `${(price / 1_000_000).toFixed(1).replace('.0', '')}M MAD`;
        }
        return `${price.toLocaleString()} MAD`;
    };

    return (
        <div className="group rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            {/* Image */}
            <div className="relative h-[240px] overflow-hidden">
                <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Type Badge */}
                <span
                    className="absolute top-4 left-4 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg text-white"
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        background: listing.type === 'Rent' ? '#7C5C44' : '#1A1A1A',
                    }}
                >
                    For {listing.type}
                </span>
                {/* Favorite */}
                <button
                    onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                        background: liked ? '#1A1A1A' : 'rgba(255,255,255,0.85)',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <Heart
                        size={16}
                        fill={liked ? '#fff' : 'none'}
                        style={{ color: liked ? '#fff' : '#666' }}
                    />
                </button>
                {/* Price Overlay */}
                <div className="absolute bottom-4 left-4">
                    <span
                        className="px-3 py-1.5 rounded-lg text-white text-[15px] font-bold"
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            background: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        {formatPrice(listing.price, listing.type)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3
                    className="text-[17px] font-bold mb-1.5 line-clamp-1"
                    style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A' }}
                >
                    {listing.title}
                </h3>
                <div className="flex items-center gap-1.5 mb-4">
                    <MapPin size={13} style={{ color: '#7C5C44' }} />
                    <span className="text-[13px] font-medium" style={{ fontFamily: "'Inter', sans-serif", color: '#999' }}>
                        {listing.city}, Morocco
                    </span>
                </div>

                {/* Details Row */}
                <div className="flex items-center gap-4 pb-4 border-b border-[#F0E6DB]">
                    <div className="flex items-center gap-1.5">
                        <Bed size={14} style={{ color: '#7C5C44' }} />
                        <span className="text-[13px] font-medium" style={{ fontFamily: "'Inter', sans-serif", color: '#666' }}>
                            {listing.bedrooms} {listing.bedrooms === 1 ? 'Bed' : 'Beds'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Bath size={14} style={{ color: '#7C5C44' }} />
                        <span className="text-[13px] font-medium" style={{ fontFamily: "'Inter', sans-serif", color: '#666' }}>
                            {listing.bathrooms} {listing.bathrooms === 1 ? 'Bath' : 'Baths'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Maximize size={14} style={{ color: '#7C5C44' }} />
                        <span className="text-[13px] font-medium" style={{ fontFamily: "'Inter', sans-serif", color: '#666' }}>
                            {listing.area} m²
                        </span>
                    </div>
                </div>

                {/* View Details */}
                <Link
                    to={`/properties/${listing.id}`}
                    className="flex items-center justify-between mt-4 group/link"
                >
                    <span
                        className="text-[13px] font-semibold transition-colors group-hover/link:text-[#7C5C44]"
                        style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A' }}
                    >
                        View Details
                    </span>
                    <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" style={{ color: '#7C5C44' }} />
                </Link>
            </div>
        </div>
    );
}
