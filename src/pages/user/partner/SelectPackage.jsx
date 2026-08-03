import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle2 } from 'lucide-react';

const SelectPackage = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: '1-month',
      title: '1 Month',
      price: '2,000',
      duration: 'for 30 days',
      features: ['List your property globally', 'Basic customer support', 'Instant booking notifications'],
      recommended: false,
      savings: null
    },
    {
      id: '3-months',
      title: '3 Months',
      price: '5,000',
      duration: 'for 90 days',
      features: ['List your property globally', 'Priority customer support', 'Instant booking notifications'],
      recommended: false,
      savings: 'Save ₹1,000'
    },
    {
      id: '6-months',
      title: '6 Months',
      price: '9,000',
      duration: 'for 180 days',
      features: ['List your property globally', '24/7 dedicated support', 'Advanced analytics dashboard', 'Top search placement'],
      recommended: true,
      savings: 'Save ₹3,000'
    },
    {
      id: '12-months',
      title: '1 Year',
      price: '15,000',
      duration: 'for 365 days',
      features: ['List your property globally', '24/7 dedicated support', 'Advanced analytics dashboard', 'Premium search placement', 'No booking commissions'],
      recommended: false,
      savings: 'Save ₹9,000'
    }
  ];

  const handleSelectPlan = (planId) => {
    // Navigate to next step
    navigate('/list-your-place/type');
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-start overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-200 bg-white">
      
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Choose Your Plan</h1>
        <p className="text-xs font-semibold text-slate-500">
          Select a duration to list your property on SmartStay. Simple, transparent pricing with no hidden fees.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 xl:gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`relative flex flex-col rounded-2xl bg-white border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              plan.recommended 
                ? 'border-[#2563eb] shadow-lg shadow-blue-900/5' 
                : 'border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            {/* Recommended Badge */}
            {plan.recommended && (
              <div className="absolute -top-3 left-0 right-0 flex justify-center">
                <span className="bg-[#2563eb] text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </span>
              </div>
            )}
            
            {/* Savings Badge */}
            {plan.savings && !plan.recommended && (
              <div className="absolute top-3 right-3">
                <span className="bg-green-100 text-green-700 text-[8px] font-extrabold uppercase px-2 py-1 rounded-md">
                  {plan.savings}
                </span>
              </div>
            )}
            
            {plan.savings && plan.recommended && (
              <div className="absolute top-3 right-3">
                <span className="bg-blue-100 text-[#2563eb] text-[8px] font-extrabold uppercase px-2 py-1 rounded-md">
                  {plan.savings}
                </span>
              </div>
            )}

            <div className="p-5 flex-grow flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className={`w-4 h-4 ${plan.recommended ? 'text-[#2563eb]' : 'text-slate-400'}`} />
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">
                  {plan.title}
                </h3>
              </div>

              <div className="mb-5">
                <div className="flex items-start">
                  <span className="text-sm font-bold text-slate-500 mt-1 mr-1">₹</span>
                  <span className="text-3xl font-black text-slate-900 tracking-tight">{plan.price}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                  {plan.duration}
                </p>
              </div>

              <div className="space-y-3 flex-grow mb-8">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.recommended ? 'text-[#2563eb]' : 'text-slate-300'}`} />
                    <span className="text-xs font-semibold text-slate-600 leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-[0.98] ${
                  plan.recommended
                    ? 'bg-[#2563eb] hover:bg-blue-700 text-white shadow-blue-600/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Spacer to ensure scrolling room at bottom */}
      <div className="h-8 shrink-0"></div>

    </div>
  );
};

export default SelectPackage;
