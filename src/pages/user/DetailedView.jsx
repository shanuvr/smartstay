import React, { useState } from 'react';
import UserLayout from '../../laybouts/Userlayout';

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070",
    alt: "Novotel Hyderabad Convention Centre Exterior"
  },
  {
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=2074",
    alt: "Executive Suite Bedroom"
  },
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=2025",
    alt: "Modern Lobby Lounge"
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1974",
    alt: "Fine Dining Restaurant Interior"
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2080",
    alt: "Outdoor Pool Close-up"
  },
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2074",
    alt: "Serviced Apartment Kitchen"
  },
  {
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=2070",
    alt: "Luxurious Bathroom"
  }
];
const availableRooms = [
  {
    id: 1,
    name: "Superior Room, 1 King Bed",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2070",
    size: "30 sq.m",
    bed: "1 Extra-large double bed",
    view: "City View",
    price: 8500,
    oldPrice: "₹ 11,000",
    amenities: ["Free WiFi", "Air Conditioning", "Flat-screen TV", "Mini Bar", "Ensuite Bathroom"]
  },
  {
    id: 2,
    name: "Premier Room, Twin Beds",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2070",
    size: "35 sq.m",
    bed: "2 Single beds",
    view: "Pool View",
    price: 9200,
    oldPrice: "₹ 12,500",
    amenities: ["Free WiFi", "Air Conditioning", "Balcony", "Work Desk", "Coffee Maker"]
  },
  {
    id: 3,
    name: "Executive Suite",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=2070",
    size: "55 sq.m",
    bed: "1 Super-king bed",
    view: "Garden View",
    price: 14500,
    oldPrice: "₹ 18,000",
    amenities: ["Free WiFi", "Lounge Area", "Bathtub", "Premium Toiletries", "Free Breakfast"]
  }
];

const amenities = [
  { label: 'Free WiFi', icon: 'wifi' },
  { label: 'Free Parking', icon: 'parking' },
  { label: 'Air Conditioning', icon: 'ac' },
  { label: 'Swimming Pool', icon: 'pool' },
  { label: 'Spa & Wellness', icon: 'spa' },
  { label: 'Fitness Center', icon: 'gym' },
  { label: 'Bar & Lounge', icon: 'bar' },
  { label: 'Airport Shuttle', icon: 'shuttle' }
];

