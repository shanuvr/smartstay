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

          {/* Right: List your place, Sign in, Create account */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* List your place link */}
            <Link
              to="/list-your-place"
              className="hidden md:inline-flex items-center text-sm font-semibold text-slate-800 hover:text-[#2563eb] transition-colors"
            >
              List your place
            </Link>

            {/* Sign in link */}
            <Link
              to="/signin"
              className="text-sm font-semibold text-slate-800 hover:text-[#2563eb] transition-colors px-2 py-1"
            >
              Sign in
            </Link>

            {/* Create account button */}
            <Link
              to="/signup"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-[#2563eb] hover:bg-blue-700 text-white rounded-full font-semibold text-sm transition-colors shadow-xs"
            >
              Create account
            </Link>

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
