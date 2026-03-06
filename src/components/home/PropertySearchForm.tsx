import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Home, Bed, ChevronDown } from 'lucide-react';

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
    const [bedsIdx, setBedsIdx] = useState(0);

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
                    <button
                        key={t}
                        onClick={() => { setDealType(t); setPriceIdx(0); }}
                        className="px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider rounded-full transition-all duration-200 mr-2"
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            background: dealType === t ? '#1A1A1A' : 'rgba(255,255,255,0.15)',
                            color: dealType === t ? '#fff' : '#EDE0D5',
                            border: dealType === t ? 'none' : '1px solid rgba(255,255,255,0.2)',
                            backdropFilter: dealType === t ? 'none' : 'blur(4px)',
                        }}
                    >
                        {t === 'Sale' ? 'Buy' : 'Rent'}
                    </button>
                ))}
            </div>

            {/* Search Card */}
            <div
                className="bg-white rounded-2xl p-2"
                style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.12)' }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
                    {/* Location */}
                    <div className="px-5 py-4 border-b sm:border-b lg:border-b-0 lg:border-r border-[#F0E6DB]">
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#AAAAAA' }}>
                            Location
                        </label>
                        <div className="flex items-center gap-2.5">
                            <MapPin size={16} className="shrink-0" style={{ color: '#7C5C44' }} />
                            <select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="flex-1 bg-transparent text-[14px] font-medium outline-none cursor-pointer appearance-none"
                                style={{ fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}
                            >
                                {CITIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <ChevronDown size={13} className="shrink-0" style={{ color: '#CCC' }} />
                        </div>
                    </div>

                    {/* Property Type */}
                    <div className="px-5 py-4 border-b sm:border-b lg:border-b-0 lg:border-r border-[#F0E6DB]">
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#AAAAAA' }}>
                            Property Type
                        </label>
                        <div className="flex items-center gap-2.5">
                            <Home size={16} className="shrink-0" style={{ color: '#7C5C44' }} />
                            <span className="text-[14px] font-medium" style={{ fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}>
                                {dealType === 'Sale' ? 'For Sale' : 'For Rent'}
                            </span>
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="px-5 py-4 border-b sm:border-b-0 lg:border-r border-[#F0E6DB]">
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#AAAAAA' }}>
                            Price Range
                        </label>
                        <div className="flex items-center gap-2.5">
                            <span className="shrink-0 text-[14px] font-bold" style={{ color: '#7C5C44' }}>MAD</span>
                            <select
                                value={priceIdx}
                                onChange={(e) => setPriceIdx(Number(e.target.value))}
                                className="flex-1 bg-transparent text-[14px] font-medium outline-none cursor-pointer appearance-none"
                                style={{ fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}
                            >
                                {priceRanges.map((pr, i) => <option key={pr.label} value={i}>{pr.label}</option>)}
                            </select>
                            <ChevronDown size={13} className="shrink-0" style={{ color: '#CCC' }} />
                        </div>
                    </div>

                    {/* Bedrooms */}
                    <div className="px-5 py-4">
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#AAAAAA' }}>
                            Bedrooms
                        </label>
                        <div className="flex items-center gap-2.5">
                            <Bed size={16} className="shrink-0" style={{ color: '#7C5C44' }} />
                            <select
                                value={bedsIdx}
                                onChange={(e) => setBedsIdx(Number(e.target.value))}
                                className="flex-1 bg-transparent text-[14px] font-medium outline-none cursor-pointer appearance-none"
                                style={{ fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}
                            >
                                {BEDROOM_OPTIONS.map((b, i) => <option key={b.label} value={i}>{b.label}</option>)}
                            </select>
                            <ChevronDown size={13} className="shrink-0" style={{ color: '#CCC' }} />
                        </div>
                    </div>
                </div>

                {/* Search Button — full width below fields */}
                <div className="px-2 pb-2 pt-1">
                    <button
                        onClick={handleSearch}
                        className="w-full flex items-center justify-center gap-2.5 text-white text-[15px] font-bold py-4 rounded-xl transition-all duration-200"
                        style={{ fontFamily: "'Outfit', sans-serif", background: '#1A1A1A' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#7C5C44')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#1A1A1A')}
                    >
                        <Search size={18} />
                        Search Properties
                    </button>
                </div>
            </div>
        </div>
    );
}
