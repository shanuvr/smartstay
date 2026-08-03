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
import PartnerLayout from './pages/user/partner/PartnerLayout';
import BusinessDetails from './pages/user/partner/BusinessDetails';
import SelectPackage from './pages/user/partner/SelectPackage';
import PropertyType from './pages/user/partner/PropertyType';
import PropertyDetails from './pages/user/partner/PropertyDetails';
import Payment from './pages/user/partner/Payment';

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
        
        {/* Partner / List Your Place Onboarding */}
        <Route path="/list-your-place" element={<PartnerLayout />}>
          <Route index element={<BusinessDetails />} />
          <Route path="package" element={<SelectPackage />} />
          <Route path="type" element={<PropertyType />} />
          <Route path="details" element={<PropertyDetails />} />
          <Route path="payment" element={<Payment />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

