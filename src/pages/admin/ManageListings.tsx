import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { listingService } from '../../services/listingService';
import { useAuth } from '../../hooks/useAuth';

export default function ManageListings() {
    const { user } = useAuth();
    const { data: listings, isLoading, refetch } = useQuery({
        queryKey: ['user-listings', user?.id],
        queryFn: () => listingService.getUserListings(user!.id),
        enabled: !!user?.id
    });

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-display font-bold text-brand-primary mb-2">Manage Listings</h1>
                    <p className="text-brand-accent italic">Overview of all properties on the platform</p>
                </div>
                <Link
                    to="/dashboard/listings/create"
                    className="btn-primary flex items-center space-x-2 px-8 py-4 shadow-xl shadow-brand-primary/20"
                >
                    <Plus size={20} />
                    <span>New Listing</span>
                </Link>
            </div>

            <div className="bg-brand-bg/30 rounded-[2.5rem] p-8 border border-brand-secondary/5">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="relative flex-1 max-w-md group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by title, location..."
                            className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-medium shadow-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-brand-secondary/10">
                                <th className="pb-6 pl-4 text-xs font-bold uppercase text-brand-accent tracking-widest">Property</th>
                                <th className="pb-6 text-xs font-bold uppercase text-brand-accent tracking-widest">Type</th>
                                <th className="pb-6 text-xs font-bold uppercase text-brand-accent tracking-widest">Price</th>
                                <th className="pb-6 text-xs font-bold uppercase text-brand-accent tracking-widest">Status</th>
                                <th className="pb-6 text-right pr-4 text-xs font-bold uppercase text-brand-accent tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-secondary/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-brand-accent font-bold italic animate-pulse">Loading properties...</td>
                                </tr>
                            ) : (
                                listings?.map((item) => (
                                    <tr key={item.id} className="group hover:bg-white/50 transition-colors">
                                        <td className="py-6 pl-4">
                                            <div className="flex items-center space-x-4">
                                                <img src={item.images[0]} alt={item.title} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                                                <div>
                                                    <p className="font-bold text-brand-primary line-clamp-1">{item.title}</p>
                                                    <p className="text-xs text-brand-accent font-medium italic">{item.city}, CA</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6">
                                            <span className="text-xs font-bold text-brand-primary bg-brand-secondary/10 px-3 py-1 rounded-full">{item.property_type}</span>
                                        </td>
                                        <td className="py-6 font-bold text-brand-primary">
                                            ${item.price.toLocaleString()}
                                        </td>
                                        <td className="py-6">
                                            <span className="flex items-center text-xs font-bold text-green-600">
                                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                                                Active
                                            </span>
                                        </td>
                                        <td className="py-6 pr-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link to={`/properties/${item.slug || item.id}`} className="p-2 text-brand-accent hover:text-brand-primary transition-colors">
                                                    <Eye size={18} />
                                                </Link>
                                                <Link to={`/dashboard/listings/edit/${item.id}`} className="p-2 text-brand-accent hover:text-brand-primary transition-colors">
                                                    <Edit2 size={18} />
                                                </Link>
                                                <button
                                                    onClick={async () => {
                                                        if (confirm('Are you sure you want to delete this listing?')) {
                                                            await listingService.deleteListing(item.id);
                                                            refetch();
                                                        }
                                                    }}
                                                    className="p-2 text-brand-accent hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
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
