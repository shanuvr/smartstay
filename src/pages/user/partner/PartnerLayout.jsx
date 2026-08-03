import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const steps = [
  { id: 1, path: '/list-your-place', title: 'Business Details', subtitle: 'Owner information' },
  { id: 2, path: '/list-your-place/package', title: 'Select Package', subtitle: 'Choose pricing plan' },
  { id: 3, path: '/list-your-place/type', title: 'Property Type', subtitle: 'Category of property' },
  { id: 4, path: '/list-your-place/details', title: 'Property Details', subtitle: 'Amenities and operations' },
  { id: 5, path: '/list-your-place/payment', title: 'Payment', subtitle: 'Secure registration' },
];

const PartnerLayout = () => {
  const location = useLocation();
  const currentStepId = steps.find(s => s.path === location.pathname)?.id || 1;

  // Mobile steps
  const renderMobileSteps = () => (
    <div className="md:hidden w-full bg-[#0F172A] px-4 py-6 border-b border-slate-700 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <Link to="/" className="inline-flex items-center select-none group text-white">
          <span className="text-xl sm:text-2xl tracking-tight leading-none">
            <span className="font-extrabold text-white">smart</span>
            <span className="font-black text-[#2563eb]">stay</span>
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-1.5 w-full justify-center overflow-x-auto py-1">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-all ${
                step.id === currentStepId
                  ? 'bg-[#2563eb] border-[#2563eb] text-white shadow-lg shadow-[#2563eb]/35 ring-4 ring-[#2563eb]/20'
                  : step.id < currentStepId
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-slate-800 border-slate-700 text-gray-400'
              }`}
            >
              {step.id}
            </div>
            {idx < steps.length - 1 && (
              <div className="h-0.5 w-4 flex-shrink-0 bg-slate-800" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center mt-3">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Step {currentStepId} of {steps.length}</p>
        <h4 className="text-white text-sm font-bold mt-0.5">{steps.find(s => s.id === currentStepId)?.title}</h4>
      </div>
    </div>
  );

  // Desktop steps
  const renderDesktopSteps = () => (
    <div className="hidden md:flex md:col-span-3 lg:col-span-3 flex-col bg-[#0F172A] px-6 lg:px-8 py-10 relative overflow-hidden border-r border-slate-200/10 select-none">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#2563eb]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12 relative flex-shrink-0">
        <Link className="flex items-center gap-2" to="/">
          <span className="text-2xl font-bold tracking-tight text-white">
            Smart<span className="text-[#2563eb]">Stay</span>
          </span>
        </Link>
        <span className="text-[9px] font-bold text-slate-500 absolute -top-1 -right-4">TM</span>
      </div>

      {/* Progress Timeline */}
      <div className="relative flex-grow flex flex-col justify-start space-y-6 pl-1">
        <div className="absolute left-[15px] top-4 bottom-6 w-0.5 bg-slate-800 pointer-events-none z-0" />
        
        {steps.map((step) => {
          const isActive = step.id === currentStepId;
          const isCompleted = step.id < currentStepId;

          return (
            <div 
              key={step.id}
              className="flex items-start gap-4 relative z-10 group transition-all duration-300"
            >
              {/* Number Bubble */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs border transition-all duration-300 ${
                  isActive
                    ? 'bg-[#2563eb] border-[#2563eb] text-white shadow-lg shadow-[#2563eb]/40 ring-4 ring-[#2563eb]/10 scale-105'
                    : isCompleted
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-500 group-hover:border-slate-700'
                }`}
              >
                {step.id}
              </div>

              {/* Text info */}
              <div className="text-left py-0">
                <p
                  className={`text-xs font-bold transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  {step.title}
                </p>
                <p
                  className={`text-[10px] transition-colors duration-300 mt-0.5 ${
                    isActive ? 'text-[#2563eb] font-bold' : 'text-slate-600'
                  }`}
                >
                  {step.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen md:h-screen bg-slate-50 font-sans flex flex-col items-center md:overflow-hidden">
      
      {/* Optional Top Nav if needed, or just let the box float */}
      <header className="w-full bg-white border-b border-slate-100 flex items-center justify-between px-6 py-4 md:px-10 shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl tracking-tight font-extrabold text-slate-900">SmartStay<span className="text-[#2563eb]">.</span></span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/signin" className="px-5 py-2 border-2 border-slate-200 text-slate-700 hover:border-slate-300 font-bold rounded-xl text-sm transition-all shadow-sm">
            Sign In
          </Link>
        </nav>
      </header>

      {/* Main Box Container */}
      <div className="w-full max-w-6xl mx-auto px-0 sm:px-4 md:px-6 py-2 sm:py-3 flex-1 flex flex-col md:min-h-0">
        
        {/* Multi-Step Wizard Layout */}
        <div className="bg-white md:rounded-2xl border-y sm:border border-slate-200 sm:shadow-2xl md:overflow-hidden flex-1 grid grid-cols-1 md:grid-cols-12 md:min-h-0">
          
          {/* Sidebar (Stepper) */}
          {renderMobileSteps()}
          {renderDesktopSteps()}

          {/* Form Section */}
          <main className="md:col-span-9 flex flex-col bg-white md:overflow-hidden md:h-full">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
};

export default PartnerLayout;
