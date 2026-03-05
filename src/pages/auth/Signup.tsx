import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (authError) throw authError;

            if (data.user) {
                // Insert into our custom users table
                const { error: dbError } = await supabase.from('users').insert([
                    {
                        id: data.user.id,
                        email,
                        full_name: fullName,
                        role: 'user',
                    },
                ]);

                if (dbError) throw dbError;
                setSuccess(true);
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen pt-20 bg-brand-bg flex flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center p-4 text-center">
                    <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl shadow-brand-secondary/10 border border-brand-secondary/5">
                        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <CheckCircle2 size={48} />
                        </div>
                        <h1 className="text-3xl font-display font-bold text-brand-primary mb-4">Account Created!</h1>
                        <p className="text-brand-accent italic font-medium leading-relaxed">
                            We've sent a verification email to <span className="text-brand-primary font-bold not-italic">{email}</span>. Please check your inbox to activate your account.
                        </p>
                        <p className="mt-8 text-xs text-brand-accent uppercase font-bold tracking-tighter animate-pulse">Redirecting to login...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 bg-brand-bg flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-brand-secondary/10 border border-brand-secondary/5 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 rounded-full translate-x-16 -translate-y-16"></div>

                        <div className="text-center mb-10 relative z-10">
                            <h1 className="text-4xl font-display font-bold text-brand-primary mb-2">Join Dwello</h1>
                            <p className="text-brand-accent italic font-medium">Start your journey to the perfect home</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100 italic">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignup} className="space-y-6 relative z-10">
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-brand-accent tracking-widest mb-2 ml-4">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" size={18} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full pl-14 pr-6 py-4 bg-brand-bg rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-medium shadow-inner"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase text-brand-accent tracking-widest mb-2 ml-4">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" size={18} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="name@example.com"
                                        className="w-full pl-14 pr-6 py-4 bg-brand-bg rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-medium shadow-inner"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase text-brand-accent tracking-widest mb-2 ml-4">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent/40 group-focus-within:text-brand-accent transition-colors" size={18} />
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-6 py-4 bg-brand-bg rounded-2xl border-none focus:outline-none focus:ring-4 focus:ring-brand-accent/5 font-medium shadow-inner"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <p className="mt-2 text-[10px] text-brand-accent/60 ml-4 font-medium italic">Must be at least 6 characters.</p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full py-5 text-lg flex items-center justify-center space-x-2 shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={24} />
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 pt-10 border-t border-brand-secondary/5 text-center">
                            <p className="text-brand-accent text-sm font-medium">
                                Already have an account?{' '}
                                <Link to="/login" className="text-brand-primary font-bold hover:underline">Log in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
