import React, { useState } from 'react';
import UserLayout from '../../laybouts/Userlayout';
import Card from '../../components/user/Card';

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export default function Listing({ onlyShowFavorites = false }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeToggle, setActiveToggle] = useState('general');
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('smartstay_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [minBudget, setMinBudget] = useState(700);
  const [maxBudget, setMaxBudget] = useState(9000);
  const [destination, setDestination] = useState('Hyderabad');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
  const [showOccupancy, setShowOccupancy] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [withPets, setWithPets] = useState(false);

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

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut('');
    } else {
      const checkInDate = new Date(checkIn);
      const selectedDate = new Date(dateStr);
      if (selectedDate < checkInDate) {
        setCheckIn(dateStr);
      } else {
        setCheckOut(dateStr);
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

      const isCheckIn = checkIn === cellDateStr;
      const isCheckOut = checkOut === cellDateStr;
      const isInRange = checkIn && checkOut && cellDate > new Date(checkIn) && cellDate < new Date(checkOut);

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

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('smartstay_favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('favorites-update'));
  };

  const hotels = [
    {
      id: 1,
      name: "Taj Falaknuma Palace - Hyderabad",
      stars: 5,
      location: "Engine Bowli, Falaknuma, Hyderabad",
      subLocation: "5 km from Charminar • 15 km from Rajiv Gandhi Int'l Airport",
      badges: [
        { text: "Luxury Heritage", type: "pink-outline", icon: "diamond" },
        { text: "Top Rated", type: "outline" }
      ],
      features: [
        "Royal palace experience with personal butler service",
        "Authentic Nizam dining and panoramic city views"
      ],
      promoTags: ["Free Breakfast Included", "Pay at Hotel"],
      ratingScore: "4.9",
      ratingText: "Exceptional",
      reviews: "3,820 reviews",
      locationScore: "4.9 Location score",
      pricingLabel: "Per night for 2 guests",
      oldPrice: "Rs. 32,000",
      discount: "-20%",
      price: "Rs. 25,600",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"
      ],
      amenities: ["WiFi", "Parking", "AC", "Pool", "Spa", "Bar"],
      awardBadge: "Nizam Choice"
    },
    {
      id: 2,
      name: "ITC Kohenur, A Luxury Collection Hotel",
      stars: 5,
      location: "HITEC City, Hyderabad",
      subLocation: "Overlooking Durgam Cheruvu Lake • 800 m from Mindspace IT Park",
      badges: [
        { text: "Booked 32 times today", type: "red-text" }
      ],
      features: [
        "Stunning lake views with rooftop lounge & infinity pool",
        "Kaya Kalp Spa & award-winning Indian specialty restaurants"
      ],
      promoTags: ["Special Package Available", "Free Cancellation"],
      ratingScore: "4.8",
      ratingText: "Superb",
      reviews: "5,410 reviews",
      locationScore: "4.8 Location score",
      pricingLabel: "Per night for 2 guests",
      oldPrice: "Rs. 18,000",
      discount: "-15%",
      price: "Rs. 15,300",
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800"
      ],
      amenities: ["WiFi", "Parking", "AC", "Pool", "Gym", "Bar"],
      awardBadge: "Best Luxury"
    },
    {
      id: 3,
      name: "Park Hyatt Hyderabad - Banjara Hills",
      stars: 5,
      location: "Banjara Hills, Road No. 2, Hyderabad",
      subLocation: "Near KBR Park • 10 mins from Jubilee Hills nightlife",
      badges: [
        { text: "Prime Location", type: "outline" }
      ],
      features: [
        "Spacious rooms with floor-to-ceiling windows & marble baths",
        "Temperature-controlled outdoor pool & world-class dining"
      ],
      promoTags: ["Free Cancellation on most stays"],
      ratingScore: "4.7",
      ratingText: "Superb",
      reviews: "4,290 reviews",
      locationScore: "4.9 Location score",
      pricingLabel: "Per night for 2 guests",
      oldPrice: "Rs. 14,500",
      discount: "-18%",
      price: "Rs. 11,890",
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800"
      ],
      amenities: ["WiFi", "Parking", "AC", "Pool", "Spa", "Breakfast"],
      awardBadge: "Banjara Choice"
    },
    {
      id: 4,
      name: "Novotel Hyderabad Airport",
      stars: 4,
      location: "Shamshabad, Rajiv Gandhi Int'l Airport",
      subLocation: "Free 24/7 Airport Shuttle • 5 mins from terminal",
      badges: [
        { text: "Airport Hotel", type: "pink-outline", icon: "diamond" }
      ],
      features: [
        "Sprawling green resort setting near airport with sport courts",
        "24-hour room service & sports lounge"
      ],
      promoTags: ["Airport Shuttle Included"],
      ratingScore: "4.5",
      ratingText: "Excellent",
      reviews: "6,150 reviews",
      locationScore: "4.7 Location score",
      pricingLabel: "Per night for 2 guests",
      oldPrice: "Rs. 9,500",
      discount: "-21%",
      price: "Rs. 7,505",
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800"
      ],
      amenities: ["WiFi", "Parking", "AC", "Pool", "Gym"],
      awardBadge: "Transit Choice"
    },
    {
      id: 5,
      name: "Radisson Blu Plaza Hotel - Banjara Hills",
      stars: 4,
      location: "Banjara Hills, Hyderabad",
      subLocation: "1.2 km from City Center Mall • Near GVK One Mall",
      badges: [
        { text: "Popular Choice", type: "outline" }
      ],
      features: [
        "Modern contemporary rooms with Asian & Mediterranean cuisine",
        "Outdoor swimming pool and soothing wellness spa"
      ],
      promoTags: ["Includes Free Breakfast"],
      ratingScore: "4.4",
      ratingText: "Very Good",
      reviews: "3,110 reviews",
      locationScore: "4.6 Location score",
      pricingLabel: "Per night for 2 guests",
      oldPrice: "Rs. 8,000",
      discount: "-25%",
      price: "Rs. 6,000",
      images: [
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800"
      ],
      amenities: ["WiFi", "Parking", "AC", "Pool", "Breakfast"],
      awardBadge: "Value Choice"
    }
  ];

  const displayedHotels = onlyShowFavorites
    ? hotels.filter(r => favorites.includes(r.id))
    : hotels;

  const histogramBars = [12, 28, 42, 58, 78, 65, 45, 72, 88, 68, 52, 38, 28, 18, 32, 58, 82, 70, 52, 32, 22, 38, 62, 48, 28, 18, 28, 42, 58, 68, 78, 52, 32, 22, 32, 52, 72, 85, 62, 38, 28, 18, 12, 22, 38, 48, 38, 28, 18, 8, 12, 18, 28, 32, 28, 22, 18, 12, 8, 18, 32, 48, 62, 52, 32, 18, 12, 22, 38, 52, 42, 28, 18, 8, 5, 12, 22, 32, 28, 18, 12, 8];

  // Shared filter content used in both sidebar and mobile drawer
  const filterContent = (
    <>
      {/* Budget */}
      <div className="mb-3 pb-3 border-b border-gray-100 dark:border-slate-800">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Your budget (per night)</h3>
        <div className="text-[13px] text-[#003B95] dark:text-blue-400 font-semibold mb-2">
          ₹ {minBudget.toLocaleString('en-IN')} – ₹ {maxBudget.toLocaleString('en-IN')}+
        </div>

        {/* Histogram */}
        <div className="flex items-end gap-[1.5px] h-10 mb-2 w-full justify-between">
          {histogramBars.map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gray-200 dark:bg-slate-700 rounded-t-sm min-w-0"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Dual Range Slider */}
        <div className="relative h-1 w-full">
          <div className="absolute h-1 w-full bg-gray-200 dark:bg-slate-700 rounded-full" />
          <div
            className="absolute h-1 bg-[#2563eb] rounded-full"
            style={{
              left: `${((minBudget - 700) / (30000 - 700)) * 100}%`,
              right: `${100 - ((maxBudget - 700) / (30000 - 700)) * 100}%`,
            }}
          />
          <input
            type="range"
            min={700}
            max={30000}
            step={100}
            value={minBudget}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              setMinBudget(Math.min(v, maxBudget - 100));
            }}
            className="absolute top-1/2 -translate-y-1/2 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2563eb] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#2563eb] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:cursor-pointer"
          />
          <input
            type="range"
            min={700}
            max={30000}
            step={100}
            value={maxBudget}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              setMaxBudget(Math.max(v, minBudget + 100));
            }}
            className="absolute top-1/2 -translate-y-1/2 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2563eb] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#2563eb] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Guest Rating</h4>
        <div className="space-y-1">
          {["4.5+ Exceptional", "4.0+ Superb", "3.5+ Very Good", "3.0+ Good"].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer group">
              <input className="w-3.5 h-3.5 rounded border-gray-300 text-[#2563eb] focus:ring-[#2563eb] accent-[#2563eb] cursor-pointer" type="checkbox" />
              <span className="text-[13px] text-gray-600 group-hover:text-gray-900 flex items-center gap-1">
                <svg className="w-3 h-3 text-amber-400 group-hover:text-[#2563eb] transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {rating}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Star Class */}
      <div className="mb-4">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Property Class</h4>
        <div className="space-y-1">
          {["5 Star Luxury", "4 Star Deluxe", "3 Star Premium"].map((star) => (
            <label key={star} className="flex items-center gap-2 cursor-pointer group">
              <input className="w-3.5 h-3.5 rounded border-gray-300 text-[#2563eb] focus:ring-[#2563eb] accent-[#2563eb] cursor-pointer" type="checkbox" />
              <span className="text-[13px] text-gray-600 group-hover:text-gray-900">{star}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Amenities</h4>
        <div className="space-y-1">
          {["Swimming Pool", "Free WiFi", "Free Parking", "Spa & Wellness", "Airport Shuttle", "Bar & Lounge"].map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer group">
              <input className="w-3.5 h-3.5 rounded border-gray-300 text-[#2563eb] focus:ring-[#2563eb] accent-[#2563eb] cursor-pointer" type="checkbox" />
              <span className="text-[13px] text-gray-600 group-hover:text-gray-900">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <UserLayout>
      <section className="max-w-[1320px] mx-auto px-3 sm:px-6 pt-24 sm:pt-28 pb-16">

        {/* Search Bar Widget (from Home) */}
        <div className="mb-8 relative">

          {/* Backdrop overlay to close calendar or occupancy popover on click-outside */}
          {(showCalendar || showOccupancy) && (
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => {
                setShowCalendar(false);
                setShowOccupancy(false);
              }}
            />
          )}

          {/* Outer Responsive Container */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl lg:rounded-full shadow-lg border border-gray-200/60 dark:border-slate-800 p-2 sm:p-2.5 flex flex-col lg:flex-row items-stretch lg:items-center relative z-40">

            {/* Where are you going? */}
            <div className="lg:flex-[1.4] flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-slate-700">
              <svg className="w-4.5 h-4.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <div className="flex-grow min-w-0">
                <label className="block text-[11px] font-bold text-gray-900 dark:text-white cursor-pointer leading-tight">Where are you going?</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="City, hotel or destination"
                  className="w-full text-xs text-gray-600 dark:text-gray-200 font-medium placeholder-gray-400 focus:outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Check-in & Check-out Container */}
            <div className="lg:flex-[2.1] grid grid-cols-2 lg:flex lg:flex-row border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-slate-700 divide-x divide-gray-200 dark:divide-slate-700">

              {/* Check-in */}
              <div
                className="lg:flex-1 flex items-center gap-2 px-3 sm:px-3.5 py-2.5 cursor-pointer select-none"
                onClick={() => {
                  setShowCalendar(!showCalendar);
                  setShowOccupancy(false);
                }}
              >
                <svg className="w-4.5 h-4.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <div className="flex-grow min-w-0">
                  <label className="block text-[11px] font-bold text-gray-900 dark:text-white cursor-pointer leading-tight">Check-in</label>
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium block truncate">
                    {checkIn ? formatDateDisplay(checkIn) : 'Add dates'}
                  </span>
                </div>
              </div>

              {/* Check-out */}
              <div
                className="lg:flex-1 flex items-center gap-2 px-3 sm:px-3.5 py-2.5 cursor-pointer select-none"
                onClick={() => {
                  setShowCalendar(!showCalendar);
                  setShowOccupancy(false);
                }}
              >
                <svg className="w-4.5 h-4.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <div className="flex-grow min-w-0">
                  <label className="block text-[11px] font-bold text-gray-900 dark:text-white cursor-pointer leading-tight">Check-out</label>
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium block truncate">
                    {checkOut ? formatDateDisplay(checkOut) : 'Add dates'}
                  </span>
                </div>
              </div>

            </div>

            {/* Guests */}
            <div
              className="lg:flex-[0.75] flex items-center justify-between gap-2 px-3.5 py-2.5 cursor-pointer select-none border-b lg:border-b-0 border-gray-200 dark:border-slate-700"
              onClick={() => {
                setShowOccupancy(!showOccupancy);
                setShowCalendar(false);
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-4.5 h-4.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <div className="min-w-0">
                  <label className="block text-[11px] font-bold text-gray-900 dark:text-white cursor-pointer leading-tight">Guests</label>
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium block truncate">
                    {adults + children} Guests
                  </span>
                </div>
              </div>
              <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            {/* Search Button */}
            <button
              onClick={() => window.scrollTo({ top: document.getElementById('listing-results')?.offsetTop - 80 || 0, behavior: 'smooth' })}
              className="w-full lg:w-auto bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-7 py-3 rounded-xl lg:rounded-full transition-colors flex items-center justify-center gap-2 shadow-md flex-shrink-0 mt-2 lg:mt-0 cursor-pointer"
            >
              <svg className="w-4 h-4 lg:hidden" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span>Search</span>
            </button>

          </div>

          {/* Calendar Popover */}
          {showCalendar && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-10 lg:w-[580px] w-[94vw] max-w-[580px] mt-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3 sm:p-4 z-50">
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

          {/* Occupancy Popover */}
          {showOccupancy && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-10 w-[90vw] max-w-[280px] mt-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3.5 z-50">
              {/* Adults Counter */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-gray-800 dark:text-white text-xs">Adults</span>
                <div className="border border-gray-200 dark:border-slate-700 rounded-md py-1 px-2.5 flex items-center justify-between gap-3 w-[85px]">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className={`text-base font-normal select-none leading-none ${adults <= 1 ? 'text-gray-300 dark:text-slate-700 cursor-not-allowed' : 'text-[#2563eb] dark:text-blue-400 cursor-pointer'}`}
                    disabled={adults <= 1}
                  >
                    —
                  </button>
                  <span className="font-bold text-gray-800 dark:text-white text-xs">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
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
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className={`text-base font-normal select-none leading-none ${children <= 0 ? 'text-gray-300 dark:text-slate-700 cursor-not-allowed' : 'text-[#2563eb] dark:text-blue-400 cursor-pointer'}`}
                    disabled={children <= 0}
                  >
                    —
                  </button>
                  <span className="font-bold text-gray-800 dark:text-white text-xs">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren(children + 1)}
                    className="text-base font-normal text-[#2563eb] dark:text-blue-400 cursor-pointer select-none leading-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Travelling with pets? */}
              <div className="flex items-center justify-between py-2 border-t border-gray-150 dark:border-slate-800 mt-1">
                <span className="font-semibold text-gray-800 dark:text-white text-xs">Travelling with pets?</span>
                <button
                  type="button"
                  onClick={() => setWithPets(!withPets)}
                  className={`relative inline-flex h-4.5 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${withPets ? 'bg-[#2563eb]' : 'bg-gray-200 dark:bg-slate-700'}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${withPets ? 'translate-x-3.5' : 'translate-x-0'}`}
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

        </div>

        {/* Section Header with Filter Button on Mobile */}
        <div id="listing-results" className="sticky-nav-offset lg:relative lg:top-0 bg-white dark:bg-slate-950 z-30 py-4 mb-6 flex flex-wrap gap-3 justify-between items-center text-left border-b border-gray-100 dark:border-slate-800 lg:border-none">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {onlyShowFavorites ? "My Saved Hotels" : "Hotels & Resorts in Hyderabad"}
          </h2>

          {!onlyShowFavorites && (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-xs cursor-pointer"
                type="button"
              >
                <svg className="w-3.5 h-3.5 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
                Filters
              </button>
            </div>
          )}
        </div>

        {/* Mobile Filter Drawer */}
        <div
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${
            filterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setFilterOpen(false)}
        ></div>

        <div
          className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-900 z-50 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
            filterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
            <button
              onClick={() => setFilterOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-md cursor-pointer"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow px-5 py-5 overflow-y-auto">
            {filterContent}
          </div>

          <div className="flex-shrink-0 p-4 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-950 flex gap-3">
            <button
              onClick={() => setFilterOpen(false)}
              className="flex-1 py-2 border border-gray-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-gray-500 bg-white dark:bg-slate-900 transition-colors cursor-pointer"
              type="button"
            >
              Clear All
            </button>
            <button
              onClick={() => setFilterOpen(false)}
              className="flex-1 py-2 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
              type="button"
            >
              Apply Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 text-left w-full">

          {/* Desktop Sidebar Filter (Hidden on mobile) */}
          {!onlyShowFavorites && (
            <aside className="hidden lg:block w-60 flex-shrink-0 self-start">
              <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-5">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Filters</h3>
                  {filterContent}
                </div>
              </div>
            </aside>
          )}

          {/* Hotel Cards Area */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* High Demand Alert Banner */}
            {!onlyShowFavorites && (
              <div className="mb-2 w-full bg-[#fff7ed] dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 rounded-xl shadow-sm px-3 sm:px-4 py-2.5 sm:py-3 flex items-start gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-500 dark:bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-[15px] font-extrabold text-orange-600 dark:text-orange-400 mb-0.5 leading-snug">
                    Hurry! 44% of properties on our site are fully booked!
                  </h3>
                  <p className="text-[12px] sm:text-xs text-gray-700 dark:text-gray-300 leading-snug">
                    Rooms in {destination || 'Hyderabad'} are in high demand on your selected dates. Reserve yours now before prices go up.
                  </p>
                </div>
              </div>
            )}

            {displayedHotels.map((hotel) => (
              <Card
                key={hotel.id}
                hotel={hotel}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>

        </div>
      </section>
    </UserLayout>
  );
}
