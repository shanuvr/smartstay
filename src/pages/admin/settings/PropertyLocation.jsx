import React, { useState } from 'react';
import { MapPin, Navigation, Map, Save } from 'lucide-react';

const PropertyLocation = () => {
  const [formData, setFormData] = useState({
    location: 'Bandra West',
    subLocation: 'Linking Road',
    pincode: '400050',
    district: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    fullAddress: 'SmartStay Grand Hotel, Linking Road, Bandra West, Mumbai, Maharashtra, 400050',
    latitude: '19.0583',
    longitude: '72.8302'
  });

  const [isLocating, setIsLocating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const data = await response.json();
        
        const address = data.address || {};
        
        setFormData({
          latitude: lat.toString(),
          longitude: lon.toString(),
          location: address.suburb || address.neighbourhood || address.city_district || '',
          subLocation: address.road || address.residential || '',
          pincode: address.postcode || '',
          district: address.state_district || address.county || address.city || '',
          state: address.state || '',
          country: address.country || 'India',
          fullAddress: data.display_name || ''
        });
      } catch (error) {
        console.error("Error fetching address details:", error);
        alert("Could not fetch address details. Please fill manually.");
      } finally {
        setIsLocating(false);
      }
    }, (error) => {
      console.error("Error getting location:", error);
      alert("Could not get your location. Please check your browser permissions.");
      setIsLocating(false);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('Location details updated successfully.');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 animate-in fade-in duration-300">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Property Location</h2>
          <p className="text-sm text-slate-500 mt-1">Manage physical address coordinates and map pinning.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-blue-600 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm disabled:opacity-50"
          >
            <Navigation className={`w-4 h-4 ${isLocating ? 'animate-pulse' : ''}`} />
            {isLocating ? 'Locating...' : 'Detect Current Location'}
          </button>
          
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-xl text-green-800 text-sm font-semibold animate-in slide-in-from-top-2 duration-300">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div className="relative">
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required className="block px-4 pb-2 pt-5 w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" " />
            <label htmlFor="location" className="absolute text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Location</label>
          </div>

          <div className="relative">
            <input type="text" id="subLocation" name="subLocation" value={formData.subLocation} onChange={handleChange} className="block px-4 pb-2 pt-5 w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" " />
            <label htmlFor="subLocation" className="absolute text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Sub Location</label>
          </div>

          <div className="relative">
            <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} required className="block px-4 pb-2 pt-5 w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" " />
            <label htmlFor="pincode" className="absolute text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Pincode</label>
          </div>

          <div className="relative">
            <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} required className="block px-4 pb-2 pt-5 w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" " />
            <label htmlFor="district" className="absolute text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">District</label>
          </div>

          <div className="relative">
            <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required className="block px-4 pb-2 pt-5 w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" " />
            <label htmlFor="state" className="absolute text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">State</label>
          </div>

          <div className="relative">
            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required className="block px-4 pb-2 pt-5 w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" " />
            <label htmlFor="country" className="absolute text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Country</label>
          </div>

          <div className="relative">
            <input type="text" id="latitude" name="latitude" value={formData.latitude} onChange={handleChange} className="block px-4 pb-2 pt-5 w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" " />
            <label htmlFor="latitude" className="absolute text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Latitude</label>
          </div>

          <div className="relative sm:col-span-1 md:col-span-2">
            <input type="text" id="longitude" name="longitude" value={formData.longitude} onChange={handleChange} className="block px-4 pb-2 pt-5 w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" " />
            <label htmlFor="longitude" className="absolute text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Longitude</label>
          </div>

          <div className="relative sm:col-span-2 md:col-span-3">
            <input type="text" id="fullAddress" name="fullAddress" value={formData.fullAddress} onChange={handleChange} required className="block px-4 pb-2 pt-5 w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" " />
            <label htmlFor="fullAddress" className="absolute text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Full Address</label>
          </div>
        </div>

        {/* Map Preview */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <Map className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-800">Pin Your Location</h3>
          </div>
          
          <div className="w-full h-72 bg-slate-200 rounded-xl flex items-center justify-center relative overflow-hidden">
            {formData.latitude && formData.longitude ? (
              <iframe
                title="OpenStreetMap"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(formData.longitude)-0.005},${parseFloat(formData.latitude)-0.005},${parseFloat(formData.longitude)+0.005},${parseFloat(formData.latitude)+0.005}&layer=mapnik&marker=${formData.latitude},${formData.longitude}`}
                className="absolute inset-0 border-0"
              ></iframe>
            ) : (
              <div className="text-slate-400 text-xs font-bold">Please specify Latitude and Longitude to view map.</div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyLocation;
