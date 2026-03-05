import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, Home } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            // Fetch user role
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('role')
                .eq('id', data.user.id)
                .single();

            if (userError) throw userError;

            if (userData.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-brand-bg flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-brand-secondary/10 border border-brand-secondary/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 rounded-full translate-x-16 -translate-y-16"></div>

                        <div className="text-center mb-10 relative z-10">
                            <h1 className="text-4xl font-display font-bold text-brand-primary mb-2">Welcome Back</h1>
                            <p className="text-brand-accent italic font-medium">Log in to manage your property journey</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100 italic">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
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
                                <div className="flex justify-between items-center mb-2 ml-4">
                                    <label className="block text-[10px] font-bold uppercase text-brand-accent tracking-widest">Password</label>
                                    <Link to="/forgot-password" title="reset-password" className="text-[10px] font-bold uppercase text-brand-primary hover:underline pr-4">Forgot?</Link>
                                </div>
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
                                        <span>Log In</span>
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 pt-10 border-t border-brand-secondary/5 text-center">
                            <p className="text-brand-accent text-sm font-medium">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-brand-primary font-bold hover:underline">Sign up for free</Link>
                            </p>
                        </div>
                    </div>

                    <Link to="/" className="mt-8 flex items-center justify-center space-x-2 text-brand-accent hover:text-brand-primary transition-colors font-bold text-sm uppercase tracking-widest group">
                        <Home size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to homepage</span>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
