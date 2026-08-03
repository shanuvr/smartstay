import React, { useState, useRef } from 'react';
import { Mail, ArrowRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) setStep(2);
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
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
    // Simulate successful login
    localStorage.setItem('isLoggedIn', 'true');
    if (!localStorage.getItem('smartstay_guest_profile')) {
      localStorage.setItem('smartstay_guest_profile', JSON.stringify({
        name: 'Rahul Sharma',
        email: email || 'shanuprogramers@gmail.com',
        phone: '9876543210',
        dob: '1998',
        gender: 'Male',
        nationality: 'Indian',
        address: 'Flat 402, Signature Towers, Kondapur, Hyderabad, 500084',
        emergencyContact: '9876543211',
        idType: 'Aadhaar',
        idNumber: '8912-3456-7890',
        idFileName: 'aadhaar_rahul.pdf',
        isVerified: true
      }));
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen flex font-sans bg-slate-50">
      {/* Centered Form Container */}
      <div className="w-full flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-[400px] w-full bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          
          <div className="mb-6 sm:mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-5 shadow-md shadow-blue-600/20">
               <span className="text-white font-bold text-xl tracking-tighter">Ss</span>
            </div>
            {step === 1 ? (
              <>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">Welcome back</h2>
                <p className="text-slate-500 text-xs sm:text-sm">Enter your email to sign in or create an account</p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-700 transition-colors -ml-1.5 p-1 rounded-full hover:bg-slate-100">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Enter security code</h2>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm">
                  We've sent a 4-digit code to <span className="font-semibold text-slate-700">{email}</span>
                </p>
              </>
            )}
          </div>

          {step === 1 ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-[0.98] text-sm sm:text-base"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-5 sm:space-y-6">
              <div className="flex justify-between gap-2 sm:gap-3">
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
                    className="w-full aspect-square text-center text-2xl sm:text-3xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all"
                    placeholder="-"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-[0.98] text-sm sm:text-base"
              >
                Sign In
              </button>
              
              <div className="text-center">
                <button type="button" className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700">
                  Resend code
                </button>
              </div>
            </form>
          )}

          {step === 1 && (
            <div className="mt-6 sm:mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-3 bg-white text-slate-400">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
                <button type="button" className="flex items-center justify-center gap-2 py-2 sm:py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                  <span className="text-xs sm:text-sm font-medium text-slate-700">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-2 sm:py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                   <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                    <path fill="#000000" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.34-.85 3.73-.78 1.44.06 2.76.67 3.65 1.83-3.23 1.95-2.74 5.92.38 7.23-.74 1.76-1.74 3.12-2.84 3.89zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span className="text-xs sm:text-sm font-medium text-slate-700">Apple</span>
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Signin;
