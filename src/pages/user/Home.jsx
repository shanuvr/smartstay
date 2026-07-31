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

                {/* Blue Hero Background Section */}
                <div className="bg-[#003B95] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-[1300px] mx-auto">
                        <h1 className="text-4xl md:text-[48px] font-bold tracking-tight mb-3">
                            Find your next stay
                        </h1>
                        <p className="text-lg md:text-xl font-normal text-slate-100 opacity-90">
                            Search low prices on hotels, homes and much more...
                        </p>
                    </div>
                </div>

                {/* Search Widget Container (Pulled up relative to the hero section) */}
                <div className="max-w-[1040px] mx-auto px-4 sm:px-6 -mt-10 relative">

                    {/* Backdrop overlay to close calendar on click-outside */}
                    {showCalendar && (
                        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowCalendar(false)} />
                    )}

                    <div className="bg-white rounded-lg grid grid-cols-1 lg:grid-cols-12 gap-px overflow-hidden border border-gray-200 shadow-md relative z-50">

                        {/* Destination Column */}
                        <div className="lg:col-span-3 flex items-center gap-3 px-3.5 py-2 lg:px-4 lg:py-3 hover:bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
                            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3h13.5m-13.5 0v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                            </svg>
                            <div className="flex-grow">
                                <label className="block text-[10px] lg:text-[11px] font-medium text-gray-400 uppercase tracking-tight">Enter destination</label>
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Where are you going?"
                                    className="w-full text-[13px] lg:text-[15px] font-semibold text-gray-800 placeholder-gray-500 focus:outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        {/* Merged Dates Column */}
                        <div
                            className="lg:col-span-4 flex items-center gap-3 px-3.5 py-2 lg:px-4 lg:py-3 hover:bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 cursor-pointer select-none"
                            onClick={() => {
                                setShowCalendar(!showCalendar);
                                setShowOccupancy(false);
                            }}
                        >
                            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            <div className="flex-grow min-w-0">
                                <label className="block text-[10px] lg:text-[11px] font-medium text-gray-400 uppercase tracking-tight">Select dates</label>
                                <span className="text-[13px] lg:text-[15px] font-semibold text-gray-800 dark:text-gray-200 block truncate">
                                    {checkIn && checkOut
                                        ? `${formatDateDisplay(checkIn)} — ${formatDateDisplay(checkOut)}`
                                        : checkIn
                                            ? `${formatDateDisplay(checkIn)} — Check-out date`
                                            : "Check-in date — Check-out date"}
                                </span>
                            </div>
                        </div>

                        {/* Occupancy Column */}
                        <div
                            className="lg:col-span-3 flex items-center justify-between gap-2 px-3.5 py-2 lg:px-4 lg:py-3 hover:bg-gray-50 cursor-pointer border-b lg:border-b-0 lg:border-r border-gray-200 select-none"
                            onClick={() => {
                                setShowOccupancy(!showOccupancy);
                                setShowCalendar(false);
                            }}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <div className="min-w-0">
                                    <label className="block text-[10px] lg:text-[11px] font-medium text-gray-400 uppercase tracking-tight">Select occupancy</label>
                                    <span className="text-[12px] lg:text-[14px] font-semibold text-gray-800 dark:text-gray-200 block truncate" title={`${adults} adults · ${children} children · ${rooms} room${rooms > 1 ? 's' : ''}`}>
                                        {adults} adult{adults > 1 ? 's' : ''} · {children} child{children !== 1 ? 'ren' : ''} · {rooms} room{rooms > 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>
                            <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-500 mt-2 lg:mt-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>

                        {/* Search Button Column */}
                        <div className="lg:col-span-2 p-1 bg-white flex">
                            <button 
                                onClick={() => navigate('/listing')}
                                className="w-full bg-[#006ce4] hover:bg-[#0057b8] text-white font-semibold text-[14px] lg:text-[17px] py-2.5 px-4 lg:py-3.5 rounded transition-colors flex items-center justify-center shadow-sm"
                            >
                                Search
                            </button>
                        </div>

                    </div>

                    {/* Backdrop overlay for closing calendar on click-outside */}
                    {showCalendar && (
                        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowCalendar(false)} />
                    )}

                    {/* Backdrop overlay for closing occupancy popover on click-outside */}
                    {showOccupancy && (
                        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowOccupancy(false)} />
                    )}

                    {/* Calendar Popover */}
                    {showCalendar && (
                        <div className="absolute top-[110px] lg:top-full left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-0 lg:w-[580px] w-[90vw] max-w-[290px] sm:max-w-none mt-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-2xl p-2.5 sm:p-4 z-50">

                            {/* Single tab heading to match screenshot style */}
                            <div className="flex border-b border-gray-150 dark:border-slate-800 mb-3 select-none">
                                <button type="button" className="px-4 py-2 border-b-2 border-[#003B95] font-bold text-sm text-[#003B95] dark:text-blue-400">
                                    Calendar
                                </button>
                            </div>

                            {/* Fixed Day headers for Mobile View */}
                            <div className="grid grid-cols-7 gap-y-1 text-center mb-2 sm:hidden px-1 text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase">
                                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                                    <span key={d}>{d}</span>
                                ))}
                            </div>

                            {/* Calendar Grid Container (Vertically scrollable on mobile, side-by-side on desktop) */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-between relative pt-1 max-h-[235px] overflow-y-auto sm:max-h-none sm:overflow-visible pr-1 sm:pr-0 scrollbar-none">

                                {/* Left Month */}
                                {renderMonth(currentMonthOffset)}

                                {/* Divider on desktop */}
                                <div className="hidden sm:block w-px bg-gray-100 dark:bg-slate-800 self-stretch" />

                                {/* Right Month */}
                                {renderMonth(currentMonthOffset + 1)}

                                {/* Extra Month for vertical scroll list on mobile */}
                                {renderMonth(currentMonthOffset + 2, true)}

                                {/* Navigation Arrows (Desktop Only) */}
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
                        <div className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-[17.5%] lg:w-[300px] w-[90vw] max-w-[300px] mt-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-2xl p-4 z-50 top-[160px] lg:top-full">

                            {/* Adults Counter */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-bold text-gray-800 dark:text-white text-[14px]">Adults</span>
                                <div className="border border-gray-200 dark:border-slate-700 rounded-md py-1 px-2.5 flex items-center justify-between gap-3 w-[90px]">
                                    <button
                                        type="button"
                                        onClick={() => setAdults(Math.max(1, adults - 1))}
                                        className={`text-lg font-normal select-none leading-none ${adults <= 1 ? 'text-gray-300 dark:text-slate-700 cursor-not-allowed' : 'text-[#006ce4] dark:text-blue-400 cursor-pointer'}`}
                                        disabled={adults <= 1}
                                    >
                                        —
                                    </button>
                                    <span className="font-bold text-gray-800 dark:text-white text-[13px]">{adults}</span>
                                    <button
                                        type="button"
                                        onClick={() => setAdults(adults + 1)}
                                        className="text-lg font-normal text-[#006ce4] dark:text-blue-400 cursor-pointer select-none leading-none"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Children Counter */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-bold text-gray-800 dark:text-white text-[14px]">Children</span>
                                <div className="border border-gray-200 dark:border-slate-700 rounded-md py-1 px-2.5 flex items-center justify-between gap-3 w-[90px]">
                                    <button
                                        type="button"
                                        onClick={() => setChildren(Math.max(0, children - 1))}
                                        className={`text-lg font-normal select-none leading-none ${children <= 0 ? 'text-gray-300 dark:text-slate-700 cursor-not-allowed' : 'text-[#006ce4] dark:text-blue-400 cursor-pointer'}`}
                                        disabled={children <= 0}
                                    >
                                        —
                                    </button>
                                    <span className="font-bold text-gray-800 dark:text-white text-[13px]">{children}</span>
                                    <button
                                        type="button"
                                        onClick={() => setChildren(children + 1)}
                                        className="text-lg font-normal text-[#006ce4] dark:text-blue-400 cursor-pointer select-none leading-none"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Rooms Counter */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-bold text-gray-800 dark:text-white text-[14px]">Rooms</span>
                                <div className="border border-gray-200 dark:border-slate-700 rounded-md py-1 px-2.5 flex items-center justify-between gap-3 w-[90px]">
                                    <button
                                        type="button"
                                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                                        className={`text-lg font-normal select-none leading-none ${rooms <= 1 ? 'text-gray-300 dark:text-slate-700 cursor-not-allowed' : 'text-[#006ce4] dark:text-blue-400 cursor-pointer'}`}
                                        disabled={rooms <= 1}
                                    >
                                        —
                                    </button>
                                    <span className="font-bold text-gray-800 dark:text-white text-[13px]">{rooms}</span>
                                    <button
                                        type="button"
                                        onClick={() => setRooms(rooms + 1)}
                                        className="text-lg font-normal text-[#006ce4] dark:text-blue-400 cursor-pointer select-none leading-none"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Travelling with pets? */}
                            <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-slate-800">
                                <span className="font-bold text-gray-800 dark:text-white text-[14px]">Travelling with pets?</span>
                                <button
                                    type="button"
                                    onClick={() => setWithPets(!withPets)}
                                    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${withPets ? 'bg-[#006ce4]' : 'bg-gray-200 dark:bg-slate-700'}`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${withPets ? 'translate-x-4' : 'translate-x-0'}`}
                                    />
                                </button>
                            </div>

                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-1 leading-normal">
                                Assistance animals aren't considered pets.
                            </p>
                            <a href="#assistance-animals" className="text-[11px] text-[#006ce4] dark:text-blue-400 hover:underline font-semibold block mb-3.5">
                                Read more about travelling with assistance animals
                            </a>

                            <button
                                type="button"
                                onClick={() => setShowOccupancy(false)}
                                className="border border-[#006ce4] text-[#006ce4] hover:bg-blue-50/50 dark:hover:bg-slate-800 dark:border-blue-400 dark:text-blue-400 font-bold py-2 px-4 rounded w-full text-center transition-colors block text-sm select-none"
                            >
                                Done
                            </button>
                        </div>
                    )}

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
        <span className="absolute top-5 right-5 sm:right-6 font-mono text-[10px] tracking-wider text-[#0E4B43]/50 dark:text-[#5DCAA5]/50 rotate-3">
            JS-LOYALTY
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
            {/* Left: copy + CTAs */}
            <div className="text-left">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#0E4B43] dark:text-[#5DCAA5] mb-2">
                    Loyalty circle
                </p>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    Book 3 stays, get 50% off your 4th
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-lg leading-relaxed">
                    Every booking earns a stamp. Complete three at any JoyStay partner property and your fourth reservation unlocks instantly at half price.
                </p>
                <div className="flex items-center gap-5">
                    <Link
                        to="/signin"
                        className="bg-[#0E4B43] hover:bg-[#085041] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                    >
                        Join loyalty circle
                    </Link>
                    <Link
                        to="/explore"
                        className="text-[#0E4B43] dark:text-[#5DCAA5] hover:underline font-bold text-xs sm:text-sm whitespace-nowrap"
                    >
                        Find hotels
                    </Link>
                </div>
            </div>

            {/* Right: stamp trail */}
            <div className="flex items-center gap-2 sm:gap-3 justify-start lg:justify-end">
                {[1, 2, 3].map((n, i) => (
                    <div key={n} className="flex items-center gap-2 sm:gap-3">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0E4B43] dark:bg-[#5DCAA5] flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-white dark:text-slate-900" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
    <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#0E4B43] dark:text-[#5DCAA5] mb-2">
        Why Smart stay
    </p>
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
        Travel light. We'll handle the rest.
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            {
                code: 'JS-01',
                icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
                title: 'Pay at the property',
                sub: 'Free cancellation on most stays',
            },
            {
                code: 'JS-02',
                icon: 'M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.5m-7 0H12m-9 0h3.5m-3.5 0V10.5m0 9.75A1.5 1.5 0 012 18.75V12a1.5 1.5 0 011.5-1.5h3.5',
                title: '300M+ traveller reviews',
                sub: 'Real feedback from real guests',
            },
            {
                code: 'JS-03',
                icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253',
                title: '2M+ places to stay',
                sub: 'Hotels, villas, homestays, and more',
            },
            {
                code: 'JS-04',
                icon: 'M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z',
                title: 'Support, day or night',
                sub: 'Real people, every timezone',
            },
        ].map((card) => (
            <div
                key={card.code}
                className="relative bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
                <span className="absolute top-4 right-4 font-mono text-[10px] tracking-wider text-[#0E4B43]/50 dark:text-[#5DCAA5]/50 rotate-3">
                    {card.code}
                </span>

                <div className="p-5 pb-4">
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-dashed border-[#0E4B43]/30 dark:border-[#5DCAA5]/30">
                        <svg className="w-5 h-5 text-[#0E4B43] dark:text-[#5DCAA5]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                        </svg>
                    </div>
                </div>

                <div className="relative mx-5">
                    <div className="border-t border-dashed border-black/15 dark:border-white/15" />
                    <span className="absolute -left-[30px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border border-black/10 dark:border-white/10" />
                    <span className="absolute -right-[30px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border border-black/10 dark:border-white/10" />
                </div>

                <div className="p-5 pt-4">
                    <h3 className="font-bold text-gray-900 dark:text-white text-[15px] mb-1 leading-snug">
                        {card.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
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
