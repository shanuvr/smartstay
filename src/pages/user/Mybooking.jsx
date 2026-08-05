import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Star, QrCode, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/Userlayout';

const mockBookings = [
  {
    id: 'BKG-9928-XY',
    hotelName: 'Novotel Hyderabad Convention Centre',
    location: 'Kondapur, Hyderabad',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
    dates: 'Aug 3 – Aug 6',
    nights: '3 nights',
    guests: '2 Guests',
    price: '₹12,450',
    status: 'today', // Can check in today
  },
  {
    id: 'BKG-4412-AB',
    hotelName: 'Taj Mahal Palace',
    location: 'Colaba, Mumbai',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop',
    dates: 'Sep 15 – Sep 20',
    nights: '5 nights',
    guests: '2 Guests',
    price: '₹24,890',
    status: 'upcoming',
  },
  {
    id: 'BKG-1102-ZX',
    hotelName: 'ITC Grand Chola',
    location: 'Guindy, Chennai',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop',
    dates: 'May 10 – May 12',
    nights: '2 nights',
    guests: '1 Guest',
    price: '₹8,900',
    status: 'past',
  }
];

const Mybooking = () => {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();
  
  // State for checkin persistence
  const [digitalCheckinDone, setDigitalCheckinDone] = useState({});
  const [checkedInStays, setCheckedInStays] = useState({});

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const handleOpenReview = (booking) => {
    setSelectedBookingForReview(booking);
    setReviewRating(5);
    setReviewText('');
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Normally would save to backend here
    setIsReviewModalOpen(false);
  };

  useEffect(() => {
    const adminConfirmed = {};
    const digitalDone = {};
    mockBookings.forEach(booking => {
      // Admin confirmed check-in (key handed over)
      if (localStorage.getItem(`checkin_status_${booking.id}`) === 'true') {
        adminConfirmed[booking.id] = true;
      }
      // Guest completed digital check-in (awaiting admin confirmation)
      if (localStorage.getItem(`digital_checkin_completed_${booking.id}`) === 'true') {
        digitalDone[booking.id] = true;
      }
    });
    setCheckedInStays(adminConfirmed);
    setDigitalCheckinDone(digitalDone);
  }, []);

  const filteredBookings = mockBookings.filter(b => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Upcoming' && (b.status === 'upcoming' || b.status === 'today')) return true;
    if (activeTab === 'Completed' && b.status === 'past') return true;
    return false;
  });

  return (
    <UserLayout>
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-4 sm:py-8 font-sans text-slate-800">
        <div className="max-w-3xl mx-auto px-3 sm:px-6 mt-16 md:mt-24">

          {/* Header - Compact */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">My Bookings</h1>
            <p className="text-slate-500 text-xs sm:text-sm">Manage your stays and check-in statuses.</p>
          </div>

          {/* Filter Pills - Compact */}
          <div className="flex items-center gap-2 mb-4">
            {['All', 'Upcoming', 'Completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === tab
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Compact Horizontal Booking Cards */}
          <div className="space-y-3">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all overflow-hidden flex flex-row items-stretch"
              >

                {/* Left Image Thumbnail - Scaled Proportions */}
                <div className="w-24 sm:w-36 md:w-44 shrink-0 relative bg-slate-100 overflow-hidden">
                  <img
                    src={booking.image}
                    alt={booking.hotelName}
                    className="w-full h-full object-cover"
                  />
                  {(booking.status === 'today' || checkedInStays[booking.id] || digitalCheckinDone[booking.id]) && (
                    <span className={`absolute top-1.5 left-1.5 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1 ${checkedInStays[booking.id] ? 'bg-blue-600' : digitalCheckinDone[booking.id] ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}>
                      {checkedInStays[booking.id] ? (
                        <>
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          Checked In
                        </>
                      ) : digitalCheckinDone[booking.id] ? (
                        <>
                          <Clock className="w-2.5 h-2.5" />
                          At Reception
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                          Check-in
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* Right Details Section - Compact padding & sizes */}
                <div className="flex-1 p-2.5 sm:p-3.5 flex flex-col justify-between min-w-0">

                  <div>
                    {/* ID & Status */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mb-0.5">
                      <span>ID: {booking.id}</span>
                      <span className="hidden sm:inline-block font-semibold text-slate-500">{booking.guests}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs sm:text-base font-bold text-slate-900 truncate leading-snug">
                      {booking.hotelName}
                    </h3>

                    {/* Location */}
                    <p className="text-slate-500 text-[10px] sm:text-xs flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{booking.location}</span>
                    </p>

                    {/* Single Line Date Tag */}
                    <div className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-150 font-medium">
                      <Calendar className="w-3 h-3 text-blue-600 shrink-0" />
                      <span className="whitespace-nowrap">{booking.dates}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 whitespace-nowrap">{booking.nights}</span>
                    </div>
                  </div>

                  {/* Footer: Price & Action */}
                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between gap-1">
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900">{booking.price}</span>
                      <span className="text-[9px] text-slate-400 ml-1 hidden sm:inline">total</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {booking.status === 'today' && (
                        checkedInStays[booking.id] ? (
                          <button
                            onClick={() => navigate('/check-in', { state: { bookingId: booking.id, hotelName: booking.hotelName } })}
                            className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 active:scale-95 shadow-2xs"
                          >
                            <QrCode className="w-3 h-3" />
                            <span>View Key</span>
                          </button>
                        ) : digitalCheckinDone[booking.id] ? (
                          <button
                            className="whitespace-nowrap bg-amber-500 hover:bg-amber-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-default shadow-2xs"
                          >
                            <Clock className="w-3 h-3" />
                            <span>Key at Reception</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => navigate('/check-in', { state: { bookingId: booking.id, hotelName: booking.hotelName } })}
                            className="whitespace-nowrap bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 active:scale-95 shadow-2xs"
                          >
                            <QrCode className="w-3 h-3" />
                            <span>Check In</span>
                          </button>
                        )
                      )}

                      {booking.status === 'past' && (
                        <button 
                          onClick={() => handleOpenReview(booking)}
                          className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-2xs"
                        >
                          <Star className="w-3 h-3 fill-white/20" />
                          <span>Rate & Review</span>
                        </button>
                      )}

                      {booking.status === 'upcoming' && (
                        <button className="whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors">
                          Manage
                        </button>
                      )}

                      <button className="p-1 text-slate-400 hover:text-slate-600">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && selectedBookingForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsReviewModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Rate your stay</h3>
                <p className="text-sm font-semibold text-slate-500 mt-1">{selectedBookingForReview.hotelName}</p>
              </div>
              <button 
                onClick={() => setIsReviewModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-600 shadow-sm"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitReview} className="p-6 flex flex-col gap-5">
              <div className="flex flex-col items-center justify-center gap-2 mb-2">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tap to rate</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star 
                        size={36} 
                        className={`${star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'} transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tell us about your experience</label>
                <textarea 
                  required
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="What did you like? What could be improved?" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-800 resize-none"
                />
              </div>
              <div className="mt-2">
                <button 
                  type="submit" 
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors text-lg"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </UserLayout>
  );
};

export default Mybooking;
