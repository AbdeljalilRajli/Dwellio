import { PropertySearchForm } from './PropertySearchForm';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12
        }
    }
};

const textRevealVariants: Variants = {
    hidden: { y: "100%" },
    visible: {
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

export function HeroSection() {
    return (
        <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-12 overflow-hidden min-h-screen lg:h-screen flex flex-col justify-center w-full max-w-full">
            {/* Background Video & Fallback Container */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
                    className="w-full h-full object-cover object-center"
                >
                    <source src="/nestlux-hero-video.mp4" type="video/mp4" />
                    <source src="/nestlux hero section video.mp4" type="video/mp4" />
                </video>

                {/* Clean, Luminous Overlays - keeps video vivid & text legible */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/55 pointer-events-none" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
                {/* Text Content */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="text-center max-w-4xl mx-auto mb-10 sm:mb-12"
                >
                    <div className="overflow-hidden pb-1 -mb-1 sm:-mb-2">
                        <motion.h1
                            variants={textRevealVariants}
                            style={{
                                fontFamily: "'Cormorant', serif",
                                fontSize: 'clamp(2.25rem, 6vw, 5.5rem)',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                lineHeight: 0.98,
                                letterSpacing: '-0.05em',
                                textShadow: '0 8px 32px rgba(0,0,0,0.4)'
                            }}
                        >
                            Elevating the Art of
                        </motion.h1>
                    </div>

                    <div className="overflow-hidden pb-2 mb-4 sm:mb-5">
                        <motion.h1
                            variants={textRevealVariants}
                            transition={{ delay: 0.1 }}
                            style={{
                                fontFamily: "'Cormorant', serif",
                                fontSize: 'clamp(2.25rem, 6vw, 5.5rem)',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                lineHeight: 0.98,
                                letterSpacing: '-0.05em',
                                textShadow: '0 8px 32px rgba(0,0,0,0.4)'
                            }}
                        >
                            <span style={{ fontFamily: "'Cormorant', serif", fontStyle: 'italic', color: '#EDE0D5' }}>
                                Finding Home
                            </span>
                        </motion.h1>
                    </div>

                    <motion.p
                        variants={fadeInUp}
                        className="text-[17px] sm:text-[20px] leading-snug sm:leading-normal max-w-2xl mx-auto opacity-90 font-light"
                        style={{ fontFamily: "'Quicksand', sans-serif", color: '#FBF8F5', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                    >
                        A curated selection of the finest riads, villas, and modern luxury apartments across the Kingdom.
                    </motion.p>
                </motion.div>

                {/* Search Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 1.2,
                        delay: 0.5,
                        type: "spring",
                        stiffness: 40,
                        damping: 15
                    }}
                    className="max-w-5xl mx-auto"
                >
                    <PropertySearchForm />
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="flex flex-wrap justify-center gap-10 sm:gap-20 mt-12 sm:mt-14 pt-8 border-t border-white/10"
                >
                    {[
                        { value: '2,500+', label: 'Listings' },
                        { value: '1,200+', label: 'Clients' },
                        { value: '7', label: 'Cities' },
                        { value: '98%', label: 'Trust' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 + (i * 0.1) }}
                            className="text-center group cursor-default"
                        >
                            <motion.p
                                whileHover={{ scale: 1.1, color: '#EDE0D5' }}
                                className="text-3xl sm:text-4xl font-bold transition-colors"
                                style={{ fontFamily: "'Cormorant', serif", color: '#FFFFFF' }}
                            >
                                {stat.value}
                            </motion.p>
                            <p className="text-[12px] font-bold uppercase tracking-widest mt-2 opacity-50 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "'Quicksand', sans-serif", color: '#EDE0D5' }}>
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

