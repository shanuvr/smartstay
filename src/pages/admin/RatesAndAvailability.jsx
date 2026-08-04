import React, { useState } from 'react';
import { ChevronDown, Calendar as CalendarIcon, Settings, X, Search, Check, HelpCircle } from 'lucide-react';

const formatINR = (n) => `INR ${n.toLocaleString('en-IN')}`;

const RatesAndAvailability = () => {
  const [showRoomDropdown, setShowRoomDropdown] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('Superior Room (R3) (985682272)');
  const [tempSelectedRoom, setTempSelectedRoom] = useState('Superior Room (R3) (985682272)');
  
  const [availability, setAvailability] = useState('1');
  const [rate, setRate] = useState('2250');
  const [isOpen, setIsOpen] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('August');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedDay, setSelectedDay] = useState(4);

  const roomsList = [
    { name: 'Superior Room (R3)', id: '985682272' },
    { name: 'Premium Room (R1)', id: '985682273' },
    { name: 'Delux Room (R4)', id: '985682274' },
    { name: 'Executive Room (R5)', id: '985682275' },
    { name: 'Studio Room (R2)', id: '985682276' }
  ];

  const calendarDays = [
    // Week 1 (offset before Aug 1/2)
    { day: '', empty: true }, // Sun
    { day: '', empty: true }, // Mon
    { day: '', empty: true }, // Tue
    { day: '', empty: true }, // Wed
    { day: '', empty: true }, // Thu
    { day: '', empty: true }, // Fri
    { day: 1, rate: 2250, left: 1 }, // Sat
    // Week 2
    { day: 2, rate: 2250, left: 1 },
    { day: 3, rate: 2250, left: 1 },
    { day: 4, rate: 2250, left: 1 }, // Default Selected
    { day: 5, rate: 2250, left: 1 },
    { day: 6, rate: 2250, left: 1 },
    { day: 7, rate: 2250, left: 1 },
    { day: 8, rate: 2250, left: 1 },
    // Week 3
    { day: 9, rate: 2250, left: 1 },
    { day: 10, rate: 2250, left: 1 },
    { day: 11, rate: 2250, left: 1 },
    { day: 12, rate: 2250, left: 1 },
    { day: 13, rate: 2250, left: 1 },
    { day: 14, rate: 2250, left: 1 },
    { day: 15, rate: 2250, left: 1 },
    // Week 4
    { day: 16, rate: 21000, left: 1 },
    { day: 17, rate: 21000, left: 1 },
    { day: 18, rate: 23000, left: 1 },
    { day: 19, rate: 1900, left: 1 },
    { day: 20, rate: 1900, left: 1 },
    { day: 21, rate: 1900, left: 1 },
    { day: 22, rate: 1900, left: 1 },
    // Week 5
    { day: 23, rate: 1900, left: 1 },
    { day: 24, rate: 1900, left: 1 },
    { day: 25, rate: 1900, left: 1 },
    { day: 26, rate: 1900, left: 1 },
    { day: 27, rate: 1900, left: 1 },
    { day: 28, rate: 1900, left: 1 },
    { day: 29, rate: 1900, left: 1 },
    // Week 6
    { day: 30, rate: 1900, left: 1 },
    { day: 31, rate: 1900, left: 1 },
    { day: '', empty: true },
    { day: '', empty: true },
    { day: '', empty: true },
    { day: '', empty: true },
    { day: '', empty: true },
  ];

  const handleApplyRoom = () => {
    setSelectedRoom(tempSelectedRoom);
    setShowRoomDropdown(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col relative">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Calendar</h1>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold transition-colors">
            Clear dates <X size={14} />
          </button>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 relative">
          <button className="text-xs text-blue-600 font-semibold hover:underline">
            Send feedback
          </button>

          {/* Room Type Selector Trigger */}
          <div className="relative">
            <button 
              onClick={() => setShowRoomDropdown(!showRoomDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              {selectedRoom.split(' (')[0]} <ChevronDown size={16} />
            </button>

            {/* Room Selector Dropdown */}
            {showRoomDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search room type" 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-blue-400 focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-2 mb-3 px-2 py-1">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer" />
                  <span className="text-xs font-semibold text-slate-600">Select all (1/5)</span>
                </div>

                <div className="flex flex-col gap-1 max-h-48 overflow-y-auto mb-4 border-b border-slate-100 pb-3">
                  {roomsList.map((room) => {
                    const roomString = `${room.name} (${room.id})`;
                    return (
                      <label key={room.id} className="flex items-center gap-3 px-2 py-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={tempSelectedRoom === roomString}
                          onChange={() => setTempSelectedRoom(roomString)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                        />
                        <span className="text-xs font-medium text-slate-700">{room.name} <span className="text-[10px] text-slate-400 font-mono">({room.id})</span></span>
                      </label>
                    );
                  })}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button 
                    onClick={() => setShowRoomDropdown(false)}
                    className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleApplyRoom}
                    className="px-4 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors">
            <Settings size={16} />
          </button>
          <button className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors">
            <CalendarIcon size={16} />
          </button>
        </div>
      </div>



      {/* Main Grid Content */}
      <div className="flex-1 p-2 md:p-6 flex flex-col xl:flex-row gap-4 md:gap-6">
        
        {/* Left Side: Calendar Card */}
        <div className="flex-1 bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm p-2 sm:p-4 md:p-6 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)} 
                className="bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer shadow-sm"
              >
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)} 
                className="bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer shadow-sm"
              >
                {['2025', '2026', '2027', '2028', '2029'].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="w-full">
            <div className="w-full grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
              {/* Day Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className={`bg-slate-50 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider ${d === 'Sun' ? 'bg-red-50/60 text-red-500' : ''}`}>
                  {d}
                </div>
              ))}

              {/* Day Cells */}
              {calendarDays.map((dayObj, index) => {
                if (dayObj.empty) {
                  return <div key={`empty-${index}`} className="bg-slate-50/40 min-h-[50px] sm:min-h-[90px]" />;
                }

                const isCurrentlySelected = dayObj.day === selectedDay;

                return (
                  <div 
                    key={`day-${dayObj.day}`} 
                    onClick={() => setSelectedDay(dayObj.day)}
                    className={`bg-white p-1 sm:p-2 min-h-[50px] sm:min-h-[90px] flex flex-col justify-between border-slate-200 transition-colors select-none relative cursor-pointer hover:bg-slate-50/50
                      ${isCurrentlySelected ? 'ring-2 ring-blue-500 ring-inset bg-blue-50/10' : ''}
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-[10px] sm:text-xs font-bold text-slate-800`}>
                        {dayObj.day}
                      </span>
                    </div>

                    <div className="mt-2 sm:mt-4 flex flex-col items-end">
                      <span className="hidden sm:block text-[10px] text-slate-400 font-semibold mb-0.5 leading-none">
                        {dayObj.left} left
                      </span>
                      <span className="text-[9px] sm:text-[11px] font-bold text-slate-700 leading-none">
                        {formatINR(dayObj.day === 4 ? parseInt(rate) : dayObj.rate)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Edit / Settings Panel */}
        <div className="w-full xl:w-96 shrink-0 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 md:p-6 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">1 date selected</h3>
              <p className="text-lg font-bold text-slate-800 mt-1">
                {String(selectedDay).padStart(2, '0')} {selectedMonth.slice(0, 3)} {selectedYear}
              </p>
              <button className="text-xs text-blue-600 font-bold hover:underline mt-2 flex items-center">
                Specify day of the week
              </button>
            </div>

            <div className="p-4 md:p-6 flex flex-col gap-6">
              {/* Card info */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{selectedRoom.split(' (')[0]}</h4>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Bookable: 1 Booked: 0</p>
                  </div>
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-600">
                    <ChevronDown size={14} className="transform rotate-180" />
                  </div>
                </div>

                {/* Open/Closed Toggle */}
                <div className="flex items-center gap-6 mt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      checked={isOpen}
                      onChange={() => setIsOpen(true)}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" 
                    />
                    <span className="text-xs font-semibold text-slate-700">Open</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      checked={!isOpen}
                      onChange={() => setIsOpen(false)}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" 
                    />
                    <span className="text-xs font-semibold text-slate-700">Closed</span>
                  </label>
                </div>

                {/* Remaining Availability */}
                <div className="mt-5">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Remaining Availability
                  </label>
                  <input 
                    type="number" 
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Exclusive Rate Info */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">Room Only (19216265)</h5>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">2 guests</p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    <Settings size={14} />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Sell exclusive rate
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                      INR
                    </span>
                    <input 
                      type="text" 
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg pl-11 pr-3 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Panel Actions */}
            <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <button 
                onClick={() => {
                  setRate('2250');
                  setAvailability('1');
                  setIsOpen(true);
                }}
                className="px-5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
              >
                Clear
              </button>
              <button className="px-6 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-sm shadow-blue-600/20">
                Save
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Need Help Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="flex items-center gap-2 bg-[#002e6e] hover:bg-[#002252] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-0.5">
          <HelpCircle size={15} />
          Need Help
        </button>
      </div>
    </div>
  );
};

export default RatesAndAvailability;
