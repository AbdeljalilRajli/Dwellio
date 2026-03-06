import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronDown, Search, Bed } from 'lucide-react';

const PRICE_RANGES = ['Any Price', 'Under $500K', '$500K–$1M', '$1M–$2M', '$2M+'];
const BEDROOM_OPTIONS = ['Any', '1+', '2+', '3+', '4+', '5+'];
const PROPERTY_TYPES = ['Any Type', 'House', 'Apartment', 'Villa', 'Penthouse', 'Cottage'];

interface SelectProps {
    icon: React.ReactNode;
    label: string;
    options: string[];
    value: string;
    onChange: (val: string) => void;
}

function SelectField({ icon, label, options, value, onChange }: SelectProps) {
    return (
        <div className="relative flex-1 min-w-0">
            <div className="flex items-center gap-2 px-4 py-3 cursor-pointer group">
                <span className="text-[#7C5C44] shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#999] mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {label}
                    </p>
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full bg-transparent text-[14px] font-medium text-[#1A1A1A] outline-none cursor-pointer appearance-none pr-5"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        {options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
                <ChevronDown size={14} className="text-[#999] shrink-0 absolute right-4 bottom-3.5" />
            </div>
        </div>
    );
}

export function PropertySearchForm() {
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const [type, setType] = useState('Any Type');
    const [price, setPrice] = useState('Any Price');
    const [beds, setBeds] = useState('Any');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (location) params.set('city', location);
        if (type !== 'Any Type') params.set('property_type', type);
        navigate(`/properties?${params.toString()}`);
    };

    return (
        <div
            className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col md:flex-row md:items-center"
            style={{ maxWidth: 860 }}
        >
            {/* Location */}
            <div className="flex-1 min-w-0 border-b md:border-b-0 md:border-r border-[#EDE0D5]">
                <div className="px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#999] mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>Location</p>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#7C5C44] shrink-0" />
                        <input
                            type="text"
                            placeholder="Where do you want to live?"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="flex-1 text-[14px] font-medium text-[#1A1A1A] bg-transparent outline-none placeholder:text-[#BDBDBD]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                    </div>
                </div>
            </div>

            <div className="border-b md:border-b-0 md:border-r border-[#EDE0D5]">
                <SelectField
                    icon={<ChevronDown size={15} />}
                    label="Type"
                    options={PROPERTY_TYPES}
                    value={type}
                    onChange={setType}
                />
            </div>

            <div className="border-b md:border-b-0 md:border-r border-[#EDE0D5]">
                <SelectField
                    icon={<ChevronDown size={15} />}
                    label="Price Range"
                    options={PRICE_RANGES}
                    value={price}
                    onChange={setPrice}
                />
            </div>

            <div className="border-b md:border-b-0 md:border-r border-[#EDE0D5]">
                <SelectField
                    icon={<Bed size={15} />}
                    label="Bedrooms"
                    options={BEDROOM_OPTIONS}
                    value={beds}
                    onChange={setBeds}
                />
            </div>

            {/* Search Button */}
            <div className="p-3">
                <button
                    onClick={handleSearch}
                    className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#7C5C44] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 whitespace-nowrap w-full md:w-auto justify-center"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                    <Search size={16} />
                    Search
                </button>
            </div>
        </div>
    );
}