const renderAmenityIcon = (icon) => {
  const common = "w-5 h-5 text-[#2563eb]";
  switch (icon) {
    case 'wifi':
      return (
        <svg className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a9.5 9.5 0 0114.142 0M6.228 6.228a14.5 14.5 0 0120.544 0" />
        </svg>
      );
    case 'parking':
      return (
        <svg className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      );
    case 'ac':
      return (
        <svg className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      );
    case 'pool':
      return (
        <svg className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 3.75h16.5m-16.5 3.75h16.5" />
        </svg>
      );
    case 'spa':
      return (
        <svg className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        </svg>
      );
    case 'gym':
      return (
        <svg className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-10.5m-10.5 0l10.5 10.5" />
        </svg>
      );
    case 'bar':
      return (
        <svg className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'shuttle':
      return (
        <svg className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V17.5a6 6 0 00-6-6H8.25" />
        </svg>
      );
    default:
      return (
        <svg className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

export default function DetailedView() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const [searchState, setSearchState] = useState({
    checkIn: '12 Aug 2026',
    checkOut: '14 Aug 2026',
    adults: 2,
    children: 0,
    rooms: 1,
    nights: 2
  });
  
  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleRoomSelect = (room) => {
    if (searchState.rooms === 1) {
      if (selectedRooms.find(r => r.id === room.id)) {
        setSelectedRooms([]);
      } else {
        setSelectedRooms([{ ...room, quantity: 1 }]);
      }
    } else {
      const exists = selectedRooms.find(r => r.id === room.id);
      if (exists) {
        setSelectedRooms(selectedRooms.filter(r => r.id !== room.id));
      } else {
        if (selectedRooms.length < searchState.rooms) {
          setSelectedRooms([...selectedRooms, { ...room, quantity: 1 }]);
        }
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  const calculateTotalRoomsPrice = () => {
    return selectedRooms.reduce((total, room) => total + (room.price * searchState.nights), 0);
  };

  const calculateTaxes = (baseTotal) => {
    return Math.round(baseTotal * 0.12); // 12% tax mock
  };

  return (
    <UserLayout>
      <section className="max-w-[1320px] mx-auto px-3 sm:px-6 pt-24 sm:pt-28 pb-16">

        {/* Header: Title + Ratings */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-2 sm:gap-4 w-full">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 truncate">
                Novotel Hyderabad Airport
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="text-[#2563eb] font-semibold hover:underline cursor-pointer truncate">
                  Shamshabad, Rajiv Gandhi Int'l Airport, Hyderabad
                </span>
                <span className="hidden sm:inline text-gray-300 dark:text-slate-700">•</span>
                <span className="truncate">Free 24/7 Airport Shuttle • 5 mins from terminal</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pt-1 sm:pt-0">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg sm:rounded-xl p-1.5 sm:px-3 sm:py-2 shadow-sm cursor-pointer hover:bg-gray-50">
                <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                <span className="hidden sm:inline text-xs font-semibold text-gray-700 dark:text-gray-200">Share</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg sm:rounded-xl p-1.5 sm:px-3 sm:py-2 shadow-sm cursor-pointer hover:bg-gray-50">
                <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="hidden sm:inline text-xs font-semibold text-gray-700 dark:text-gray-200">Save</span>
              </div>
            </div>
          </div>

          {/* Rating summary row */}
          <div className="mt-3 flex items-center gap-1 sm:gap-2 flex-wrap text-[11px] sm:text-xs">
            <div className="flex items-center gap-0.5 text-amber-500">
              {[0, 1, 2, 3].map((i) => (
                <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 dark:text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-0.5 text-amber-600 dark:text-amber-500 font-extrabold text-sm sm:text-base leading-none">
                4.0
              </span>
            </div>

            <span className="text-gray-300 dark:text-slate-600 font-light text-sm sm:text-base leading-none mx-0.5">|</span>

            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="inline-flex items-center justify-center bg-[#2563eb] text-white font-extrabold text-[11px] sm:text-sm leading-none px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg shadow-sm">
                4.5
              </span>
              <span className="font-extrabold text-gray-900 dark:text-white text-sm sm:text-[15px] leading-none tracking-tight">
                Excellent
              </span>
              <span className="text-gray-400 dark:text-slate-500 font-medium text-[11px] sm:text-xs leading-none">
                (6,150 reviews)
              </span>
            </div>

            <span className="hidden sm:inline text-gray-300 dark:text-slate-600 font-light text-sm sm:text-base leading-none mx-0.5">|</span>

            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="text-gray-400 dark:text-slate-500 font-medium text-[11px] sm:text-xs leading-none">
                Location score
              </span>
              <span className="font-extrabold text-gray-900 dark:text-white text-sm sm:text-base leading-none">
                4.7
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1 mt-1.5 text-[11px] text-green-600 dark:text-green-500 font-semibold">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            10+ booked in last 24 hours
          </div>
        </div>

        {/* Editable Booking Search Bar */}
        <div className="mb-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl sm:rounded-full p-2 sm:p-2 shadow-sm flex flex-col sm:flex-row items-center gap-2 sm:gap-4 relative z-20">
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-slate-700">
            <div className="px-4 py-2 sm:py-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 rounded-t-lg sm:rounded-l-full sm:rounded-tr-none transition-colors">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Check-in</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{searchState.checkIn}</p>
            </div>
            <div className="px-4 py-2 sm:py-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Check-out</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{searchState.checkOut}</p>
            </div>
            <div className="px-4 py-2 sm:py-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 rounded-b-lg sm:rounded-r-full sm:rounded-bl-none transition-colors">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Guests & Rooms</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {searchState.adults} Adults · {searchState.children > 0 ? `${searchState.children} Children · ` : ''}{searchState.rooms} Room
              </p>
            </div>
          </div>
          <button className="w-full sm:w-auto bg-[#2563eb] hover:bg-blue-700 text-white px-6 py-3 sm:py-2 rounded-lg sm:rounded-full font-bold text-sm transition-all shadow-sm shrink-0">
            Update Search
          </button>
        </div>
      
        <div className="mb-4 sm:mb-6">
          <div className="flex md:grid md:grid-cols-12 gap-2 sm:gap-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-2 md:pb-0">

            {/* Main image */}
            <div
              onClick={() => setActivePhotoIndex(0)}
              className="relative group overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-200 dark:border-slate-700 dark:bg-slate-800 cursor-pointer shrink-0 w-[85vw] sm:w-[80vw] md:w-auto md:col-span-6 aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:h-[280px] lg:h-[350px] snap-center"
            >
              <img
                alt={galleryImages[0].alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={galleryImages[0].src}
              />
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex(0);
                  }}
                  className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-blue-600 text-[11px] sm:text-xs font-bold shadow-lg hover:bg-white transition-all cursor-pointer border border-gray-100"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812-1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  See all photos
                </button>
              </div>
            </div>

            {/* Thumbnail grid — horizontal scroll on mobile, 3x2 on md+ */}
            <div className="contents md:grid md:col-span-6 md:grid-cols-3 gap-2 sm:gap-3 md:h-[280px] lg:h-[350px]">
              {galleryImages.slice(1, 7).map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActivePhotoIndex(i + 1)}
                  className="relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 dark:border-slate-700 dark:bg-slate-800 group cursor-pointer shrink-0 w-[75vw] sm:w-[60vw] md:w-auto aspect-[16/10] sm:aspect-[16/9] md:aspect-auto snap-center"
                >
                  <img
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={img.src}
                  />
                </div>
              ))}
            </div>

          </div>
        </div>

    
        <div className="w-full px-2 sm:px-0 mb-6 sm:mb-8 sticky top-16 sm:top-20 z-30 bg-white dark:bg-slate-950 py-1">
          <nav className="flex items-center justify-between sm:justify-start gap-1.5 sm:gap-8 whitespace-nowrap border border-gray-200 dark:border-slate-800 rounded-full px-3 sm:px-10 shadow-sm bg-white dark:bg-slate-900 w-full sm:w-max">
            <a className="py-2 sm:py-3.5 font-bold text-[10px] sm:text-sm text-[#2563eb] border-b-2 border-[#2563eb] transition-all" href="#overview">Overview</a>
            <a className="py-2 sm:py-3.5 font-bold text-[10px] sm:text-sm text-gray-500 hover:text-[#2563eb] transition-all" href="#rooms">Rooms</a>
            <a className="py-2 sm:py-3.5 font-bold text-[10px] sm:text-sm text-gray-500 hover:text-[#2563eb] transition-all" href="#facilities">Facilities</a>
            <button
              onClick={() => setShowLocationModal(true)}
              className="py-2 sm:py-3.5 font-bold text-[10px] sm:text-sm text-gray-500 hover:text-[#2563eb] transition-all cursor-pointer"
            >
              Location
            </button>
            <a className="py-2 sm:py-3.5 font-bold text-[10px] sm:text-sm text-gray-500 hover:text-[#2563eb] transition-all" href="#policies">Policies</a>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Main Content (Left) */}
          <div className="flex-1 min-w-0">
            {/* Overview Section */}
            <div id="overview" className="scroll-mt-32 mb-8 sm:mb-10">
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white mb-3 sm:mb-4">Overview</h2>
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-slate-800">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Welcome to the Novotel Hyderabad Airport, perfectly situated just 5 minutes from the Rajiv Gandhi International Airport. Enjoy our 24/7 complimentary airport shuttle, modern rooms, expansive outdoor pool, and fully-equipped fitness center. Ideal for transit travelers and business guests seeking luxury and convenience.
                </p>
              </div>
            </div>

            {/* Rooms Section */}
            <div id="rooms" className="scroll-mt-32 mb-10 sm:mb-14">
              <div className="flex justify-between items-end mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">Rooms & Rates</h2>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">3 room types available</span>
              </div>
              <div className="flex flex-col gap-4 sm:gap-6">
                {availableRooms.map((room) => {
                  const isSelected = selectedRooms.find(r => r.id === room.id);
                  return (
                  <div key={room.id} className={`bg-white dark:bg-slate-900 rounded-xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-5 transition-all ${
                    isSelected ? 'border-2 border-[#2563eb] ring-4 ring-blue-50 dark:ring-blue-900/20' : 'border border-gray-200 dark:border-slate-800 hover:border-blue-300'
                  }`}>
                    
                    {/* Room Image */}
                    <div className="w-full sm:w-[220px] md:w-[260px] h-[160px] sm:h-[180px] rounded-lg overflow-hidden shrink-0 relative group">
                      <img src={room.image} alt={room.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    
                    {/* Room Details & Pricing */}
                    <div className="flex-1 flex flex-col md:flex-row gap-4 justify-between min-w-0">
                      
                      {/* Info Area */}
                      <div className="flex-1 flex flex-col min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 truncate">{room.name}</h3>
                        
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">
                          <div className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>{room.size}</div>
                          <div className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>{room.bed}</div>
                          <div className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>2 Guests</div>
                          <div className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>Free Wi-Fi</div>
                        </div>
                        
                        <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                          Comfortable room with garden view and modern amenities. Enjoy a relaxing stay with our premium facilities.
                        </p>
                        
                        <button className="text-[#2563eb] text-[11px] sm:text-xs font-semibold flex items-center gap-1 mt-auto hover:underline w-max">
                          Room details
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                      </div>
                      
                      {/* Pricing Area */}
                      <div className="flex flex-col items-start md:items-end md:w-[170px] shrink-0 border-t md:border-t-0 md:border-l border-gray-100 dark:border-slate-800 pt-3 md:pt-0 md:pl-4">
                        <div className="mb-3 md:text-right">
                          <p className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white leading-none mb-1">{formatPrice(room.price)} <span className="text-[10px] font-normal text-gray-500 dark:text-gray-400">/ night</span></p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">+ {formatPrice(Math.round(room.price * 0.12))} taxes & fees</p>
                        </div>
                        <div className="flex flex-row flex-wrap md:flex-col md:items-end gap-1.5 mb-3 w-full">
                          <span className="bg-green-50 text-green-700 border border-green-100 dark:bg-green-500/10 dark:border-green-500/20 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded w-max">Free cancellation</span>
                          <span className="bg-green-50 text-green-700 border border-green-100 dark:bg-green-500/10 dark:border-green-500/20 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded w-max">Pay at hotel</span>
                        </div>
                        <button 
                          onClick={() => handleRoomSelect(room)}
                          className={`w-full mt-auto px-4 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-sm ${
                            isSelected 
                              ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30' 
                              : 'bg-[#2563eb] hover:bg-blue-700 text-white shadow-blue-500/30'
                          }`}
                        >
                          {isSelected ? '✓ Selected' : 'Select Room'}
                        </button>
                      </div>

                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Sidebar (Right) */}
          <div className="w-full lg:w-[320px] xl:w-[350px] shrink-0">
            <div className="sticky top-28 sm:top-32 space-y-4 sm:space-y-6 pb-10">
              
              {/* Price Summary Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-200 dark:border-slate-800 transition-all">
                {selectedRooms.length === 0 ? (
                  // Empty State
                  <div className="text-center py-2">
                    <p className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Your Stay</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{searchState.checkIn} — {searchState.checkOut}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{searchState.nights} nights • {searchState.adults} Adults · {searchState.rooms} Room</p>
                    
                    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 border border-gray-100 dark:border-slate-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No room selected yet</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Choose an available room to see your total.</p>
                    </div>
                  </div>
                ) : (
                  // Selected State
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">Your Stay</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">{searchState.checkIn} → {searchState.checkOut} <span className="mx-2">•</span> {searchState.adults} Adults · {searchState.rooms} Room</p>
                    
                    <div className="space-y-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {selectedRooms.map((room, idx) => (
                        <div key={`${room.id}-${idx}`}>
                          <p className="font-bold text-gray-900 dark:text-white mb-1">{room.name}</p>
                          <div className="flex justify-between items-center">
                            <span>{formatPrice(room.price)} x {searchState.nights} nights</span>
                            <span className="font-medium text-gray-900 dark:text-white">{formatPrice(room.price * searchState.nights)}</span>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100 dark:border-slate-800">
                        <span>Taxes & fees</span>
                        <span className="font-medium text-gray-900 dark:text-white">{formatPrice(calculateTaxes(calculateTotalRoomsPrice()))}</span>
                      </div>
                    </div>
                    
                    <div className="my-4 sm:my-5 border-t border-gray-100 dark:border-slate-800 pt-4 sm:pt-5 flex justify-between items-center">
                      <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Total</span>
                      <span className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white leading-none">
                        {formatPrice(calculateTotalRoomsPrice() + calculateTaxes(calculateTotalRoomsPrice()))}
                      </span>
                    </div>
                    
                    <button className="w-full bg-[#2563eb] hover:bg-blue-700 text-white py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all shadow-sm shadow-blue-500/30 mb-4 sm:mb-5">
                      Continue to Booking
                    </button>
                    <div className="flex items-center justify-between sm:justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1 sm:gap-1.5"><svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg> Best Price Guarantee</span>
                      <span className="flex items-center gap-1 sm:gap-1.5"><svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> No booking fees</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Trust Box */}
              <div className="bg-blue-50 dark:bg-slate-800/50 rounded-2xl p-5 sm:p-6 shadow-sm border border-blue-100 dark:border-slate-700">
                <p className="font-bold text-gray-900 dark:text-white mb-4 sm:mb-5 text-sm sm:text-base">Why book with SmartStay?</p>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start gap-3 sm:gap-3.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span>Faster check-in with verified details</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-3.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.965 11.965 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    <span>Secure and hassle-free experience</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-3.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    <span>24/7 Customer support</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
          
        </div>

      </section>
    </UserLayout>
  );
}