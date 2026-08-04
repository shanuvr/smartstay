import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, CheckCircle2, ShieldCheck, ArrowRight, Wallet, Info } from 'lucide-react';

const FloatingInput = ({ type = 'text', id, label, required = false, value, onChange }) => (
  <div className="relative">
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

const Payment = () => {
  const navigate = useNavigate();
  const [payoutMethod, setPayoutMethod] = useState('bank');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [bankData, setBankData] = useState({
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    upiId: ''
  });

  const handleChange = (e) => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 3000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="p-6 sm:p-8 flex flex-col items-center justify-center h-full bg-white text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Property Registration Complete!</h1>
        <p className="text-sm font-semibold text-slate-500 mb-8 max-w-md">
          Your property has been registered on SmartStay with zero upfront fees. Your payout bank account is linked for receiving 85% net payouts.
        </p>
        <p className="text-xs font-bold animate-pulse text-[#2563eb]">Redirecting to your Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 flex flex-col justify-start overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-200 bg-white">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">Payout Bank Setup</h1>
          <h2 className="text-[10px] sm:text-[11px] font-bold text-[#2563eb] uppercase tracking-wider mb-1">
            Step 5 of 5
          </h2>
          <p className="text-[11px] sm:text-xs font-semibold text-slate-400">
            Provide bank details to receive guest booking payouts (85% net earnings)
          </p>
        </div>
        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">₹0 Upfront Registration</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Payout Form */}
        <div className="flex-1 space-y-6">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
            Select Payout Transfer Method
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => setPayoutMethod('bank')}
              className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition-all duration-200 ${
                payoutMethod === 'bank' ? 'border-[#2563eb] bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Building2 className={`w-6 h-6 ${payoutMethod === 'bank' ? 'text-[#2563eb]' : 'text-slate-400'}`} />
              <div>
                <span className={`text-xs font-bold block ${payoutMethod === 'bank' ? 'text-[#2563eb]' : 'text-slate-700'}`}>Direct Bank Transfer</span>
                <span className="text-[10px] text-slate-400 font-semibold">NEFT / RTGS Weekly Payouts</span>
              </div>
            </div>
            <div 
              onClick={() => setPayoutMethod('upi')}
              className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition-all duration-200 ${
                payoutMethod === 'upi' ? 'border-[#2563eb] bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Wallet className={`w-6 h-6 ${payoutMethod === 'upi' ? 'text-[#2563eb]' : 'text-slate-400'}`} />
              <div>
                <span className={`text-xs font-bold block ${payoutMethod === 'upi' ? 'text-[#2563eb]' : 'text-slate-700'}`}>Instant UPI Transfer</span>
                <span className="text-[10px] text-slate-400 font-semibold">VPA Instant Settlements</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            
            {payoutMethod === 'bank' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <FloatingInput id="accountName" label="Account Holder Name" value={bankData.accountName} onChange={handleChange} required />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInput id="bankName" label="Bank Name" value={bankData.bankName} onChange={handleChange} required />
                  <FloatingInput id="ifscCode" label="IFSC Code" value={bankData.ifscCode} onChange={handleChange} required />
                </div>
                <FloatingInput id="accountNumber" label="Account Number" type="password" value={bankData.accountNumber} onChange={handleChange} required />
              </div>
            )}

            {payoutMethod === 'upi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <FloatingInput id="upiId" label="Enter UPI VPA ID (e.g. name@okhdfcbank)" value={bankData.upiId} onChange={handleChange} required />
                <p className="text-[11px] font-semibold text-slate-400">Weekly payouts will be automatically credited to this UPI ID.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2563eb] hover:bg-blue-700 text-white text-sm font-bold px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 mt-6"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Save Bank & Finish Listing</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Breakdown Card */}
        <div className="w-full lg:w-80 bg-slate-50 border border-slate-200 rounded-2xl p-6 h-fit shrink-0">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">
            Payout Model Summary
          </h3>
          
          <div className="space-y-3 mb-6 text-xs font-semibold text-slate-600">
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span>Registration Fee</span>
              <span className="font-extrabold text-emerald-600 uppercase">FREE (₹0)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span>SmartStay Commission</span>
              <span className="font-bold text-slate-900">15% per booking</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span>Your Net Earnings</span>
              <span className="font-bold text-slate-900">85% per booking</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>Payout Schedule</span>
              <span className="font-bold text-slate-900">Weekly (Every Mon)</span>
            </div>
          </div>

          <div className="bg-blue-50 text-[#2563eb] text-[11px] font-semibold p-3.5 rounded-xl flex gap-2 border border-blue-100">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <p>SmartStay handles online guest payment processing securely and remits your net payout automatically.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;
