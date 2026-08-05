import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cigarette, CigaretteOff, Bed, BedDouble, Coffee, ShieldCheck, Wifi, CreditCard, Building } from 'lucide-react';
import UserLayout from '../../layouts/Userlayout';

function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'India',
    countryCode: '+91',
    mobileNumber: '',
    numberOfGuests: 2,
    roomTypePreference: 'non-smoking',
    bedSetupPreference: 'large',
    specialRequestsText: '',
    paymentMethod: 'pay-now',
    cardholderName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [timeLeft, setTimeLeft] = useState(1064);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem('smartstay_guest_profile');
    if (saved) {
      try {
        const profile = JSON.parse(saved);
        const nameParts = (profile.name || 'Rahul Sharma').split(' ');
        setFormData((prev) => ({
          ...prev,
          firstName: nameParts[0] || 'Rahul',
          lastName: nameParts.slice(1).join(' ') || 'Sharma',
          email: profile.email || 'shanuprogramers@gmail.com',
          mobileNumber: profile.phone || '9876543210',
        }));
      } catch (err) {
        console.error(err);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        firstName: 'Rahul',
        lastName: 'Sharma',
        email: 'shanuprogramers@gmail.com',
        mobileNumber: '9876543210',
      }));
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectPayment = (method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.mobileNumber.trim()
    ) {
      alert('Please fill in first name, last name, email, and mobile number.');
      return;
    }
    setCurrentStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/booking-confirmation/${id || '1'}`);
  };

  const hotelDetails = {
    name: 'Novotel Hyderabad Convention Centre',
    stars: 5,
    rating: '8.6 Excellent',
    reviewsCount: '2,450 reviews',
    address: 'Near Hitec City, Kondapur, Hyderabad, Telangana, India, 500084',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600',
    roomImage:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=400',
    roomName: 'Superior Room, 1 King Bed',
    roomSize: '30 sq.m',
    bedType: '1 Extra-large double bed',
    nights: 2,
    checkIn: 'Wed, Aug 5, 2026 (02:00 PM)',
    checkOut: 'Fri, Aug 7, 2026 (12:00 PM)',
    pricePerNight: 8500,
    taxesRatio: 0.12,
  };

  const basePrice = hotelDetails.pricePerNight * hotelDetails.nights;
  const taxes = Math.round(basePrice * hotelDetails.taxesRatio);
  const totalPrice = basePrice + taxes;

  return (
    <UserLayout>
      <div className="bg-slate-50 min-h-screen pt-20 pb-16 font-sans text-slate-800">

        {/* Price Guarantee Banner */}
        <div className="bg-slate-900 text-slate-100 py-2.5 text-center px-4">
          <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-2 text-xs md:text-sm">
            <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-slate-300">This rate is held for you until</span>
            <span className="font-mono font-bold text-amber-500 tracking-wider">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 mt-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">

              {/* Step indicator */}
              <div className="flex items-center gap-2 bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-all ${currentStep === 1 ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-green-150 text-green-700'
                    }`}>
                    {currentStep === 1 ? '1' : '✓'}
                  </div>
                  <span className={`text-xs font-bold transition-all ${currentStep === 1 ? 'text-slate-800' : 'text-slate-400'}`}>1. Guest Details</span>
                </div>
                <div className="flex-1 h-0.5 bg-slate-100 max-w-[60px] mx-2" />
                <div className="flex items-center gap-2">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-all ${currentStep === 2 ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-slate-100 text-slate-400'
                    }`}>
                    2
                  </div>
                  <span className={`text-xs font-bold transition-all ${currentStep === 2 ? 'text-slate-800' : 'text-slate-400'}`}>2. Payment & Confirmation</span>
                </div>
              </div>

              {currentStep === 1 && (
                <>
                  {/* Guest Info */}
                  <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-200/80 shadow-sm">
                    <div className="flex justify-between items-baseline mb-5">
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.12em] text-blue-600 uppercase mb-0.5">01 — Lead guest</p>
                        <h2 className="text-lg font-bold text-slate-900">Who's checking in?</h2>
                      </div>
                      <span className="text-[10px] text-rose-500 font-semibold">* required</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                      <div className="relative mt-1">
                        <input
                          id="first_name"
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First name *"
                          className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-transparent relative z-0"
                        />
                        <label
                          htmlFor="first_name"
                          className="absolute left-3 bg-white px-1 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                        >
                          First name *
                        </label>
                      </div>

                      <div className="relative mt-1">
                        <input
                          id="last_name"
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last name *"
                          className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-transparent relative z-0"
                        />
                        <label
                          htmlFor="last_name"
                          className="absolute left-3 bg-white px-1 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                        >
                          Last name *
                        </label>
                      </div>

                      <div className="relative mt-1">
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email *"
                          className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-transparent relative z-0"
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-3 bg-white px-1 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                        >
                          Email *
                        </label>
                        <p className="text-[10px] text-slate-400 mt-1 ml-1">Confirmation and receipt go here.</p>
                      </div>

                      <div className="relative mt-1">
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer relative z-0"
                        >
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Singapore">Singapore</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                        </select>
                        <label
                          htmlFor="country"
                          className={`absolute left-3 bg-white px-1 font-medium transition-all pointer-events-none z-10 ${formData.country ? '-top-2 text-[10px] text-slate-400' : 'top-2 text-xs text-slate-400'
                            } peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600`}
                        >
                          Country of residence *
                        </label>
                      </div>

                      <div className="flex gap-2 relative mt-1">
                        <div className="relative w-24 shrink-0">
                          <select
                            id="country_code"
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleInputChange}
                            className="w-full bg-white peer border border-slate-300 rounded-lg px-2 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shrink-0 relative z-0"
                          >
                            <option value="+91">+91 (IN)</option>
                            <option value="+1">+1 (US/CA)</option>
                            <option value="+44">+44 (UK)</option>
                            <option value="+65">+65 (SG)</option>
                            <option value="+971">+971 (UAE)</option>
                          </select>
                          <label
                            htmlFor="country_code"
                            className={`absolute left-2.5 bg-white px-1 font-medium transition-all pointer-events-none z-10 ${formData.countryCode ? '-top-2 text-[10px] text-slate-400' : 'top-2 text-xs text-slate-400'
                              } peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600`}
                          >
                            Code *
                          </label>
                        </div>
                        <div className="relative flex-1">
                          <input
                            id="mobile_number"
                            type="tel"
                            name="mobileNumber"
                            required
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            placeholder="Mobile number *"
                            className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-transparent relative z-0"
                          />
                          <label
                            htmlFor="mobile_number"
                            className="absolute left-3 bg-white px-1 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                          >
                            Mobile number *
                          </label>
                        </div>
                      </div>

                      <div className="relative mt-1">
                        <select
                          id="number_of_guests"
                          name="numberOfGuests"
                          value={formData.numberOfGuests}
                          onChange={handleInputChange}
                          className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer relative z-0"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                        <label
                          htmlFor="number_of_guests"
                          className={`absolute left-3 bg-white px-1 font-medium transition-all pointer-events-none z-10 ${formData.numberOfGuests ? '-top-2 text-[10px] text-slate-400' : 'top-2 text-xs text-slate-400'
                            } peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600`}
                        >
                          Number of Guests *
                        </label>
                      </div>

                      {Number(formData.numberOfGuests) > 1 && (
                        <div className="md:col-span-2 border-t border-slate-100 pt-3.5 mt-1 space-y-3">
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Accompanying Guests</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Array.from({ length: Number(formData.numberOfGuests) - 1 }).map((_, idx) => (
                              <div key={idx} className="relative mt-1">
                                <input
                                  id={`guest_${idx}_name`}
                                  type="text"
                                  required
                                  placeholder={`Guest ${idx + 2} Full Name *`}
                                  className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-transparent relative z-0"
                                />
                                <label
                                  htmlFor={`guest_${idx}_name`}
                                  className="absolute left-3 bg-white px-1 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                                >
                                  Guest {idx + 2} Full Name *
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-200/80 shadow-sm">
                    <p className="text-[10px] font-bold tracking-[0.12em] text-blue-600 uppercase mb-0.5">02 — Preferences</p>
                    <h2 className="text-lg font-bold text-slate-900 mb-1">Special requests</h2>
                    <p className="text-xs text-slate-400 mb-5">Subject to availability. Sent directly to the property.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">Room type</label>
                        <div className="space-y-2">
                          {[
                            { v: 'non-smoking', Icon: CigaretteOff, text: 'Non-smoking' },
                            { v: 'smoking', Icon: Cigarette, text: 'Smoking' },
                          ].map((opt) => (
                            <label
                              key={opt.v}
                              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${formData.roomTypePreference === opt.v
                                  ? 'border-blue-600 bg-blue-50/20'
                                  : 'border-slate-200 hover:bg-slate-50'
                                }`}
                            >
                              <input
                                type="radio"
                                name="roomTypePreference"
                                value={opt.v}
                                checked={formData.roomTypePreference === opt.v}
                                onChange={handleInputChange}
                                className="w-4 h-4 accent-blue-600"
                              />
                              <div className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                                <opt.Icon className={`w-4 h-4 ${formData.roomTypePreference === opt.v ? 'text-blue-600' : 'text-slate-400'}`} />
                                <span>{opt.text}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">Bed setup</label>
                        <div className="space-y-2">
                          {[
                            { v: 'large', Icon: BedDouble, text: "I'd like a large bed" },
                            { v: 'twin', Icon: Bed, text: "I'd like twin beds" },
                          ].map((opt) => (
                            <label
                              key={opt.v}
                              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${formData.bedSetupPreference === opt.v
                                  ? 'border-blue-600 bg-blue-50/20'
                                  : 'border-slate-200 hover:bg-slate-50'
                                }`}
                            >
                              <input
                                type="radio"
                                name="bedSetupPreference"
                                value={opt.v}
                                checked={formData.bedSetupPreference === opt.v}
                                onChange={handleInputChange}
                                className="w-4 h-4 accent-blue-600"
                              />
                              <div className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                                <opt.Icon className={`w-4 h-4 ${formData.bedSetupPreference === opt.v ? 'text-blue-600' : 'text-slate-400'}`} />
                                <span>{opt.text}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="relative mt-2">
                      <textarea
                        id="special_requests_text"
                        name="specialRequestsText"
                        value={formData.specialRequestsText}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Anything else? (optional)"
                        className="w-full bg-white peer border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-transparent relative z-0"
                      />
                      <label
                        htmlFor="special_requests_text"
                        className="absolute left-4 bg-white px-1 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                      >
                        Anything else? (optional)
                      </label>
                    </div>
                  </div>

                  {/* Free Benefits */}
                  <div className="bg-white rounded-xl p-7 border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">What's included</h2>
                    <div className="divide-y divide-slate-100">
                      {[
                        { Icon: Coffee, title: 'Breakfast included', desc: 'Complimentary buffet breakfast for your stay.' },
                        { Icon: ShieldCheck, title: 'Fully refundable', desc: 'Cancel free of charge before Aug 4, 2026.' },
                        { Icon: Wifi, title: 'High-speed Wi-Fi', desc: 'Stay connected throughout the hotel.' },
                      ].map((b) => (
                        <div key={b.title} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                          <div className="flex items-center gap-3">
                            <b.Icon className="w-5 h-5 text-blue-600 shrink-0" />
                            <p className="text-sm font-bold text-slate-850">{b.title}</p>
                            <p className="text-xs text-slate-400">{b.desc}</p>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wide text-green-700 bg-green-50 border border-green-150 px-2.5 py-1 rounded-md">Free</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </>
              )}

              {currentStep === 2 && (
                <>
                  {/* Payment */}
                  <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-200/80 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <p className="text-[10px] font-bold tracking-[0.12em] text-blue-600 uppercase mb-0.5">03 — Payment</p>
                    <h2 className="text-lg font-bold text-slate-900 mb-1">How would you like to pay?</h2>
                    <p className="text-xs text-slate-400 mb-5">Choose how you'd prefer to settle this reservation.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                      <label
                        onClick={() => handleSelectPayment('pay-now')}
                        className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${formData.paymentMethod === 'pay-now'
                            ? 'border-blue-600 bg-blue-50/20'
                            : 'border-slate-200 hover:bg-slate-50'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <CreditCard className={`w-3.5 h-3.5 ${formData.paymentMethod === 'pay-now' ? 'text-blue-600' : 'text-slate-400'}`} />
                            Pay online now
                          </span>
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'pay-now'}
                            readOnly
                            className="w-3.5 h-3.5 accent-blue-600"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">Secure online payment. Funds are routed directly to the hotel owner.</p>
                      </label>

                      <label
                        onClick={() => handleSelectPayment('pay-hotel')}
                        className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${formData.paymentMethod === 'pay-hotel'
                            ? 'border-blue-600 bg-blue-50/20'
                            : 'border-slate-200 hover:bg-slate-50'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <Building className={`w-3.5 h-3.5 ${formData.paymentMethod === 'pay-hotel' ? 'text-blue-600' : 'text-slate-400'}`} />
                            Pay at property
                          </span>
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'pay-hotel'}
                            readOnly
                            className="w-3.5 h-3.5 accent-blue-600"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">Pay at the front desk. A card is required to hold the room.</p>
                      </label>
                    </div>

                    {formData.paymentMethod === 'pay-now' && (
                      <div className="border-t border-slate-100 pt-4 space-y-3.5 animate-in fade-in slide-in-from-top-1 duration-150">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Card details</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="md:col-span-2 relative mt-1">
                            <input
                              id="cardholder_name"
                              type="text"
                              name="cardholderName"
                              required={formData.paymentMethod === 'pay-now'}
                              value={formData.cardholderName}
                              onChange={handleInputChange}
                              placeholder="Cardholder name *"
                              className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-transparent relative z-0"
                            />
                            <label
                              htmlFor="cardholder_name"
                              className="absolute left-3 bg-white px-1 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                            >
                              Cardholder name *
                            </label>
                          </div>

                          <div className="md:col-span-2 relative mt-1">
                            <div className="relative">
                              <input
                                id="card_number"
                                type="text"
                                name="cardNumber"
                                required={formData.paymentMethod === 'pay-now'}
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                placeholder="Card number *"
                                className="w-full bg-white peer border border-slate-300 rounded-lg pl-3 pr-10 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-transparent relative z-0"
                              />
                              <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                              <label
                                htmlFor="card_number"
                                className="absolute left-3 bg-white px-1 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                              >
                                Card number *
                              </label>
                            </div>
                          </div>

                          <div className="relative mt-1">
                            <input
                              id="card_expiry"
                              type="text"
                              name="cardExpiry"
                              required={formData.paymentMethod === 'pay-now'}
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              placeholder="Expiry *"
                              className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-transparent relative z-0"
                            />
                            <label
                              htmlFor="card_expiry"
                              className="absolute left-3 bg-white px-1 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                            >
                              Expiry *
                            </label>
                          </div>

                          <div className="relative mt-1">
                            <input
                              id="card_cvv"
                              type="password"
                              name="cardCvv"
                              required={formData.paymentMethod === 'pay-now'}
                              value={formData.cardCvv}
                              onChange={handleInputChange}
                              placeholder="CVV *"
                              maxLength="4"
                              className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-transparent relative z-0"
                            />
                            <label
                              htmlFor="card_cvv"
                              className="absolute left-3 bg-white px-1 text-[10px] font-medium text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                            >
                              CVV *
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 border-t border-slate-100 pt-6">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm group"
                      >
                        <span>Confirm Booking</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="w-full mt-3 bg-white hover:bg-slate-50 text-slate-600 font-semibold py-2.5 px-6 rounded-lg border border-slate-200 transition-colors text-center text-xs cursor-pointer"
                      >
                        ← Go back to guest details
                      </button>

                      <p className="text-[11px] text-slate-400 text-center mt-3">
                        By confirming, you agree to our Terms of Use, Privacy Policy, and booking terms.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Right Column: Folio / Summary */}
            <div className="lg:col-span-1">
              <div className="space-y-6">

                <div className="bg-white rounded-lg p-4 border border-slate-200 space-y-3 shadow-sm">
                  <div className="grid grid-cols-2 divide-x divide-slate-100 text-center">
                    <div className="pr-3 text-left">
                      <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-0.5">Check-in</p>
                      <p className="text-sm font-bold text-slate-900">Wed, Aug 5</p>
                      <p className="text-xs text-slate-400">From 2:00 PM</p>
                    </div>
                    <div className="pl-4 text-left">
                      <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-0.5">Check-out</p>
                      <p className="text-sm font-bold text-slate-900">Fri, Aug 7</p>
                      <p className="text-xs text-slate-400">Before 12:00 PM</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs font-semibold text-slate-900">
                    <span className="text-slate-500">Total Stay:</span>
                    <span>{hotelDetails.nights} nights • {formData.numberOfGuests} {Number(formData.numberOfGuests) === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                </div>

                {/* The Folio — signature element */}
                <div className="rounded-lg overflow-hidden border border-slate-200 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">

                  {/* Keycard stripe header */}
                  <div className="relative h-36">
                    <img src={hotelDetails.image} alt={hotelDetails.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
                    <div className="absolute top-3 left-4 flex gap-0.5">
                      {Array.from({ length: hotelDetails.stars }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-xs">★</span>
                      ))}
                    </div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-bold text-white text-base leading-tight">{hotelDetails.name}</h3>
                    </div>
                  </div>

                  <div className="bg-white p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-600 text-white text-xs font-black px-2 py-0.5 rounded">{hotelDetails.rating.split(' ')[0]}</span>
                      <span className="text-xs font-bold text-blue-600">{hotelDetails.rating.split(' ')[1]}</span>
                      <span className="text-xs text-slate-400">• {hotelDetails.reviewsCount}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">📍 {hotelDetails.address}</p>

                    <div className="flex gap-3 pt-1">
                      <img src={hotelDetails.roomImage} alt={hotelDetails.roomName} className="w-16 h-16 rounded-md object-cover shrink-0" />
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-slate-900 leading-snug">1 × {hotelDetails.roomName}</p>
                        <p className="text-xs text-slate-400">{hotelDetails.roomSize} • {hotelDetails.bedType}</p>
                        <span className="inline-block text-[10px] font-bold text-blue-600 mt-0.5">⚡ {hotelDetails.nights} nights</span>
                      </div>
                    </div>
                  </div>

                  {/* Perforated tear line */}
                  <div className="relative bg-white">
                    <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-50 border border-slate-200" />
                    <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-50 border border-slate-200" />
                    <div
                      className="h-0 border-t-2 border-dashed border-slate-200 mx-5"
                      style={{ borderTopWidth: '2px' }}
                    />
                  </div>

                  {/* Receipt-style total */}
                  <div className="bg-slate-900 text-slate-100 p-5 font-mono">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-3">Folio summary</p>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-450">Room × {hotelDetails.nights} nights</span>
                        <span>₹{basePrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-455">Taxes & fees (12%)</span>
                        <span>₹{taxes.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="border-t border-dashed border-slate-800 mt-3 pt-3 flex justify-between items-end">
                      <span className="text-xs uppercase tracking-wide text-slate-400">Total due</span>
                      <span className="text-2xl font-black text-amber-500">₹{totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/40 border border-blue-100 rounded-lg p-4 text-xs text-blue-700 flex gap-2.5">
                  <span className="text-base leading-none">🛡️</span>
                  <div>
                    <p className="font-bold text-slate-900">Free cancellation</p>
                    <p className="text-blue-600/90 mt-0.5">Cancel at no charge before Aug 4, 2026.</p>
                  </div>
                </div>

                {currentStep === 1 && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-blue-600 hover:bg-blue-750 text-white font-bold py-3.5 px-6 rounded-lg transition-colors text-center flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer shadow-lg shadow-blue-500/15 animate-in fade-in zoom-in duration-200 mt-2"
                  >
                    <span>Continue to payment</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

          </form>
        </div>

      </div>
    </UserLayout>
  );
}

export default Booking;