import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  X,
  Users as UsersIcon,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  MapPin,
  Star,
  Building2
} from 'lucide-react';

const SuperAdminUsers = () => {
  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: 'USR-8091',
      name: 'Rahul Sharma',
      email: 'rahul.s@example.com',
      phone: '+91 98765 43210',
      joined: '2025-03-12',
      location: 'Mumbai, Maharashtra',
      totalBookings: 12,
      totalSpent: '₹1,45,000',
      status: 'Active',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
      lastLogin: '2 hours ago (IP: 103.11.22.45)',
      device: 'iPhone 14 Pro, Safari',
      paymentMethod: 'Visa ending in 4242',
      recentBookings: [
        { hotel: 'Grand Hyatt Mumbai', date: '12 Oct 2025', status: 'Completed', amount: '₹24,000', guests: 2, days: 3 },
        { hotel: 'Kerala Backwater Resort', date: '05 Jan 2026', status: 'Completed', amount: '₹32,000', guests: 4, days: 5 }
      ],
      reviews: [
        { hotel: 'Grand Hyatt Mumbai', rating: 5, comment: 'Excellent stay, great service!' }
      ]
    },
    {
      id: 'USR-8092',
      name: 'Priya Patel',
      email: 'priya.p@example.com',
      phone: '+91 91234 56789',
      joined: '2025-06-22',
      location: 'Ahmedabad, Gujarat',
      totalBookings: 4,
      totalSpent: '₹42,500',
      status: 'Active',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      lastLogin: '1 day ago (IP: 45.22.11.89)',
      device: 'MacBook Air, Chrome',
      paymentMethod: 'Mastercard ending in 8899',
      recentBookings: [
        { hotel: 'Goa Beachfront Villa', date: '15 Mar 2026', status: 'Upcoming', amount: '₹18,000', guests: 3, days: 2 }
      ],
      reviews: []
    },
    {
      id: 'USR-8093',
      name: 'Amit Kumar',
      email: 'amit.k@example.com',
      phone: '+91 99887 76655',
      joined: '2024-11-05',
      location: 'New Delhi, Delhi',
      totalBookings: 28,
      totalSpent: '₹3,20,000',
      status: 'Suspended',
      avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
      recentBookings: [
        { hotel: 'Delhi Airport Transit', date: '01 Aug 2025', status: 'Cancelled', amount: '₹8,000' },
        { hotel: 'Mountain View Lodge', date: '10 Feb 2025', status: 'Completed', amount: '₹45,000' }
      ]
    },
    {
      id: 'USR-8094',
      name: 'Sneha Reddy',
      email: 'sneha.r@example.com',
      phone: '+91 97766 55443',
      joined: '2026-01-10',
      location: 'Hyderabad, Telangana',
      totalBookings: 1,
      totalSpent: '₹12,000',
      status: 'Active',
      avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
      recentBookings: [
        { hotel: 'Mountain View Lodge', date: '20 Apr 2026', status: 'Upcoming', amount: '₹12,000' }
      ]
    },
    {
      id: 'USR-8095',
      name: 'Vikram Singh',
      email: 'vikram.s@example.com',
      phone: '+91 96655 44332',
      joined: '2025-08-30',
      location: 'Jaipur, Rajasthan',
      totalBookings: 7,
      totalSpent: '₹85,000',
      status: 'Active',
      avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
      recentBookings: [
        { hotel: 'Kerala Backwater Resort', date: '10 Nov 2025', status: 'Completed', amount: '₹22,000' }
      ]
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal State
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter users based on search and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Toggle Status Action
  const handleToggleStatus = (id, currentStatus, e) => {
    e.stopPropagation(); // Prevent opening the modal when clicking the toggle
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Active
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Suspended
        </span>
      );
    }
  };

  const getBookingStatusBadge = (status) => {
    switch(status) {
      case 'Completed': return <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold uppercase">Completed</span>;
      case 'Upcoming': return <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold uppercase">Upcoming</span>;
      case 'Cancelled': return <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold uppercase">Cancelled</span>;
      default: return null;
    }
  }

  return (
    <div className="animate-in fade-in duration-300 relative">
      
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Platform Users</h1>
          <p className="text-sm text-slate-500 mt-1">Manage guest accounts, view booking history, and monitor activity.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <UsersIcon size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Guests</p>
              <p className="text-lg font-bold text-slate-800 leading-none mt-0.5">{users.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Filters Bar */}
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-[350px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 placeholder:text-slate-400 font-medium shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <Filter size={14} /> Filter
            </span>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {['All', 'Active', 'Suspended'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                    statusFilter === status 
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 border border-transparent'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-white border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Guest Details</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4 text-center">Bookings</th>
                <th className="px-6 py-4 text-center">Total Spent</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Account Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                    <UsersIcon className="mx-auto h-12 w-12 text-slate-200 mb-3" />
                    <p className="text-sm font-medium">No users found matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    onClick={() => openModal(user)}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-200" />
                        <div>
                          <h3 className="text-[14px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{user.name}</h3>
                          <p className="text-[11px] font-semibold text-slate-400 mt-0.5 font-mono">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-slate-700">{user.email}</span>
                        <span className="text-xs font-semibold text-slate-400">{user.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm">
                        {user.totalBookings}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-bold text-slate-700">{user.totalSpent}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* Toggle Switch */}
                      <div className="flex items-center justify-end">
                        <button 
                          onClick={(e) => handleToggleStatus(user.id, user.status, e)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            user.status === 'Active' ? 'bg-blue-600' : 'bg-slate-300'
                          }`}
                          title={user.status === 'Active' ? 'Suspend Account' : 'Reactivate Account'}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            user.status === 'Active' ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-sm font-medium text-slate-500">
          <div>Showing <span className="text-slate-800 font-bold">{filteredUsers.length}</span> users</div>
          
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors cursor-not-allowed opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-blue-600 bg-blue-50 text-blue-600 font-semibold mx-1">
              1
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors cursor-not-allowed opacity-50" disabled>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                  <img src={selectedUser.avatar} alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{selectedUser.name}</h2>
                  <p className="text-xs font-semibold text-slate-500 flex items-center gap-2">
                    <span className="font-mono bg-slate-200 px-1.5 rounded">{selectedUser.id}</span>
                    <span>Member since {selectedUser.joined}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {getStatusBadge(selectedUser.status)}
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors bg-white shadow-sm border border-slate-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200 bg-slate-50/30">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Personal Info & Stats */}
                <div className="space-y-6">
                  {/* Contact Info Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-100">Contact Info</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail size={16} className="text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                          <p className="text-sm font-medium text-slate-800">{selectedUser.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone size={16} className="text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
                          <p className="text-sm font-medium text-slate-800">{selectedUser.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                          <p className="text-sm font-medium text-slate-800">{selectedUser.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security & System Info */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-100">Security & Access</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Login</p>
                        <p className="text-sm font-medium text-slate-800">{selectedUser.lastLogin || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Device</p>
                        <p className="text-sm font-medium text-slate-800">{selectedUser.device || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment Method</p>
                        <p className="text-sm font-medium text-slate-800 flex items-center gap-2">
                          <CreditCard size={14} className="text-slate-400" />
                          {selectedUser.paymentMethod || 'None on file'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Financial Stats Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-100">Lifetime Value</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 text-center">
                        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Bookings</p>
                        <p className="text-2xl font-black text-blue-700">{selectedUser.totalBookings}</p>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100 text-center">
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Total Spent</p>
                        <p className="text-lg font-black text-emerald-800">{selectedUser.totalSpent}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Activity History (Spans 2 columns on lg) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Recent Bookings */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-100 flex justify-between items-center">
                      <span>Booking History</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{selectedUser.recentBookings.length} Recent</span>
                    </h3>
                    
                    {selectedUser.recentBookings.length > 0 ? (
                      <div className="space-y-4">
                        {selectedUser.recentBookings.map((booking, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/80 transition-colors">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                                <Building2 size={20} className="text-slate-400" />
                              </div>
                              <div>
                                <p className="text-[15px] font-bold text-slate-800">{booking.hotel}</p>
                                <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-500">
                                  <span className="flex items-center gap-1"><Calendar size={12} /> {booking.date}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1"><UsersIcon size={12} /> {booking.guests || 2} Guests</span>
                                  <span>•</span>
                                  <span>{booking.days || 1} Nights</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-base font-black text-slate-800 mb-1">{booking.amount}</p>
                              {getBookingStatusBadge(booking.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-sm font-medium text-slate-500">No recent bookings found.</p>
                      </div>
                    )}
                  </div>

                  {/* Reviews & Feedback */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-100">Recent Reviews Left</h3>
                    
                    {selectedUser.reviews && selectedUser.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {selectedUser.reviews.map((review, idx) => (
                          <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                            <div className="flex justify-between items-start mb-2">
                              <p className="text-sm font-bold text-slate-800">{review.hotel}</p>
                              <div className="flex items-center text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={14} className={i < review.rating ? "fill-current" : "text-slate-300"} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 italic">"{review.comment}"</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-sm font-medium text-slate-500">This user hasn't left any reviews yet.</p>
                      </div>
                    )}
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-white shrink-0 flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <CreditCard size={14} /> ID Verified • Payment Method on file
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminUsers;
