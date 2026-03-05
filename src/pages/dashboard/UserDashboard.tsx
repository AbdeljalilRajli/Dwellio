import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Heart, Calendar, User, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Navbar } from '../../components/layout/Navbar';

export default function UserDashboard() {
    const { signOut, profile } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const navItems = [
        { icon: Calendar, label: 'My Bookings', path: '/dashboard/bookings' },
        { icon: Heart, label: 'My Favorites', path: '/dashboard/favorites' },
        { icon: User, label: 'My Profile', path: '/dashboard/profile' },
    ];

    return (
        <div className="min-h-screen bg-brand-bg pt-20 flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-80 space-y-4">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-brand-secondary/5 border border-brand-secondary/5 overflow-hidden relative">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center text-white text-2xl font-bold">
                                {profile?.full_name?.[0] || 'U'}
                            </div>
                            <div>
                                <h2 className="font-bold text-brand-primary">{profile?.full_name || 'User'}</h2>
                                <p className="text-xs text-brand-accent uppercase font-bold tracking-widest">{profile?.role}</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `
                    flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all
                    ${isActive
                                            ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-[1.02]'
                                            : 'text-brand-accent hover:bg-brand-secondary/10 hover:text-brand-primary'
                                        }
                  `}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}

                            <button
                                onClick={handleSignOut}
                                className="flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 w-full transition-all"
                            >
                                <LogOut size={20} />
                                <span>Sign Out</span>
                            </button>
                        </nav>

                        {/* Decorative */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 rounded-full translate-x-16 -translate-y-16"></div>
                    </div>

                    <NavLink to="/" className="flex items-center justify-center space-x-2 px-6 py-4 bg-brand-secondary/5 text-brand-accent rounded-2xl font-bold text-sm hover:text-brand-primary transition-colors">
                        <Home size={18} />
                        <span>Back to Home</span>
                    </NavLink>
                </aside>

                {/* Content Area */}
                <section className="flex-1 bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl shadow-brand-secondary/5 border border-brand-secondary/5 min-h-[600px]">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}
