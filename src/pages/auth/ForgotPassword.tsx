import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${siteUrl}/reset-password`,
            });

            if (resetError) throw resetError;

            setSuccess('Check your email for the password reset link.');
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-brand-bg flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-brand-secondary/10 border border-brand-secondary/5">
                        <Link to="/login" className="inline-flex items-center text-brand-accent hover:text-brand-primary mb-8 text-sm font-bold uppercase tracking-widest transition-colors group">
                            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>

                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-display font-bold text-brand-primary mb-2">Reset Password</h1>
                            <p className="text-brand-accent italic">Enter your email and we'll send you a link</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100 italic">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-2xl text-sm font-medium border border-green-100 italic">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleReset} className="space-y-6">
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full py-5 text-lg flex items-center justify-center space-x-2 shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={24} />
                                ) : (
                                    <>
                                        <span>Send Reset Link</span>
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
