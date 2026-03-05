
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { List, CalendarCheck, Users, PlusCircle, LogOut, ShieldCheck, Home } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Navbar } from '../../components/layout/Navbar';

export default function AdminDashboard() {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const navItems = [
        { icon: List, label: 'Manage Listings', path: '/admin/listings' },
        { icon: CalendarCheck, label: 'Manage Bookings', path: '/admin/bookings' },
        { icon: Users, label: 'Manage Users', path: '/admin/users' },
        { icon: PlusCircle, label: 'Create Listing', path: '/admin/listings/create' },
    ];

    return (
        <div className="min-h-screen bg-brand-bg pt-20 flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-80 space-y-4">
                    <div className="bg-brand-primary text-white rounded-[2.5rem] p-8 shadow-2xl shadow-brand-primary/20 overflow-hidden relative border-t border-white/10">
                        <div className="relative z-10">
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-bold border border-white/30">
                                    <ShieldCheck size={32} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg">Admin View</h2>
                                    <p className="text-xs opacity-70 uppercase tracking-widest font-bold">Platform Management</p>
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
                                                ? 'bg-white text-brand-primary shadow-xl scale-[1.02]'
                                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                                            }
                    `}
                                    >
                                        <item.icon size={20} />
                                        <span>{item.label}</span>
                                    </NavLink>
                                ))}

                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold text-sm text-red-300 hover:bg-red-500/20 w-full transition-all mt-6"
                                >
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </div>

                        {/* Decorative background pulse */}
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
                    </div>

                    <NavLink to="/" className="flex items-center justify-center space-x-2 px-6 py-4 bg-white text-brand-accent rounded-2xl font-bold text-sm hover:text-brand-primary transition-all border border-brand-secondary/10 shadow-sm">
                        <Home size={18} />
                        <span>View Public Site</span>
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
