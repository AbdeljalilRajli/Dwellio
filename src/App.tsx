import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

import Home from './pages/Home';
import ListingPage from './pages/ListingPage';
import PropertyDetails from './pages/PropertyDetails';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import { ProtectedRoute } from './components/ProtectedRoute';

// Dashboard Components
import UserDashboard from './pages/dashboard/UserDashboard';
import MyBookings from './pages/dashboard/MyBookings';
import MyFavorites from './pages/dashboard/MyFavorites';
import MyProfile from './pages/dashboard/MyProfile';

// Admin Components
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageListings from './pages/admin/ManageListings';
import ManageBookings from './pages/admin/ManageBookings';
import ManageUsers from './pages/admin/ManageUsers';
import CreateListing from './pages/admin/CreateListing';
import EditListing from './pages/admin/EditListing';

const queryClient = new QueryClient();

// Page Transition Wrapper
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="w-full flex-1 flex flex-col"
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/properties" element={<PageWrapper><ListingPage /></PageWrapper>} />
        <Route path="/properties/:id" element={<PageWrapper><PropertyDetails /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
        <Route path="/forgot-password" element={<PageWrapper><ForgotPassword /></PageWrapper>} />

        {/* Convenience routes */}
        <Route path="/for-rent" element={<Navigate to="/properties?type=Rent" replace />} />
        <Route path="/for-sale" element={<Navigate to="/properties?type=Sale" replace />} />

        {/* Protected User Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><UserDashboard /></PageWrapper></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard/bookings" replace />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="favorites" element={<MyFavorites />} />
          <Route path="profile" element={<MyProfile />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute requireAdmin><PageWrapper><AdminDashboard /></PageWrapper></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/listings" replace />} />
          <Route path="listings" element={<ManageListings />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="listings/create" element={<CreateListing />} />
          <Route path="listings/edit/:id" element={<EditListing />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <AnimatedRoutes />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
