import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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
                const { error: dbError } = await supabase.from('users').insert([
                    {
                        id: data.user.id,
                        email,
                        full_name: fullName,
                        role: 'user',
                    },
                ]);

                if (dbError) throw dbError;

                // Navigate to dashboard immediately
                navigate('/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during signup');
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
                            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Cormorant', serif", color: '#1A1A1A' }}>
                                Join NestLux
                            </h1>
                            <p className="text-[14px]" style={{ fontFamily: "'Quicksand', sans-serif", color: '#888' }}>
                                Create your account and start exploring
                            </p>
                        </div>

                        {error && (
                            <div className="mb-5 p-4 rounded-xl text-[13px] font-medium" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', fontFamily: "'Quicksand', sans-serif" }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignup} className="space-y-5">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Quicksand', sans-serif", color: '#AAA' }}>
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2" size={16} style={{ color: '#CCC' }} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl text-[14px] font-medium outline-none"
                                        style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Quicksand', sans-serif", color: '#AAA' }}>
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2" size={16} style={{ color: '#CCC' }} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl text-[14px] font-medium outline-none"
                                        style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Quicksand', sans-serif", color: '#AAA' }}>
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2" size={16} style={{ color: '#CCC' }} />
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl text-[14px] font-medium outline-none"
                                        style={{ background: '#FAFAFA', border: '1px solid #EDE0D5', fontFamily: "'Quicksand', sans-serif", color: '#1A1A1A' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <p className="mt-2 text-[11px]" style={{ fontFamily: "'Quicksand', sans-serif", color: '#AAA' }}>
                                    Must be at least 6 characters.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 text-[15px] font-bold text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                                style={{ fontFamily: "'Quicksand', sans-serif", background: '#1A1A1A' }}
                                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#7C5C44'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = '#1A1A1A'; }}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>Create Account <ArrowRight size={16} /></>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-[#F0E6DB] text-center">
                            <p className="text-[14px]" style={{ fontFamily: "'Quicksand', sans-serif", color: '#888' }}>
                                Already have an account?{' '}
                                <Link to="/login" className="font-bold transition-colors" style={{ color: '#1A1A1A' }}>
                                    Log in
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
