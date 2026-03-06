import { PropertySearchForm } from './PropertySearchForm';

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden min-h-[90vh] flex items-center">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=2000")',
                    }}
                />
                {/* Overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
                {/* Text Content */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <p
                        className="text-[13px] font-bold uppercase tracking-[0.2em] mb-6 inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                        style={{ fontFamily: "'Outfit', sans-serif", color: '#EDE0D5' }}
                    >
                        Morocco&rsquo;s Premier Real Estate Platform
                    </p>
                    <h1
                        className="mb-8"
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 700,
                            color: '#FFFFFF',
                            lineHeight: 1.1,
                            letterSpacing: '-0.04em',
                            textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}
                    >
                        Find Your{' '}
                        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#EDE0D5' }}>
                            Dream Home
                        </span>
                        <br />
                        in Morocco
                    </h1>
                    <p
                        className="text-[18px] sm:text-[20px] leading-relaxed max-w-2xl mx-auto opacity-90"
                        style={{ fontFamily: "'Inter', sans-serif", color: '#FBF8F5' }}
                    >
                        Discover luxury villas, modern apartments, and charming riads across
                        Marrakech, Casablanca, Rabat, and beyond.
                    </p>
                </div>

                {/* Search Form Container */}
                <div className="max-w-5xl mx-auto">
                    <PropertySearchForm />
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-8 sm:gap-20 mt-16 pt-8 border-t border-white/10">
                    {[
                        { value: '2,500+', label: 'Properties Listed' },
                        { value: '1,200+', label: 'Happy Clients' },
                        { value: '7', label: 'Cities Covered' },
                        { value: '98%', label: 'Satisfaction Rate' },
                    ].map(stat => (
                        <div key={stat.label} className="text-center">
                            <p className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: '#FFFFFF' }}>
                                {stat.value}
                            </p>
                            <p className="text-[12px] font-bold uppercase tracking-wider mt-1 opacity-60" style={{ fontFamily: "'Inter', sans-serif", color: '#EDE0D5' }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
