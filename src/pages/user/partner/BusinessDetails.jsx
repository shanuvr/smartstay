import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const BusinessDetails = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    mobileNumber: '',
    email: '',
    otp: '',
    ownerAddress: ''
  });
  
  const [otpSent, setOtpSent] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = () => {
    if (formData.email) {
      setOtpSent(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    navigate('/list-your-place/package');
  };

  return (
    <div className="p-6 sm:p-8 flex flex-col justify-start overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-200 bg-white relative">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4 z-50">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <div className="flex flex-col">
            <span className="text-sm font-bold">OTP Sent Successfully</span>
            <span className="text-xs font-semibold text-emerald-600/80">Code sent to {formData.email}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">Register</h1>
        <h2 className="text-[10px] sm:text-[11px] font-bold text-[#2563eb] uppercase tracking-wider mb-1">
          Your Business Details
        </h2>
        <p className="text-[11px] sm:text-xs font-semibold text-slate-400">
          Enter your primary contact and property information
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleContinue} className="space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
              placeholder=" "
              className="block px-2.5 pb-2.5 pt-3 w-full text-xs sm:text-sm font-semibold text-slate-800 bg-transparent rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#2563eb] peer transition-colors shadow-sm"
            />
            <label
              htmlFor="ownerName"
              className="absolute text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 duration-300 transform -translate-y-3.5 scale-75 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#2563eb] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-3.5 left-1 cursor-text"
            >
              Owner Name
            </label>
          </div>
          
          <div className="relative">
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              placeholder=" "
              className="block px-2.5 pb-2.5 pt-3 w-full text-xs sm:text-sm font-semibold text-slate-800 bg-transparent rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#2563eb] peer transition-colors shadow-sm"
            />
            <label
              htmlFor="mobileNumber"
              className="absolute text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 duration-300 transform -translate-y-3.5 scale-75 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#2563eb] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-3.5 left-1 cursor-text"
            >
              Mobile Number
            </label>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
              className="block px-2.5 pb-2.5 pt-3 w-full text-xs sm:text-sm font-semibold text-slate-800 bg-transparent rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#2563eb] peer transition-colors shadow-sm"
            />
            <label
              htmlFor="email"
              className="absolute text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 duration-300 transform -translate-y-3.5 scale-75 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#2563eb] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-3.5 left-1 cursor-text"
            >
              Email Address
            </label>
          </div>
          <button
            type="button"
            onClick={handleSendOtp}
            className="shrink-0 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-sm active:scale-[0.98]"
          >
            Send OTP
          </button>
        </div>

        <div className="relative animate-in fade-in slide-in-from-top-2">
          <input
            type="text"
            id="otp"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            required
            disabled={!otpSent}
            placeholder=" "
            className={`block px-2.5 pb-2.5 pt-3 w-full text-xs sm:text-sm font-semibold text-slate-800 rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-[#2563eb] peer transition-colors shadow-sm ${!otpSent ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed' : 'bg-transparent border-slate-200'}`}
          />
          <label
            htmlFor="otp"
            className="absolute text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 duration-300 transform -translate-y-3.5 scale-75 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#2563eb] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-3.5 left-1 cursor-text"
          >
            Verify OTP
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-1">
          <div className="relative">
            <input
              type="text"
              id="ownerAddress"
              name="ownerAddress"
              value={formData.ownerAddress}
              onChange={handleChange}
              required
              placeholder=" "
              className="block px-2.5 pb-2.5 pt-3 w-full text-xs sm:text-sm font-semibold text-slate-800 bg-transparent rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#2563eb] peer transition-colors shadow-sm"
            />
            <label
              htmlFor="ownerAddress"
              className="absolute text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 duration-300 transform -translate-y-3.5 scale-75 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#2563eb] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-3.5 left-1 cursor-text"
            >
              Owner's Residential Address
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 mt-2 shrink-0">
          <button
            type="submit"
            className="bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-all shadow-sm active:scale-[0.98]"
          >
            Continue
          </button>
        </div>

      </form>
    </div>
  );
};

export default BusinessDetails;
