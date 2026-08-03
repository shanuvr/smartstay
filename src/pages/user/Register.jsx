import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    nationality: '',
    address: '',
    city: '',
    zipCode: '',
    agreeTerms: false
  });
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Switch to OTP step
    setStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto-advance focus
    if (value !== '' && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Simulate successful registration and verification
    navigate('/signin');
  };

  const inputClass = "w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-transparent relative z-0";
  const floatingLabelClass = "absolute left-2.5 bg-white px-1 text-[10px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2.5 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10 pointer-events-none";

  return (
    <div className="min-h-screen flex font-sans bg-white">
      {/* Left Side - Image & Branding */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070" 
          alt="Luxury Hotel" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-12 xl:p-16 text-white">
          <div className="w-14 h-14 bg-[#2563eb] rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-[#2563eb]/30">
            <span className="text-white font-extrabold text-3xl tracking-tighter">Ss</span>
          </div>
          <h2 className="text-4xl xl:text-5xl font-extrabold mb-5 leading-[1.1] tracking-tight">Unlock extraordinary stays worldwide.</h2>
          <p className="text-lg text-slate-300 font-medium max-w-md leading-relaxed">Join SmartStay Loyalty today to get exclusive member rates, earn points on every booking, and enjoy priority room upgrades.</p>
          
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-slate-900" src="https://i.pravatar.cc/100?img=1" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-slate-900" src="https://i.pravatar.cc/100?img=2" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-slate-900" src="https://i.pravatar.cc/100?img=3" alt="User" />
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-white text-slate-900 flex items-center justify-center text-xs font-bold shadow-sm">+2k</div>
            </div>
            <p className="text-sm text-slate-300 font-semibold">Join 2,000+ happy members</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className="w-full lg:w-7/12 xl:w-1/2 h-screen overflow-y-auto flex flex-col items-center py-8 px-6 sm:px-12 xl:px-16 scrollbar-thin scrollbar-thumb-slate-200">
        <div className={`w-full max-w-[500px] pb-8 ${step === 2 ? 'my-auto' : ''}`}>
          
          <div className="lg:hidden w-12 h-12 bg-[#2563eb] rounded-xl flex items-center justify-center mb-6 shadow-md shadow-[#2563eb]/20">
            <span className="text-white font-bold text-2xl tracking-tighter">Ss</span>
          </div>

          {step === 1 ? (
            <>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-1.5 tracking-tight">Complete your profile</h2>
              <p className="text-slate-500 mb-6 text-sm font-medium">Already have an account? <Link to="/signin" className="text-[#2563eb] font-bold hover:text-blue-700 hover:underline underline-offset-2 transition-colors">Sign in here</Link></p>

              <form onSubmit={handleProfileSubmit} className="space-y-5">
                {/* Personal Details Section */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1.5">Personal Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative mt-2">
                      <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First Name" className={inputClass} />
                      <label htmlFor="firstName" className={floatingLabelClass}>First Name</label>
                    </div>
                    <div className="relative mt-2">
                      <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" className={inputClass} />
                      <label htmlFor="lastName" className={floatingLabelClass}>Last Name</label>
                    </div>
                    <div className="relative mt-2">
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email Address" className={inputClass} />
                      <label htmlFor="email" className={floatingLabelClass}>Email Address</label>
                    </div>
                    <div className="relative mt-2">
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone Number" className={inputClass} />
                      <label htmlFor="phone" className={floatingLabelClass}>Phone Number</label>
                    </div>
                    <div className="relative mt-2">
                      <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required placeholder="Date of Birth" className={`${inputClass} [&::-webkit-calendar-picker-indicator]:opacity-50`} />
                      <label htmlFor="dob" className={floatingLabelClass}>Date of Birth</label>
                    </div>
                    <div className="relative mt-2">
                      <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required className={`${inputClass} appearance-none cursor-pointer ${!formData.gender ? 'text-transparent' : ''}`}>
                        <option value="" disabled className="text-gray-400">Select Gender</option>
                        <option value="male" className="text-slate-900">Male</option>
                        <option value="female" className="text-slate-900">Female</option>
                        <option value="other" className="text-slate-900">Other</option>
                      </select>
                      <label htmlFor="gender" className={floatingLabelClass}>Gender</label>
                      <svg className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 mt-2">Address Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative sm:col-span-2 mt-2">
                      <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required placeholder="Street Address" className={inputClass} />
                      <label htmlFor="address" className={floatingLabelClass}>Street Address</label>
                    </div>
                    <div className="relative mt-2">
                      <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required placeholder="City / Region" className={inputClass} />
                      <label htmlFor="city" className={floatingLabelClass}>City / Region</label>
                    </div>
                    <div className="relative grid grid-cols-2 gap-3 mt-2">
                      <div className="relative">
                        <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required placeholder="Zip Code" className={inputClass} />
                        <label htmlFor="zipCode" className={floatingLabelClass}>Zip Code</label>
                      </div>
                      <div className="relative">
                        <input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} required placeholder="Nationality" className={inputClass} />
                        <label htmlFor="nationality" className={floatingLabelClass}>Nationality</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and conditions */}
                <div className="flex items-start pt-1">
                  <div className="flex items-center h-4 mt-0.5">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 border-2 border-slate-300 rounded bg-white checked:bg-[#2563eb] checked:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/20 transition-all cursor-pointer accent-[#2563eb]"
                    />
                  </div>
                  <div className="ml-2.5 text-xs">
                    <label htmlFor="agreeTerms" className="font-medium text-slate-600 cursor-pointer">
                      I agree to the <a href="#" className="text-[#2563eb] font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-[#2563eb] font-bold hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-all shadow-md shadow-[#2563eb]/30 flex items-center justify-center gap-2 active:scale-[0.98] mt-2 text-sm"
                >
                  Verify Email
                </button>
                
              </form>
            </>
          ) : (
            <div className="w-full max-w-[400px] mx-auto pt-6">
              <div className="flex items-center gap-2 mb-3">
                <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-700 transition-colors -ml-2 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Verify email</h2>
              </div>
              <p className="text-slate-500 text-sm font-medium mb-8 pl-1">
                We've sent a 4-digit code to <span className="font-bold text-slate-800">{formData.email}</span>
              </p>

              <form onSubmit={handleOtpSubmit} className="space-y-8">
                <div className="flex justify-between gap-3 px-1">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      ref={otpRefs[index]}
                      type="text"
                      inputMode="numeric"
                      required
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold bg-white border border-slate-300 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all shadow-sm"
                      placeholder="-"
                    />
                  ))}
                </div>
                
                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#2563eb]/30 flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    Confirm & Register
                  </button>
                  
                  <div className="text-center">
                    <button type="button" className="text-xs font-bold text-[#2563eb] hover:text-blue-700">
                      Resend code
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
