import React, { useState } from 'react';
import { User, Mail, Save, Loader2, ShieldCheck, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabaseClient';

export default function MyProfile() {
    const { profile, user } = useAuth();
    const [fullName, setFullName] = useState(profile?.full_name || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (password && password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            setLoading(false);
            return;
        }

        try {
            // Update profile info
            const { error: profileError } = await supabase
                .from('users')
                .update({ full_name: fullName })
                .eq('id', user.id);

            if (profileError) throw profileError;

            // Update password if provided
            if (password) {
                const { error: authError } = await supabase.auth.updateUser({
                    password: password
                });
                if (authError) throw authError;
            }

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto pb-20">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-display font-bold text-brand-primary mb-2">My Profile</h1>
                <p className="text-brand-accent italic">Manage your personal information and security</p>
            </div>

            {message && (
                <div className={`mb-8 p-6 rounded-2xl text-sm font-bold italic border ${message.type === 'success' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-8">
                {/* Personal Information */}
                <div className="p-8 bg-brand-bg/30 rounded-[2.5rem] border border-brand-secondary/5 space-y-6">
                    <h3 className="text-xs font-bold uppercase text-brand-primary tracking-[0.2em] mb-4 ml-2">Personal Information</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Account Role</label>
                            <div className="flex items-center space-x-3 px-6 py-4 bg-white rounded-2xl text-brand-primary font-bold shadow-sm">
                                <ShieldCheck className="text-brand-accent" size={20} />
                                <span className="capitalize">{profile?.role || 'User'}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Email Address</label>
                            <div className="flex items-center space-x-3 px-6 py-4 bg-white/50 rounded-2xl text-brand-accent font-medium italic shadow-inner border border-brand-secondary/5">
                                <Mail size={20} />
                                <span>{user?.email}</span>
                                <span className="ml-auto text-[10px] bg-brand-accent/10 px-2 py-1 rounded-full uppercase tracking-tighter">Verified</span>
                            </div>
                            <p className="mt-2 ml-4 text-[10px] text-brand-accent opacity-60">Email cannot be changed directly for security reasons.</p>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" size={20} />
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-16 pr-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary shadow-sm"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Your full name"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="p-8 bg-brand-bg/30 rounded-[2.5rem] border border-brand-secondary/5 space-y-6">
                    <div className="flex items-center space-x-3 mb-4 ml-2">
                        <Lock className="text-brand-accent" size={18} />
                        <h3 className="text-xs font-bold uppercase text-brand-primary tracking-[0.2em]">Security & Password</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">New Password</label>
                            <input
                                type="password"
                                className="w-full px-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary shadow-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-brand-accent tracking-widest mb-3 ml-4">Confirm New Password</label>
                            <input
                                type="password"
                                className="w-full px-8 py-5 bg-white rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-bold text-brand-primary shadow-sm"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <p className="mt-2 ml-4 text-[10px] text-brand-accent opacity-60 italic">Leave blank if you don't want to change your password.</p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-6 text-xl flex items-center justify-center space-x-3 shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" size={28} />
                    ) : (
                        <>
                            <Save size={24} />
                            <span>Save Changes</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
