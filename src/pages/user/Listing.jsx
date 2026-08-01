import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../laybouts/Userlayout';

export default function Listing({ onlyShowFavorites = false }) {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeImageIndices, setActiveImageIndices] = useState({});
  const [activeToggle, setActiveToggle] = useState('general');
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('smartstay_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

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

  const handleNextImage = (e, hotelId, imagesLength) => {
    e.stopPropagation();
    setActiveImageIndices(prev => {
      const curr = prev[hotelId] || 0;
      return { ...prev, [hotelId]: (curr + 1) % imagesLength };
    });
  };

  const handlePrevImage = (e, hotelId, imagesLength) => {
    e.stopPropagation();
    setActiveImageIndices(prev => {
      const curr = prev[hotelId] || 0;
      return { ...prev, [hotelId]: (curr - 1 + imagesLength) % imagesLength };
    });
  };

  // Helper function to render SVG icons for amenities
  const renderAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'WiFi':
        return (
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a9.5 9.5 0 0114.142 0M6.228 6.228a14.5 14.5 0 0120.544 0" />
          </svg>
        );
      case 'Parking':
        return (
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      case 'AC':
        return (
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        );
      case 'Pool':
        return (
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 3.75h16.5m-16.5 3.75h16.5" />
          </svg>
        );
      case 'Spa':
        return (
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
          </svg>
        );
      case 'Gym':
        return (
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-10.5m-10.5 0l10.5 10.5" />
          </svg>
        );
      case 'Bar':
        return (
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Shared filter content used in both sidebar and mobile drawer
  const filterContent = (
    <>
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

        {/* Section Header with Filter Button on Mobile */}
        <div className="sticky-nav-offset lg:relative lg:top-0 bg-white dark:bg-slate-950 z-30 py-4 mb-6 flex flex-wrap gap-3 justify-between items-center text-left border-b border-gray-100 dark:border-slate-800 lg:border-none -mx-2 px-4 sm:mx-0 sm:px-0">
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

        <div className="flex flex-col lg:flex-row gap-6 text-left">

          {/* Desktop Sidebar Filter (Hidden on mobile) */}
          {!onlyShowFavorites && (
            <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-24 self-start">
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
            {displayedHotels.map((hotel, index) => {
              const activeImageIndex = activeImageIndices[hotel.id] || 0;
              const score10 = parseFloat(hotel.ratingScore) <= 5 ? parseFloat(hotel.ratingScore) * 2 : parseFloat(hotel.ratingScore);
              const rawLoc = parseFloat(hotel.locationScore);
              const location10 = rawLoc <= 5 ? rawLoc * 2 : (rawLoc || 8.0);
              return (
                <div
                  key={hotel.id}
                  onClick={() => navigate(`/hotel/${hotel.id}`)}
                  className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200/80 dark:border-slate-800 relative flex flex-row font-sans min-h-[140px] sm:min-h-[220px] cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:border-[#2563eb]/40 transition-all duration-300 ease-out overflow-hidden"
                >

                  <div className="flex flex-row h-full w-full">

                    {/* Left: Hotel Image Carousel */}
                    <div className="relative w-[115px] sm:w-[220px] md:w-[250px] flex-shrink-0 min-h-full group cursor-pointer overflow-hidden bg-gray-100 dark:bg-slate-800">

                      {/* Sliding Image Track */}
                      <div
                        className="flex h-full w-full transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                      >
                        {hotel.images.map((imgUrl, idx) => (
                          <div key={idx} className="w-full h-full flex-shrink-0">
                            <img
                              alt={`${hotel.name} ${idx + 1}`}
                              className="w-full h-full object-cover select-none"
                              src={imgUrl}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Award Badge */}
                      {hotel.awardBadge && (
                        <div className="absolute top-2 left-2 bg-[#2563eb] text-white text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md border border-white/20">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {hotel.awardBadge}
                        </div>
                      )}

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(e, hotel.id)}
                        className={`absolute bottom-2 right-2 sm:bottom-auto sm:top-2 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs rounded-full flex items-center justify-center shadow-md transition-colors z-10 cursor-pointer ${
                          favorites.includes(hotel.id) ? 'text-red-500 scale-105' : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill={favorites.includes(hotel.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>

                      {/* Carousel Arrow Left */}
                      <div className="absolute inset-y-0 left-2 hidden sm:flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => handlePrevImage(e, hotel.id, hotel.images.length)}
                          className="w-7 h-7 bg-white/90 dark:bg-slate-900/90 hover:bg-white rounded-full flex items-center justify-center shadow-md text-gray-700 dark:text-gray-200 cursor-pointer"
                          type="button"
                          aria-label="Previous Image"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                      </div>

                      {/* Carousel Arrow Right */}
                      <div className="absolute inset-y-0 right-2 hidden sm:flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => handleNextImage(e, hotel.id, hotel.images.length)}
                          className="w-7 h-7 bg-white/90 dark:bg-slate-900/90 hover:bg-white rounded-full flex items-center justify-center shadow-md text-gray-700 dark:text-gray-200 cursor-pointer"
                          type="button"
                          aria-label="Next Image"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </div>

                      {/* Image Count Pill */}
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide">
                        {activeImageIndex + 1}/{hotel.images.length}
                      </div>
                    </div>

                    {/* Middle & Right Content Wrapper */}
                    <div className="flex-grow flex flex-row p-3 sm:p-4 gap-3 h-full min-w-0">

                      {/* Middle Info */}
                      <div className="flex-grow min-w-0 flex flex-col justify-between">
                        <div>
                          {/* Title & Mobile Rating */}
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-xs sm:text-base md:text-lg font-bold text-gray-900 dark:text-white leading-snug cursor-pointer hover:text-[#2563eb] transition-colors line-clamp-1 sm:line-clamp-2">
                              {hotel.name}
                            </h3>

                            <div className="sm:hidden flex items-center gap-0.5 bg-blue-50 dark:bg-blue-950/60 text-[#2563eb] dark:text-blue-400 px-1.5 py-0.5 rounded-md shrink-0">
                              <span className="font-extrabold text-[10px]">{hotel.ratingScore}</span>
                              <span className="text-[9px] font-bold">★</span>
                            </div>
                          </div>

                          {/* Stars & Reviews */}
                          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                            <div className="flex text-amber-400 shrink-0">
                              {[...Array(hotel.stars)].map((_, i) => (
                                <svg key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs font-medium truncate">
                              ({hotel.reviews})
                            </span>
                          </div>

                          {/* Location Data */}
                          <div className="flex items-start gap-1 mb-2 text-[10px] sm:text-xs min-w-0">
                            <svg className="w-3.5 h-3.5 text-[#2563eb] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <div className="leading-tight min-w-0 flex-grow">
                              <div className="text-[#2563eb] dark:text-blue-400 font-semibold hover:underline cursor-pointer truncate">
                                {hotel.location}
                              </div>
                              <div className="text-gray-400 dark:text-gray-500 text-[9px] sm:text-[11px] truncate mt-0.5">
                                {hotel.subLocation}
                              </div>
                            </div>
                          </div>

                          {/* Amenities Chips */}
                          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 text-[9px] sm:text-[11px] text-gray-600 dark:text-gray-300">
                            {hotel.amenities.map((amenity) => (
                              <div key={amenity} className="flex items-center gap-1 bg-gray-50 dark:bg-slate-800 px-1.5 py-0.5 rounded-md border border-gray-150 dark:border-slate-700">
                                {renderAmenityIcon(amenity)}
                                <span>{amenity}</span>
                              </div>
                            ))}
                          </div>

                          {/* Description Features */}
                          <div className="hidden sm:block mt-1 space-y-1">
                            {hotel.features.map((feat, idx) => (
                              <div key={idx} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-gray-300 leading-snug">
                                <span className="text-[#2563eb] mt-0.5 text-[10px]">✦</span>
                                {feat}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Promo Tags */}
                        <div className="hidden sm:flex flex-wrap gap-1.5 mt-2">
                          {hotel.promoTags.map((tag, idx) => (
                            <span key={idx} className="bg-blue-50 dark:bg-blue-950/60 text-[#2563eb] dark:text-blue-400 text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md font-semibold">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Rating & Pricing (Desktop) */}
                      <div className="hidden sm:flex w-[160px] md:w-[180px] flex-col justify-between items-end border-l border-gray-100 dark:border-slate-800 pl-3 sm:pl-4 text-right shrink-0">

                        {/* Ratings */}
                        <div className="flex flex-col items-end w-full">
                          <div className="flex items-center justify-end gap-2 mb-0.5">
                            <span className="text-[#2563eb] dark:text-blue-400 font-bold text-sm sm:text-base">{hotel.ratingText}</span>
                            <span className="bg-[#2563eb] text-white font-extrabold text-xs px-2 py-1 rounded-lg shadow-xs">{hotel.ratingScore}</span>
                          </div>
                          <div className="text-gray-400 dark:text-gray-500 text-[11px]">{hotel.reviews}</div>
                          <div className="text-slate-800 dark:text-slate-200 font-semibold text-xs mt-1">{hotel.locationScore}</div>
                        </div>

                        {/* Pricing */}
                        <div className="flex flex-col items-end w-full mt-3">
                          <div className="text-gray-400 text-[10px] mb-0.5">{hotel.pricingLabel}</div>
                          <div className="flex items-center justify-end gap-1.5">
                            <span className="text-gray-400 line-through text-xs">{hotel.oldPrice}</span>
                            <span className="text-rose-600 font-bold text-xs">{hotel.discount}</span>
                          </div>
                          <div className="text-[#2563eb] dark:text-blue-400 text-xl sm:text-2xl font-extrabold leading-none mt-1">
                            {hotel.price}
                          </div>
                          <div className="text-gray-400 text-[10px] mt-1">
                            + taxes & fees
                          </div>

                          <button
                            type="button"
                            className="mt-3 w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-xl transition-colors shadow-xs"
                          >
                            View Deal
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </UserLayout>
  );
}
