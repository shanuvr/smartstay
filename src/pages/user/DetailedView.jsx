import React, { useState } from 'react';
import UserLayout from '../../laybouts/Userlayout';

const galleryImages = [
  {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20upscale%20Novotel-style%20hotel%20convention%20center%20exterior%20with%20beautifully%20landscaped%20gardens%2C%20palm%20trees%2C%20sparkling%20pool%2C%20warm%20sunset%20light%2C%20luxury%20resort%20photography%2C%20wide%20angle&image_size=landscape_16_9",
    alt: "Novotel Hyderabad Convention Centre Exterior"
  },
  {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Luxury%20executive%20suite%20hotel%20bedroom%2C%20plush%20king%20bed%20with%20white%20linens%2C%20floor%20to%20ceiling%20window%20with%20city%20view%2C%20dark%20wood%20furniture%2C%20warm%20accent%20lighting%2C%20elegant%20modern%20design&image_size=landscape_4_3",
    alt: "Executive Suite Bedroom"
  },
  {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Resort%20style%20outdoor%20swimming%20pool%20close%20up%2C%20tropical%20palm%20trees%2C%20white%20lounge%20chairs%2C%20crystal%20clear%20turquoise%20water%2C%20lush%20green%20garden%2C%20sunny%20day%20hotel%20photography&image_size=landscape_4_3",
    alt: "Outdoor Pool Close-up"
  },
  {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20upscale%20hotel%20lobby%20lounge%2C%20contemporary%20furniture%2C%20warm%20ambient%20lighting%2C%20marble%20floor%2C%20reception%20area%20in%20background%2C%20sophisticated%20interior%20design&image_size=landscape_4_3",
    alt: "Modern Lobby Lounge"
  },
  {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Fine%20dining%20hotel%20restaurant%20interior%2C%20elegant%20tables%20with%20white%20tablecloths%2C%20wine%20glasses%2C%20warm%20chandelier%20lighting%2C%20luxurious%20ambiance%2C%20empty%20restaurant%20photography&image_size=landscape_4_3",
    alt: "Fine Dining Restaurant Interior"
  },
  {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20serviced%20apartment%20hotel%20kitchenette%2C%20stainless%20steel%20appliances%2C%20wood%20cabinets%2C%20granite%20countertop%2C%20breakfast%20bar%2C%20minimalist%20bright%20interior%2C%20clean%20design&image_size=landscape_4_3",
    alt: "Serviced Apartment Kitchen"
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

  return (
    <UserLayout>
      <section className="max-w-[1320px] mx-auto px-3 sm:px-6 pt-24 sm:pt-28 pb-16">

        {/* Header: Title + Ratings */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2">
                Novotel Hyderabad Airport
              </h1>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                <div className="flex text-amber-400">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[#2563eb] font-semibold hover:underline cursor-pointer">
                  Shamshabad, Rajiv Gandhi Int'l Airport, Hyderabad
                </span>
                <span className="text-gray-300 dark:text-slate-700">•</span>
                <span>Free 24/7 Airport Shuttle • 5 mins from terminal</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-3 py-2 shadow-sm cursor-pointer hover:bg-gray-50">
                <svg className="w-4.5 h-4.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">Share</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-3 py-2 shadow-sm cursor-pointer hover:bg-gray-50">
                <svg className="w-4.5 h-4.5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">Save</span>
              </div>
            </div>
          </div>

          {/* Rating summary row - compact single-line layout */}
          <div className="mt-3 flex items-center gap-1 sm:gap-2 flex-wrap text-[11px] sm:text-xs">

            {/* Star rating: 4 filled + 1 empty */}
            <div className="flex items-center gap-0.5 text-amber-500">
              {[0,1,2,3].map((i) => (
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

            {/* Separator */}
            <span className="text-gray-300 dark:text-slate-600 font-light text-sm sm:text-base leading-none mx-0.5">|</span>

            {/* Orange pill + Excellent + reviews count */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="inline-flex items-center justify-center bg-orange-500 text-white font-extrabold text-[11px] sm:text-sm leading-none px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg shadow-sm">
                4.5
              </span>
              <span className="font-extrabold text-gray-900 dark:text-white text-sm sm:text-[15px] leading-none tracking-tight">
                Excellent
              </span>
              <span className="text-gray-400 dark:text-slate-500 font-medium text-[11px] sm:text-xs leading-none">
                (6,150 reviews)
              </span>
            </div>

            {/* Separator */}
            <span className="hidden sm:inline text-gray-300 dark:text-slate-600 font-light text-sm sm:text-base leading-none mx-0.5">|</span>

            {/* Location score */}
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="text-gray-400 dark:text-slate-500 font-medium text-[11px] sm:text-xs leading-none">
                Location score
              </span>
              <span className="font-extrabold text-gray-900 dark:text-white text-sm sm:text-base leading-none">
                4.7
              </span>
            </div>

          </div>

          {/* Sub info: "booked in last 24 hours" line moved below as subtle secondary row */}
          <div className="hidden sm:flex items-center gap-1 mt-1.5 text-[11px] text-green-600 dark:text-green-500 font-semibold">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            10+ booked in last 24 hours
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-8">

          {/* Mobile fallback: single hero image (grid hidden on mobile) */}
          <div className="md:hidden relative overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-200 dark:border-slate-800 dark:bg-slate-800 h-[230px]">
            <img
              alt={galleryImages[0].alt}
              className="w-full h-full object-cover"
              src={galleryImages[0].src}
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex(0);
                }}
                className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-blue-600 text-[11px] font-bold shadow-lg hover:bg-white transition-all cursor-pointer border border-gray-100"
              >
                <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812-1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                See all photos
              </button>
            </div>
          </div>

          {/* Desktop 12-col grid gallery as per provided reference */}
          <div className="hidden md:grid md:grid-cols-12 gap-3 h-[350px] relative z-20">

            {/* Column 1: Large Featured Image (approx 45% width) */}
            <div
              onClick={() => setActivePhotoIndex(0)}
              className="col-span-1 md:col-span-6 relative group overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-200 dark:border-slate-700 dark:bg-slate-800 h-full cursor-pointer"
            >
              <img
                alt={galleryImages[0].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={galleryImages[0].src}
              />
              {/* Centered See all photos button at the bottom */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex(0);
                  }}
                  className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full text-blue-600 text-xs font-bold shadow-lg hover:bg-white transition-all cursor-pointer border border-gray-100"
                >
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812-1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  See all photos
                </button>
              </div>
            </div>

            {/* Right 3 columns of smaller images */}
            <div className="hidden md:grid col-span-6 grid-cols-3 gap-3 h-full">

              {/* Column 2: 2 stacked images */}
              <div className="grid grid-rows-2 gap-3 h-full">
                <div
                  onClick={() => setActivePhotoIndex(1)}
                  className="relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 dark:border-slate-700 dark:bg-slate-800 h-full group cursor-pointer"
                >
                  <img
                    alt={galleryImages[1].alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={galleryImages[1].src}
                  />
                </div>
                <div
                  onClick={() => setActivePhotoIndex(1)}
                  className="relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 dark:border-slate-700 dark:bg-slate-800 h-full group cursor-pointer"
                >
                  <img
                    alt="Sitting Area"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={galleryImages[1].src}
                  />
                </div>
              </div>

              {/* Column 3: 2 stacked images */}
              <div className="grid grid-rows-2 gap-3 h-full">
                <div
                  onClick={() => setActivePhotoIndex(2)}
                  className="relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 dark:border-slate-700 dark:bg-slate-800 h-full group cursor-pointer"
                >
                  <img
                    alt={galleryImages[2].alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={galleryImages[2].src}
                  />
                </div>
                <div
                  onClick={() => setActivePhotoIndex(3)}
                  className="relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 dark:border-slate-700 dark:bg-slate-800 h-full group cursor-pointer"
                >
                  <img
                    alt={galleryImages[3].alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={galleryImages[3]?.src}
                  />
                </div>
              </div>

              {/* Column 4: 2 stacked images */}
              <div className="grid grid-rows-2 gap-3 h-full">
                <div
                  onClick={() => setActivePhotoIndex(4)}
                  className="relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 dark:border-slate-700 dark:bg-slate-800 h-full group cursor-pointer"
                >
                  <img
                    alt={galleryImages[4].alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={galleryImages[4].src}
                  />
                </div>
                <div
                  onClick={() => setActivePhotoIndex(5)}
                  className="relative overflow-hidden rounded-xl bg-gray-100 border border-gray-200 dark:border-slate-700 dark:bg-slate-800 h-full group cursor-pointer"
                >
                  <img
                    alt={galleryImages[5].alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={galleryImages[5].src}
                  />
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>
    </UserLayout>
  );
}
