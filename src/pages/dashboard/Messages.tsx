import { useQuery } from '@tanstack/react-query';
import { listingService } from '../../services/listingService';
import { useAuth } from '../../hooks/useAuth';
import { MessageSquare, Calendar, User } from 'lucide-react';

export default function Messages() {
    const { user } = useAuth();
    const { data: messages, isLoading } = useQuery({
        queryKey: ['user-messages', user?.id],
        queryFn: () => listingService.getUserMessages(user!.id),
        enabled: !!user?.id
    });

    return (
        <div>
            <div className="mb-12">
                <h1 className="text-3xl font-display font-bold text-brand-primary mb-2">My Messages</h1>
                <p className="text-brand-accent italic">Manage your property inquiries and conversations</p>
            </div>

            <div className="space-y-6">
                {isLoading ? (
                    <div className="py-20 text-center text-brand-accent font-bold italic animate-pulse">
                        Loading messages...
                    </div>
                ) : !messages || messages.length === 0 ? (
                    <div className="py-20 text-center bg-brand-bg/30 rounded-[2.5rem] border border-brand-secondary/5">
                        <MessageSquare className="mx-auto text-brand-accent/20 mb-4" size={48} />
                        <p className="text-brand-accent font-bold italic">No messages yet</p>
                    </div>
                ) : (
                    messages.map((msg: any) => (
                        <div
                            key={msg.id}
                            className="bg-brand-bg/30 rounded-3xl p-6 border border-brand-secondary/5 hover:border-brand-primary/20 transition-all group"
                        >
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <div className="flex gap-4">
                                    <img
                                        src={msg.listings?.images?.[0] || 'https://via.placeholder.com/150'}
                                        alt={msg.listings?.title}
                                        className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                                    />
                                    <div>
                                        <h3 className="font-bold text-brand-primary group-hover:text-brand-primary transition-colors">
                                            {msg.listings?.title}
                                        </h3>
                                        <div className="flex items-center gap-3 text-xs text-brand-accent font-bold uppercase tracking-wider mt-1">
                                            <span className="flex items-center gap-1">
                                                <User size={12} />
                                                {msg.sender?.full_name}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {new Date(msg.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-white rounded-2xl text-brand-primary text-sm font-medium border border-brand-secondary/5">
                                {msg.content}
                            </div>

                            <div className="mt-4 flex justify-end">
                                <a
                                    href={`mailto:${msg.sender?.email}?subject=Re: Inquiry for ${msg.listings?.title}`}
                                    className="text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-accent transition-colors py-2 px-4 bg-brand-secondary/10 rounded-xl"
                                >
                                    Reply via Email
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
