import React, { useState } from 'react';
import { Camera, Save, ArrowLeft, Loader2, Maximize, Bed, Bath, MapPin, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Listing } from '../../types';

interface ListingFormProps {
    initialData?: Partial<Listing>;
    onSubmit: (data: any) => Promise<void>;
    title: string;
}

export default function ListingForm({ initialData, onSubmit, title }: ListingFormProps) {
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
        images: initialData?.images || [''],
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (index: number, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const addImageField = () => {
        setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
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
                                <option>House</option>
                                <option>Apartment</option>
                                <option>Villa</option>
                                <option>Studio</option>
                            </select>
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

                {/* Images */}
                <div className="bg-brand-bg/30 p-10 rounded-[3rem] border border-brand-secondary/5 space-y-6">
                    <div className="flex justify-between items-center mb-4 ml-4">
                        <label className="block text-xs font-bold uppercase text-brand-accent tracking-widest">Property Images</label>
                        <button type="button" onClick={addImageField} className="text-xs font-bold text-brand-primary hover:underline flex items-center bg-white px-4 py-2 rounded-full shadow-sm uppercase tracking-tighter">
                            <Plus size={14} className="mr-1" /> Add Image URL
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.images.map((img, idx) => (
                            <div key={idx} className="relative group">
                                <Camera className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-accent/30" size={20} />
                                <input
                                    type="url"
                                    className="w-full pl-16 pr-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-medium text-brand-primary shadow-sm"
                                    value={img}
                                    onChange={(e) => handleImageChange(idx, e.target.value)}
                                    placeholder="https://unsplash.com/photo-..."
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-brand-accent italic ml-4">Paste image URLs from Unsplash for the best visual experience.</p>
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
