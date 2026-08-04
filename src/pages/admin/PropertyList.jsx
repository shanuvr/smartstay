import React from 'react';
import { Search, Plus, MoreVertical, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PropertyList = () => {
  const navigate = useNavigate();

  const properties = [
    {
      id: '63270996',
      name: 'Joys Stay',
      status: 'Active',
      location: 'Thrissur, India',
      revenue: 'N/A',
      adr: 'N/A',
      contentScore: '80/100',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop',
    }
  ];

  const handlePropertyClick = (propertyId) => {
    // Navigate to dashboard when clicking a property
    navigate(`/admin/dashboard`);
  };

  return (
    <div className="p-4 md:p-8 min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="w-full h-full min-h-[calc(100vh-8rem)] p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Listings</h1>
        <button 
          onClick={() => navigate('/list-your-place')}
          className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors"
        >
          <Plus size={18} />
          List a property
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search for a property" 
            className="w-full pl-10 pr-4 py-2.5 bg-[#f8f9fa] border border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-700 placeholder:text-slate-400 font-medium"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-sm font-medium text-slate-500">Filters:</span>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Status <ChevronDown size={14} className="text-slate-400" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            All countries <ChevronDown size={14} className="text-slate-400" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            All cities <ChevronDown size={14} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8f9fa] border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Name <ChevronDown size={12} className="inline ml-1 opacity-50" /></th>
              <th className="px-6 py-4 text-center">Revenue (MTD) <ChevronDown size={12} className="inline ml-1 opacity-50" /></th>
              <th className="px-6 py-4 text-center">Avg daily rate (MTD) <ChevronDown size={12} className="inline ml-1 opacity-50" /></th>
              <th className="px-6 py-4 text-center">Content score <ChevronDown size={12} className="inline ml-1 opacity-50" /></th>
              <th className="px-6 py-4 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {properties.map((property) => (
              <tr 
                key={property.id} 
                className="hover:bg-slate-50 cursor-pointer transition-colors group bg-white"
                onClick={() => handlePropertyClick(property.id)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={property.image} alt={property.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                    <div>
                      <h3 className="text-[15px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{property.name}</h3>
                      <div className="flex items-center gap-2 text-[13px] text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {property.status}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span>{property.id}</span>
                        <span className="text-slate-300">·</span>
                        <span>{property.location}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-slate-300 text-sm font-medium">{property.revenue}</td>
                <td className="px-6 py-4 text-center text-slate-300 text-sm font-medium">{property.adr}</td>
                <td className="px-6 py-4 text-center text-sm font-medium text-slate-600">{property.contentScore}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500">Show</span>
          <button className="flex items-center gap-2 px-4 py-1.5 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            10 <ChevronDown size={14} className="text-slate-400" />
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-1 text-slate-300 cursor-not-allowed" disabled>
            <ChevronLeft size={20} />
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-md border border-blue-600 bg-blue-50 text-blue-600 text-sm font-semibold mx-1">
            1
          </button>
          <button className="p-1 text-slate-300 cursor-not-allowed" disabled>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PropertyList;
