import { useNavigate } from 'react-router-dom';
import { MapPin, User as UserIcon, ClipboardList, Headphones, ArrowRight, Star, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ListingCard } from '../components/ui/ListingCard';
import { listingService } from '../services/listingService';
import { motion } from 'framer-motion';

export default function Home() {
    const navigate = useNavigate();
    const { data: listings, isLoading } = useQuery({
        queryKey: ['listings'],
        queryFn: () => listingService.getAllListings()
    });

    const reasons = [
        { icon: MapPin, title: "Proximity Confidence", desc: "Expertly curated locations for your dream home convenience." },
        { icon: UserIcon, title: "Personalized Service", desc: "Our agents work tirelessly to match your unique needs." },
        { icon: ClipboardList, title: "Transparent Process", desc: "Clear communication from initial tour to final closing." },
        { icon: Headphones, title: "Exceptional Support", desc: "We are with you every step of the way, 24/7." }
    ];

    const testimonials = [
        { name: "Sarah Nguyen", role: "Home Owner", text: "Dwellio made the process of buying my first home incredibly smooth and stress-free.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150", rating: 4.8 },
        { name: "Michael Rodriguez", role: "Real Estate Investor", text: "I've used many platforms, but Dwellio's personalized service is truly top-notch.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", rating: 4.9 },
        { name: "Emily Johnson", role: "Renter", text: "Found my perfect apartment within a week! The filtering options are amazing.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150", rating: 5.0 }
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF9]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-[60px] lg:text-[100px] font-display font-medium text-brand-primary leading-[0.95] mb-8 tracking-tighter">
                                Find Your <br />
                                <span className="text-brand-accent italic font-light italic pl-4">Dream Home</span>
                            </h1>
                            <p className="text-lg text-brand-accent/80 mb-12 max-w-lg leading-relaxed font-medium">
                                Explore our curated selection of exquisite properties meticulously tailored to your unique lifestyle and aspirations.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/signup')}
                                className="bg-brand-primary text-white text-[14px] font-bold uppercase tracking-[0.2em] px-12 py-5 rounded-xl shadow-2xl shadow-brand-primary/20"
                            >
                                Sign up
                            </motion.button>

                            {/* Floating Search Bar */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="mt-20 bg-white p-6 rounded-[2rem] flex flex-col md:flex-row gap-6 items-center shadow-[0_32px_64px_-16px_rgba(30,30,30,0.08)] border border-brand-secondary/10"
                            >
                                <div className="flex-1 flex items-center w-full px-4 border-r border-brand-secondary/20">
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] uppercase font-bold text-brand-accent/60 tracking-[0.2em]">Location</span>
                                            <ChevronDown size={14} className="text-brand-accent/40" />
                                        </div>
                                        <input type="text" placeholder="San Francisco, CA" className="bg-transparent text-sm font-bold text-brand-primary focus:outline-none placeholder:text-brand-primary/30" />
                                    </div>
                                </div>
                                <div className="flex-1 flex items-center w-full px-4 border-r border-brand-secondary/20">
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] uppercase font-bold text-brand-accent/60 tracking-[0.2em]">Type</span>
                                            <ChevronDown size={14} className="text-brand-accent/40" />
                                        </div>
                                        <select className="bg-transparent text-sm font-bold text-brand-primary focus:outline-none appearance-none cursor-pointer">
                                            <option>Modern House</option>
                                            <option>Apartment</option>
                                            <option>Villa</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex-1 flex items-center w-full px-4 border-r border-brand-secondary/20">
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] uppercase font-bold text-brand-accent/60 tracking-[0.2em]">Price Range</span>
                                            <ChevronDown size={14} className="text-brand-accent/40" />
                                        </div>
                                        <input type="text" placeholder="$2k - $10k" className="bg-transparent text-sm font-bold text-brand-primary focus:outline-none placeholder:text-brand-primary/30" />
                                    </div>
                                </div>
                                <button className="bg-brand-primary text-white py-5 px-12 w-full md:w-auto text-[14px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-opacity-90 transition-all">
                                    Sign up
                                </button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="rounded-[3rem] overflow-hidden shadow-[0_48px_80px_-16px_rgba(30,30,30,0.12)]">
                                <img
                                    src="/images/hero_luxury_villa_1772747122067.png"
                                    alt="Luxury Villa"
                                    className="w-full h-[700px] object-cover hover:scale-105 transition-transform duration-[2s]"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <img src="/images/modern_glass_house_1772747312955.png" alt="Featured Property" className="w-full h-[550px] object-cover" />
                        </motion.div>
                        <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[2.5rem] shadow-2xl hidden lg:block border border-brand-secondary/5">
                            <h3 className="text-4xl font-bold text-brand-primary mb-2">8K+</h3>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">Houses Sold</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-[54px] font-display font-medium text-brand-primary leading-[1.1] mb-8 tracking-tight">
                            We Help You To Find <br />Your Dream Home
                        </h2>
                        <p className="text-brand-accent text-lg mb-12 leading-relaxed opacity-80">
                            From cozy cottages to modern mansions, our dedicated team guides you through every step of the journey, making your dream home become a reality.
                        </p>
                        <div className="grid grid-cols-3 gap-12">
                            <div>
                                <p className="text-3xl font-bold text-brand-primary mb-2">8K+</p>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">Houses Sold</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-brand-primary mb-2">6K+</p>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">Properties</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-brand-primary mb-2">2K+</p>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">Trusted Agents</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-32 bg-[#F7F2EF]/50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center mb-20">
                    <h2 className="text-[48px] font-display font-medium text-brand-primary mb-4 tracking-tight">Why Choose Us</h2>
                    <p className="text-brand-accent max-w-2xl mx-auto font-medium opacity-70 italic">
                        Discover Your Dream Home: Buying, Renting or Selling Made Easy with Integrity and Unmatched Personalized Service.
                    </p>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason, idx) => (
                        <div key={idx} className="bg-white p-10 rounded-[2.5rem] hover:shadow-[0_32px_64px_-16px_rgba(30,30,30,0.06)] transition-all duration-500 group">
                            <div className="w-16 h-16 rounded-full bg-[#F7F2EF] flex items-center justify-center text-brand-accent mb-10 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                                <reason.icon size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-brand-primary mb-4 tracking-tight">{reason.title}</h3>
                            <p className="text-brand-accent/70 text-[14px] leading-relaxed font-medium">{reason.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Residences */}
            <section className="py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                        <div>
                            <h2 className="text-[48px] font-display font-medium text-brand-primary mb-4 tracking-tight font-display">Our Popular Residences</h2>
                            <p className="text-brand-accent font-medium opacity-60 italic">Discover our top-rated properties in prime locations.</p>
                        </div>
                        <button
                            onClick={() => navigate('/properties')}
                            className="bg-brand-primary text-white text-[12px] font-bold uppercase tracking-[0.2em] px-10 py-5 rounded-xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-brand-primary/10"
                        >
                            View All <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {isLoading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-[500px] bg-brand-secondary/10 animate-pulse rounded-[2.5rem]" />)
                        ) : (
                            listings?.map(listing => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 bg-[#F9F6F4] px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center mb-20">
                    <h2 className="text-[48px] font-display font-medium text-brand-primary mb-4 tracking-tight">What People Say About Dwellio</h2>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="bg-white p-12 rounded-[3rem] relative shadow-sm border border-brand-secondary/5 hover:shadow-xl transition-all duration-500 group">
                            <div className="flex items-center justify-between mb-8">
                                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                <div className="bg-[#FEF9F3] px-3 py-1 rounded-full flex items-center gap-1">
                                    <Star size={14} className="fill-[#F5A623] text-[#F5A623]" />
                                    <span className="text-xs font-bold text-brand-primary">{t.rating}</span>
                                </div>
                            </div>
                            <div className="mb-6">
                                <h4 className="font-bold text-lg text-brand-primary">{t.name}</h4>
                                <p className="text-[10px] text-brand-accent uppercase font-bold tracking-[0.2em] mt-1 opacity-60">{t.role}</p>
                            </div>
                            <p className="text-brand-accent leading-relaxed font-medium">"{t.text}"</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Support Section */}
            <section className="py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-[48px] font-display font-medium text-brand-primary mb-12 tracking-tight">Do You Have Any Questions? <br />Get Help From Us</h2>

                    <div className="flex flex-wrap justify-center gap-12 mb-16">
                        <button className="flex items-center gap-3 text-brand-accent font-bold text-sm tracking-widest uppercase hover:text-brand-primary transition-colors">
                            <span className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center"><ClipboardList size={18} /></span>
                            Chat Live With Our Support Team
                        </button>
                        <button className="flex items-center gap-3 text-brand-accent font-bold text-sm tracking-widest uppercase hover:text-brand-primary transition-colors">
                            <span className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center"><Headphones size={18} /></span>
                            Browse Our FAQ
                        </button>
                    </div>

                    <div className="max-w-2xl mx-auto bg-[#F7F2EF] p-4 rounded-[1.5rem] flex items-center shadow-inner relative z-10 w-full">
                        <input
                            type="text"
                            placeholder="Enter your email address..."
                            className="flex-1 bg-transparent px-8 py-4 text-brand-primary font-bold focus:outline-none placeholder:text-brand-primary/20 placeholder:font-bold"
                        />
                        <button className="bg-brand-primary text-white py-4 px-12 text-[12px] font-bold uppercase tracking-[0.2em] rounded-xl hover:scale-105 transition-all shadow-xl shadow-brand-primary/10">
                            Submit
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
