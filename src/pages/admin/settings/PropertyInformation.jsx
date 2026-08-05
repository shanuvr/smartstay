import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';

const PropertyInformation = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('Property information updated successfully.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 lg:p-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-5 md:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 md:pb-5">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-800">Property Information</h2>
          <p className="text-[11px] md:text-sm text-slate-500 mt-1">Update your property's basic details and descriptions.</p>
        </div>
        <button 
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-colors self-start shadow-sm"
        >
          <Save className="w-4 h-4 md:w-5 md:h-5" />
          Save Changes
        </button>
      </div>

      {successMessage && (
        <div className="mb-5 md:mb-6 bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-lg md:rounded-xl text-green-800 text-[11px] md:text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        
        {/* Basic Information section */}
        <div className="bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl p-4 md:p-6 space-y-4">
          <h3 className="text-[10px] md:text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200/60 pb-2">
            General Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] md:text-xs font-semibold text-slate-600">Property Name</label>
              <input 
                type="text" 
                required 
                className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-850 font-medium" 
                defaultValue="SmartStay Grand Hotel" 
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[11px] md:text-xs font-semibold text-slate-600">Property Type</label>
              <div className="relative">
                <select className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-850 font-semibold appearance-none cursor-pointer">
                  <option>Hotel</option>
                  <option>Resort</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                </select>
                <div className="pointer-events-none absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                  ↓
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] md:text-xs font-semibold text-slate-600">Description</label>
            <textarea 
              rows={5} 
              className="w-full px-3 py-2 md:px-4 md:py-3 bg-white border border-slate-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-slate-700 leading-relaxed" 
              defaultValue="Experience luxury and comfort at SmartStay Grand Hotel. Located in the heart of the city, we offer premium amenities, high-speed connectivity, and world-class hospitality."
            ></textarea>
          </div>
        </div>

      </form>
    </div>
  );
};

export default PropertyInformation;
