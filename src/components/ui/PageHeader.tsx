import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Breadcrumb {
    label: string;
    path?: string;
}

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    breadcrumbs: Breadcrumb[];
}

export function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
    return (
        <div className="relative pt-32 pb-16 overflow-hidden">
            {/* Background Image as-is */}
            <div 
                className="absolute inset-0 z-0"
                style={{ 
                    backgroundImage: 'url("/images/breadcrumb.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }} 
            />

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
                {/* Breadcrumbs Trail */}
                <motion.nav
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="flex flex-wrap items-center gap-2 mb-6"
                    aria-label="Breadcrumb"
                >
                    {breadcrumbs.map((crumb, index) => {
                        const isLast = index === breadcrumbs.length - 1;

                        return (
                            <div key={crumb.label} className="flex items-center gap-2">
                                {crumb.path ? (
                                    <Link
                                        to={crumb.path}
                                        className="text-[12px] font-bold uppercase tracking-widest text-[#888] hover:text-[#7C5C44] transition-colors"
                                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                                    >
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span
                                        className="text-[12px] font-bold uppercase tracking-widest text-[#7C5C44]"
                                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                                        aria-current={isLast ? 'page' : undefined}
                                    >
                                        {crumb.label}
                                    </span>
                                )}

                                {!isLast && (
                                    <ChevronRight size={14} className="text-[#CCC]" />
                                )}
                            </div>
                        );
                    })}
                </motion.nav>

                {/* Page Title & Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant', serif", color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-lg" style={{ fontFamily: "'Quicksand', sans-serif", color: '#888', maxWidth: '600px' }}>
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
