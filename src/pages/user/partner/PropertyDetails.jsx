import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Map } from 'lucide-react';

// Helper component for floating label input
const FloatingInput = ({ type = 'text', id, label, value, onChange, required = false, className = '' }) => (
  <div className={`relative ${className}`}>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      placeholder=" "
      className="block px-2.5 pb-2.5 pt-3 w-full text-xs sm:text-sm font-semibold text-slate-800 bg-transparent rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#2563eb] peer transition-colors shadow-sm"
    />
    <label
      htmlFor={id}
      className="absolute text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 duration-300 transform -translate-y-3.5 scale-75 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#2563eb] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-3.5 left-1 cursor-text"
    >
      {label}
    </label>
  </div>
);

const PropertyDetails = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    location: '',
    subLocation: '',
    pincode: '',
    district: '',
    state: '',
    country: 'India',
    fullAddress: '',
    latitude: '',
    longitude: '',
    contactPerson: '',
    mobileNumber: '',
    gstNumber: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    navigate('/list-your-place/payment');
  };

  const [isLocating, setIsLocating] = useState(false);

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
        
        setFormData(prev => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lon.toString(),
          location: address.suburb || address.neighbourhood || address.city_district || '',
          subLocation: address.road || address.residential || '',
          pincode: address.postcode || '',
          district: address.state_district || address.county || address.city || '',
          state: address.state || '',
          country: address.country || 'India',
          fullAddress: data.display_name || ''
        }));
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



  return (
    <div className="p-6 sm:p-8 flex flex-col justify-start overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-200 bg-white">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">Complete your setup</h1>
          <h2 className="text-[10px] sm:text-[11px] font-bold text-[#2563eb] uppercase tracking-wider mb-1">
            Property Details
          </h2>
          <p className="text-[11px] sm:text-xs font-semibold text-slate-400">
            Fill in the location and compliance details for your listing
          </p>
        </div>
        
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#2563eb] text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-sm active:scale-[0.98] shrink-0 disabled:opacity-50"
        >
          <Navigation className={`w-4 h-4 ${isLocating ? 'animate-pulse' : ''}`} />
          {isLocating ? 'Locating...' : 'Use Current Location'}
        </button>
      </div>

      <form onSubmit={handleContinue} className="space-y-6">
        
        {/* Property Information */}
        <section>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
            Property Information
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <FloatingInput id="propertyName" label="Property Name" value={formData.propertyName} onChange={handleChange} required />
          </div>
        </section>


        {/* Location Details */}
        <section>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
            Location Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <FloatingInput id="location" label="Location" value={formData.location} onChange={handleChange} required />
            <FloatingInput id="subLocation" label="Sub Location" value={formData.subLocation} onChange={handleChange} />
            <FloatingInput id="pincode" label="Pincode" value={formData.pincode} onChange={handleChange} required />
            
            <FloatingInput id="district" label="District" value={formData.district} onChange={handleChange} required />
            <FloatingInput id="state" label="State" value={formData.state} onChange={handleChange} required />
            <FloatingInput id="country" label="Country" value={formData.country} onChange={handleChange} required />
            
            <FloatingInput id="latitude" label="Latitude" value={formData.latitude} onChange={handleChange} className="sm:col-span-1" />
            <FloatingInput id="longitude" label="Longitude" value={formData.longitude} onChange={handleChange} className="sm:col-span-1 md:col-span-2" />
            
            <FloatingInput id="fullAddress" label="Full Address" value={formData.fullAddress} onChange={handleChange} className="sm:col-span-2 md:col-span-3" required />
          </div>
        </section>

        {/* Contact & Compliance */}
        <section>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
            Contact & Licensing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FloatingInput id="contactPerson" label="Contact Person" value={formData.contactPerson} onChange={handleChange} required />
            <FloatingInput id="mobileNumber" label="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
            <FloatingInput id="gstNumber" label="GST Number" value={formData.gstNumber} onChange={handleChange} />
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-hidden relative group">
          <div className="flex items-center gap-2 mb-3">
            <Map className="w-5 h-5 text-[#2563eb]" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Pin Your Location</h3>
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mb-4">
            Click anywhere on the map or drag the marker to set your exact location. All address fields will update automatically.
          </p>
          
          <div className="w-full h-64 bg-slate-200 rounded-lg flex items-center justify-center relative overflow-hidden">
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
                className="absolute inset-0"
              ></iframe>
            ) : (
              <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=20.5937,78.9629&zoom=5&size=800x400&sensor=false')] bg-cover bg-center mix-blend-multiply" />
            )}
            <div className="absolute inset-0 bg-blue-900/5 pointer-events-none" />
            
            {!formData.latitude && (
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="bg-[#2563eb] text-white p-2 rounded-full shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="w-2 h-2 bg-black/30 rounded-full mt-1 blur-[1px]"></div>
              </div>
            )}
            
            <div className="absolute bottom-2 right-2 z-10">
              <span className="bg-white/80 backdrop-blur text-[9px] font-bold px-2 py-1 rounded text-slate-600 shadow-sm">
                Map View
              </span>
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4 border-t border-slate-100 shrink-0">
          <button
            type="submit"
            className="bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-8 py-3 rounded-xl transition-all shadow-md active:scale-[0.98]"
          >
            Continue to Payment
          </button>
        </div>

      </form>
    </div>
  );
};

export default PropertyDetails;
