import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Building2, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin');
    }, 1500);
  };

  return (
    <div className="h-screen overflow-hidden w-full flex bg-white font-sans selection:bg-[#2563eb] selection:text-white">
      
      {/* Left Side - Image & Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex relative w-1/2 bg-slate-900 overflow-hidden items-center justify-center">
        {/* Stunning Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-overlay transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)' }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-lg px-12">
          <Link to="/" className="inline-block mb-12 group">
            <span className="text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Smart<span className="text-[#2563eb]">Stay</span>
              <span className="text-[10px] font-bold text-slate-900 bg-white px-2 py-0.5 rounded uppercase tracking-widest ml-2 group-hover:bg-[#2563eb] group-hover:text-white transition-colors">
                Partner
              </span>
            </span>
          </Link>
          
          <h1 className="text-4xl font-semibold text-white leading-tight mb-6">
            Manage your properties <br/>with elegance.
          </h1>
          <p className="text-lg text-slate-300 font-light mb-12">
            Join the fastest-growing premium hospitality network and maximize your revenue with our state-of-the-art partner dashboard.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Max Revenue</h3>
                <p className="text-xs text-slate-400">Smart pricing analytics</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">100% Secure</h3>
                <p className="text-xs text-slate-400">Verified guests only</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative h-full overflow-y-auto scrollbar-none">
        
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Link to="/" className="flex items-center gap-1">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              Smart<span className="text-[#2563eb]">Stay</span>
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md my-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-sm font-semibold text-slate-500">
              Please enter your partner credentials to access your dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div className="relative group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
                className="block px-4 pb-3 pt-5 w-full text-sm font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl border border-transparent focus:bg-white focus:outline-none focus:ring-0 focus:border-[#2563eb] peer transition-all duration-300"
              />
              <label
                htmlFor="email"
                className="absolute text-xs font-bold uppercase tracking-wider text-slate-400 duration-300 transform -translate-y-2.5 scale-75 top-3 z-10 origin-[0] left-4 peer-focus:text-[#2563eb] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 cursor-text"
              >
                Email Address
              </label>
              <Mail className="absolute right-4 top-4 w-5 h-5 text-slate-400 group-hover:text-slate-500 peer-focus:text-[#2563eb] transition-colors" />
            </div>

            <div className="relative group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder=" "
                className="block px-4 pb-3 pt-5 w-full text-sm font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl border border-transparent focus:bg-white focus:outline-none focus:ring-0 focus:border-[#2563eb] peer transition-all duration-300"
              />
              <label
                htmlFor="password"
                className="absolute text-xs font-bold uppercase tracking-wider text-slate-400 duration-300 transform -translate-y-2.5 scale-75 top-3 z-10 origin-[0] left-4 peer-focus:text-[#2563eb] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 cursor-text"
              >
                Password
              </label>
              <Lock className="absolute right-4 top-4 w-5 h-5 text-slate-400 group-hover:text-slate-500 peer-focus:text-[#2563eb] transition-colors" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center group cursor-pointer">
                <div className="relative flex items-center justify-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded focus:ring-0 checked:bg-[#2563eb] checked:border-[#2563eb] transition-colors cursor-pointer"
                  />
                  <ShieldCheck className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                </div>
                <label htmlFor="remember-me" className="ml-3 block text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm font-bold">
                <a href="#" className="text-[#2563eb] hover:text-blue-800 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-[#2563eb]/20 text-sm font-bold text-white bg-[#2563eb] hover:bg-blue-700 hover:shadow-xl hover:shadow-[#2563eb]/30 focus:outline-none focus:ring-4 focus:ring-[#2563eb]/20 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign in securely
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
                  New to SmartStay?
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <Link
                to="/list-your-place"
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-700 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-[0.98]"
              >
                <Building2 className="w-4 h-4 text-slate-400" />
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
