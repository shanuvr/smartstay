import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Zap, ArrowRight, Percent, Sparkles, Building2 } from 'lucide-react';

const SelectPackage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/list-your-place/type');
  };

  const highlights = [
    {
      icon: Percent,
      title: '15% Pay-Per-Booking',
      desc: 'Zero monthly fees or listing charges. You only pay a flat 15% commission when a guest successfully books.'
    },
    {
      icon: Zap,
      title: 'Instant Global Exposure',
      desc: 'Get listed on SmartStay instantly with zero upfront investment. Reach thousands of verified travelers.'
    },
    {
      icon: ShieldCheck,
      title: 'Automated Weekly Payouts',
      desc: 'SmartStay collects guest payments directly and deposits your 85% net earnings directly into your bank account every Monday.'
    }
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-start overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-200 bg-white">
      
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">Simple Commission Model</h1>
        <p className="text-xs font-semibold text-slate-500 max-w-xl">
          List your property completely free. We only earn when you earn.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        {highlights.map((h, idx) => {
          const Icon = h.icon;
          return (
            <div key={idx} className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 hover:border-slate-300 transition-all">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center mb-2">
                <Icon size={16} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{h.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{h.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Summary Bullet Points */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 mb-4">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Included with your Free Partner Listing</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Unlimited room & rate management</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Digital guest ID check-in tool</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Integrated earnings analytics</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>24/7 SmartStay partner support</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 mt-auto -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 z-20">
        <div className="text-[11px] font-semibold text-slate-500 text-center sm:text-left">
          Free registration. Cancel anytime.
        </div>
        <button
          onClick={handleContinue}
          className="w-full sm:w-auto bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group active:scale-[0.98]"
        >
          <span>Accept & Continue</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default SelectPackage;
