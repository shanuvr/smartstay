import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/user/Home';
import Listing from './pages/user/Listing';
import DetailedView from './pages/user/DetailedView';
import Booking from './pages/user/Booking';
import BookingConfirmation from './pages/user/BookingConfirmation';
import Signin from './pages/user/Signin';
import Mybooking from './pages/user/Mybooking';
import Checkin from './pages/user/Checkin';
import Register from './pages/user/Register';
import Profile from './pages/user/Profile';
import UserSupport from './pages/user/Support';
import Saved from './pages/user/Saved';
import PartnerLayout from './pages/user/partner/PartnerLayout';
import BusinessDetails from './pages/user/partner/BusinessDetails';
import SelectPackage from './pages/user/partner/SelectPackage';
import PropertyType from './pages/user/partner/PropertyType';
import PropertyDetails from './pages/user/partner/PropertyDetails';
import Payment from './pages/user/partner/Payment';

// Super Admin Portal
import SuperAdminLogin from './pages/super-admin/Login';
import SuperAdminLayout from './layouts/SuperAdminLayout';
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import SuperAdminProperties from './pages/super-admin/Properties';
import SuperAdminUsers from './pages/super-admin/Users';
import SuperAdminPartners from './pages/super-admin/Partners';
import SuperAdminFinance from './pages/super-admin/Finance';
import SuperAdminSettings from './pages/super-admin/Settings';
import SuperAdminSupport from './pages/super-admin/Support';

// Admin / Partner Portal
import AdminLogin from './pages/admin/Login';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPropertyList from './pages/admin/PropertyList';
import AdminRooms from './pages/admin/Rooms';
import AdminRatesAndAvailability from './pages/admin/RatesAndAvailability';
import AdminFacilities from './pages/admin/Facilities';
import AdminBookings from './pages/admin/Bookings';
import AdminFinance from './pages/admin/Finance';
import AdminSupport from './pages/admin/Support';
import AdminReviews from './pages/admin/Reviews';

import SettingsLayout from './pages/admin/settings/SettingsLayout';
import PropertyInformation from './pages/admin/settings/PropertyInformation';
import ListingBadges from './pages/admin/settings/ListingBadges';
import PropertyLocation from './pages/admin/settings/PropertyLocation';
import PaymentSettings from './pages/admin/settings/PaymentSettings';
import ContactInfo from './pages/admin/settings/ContactInfo';
import Policies from './pages/admin/settings/Policies';
import ManagePhotos from './pages/admin/settings/ManagePhotos';
import SubscriptionPlan from './pages/admin/settings/SubscriptionPlan';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/hotel/:id" element={<DetailedView />} />
        <Route path="/book/:id" element={<Booking />} />
        <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/bookings" element={<Mybooking />} />
        <Route path="/check-in" element={<Checkin />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support" element={<UserSupport />} />
        <Route path="/saved" element={<Saved />} />
        
        {/* Partner / List Your Place Onboarding */}
        <Route path="/list-your-place" element={<PartnerLayout />}>
          <Route index element={<BusinessDetails />} />
          <Route path="package" element={<SelectPackage />} />
          <Route path="type" element={<PropertyType />} />
          <Route path="details" element={<PropertyDetails />} />
          <Route path="payment" element={<Payment />} />
        </Route>

        {/* Admin / Partner Dashboard */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPropertyList />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="rooms" element={<AdminRooms />} />
          <Route path="rates" element={<AdminRatesAndAvailability />} />
          <Route path="facilities" element={<AdminFacilities />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="finance" element={<AdminFinance />} />
          <Route path="support" element={<AdminSupport />} />
          <Route path="reviews" element={<AdminReviews />} />

          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<PropertyInformation />} />
            <Route path="photos" element={<ManagePhotos />} />
            <Route path="badges" element={<ListingBadges />} />
            <Route path="location" element={<PropertyLocation />} />
            <Route path="payment" element={<PaymentSettings />} />
            <Route path="contact" element={<ContactInfo />} />
            <Route path="policies" element={<Policies />} />
            <Route path="plan" element={<SubscriptionPlan />} />
          </Route>
          {/* <Route path="properties" element={<AdminProperties />} /> */}
          {/* <Route path="bookings" element={<AdminBookings />} /> */}
        </Route>

        {/* Super Admin Dashboard */}
        <Route path="/super-admin/login" element={<SuperAdminLogin />} />

        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="properties" element={<SuperAdminProperties />} />
          <Route path="users" element={<SuperAdminUsers />} />
          <Route path="partners" element={<SuperAdminPartners />} />
          <Route path="finance" element={<SuperAdminFinance />} />
          <Route path="settings" element={<SuperAdminSettings />} />
          <Route path="support" element={<SuperAdminSupport />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

