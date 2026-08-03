import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Building, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';

const FloatingInput = ({ type = 'text', id, label, required = false, maxLength, pattern }) => (
  <div className="relative">
    <input
      type={type}
      id={id}
      name={id}
      required={required}
      maxLength={maxLength}
      pattern={pattern}
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
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock order details
  const orderDetails = {
    planName: '6 Months Listing Plan',
    price: 1000,
    gst: 180,
    total: 1180
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };



  if (isSuccess) {
    return (
      <div className="p-6 sm:p-8 flex flex-col items-center justify-center h-full bg-white text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Payment Successful!</h1>
        <p className="text-sm font-semibold text-slate-500 mb-8 max-w-sm">
          Your property has been successfully submitted and your subscription is active. Welcome to SmartStay Partner!
        </p>
        <p className="text-xs font-bold animate-pulse text-[#2563eb]">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 flex flex-col justify-start overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-200 bg-white">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">Secure Checkout</h1>
          <h2 className="text-[10px] sm:text-[11px] font-bold text-[#2563eb] uppercase tracking-wider mb-1">
            Step 5 of 5
          </h2>
          <p className="text-[11px] sm:text-xs font-semibold text-slate-400">
            Complete your payment to activate your property listing
          </p>
        </div>
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">100% Secure</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Payment Methods & Form */}
        <div className="flex-1 space-y-6">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
            Select Payment Method
          </h3>
          
          <div className="grid grid-cols-3 gap-3">
            <div 
              onClick={() => setPaymentMethod('card')}
              className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                paymentMethod === 'card' ? 'border-[#2563eb] bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-[#2563eb]' : 'text-slate-400'}`} />
              <span className={`text-[11px] font-bold ${paymentMethod === 'card' ? 'text-[#2563eb]' : 'text-slate-500'}`}>Card</span>
            </div>
            <div 
              onClick={() => setPaymentMethod('upi')}
              className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                paymentMethod === 'upi' ? 'border-[#2563eb] bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Wallet className={`w-6 h-6 ${paymentMethod === 'upi' ? 'text-[#2563eb]' : 'text-slate-400'}`} />
              <span className={`text-[11px] font-bold ${paymentMethod === 'upi' ? 'text-[#2563eb]' : 'text-slate-500'}`}>UPI</span>
            </div>
            <div 
              onClick={() => setPaymentMethod('netbanking')}
              className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                paymentMethod === 'netbanking' ? 'border-[#2563eb] bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Building className={`w-6 h-6 ${paymentMethod === 'netbanking' ? 'text-[#2563eb]' : 'text-slate-400'}`} />
              <span className={`text-[11px] font-bold ${paymentMethod === 'netbanking' ? 'text-[#2563eb]' : 'text-slate-500'}`}>Net Banking</span>
            </div>
          </div>

          <form onSubmit={handlePayment} className="mt-8 space-y-6">
            
            {paymentMethod === 'card' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <FloatingInput id="cardNumber" label="Card Number" type="text" maxLength="19" required />
                <div className="grid grid-cols-2 gap-4">
                  <FloatingInput id="expiry" label="Expiry (MM/YY)" type="text" maxLength="5" required />
                  <FloatingInput id="cvv" label="CVV" type="password" maxLength="3" required />
                </div>
                <FloatingInput id="cardName" label="Name on Card" type="text" required />
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <FloatingInput id="upiId" label="Enter UPI ID" type="text" required />
                <p className="text-[10px] font-semibold text-slate-400">A payment request will be sent to your UPI app.</p>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="relative">
                  <select
                    id="bankSelect"
                    required
                    className="block px-2.5 pb-2.5 pt-3 w-full text-xs sm:text-sm font-semibold text-slate-800 bg-transparent rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#2563eb] peer transition-colors shadow-sm"
                  >
                    <option value="" disabled selected hidden></option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                  </select>
                  <label
                    htmlFor="bankSelect"
                    className="absolute text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 duration-300 transform -translate-y-3.5 scale-75 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#2563eb] left-1 cursor-text"
                  >
                    Select Bank
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#2563eb] hover:bg-blue-700 text-white text-sm font-bold px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Pay ₹{orderDetails.total} Securely
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 bg-slate-50 border border-slate-200 rounded-2xl p-6 h-fit shrink-0">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-6">
            Order Summary
          </h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-600">{orderDetails.planName}</span>
              <span className="font-bold text-slate-900">₹{orderDetails.price}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-slate-600">GST (18%)</span>
              <span className="font-bold text-slate-900">₹{orderDetails.gst}</span>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-4 flex justify-between items-center mb-6">
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Total Due</span>
            <span className="text-xl font-extrabold text-[#2563eb]">₹{orderDetails.total}</span>
          </div>

          <div className="bg-blue-50 text-[#2563eb] text-[10px] font-bold p-3 rounded-lg flex gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <p>Your payment is processed through a secure 256-bit encrypted connection.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;
