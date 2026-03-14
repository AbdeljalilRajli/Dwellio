import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Heart, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Listing } from '../../types';

interface Props {
    listing: Listing;
}

export function PropertyCard({ listing }: Props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
            className="relative bg-white rounded-3xl overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-500 ease-out"
            style={{
                boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.08)' : '0 4px 20px rgba(0,0,0,0.03)',
                border: '1px solid #F0E6DB',
                transform: isHovered ? 'translateY(-10px)' : 'translateY(0)'
            }}
        >
            <Link to={`/properties/${listing.id}`} className="block flex-1 flex flex-col h-full">
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                        style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
                    />

                    {/* Overlay Gradient */}
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300"
                        style={{ opacity: isHovered ? 1 : 0 }}
                    >
                        <div
                            className="flex items-center justify-between transition-all duration-500"
                            style={{
                                transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                                opacity: isHovered ? 1 : 0
                            }}
                        >
                            <span className="text-white text-[18px] font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                ${listing.price.toLocaleString()}{listing.type === 'Rent' ? '/mo' : ''}
                            </span>
                            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                <Star size={12} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                                <span className="text-white text-[12px] font-bold">4.9</span>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <div
                            className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg backdrop-blur-md"
                            style={{ background: listing.type === 'Sale' ? 'rgba(124, 92, 68, 0.9)' : 'rgba(26, 26, 26, 0.9)' }}
                        >
                            For {listing.type}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-[#888]">
                            <MapPin size={14} className="shrink-0" style={{ color: '#7C5C44' }} />
                            <span className="text-[12px] font-medium truncate" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                {listing.city}, Morocco
                            </span>
                        </div>

                        <h3
                            className="text-[17px] font-bold mb-4 line-clamp-1 transition-colors duration-300"
                            style={{
                                fontFamily: "'Cormorant', serif",
                                color: isHovered ? '#7C5C44' : '#1A1A1A'
                            }}
                        >
                            {listing.title}
                        </h3>
                    </div>

                    <div className="pt-4 border-t border-[#F0E6DB]">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <Bed size={15} style={{ color: '#7C5C44' }} />
                                <span className="text-[13px] font-semibold" style={{ color: '#666' }}>{listing.bedrooms}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Bath size={15} style={{ color: '#7C5C44' }} />
                                <span className="text-[13px] font-semibold" style={{ color: '#666' }}>{listing.bathrooms}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Maximize size={15} style={{ color: '#7C5C44' }} />
                                <span className="text-[13px] font-semibold" style={{ color: '#666' }}>{listing.area} m²</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Favorite Button */}
            <motion.button
                whileHover={{ scale: 1.15, backgroundColor: '#FFFFFF' }}
                whileTap={{ scale: 0.85 }}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-lg z-20"
                style={{ background: 'rgba(255, 255, 255, 0.9)', color: '#1A1A1A' }}
            >
                <Heart size={16} />
            </motion.button>

            {/* Sliding View Details Button */}
            <div
                className="absolute bottom-4 right-6 pointer-events-none transition-all duration-500 ease-out z-20"
                style={{
                    transform: isHovered ? 'translateX(0)' : 'translateX(100px)',
                    opacity: isHovered ? 1 : 0
                }}
            >
                <div className="pointer-events-auto">
                    <Link
                        to={`/properties/${listing.id}`}
                        className="flex items-center gap-2 px-5 py-2.5 text-white text-[12px] font-bold uppercase tracking-widest rounded-xl shadow-xl transition-colors duration-300"
                        style={{ background: '#1A1A1A' }}
                    >
                        Details
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
