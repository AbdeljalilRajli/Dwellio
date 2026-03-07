import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
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
        <div className="min-h-screen flex flex-col" style={{ background: '#FBF8F5' }}>
            <Navbar />
            <main className="flex-1 flex items-center justify-center p-5 pt-28">
                <div className="w-full max-w-[420px]">
                    <div className="bg-white rounded-2xl p-8 sm:p-10" style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}>
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A' }}>
                                Welcome Back
                            </h1>
                            <p className="text-[14px]" style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}>
                                Log in to your Dwellio account
                            </p>
                        </div>

                        {error && (
                            <div className="mb-5 p-4 rounded-xl text-[13px] font-medium" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', fontFamily: "'Inter', sans-serif" }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#AAA' }}>
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2" size={16} style={{ color: '#CCC' }} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl text-[14px] font-medium outline-none transition-colors"
                                        style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#AAA' }}>
                                        Password
                                    </label>
                                    <Link to="/forgot-password" className="text-[11px] font-semibold transition-colors" style={{ fontFamily: "'Inter', sans-serif", color: '#7C5C44' }}>
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2" size={16} style={{ color: '#CCC' }} />
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl text-[14px] font-medium outline-none transition-colors"
                                        style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Inter', sans-serif", color: '#1A1A1A' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 text-[15px] font-bold text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#1A1A1A' }}
                                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#7C5C44'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = '#1A1A1A'; }}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>Log In <ArrowRight size={16} /></>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-[#F0E6DB] text-center">
                            <p className="text-[14px]" style={{ fontFamily: "'Inter', sans-serif", color: '#888' }}>
                                Don't have an account?{' '}
                                <Link to="/signup" className="font-bold transition-colors" style={{ color: '#1A1A1A' }}>
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
