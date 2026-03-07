import { motion } from 'framer-motion';

export function SkeletonListing() {
    return (
        <div className="bg-white rounded-3xl overflow-hidden border border-[#F0E6DB]">
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                        x: ['-100%', '100%']
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
            <div className="p-6 space-y-4">
                <div className="h-3 w-1/3 bg-gray-100 rounded-full" />
                <div className="h-6 w-3/4 bg-gray-100 rounded-lg" />
                <div className="pt-4 border-t border-[#F0E6DB] flex justify-between">
                    <div className="flex gap-4">
                        <div className="h-4 w-10 bg-gray-100 rounded" />
                        <div className="h-4 w-10 bg-gray-100 rounded" />
                        <div className="h-4 w-10 bg-gray-100 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}
