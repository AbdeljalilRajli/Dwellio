import { Calendar } from 'lucide-react';

export default function MyBookings() {
    const bookings: any[] = [];

    return (
        <div>
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-display font-bold text-brand-primary mb-2">My Bookings</h1>
                    <p className="text-brand-accent italic">Manage your scheduled property visits</p>
                </div>
                <div className="bg-brand-secondary/10 px-4 py-2 rounded-full">
                    <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">{bookings.length} Total</span>
                </div>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-20 bg-brand-bg/50 rounded-[2.5rem] border-2 border-dashed border-brand-secondary/20">
                    <Calendar className="mx-auto text-brand-accent/30 mb-6" size={64} />
                    <p className="text-xl font-bold text-brand-primary mb-2">No bookings yet</p>
                    <p className="text-brand-accent max-w-xs mx-auto">Start exploring properties and schedule a visit to your favorites.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Booking items would be mapped here */}
                </div>
            )}
        </div>
    );
}
