import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './hooks/useAuth';
import ScrollToTop from './components/ScrollToTop';

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
import MyFavorites from './pages/dashboard/MyFavorites';
import MyProfile from './pages/dashboard/MyProfile';
import Messages from './pages/dashboard/Messages';

// Marketplace Management Components
import ManageListings from './pages/admin/ManageListings';
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

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><UserDashboard /></PageWrapper></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard/listings" replace />} />
          <Route path="listings" element={<ManageListings />} />
          <Route path="listings/create" element={<CreateListing />} />
          <Route path="listings/edit/:id" element={<EditListing />} />
          <Route path="messages" element={<Messages />} />
          <Route path="favorites" element={<MyFavorites />} />
          <Route path="profile" element={<MyProfile />} />
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
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <AnimatedRoutes />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
