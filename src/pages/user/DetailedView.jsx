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

const faqs = [
  {
    question: "What are the check-in and check-out times?",
    answer: "Check-in is from 2:00 PM, and check-out is until 12:00 PM (noon). Early check-in or late check-out is subject to availability and may incur additional charges."
  },
  {
    question: "Is there a free airport shuttle service?",
    answer: "Yes, we provide a complimentary 24/7 airport shuttle service. It departs every 30 minutes. Please contact the front desk upon arrival or provide your flight details in advance."
  },
  {
    question: "Do you offer free Wi-Fi?",
    answer: "Yes, high-speed Wi-Fi is available complimentary in all guest rooms and public areas across the property."
  },
  {
    question: "Can I cancel my reservation for free?",
    answer: "Cancellation policies vary by room type and rate selected. Rooms marked with 'Free cancellation' can be canceled up to 24 hours before your stay without penalty."
  },
  {
    question: "Is there parking available at the hotel?",
    answer: "Yes, we offer complimentary secure parking for all staying guests. Valet service is also available upon request."
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

const allFacilities = [
  {
    category: "Internet access",
    icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Wifi icon alternative
    items: [
      "Free Wi-Fi in all rooms!", "Internet", "Internet [LAN]", "Internet services", "Wi-Fi in public areas"
    ]
  },
  {
    category: "Things to do, ways to relax",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Relax icon
    items: [
      "Body scrub", "Body wrap", "Computer station", "Fitness center", "Foot bath", "Game room", "Garden",
      "Gym/fitness", "Massage bed", "Nightclub", "On-site entertainment", "Pool facilities", "Pool with view",
      "Private bath", "Sauna", "Spa", "Spa/sauna", "Steamroom", "Swimming pool", "Swimming pool [outdoor]",
      "Ticket services", "Tours", "Yoga room"
    ]
  },
  {
    category: "Cleanliness and safety",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", // Shield icon
    items: [
      "Anti-viral cleaning products", "Body thermometer", "Breakfast in room", "Breakfast takeaway service",
      "Cashless payment service", "Daily disinfection in all rooms", "Daily disinfection in common areas",
      "Doctor/nurse on call", "First aid kit", "Free face masks", "Guest rooms seal after sanitization",
      "Hand sanitizer", "Hot water linen and laundry washing", "Hygiene certification",
      "Individually-wrapped food options", "Physical distancing of at least 1 meter",
      "Protective screens in common areas", "Room sanitization opt-out available", "Rooms sanitized between stays",
      "Safe dining setup", "Sanitized kitchen and tableware items", "Shared stationery removed",
      "Staff trained in safety protocol", "Temperature check for guests and staff"
    ]
  },
  {
    category: "Dining, drinking, and snacking",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z", // Food icon
    items: [
      "A la carte breakfast", "A la carte in restaurant", "Alcohol", "Alternative meal arrangement",
      "Asian breakfast", "Bar", "BBQ facilities", "Bottle of water", "Breakfast [buffet]",
      "Breakfast [continental]", "Buffet in restaurant", "Chinese cuisine in restaurant",
      "Coffee/tea in restaurant", "Coffee shop", "Desserts in restaurant", "Happy hour",
      "International cuisine in restaurant", "Kitchen", "Poolside bar", "Restaurant dinner",
      "Restaurant lunch", "Restaurants", "Room service [24-hour]", "Salad in restaurant",
      "Snack bar", "Soup in restaurant", "Vegetarian restaurant", "Western breakfast",
      "Western cuisine in restaurant"
    ]
  },
  {
    category: "Services and conveniences",
    icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2", // Service icon
    items: [
      "Air conditioning in public area", "Audio-visual equipment for special events", "Business facilities",
      "Cash withdrawal", "Concierge", "Contactless check-in/out", "Currency exchange", "Daily housekeeping",
      "Doorman", "Dry cleaning", "Elevator", "Facilities for disabled guests", "Food delivery",
      "Gift/souvenir shop", "Grooming service", "Invoice provided", "Ironing service", "Laundry service",
      "Library", "Lockers", "Luggage storage", "Meeting/banquet facilities", "Meetings", "Safety deposit boxes",
      "Salon", "Shared lounge/TV area", "Shops", "Smoke-free property", "Smoking area", "Xerox/fax in business center"
    ]
  },
  {
    category: "For the kids",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Kids icon
    items: [
      "Kids meal", "Playground"
    ]
  },
  {
    category: "Access",
    icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z", // Key/Access icon
    items: [
      "CCTV in common areas", "CCTV outside property", "Check-in/out [express]", "Check-in/out [private]",
      "Check-in [24-hour]", "Filming locations", "Fire extinguisher", "Front desk [24-hour]", "Hotel chain",
      "Non-smoking rooms", "Safety/security feature", "Security [24-hour]", "Smoke alarms", "Soundproof rooms"
    ]
  },
  {
    category: "Getting around",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", // Transport icon
    items: [
      "Airport transfer", "Bicycle parking", "Car park [free of charge]", "Car park [on-site]",
      "Car power charging station", "Rental car", "Shuttle service", "Valet parking"
    ]
  }
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

const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
};

export default function DetailedView() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showFacilitiesModal, setShowFacilitiesModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showOccupancy, setShowOccupancy] = useState(false);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  const [searchState, setSearchState] = useState({
    checkIn: '2026-08-12',
    checkOut: '2026-08-14',
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

  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const handleDateClick = (year, month, day) => {
    const yyyy = year;
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    if (!searchState.checkIn || (searchState.checkIn && searchState.checkOut)) {
      setSearchState(prev => ({ ...prev, checkIn: dateStr, checkOut: '' }));
    } else {
      const checkInDate = new Date(searchState.checkIn);
      const selectedDate = new Date(dateStr);
      if (selectedDate < checkInDate) {
        setSearchState(prev => ({ ...prev, checkIn: dateStr }));
      } else {
        setSearchState(prev => ({ ...prev, checkOut: dateStr }));
        setShowCalendar(false);
      }
    }
  };

  const renderMonth = (offset, isExtraMonth = false) => {
    const today = new Date();
    const targetDate = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const dayCells = [];
    for (let i = 0; i < firstDay; i++) {
      dayCells.push(<div key={`pad-${i}`} className="h-8 w-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const yyyy = year;
      const mm = String(month + 1).padStart(2, '0');
      const dd = String(day).padStart(2, '0');
      const cellDateStr = `${yyyy}-${mm}-${dd}`;
      const cellDate = new Date(cellDateStr);

      const isCheckIn = searchState.checkIn === cellDateStr;
      const isCheckOut = searchState.checkOut === cellDateStr;
      const isInRange = searchState.checkIn && searchState.checkOut && cellDate > new Date(searchState.checkIn) && cellDate < new Date(searchState.checkOut);

      let cellClass = "h-8 w-8 flex items-center justify-center rounded-full text-xs sm:text-[13px] font-semibold cursor-pointer transition-colors relative ";

      if (isCheckIn || isCheckOut) {
        cellClass += "bg-[#003B95] text-white";
      } else if (isInRange) {
        cellClass += "bg-blue-50 dark:bg-slate-800 text-gray-800 dark:text-white rounded-none";
      } else {
        const compareToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isPast = cellDate < compareToday;
        if (isPast) {
          cellClass += "text-gray-300 dark:text-slate-700 cursor-not-allowed pointer-events-none";
        } else {
          cellClass += "text-gray-700 dark:text-gray-200 hover:bg-gray-150 dark:hover:bg-slate-800";
        }
      }

      dayCells.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateClick(year, month, day)}
          className={cellClass}
        >
          {day}
        </button>
      );
    }

    return (
      <div className={`flex-1 min-w-[210px] sm:min-w-[240px] ${isExtraMonth ? 'sm:hidden' : ''}`}>
        <h4 className="text-center font-bold text-gray-800 dark:text-white mb-3 text-sm sm:text-base">
          {monthNames[month]} {year}
        </h4>
        <div className="grid grid-cols-7 gap-y-1 text-center mb-2 hidden sm:grid">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
            <span key={d} className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase">
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1 justify-items-center">
          {dayCells}
        </div>
      </div>
    );
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

        {/* Editable Booking Search Bar */}
        <div className="mb-6 mx-auto max-w-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-full p-1.5 sm:p-2 shadow-sm flex flex-row items-center gap-1.5 sm:gap-4 relative z-20">
          <div className="flex-1 w-full grid grid-cols-3 divide-x divide-gray-200 dark:divide-slate-700 min-w-0">
            <div 
              className="px-2 sm:px-4 py-1.5 sm:py-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 rounded-l-full transition-colors min-w-0"
              onClick={() => {
                setShowCalendar(!showCalendar);
                setShowOccupancy(false);
              }}
            >
              <p className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Check-in</p>
              <p className="text-[10px] sm:text-sm font-semibold text-gray-900 dark:text-white truncate">{searchState.checkIn ? formatDateDisplay(searchState.checkIn) : 'Add date'}</p>
            </div>
            <div 
              className="px-2 sm:px-4 py-1.5 sm:py-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors min-w-0"
              onClick={() => {
                setShowCalendar(!showCalendar);
                setShowOccupancy(false);
              }}
            >
              <p className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Check-out</p>
              <p className="text-[10px] sm:text-sm font-semibold text-gray-900 dark:text-white truncate">{searchState.checkOut ? formatDateDisplay(searchState.checkOut) : 'Add date'}</p>
            </div>
            <div 
              className="px-2 sm:px-4 py-1.5 sm:py-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 rounded-r-full transition-colors min-w-0"
              onClick={() => {
                setShowOccupancy(!showOccupancy);
                setShowCalendar(false);
              }}
            >
              <p className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Guests</p>
              <p className="text-[10px] sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                {searchState.adults} Adults {searchState.children > 0 ? `· ${searchState.children} Kids` : ''}
              </p>
            </div>
          </div>
          <button className="w-auto bg-[#2563eb] hover:bg-blue-700 text-white px-3 sm:px-6 py-2 sm:py-2 rounded-full font-bold text-[10px] sm:text-sm transition-all shadow-sm shrink-0">
            Search
          </button>
        </div>

        {/* Calendar Popover */}
        {showCalendar && (
          <div className="absolute top-[320px] sm:top-[160px] left-1/2 -translate-x-1/2 w-[94vw] max-w-[580px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3 sm:p-4 z-50">
            <div className="flex border-b border-gray-150 dark:border-slate-800 mb-3 select-none">
              <button type="button" className="px-4 py-2 border-b-2 border-[#2563eb] font-bold text-sm text-[#2563eb] dark:text-blue-400">
                Calendar
              </button>
            </div>
            <div className="grid grid-cols-7 gap-y-1 text-center mb-2 sm:hidden px-1 text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-between relative pt-1 max-h-[260px] overflow-y-auto sm:max-h-none sm:overflow-visible pr-1 sm:pr-0 scrollbar-none">
              {renderMonth(currentMonthOffset)}
              <div className="hidden sm:block w-px bg-gray-100 dark:bg-slate-800 self-stretch" />
              {renderMonth(currentMonthOffset + 1)}
              {renderMonth(currentMonthOffset + 2, true)}

              <button
                type="button"
                onClick={() => setCurrentMonthOffset(currentMonthOffset - 1)}
                className="hidden sm:flex absolute left-0 -top-2 w-8 h-8 rounded-full border border-gray-250 dark:border-slate-700 bg-white dark:bg-slate-800 items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 shadow-sm transition-colors z-10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setCurrentMonthOffset(currentMonthOffset + 1)}
                className="hidden sm:flex absolute right-0 -top-2 w-8 h-8 rounded-full border border-gray-250 dark:border-slate-700 bg-white dark:bg-slate-800 items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 shadow-sm transition-colors z-10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Backdrop for Popovers */}
        {(showCalendar || showOccupancy) && (
          <div 
            className="fixed inset-0 z-40 bg-transparent" 
            onClick={() => {
              setShowCalendar(false);
              setShowOccupancy(false);
            }} 
          />
        )}

        {/* Occupancy Popover */}
        {showOccupancy && (
          <div className="absolute top-[320px] sm:top-[160px] left-1/2 -translate-x-1/2 w-[90vw] max-w-[280px] mt-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3.5 z-50">
            {/* Adults Counter */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-gray-800 dark:text-white text-xs">Adults</span>
              <div className="border border-gray-200 dark:border-slate-700 rounded-md py-1 px-2.5 flex items-center justify-between gap-3 w-[85px]">
                <button
                  type="button"
                  onClick={() => setSearchState(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                  className={`text-base font-normal select-none leading-none ${searchState.adults <= 1 ? 'text-gray-300 dark:text-slate-700 cursor-not-allowed' : 'text-[#2563eb] dark:text-blue-400 cursor-pointer'}`}
                  disabled={searchState.adults <= 1}
                >
                  —
                </button>
                <span className="font-bold text-gray-800 dark:text-white text-xs">{searchState.adults}</span>
                <button
                  type="button"
                  onClick={() => setSearchState(prev => ({ ...prev, adults: prev.adults + 1 }))}
                  className="text-base font-normal text-[#2563eb] dark:text-blue-400 cursor-pointer select-none leading-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children Counter */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-gray-800 dark:text-white text-xs">Children</span>
              <div className="border border-gray-200 dark:border-slate-700 rounded-md py-1 px-2.5 flex items-center justify-between gap-3 w-[85px]">
                <button
                  type="button"
                  onClick={() => setSearchState(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                  className={`text-base font-normal select-none leading-none ${searchState.children <= 0 ? 'text-gray-300 dark:text-slate-700 cursor-not-allowed' : 'text-[#2563eb] dark:text-blue-400 cursor-pointer'}`}
                  disabled={searchState.children <= 0}
                >
                  —
                </button>
                <span className="font-bold text-gray-800 dark:text-white text-xs">{searchState.children}</span>
                <button
                  type="button"
                  onClick={() => setSearchState(prev => ({ ...prev, children: prev.children + 1 }))}
                  className="text-base font-normal text-[#2563eb] dark:text-blue-400 cursor-pointer select-none leading-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* Compact Travelling with pets? */}
            <div className="flex items-center justify-between py-2 border-t border-gray-150 dark:border-slate-800 mt-1">
              <span className="font-semibold text-gray-800 dark:text-white text-xs">Travelling with pets?</span>
              <button
                type="button"
                onClick={() => setSearchState(prev => ({ ...prev, withPets: !prev.withPets }))}
                className={`relative inline-flex h-4.5 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${searchState.withPets ? 'bg-[#2563eb]' : 'bg-gray-200 dark:bg-slate-700'}`}
              >
                <span
                  className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${searchState.withPets ? 'translate-x-3.5' : 'translate-x-0'}`}
                />
              </button>
            </div>

            <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight mt-0.5">
              Assistance animals aren't considered pets.
            </p>

            <button
              type="button"
              onClick={() => setShowOccupancy(false)}
              className="mt-3 border border-[#2563eb] text-[#2563eb] hover:bg-blue-50 dark:hover:bg-slate-800 dark:border-blue-400 dark:text-blue-400 font-bold py-1.5 px-3 rounded-lg w-full text-center transition-colors block text-xs select-none"
            >
              Done
            </button>
          </div>
        )}

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
            <button
              onClick={() => setShowFacilitiesModal(true)}
              className="py-2 sm:py-3.5 font-bold text-[10px] sm:text-sm text-gray-500 hover:text-[#2563eb] transition-all cursor-pointer"
            >
              Facilities
            </button>
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

            {/* FAQ Section */}
            <div id="faq" className="scroll-mt-32 mb-10 sm:mb-14">
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-6">Frequently Asked Questions</h2>
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 divide-y divide-gray-200 dark:divide-slate-800">
                {faqs.map((faq, index) => (
                  <div key={index} className="group">
                    <button 
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-slate-800 transition-colors"
                    >
                      <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base pr-4">
                        {faq.question}
                      </span>
                      <span className={`text-gray-400 shrink-0 transition-transform duration-200 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </span>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaqIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="px-5 pb-4 sm:px-6 sm:pb-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed pt-1">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
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

      {/* Facilities Modal */}
      {showFacilitiesModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden border border-gray-200 dark:border-slate-800 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 sm:px-6 border-b border-gray-100 dark:border-slate-800 shrink-0">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">All Facilities</h2>
              <button 
                onClick={() => setShowFacilitiesModal(false)}
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 sm:px-6 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pb-6">
                {allFacilities.map((facility, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-[#2563eb] dark:text-blue-400">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={facility.icon} />
                        </svg>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{facility.category}</h3>
                    </div>
                    <ul className="grid grid-cols-1 gap-y-1.5 text-sm text-gray-600 dark:text-gray-400 ml-[38px]">
                      {facility.items.slice(0, 5).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-tight">
                          <span className="text-[#2563eb] dark:text-blue-400 mt-[3px] shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                      {facility.items.length > 5 && (
                        <li className="flex items-start gap-1.5 leading-tight text-xs text-gray-400 italic mt-0.5">
                          <span className="text-gray-300 dark:text-slate-600 mt-[3px] shrink-0">•</span>
                          <span>+ {facility.items.length - 5} more options</span>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}