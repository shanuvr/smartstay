import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  MoreVertical, 
  User, 
  Calendar as CalendarIcon, 
  CreditCard, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  X, 
  AlertCircle,
  Eye
} from 'lucide-react';

const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;

const initialBookings = [
  {
    id: 'SS-98234',
    guestName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    roomName: 'Superior Room',
    checkIn: '2026-08-04',
    checkOut: '2026-08-06',
    amount: 4500,
    status: 'Confirmed',
    guestsCount: '2 Adults, 1 Child',
    paymentStatus: 'Paid',
    selfie: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    idCard: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=800&fit=crop',
    coGuests: [
      {
        name: 'Kiran Sharma',
        relation: 'Spouse',
        age: 28,
        selfie: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
        idCard: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=800&fit=crop',
        idType: 'Aadhaar Card',
        idNumber: 'xxxx-xxxx-8844'
      },
      {
        name: 'Chintu Sharma',
        relation: 'Child',
        age: 6,
        selfie: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500&h=500&fit=crop',
        idCard: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=800&fit=crop',
        idType: 'Birth Certificate',
        idNumber: 'BC-2020-8321'
      }
    ]
  },
  {
    id: 'SS-98235',
    guestName: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+91 98123 45678',
    roomName: 'Premium Room',
    checkIn: '2026-08-04',
    checkOut: '2026-08-07',
    amount: 7500,
    status: 'Checked In',
    guestsCount: '2 Adults',
    paymentStatus: 'Paid',
    selfie: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
    idCard: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=800&fit=crop',
    coGuests: [
      {
        name: 'Amit Patel',
        relation: 'Spouse',
        age: 31,
        selfie: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
        idCard: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=800&fit=crop',
        idType: 'Aadhaar Card',
        idNumber: 'xxxx-xxxx-5678'
      }
    ]
  },
  {
    id: 'SS-98236',
    guestName: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '+91 99887 76655',
    roomName: 'Delux Room',
    checkIn: '2026-08-02',
    checkOut: '2026-08-04',
    amount: 6000,
    status: 'Completed',
    guestsCount: '1 Adult',
    paymentStatus: 'Paid',
    selfie: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop',
    idCard: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=800&fit=crop',
    coGuests: []
  },
  {
    id: 'SS-98237',
    guestName: 'Neha Gupta',
    email: 'neha.gupta@example.com',
    phone: '+91 95555 44444',
    roomName: 'Executive Room',
    checkIn: '2026-08-08',
    checkOut: '2026-08-10',
    amount: 9000,
    status: 'Confirmed',
    guestsCount: '2 Adults',
    paymentStatus: 'Pending',
    selfie: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop',
    idCard: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=800&fit=crop',
    coGuests: [
      {
        name: 'Vikas Gupta',
        relation: 'Spouse',
        age: 29,
        selfie: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=500&fit=crop',
        idCard: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=800&fit=crop',
        idType: 'Aadhaar Card',
        idNumber: 'xxxx-xxxx-9012'
      }
    ]
  },
  {
    id: 'SS-98238',
    guestName: 'Kabir Singh',
    email: 'kabir.singh@example.com',
    phone: '+91 91111 22222',
    roomName: 'Standard Room',
    checkIn: '2026-08-01',
    checkOut: '2026-08-03',
    amount: 5200,
    status: 'Cancelled',
    guestsCount: '2 Adults',
    paymentStatus: 'Refunded',
    selfie: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&h=500&fit=crop',
    idCard: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=800&fit=crop',
    coGuests: []
  }
];

