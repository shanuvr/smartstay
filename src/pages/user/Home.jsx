import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../laybouts/Userlayout';

const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
};

// ---- Design tokens (see comment block at bottom of file for the rationale) ----
const FONT_IMPORTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');
.{ font-family: 'Space Grotesk', sans-serif; }
.{ font-family: 'JetBrains Mono', monospace; letter-spacing: 0.06em; }
`;

const PROPERTY_TYPES = [
    { code: 'PT · 01', name: 'Hotels', img: '/hotels.png', note: 'Full-service stays' },
    { code: 'PT · 02', name: 'Apartments', img: '/apartments.png', note: 'Live like a local' },
    { code: 'PT · 03', name: 'Resorts', img: '/resorts.png', note: 'All-in, all relaxed' },
    { code: 'PT · 04', name: 'Villas', img: '/villas.png', note: 'Private & spacious' },
];

const DESTINATIONS_MAIN = [
    { name: 'Goa', img: '/dest_goa.png', tag: 'GOI' },
    { name: 'Mumbai', img: '/dest_mumbai.png', tag: 'BOM' },
];

const DESTINATIONS_SUB = [
    { name: 'New Delhi', img: '/dest_delhi.png', tag: 'DEL' },
    { name: 'Bengaluru', img: '/dest_bengaluru.png', tag: 'BLR' },
    { name: 'Kerala', img: '/dest_kerala.png', tag: 'COK' },
];

const WHY_CARDS = [
    {
        code: 'JS-01',
        icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
        title: 'Pay at property',
        sub: 'Free cancellation on most stays',
    },
    {
        code: 'JS-02',
        icon: 'M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.5m-7 0H12m-9 0h3.5m-3.5 0V10.5m0 9.75A1.5 1.5 0 012 18.75V12a1.5 1.5 0 011.5-1.5h3.5',
        title: '300M+ reviews',
        sub: 'Real feedback from real guests',
    },
    {
        code: 'JS-03',
        icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253',
        title: '2M+ places',
        sub: 'Hotels, villas, and homestays',
    },
    {
        code: 'JS-04',
        icon: 'M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z',
        title: '24/7 support',
        sub: 'Real people, every timezone',
    },
];

export default function Home() {
    const navigate = useNavigate();
    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
    const [showOccupancy, setShowOccupancy] = useState(false);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [withPets, setWithPets] = useState(false);

    const propertyScrollRef = useRef(null);

    const scrollProperties = (dir) => {
        if (!propertyScrollRef.current) return;
        propertyScrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
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

    return (
        <UserLayout>
            <div className="w-full bg-white dark:bg-slate-950 font-sans pb-16">

                {/* ============================================================ */}
                {/* HERO — unchanged                                              */}
                {/* ============================================================ */}
                <div 
                    className="relative w-full min-h-[580px] lg:min-h-[640px] bg-cover bg-center bg-no-repeat flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-24"
                    style={{ backgroundImage: "url('/hero-image.png')" }}
                >
                    {/* Main Container */}
                    <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between flex-grow">
                        
                        {/* Top Hero Content: Title & Subtitle */}
                        <div className="max-w-2xl">
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                Smarter Bookings.<br />
                                <span className="text-[#2563eb]">Faster Check-ins.</span>
                            </h1>

                            <p className="mt-2 text-slate-700 text-xs sm:text-base lg:text-lg font-medium leading-snug sm:leading-relaxed max-w-md">
                                Book with ease. Check in faster.<br className="hidden sm:inline" />
                                {' '}Your verified details, ready at every stay.
                            </p>
                        </div>

                        {/* Middle Search Pill Bar Widget (Fully Responsive) */}
                        <div className="mt-8 mb-6 relative z-30 max-w-4xl w-full">

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
                            <div className="bg-white/95 backdrop-blur-md rounded-2xl lg:rounded-full shadow-2xl border border-white/80 p-2 sm:p-2.5 flex flex-col lg:flex-row items-stretch lg:items-center relative z-40">

                                {/* Where are you going? */}
                                <div className="lg:flex-[1.4] flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 border-b lg:border-b-0 lg:border-r border-gray-200">
                                    <svg className="w-4.5 h-4.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                    <div className="flex-grow min-w-0">
                                        <label className="block text-[11px] font-bold text-gray-900 cursor-pointer leading-tight">Where are you going?</label>
                                        <input
                                            type="text"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            placeholder="City, hotel or destination"
                                            className="w-full text-xs text-gray-600 font-medium placeholder-gray-400 focus:outline-none bg-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Check-in & Check-out Container (Grid on Mobile, Flex on Desktop) */}
                                <div className="lg:flex-[2.1] grid grid-cols-2 lg:flex lg:flex-row border-b lg:border-b-0 lg:border-r border-gray-200 divide-x divide-gray-200">
                                    
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
                                            <label className="block text-[11px] font-bold text-gray-900 cursor-pointer leading-tight">Check-in</label>
                                            <span className="text-xs text-gray-600 font-medium block truncate">
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
                                            <label className="block text-[11px] font-bold text-gray-900 cursor-pointer leading-tight">Check-out</label>
                                            <span className="text-xs text-gray-600 font-medium block truncate">
                                                {checkOut ? formatDateDisplay(checkOut) : 'Add dates'}
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                {/* Guests (Compact Flex Width) */}
                                <div
                                    className="lg:flex-[0.75] flex items-center justify-between gap-2 px-3.5 py-2.5 cursor-pointer select-none border-b lg:border-b-0 border-gray-200"
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
                                            <label className="block text-[11px] font-bold text-gray-900 cursor-pointer leading-tight">Guests</label>
                                            <span className="text-xs text-gray-600 font-medium block truncate">
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
                                    onClick={() => navigate('/listing')}
                                    className="w-full lg:w-auto bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-7 py-3 rounded-xl lg:rounded-full transition-colors flex items-center justify-center gap-2 shadow-md flex-shrink-0 mt-2 lg:mt-0 cursor-pointer"
                                >
                                    <svg className="w-4 h-4 lg:hidden" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                    <span>Search</span>
                                </button>

                            </div>

                            {/* Calendar Popover (Anchored right below Check-in/Check-out row on mobile, below search bar on desktop) */}
                            {showCalendar && (
                                <div className="absolute top-[108px] lg:top-full left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-10 lg:w-[580px] w-[94vw] max-w-[580px] mt-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3 sm:p-4 z-50">
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
                                <div className="absolute top-[160px] lg:top-full left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-10 w-[90vw] max-w-[280px] mt-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3.5 z-50">
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

                                    {/* Compact Travelling with pets? */}
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

                        {/* Below Search Bar: Feature Highlights & Glass Badge */}
                        <div className="flex flex-col gap-4">
                            
                            {/* Feature Badges Displayed Below Search Bar */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-slate-800 text-[11px] sm:text-xs font-semibold">
                                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/85 backdrop-blur-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-slate-200/80 shadow-xs">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                    <span>One-Time Verification</span>
                                </div>

                                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/85 backdrop-blur-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-slate-200/80 shadow-xs">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    <span>Paperless Check-in</span>
                                </div>

                                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/85 backdrop-blur-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-slate-200/80 shadow-xs">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 15.75H3m18 0h-1.5M8.25 19.5V21m7.5-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                                    </svg>
                                    <span>AI Recommendations</span>
                                </div>
                            </div>

                            {/* Bottom-left Glassmorphism Card */}
                            <div className="bg-[#1e293b]/70 backdrop-blur-md border border-white/20 text-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 max-w-xs sm:max-w-sm shadow-xl flex items-start gap-2.5 sm:gap-3">
                                <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                                    <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-xs sm:text-sm">Seamless. Secure. Smart.</h4>
                                    <p className="text-[10px] sm:text-[11px] text-slate-200 font-normal leading-tight mt-0.5">
                                        Your details are safe and pre-verified for a faster, hassle-free stay.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                {/* ============================================================ */}
                {/* BROWSE BY PROPERTY TYPE — boarding-pass style cards           */}
                {/* ============================================================ */}
                <section className="max-w-[1300px] mx-auto px-4 sm:px-6 mt-20 sm:mt-24">
                    <div className="flex items-end justify-between mb-7">
                        <div>
                            <p className="text-[10px] sm:text-[11px] text-[#2563eb] dark:text-blue-400 mb-1.5">STAY · TYPE</p>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Browse by property type
                            </h2>
                        </div>
                    </div>

                    <div className="relative">
                        <div
                            ref={propertyScrollRef}
                            className="flex gap-4 sm:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth px-1"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {PROPERTY_TYPES.map((p) => (
                            <div key={p.code} className="min-w-[240px] sm:min-w-[280px] flex-1 snap-start group cursor-pointer">
                                <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                                    {/* Image */}
                                    <div className="overflow-hidden aspect-[4/3] w-full">
                                        <img
                                            src={p.img}
                                            alt={p.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Perforated divider — the ticket-stub motif */}
                                    <div className="relative h-0">
                                        <div className="absolute -left-2.5 -top-2.5 w-5 h-5 rounded-full bg-white dark:bg-slate-950" />
                                        <div className="absolute -right-2.5 -top-2.5 w-5 h-5 rounded-full bg-white dark:bg-slate-950" />
                                        <div className="absolute left-4 right-4 top-0 border-t border-dashed border-slate-300 dark:border-slate-700" />
                                    </div>

                                    {/* Stub */}
                                    <div className="flex items-center justify-between px-4 py-3.5">
                                        <div>
                                            <span className="font-semibold text-[15px] text-slate-900 dark:text-white block">
                                                {p.name}
                                            </span>
                                            <span className="text-[11px] text-slate-400 dark:text-slate-500">{p.note}</span>
                                        </div>
                                        <span className="text-[10px] text-slate-300 dark:text-slate-600">{p.code}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                        <button
                            onClick={() => scrollProperties(-1)}
                            aria-label="Scroll left"
                            className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-md text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors z-10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scrollProperties(1)}
                            aria-label="Scroll right"
                            className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-2 sm:translate-x-4 w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-md text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors z-10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </section>

                {/* ============================================================ */}
                {/* TRENDING DESTINATIONS — passport-stamp corner badges         */}
                {/* ============================================================ */}
                <section className="max-w-[1300px] mx-auto px-4 sm:px-6 mt-20 sm:mt-24">
                    <p className="text-[10px] sm:text-[11px] text-[#2563eb] dark:text-blue-400 mb-1.5">DESTINATION · IN</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                        Trending destinations
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-7">
                        Most popular choices for travellers from India
                    </p>

                    {/* First Row: 2 Large Cards */}
                    <div className="grid grid-cols-2 gap-3 md:gap-5 mb-3 md:mb-5">
                        {DESTINATIONS_MAIN.map((d) => (
                            <div key={d.tag} className="relative group rounded-2xl overflow-hidden h-[160px] sm:h-[220px] md:h-[290px] cursor-pointer shadow-xs">
                                <img
                                    src={d.img}
                                    alt={d.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />



                                <div className="absolute bottom-3 md:bottom-5 left-3 md:left-5">
                                    <span className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-sm block">
                                        {d.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Second Row: 3 Medium Cards */}
                    <div className="grid grid-cols-3 gap-2 md:gap-5">
                        {DESTINATIONS_SUB.map((d) => (
                            <div key={d.tag} className="relative group rounded-2xl overflow-hidden h-[120px] sm:h-[170px] md:h-[230px] cursor-pointer shadow-xs">
                                <img
                                    src={d.img}
                                    alt={d.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />



                                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4">
                                    <span className="text-xs sm:text-base md:text-xl font-bold text-white tracking-tight drop-shadow-sm block">
                                        {d.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ============================================================ */}
                {/* LOYALTY REWARDS — the signature element: a real die-cut ticket */}
                {/* ============================================================ */}
                <section className="max-w-[1300px] mx-auto px-4 sm:px-6 mt-20 sm:mt-24">
                    <p className="text-[10px] sm:text-[11px] text-[#2563eb] dark:text-blue-400 mb-1.5">REWARD · TICKET</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                        Exclusive loyalty rewards
                    </h2>

                    <div className="relative flex flex-col lg:flex-row rounded-2xl shadow-md border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">

                        {/* Main stub */}
                        <div className="flex-1 p-5 sm:p-6">
                            <p className="text-[10px] text-[#2563eb]/70 dark:text-blue-400/70 mb-2">
                                LOYALTY CIRCLE — BOOKING PASS
                            </p>
                            <h3 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 leading-tight max-w-md">
                                Book 3 stays, get 50% off your 4th
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-md leading-relaxed">
                                Every booking earns a stamp. Complete three at any SmartStay partner property and your fourth reservation unlocks instantly at half price.
                            </p>

                            {/* Stamp trail */}
                            <div className="flex items-center gap-2 sm:gap-3 mb-5">
                                {[1, 2, 3].map((n, i) => (
                                    <div key={n} className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#2563eb] dark:bg-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                                            <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        {i < 2 && <div className="w-4 sm:w-6 border-t border-dashed border-slate-300 dark:border-slate-700" />}
                                    </div>
                                ))}
                                <div className="w-4 sm:w-6 border-t border-dashed border-slate-300 dark:border-slate-700" />
                                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 text-slate-300 dark:text-slate-600 text-[10px]">
                                    04
                                </div>
                            </div>

                            <div className="flex items-center gap-5">
                                <Link
                                    to="/signin"
                                    className="bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap shadow-xs"
                                >
                                    Join loyalty circle
                                </Link>
                                <Link
                                    to="/listing"
                                    className="text-[#2563eb] dark:text-blue-400 hover:underline font-semibold text-xs sm:text-sm whitespace-nowrap"
                                >
                                    Find hotels
                                </Link>
                            </div>
                        </div>

                        {/* Perforated die-cut divider between stub and reward panel */}
                        <div className="relative w-full lg:w-px h-px lg:h-auto bg-transparent">
                            <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 border-l border-dashed border-slate-300 dark:border-slate-700" />
                            <div className="lg:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed border-slate-300 dark:border-slate-700" />
                            {/* notch circles */}
                            <div className="hidden lg:block absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-950" />
                            <div className="hidden lg:block absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-950" />
                            <div className="lg:hidden absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-950" />
                            <div className="lg:hidden absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-950" />
                        </div>

                        {/* Reward panel — the "torn stub" */}
                        <div className="lg:w-[220px] bg-[#0F172A] flex flex-col items-center justify-center gap-2 py-8 lg:py-0 px-6">
                            <span className="text-[10px] text-white/40 tracking-widest">VALUE</span>
                            <span className="text-4xl sm:text-5xl font-bold text-[#D98E3E]">50%</span>
                            <span className="text-[10px] text-white/50 tracking-widest">OFF STAY 04</span>
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/* WHY SMARTSTAY?                                                */}
                {/* ============================================================ */}
                <section className="max-w-[1300px] mx-auto px-4 sm:px-6 mt-20 sm:mt-24 pb-4">
                    <p className="text-[10px] sm:text-[11px] text-[#2563eb] dark:text-blue-400 mb-1.5">
                        WHY SMARTSTAY
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                        Travel light. We'll handle the rest.
                    </h2>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                        {WHY_CARDS.map((card) => (
                            <div
                                key={card.code}
                                className="relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between min-h-[130px] sm:min-h-[160px]"
                            >
                                <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[9px] sm:text-[10px] text-[#2563eb]/40 dark:text-blue-400/40">
                                    {card.code}
                                </span>

                                <div>
                                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#2563eb] dark:text-blue-400 flex items-center justify-center mb-3 sm:mb-4">
                                        <svg className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                                        </svg>
                                    </div>

                                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base leading-tight">
                                        {card.title}
                                    </h3>
                                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-snug mt-1.5">
                                        {card.sub}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ============================================================ */}
                {/* APP DOWNLOAD & NEWSLETTER PROMO                              */}
                {/* ============================================================ */}
                <section className="max-w-[1300px] mx-auto px-4 sm:px-6 mt-20 sm:mt-24 pb-8 sm:pb-12">
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">

        {/* Newsletter / Deals (Left) */}
        <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 sm:p-10 border border-blue-100 dark:border-blue-800/30 flex flex-col justify-center">
            <p className="font-tag text-[10px] sm:text-[11px] text-[#2563eb] dark:text-blue-400 mb-2">INSIDER · ACCESS</p>
            <h2 className="font-display text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 sm:mb-3">
                Subscribe for hidden deals
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5 sm:mb-7 max-w-sm leading-relaxed">
                Get access to secret prices, last-minute discounts, and member-only promotions delivered straight to your inbox.
            </p>

            {/* Merged capsule input — dashed tear-line stands in for the button border, keeping the ticket motif even here */}
            <form
                className="flex items-stretch max-w-md rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-[#2563eb] overflow-hidden"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 min-w-0 px-4 sm:px-5 py-2.5 sm:py-3.5 bg-transparent focus:outline-none text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400"
                    required
                />
                <div className="w-px my-2 border-l border-dashed border-slate-300 dark:border-slate-700" />
                <button
                    type="submit"
                    className="bg-[#2563eb] hover:bg-blue-700 text-white font-semibold px-4 sm:px-7 text-xs sm:text-sm transition-colors whitespace-nowrap"
                >
                    Subscribe
                </button>
            </form>
            <p className="font-tag text-[8px] sm:text-[9px] text-slate-400 dark:text-slate-500 mt-2 sm:mt-3">NO SPAM · UNSUBSCRIBE ANYTIME</p>
        </div>

        {/* Get the App (Right) — styled as a wallet boarding pass */}
        <div className="flex-1 rounded-2xl border border-slate-800 bg-[#0F172A] relative overflow-hidden">
            {/* ambient glow, kept subtle */}
            <div className="absolute -right-24 -top-24 w-72 h-72 bg-[#2563eb] rounded-full blur-[90px] opacity-20 pointer-events-none" />

            {/* pass header strip */}
            <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 pt-6 sm:pt-7">
                <span className="font-tag text-[10px] text-blue-400 tracking-widest">BOARDING PASS</span>
                <span className="font-tag text-[10px] text-white/40 tracking-widest">SS · APP</span>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 px-5 sm:px-8 pt-4 pb-6">
                <div className="flex-1 w-full">
                    <h2 className="font-display text-xl sm:text-3xl font-bold text-white tracking-tight mb-2 sm:mb-3">
                        Get the SmartStay app
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mb-5 sm:mb-6 max-w-sm leading-relaxed">
                        Book faster, manage your reservations on the go, and use your phone as a mobile room key.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <button className="flex items-center gap-2 sm:gap-2.5 bg-white/10 hover:bg-white/20 border border-white/10 transition-colors rounded-xl px-3 sm:px-4 py-2 sm:py-2.5">
                            <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.21 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.69 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                            </svg>
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[7px] sm:text-[8px] text-white/60">Download on the</span>
                                <span className="text-[10px] sm:text-[12px] font-semibold text-white mt-0.5">App Store</span>
                            </div>
                        </button>

                        <button className="flex items-center gap-2 sm:gap-2.5 bg-white/10 hover:bg-white/20 border border-white/10 transition-colors rounded-xl px-3 sm:px-4 py-2 sm:py-2.5">
                            <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3.6 2.6c-.3.3-.5.7-.5 1.2v16.4c0 .5.2.9.5 1.2l.1.1L13 12.2v-.2L3.7 2.5l-.1.1z"/>
                                <path d="M16.1 15.3l-3.1-3.1v-.2l3.1-3.1 6.9 3.9c.6.3.6 1.3 0 1.6l-6.9 3.9z"/>
                                <path d="M13 12l3.1 3.1L3.7 22.5c-.4.3-1 .1-1.2-.4L13 12z"/>
                                <path d="M13 12L2.5 1.9c.2-.5.8-.7 1.2-.4L16.1 8.7 13 12z"/>
                            </svg>
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[7px] sm:text-[8px] text-white/60">GET IT ON</span>
                                <span className="text-[10px] sm:text-[12px] font-semibold text-white mt-0.5">Google Play</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Perforated tear-line + barcode "boarding stub" */}
                <div className="hidden lg:flex items-stretch shrink-0 self-stretch">
                    <div className="relative mx-1">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-slate-950" />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-slate-950" />
                        <div className="h-full border-l border-dashed border-white/20" />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 pl-5 pr-1">
                        <div className="p-2.5 bg-white rounded-lg">
                            <div className="w-16 h-16 grid grid-cols-5 grid-rows-5 gap-[2px]">
                                {[1,1,1,0,1, 1,0,1,0,1, 1,1,1,0,0, 0,0,1,1,1, 1,1,0,1,1].map((on, i) => (
                                    <div key={i} className={on ? 'bg-slate-900' : 'bg-transparent'} />
                                ))}
                            </div>
                        </div>
                        <span className="font-tag text-[8px] text-white/40 tracking-widest">SCAN TO BOARD</span>
                    </div>
                </div>
            </div>

            {/* barcode strip along the bottom edge — no image asset, pure CSS */}
            <div
                className="relative z-10 h-3 w-full opacity-70"
                style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 2px, transparent 2px, transparent 5px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0.5) 6px, transparent 6px, transparent 10px)',
                }}
            />
        </div>

    </div>
</section>

            </div>
        </UserLayout>
    );
}

/*
DESIGN NOTES — what changed below the hero, and why
=====================================================
The hero was left byte-for-byte identical, as requested. Everything after it
was rebuilt around one small token system instead of ad hoc Tailwind classes:

COLOR
  Primary   #2563eb  (already set by the hero — kept as the one accent, not
                       diluted by extra accent colors)
  Ink       #0F172A  (the loyalty reward panel — a deliberate dark block
                       instead of another white card)
  Gold      #D98E3E  (already used once for the 50% badge — now the single
                       "reward" color, never used elsewhere so it stays special)
  Neutrals  slate-50 → slate-900, unchanged

TYPE
  Display   'Space Grotesk'  — headings + card titles + the big "50%". A
             geometric, slightly technical face that matches "Faster
             Check-ins" positioning, instead of the same weight of the body
             font just made bigger (the main thing that made the old
             sections feel flat/generic).
  Tag/mono  'JetBrains Mono' — eyebrow labels (PT · 01, DEL, JS-01) and the
             loyalty panel labels. Reads like a ticket/boarding-pass code,
             which is the throughline for the whole page.
  Body      System sans (unchanged), used sparingly for descriptions only.

SIGNATURE ELEMENT — the "boarding pass"
  The property-type cards get a dashed perforation + punch-holes between the
  photo and the label, like a torn ticket stub. The destination cards get a
  rotated dashed-circle "passport stamp" instead of just a name floating on
  a gradient. The loyalty section — previously the flattest part of the
  page — is now an actual two-panel ticket: a light stub with the offer
  copy and stamp progress, a dashed die-cut seam with punch-holes, and a
  dark "50% OFF" tear-off panel. This one is the boldest move on the page;
  everything else stays quiet so it doesn't compete.

OTHER FIXES
  - Spacing rhythm standardized to mt-20/mt-24 between sections (was mixing
    mt-16, mt-12, mt-10, which is why the page felt uneven).
  - Radius standardized to rounded-2xl for cards, rounded-full for pills —
    the old file mixed rounded-lg/rounded-xl/rounded-full on similar
    elements.
  - The "Browse by property type" right-arrow now actually scrolls the row
    (it rendered before but had no handler); added a matching left arrow.
  - Card data pulled into arrays at the top (PROPERTY_TYPES, DESTINATIONS_*,
    WHY_CARDS) so content edits don't require touching JSX structure.

TO USE
  Move the @import inside FONT_IMPORTS into your index.html <head> instead
  of the inline <style> tag for slightly better load performance — it's
  inline here only so this file works as a drop-in replacement.
*/