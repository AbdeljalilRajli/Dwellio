import { Clock } from 'lucide-react';

export default function ManageBookings() {
    const bookings: any[] = [];

    return (
        <div>
            <div className="mb-12">
                <h1 className="text-3xl font-display font-bold text-brand-primary mb-2">Manage Bookings</h1>
                <p className="text-brand-accent italic">Monitor and update status of property visits</p>
            </div>

            <div className="bg-brand-bg/30 rounded-[2.5rem] p-8 border border-brand-secondary/5">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-brand-secondary/10">
                                <th className="pb-6 pl-4 text-xs font-bold uppercase text-brand-accent tracking-widest">User</th>
                                <th className="pb-6 text-xs font-bold uppercase text-brand-accent tracking-widest">Property</th>
                                <th className="pb-6 text-xs font-bold uppercase text-brand-accent tracking-widest">Schedule</th>
                                <th className="pb-6 text-xs font-bold uppercase text-brand-accent tracking-widest">Status</th>
                                <th className="pb-6 text-right pr-4 text-xs font-bold uppercase text-brand-accent tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-32 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-accent/20 mb-4 shadow-sm">
                                                <Clock size={32} />
                                            </div>
                                            <p className="text-brand-accent font-bold italic">No bookings found in the system</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                bookings.map(b => (
                                    <tr key={b.id}>
                                        {/* Booking rows would go here */}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
