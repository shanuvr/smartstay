import React, { useState } from 'react';
import { Phone, Save, CheckCircle2, Mail, Globe } from 'lucide-react';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const ContactInfo = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    contactPerson: 'Aarav Sharma',
    mobileNumber: '+91 98765 43210',
    altMobileNumber: '+91 98765 43211',
    bookingEmail: 'bookings@smartstaygrand.com',
    receptionPhone: '+91 22 2640 1234',
    supportEmail: 'support@smartstaygrand.com',
    websiteUrl: 'https://smartstaygrand.com',
    facebookPage: 'https://facebook.com/smartstaygrand',
    instagramPage: 'https://instagram.com/smartstaygrand'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('Contact details updated successfully.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 lg:p-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-5 md:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 md:pb-5">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2">
            <Phone className="text-blue-600 w-5 h-5 md:w-[22px] md:h-[22px]" />
            Contact Information
          </h2>
          <p className="text-[11px] md:text-sm text-slate-500 mt-1">Configure contact numbers, emails, and channels for guest inquiries.</p>
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
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-xl text-green-800 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Primary Contact details */}
        <div className="bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl p-4 md:p-6 space-y-4">
          <h3 className="text-[10px] md:text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200/60 pb-2 flex items-center gap-1.5">
            <Phone size={14} className="text-blue-600" /> Primary Contact Person
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="relative">
              <input 
                type="text" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required 
                className="block px-3 py-2 md:px-4 pb-2 pt-5 w-full text-xs md:text-sm text-slate-850 bg-white border border-slate-200 rounded-lg md:rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" "
              />
              <label htmlFor="contactPerson" className="absolute text-[11px] md:text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 md:top-3.5 z-10 origin-[0] left-3 md:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Contact Person Name</label>
            </div>
            
            <div className="relative">
              <input 
                type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required 
                className="block px-3 py-2 md:px-4 pb-2 pt-5 w-full text-xs md:text-sm text-slate-850 bg-white border border-slate-200 rounded-lg md:rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" "
              />
              <label htmlFor="mobileNumber" className="absolute text-[11px] md:text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 md:top-3.5 z-10 origin-[0] left-3 md:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Mobile Number</label>
            </div>

            <div className="relative">
              <input 
                type="text" id="altMobileNumber" name="altMobileNumber" value={formData.altMobileNumber} onChange={handleChange} 
                className="block px-3 py-2 md:px-4 pb-2 pt-5 w-full text-xs md:text-sm text-slate-850 bg-white border border-slate-200 rounded-lg md:rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" "
              />
              <label htmlFor="altMobileNumber" className="absolute text-[11px] md:text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 md:top-3.5 z-10 origin-[0] left-3 md:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Alternate Mobile Number</label>
            </div>

            <div className="relative">
              <input 
                type="email" id="bookingEmail" name="bookingEmail" value={formData.bookingEmail} onChange={handleChange} required 
                className="block px-3 py-2 md:px-4 pb-2 pt-5 w-full text-xs md:text-sm text-slate-850 bg-white border border-slate-200 rounded-lg md:rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" "
              />
              <label htmlFor="bookingEmail" className="absolute text-[11px] md:text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 md:top-3.5 z-10 origin-[0] left-3 md:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Booking Notification Email</label>
            </div>
          </div>
        </div>

        {/* Property Operations contact */}
        <div className="bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl p-4 md:p-6 space-y-4">
          <h3 className="text-[10px] md:text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200/60 pb-2 flex items-center gap-1.5">
            <Mail size={14} className="text-blue-600" /> Front Desk & Support
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="relative">
              <input 
                type="text" id="receptionPhone" name="receptionPhone" value={formData.receptionPhone} onChange={handleChange} 
                className="block px-3 py-2 md:px-4 pb-2 pt-5 w-full text-xs md:text-sm text-slate-850 bg-white border border-slate-200 rounded-lg md:rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" "
              />
              <label htmlFor="receptionPhone" className="absolute text-[11px] md:text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 md:top-3.5 z-10 origin-[0] left-3 md:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Reception Landline Number</label>
            </div>

            <div className="relative">
              <input 
                type="email" id="supportEmail" name="supportEmail" value={formData.supportEmail} onChange={handleChange} required 
                className="block px-3 py-2 md:px-4 pb-2 pt-5 w-full text-xs md:text-sm text-slate-850 bg-white border border-slate-200 rounded-lg md:rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" placeholder=" "
              />
              <label htmlFor="supportEmail" className="absolute text-[11px] md:text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 md:top-3.5 z-10 origin-[0] left-3 md:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Customer Support Email</label>
            </div>
          </div>
        </div>

        {/* Social media / channels */}
        <div className="bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl p-4 md:p-6 space-y-4">
          <h3 className="text-[10px] md:text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200/60 pb-2 flex items-center gap-1.5">
            <Globe size={14} className="text-blue-600" /> Online Channels
          </h3>
          
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-2 md:p-2.5 bg-white border border-slate-200 rounded-lg md:rounded-xl text-slate-400">
                <Globe className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              </div>
              <div className="relative flex-1">
                <input 
                  type="url" id="websiteUrl" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} placeholder=" "
                  className="block px-3 py-2 md:px-4 pb-2 pt-5 w-full text-xs md:text-sm text-slate-850 bg-white border border-slate-200 rounded-lg md:rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" 
                />
                <label htmlFor="websiteUrl" className="absolute text-[11px] md:text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 md:top-3.5 z-10 origin-[0] left-3 md:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Website URL (e.g. https://yourhotel.com)</label>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-2 md:p-2.5 bg-white border border-slate-200 rounded-lg md:rounded-xl text-slate-400">
                <FacebookIcon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              </div>
              <div className="relative flex-1">
                <input 
                  type="url" id="facebookPage" name="facebookPage" value={formData.facebookPage} onChange={handleChange} placeholder=" "
                  className="block px-3 py-2 md:px-4 pb-2 pt-5 w-full text-xs md:text-sm text-slate-850 bg-white border border-slate-200 rounded-lg md:rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" 
                />
                <label htmlFor="facebookPage" className="absolute text-[11px] md:text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 md:top-3.5 z-10 origin-[0] left-3 md:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Facebook Page Link</label>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-2 md:p-2.5 bg-white border border-slate-200 rounded-lg md:rounded-xl text-slate-400">
                <InstagramIcon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              </div>
              <div className="relative flex-1">
                <input 
                  type="url" id="instagramPage" name="instagramPage" value={formData.instagramPage} onChange={handleChange} placeholder=" "
                  className="block px-3 py-2 md:px-4 pb-2 pt-5 w-full text-xs md:text-sm text-slate-850 bg-white border border-slate-200 rounded-lg md:rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 peer font-medium" 
                />
                <label htmlFor="instagramPage" className="absolute text-[11px] md:text-xs text-slate-500 font-semibold duration-300 transform -translate-y-3 scale-75 top-3.5 md:top-3.5 z-10 origin-[0] left-3 md:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600">Instagram Profile Link</label>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default ContactInfo;
