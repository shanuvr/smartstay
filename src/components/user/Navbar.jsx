import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
      isScrolled 
        ? 'bg-white border-b border-gray-150 shadow-sm' 
        : 'bg-[#003B95] border-b border-[#002f78]/30 shadow-none'
    } font-sans`}>
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-20 items-center">
          
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 select-none group">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 ${
                isScrolled ? 'bg-[#5392F9]' : 'bg-white'
              }`}>
                <svg className={`w-5.5 h-5.5 transition-colors duration-300 ${
                  isScrolled ? 'text-white' : 'text-[#003B95]'
                }`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-.996.43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
              </div>
              <span className="text-2xl font-sans tracking-tight leading-none">
                <span className={`font-semibold transition-colors duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>smart</span>
                <span className={`font-black transition-colors duration-300 ${isScrolled ? 'text-[#5392F9]' : 'text-blue-200'}`}>stay</span>
              </span>
            </Link>
          </div>

          {/* Right: Actions, Sign In, Hamburger */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* List your place Button */}
            <Link
              to="/list-your-place"
              className={`hidden lg:inline-flex items-center justify-center px-5 py-2 border rounded-full font-medium text-sm transition-all duration-300 ${
                isScrolled 
                  ? 'border-[#5392F9] text-[#5392F9] hover:bg-blue-50' 
                  : 'border-white text-white hover:bg-white/10'
              }`}
            >
              List your place
            </Link>

            {/* Sign in button */}
            <Link
              to="/signin"
              className={`text-sm font-bold transition-colors duration-300 px-2 py-1 ${
                isScrolled ? 'text-[#5392F9] hover:text-[#3b7ae0]' : 'text-white hover:text-slate-200'
              }`}
            >
              Sign in
            </Link>

            {/* Create account button */}
            <Link
              to="/signup"
              className={`hidden sm:inline-flex items-center justify-center px-5 py-2 border rounded-full font-medium text-sm transition-all duration-300 ${
                isScrolled 
                  ? 'border-[#5392F9] text-[#5392F9] hover:bg-blue-50' 
                  : 'border-white text-white hover:bg-white/10'
              }`}
            >
              Create account
            </Link>

            {/* Hamburger menu button */}
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className={`inline-flex items-center justify-center p-1 rounded-md transition-all duration-300 ${
                isScrolled ? 'text-[#5392F9] hover:bg-blue-50' : 'text-white hover:bg-white/10'
              } focus:outline-none`}
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 select-none group">
            <div className="w-8 h-8 rounded-lg bg-[#5392F9] flex items-center justify-center shadow-sm">
              <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-.996.43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
            </div>
            <span className="text-xl font-sans tracking-tight leading-none">
              <span className="font-semibold text-gray-800">smart</span>
              <span className="font-black text-[#5392F9]">stay</span>
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
        </div>
      </div>
    </nav>
  );
}
