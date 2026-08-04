import React, { useState } from 'react';
import { X, UploadCloud } from 'lucide-react';

const CreateRoomModal = ({ isOpen, onClose }) => {
  const [amenities, setAmenities] = useState({
    wifi: true,
    ac: true,
    tv: false,
    minibar: false,
    breakfast: false,
  });

  if (!isOpen) return null;

  const toggleAmenity = (key) => setAmenities(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <h2 className="text-lg font-bold text-slate-800">Create New Room</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
          
          {/* Basic Details */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-800 mb-3 uppercase tracking-widest bg-slate-50 inline-block px-3 py-1 rounded-md">Basic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 relative">
                <input type="text" id="room_name" className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 peer" placeholder=" " />
                <label htmlFor="room_name" className="absolute text-sm text-slate-500 duration-200 transform -translate-y-4 scale-[0.8] top-2 z-10 origin-[0] bg-white px-1 peer-focus:px-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:-translate-y-4 left-3 cursor-text">
                  Room Name (e.g. Superior Room, 1 King Bed)
                </label>
              </div>
              <div className="relative">
                <input type="number" id="room_size" className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 peer" placeholder=" " />
                <label htmlFor="room_size" className="absolute text-sm text-slate-500 duration-200 transform -translate-y-4 scale-[0.8] top-2 z-10 origin-[0] bg-white px-1 peer-focus:px-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:-translate-y-4 left-3 cursor-text">
                  Room Size (sq.m)
                </label>
              </div>
              <div className="relative">
                <select id="room_view" className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 peer" defaultValue="">
                  <option value="" disabled hidden></option>
                  <option value="city">City View</option>
                  <option value="pool">Pool View</option>
                  <option value="garden">Garden View</option>
                  <option value="ocean">Ocean View</option>
                </select>
                <label htmlFor="room_view" className="absolute text-sm text-slate-500 duration-200 transform -translate-y-4 scale-[0.8] top-2 z-10 origin-[0] bg-white px-1 peer-focus:px-1 peer-focus:text-blue-600 left-3 cursor-pointer">
                  Room View
                </label>
              </div>
            </div>
          </div>

          {/* Occupancy & Beds */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-800 mb-3 uppercase tracking-widest bg-slate-50 inline-block px-3 py-1 rounded-md">Occupancy & Beds</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input type="number" id="max_adults" defaultValue={2} className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 peer" placeholder=" " />
                <label htmlFor="max_adults" className="absolute text-sm text-slate-500 duration-200 transform -translate-y-4 scale-[0.8] top-2 z-10 origin-[0] bg-white px-1 peer-focus:px-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:-translate-y-4 left-3 cursor-text">
                  Max Adults
                </label>
              </div>
              <div className="relative">
                <input type="number" id="max_children" defaultValue={1} className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 peer" placeholder=" " />
                <label htmlFor="max_children" className="absolute text-sm text-slate-500 duration-200 transform -translate-y-4 scale-[0.8] top-2 z-10 origin-[0] bg-white px-1 peer-focus:px-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:-translate-y-4 left-3 cursor-text">
                  Max Children
                </label>
              </div>
              <div className="relative">
                <select id="bed_type" className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 peer" defaultValue="king">
                  <option value="king">1 King Bed</option>
                  <option value="queen">1 Queen Bed</option>
                  <option value="twin">2 Single Beds</option>
                  <option value="double">1 Double Bed</option>
                </select>
                <label htmlFor="bed_type" className="absolute text-sm text-slate-500 duration-200 transform -translate-y-4 scale-[0.8] top-2 z-10 origin-[0] bg-white px-1 peer-focus:px-1 peer-focus:text-blue-600 left-3 cursor-pointer">
                  Bed Type
                </label>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-800 mb-3 uppercase tracking-widest bg-slate-50 inline-block px-3 py-1 rounded-md">Pricing & Inventory</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input type="number" id="base_rate" className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 peer" placeholder=" " />
                <label htmlFor="base_rate" className="absolute text-sm text-slate-500 duration-200 transform -translate-y-4 scale-[0.8] top-2 z-10 origin-[0] bg-white px-1 peer-focus:px-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:-translate-y-4 left-3 cursor-text">
                  Base Rate (₹ per night)
                </label>
              </div>
              <div className="relative">
                <input type="number" id="num_units" defaultValue={5} className="block px-4 pb-2.5 pt-4 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 peer" placeholder=" " />
                <label htmlFor="num_units" className="absolute text-sm text-slate-500 duration-200 transform -translate-y-4 scale-[0.8] top-2 z-10 origin-[0] bg-white px-1 peer-focus:px-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:-translate-y-4 left-3 cursor-text">
                  Number of Units Available
                </label>
              </div>
            </div>
          </div>

          {/* Amenities & Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h3 className="text-[11px] font-bold text-slate-800 mb-3 uppercase tracking-widest bg-slate-50 inline-block px-3 py-1 rounded-md">Room Amenities</h3>
              <div className="space-y-3 pl-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={amenities.wifi} onChange={() => toggleAmenity('wifi')} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Free Wi-Fi</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={amenities.ac} onChange={() => toggleAmenity('ac')} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Air Conditioning</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={amenities.tv} onChange={() => toggleAmenity('tv')} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Flat-screen TV</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={amenities.minibar} onChange={() => toggleAmenity('minibar')} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Mini Bar</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={amenities.breakfast} onChange={() => toggleAmenity('breakfast')} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Free Breakfast Included</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-slate-800 mb-3 uppercase tracking-widest bg-slate-50 inline-block px-3 py-1 rounded-md">Room Photo</h3>
              <div className="w-full h-[140px] border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-blue-500 transition-colors cursor-pointer bg-slate-50/50 hover:bg-blue-50/50 group">
                <UploadCloud size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-slate-500 group-hover:text-blue-600">Upload thumbnail</span>
                <span className="text-xs text-slate-400 mt-1 font-medium">JPG, PNG up to 2MB</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-white shrink-0">
          <button onClick={onClose} className="px-5 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-sm shadow-blue-600/20">
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;
