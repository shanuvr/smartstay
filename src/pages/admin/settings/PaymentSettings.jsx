import React, { useState } from 'react';
import { CreditCard, Save, CheckCircle2, ShieldCheck, AlertCircle, Building2, Key } from 'lucide-react';

const PaymentSettings = () => {
  const [settlementType, setSettlementType] = useState('bank'); // bank or upi
  const [successMessage, setSuccessMessage] = useState('');

  // Bank state
  const [bankDetails, setBankDetails] = useState({
    accountHolder: 'SmartStay Grand Hotel Private Limited',
    bankName: 'HDFC Bank',
    accountNumber: '50200012345678',
    ifscCode: 'HDFC0000053',
    accountType: 'Current'
  });

  // UPI state
  const [upiDetails, setUpiDetails] = useState({
    upiId: 'smartstaygrand@okhdfcbank',
    merchantName: 'SmartStay Grand Hotel'
  });

  const handleBankChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  const handleUpiChange = (e) => {
    setUpiDetails({ ...upiDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('Settlement details updated successfully. Guest payments will now route to this destination.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Settlement Accounts</h2>
          <p className="text-sm text-slate-500 mt-1">Configure where guest payments should be deposited directly.</p>
        </div>
        
        <button 
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors self-start shadow-sm"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-xl text-green-800 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Security alert */}
      <div className="mb-6 bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-800 text-xs font-semibold flex items-start gap-2.5 shadow-sm">
        <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Direct Settlements Encrypted</p>
          <p className="text-[11px] text-blue-700/90 font-medium mt-0.5">
            Your settlement details are encrypted before processing. All funds received from guest reservations bypass SmartStay and deposit straight into this account.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Method Picker */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 block">Select Settlement Destination</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Bank Transfer Option */}
            <button
              type="button"
              onClick={() => setSettlementType('bank')}
              className={`flex items-start gap-4 p-4 border rounded-2xl transition-all text-left ${settlementType === 'bank' ? 'border-blue-600 bg-blue-50/20 text-blue-700 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
            >
              <div className={`p-2.5 rounded-xl ${settlementType === 'bank' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                <Building2 size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Direct Bank Transfer</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Deposit directly into your Current/Savings account.</p>
              </div>
            </button>

            {/* UPI Option */}
            <button
              type="button"
              onClick={() => setSettlementType('upi')}
              className={`flex items-start gap-4 p-4 border rounded-2xl transition-all text-left ${settlementType === 'upi' ? 'border-blue-600 bg-blue-50/20 text-blue-700 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
            >
              <div className={`p-2.5 rounded-xl ${settlementType === 'upi' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                <CreditCard size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">UPI Instant Settlement</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Receive immediate deposits via GPay, PhonePe, or BHIM.</p>
              </div>
            </button>
            
          </div>
        </div>

        {/* Dynamic Fields */}
        {settlementType === 'bank' ? (
          <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4 animate-in fade-in duration-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200/60 pb-2">
              Bank Account Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Account Holder Name</label>
                <input 
                  type="text" 
                  name="accountHolder" 
                  value={bankDetails.accountHolder} 
                  onChange={handleBankChange}
                  required 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-850 font-medium" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Bank Name</label>
                <input 
                  type="text" 
                  name="bankName" 
                  value={bankDetails.bankName} 
                  onChange={handleBankChange}
                  required 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-850 font-medium" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Account Number</label>
                <input 
                  type="text" 
                  name="accountNumber" 
                  value={bankDetails.accountNumber} 
                  onChange={handleBankChange}
                  required 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-850 font-medium" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">IFSC Code</label>
                <input 
                  type="text" 
                  name="ifscCode" 
                  value={bankDetails.ifscCode} 
                  onChange={handleBankChange}
                  required 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-850 font-medium" 
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Account Type</label>
                <div className="flex gap-4 mt-1">
                  {['Savings', 'Current'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                      <input 
                        type="radio" 
                        name="accountType" 
                        value={type} 
                        checked={bankDetails.accountType === type}
                        onChange={handleBankChange}
                        className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" 
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4 animate-in fade-in duration-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200/60 pb-2">
              UPI Address Configuration
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">UPI ID / Virtual Payment Address (VPA)</label>
                <input 
                  type="text" 
                  name="upiId" 
                  value={upiDetails.upiId} 
                  onChange={handleUpiChange}
                  placeholder="e.g. name@upi"
                  required 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-850 font-medium" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Registered Merchant Name</label>
                <input 
                  type="text" 
                  name="merchantName" 
                  value={upiDetails.merchantName} 
                  onChange={handleUpiChange}
                  required 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-850 font-medium" 
                />
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
};

export default PaymentSettings;
