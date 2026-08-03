import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function Card({ hotel, favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((curr) => (curr + 1) % hotel.images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((curr) => (curr - 1 + hotel.images.length) % hotel.images.length);
  };

  return (
    <div
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
              onClick={handlePrevImage}
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
              onClick={handleNextImage}
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
              {/* Property Type */}
              <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                {hotel.propertyType || 'Hotel'}
              </p>

              {/* Title & Mobile Rating */}
              <div className="flex items-start justify-between gap-2 mb-1 min-w-0 w-full">
                <h3 className="flex-1 min-w-0 text-xs sm:text-base md:text-lg font-bold text-gray-900 dark:text-white leading-snug cursor-pointer hover:text-[#2563eb] transition-colors line-clamp-1 sm:line-clamp-2">
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
                {hotel.amenities.map((amenity, i) => {
                  const isMobileHidden = i >= 3;
                  return (
                    <div key={amenity} className={`flex items-center gap-0.5 sm:gap-1 bg-gray-50 dark:bg-slate-800 px-1 sm:px-1.5 py-0.5 rounded-md border border-gray-150 dark:border-slate-700 ${isMobileHidden ? 'hidden sm:flex' : 'flex'}`}>
                      {renderAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  );
                })}
                {hotel.amenities.length > 3 && (
                  <div className="sm:hidden flex items-center justify-center bg-gray-50 dark:bg-slate-800 px-1.5 py-0.5 rounded-md border border-gray-150 dark:border-slate-700 font-semibold text-[9px] text-gray-500 dark:text-gray-400">
                    +{hotel.amenities.length - 3} more
                  </div>
                )}
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

            {/* Mobile Pricing & CTA Bar - shows only on mobile */}
            <div className="sm:hidden mt-1 pt-1.5 border-t border-gray-100 dark:border-slate-800 flex items-end justify-between gap-2">
              <div className="min-w-0 flex flex-col items-start">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-gray-400 line-through text-[9px]">{hotel.oldPrice}</span>
                  <span className="text-rose-600 font-bold text-[9px]">{hotel.discount}</span>
                </div>
                <div className="text-[#2563eb] dark:text-blue-400 text-base sm:text-lg font-extrabold leading-tight">
                  {hotel.price}
                </div>
                <span className="text-gray-400 text-[8px]">+ taxes & fees</span>
              </div>
              <button
                type="button"
                className="shrink-0 bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg transition-colors shadow-xs"
              >
                View Deal
              </button>
            </div>

            {/* Promo Tags - desktop only */}
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
}