const Bookings = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showActionsDropdown, setShowActionsDropdown] = useState(null);
  const [activeImageModal, setActiveImageModal] = useState(null);
  const [digitalCheckins, setDigitalCheckins] = useState({});

  // Read digital check-in flags from localStorage on mount
  useEffect(() => {
    const flags = {};
    initialBookings.forEach(b => {
      if (localStorage.getItem(`digital_checkin_completed_${b.id}`) === 'true') {
        flags[b.id] = true;
      }
    });
    setDigitalCheckins(flags);
  }, []);

  const tabs = ['All', 'Confirmed', 'Checked In', 'Completed', 'Cancelled'];

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesTab = activeTab === 'All' || b.status === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        b.guestName.toLowerCase().includes(q) || 
        b.id.toLowerCase().includes(q) || 
        b.roomName.toLowerCase().includes(q);
      
      return matchesTab && matchesSearch;
    });
  }, [bookings, activeTab, searchQuery]);

  const updateStatus = (id, newStatus) => {
    setBookings(bookings.map(b => {
      if (b.id === id) {
        let payStatus = b.paymentStatus;
        if (newStatus === 'Completed') payStatus = 'Paid';
        if (newStatus === 'Cancelled') payStatus = 'Refunded';
        // When admin confirms check-in, write the flag so the user side sees it
        if (newStatus === 'Checked In') {
          localStorage.setItem(`checkin_status_${id}`, 'true');
        }
        return { ...b, status: newStatus, paymentStatus: payStatus };
      }
      return b;
    }));
    setShowActionsDropdown(null);
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking(prev => ({
        ...prev,
        status: newStatus,
        paymentStatus: newStatus === 'Completed' ? 'Paid' : newStatus === 'Cancelled' ? 'Refunded' : prev.paymentStatus
      }));
    }
  };

  // Stat calculations
  const stats = useMemo(() => {
    return {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status === 'Confirmed').length,
      checkedIn: bookings.filter(b => b.status === 'Checked In').length,
      completed: bookings.filter(b => b.status === 'Completed').length,
    };
  }, [bookings]);

  const statusStyles = {
    'Confirmed': 'bg-blue-50 text-blue-700 border-blue-100',
    'Checked In': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Completed': 'bg-slate-50 text-slate-600 border-slate-200',
    'Cancelled': 'bg-rose-50 text-rose-700 border-rose-100',
  };

  const paymentStyles = {
    'Paid': 'bg-green-50 text-green-700',
    'Pending': 'bg-amber-50 text-amber-700',
    'Refunded': 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col relative">
      
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Bookings</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage reservation logs, check-ins, and guest stays.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Bookings</span>
            <span className="text-xl md:text-2xl font-extrabold text-slate-800 mt-1 block">{stats.total}</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <TrendingUp size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Arrivals / Confirmed</span>
            <span className="text-xl md:text-2xl font-extrabold text-slate-800 mt-1 block">{stats.confirmed}</span>
          </div>
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Checked In</span>
            <span className="text-xl md:text-2xl font-extrabold text-slate-800 mt-1 block">{stats.checkedIn}</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Completed</span>
            <span className="text-xl md:text-2xl font-extrabold text-slate-800 mt-1 block">{stats.completed}</span>
          </div>
          <div className="p-3 bg-slate-50 text-slate-600 rounded-xl">
            <CheckCircle size={20} />
          </div>
        </div>
      </div>

      {/* Main Listing & Filters */}
      <div className="flex-1 px-4 md:px-8 pb-8 flex flex-col gap-6">
        
        {/* Filters and Search */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' : 'text-slate-600 hover:bg-slate-50 border border-slate-100 hover:border-slate-200'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-[350px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Guest Name, Room or ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-semibold shadow-inner"
              />
            </div>

          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Booking ID</th>
                  <th className="px-6 py-4">Guest Details</th>
                  <th className="px-6 py-4">Room Type</th>
                  <th className="px-6 py-4">Stay Schedule</th>
                  <th className="px-6 py-4 text-center">Amount</th>
                  <th className="px-6 py-4 text-center">Payment</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* Booking ID */}
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">{b.id}</span>
                    </td>
                    {/* Guest Details */}
                    <td className="px-6 py-4">
                      <div>
                        <h4 className="font-bold text-slate-800">{b.guestName}</h4>
                        <div className="text-[10px] text-slate-400 mt-0.5 space-y-0.5">
                          <p>{b.email}</p>
                          <p>{b.phone}</p>
                        </div>
                      </div>
                    </td>
                    {/* Room Type */}
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-slate-800">{b.roomName}</span>
                        <span className="block text-[10px] text-slate-400 font-medium mt-0.5">{b.guestsCount}</span>
                      </div>
                    </td>
                    {/* Stay Schedule */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <CalendarIcon size={14} className="text-slate-400" />
                        <div className="text-xs">
                          <span className="text-slate-700">{b.checkIn}</span>
                          <span className="mx-1 text-slate-400">→</span>
                          <span className="text-slate-700">{b.checkOut}</span>
                        </div>
                      </div>
                    </td>
                    {/* Amount */}
                    <td className="px-6 py-4 text-center text-slate-800 font-bold">
                      {formatINR(b.amount)}
                    </td>
                    {/* Payment Status */}
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full ${paymentStyles[b.paymentStatus]}`}>
                        {b.paymentStatus}
                      </span>
                    </td>
                    {/* Status Badge */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold border rounded-md ${statusStyles[b.status]}`}>
                          {b.status}
                        </span>
                        {digitalCheckins[b.id] && b.status === 'Confirmed' && (
                          <span className="inline-block px-2 py-0.5 text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-200 rounded-md animate-pulse">
                            Guest Verified
                          </span>
                        )}
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4 text-center relative">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        
                        <div className="relative">
                          <button
                            onClick={() => setShowActionsDropdown(showActionsDropdown === b.id ? null : b.id)}
                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                          >
                            <MoreVertical size={16} />
                          </button>
                          
                          {showActionsDropdown === b.id && (
                            <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-1 duration-100">
                              {b.status === 'Confirmed' && (
                                <button
                                  onClick={() => updateStatus(b.id, 'Checked In')}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors"
                                >
                                  Check In
                                </button>
                              )}
                              {b.status === 'Checked In' && (
                                <button
                                  onClick={() => updateStatus(b.id, 'Completed')}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                  Check Out
                                </button>
                              )}
                              {b.status !== 'Completed' && b.status !== 'Cancelled' && (
                                <button
                                  onClick={() => updateStatus(b.id, 'Cancelled')}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors border-t border-slate-100"
                                >
                                  Cancel Booking
                                </button>
                              )}
                              <button
                                onClick={() => { setSelectedBooking(b); setShowActionsDropdown(null); }}
                                className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
                              >
                                Full Details
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-slate-400 font-medium">
                      No bookings found matching filters or search terms.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Booking Details Right Drawer Modal */}
      {selectedBooking && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[99] animate-in fade-in duration-200"
            onClick={() => setSelectedBooking(null)}
          />
          
          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 w-[450px] max-w-[90vw] bg-white z-[100] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-800">Booking Details</span>
                <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{selectedBooking.id}</span>
              </div>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Info Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Status Header */}
              <div className="flex items-center justify-between p-4 border border-slate-100 bg-slate-50/50 rounded-2xl">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Stay Status</span>
                  <span className={`inline-block mt-1.5 px-2.5 py-0.5 text-xs font-bold border rounded-md ${statusStyles[selectedBooking.status]}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Payment Details</span>
                  <span className={`inline-block mt-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full ${paymentStyles[selectedBooking.paymentStatus]}`}>
                    {selectedBooking.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Guest Information */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <User size={14} className="text-blue-600" /> Guest Details
                </h3>
                <div className="space-y-2 text-sm font-semibold text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Name</span>
                    <span className="text-slate-800">{selectedBooking.guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email</span>
                    <span className="text-slate-800">{selectedBooking.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mobile</span>
                    <span className="text-slate-800">{selectedBooking.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Occupancy</span>
                    <span className="text-slate-800">{selectedBooking.guestsCount}</span>
                  </div>
                </div>
              </div>

              {/* Stay Information */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <CalendarIcon size={14} className="text-blue-600" /> Reservation Details
                </h3>
                <div className="space-y-2 text-sm font-semibold text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Room Booked</span>
                    <span className="text-slate-800">{selectedBooking.roomName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Check-in</span>
                    <span className="text-slate-800">{selectedBooking.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Check-out</span>
                    <span className="text-slate-800">{selectedBooking.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Price</span>
                    <span className="text-slate-800 font-bold">{formatINR(selectedBooking.amount)}</span>
                  </div>
                </div>
              </div>

              {/* ID Check Mockup Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <CreditCard size={14} className="text-blue-600" /> Digital Check-in Docs (Primary Guest)
                </h3>
                {selectedBooking.status === 'Checked In' || selectedBooking.status === 'Completed' ? (
                  <div className="border border-green-100 bg-green-50/30 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-green-700 text-xs font-bold">
                      <CheckCircle size={16} /> Guest Selfie & ID Uploaded
                    </div>
                    <div className="flex gap-4">
                      {/* Selfie */}
                      <button
                        onClick={() => setActiveImageModal(selectedBooking.selfie)}
                        className="w-20 h-20 bg-slate-200 rounded-lg overflow-hidden border border-slate-300 flex items-center justify-center group relative cursor-pointer focus:outline-none"
                      >
                        <img src={selectedBooking.selfie} alt="Selfie" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                          View Full
                        </div>
                      </button>
                      
                      {/* ID Card */}
                      <button
                        onClick={() => setActiveImageModal(selectedBooking.idCard)}
                        className="w-32 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-300 flex items-center justify-center group relative cursor-pointer focus:outline-none"
                      >
                        <img src={selectedBooking.idCard} alt="ID Card" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                          View ID
                        </div>
                      </button>
                    </div>
                  </div>
                ) : digitalCheckins[selectedBooking.id] ? (
                  <div className="border border-amber-200 bg-amber-50/30 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-amber-700 text-xs font-bold">
                      <Clock size={16} /> Guest Digital Check-In Completed — Awaiting Key Handover
                    </div>
                    <p className="text-[11px] text-slate-500">
                      The guest has submitted their ID and selfie via digital check-in. Please verify documents and confirm check-in to hand over the room key.
                    </p>
                    <div className="flex gap-4">
                      {/* Selfie */}
                      <button
                        onClick={() => setActiveImageModal(selectedBooking.selfie)}
                        className="w-20 h-20 bg-slate-200 rounded-lg overflow-hidden border border-slate-300 flex items-center justify-center group relative cursor-pointer focus:outline-none"
                      >
                        <img src={selectedBooking.selfie} alt="Selfie" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                          View Full
                        </div>
                      </button>
                      {/* ID Card */}
                      <button
                        onClick={() => setActiveImageModal(selectedBooking.idCard)}
                        className="w-32 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-300 flex items-center justify-center group relative cursor-pointer focus:outline-none"
                      >
                        <img src={selectedBooking.idCard} alt="ID Card" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                          View ID
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border border-slate-200 bg-slate-50/50 rounded-2xl p-4 flex items-center gap-2 text-slate-500 text-xs">
                    <AlertCircle size={16} />
                    <span>No check-in documents submitted yet. Available upon guest check-in.</span>
                  </div>
                )}
              </div>

              {/* Co-Guests / Secondary Guests Section */}
              {selectedBooking.coGuests && selectedBooking.coGuests.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                    <User size={14} className="text-blue-600" /> Secondary Guests ({selectedBooking.coGuests.length})
                  </h3>
                  
                  <div className="space-y-4">
                    {selectedBooking.coGuests.map((cg, idx) => (
                      <div key={idx} className="bg-slate-50/50 border border-slate-200 rounded-2xl p-4 space-y-3">
                        <div className="flex justify-between items-center text-sm font-bold text-slate-850">
                          <span>{cg.name}</span>
                          <span className="text-xs font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                            {cg.relation} ({cg.age} yrs)
                          </span>
                        </div>
                        
                        <div className="space-y-1.5 text-xs font-semibold text-slate-600">
                          <div className="flex justify-between">
                            <span className="text-slate-400">ID Document</span>
                            <span className="text-slate-800">{cg.idType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">ID Number</span>
                            <span className="text-slate-850">{cg.idNumber}</span>
                          </div>
                        </div>

                        {/* Co-guest Check-in Docs */}
                        {(selectedBooking.status === 'Checked In' || selectedBooking.status === 'Completed' || digitalCheckins[selectedBooking.id]) && (
                          <div className="flex gap-4 pt-2.5 border-t border-slate-200/50">
                            {/* Co-guest Selfie */}
                            <button
                              onClick={() => setActiveImageModal(cg.selfie)}
                              className="w-14 h-14 bg-slate-200 rounded-lg overflow-hidden border border-slate-300 flex items-center justify-center group relative cursor-pointer focus:outline-none"
                            >
                              <img src={cg.selfie} alt="Selfie" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[8px] font-bold text-center">
                                View
                              </div>
                            </button>
                            
                            {/* Co-guest ID Card */}
                            <button
                              onClick={() => setActiveImageModal(cg.idCard)}
                              className="w-20 h-14 bg-slate-100 rounded-lg overflow-hidden border border-slate-300 flex items-center justify-center group relative cursor-pointer focus:outline-none"
                            >
                              <img src={cg.idCard} alt="ID Card" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[8px] font-bold text-center">
                                View ID
                              </div>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Actions Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex gap-2.5">
              {selectedBooking.status === 'Confirmed' && (
                <button
                  onClick={() => updateStatus(selectedBooking.id, 'Checked In')}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  Confirm Check In
                </button>
              )}
              {selectedBooking.status === 'Checked In' && (
                <button
                  onClick={() => updateStatus(selectedBooking.id, 'Completed')}
                  className="flex-1 bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  Complete Check Out
                </button>
              )}
              {selectedBooking.status !== 'Completed' && selectedBooking.status !== 'Cancelled' && (
                <button
                  onClick={() => updateStatus(selectedBooking.id, 'Cancelled')}
                  className="flex-1 bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-200 py-3 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel Booking
                </button>
              )}
            </div>

          </div>
        </>
      )}

      {/* Lightbox / Fullscreen Image Modal */}
      {activeImageModal && (
        <div 
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[200] flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveImageModal(null)}
        >
          <button 
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all focus:outline-none"
            onClick={() => setActiveImageModal(null)}
          >
            <X size={24} />
          </button>
          
          <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <img 
              src={activeImageModal} 
              alt="Fullscreen Preview" 
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default Bookings;
