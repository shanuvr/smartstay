import React, { useState } from 'react';
import { ShieldCheck, Save, CheckCircle2, Clock, Ban, AlertCircle } from 'lucide-react';

const Policies = () => {
  const [successMessage, setSuccessMessage] = useState('');
  
  const [rules, setRules] = useState({
    checkInTime: '14:00',
    checkOutTime: '11:00',
    earlyCheckIn: 'on-request',
    lateCheckOut: 'on-request',
    cancellationPolicy: 'flexible', // flexible, moderate, strict
    unmarriedCouples: 'allowed', // allowed, restricted
    petsAllowed: 'no', // yes, no, request
    smokingAllowed: 'no',
    idRequired: 'yes',
    extraBedCharges: 1000
  });

  const handleChange = (e) => {
    setRules({ ...rules, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('Property policies updated successfully. They will be displayed on the guest listing cards.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="text-blue-600" size={22} />
            House Rules & Policies
          </h2>
          <p className="text-sm text-slate-500 mt-1">Define check-in timings, guest restrictions, and cancellation rules.</p>
        </div>
        
        <button 
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors self-start shadow-sm"
        >
          <Save size={16} />
          Save Policies
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-xl text-green-800 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Checkin / Checkout Timings */}
        <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200/60 pb-2 flex items-center gap-1.5">
            <Clock size={14} className="text-blue-600" /> Timing Guidelines
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Check-in Time (After)</label>
              <select
                name="checkInTime"
                value={rules.checkInTime}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-850 font-semibold cursor-pointer"
              >
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Check-out Time (Before)</label>
              <select
                name="checkOutTime"
                value={rules.checkOutTime}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-850 font-semibold cursor-pointer"
              >
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Early Check-in Option</label>
              <div className="flex gap-4 mt-1">
                {[
                  { value: 'yes', label: 'Allowed (Free)' },
                  { value: 'no', label: 'Not Allowed' },
                  { value: 'on-request', label: 'Subject to Availability' }
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-705">
                    <input
                      type="radio"
                      name="earlyCheckIn"
                      value={opt.value}
                      checked={rules.earlyCheckIn === opt.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Late Check-out Option</label>
              <div className="flex gap-4 mt-1">
                {[
                  { value: 'yes', label: 'Allowed (Free)' },
                  { value: 'no', label: 'Not Allowed' },
                  { value: 'on-request', label: 'Subject to Availability' }
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-705">
                    <input
                      type="radio"
                      name="lateCheckOut"
                      value={opt.value}
                      checked={rules.lateCheckOut === opt.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation and Booking Rules */}
        <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200/60 pb-2 flex items-center gap-1.5">
            <Ban size={14} className="text-blue-600" /> Booking Cancellations
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Cancellation Policy</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'flexible', title: 'Flexible (Free Cancel)', desc: 'Free cancellation up to 24 hours before check-in.' },
                  { value: 'moderate', title: 'Moderate (5 Days)', desc: 'Free cancellation up to 5 days before check-in.' },
                  { value: 'strict', title: 'Strict (Non-Refundable)', desc: 'No refunds on cancellations once booking is verified.' }
                ].map(pol => (
                  <button
                    key={pol.value}
                    type="button"
                    onClick={() => setRules({ ...rules, cancellationPolicy: pol.value })}
                    className={`flex flex-col p-4 border rounded-2xl transition-all text-left ${rules.cancellationPolicy === pol.value ? 'border-blue-600 bg-blue-50/20 text-blue-700 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                  >
                    <span className="text-xs font-bold text-slate-800">{pol.title}</span>
                    <span className="text-[10px] text-slate-400 mt-1">{pol.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Guest Rules & Restrictions */}
        <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200/60 pb-2 flex items-center gap-1.5">
            <AlertCircle size={14} className="text-blue-600" /> Guest Restrictions & House Rules
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Unmarried Couples */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block">Unmarried Couples</label>
              <div className="flex gap-4">
                {[
                  { value: 'allowed', label: 'Allowed' },
                  { value: 'restricted', label: 'Not Allowed' }
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="unmarriedCouples"
                      value={opt.value}
                      checked={rules.unmarriedCouples === opt.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Pets Allowed */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block">Pets Allowed</label>
              <div className="flex gap-4">
                {[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'request', label: 'On Request Only' }
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="petsAllowed"
                      value={opt.value}
                      checked={rules.petsAllowed === opt.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Smoking */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block">Smoking Inside Rooms</label>
              <div className="flex gap-4">
                {[
                  { value: 'yes', label: 'Allowed' },
                  { value: 'no', label: 'Not Allowed' }
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="smokingAllowed"
                      value={opt.value}
                      checked={rules.smokingAllowed === opt.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ID Required */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block">Physical ID Proof Required at Check-in</label>
              <div className="flex gap-4">
                {[
                  { value: 'yes', label: 'Yes (Aadhaar / Voter ID / Passport)' },
                  { value: 'no', label: 'No' }
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="idRequired"
                      value={opt.value}
                      checked={rules.idRequired === opt.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Extra Bed Charges */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-600">Extra Guest / Bed Charge (Per Night)</label>
              <div className="relative max-w-xs">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                <input
                  type="number"
                  name="extraBedCharges"
                  value={rules.extraBedCharges}
                  onChange={handleChange}
                  required
                  className="w-full pl-7 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-850 font-bold"
                />
              </div>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
};

export default Policies;
