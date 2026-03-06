import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react';
import type { Listing } from '../../types';

interface PropertyCardProps {
    listing: Listing;
}

export function PropertyCard({ listing }: PropertyCardProps) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="group bg-white rounded-[1.75rem] overflow-hidden transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1 card-shadow">
            {/* Image */}
            <Link to={`/properties/${listing.id}`} className="block relative overflow-hidden h-56">
                <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Type Badge */}
                <span
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider"
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        background: listing.type === 'Sale' ? '#1A1A1A' : '#7C5C44',
                        color: '#fff',
                    }}
                >
                    For {listing.type}
                </span>
                {/* Favorite */}
                <button
                    onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
                >
                    <Heart
                        size={15}
                        className={liked ? 'fill-red-500 text-red-500' : 'text-[#888]'}
                    />
                </button>
            </Link>

            {/* Content */}
            <div className="bg-[#F7F2EE] px-5 py-4">
                {/* Location */}
                <div className="flex items-center gap-1.5 mb-2">
                    <MapPin size={13} className="text-[#7C5C44] shrink-0" strokeWidth={2.5} />
                    <span
                        className="text-[12px] text-[#888] font-medium"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        {listing.city}, California
                    </span>
                </div>
                {/* Title */}
                <Link to={`/properties/${listing.id}`}>
                    <h3
                        className="text-[16px] font-bold text-[#1A1A1A] mb-3 leading-tight hover:text-[#7C5C44] transition-colors line-clamp-1"
                        style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em' }}
                    >
                        {listing.title}
                    </h3>
                </Link>
                {/* Details row */}
                <div className="flex items-center gap-4 mb-3 pb-3 border-b border-[#EDE0D5]">
                    <div className="flex items-center gap-1.5">
                        <Bed size={14} className="text-[#7C5C44]" strokeWidth={2} />
                        <span className="text-[12px] text-[#666] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {listing.bedrooms} Beds
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Bath size={14} className="text-[#7C5C44]" strokeWidth={2} />
                        <span className="text-[12px] text-[#666] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {listing.bathrooms} Baths
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Maximize size={14} className="text-[#7C5C44]" strokeWidth={2} />
                        <span className="text-[12px] text-[#666] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {listing.area} ft²
                        </span>
                    </div>
                </div>
                {/* Price */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-[#aaa] font-semibold uppercase tracking-widest mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            {listing.type === 'Rent' ? 'Monthly' : 'Price'}
                        </p>
                        <p
                            className="text-[22px] font-bold text-[#1A1A1A] leading-none"
                            style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em' }}
                        >
                            ${listing.price.toLocaleString()}
                        </p>
                    </div>
                    <Link
                        to={`/properties/${listing.id}`}
                        className="text-[12px] font-semibold text-[#7C5C44] hover:text-[#1A1A1A] transition-colors underline underline-offset-2"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        View Details →
                    </Link>
                </div>
            </div>
        </div>
    );
}
