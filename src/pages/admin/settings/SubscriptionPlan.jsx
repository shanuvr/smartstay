import React from 'react';
import { CreditCard, CheckCircle2, AlertCircle, ArrowRight, Package } from 'lucide-react';

const SubscriptionPlan = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
          <Package size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">Subscription Plan</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage your SmartStay listing plan and billing</p>
        </div>
      </div>

      <div className="p-6">
        {/* Current Plan Section */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Current Plan</h3>
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-extrabold text-slate-800">6 Months Listing Plan</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Active</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Your property is currently listed and visible to guests.</p>
              <div className="flex flex-col sm:flex-row gap-4 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CreditCard size={14} className="text-slate-400" />
                  Billed: ₹1,180 (incl. GST)
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-green-500" />
                  Renews: Feb 01, 2027
                </div>
              </div>
            </div>
            
            <div className="shrink-0">
              <button className="w-full md:w-auto px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-sm font-bold rounded-xl transition-all shadow-sm">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Upgrade Plan Section */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-4">Available Upgrades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* 1 Year Plan */}
            <div className="border-2 border-slate-200 hover:border-blue-500 rounded-xl p-5 transition-all cursor-pointer group flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">1 Year Listing Plan</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Best Value</p>
                </div>
                <span className="text-lg font-extrabold text-slate-800">₹1,800<span className="text-xs text-slate-400 font-normal">/yr</span></span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                  <span>Save ₹200 compared to 6-month renewals</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                  <span>Priority search ranking for 30 days</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                  <span>Premium partner support access</span>
                </li>
              </ul>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white rounded-lg text-sm font-bold transition-colors">
                Upgrade to 1 Year
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Lifetime Plan */}
            <div className="border-2 border-slate-200 hover:border-purple-500 rounded-xl p-5 transition-all cursor-pointer group flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-lg">
                Exclusive
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">Lifetime Listing Plan</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">One time payment</p>
                </div>
                <span className="text-lg font-extrabold text-slate-800">₹4,999</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-purple-500 mt-0.5 shrink-0" />
                  <span>Never pay renewal fees again</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-purple-500 mt-0.5 shrink-0" />
                  <span>Permanent "Verified Partner" badge</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-purple-500 mt-0.5 shrink-0" />
                  <span>Zero commissions on direct bookings</span>
                </li>
              </ul>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white rounded-lg text-sm font-bold transition-colors">
                Get Lifetime Access
                <ArrowRight size={16} />
              </button>
            </div>
            
          </div>
        </div>

        {/* Warning Footer */}
        <div className="mt-8 flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
          <AlertCircle size={20} className="text-orange-500 shrink-0 mt-0.5" />
          <p className="text-xs text-orange-800 font-medium leading-relaxed">
            Upgrading your plan will take effect immediately. The remaining value of your current 6 Months Listing Plan will be pro-rated and automatically deducted from the upgrade cost.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionPlan;
