import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../laybouts/Userlayout';

const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
};

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

                {/* Responsive Hero Section with hero-image.png background */}
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



                {/* Browse by property type */}
                <div className="max-w-[1300px] mx-auto px-4 sm:px-6 mt-16 relative">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                        Browse by property type
                    </h2>
                    <div className="relative flex items-center">
                        {/* Scroll Container */}
                        <div className="flex gap-4 overflow-x-auto pb-4 w-full snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                            {/* Card 1: Hotels */}
                            <div className="min-w-[280px] sm:min-w-[290px] flex-1 snap-start group cursor-pointer">
                                <div className="overflow-hidden rounded-lg shadow-sm border border-gray-100 dark:border-slate-800 aspect-[4/3] w-full">
                                    <img
                                        src="/hotels.png"
                                        alt="Hotels"
                                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                                    />
                                </div>
                                <span className="font-bold text-[15px] text-gray-800 dark:text-gray-200 mt-3 block">
                                    Hotels
                                </span>
                            </div>

                            {/* Card 2: Apartments */}
                            <div className="min-w-[280px] sm:min-w-[290px] flex-1 snap-start group cursor-pointer">
                                <div className="overflow-hidden rounded-lg shadow-sm border border-gray-100 dark:border-slate-800 aspect-[4/3] w-full">
                                    <img
                                        src="/apartments.png"
                                        alt="Apartments"
                                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                                    />
                                </div>
                                <span className="font-bold text-[15px] text-gray-800 dark:text-gray-200 mt-3 block">
                                    Apartments
                                </span>
                            </div>

                            {/* Card 3: Resorts */}
                            <div className="min-w-[280px] sm:min-w-[290px] flex-1 snap-start group cursor-pointer">
                                <div className="overflow-hidden rounded-lg shadow-sm border border-gray-100 dark:border-slate-800 aspect-[4/3] w-full">
                                    <img
                                        src="/resorts.png"
                                        alt="Resorts"
                                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                                    />
                                </div>
                                <span className="font-bold text-[15px] text-gray-800 dark:text-gray-200 mt-3 block">
                                    Resorts
                                </span>
                            </div>

                            {/* Card 4: Villas */}
                            <div className="min-w-[280px] sm:min-w-[290px] flex-1 snap-start group cursor-pointer">
                                <div className="overflow-hidden rounded-lg shadow-sm border border-gray-100 dark:border-slate-800 aspect-[4/3] w-full">
                                    <img
                                        src="/villas.png"
                                        alt="Villas"
                                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                                    />
                                </div>
                                <span className="font-bold text-[15px] text-gray-800 dark:text-gray-200 mt-3 block">
                                    Villas
                                </span>
                            </div>

                        </div>

                        {/* Slider Navigation Button (Right Arrow) */}
                        <button className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-4 w-10 h-10 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition-colors z-10">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Trending destinations */}
                <div className="max-w-[1300px] mx-auto px-4 sm:px-6 mt-16 pb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                        Trending destinations
                    </h2>
                    <p className="text-[14px] text-gray-500 dark:text-gray-400 mb-6">
                        Most popular choices for travellers from India
                    </p>

                    {/* First Row: 2 Large Cards */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">

                        {/* Goa */}
                        <div className="relative group rounded-lg overflow-hidden h-[150px] sm:h-[200px] md:h-[270px] cursor-pointer shadow-sm">
                            <img
                                src="/dest_goa.png"
                                alt="Goa"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                            <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 flex items-center gap-1 md:gap-2">
                                <span className="text-white text-sm sm:text-lg md:text-xl font-bold tracking-tight drop-shadow-sm">Goa</span>
                                <span className="text-sm sm:text-lg md:text-xl">🇮🇳</span>
                            </div>
                        </div>

                        {/* Mumbai */}
                        <div className="relative group rounded-lg overflow-hidden h-[150px] sm:h-[200px] md:h-[270px] cursor-pointer shadow-sm">
                            <img
                                src="/dest_mumbai.png"
                                alt="Mumbai"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                            <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 flex items-center gap-1 md:gap-2">
                                <span className="text-white text-sm sm:text-lg md:text-xl font-bold tracking-tight drop-shadow-sm">Mumbai</span>
                                <span className="text-sm sm:text-lg md:text-xl">🇮🇳</span>
                            </div>
                        </div>

                    </div>

                    {/* Second Row: 3 Medium Cards */}
                    <div className="grid grid-cols-3 gap-2 md:gap-4">

                        {/* New Delhi */}
                        <div className="relative group rounded-lg overflow-hidden h-[110px] sm:h-[160px] md:h-[220px] cursor-pointer shadow-sm">
                            <img
                                src="/dest_delhi.png"
                                alt="New Delhi"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                            <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 flex items-center gap-1 md:gap-2">
                                <span className="text-white text-xs sm:text-base md:text-lg font-bold tracking-tight drop-shadow-sm">New Delhi</span>
                                <span className="text-xs sm:text-base md:text-lg">🇮🇳</span>
                            </div>
                        </div>

                        {/* Bengaluru */}
                        <div className="relative group rounded-lg overflow-hidden h-[110px] sm:h-[160px] md:h-[220px] cursor-pointer shadow-sm">
                            <img
                                src="/dest_bengaluru.png"
                                alt="Bengaluru"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                            <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 flex items-center gap-1 md:gap-2">
                                <span className="text-white text-xs sm:text-base md:text-lg font-bold tracking-tight drop-shadow-sm">Bengaluru</span>
                                <span className="text-xs sm:text-base md:text-lg">🇮🇳</span>
                            </div>
                        </div>

                        {/* Kerala */}
                        <div className="relative group rounded-lg overflow-hidden h-[110px] sm:h-[160px] md:h-[220px] cursor-pointer shadow-sm col-span-1">
                            <img
                                src="/dest_kerala.png"
                                alt="Kerala"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                            <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 flex items-center gap-1 md:gap-2">
                                <span className="text-white text-xs sm:text-base md:text-lg font-bold tracking-tight drop-shadow-sm">Kerala</span>
                                <span className="text-xs sm:text-base md:text-lg">🇮🇳</span>
                            </div>
                        </div>

                    </div>
                </div>

               
                {/* Loyalty rewards */}
                <section className="max-w-[1300px] mx-auto px-4 sm:px-6 mt-12 pb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Exclusive loyalty rewards
                    </h2>

                    <div className="relative bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm">
                        <span className="absolute top-5 right-5 sm:right-6 font-mono text-[10px] tracking-wider text-[#2563eb]/60 dark:text-blue-400/60 rotate-3">
                            JS-LOYALTY
                        </span>

                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
                            {/* Left: copy + CTAs */}
                            <div className="text-left">
                                <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#2563eb] dark:text-blue-400 mb-2">
                                    Loyalty circle
                                </p>
                                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                                    Book 3 stays, get 50% off your 4th
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-lg leading-relaxed">
                                    Every booking earns a stamp. Complete three at any SmartStay partner property and your fourth reservation unlocks instantly at half price.
                                </p>
                                <div className="flex items-center gap-5">
                                    <Link
                                        to="/signin"
                                        className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                                    >
                                        Join loyalty circle
                                    </Link>
                                    <Link
                                        to="/listing"
                                        className="text-[#2563eb] dark:text-blue-400 hover:underline font-bold text-xs sm:text-sm whitespace-nowrap"
                                    >
                                        Find hotels
                                    </Link>
                                </div>
                            </div>

                            {/* Right: stamp trail */}
                            <div className="flex items-center gap-2 sm:gap-3 justify-start lg:justify-end">
                                {[1, 2, 3].map((n, i) => (
                                    <div key={n} className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2563eb] dark:bg-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        {i < 2 && <div className="w-4 sm:w-6 border-t border-dashed border-black/20 dark:border-white/20" />}
                                    </div>
                                ))}

                                <div className="w-4 sm:w-6 border-t border-dashed border-black/20 dark:border-white/20" />

                                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-[#D98E3E] flex items-center justify-center shrink-0">
                                    <span className="text-[10px] sm:text-xs font-bold text-[#D98E3E]">50%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Smart Stay? Section */}
                <section className="max-w-[1300px] mx-auto px-4 sm:px-6 mt-10 pb-10">
                    <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#2563eb] dark:text-blue-400 mb-2">
                        Why Smart stay
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
                        Travel light. We'll handle the rest.
                    </h2>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                        {[
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
                                title: '24/7 Support',
                                sub: 'Real people, every timezone',
                            },
                        ].map((card) => (
                            <div
                                key={card.code}
                                className="relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[110px] sm:min-h-[140px]"
                            >
                                <span className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 font-mono text-[9px] sm:text-[10px] tracking-wider text-[#2563eb]/50 dark:text-blue-400/50">
                                    {card.code}
                                </span>

                                <div>
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#2563eb] dark:text-blue-400 flex items-center justify-center mb-2.5 sm:mb-3">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                                        </svg>
                                    </div>

                                    <h3 className="font-bold text-gray-900 dark:text-white text-xs sm:text-[15px] leading-tight">
                                        {card.title}
                                    </h3>
                                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 leading-snug mt-1">
                                        {card.sub}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </UserLayout>
    );
}
