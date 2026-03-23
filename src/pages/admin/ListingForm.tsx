import React, { useState } from 'react';
import { Save, ArrowLeft, Loader2, Maximize, Bed, Bath, MapPin, Plus, X as CloseIcon, Image as ImageIcon, CheckCircle2, MapPinned } from 'lucide-react';
import { Link } from 'react-router-dom';
import { listingService } from '../../services/listingService';
import { useAuth } from '../../hooks/useAuth';
import type { Listing } from '../../types';

interface ListingFormProps {
    initialData?: Partial<Listing>;
    onSubmit: (data: any) => Promise<void>;
    title: string;
}

export default function ListingForm({ initialData, onSubmit, title }: ListingFormProps) {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        price: initialData?.price || '',
        type: initialData?.type || 'Sale',
        property_type: initialData?.property_type || 'House',
        city: initialData?.city || '',
        address: initialData?.address || '',
        bedrooms: initialData?.bedrooms || '',
        bathrooms: initialData?.bathrooms || '',
        area: initialData?.area || '',
        images: initialData?.images || [],
        amenities: initialData?.amenities || [],
        latitude: initialData?.latitude || '',
        longitude: initialData?.longitude || '',
    });

    const AMENITIES_LIST = [
        'Private Swimming Pool',
        'Covered Parking',
        'Landscaped Garden',
        'Central Air Conditioning',
        'Smart Home System',
        '24/7 Security',
        'High-Speed Internet',
        'Marble Flooring'
    ];

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>(initialData?.images || []);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setImageFiles(prev => [...prev, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index: number) => {
        // If it's a new file
        const previewCount = previews.length;
        const fileIndex = index - (previewCount - imageFiles.length);

        if (fileIndex >= 0) {
            setImageFiles(prev => prev.filter((_, i) => i !== fileIndex));
        } else {
            // It was an existing image
            setFormData(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index)
            }));
        }

        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            let finalImages = [...formData.images];

            if (imageFiles.length > 0) {
                const uploadedUrls = await listingService.uploadImages(imageFiles, user.id);
                finalImages = [...finalImages, ...uploadedUrls];
            }

            if (finalImages.length === 0) {
                alert('Please upload at least one image');
                return;
            }

            await onSubmit({ ...formData, images: finalImages });
        } catch (error: any) {
            alert(error.message || 'Error saving listing');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center space-x-6 mb-12">
                <Link to="/admin/listings" className="p-4 bg-brand-bg rounded-2xl text-brand-accent hover:text-brand-primary transition-colors hover:scale-105 active:scale-95 shadow-sm">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-4xl font-display font-bold text-brand-primary">{title}</h1>
                    <p className="text-brand-accent italic font-medium">Provide detailed information about the property</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="bg-brand-bg/30 p-10 rounded-[3rem] border border-brand-secondary/5 space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Property Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="w-full px-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary shadow-sm"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Modern Minimalist House"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Property Type</label>
                            <select
                                name="property_type"
                                className="w-full px-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary appearance-none cursor-pointer shadow-sm"
                                value={formData.property_type}
                                onChange={handleChange}
                            >
                                <option>Villa</option>
                                <option>Apartment</option>
                                <option>House</option>
                                <option>Penthouse</option>
                                <option>Riad</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">City</label>
                            <div className="relative group">
                                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-accent/30 group-focus-within:text-brand-accent transition-colors" size={20} />
                                <select
                                    name="city"
                                    required
                                    className="w-full pl-16 pr-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary appearance-none cursor-pointer shadow-sm"
                                    value={formData.city}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a city</option>
                                    <option value="Marrakech">Marrakech</option>
                                    <option value="Casablanca">Casablanca</option>
                                    <option value="Rabat">Rabat</option>
                                    <option value="Tangier">Tangier</option>
                                    <option value="Agadir">Agadir</option>
                                    <option value="Essaouira">Essaouira</option>
                                    <option value="Fes">Fes</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Listing Type</label>
                            <div className="flex p-1 bg-white rounded-2xl shadow-sm">
                                {['Sale', 'Rent'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, type: type as any }))}
                                        className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${formData.type === type ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-brand-accent hover:text-brand-primary'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                required
                                className="w-full px-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary shadow-sm"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Area (sq ft)</label>
                            <div className="relative group">
                                <Maximize className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-accent/30 group-focus-within:text-brand-accent transition-colors" size={20} />
                                <input
                                    type="number"
                                    name="area"
                                    className="w-full pl-16 pr-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary shadow-sm"
                                    value={formData.area}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Description</label>
                            <textarea
                                name="description"
                                rows={4}
                                className="w-full px-8 py-6 bg-white rounded-[2rem] border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-medium text-brand-primary shadow-sm resize-none"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Tell us about the property features, neighborhood, etc."
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Location & Details */}
                <div className="bg-brand-bg/30 p-10 rounded-[3rem] border border-brand-secondary/5 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Full Address</label>
                            <div className="relative group">
                                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-accent/30 group-focus-within:text-brand-accent transition-colors" size={20} />
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    className="w-full pl-16 pr-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary shadow-sm"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="e.g. 123 Luxury Ave, CA 90210"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Latitude</label>
                            <div className="relative group">
                                <MapPinned className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-accent/30 group-focus-within:text-brand-accent transition-colors" size={20} />
                                <input
                                    type="number"
                                    step="any"
                                    name="latitude"
                                    className="w-full pl-16 pr-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary shadow-sm"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    placeholder="e.g. 31.6295"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Longitude</label>
                            <div className="relative group">
                                <MapPinned className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-accent/30 group-focus-within:text-brand-accent transition-colors" size={20} />
                                <input
                                    type="number"
                                    step="any"
                                    name="longitude"
                                    className="w-full pl-16 pr-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary shadow-sm"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    placeholder="e.g. -7.9811"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Bedrooms</label>
                            <div className="relative group">
                                <Bed className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-accent/30 group-focus-within:text-brand-accent transition-colors" size={20} />
                                <input
                                    type="number"
                                    name="bedrooms"
                                    className="w-full pl-16 pr-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary shadow-sm"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Bathrooms</label>
                            <div className="relative group">
                                <Bath className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-accent/30 group-focus-within:text-brand-accent transition-colors" size={20} />
                                <input
                                    type="number"
                                    name="bathrooms"
                                    className="w-full pl-16 pr-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary shadow-sm"
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Amenities & Features */}
                <div className="bg-brand-bg/30 p-10 rounded-[3rem] border border-brand-secondary/5 space-y-8">
                    <div>
                        <h3 className="text-xl font-display font-bold text-brand-primary mb-6 ml-4">Amenities & Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {AMENITIES_LIST.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => {
                                        setFormData(prev => {
                                            const amenities = prev.amenities.includes(item)
                                                ? prev.amenities.filter(a => a !== item)
                                                : [...prev.amenities, item];
                                            return { ...prev, amenities };
                                        });
                                    }}
                                    className={`flex items-center gap-3 py-4 px-6 rounded-2xl transition-all duration-200 border text-left group ${formData.amenities.includes(item)
                                            ? 'bg-white border-brand-primary/20 shadow-sm'
                                            : 'bg-white/40 border-transparent hover:bg-white hover:border-brand-primary/10'
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${formData.amenities.includes(item)
                                            ? 'bg-brand-primary text-white'
                                            : 'bg-brand-secondary/20 text-brand-accent/30 group-hover:text-brand-primary/40'
                                        }`}>
                                        <CheckCircle2 size={14} strokeWidth={3} />
                                    </div>
                                    <span className={`text-[14px] font-bold transition-colors ${formData.amenities.includes(item)
                                            ? 'text-brand-primary'
                                            : 'text-brand-accent group-hover:text-brand-primary'
                                        }`} style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        {item}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-brand-bg/30 p-10 rounded-[3rem] border border-brand-secondary/5 space-y-6">
                    <div className="flex justify-between items-center mb-4 ml-4">
                        <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest">Property Images</label>
                        <label className="cursor-pointer text-xs font-bold text-brand-primary hover:underline flex items-center bg-white px-4 py-2 rounded-full shadow-sm uppercase tracking-tighter">
                            <Plus size={14} className="mr-1" /> Add Images
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {previews.map((preview, idx) => (
                            <div key={idx} className="relative aspect-square group">
                                <img
                                    src={preview}
                                    alt={`Preview ${idx}`}
                                    className="w-full h-full object-cover rounded-2xl shadow-sm border border-brand-secondary/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(idx)}
                                    className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-bg"
                                >
                                    <CloseIcon size={16} />
                                </button>
                            </div>
                        ))}

                        <label className="aspect-square rounded-2xl border-2 border-dashed border-brand-accent/20 flex flex-col items-center justify-center text-brand-accent hover:border-brand-primary/40 hover:text-brand-primary transition-all cursor-pointer bg-white/50">
                            <ImageIcon size={32} className="mb-2 opacity-50" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Upload Image</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>

                    <p className="text-xs text-brand-accent italic ml-4">Upload high-quality images to attract more buyers.</p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-6 text-xl flex items-center justify-center space-x-3 shadow-2xl shadow-brand-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 disabled:hover:scale-100"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" size={28} />
                    ) : (
                        <>
                            <Save size={24} />
                            <span>{title.includes('Create') ? 'Publish Property' : 'Save Changes'}</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
