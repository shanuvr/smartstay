import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Check,
  Calendar,
  Users,
  MapPin,
  Printer,
  Download,
  Home,
  Clock,
  CreditCard,
  Building,
  Coffee,
  ShieldCheck,
  Wifi
} from 'lucide-react';
import UserLayout from '../../layouts/Userlayout';

function BookingConfirmation() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Static booking information matching our Novotel booking data
  const bookingDetails = {
    reference: `STAY-HYD-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'Confirmed',
    hotelName: 'Novotel Hyderabad Convention Centre',
    address: 'Near Hitec City, Kondapur, Hyderabad, Telangana, India, 500084',
    stars: 5,
    checkInDate: 'Wed, Aug 5, 2026',
    checkOutDate: 'Fri, Aug 7, 2026',
    checkInTime: 'From 2:00 PM',
    checkOutTime: 'Before 12:00 PM',
    guests: '2 Guests',
    roomType: 'Deluxe Suite',
    nights: 2,
    basePrice: 17000,
    taxes: 2040,
    totalPrice: 19040,
    paymentMethod: 'Credit Card (Paid directly to hotel)',
    preferences: {
      roomType: 'Non-smoking Room',
      bedSetup: 'Large Bed',
      specialRequests: 'High floor preferred, quiet room if available.'
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <UserLayout>
      <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans text-slate-800 print:bg-white print:pt-0 print:pb-0">
        <div className="max-w-[1100px] mx-auto px-4">

          {/* Confirmation header — spacious card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 mb-8 shadow-sm print:border-none print:p-0 print:mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

              {/* Left Column: Confirmation Status & Title */}
              <div className="space-y-3 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Confirmed
                  </span>
                  <span className="text-xs text-slate-400">on Aug 3, 2026</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  You're all set for Hyderabad
                </h1>

                <p className="text-slate-555 text-xs md:text-sm max-w-xl leading-relaxed">
                  Your stay at <span className="font-semibold text-slate-800">{bookingDetails.hotelName}</span> is booked. A confirmation email with details and your digital key link is on its way.
                </p>
              </div>

              {/* Right Column: Premium Reference Stub Card */}
              <div className="w-full md:w-auto shrink-0 bg-slate-50 border border-slate-200 rounded-xl p-5 relative overflow-hidden flex flex-col justify-center items-center text-center min-w-[220px] print:bg-white">
                {/* Decorative punched holes to look like a ticket */}
                <div className="absolute top-1/2 -left-2.5 w-5 h-5 rounded-full bg-white border-r border-slate-200 -translate-y-1/2 print:hidden" />
                <div className="absolute top-1/2 -right-2.5 w-5 h-5 rounded-full bg-white border-l border-slate-200 -translate-y-1/2 print:hidden" />

                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] block mb-1">
                  Booking Reference
                </span>
                <span className="font-mono font-extrabold text-xl text-blue-600 tracking-wider">
                  {bookingDetails.reference}
                </span>

                <div className="w-full border-t border-dashed border-slate-200 pt-3 mt-3">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
                    Guaranteed Booking
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Core Layout Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6 print:w-full">

              {/* Stay Summary */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
                <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Your stay details
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:gap-x-0 text-left">
                  {/* Check-in */}
                  <div className="md:pr-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Check-in</p>
                    <p className="text-sm font-bold text-slate-800">{bookingDetails.checkInDate}</p>
                    <p className="text-xs text-slate-500 mt-1">{bookingDetails.checkInTime}</p>
                  </div>

                  {/* Check-out */}
                  <div className="md:px-6 border-slate-100 md:border-l">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Check-out</p>
                    <p className="text-sm font-bold text-slate-800">{bookingDetails.checkOutDate}</p>
                    <p className="text-xs text-slate-500 mt-1">{bookingDetails.checkOutTime}</p>
                  </div>

                  {/* Guests */}
                  <div className="md:px-6 border-slate-100 md:border-l">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Guests & Duration</p>
                    <p className="text-sm font-bold text-slate-800">{bookingDetails.guests}</p>
                    <p className="text-xs text-slate-500 mt-1">{bookingDetails.nights} nights</p>
                  </div>

                  {/* Accommodation */}
                  <div className="md:pl-6 border-slate-100 md:border-l">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Accommodation</p>
                    <p className="text-sm font-bold text-slate-800">{bookingDetails.roomType}</p>
                    <p className="text-xs text-slate-500 mt-1">Guaranteed Room</p>
                  </div>
                </div>
              </div>

              {/* Check-in Instructions */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 text-left">
                  Check-in instructions
                </h2>

                <div className="space-y-4 text-xs text-left">
                  {[
                    {
                      n: 1,
                      title: 'Pre-arrival digital check-in',
                      body: 'Opens 24 hours before arrival. Upload your photo ID online to receive your digital room key.',
                    },
                    {
                      n: 2,
                      title: 'Front desk key pickup',
                      body: 'Prefer a physical card? Present your booking reference and a valid ID at the front desk on arrival.',
                    },
                    {
                      n: 3,
                      title: 'Special preferences forwarded',
                      body: (
                        <>
                          Your request for a <strong className="text-slate-800">{bookingDetails.preferences.roomType}</strong> with a{' '}
                          <strong className="text-slate-800">{bookingDetails.preferences.bedSetup}</strong> has been sent to guest services.
                        </>
                      ),
                    },
                  ].map((step) => (
                    <div key={step.n} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                        {step.n}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{step.title}</p>
                        <p className="text-slate-500 mt-0.5">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-sm text-left">
                <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  What's included in your rate
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: Coffee, title: 'Breakfast', sub: 'Complimentary' },
                    { icon: ShieldCheck, title: 'Refundable', sub: 'Before Aug 4' },
                    { icon: Wifi, title: 'Free Wi-Fi', sub: 'High-speed' },
                  ].map((f) => (
                    <div key={f.title} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2 bg-slate-50 rounded-lg p-2.5 border border-slate-150">
                      <f.icon className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-slate-800 truncate">{f.title}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5 truncate">{f.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4 text-left">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  Billing & payment
                </h2>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Room rate ({bookingDetails.nights} nights)</span>
                    <span className="font-semibold text-slate-800">INR {bookingDetails.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Taxes, luxury fee & services</span>
                    <span className="font-semibold text-slate-800">INR {bookingDetails.taxes.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-dashed border-slate-200 pt-2.5 flex justify-between font-bold text-sm text-slate-900">
                    <span>Total price (all inclusive)</span>
                    <span className="text-blue-600">INR {bookingDetails.totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-blue-50/40 border border-blue-100/50 rounded-lg p-3 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Payment status</span>
                  <span className="font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">{bookingDetails.paymentMethod}</span>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="space-y-6 print:hidden">

              {/* Hotel Map */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 text-left">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{bookingDetails.hotelName}</h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-start gap-1.5 leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    {bookingDetails.address}
                  </p>
                </div>

                <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-square">
                  <iframe
                    title="Hotel Location Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=78.368%2C17.470%2C78.378%2C17.480&layer=mapnik&marker=17.4748%2C78.3728"
                    className="w-full h-full relative z-0"
                  />
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Novotel+Hyderabad+Convention+Centre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2.5 px-4 rounded-lg border border-slate-200 transition-colors text-xs cursor-pointer"
                >
                  Open in Google Maps
                </a>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full bg-blue-600 hover:bg-blue-750 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer border-none"
                >
                  <Printer className="w-4 h-4" />
                  Print confirmation
                </button>

                <button
                  type="button"
                  onClick={() => alert('Downloading booking receipt PDF...')}
                  className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-400" />
                  Download PDF receipt
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <Home className="w-4 h-4 text-slate-400" />
                  Return to home
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </UserLayout>
  );
}

export default BookingConfirmation;