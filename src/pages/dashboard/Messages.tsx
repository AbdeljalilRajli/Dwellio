import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { listingService } from '../../services/listingService';
import { useAuth } from '../../hooks/useAuth';
import { MessageSquare, Calendar, User, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Messages() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: messages, isLoading } = useQuery({
        queryKey: ['user-messages', user?.id],
        queryFn: () => listingService.getUserMessages(user!.id),
        enabled: !!user?.id
    });

    const deleteMutation = useMutation({
        mutationFn: (messageId: string) => {
            console.log('Mutation: Deleting message', messageId);
            return listingService.deleteMessage(messageId);
        },
        onSuccess: () => {
            console.log('Mutation: Delete success');
            queryClient.invalidateQueries({ queryKey: ['user-messages', user?.id] });
        },
        onError: (error: any) => {
            console.error('Mutation: Delete error', error);
            alert(`Failed to delete message: ${error.message || 'Unknown error'}`);
        }
    });

    const handleDelete = (id: string) => {
        console.log('handleDelete called for ID:', id);
        if (window.confirm('Are you sure you want to delete this message?')) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h1 className="text-4xl font-display font-bold text-brand-primary mb-3">My Messages</h1>
                <p className="text-brand-accent italic text-lg">Manage your property inquiries and conversations</p>
            </motion.div>

            <div className="space-y-6">
                {isLoading ? (
                    <div className="py-20 text-center text-brand-accent font-bold italic animate-pulse">
                        Loading messages...
                    </div>
                ) : !messages || messages.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center bg-brand-bg/30 rounded-[3rem] border border-brand-secondary/10 backdrop-blur-sm"
                    >
                        <MessageSquare className="mx-auto text-brand-accent/20 mb-6" size={64} />
                        <p className="text-brand-accent font-bold italic text-xl">No messages yet</p>
                    </motion.div>
                ) : (
                    <div className="grid gap-6">
                        <AnimatePresence mode="popLayout">
                            {messages.map((msg: any) => (
                                <motion.div 
                                    key={msg.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                                    className="bg-white rounded-[2.5rem] p-6 lg:p-8 border border-brand-secondary/10 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                                >
                                    <div className="flex flex-col sm:flex-row justify-between gap-6 relative z-10">
                                        <div className="flex gap-6">
                                            <div className="relative group/img">
                                                <img
                                                    src={msg.listings?.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=200'}
                                                    alt={msg.listings?.title}
                                                    className="w-20 h-20 rounded-[1.5rem] object-cover shadow-md transition-transform duration-500 group-hover/img:scale-110"
                                                />
                                            </div>
                                            <div>
                                                <Link to={`/properties/${msg.listings?.slug || msg.listings?.id}`}>
                                                    <h3 className="text-xl font-bold text-brand-primary group-hover:text-brand-accent transition-colors duration-300">
                                                        {msg.listings?.title}
                                                    </h3>
                                                </Link>
                                                <div className="flex flex-wrap items-center gap-4 text-[11px] text-brand-accent font-bold uppercase tracking-[0.15em] mt-2">
                                                    <span className="flex items-center gap-2 bg-brand-secondary/10 px-3 py-1.5 rounded-full">
                                                        <User size={12} />
                                                        {msg.sender_email || msg.sender?.email || 'Unknown'}
                                                    </span>
                                                    <span className="flex items-center gap-2 bg-brand-secondary/10 px-3 py-1.5 rounded-full">
                                                        <Calendar size={12} />
                                                        {new Date(msg.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.1, backgroundColor: '#fee2e2' }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(msg.id)}
                                                disabled={deleteMutation.isPending}
                                                className="p-3 bg-red-50 text-red-500 rounded-2xl transition-colors disabled:opacity-50 group/delete"
                                                title="Delete Message"
                                            >
                                                <Trash2 size={18} className="group-hover/delete:rotate-12 transition-transform" />
                                            </motion.button>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-6 bg-brand-bg/30 rounded-3xl text-brand-primary text-[15px] font-medium leading-relaxed border border-brand-secondary/5 italic relative">
                                        <span className="absolute -top-3 left-6 bg-white px-2 text-[10px] font-bold text-brand-accent uppercase tracking-widest">Message Content</span>
                                        "{msg.content}"
                                    </div>

                                    <div className="mt-6 flex justify-end gap-3">
                                        <motion.a
                                            whileHover={{ x: 5 }}
                                            href={`mailto:${msg.sender_email || msg.sender?.email || ''}?subject=Re: Inquiry for ${msg.listings?.title || 'your property'}`}
                                            className="text-[12px] font-bold uppercase tracking-widest text-[#FFF] py-3.5 px-8 bg-brand-primary hover:bg-brand-accent transition-all rounded-2xl shadow-lg hover:shadow-brand-accent/20"
                                        >
                                            Reply via Email
                                        </motion.a>
                                    </div>
                                    
                                    {/* Subtle background decoration */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
