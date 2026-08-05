import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  X,
  Building2,
  MapPin,
  Phone,
  Mail,
  FileText
} from 'lucide-react';

const SuperAdminProperties = () => {
  // Mock data for properties
  const [properties, setProperties] = useState([
    {
      id: 'PROP-1001',
      name: 'Grand Hyatt Mumbai',
      partnerName: 'Hyatt Group',
      location: 'Mumbai, India',
      type: 'Hotel',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop',
    },
    {
      id: 'PROP-1002',
      name: 'Kerala Backwater Resort',
      partnerName: 'Sharma Hospitality',
      location: 'Alleppey, India',
      type: 'Resort',
      status: 'Suspended',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=100&h=100&fit=crop',
    },
    {
      id: 'PROP-1003',
      name: 'Mountain View Lodge',
      partnerName: 'Himalayan Retreats',
      location: 'Manali, India',
      type: 'Lodge',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=100&h=100&fit=crop',
    },
    {
      id: 'PROP-1004',
      name: 'Goa Beachfront Villa',
      partnerName: 'Goa Stays Ltd',
      location: 'Goa, India',
      type: 'Villa',
      status: 'Suspended',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=100&h=100&fit=crop',
    },
    {
      id: 'PROP-1005',
      name: 'Delhi Airport Transit',
      partnerName: 'QuickStays',
      location: 'New Delhi, India',
      type: 'Hotel',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c0d5857a?w=100&h=100&fit=crop',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal State
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter properties based on search and status
  const filteredProperties = properties.filter(prop => {
    const matchesSearch = prop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prop.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prop.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || prop.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Toggle Status Action
  const handleToggleStatus = (id, currentStatus, e) => {
    e.stopPropagation(); // Prevent opening the modal when clicking the toggle
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    setProperties(properties.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const openModal = (property) => {
    setSelectedProperty(property);
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

  return (
    <div className="animate-in fade-in duration-300 relative">
      
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Platform Properties</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and monitor all hotel and property listings across the platform.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <Building2 size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Properties</p>
              <p className="text-lg font-bold text-slate-800 leading-none mt-0.5">{properties.length}</p>
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
              placeholder="Search properties or partners..." 
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
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Property Details</th>
                <th className="px-6 py-4">Partner / Owner</th>
                <th className="px-6 py-4">Location & Type</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Suspend / Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    <Building2 className="mx-auto h-12 w-12 text-slate-200 mb-3" />
                    <p className="text-sm font-medium">No properties found matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredProperties.map((property) => (
                  <tr 
                    key={property.id} 
                    onClick={() => openModal(property)}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={property.image} alt={property.name} className="w-12 h-12 rounded-xl object-cover shadow-sm border border-slate-200" />
                        <div>
                          <h3 className="text-[14px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{property.name}</h3>
                          <p className="text-[11px] font-semibold text-slate-400 mt-0.5 font-mono">{property.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-700">{property.partnerName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-slate-600">{property.location}</span>
                        <span className="text-xs font-semibold text-slate-400">{property.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(property.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* Toggle Switch */}
                      <div className="flex items-center justify-end">
                        <button 
                          onClick={(e) => handleToggleStatus(property.id, property.status, e)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            property.status === 'Active' ? 'bg-blue-600' : 'bg-slate-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            property.status === 'Active' ? 'translate-x-6' : 'translate-x-1'
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
          <div>Showing <span className="text-slate-800 font-bold">{filteredProperties.length}</span> properties</div>
          
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

      {/* Property Details Modal */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                  <img src={selectedProperty.image} alt="Property" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{selectedProperty.name}</h2>
                  <p className="text-xs font-semibold text-slate-500">{selectedProperty.id} • {selectedProperty.partnerName}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Static Info as requested */}
            <div className="p-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Column 1 */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-2">Location Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-blue-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-slate-700">123 Horizon Avenue, Coastal Road</p>
                          <p className="text-sm font-medium text-slate-700">{selectedProperty.location}, 400052</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-2">Contact Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-blue-500 shrink-0" />
                        <p className="text-sm font-medium text-slate-700">+91 98765 43210</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-blue-500 shrink-0" />
                        <p className="text-sm font-medium text-slate-700">admin@{selectedProperty.partnerName.replace(/\s+/g, '').toLowerCase()}.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-2">Property Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">Free WiFi</span>
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">Swimming Pool</span>
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">Spa & Wellness</span>
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">24/7 Security</span>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-2">Business & Compliance</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Property Type:</span>
                        <span className="text-sm font-bold text-slate-800">{selectedProperty.type}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">GST Registration:</span>
                        <span className="text-sm font-bold text-slate-800">27AADCB2230M1Z2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Listed Since:</span>
                        <span className="text-sm font-bold text-slate-800">12 Oct 2024</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Content Score:</span>
                        <span className="text-sm font-bold text-emerald-600">85 / 100</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-2">Policies Summary</h3>
                    <div className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-start gap-2">
                        <FileText size={14} className="text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-700">Check-in / Check-out</p>
                          <p className="text-[11px] font-medium text-slate-500 mt-0.5">Check-in from 14:00, Check-out before 11:00.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 mt-2">
                        <FileText size={14} className="text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-700">Cancellation</p>
                          <p className="text-[11px] font-medium text-slate-500 mt-0.5">Free cancellation up to 48 hours before check-in.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0 flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-slate-500">Current Status: {getStatusBadge(selectedProperty.status)}</p>
              </div>
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

export default SuperAdminProperties;
