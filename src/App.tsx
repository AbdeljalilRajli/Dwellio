import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './pages/Home';
import ListingPage from './pages/ListingPage';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import { ProtectedRoute } from './components/ProtectedRoute';

// Dashboard Components (To be implemented)
import UserDashboard from './pages/dashboard/UserDashboard';
import MyBookings from './pages/dashboard/MyBookings';
import MyFavorites from './pages/dashboard/MyFavorites';
import MyProfile from './pages/dashboard/MyProfile';

// Admin Components (To be implemented)
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageListings from './pages/admin/ManageListings';
import ManageBookings from './pages/admin/ManageBookings';
import ManageUsers from './pages/admin/ManageUsers';
import CreateListing from './pages/admin/CreateListing';
import EditListing from './pages/admin/EditListing';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<ListingPage />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected User Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard/bookings" replace />} />
              <Route path="bookings" element={<MyBookings />} />
              <Route path="favorites" element={<MyFavorites />} />
              <Route path="profile" element={<MyProfile />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>}>
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
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
