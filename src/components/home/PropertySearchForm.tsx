import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, Search, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const CITIES = ['Any Location', 'Marrakech', 'Casablanca', 'Rabat', 'Tangier', 'Agadir', 'Essaouira', 'Fes'];

const SALE_PRICE_RANGES = [
    { label: 'Any Price', min: 0, max: Infinity },
    { label: 'Under 2M MAD', min: 0, max: 2_000_000 },
    { label: '2M – 5M MAD', min: 2_000_000, max: 5_000_000 },
    { label: '5M – 10M MAD', min: 5_000_000, max: 10_000_000 },
    { label: '10M+ MAD', min: 10_000_000, max: Infinity },
];

const RENT_PRICE_RANGES = [
    { label: 'Any Price', min: 0, max: Infinity },
    { label: 'Under 8,000 MAD', min: 0, max: 8_000 },
    { label: '8,000 – 15,000 MAD', min: 8_000, max: 15_000 },
    { label: '15,000 – 25,000 MAD', min: 15_000, max: 25_000 },
    { label: '25,000+ MAD', min: 25_000, max: Infinity },
];

const BEDROOM_OPTIONS = [
    { label: 'Any', min: 0 },
    { label: '1+', min: 1 },
    { label: '2+', min: 2 },
    { label: '3+', min: 3 },
    { label: '4+', min: 4 },
    { label: '5+', min: 5 },
];

export function PropertySearchForm() {
    const navigate = useNavigate();
    const [dealType, setDealType] = useState<'Sale' | 'Rent'>('Sale');
    const [city, setCity] = useState('Any Location');
    const [priceIdx, setPriceIdx] = useState(0);
    const [bedsIdx, _setBedsIdx] = useState(0);

    const priceRanges = dealType === 'Sale' ? SALE_PRICE_RANGES : RENT_PRICE_RANGES;

    const handleSearch = () => {
        const params = new URLSearchParams();
        params.set('type', dealType);
        if (city !== 'Any Location') params.set('city', city);
        const pr = priceRanges[priceIdx];
        if (pr.min > 0) params.set('minPrice', String(pr.min));
        if (pr.max !== Infinity) params.set('maxPrice', String(pr.max));
        const br = BEDROOM_OPTIONS[bedsIdx];
        if (br.min > 0) params.set('minBedrooms', String(br.min));
        navigate(`/properties?${params.toString()}`);
    };

    return (
        <div className="w-full max-w-[900px] mx-auto">
            {/* Rent / Buy Toggle */}
            <div className="flex mb-4">
                {(['Sale', 'Rent'] as const).map(t => (
                    <motion.button
                        key={t}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setDealType(t); setPriceIdx(0); }}
                        className="px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider rounded-full transition-colors duration-200 mr-2"
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            background: dealType === t ? '#1A1A1A' : 'rgba(255,255,255,0.15)',
                            color: dealType === t ? '#fff' : '#EDE0D5',
                            border: dealType === t ? 'none' : '1px solid rgba(255,255,255,0.2)',
                            backdropFilter: dealType === t ? 'none' : 'blur(4px)',
                        }}
                    >
                        {t === 'Sale' ? 'Buy' : 'Rent'}
                    </motion.button>
                ))}
            </div>

            {/* Search Card */}
            <div
                className="bg-white/10 backdrop-blur-2xl rounded-[28px] p-3 border border-white/20 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.5)]"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    {/* Location */}
                    <motion.div
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        className="px-6 py-5 rounded-2xl transition-colors relative group"
                    >
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(237, 224, 213, 0.6)' }}>
                            Location
                        </label>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#7C5C44]/20 flex items-center justify-center shrink-0">
                                <MapPin size={16} style={{ color: '#EDE0D5' }} />
                            </div>
                            <select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="flex-1 bg-transparent text-[15px] font-semibold outline-none cursor-pointer appearance-none pr-6"
                                style={{ fontFamily: "'Inter', sans-serif", color: '#FFFFFF' }}
                            >
                                {CITIES.map(c => <option key={c} className="bg-[#1A1A1A] text-white">{c}</option>)}
                            </select>
                            <ChevronDown size={14} className="absolute right-6 top-1/2 mt-3 -translate-y-1/2 pointer-events-none opacity-40" style={{ color: '#FFF' }} />
                        </div>
                    </motion.div>

                    {/* Property Type */}
                    <motion.div
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        className="px-6 py-5 rounded-2xl transition-colors relative"
                    >
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(237, 224, 213, 0.6)' }}>
                            Property Type
                        </label>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#7C5C44]/20 flex items-center justify-center shrink-0">
                                <Home size={16} style={{ color: '#EDE0D5' }} />
                            </div>
                            <span className="text-[15px] font-semibold" style={{ fontFamily: "'Inter', sans-serif", color: '#FFFFFF' }}>
                                {dealType === 'Sale' ? 'Residential Sale' : 'Monthly Rental'}
                            </span>
                        </div>
                    </motion.div>

                    {/* Price Range */}
                    <motion.div
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        className="px-6 py-5 rounded-2xl transition-colors relative"
                    >
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(237, 224, 213, 0.6)' }}>
                            Budget
                        </label>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#7C5C44]/20 flex items-center justify-center shrink-0">
                                <span className="text-[11px] font-bold" style={{ color: '#EDE0D5' }}>MAD</span>
                            </div>
                            <select
                                value={priceIdx}
                                onChange={(e) => setPriceIdx(Number(e.target.value))}
                                className="flex-1 bg-transparent text-[15px] font-semibold outline-none cursor-pointer appearance-none pr-6"
                                style={{ fontFamily: "'Inter', sans-serif", color: '#FFFFFF' }}
                            >
                                {priceRanges.map((pr, i) => <option key={pr.label} value={i} className="bg-[#1A1A1A] text-white">{pr.label}</option>)}
                            </select>
                            <ChevronDown size={14} className="absolute right-6 top-1/2 mt-3 -translate-y-1/2 pointer-events-none opacity-40" style={{ color: '#FFF' }} />
                        </div>
                    </motion.div>

                    {/* Search Button Container */}
                    <div className="p-1 h-full flex items-center">
                        <motion.button
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 0 30px rgba(124, 92, 68, 0.4)'
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSearch}
                            className="w-full h-full flex items-center justify-center gap-3 text-white text-[14px] font-bold rounded-[20px] transition-all duration-300 py-6 lg:py-0"
                            style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                background: 'linear-gradient(135deg, #7C5C44 0%, #4A3528 100%)',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                            }}
                        >
                            <Search size={20} />
                            <span className="uppercase tracking-[0.1em]">Find Properties</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}

