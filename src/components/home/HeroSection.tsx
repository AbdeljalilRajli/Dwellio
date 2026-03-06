import { PropertySearchForm } from './PropertySearchForm';

export function HeroSection() {
    return (
        <section
            className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #FBF8F5 0%, #F5EEE8 100%)' }}
        >
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #EDE0D5 0%, transparent 70%)' }} />
                <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #EDE0D5 0%, transparent 70%)' }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                {/* Text Content */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <p
                        className="text-[13px] font-bold uppercase tracking-[0.2em] mb-5"
                        style={{ fontFamily: "'Outfit', sans-serif", color: '#7C5C44' }}
                    >
                        Morocco&rsquo;s Premier Real Estate Platform
                    </p>
                    <h1
                        className="mb-5"
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                            fontWeight: 700,
                            color: '#1A1A1A',
                            lineHeight: 1.15,
                            letterSpacing: '-0.03em',
                        }}
                    >
                        Find Your{' '}
                        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#7C5C44' }}>
                            Dream Home
                        </span>
                        <br />
                        in Morocco
                    </h1>
                    <p
                        className="text-[17px] leading-relaxed max-w-xl mx-auto"
                        style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}
                    >
                        Discover luxury villas, modern apartments, and charming riads across
                        Marrakech, Casablanca, Rabat, and beyond.
                    </p>
                </div>

                {/* Search Form */}
                <PropertySearchForm />

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-14">
                    {[
                        { value: '2,500+', label: 'Properties Listed' },
                        { value: '1,200+', label: 'Happy Clients' },
                        { value: '7', label: 'Cities Covered' },
                        { value: '98%', label: 'Satisfaction Rate' },
                    ].map(stat => (
                        <div key={stat.label} className="text-center">
                            <p className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: '#1A1A1A' }}>
                                {stat.value}
                            </p>
                            <p className="text-[12px] font-medium mt-1" style={{ fontFamily: "'Inter', sans-serif", color: '#AAAAAA' }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
