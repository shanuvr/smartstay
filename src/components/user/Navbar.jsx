import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, FileText, Plus } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className={`sticky top-0 z-50 -mb-20 transition-all duration-300 ease-in-out ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm' 
        : 'bg-transparent border-b border-transparent shadow-none'
    } font-sans`}>
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-20 items-center">
          
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/" className="inline-flex items-center select-none group">
              <span className="text-xl sm:text-2xl tracking-tight leading-none">
                <span className="font-extrabold text-slate-900">smart</span>
                <span className="font-black text-[#2563eb]">stay</span>
              </span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* List your place link with Gradient Border */}
            <div className="hidden md:flex p-[2.5px] rounded-full bg-gradient-to-r from-[#d4e157] via-[#26c6da] to-[#1e88e5] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <Link
                to="/list-your-place"
                className="flex items-center gap-1.5 px-5 py-1.5 bg-white rounded-full transition-colors hover:bg-slate-50/80"
              >
                <Plus className="w-4 h-4 text-slate-800" strokeWidth={2} />
                <span className="text-[13px] font-semibold tracking-wide text-[#1e88e5] uppercase">List your place</span>
              </Link>
            </div>

            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 text-slate-700 shadow-sm"
                >
                  <User className="w-5 h-5" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 py-1.5 overflow-hidden origin-top-right">
                    <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <User className="w-4 h-4 text-slate-400" />
                      My Profile
                    </Link>
                    <Link to="/bookings" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <FileText className="w-4 h-4 text-slate-400" />
                      My Bookings
                    </Link>
                    <Link to="/saved" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      Saved
                    </Link>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left">
                      <LogOut className="w-4 h-4 text-red-400" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-xs font-bold text-slate-800 hover:text-[#2563eb] bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 px-5 py-2.5 rounded-full transition-all shadow-sm"
                >
                  Sign in
                </Link>

                <Link
                  to="/signup"
                  className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-[#2563eb] hover:bg-blue-700 text-white rounded-full font-semibold text-sm transition-colors shadow-xs"
                >
                  Create account
                </Link>
              </>
            )}

            {/* Hamburger menu button for mobile */}
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="inline-flex items-center justify-center p-1.5 rounded-md text-slate-800 hover:bg-slate-900/10 focus:outline-none md:hidden"
            >
              <svg className="w-6.5 h-6.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Right-side sliding drawer */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out p-6 flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Drawer Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="inline-flex items-center select-none group">
            <span className="text-xl tracking-tight leading-none">
              <span className="font-extrabold text-slate-900">smart</span>
              <span className="font-black text-[#2563eb]">stay</span>
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col gap-6">
          <Link
            to="/list-your-place"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-gray-700 hover:text-[#5392F9] transition-colors py-2 border-b border-gray-50"
          >
            List your place
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-[#5392F9] transition-colors py-2 border-b border-gray-50 flex items-center gap-3"
              >
                <User className="w-5 h-5 text-gray-500" />
                My Profile
              </Link>
              <Link
                to="/bookings"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-[#5392F9] transition-colors py-2 border-b border-gray-50 flex items-center gap-3"
              >
                <FileText className="w-5 h-5 text-gray-500" />
                My Bookings
              </Link>
              <Link
                to="/saved"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-[#5392F9] transition-colors py-2 border-b border-gray-50 flex items-center gap-3"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                Saved
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-base font-medium text-red-600 hover:text-red-700 transition-colors py-2 flex items-center gap-3 text-left w-full mt-2"
              >
                <LogOut className="w-5 h-5 text-red-400" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-[#5392F9] transition-colors py-2 border-b border-gray-50"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center w-full px-5 py-2.5 border border-[#5392F9] hover:bg-blue-50 text-[#5392F9] rounded-full font-semibold text-sm transition-all duration-150 mt-4"
              >
                Create account
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
