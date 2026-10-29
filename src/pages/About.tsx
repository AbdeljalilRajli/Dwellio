import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Shield, Target, TrendingUp, Users } from 'lucide-react';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function About() {
    return (
        <div className="min-h-screen bg-[#FBF8F5]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FBF8F5]/95 via-[#FBF8F5]/90 to-[#FBF8F5]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="max-w-3xl mx-auto"
                    >
                        <p className="text-[12px] font-bold uppercase tracking-[0.25em] mb-4 text-[#7C5C44] font-['Quicksand']">
                            Our Story
                        </p>
                        <h1 className="text-5xl sm:text-7xl font-bold text-[#1A1A1A] mb-6 font-['Cormorant'] tracking-tight">
                            Redefining the Look of<br />
                            <span className="text-[#7C5C44]">Luxury Living</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-[#888] font-['Quicksand'] leading-relaxed">
                            NestLux is Morocco's premier real estate boutique, connecting discerning buyers with extraordinary properties across the Kingdom's most iconic destinations.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white border-y border-[#EDE0D5]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
                    >
                        {[
                            { label: 'Properties Listed', value: '2,500+' },
                            { label: 'Happy Clients', value: '1,800+' },
                            { label: 'Cities Covered', value: '12' },
                            { label: 'Years Experience', value: '15' },
                        ].map((stat, idx) => (
                            <motion.div key={idx} variants={fadeInUp} className="text-center">
                                <h3 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-2 font-['Cormorant']">
                                    {stat.value}
                                </h3>
                                <p className="text-sm font-bold text-[#888] uppercase tracking-widest font-['Quicksand']">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Mission Section Layout */}
            <section className="py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-full lg:w-1/2 relative"
                        >
                            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200"
                                    alt="Interior Design"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#1A1A1A] rounded-full hidden lg:flex items-center justify-center p-8 text-center text-white">
                                <p className="font-['Cormorant'] text-xl italic leading-snug">
                                    "Excellence in every square foot."
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-full lg:w-1/2"
                        >
                            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-8 font-['Cormorant'] tracking-tight">
                                Our Mission to Elevate Your Standard of Living
                            </h2>
                            <div className="space-y-6 text-[#888] font-['Quicksand'] text-lg leading-relaxed">
                                <p>
                                    Founded with a vision to transform the Moroccan real estate landscape, NestLux brings a curated approach to property buying, selling, and renting. We believe that a home is more than just a physical space; it's a foundation for life's most cherished moments.
                                </p>
                                <p>
                                    Our portfolio exclusively features properties that meet our rigorous standards for architecture, location, and lifestyle amenities. Whether you seek a traditional Riad in the heart of Marrakech or a contemporary penthouse in Casablanca, our experts guide you to the perfect match.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4 font-['Cormorant'] tracking-tight">
                            The NestLux Difference
                        </h2>
                        <p className="text-[#888] font-['Quicksand'] text-lg">
                            We operate on a foundation of integrity, market mastery, and an unwavering commitment to our clients.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {[
                            {
                                icon: Shield,
                                title: "Verified Trust",
                                desc: "Every listing is stringently vetted to guarantee authenticity and transparency."
                            },
                            {
                                icon: Target,
                                title: "Curated Selection",
                                desc: "We handpick only the finest properties that meet our strict luxury criteria."
                            },
                            {
                                icon: TrendingUp,
                                title: "Market Insight",
                                desc: "Deep analytics and local expertise provide you with unparalleled market advantages."
                            },
                            {
                                icon: Users,
                                title: "White-Glove Service",
                                desc: "A tailored, end-to-end concierge experience for a seamless journey."
                            }
                        ].map((Value, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="group p-8 rounded-3xl bg-[#FAFAFA] border border-[#EDE0D5] hover:bg-[#1A1A1A] transition-colors duration-500 cursor-default"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#F0E6DB] group-hover:bg-[#333] flex items-center justify-center mb-6 transition-colors duration-500">
                                    <Value.icon size={24} className="text-[#7C5C44] group-hover:text-white transition-colors duration-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1A] group-hover:text-white mb-3 font-['Cormorant'] transition-colors duration-500">
                                    {Value.title}
                                </h3>
                                <p className="text-[#888] group-hover:text-[#AAA] font-['Quicksand'] leading-relaxed transition-colors duration-500">
                                    {Value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
