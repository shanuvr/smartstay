import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  X,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  MapPin,
  Building2,
  ShieldCheck,
  TrendingUp,
  Landmark
} from 'lucide-react';

const SuperAdminPartners = () => {
  // Mock data for partners
  const [partners, setPartners] = useState([
    {
      id: 'PTN-5001',
      name: 'Hyatt Group India',
      email: 'partnerships@hyatt.in',
      phone: '+91 22 1234 5678',
      joined: '2024-01-15',
      location: 'Mumbai, Maharashtra',
      subscription: 'Enterprise',
      propertiesCount: 12,
      totalRevenue: '₹4.2 Cr',
      platformCommission: '₹63,00,000',
      status: 'Active',
      kycStatus: 'Verified',
      bankDetails: 'HDFC Bank ending in 8899',
      logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop',
      recentProperties: [
        { name: 'Grand Hyatt Mumbai', type: 'Hotel', status: 'Active' },
        { name: 'Hyatt Regency Pune', type: 'Hotel', status: 'Active' }
      ]
    },
    {
      id: 'PTN-5002',
      name: 'Sharma Hospitality',
      email: 'admin@sharma-stays.com',
      phone: '+91 98765 12345',
      joined: '2025-03-20',
      location: 'Kochi, Kerala',
      subscription: 'Premium',
      propertiesCount: 4,
      totalRevenue: '₹85,00,000',
      platformCommission: '₹12,75,000',
      status: 'Active',
      kycStatus: 'Verified',
      bankDetails: 'SBI ending in 1122',
      logo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=100&h=100&fit=crop',
      recentProperties: [
        { name: 'Kerala Backwater Resort', type: 'Resort', status: 'Suspended' },
        { name: 'Munnar Tea Estate Stay', type: 'Resort', status: 'Active' }
      ]
    },
    {
      id: 'PTN-5003',
      name: 'Himalayan Retreats',
      email: 'contact@himalayan-retreats.in',
      phone: '+91 99887 11223',
      joined: '2024-11-05',
      location: 'Shimla, Himachal',
      subscription: 'Basic',
      propertiesCount: 2,
      totalRevenue: '₹22,00,000',
      platformCommission: '₹3,30,000',
      status: 'Active',
      kycStatus: 'Pending',
      bankDetails: 'ICICI Bank ending in 4455',
      logo: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=100&h=100&fit=crop',
      recentProperties: [
        { name: 'Mountain View Lodge', type: 'Lodge', status: 'Active' }
      ]
    },
    {
      id: 'PTN-5004',
      name: 'Goa Stays Ltd',
      email: 'hello@goastays.com',
      phone: '+91 91234 98765',
      joined: '2026-01-10',
      location: 'Panaji, Goa',
      subscription: 'Premium',
      propertiesCount: 8,
      totalRevenue: '₹1.5 Cr',
      platformCommission: '₹22,50,000',
      status: 'Suspended',
      kycStatus: 'Verified',
      bankDetails: 'Axis Bank ending in 7766',
      logo: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=100&h=100&fit=crop',
      recentProperties: [
        { name: 'Goa Beachfront Villa', type: 'Villa', status: 'Suspended' },
        { name: 'Palolem Beach Huts', type: 'Lodge', status: 'Suspended' }
      ]
    },
    {
      id: 'PTN-5005',
      name: 'QuickStays',
      email: 'biz@quickstays.in',
      phone: '+91 88776 55443',
      joined: '2025-08-30',
      location: 'New Delhi, Delhi',
      subscription: 'Enterprise',
      propertiesCount: 24,
      totalRevenue: '₹3.8 Cr',
      platformCommission: '₹57,00,000',
      status: 'Active',
      kycStatus: 'Verified',
      bankDetails: 'Kotak Bank ending in 3344',
      logo: 'https://images.unsplash.com/photo-1551882547-ff40c0d5857a?w=100&h=100&fit=crop',
      recentProperties: [
        { name: 'Delhi Airport Transit', type: 'Hotel', status: 'Active' },
        { name: 'Gurugram Cyber Hub Stay', type: 'Hotel', status: 'Active' }
      ]
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal State
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter partners based on search and status
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          partner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          partner.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Toggle Status Action
  const handleToggleStatus = (id, currentStatus, e) => {
    e.stopPropagation(); // Prevent opening the modal when clicking the toggle
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    setPartners(partners.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const openModal = (partner) => {
    setSelectedPartner(partner);
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

  const getSubscriptionBadge = (plan) => {
    switch(plan) {
      case 'Enterprise': return <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-bold uppercase tracking-wider">Enterprise</span>;
      case 'Premium': return <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold uppercase tracking-wider">Premium</span>;
      case 'Basic': return <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">Basic</span>;
      default: return null;
    }
  }

  return (
    <div className="animate-in fade-in duration-300 relative">
      
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Platform Partners</h1>
          <p className="text-sm text-slate-500 mt-1">Manage hotel owners, business accounts, and view their property portfolios.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <Briefcase size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Partners</p>
              <p className="text-lg font-bold text-slate-800 leading-none mt-0.5">{partners.length}</p>
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
              placeholder="Search by business name or ID..." 
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
                <th className="px-6 py-4">Business Details</th>
                <th className="px-6 py-4">Plan & Properties</th>
                <th className="px-6 py-4 text-center">Total Revenue</th>
                <th className="px-6 py-4 text-center">Platform Comm.</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Access Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                    <Briefcase className="mx-auto h-12 w-12 text-slate-200 mb-3" />
                    <p className="text-sm font-medium">No partners found matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredPartners.map((partner) => (
                  <tr 
                    key={partner.id} 
                    onClick={() => openModal(partner)}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={partner.logo} alt={partner.name} className="w-10 h-10 rounded-md object-cover shadow-sm border border-slate-200" />
                        <div>
                          <h3 className="text-[14px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{partner.name}</h3>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[11px] font-semibold text-slate-400 mt-0.5 font-mono">{partner.id}</span>
                            <span className="text-[10px] text-slate-500">{partner.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2 items-start">
                        {getSubscriptionBadge(partner.subscription)}
                        <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                          <Building2 size={12} className="text-slate-400" />
                          {partner.propertiesCount} Properties
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-bold text-slate-700">{partner.totalRevenue}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                        {partner.platformCommission}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(partner.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* Toggle Switch */}
                      <div className="flex items-center justify-end">
                        <button 
                          onClick={(e) => handleToggleStatus(partner.id, partner.status, e)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            partner.status === 'Active' ? 'bg-blue-600' : 'bg-slate-300'
                          }`}
                          title={partner.status === 'Active' ? 'Suspend Partner' : 'Reactivate Partner'}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            partner.status === 'Active' ? 'translate-x-6' : 'translate-x-1'
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
          <div>Showing <span className="text-slate-800 font-bold">{filteredPartners.length}</span> partners</div>
          
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

      {/* Partner Details Modal */}
      {isModalOpen && selectedPartner && (
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
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 border-white shadow-sm">
                  <img src={selectedPartner.logo} alt="Partner" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-800">{selectedPartner.name}</h2>
                    {getSubscriptionBadge(selectedPartner.subscription)}
                  </div>
                  <p className="text-xs font-semibold text-slate-500 flex items-center gap-2 mt-1">
                    <span className="font-mono bg-slate-200 px-1.5 rounded">{selectedPartner.id}</span>
                    <span>Partner since {selectedPartner.joined}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {getStatusBadge(selectedPartner.status)}
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
                
                {/* Left Column: Business Info & Stats */}
                <div className="space-y-6">
                  {/* Contact Info Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-100">Business Contact</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail size={16} className="text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Support Email</p>
                          <p className="text-sm font-medium text-slate-800">{selectedPartner.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone size={16} className="text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
                          <p className="text-sm font-medium text-slate-800">{selectedPartner.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">HQ Location</p>
                          <p className="text-sm font-medium text-slate-800">{selectedPartner.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financial & Compliance Info */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-100">Banking & Compliance</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <ShieldCheck size={16} className={`shrink-0 mt-0.5 ${selectedPartner.kycStatus === 'Verified' ? 'text-emerald-500' : 'text-amber-500'}`} />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">KYC Status</p>
                          <p className={`text-sm font-bold ${selectedPartner.kycStatus === 'Verified' ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {selectedPartner.kycStatus}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Landmark size={16} className="text-slate-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payout Account</p>
                          <p className="text-sm font-medium text-slate-800">{selectedPartner.bankDetails}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Portfolio & Revenue (Spans 2 columns on lg) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Financial Overview Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-100">Financial Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col items-center justify-center">
                        <TrendingUp size={20} className="text-slate-400 mb-2" />
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Generated Revenue</p>
                        <p className="text-2xl font-black text-slate-800">{selectedPartner.totalRevenue}</p>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 flex flex-col items-center justify-center">
                        <CreditCard size={20} className="text-emerald-500 mb-2" />
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Platform Commission Earned</p>
                        <p className="text-2xl font-black text-emerald-700">{selectedPartner.platformCommission}</p>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 h-full">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-100 flex justify-between items-center">
                      <span>Property Portfolio</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{selectedPartner.propertiesCount} Total Properties</span>
                    </h3>
                    
                    {selectedPartner.recentProperties.length > 0 ? (
                      <div className="space-y-4">
                        {selectedPartner.recentProperties.map((prop, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/80 transition-colors">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                                <Building2 size={18} className="text-slate-400" />
                              </div>
                              <div>
                                <p className="text-[14px] font-bold text-slate-800">{prop.name}</p>
                                <p className="text-xs font-semibold text-slate-500 mt-0.5">{prop.type}</p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              {getStatusBadge(prop.status)}
                            </div>
                          </div>
                        ))}
                        {selectedPartner.propertiesCount > 2 && (
                          <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg transition-colors mt-2">
                            View All {selectedPartner.propertiesCount} Properties
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-sm font-medium text-slate-500">No properties listed yet.</p>
                      </div>
                    )}
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-white shrink-0 flex justify-end items-center">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminPartners;
