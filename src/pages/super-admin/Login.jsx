import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SuperAdminLogin() {
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
      navigate('/super-admin/dashboard');
    }, 1500);
  };

  return (
    <div className="h-screen overflow-hidden w-full flex bg-slate-50 font-sans selection:bg-[#2563eb] selection:text-white items-center justify-center relative">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 opacity-80" />
      </div>

      <div className="relative z-10 w-full max-w-md p-6 sm:p-8">
        
        {/* Header / Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block group mb-6">
            <span className="text-3xl font-extrabold tracking-tight text-white flex justify-center items-center gap-2">
              Smart<span className="text-blue-500">Stay</span>
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">
            Super Admin Portal
          </h2>
          <p className="text-sm font-medium text-slate-400">
            Secure login for platform owners and administrators.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
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
                className="block px-4 pb-3 pt-5 w-full text-sm font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
              />
              <label
                htmlFor="email"
                className="absolute text-xs font-bold uppercase tracking-wider text-slate-500 duration-300 transform -translate-y-2.5 scale-75 top-3 z-10 origin-[0] left-4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 cursor-text"
              >
                Admin Email
              </label>
              <Mail className="absolute right-4 top-4 w-5 h-5 text-slate-400 group-hover:text-slate-500 peer-focus:text-blue-600 transition-colors" />
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
                className="block px-4 pb-3 pt-5 w-full text-sm font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300"
              />
              <label
                htmlFor="password"
                className="absolute text-xs font-bold uppercase tracking-wider text-slate-500 duration-300 transform -translate-y-2.5 scale-75 top-3 z-10 origin-[0] left-4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 cursor-text"
              >
                Password
              </label>
              <Lock className="absolute right-4 top-4 w-5 h-5 text-slate-400 group-hover:text-slate-500 peer-focus:text-blue-600 transition-colors" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center group cursor-pointer">
                <div className="relative flex items-center justify-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded focus:ring-0 checked:bg-blue-600 checked:border-blue-600 transition-colors cursor-pointer"
                  />
                  <ShieldCheck className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                </div>
                <label htmlFor="remember-me" className="ml-3 block text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm font-bold">
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-600/20 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 focus:outline-none focus:ring-4 focus:ring-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Secure Login
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 font-medium">
            &copy; 2026 SmartStay Platform. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
