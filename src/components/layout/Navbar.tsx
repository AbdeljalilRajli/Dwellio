import { LogOut, LayoutDashboard, ShieldCheck, Heart, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-secondary/10 h-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="text-3xl font-display font-bold text-brand-primary tracking-tight">
                            Dwellio
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-10">
                        <Link to="/" className="text-[13px] font-bold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-all hover:scale-105">Home</Link>
                        <Link to="/properties" className="text-[13px] font-bold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-all hover:scale-105">Service</Link>
                        <Link to="/properties" className="text-[13px] font-bold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-all hover:scale-105">Agents</Link>
                        <Link to="/properties" className="text-[13px] font-bold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-all hover:scale-105">Contact</Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="hidden sm:flex items-center space-x-4">
                            <button className="p-2 text-brand-accent hover:text-brand-primary transition-colors">
                                <Heart size={22} />
                            </button>
                            <button className="p-2 text-brand-accent hover:text-brand-primary transition-colors">
                                <User size={22} />
                            </button>
                        </div>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to={profile?.role === 'admin' ? '/admin' : '/dashboard'}
                                    className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-accent transition-colors"
                                >
                                    {profile?.role === 'admin' ? <ShieldCheck size={18} /> : <LayoutDashboard size={18} />}
                                    <span className="hidden lg:inline">Dashboard</span>
                                </Link>
                                <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-brand-primary/20">
                                    {profile?.full_name?.[0] || 'U'}
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="p-2 text-brand-accent hover:text-red-500 transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to="/login" className="btn-primary py-3.5 px-8 rounded-xl text-xs uppercase tracking-widest shadow-xl shadow-brand-primary/10">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
