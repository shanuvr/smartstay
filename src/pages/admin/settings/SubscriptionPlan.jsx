import React from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, Percent, Building2, Wallet } from 'lucide-react';

const SubscriptionPlan = () => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center gap-3">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0 self-start md:self-auto">
          <Percent size={18} className="md:w-5 md:h-5" />
        </div>
        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-800">Commission & Billing Settings</h2>
          <p className="text-[11px] md:text-xs text-slate-500 mt-0.5">Manage your platform commission agreement and billing account details</p>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* Active Commission Model Section */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-xs md:text-sm font-bold text-slate-800 mb-3 md:mb-4">Active Commission Agreement</h3>
          <div className="border border-slate-200 rounded-lg md:rounded-xl p-4 md:p-5 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-sm md:text-base font-extrabold text-slate-800">15% Standard Pay-Per-Booking</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] md:text-[10px] font-bold rounded-full uppercase tracking-wider">Active</span>
              </div>
              <p className="text-[11px] md:text-xs text-slate-600 mb-3">You list for free. SmartStay invoices you 15% platform commission at the end of every month for successful bookings.</p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-[11px] md:text-xs font-medium text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  Upfront Cost: ₹0 (Free Listing)
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-blue-500" />
                  Billing Cycle: Monthly (End of Month)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registered Bank Account */}
        <div>
          <h3 className="text-xs md:text-sm font-bold text-slate-800 mb-3 md:mb-4">Commission Billing Details</h3>
          <div className="border border-slate-200 rounded-lg md:rounded-xl p-4 md:p-5 bg-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2 md:p-2.5 bg-slate-100 text-slate-700 rounded-lg mt-1 sm:mt-0">
                  <Building2 size={16} className="md:w-[18px] md:h-[18px]" />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-800">HDFC Bank (Primary Account)</h4>
                  <p className="text-[10px] md:text-xs text-slate-500 font-mono">Account Ending in •••• 4892</p>
                </div>
              </div>
              <span className="self-start sm:self-auto text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 md:px-2.5 md:py-1 rounded-md">
                Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 text-[11px] md:text-xs font-semibold text-slate-600 pt-1">
              <div>
                <span className="text-slate-400 block text-[9px] md:text-[10px] uppercase font-bold">Account Holder</span>
                <span className="text-slate-800 font-bold">SmartStay Hospitality Pvt Ltd</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] md:text-[10px] uppercase font-bold">IFSC Code</span>
                <span className="text-slate-800 font-bold">HDFC0001234</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] md:text-[10px] uppercase font-bold">Billing Method</span>
                <span className="text-slate-800 font-bold">NACH Auto-Debit</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionPlan;
