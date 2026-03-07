import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Heart, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Listing } from '../../types';

interface Props {
    listing: Listing;
}

export function PropertyCard({ listing }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
            className="group relative bg-white rounded-3xl overflow-hidden"
            style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                border: '1px solid #F0E6DB'
            }}
        >
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay Gradient (appears on hover) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center justify-between"
                    >
                        <span className="text-white text-[18px] font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                            {listing.price.toLocaleString()} MAD{listing.type === 'Rent' ? '/mo' : ''}
                        </span>
                        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                            <Star size={12} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                            <span className="text-white text-[12px] font-bold">4.9</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div
                        className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg backdrop-blur-md"
                        style={{ background: listing.type === 'Sale' ? 'rgba(124, 92, 68, 0.9)' : 'rgba(26, 26, 26, 0.9)' }}
                    >
                        For {listing.type}
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.15, backgroundColor: '#FFFFFF' }}
                    whileTap={{ scale: 0.85 }}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-lg"
                    style={{ background: 'rgba(255, 255, 255, 0.9)', color: '#1A1A1A' }}
                >
                    <Heart size={16} />
                </motion.button>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-2 text-[#888]">
                    <MapPin size={14} className="shrink-0" style={{ color: '#7C5C44' }} />
                    <span className="text-[12px] font-medium truncate" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        {listing.city}, Morocco
                    </span>
                </div>

                <h3 className="text-[17px] font-bold mb-4 line-clamp-1 transition-colors group-hover:text-[#7C5C44]" style={{ fontFamily: "'Cormorant', serif", color: '#1A1A1A' }}>
                    {listing.title}
                </h3>

                <div className="flex items-center justify-between pt-4 border-t border-[#F0E6DB]">
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

            {/* Sliding View Details Button */}
            <motion.div
                className="absolute bottom-4 right-6 pointer-events-none"
                initial={{ x: 100, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <div className="pointer-events-auto">
                    <Link
                        to={`/properties/${listing.id}`}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-white text-[12px] font-bold uppercase tracking-widest rounded-xl shadow-xl hover:bg-[#7C5C44] transition-colors"
                    >
                        Details
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
}

