import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  IndianRupee, 
  Download, 
  CreditCard, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  FileText,
  Building2,
  Calendar
} from 'lucide-react';

const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;

const chartData = [
  { name: 'Mar 2026', revenue: 85000 },
  { name: 'Apr 2026', revenue: 112000 },
  { name: 'May 2026', revenue: 98000 },
  { name: 'Jun 2026', revenue: 145000 },
  { name: 'Jul 2026', revenue: 198000 },
  { name: 'Aug 2026', revenue: 165000 }
];

const initialTransactions = [
  { id: 'TXN-93821', date: '2026-08-04', guestName: 'Aarav Sharma', bookingId: 'SS-98234', amount: 4500, method: 'UPI (GPay)', status: 'Received' },
  { id: 'TXN-93820', date: '2026-08-04', guestName: 'Priya Patel', bookingId: 'SS-98235', amount: 7500, method: 'Credit Card (•••• 5678)', status: 'Received' },
  { id: 'TXN-93815', date: '2026-08-02', guestName: 'Rohan Mehta', bookingId: 'SS-98236', amount: 6000, method: 'Net Banking (SBI)', status: 'Received' },
  { id: 'TXN-93798', date: '2026-07-28', guestName: 'Sanjay Dutt', bookingId: 'SS-98201', amount: 9800, method: 'UPI (PhonePe)', status: 'Received' }
];

const subscriptionInvoices = [
  { id: 'SS-SUB-8231', date: '2026-08-01', packageName: '6 Months Listing Plan', baseAmount: 1000, gst: 180, totalAmount: 1180, status: 'Paid' }
];

const Finance = () => {
  const [transactions] = useState(initialTransactions);
  const [invoices] = useState(subscriptionInvoices);
  const [activeSubTab, setActiveSubTab] = useState('transactions');

  const totalBookingRevenue = 705800; // Total guest booking revenue received directly
  const activePlan = '6 Months Listing Plan';
  const planExpiry = '2027-02-01'; // 6 months from Aug 1st
  const subscriptionPaid = 1180;
  const directBookingsCount = 142;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col relative p-4 md:p-8 overflow-hidden w-full max-w-full">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Finance Overview</h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">Track direct guest booking payments and manage your SmartStay listing subscriptions.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors self-start shadow-sm whitespace-nowrap shrink-0">
          <Download size={16} />
          Export Earnings Report
        </button>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
        
        {/* Total direct revenue */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 xl:p-5 flex items-center justify-between gap-2 overflow-hidden">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block truncate">Total Booking Revenue</span>
            <span className="text-xl lg:text-2xl font-extrabold text-slate-800 mt-1.5 block truncate">{formatINR(totalBookingRevenue)}</span>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-xl shrink-0">
            <IndianRupee size={20} />
          </div>
        </div>

        {/* Active plan status */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 xl:p-5 flex items-center justify-between gap-2 overflow-hidden">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block truncate">Active Listing Plan</span>
            <span className="text-[15px] font-extrabold text-slate-800 mt-2 block truncate">{activePlan}</span>
            <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded mt-1 inline-block truncate">Renews {planExpiry}</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0 self-start">
            <Building2 size={20} />
          </div>
        </div>

        {/* Subscription listing paid */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 xl:p-5 flex items-center justify-between gap-2 overflow-hidden">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block truncate">Listing Fee Paid</span>
            <span className="text-xl lg:text-2xl font-extrabold text-slate-800 mt-1.5 block truncate">{formatINR(subscriptionPaid)}</span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
            <CreditCard size={20} />
          </div>
        </div>

        {/* Total stays */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 xl:p-5 flex items-center justify-between gap-2 overflow-hidden">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block truncate">Direct Booking Stays</span>
            <span className="text-xl lg:text-2xl font-extrabold text-slate-800 mt-1.5 block truncate">{directBookingsCount} stays</span>
          </div>
          <div className="p-3 bg-slate-50 text-slate-600 rounded-xl shrink-0">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-6 w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-800">Monthly Revenue Trend</h3>
            <p className="text-xs text-slate-400 mt-0.5">Total direct bookings revenue received directly into your bank.</p>
          </div>
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1 text-[11px] font-semibold text-slate-500 w-fit shrink-0">
            <span className="flex items-center gap-1 px-2.5 py-1 bg-white rounded-lg text-slate-800 shadow-sm whitespace-nowrap">
              <TrendingUp size={12} className="text-blue-500" />
              Monthly Revenue
            </span>
          </div>
        </div>

        <div className="w-full h-64 sm:h-80 -ml-4 sm:ml-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
              <Tooltip 
                formatter={(val) => [formatINR(val), 'Revenue']}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
              />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" name="Direct Bookings Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction Details Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8 w-full max-w-[100vw]">
        
        {/* Sub-tabs Header */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/50 px-2 sm:px-5 py-1 no-scrollbar">
          <button
            onClick={() => setActiveSubTab('transactions')}
            className={`px-3 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-xs font-bold border-b-2 transition-all uppercase tracking-wider whitespace-nowrap ${activeSubTab === 'transactions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Direct Guest Payments
          </button>
          <button
            onClick={() => setActiveSubTab('invoices')}
            className={`px-3 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-xs font-bold border-b-2 transition-all uppercase tracking-wider whitespace-nowrap ${activeSubTab === 'invoices' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            SmartStay Listing Invoices
          </button>
        </div>

        {/* Tab Contents */}
        <div className="w-full overflow-x-auto">
          {activeSubTab === 'transactions' ? (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/20">
                  <th className="px-4 sm:px-6 py-4">Transaction ID</th>
                  <th className="px-4 sm:px-6 py-4">Date</th>
                  <th className="px-4 sm:px-6 py-4">Guest / Reservation</th>
                  <th className="px-4 sm:px-6 py-4">Payment Method</th>
                  <th className="px-4 sm:px-6 py-4 text-right">Amount Settled</th>
                  <th className="px-4 sm:px-6 py-4 text-center">Status</th>
                  <th className="px-4 sm:px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-4 sm:px-6 py-4 font-mono text-xs text-slate-500">{t.id}</td>
                    <td className="px-4 sm:px-6 py-4 text-slate-600">{t.date}</td>
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <span className="font-bold text-slate-800">{t.guestName}</span>
                        <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{t.bookingId}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-slate-600 whitespace-nowrap">
                        <CreditCard size={14} className="text-slate-400 shrink-0" />
                        <span>{t.method}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right font-bold text-slate-800">{formatINR(t.amount)}</td>
                    <td className="px-4 sm:px-6 py-4 text-center">
                      <span className="inline-flex px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-green-50 text-green-700 whitespace-nowrap">
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-lg transition-all" title="Download Receipt">
                        <Download size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/20">
                  <th className="px-4 sm:px-6 py-4">Invoice ID</th>
                  <th className="px-4 sm:px-6 py-4">Invoice Date</th>
                  <th className="px-4 sm:px-6 py-4">Listing Package Details</th>
                  <th className="px-4 sm:px-6 py-4 text-right">Base Amount</th>
                  <th className="px-4 sm:px-6 py-4 text-right">GST (18%)</th>
                  <th className="px-4 sm:px-6 py-4 text-right">Total Paid</th>
                  <th className="px-4 sm:px-6 py-4 text-center">Status</th>
                  <th className="px-4 sm:px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-4 sm:px-6 py-4 font-mono text-xs text-slate-500">{inv.id}</td>
                    <td className="px-4 sm:px-6 py-4 text-slate-600">{inv.date}</td>
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <span className="font-bold text-slate-800 whitespace-nowrap">{inv.packageName}</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">Subscription Renewal Invoice</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right text-slate-600">{formatINR(inv.baseAmount)}</td>
                    <td className="px-4 sm:px-6 py-4 text-right text-slate-600">{formatINR(inv.gst)}</td>
                    <td className="px-4 sm:px-6 py-4 text-right font-bold text-slate-800">{formatINR(inv.totalAmount)}</td>
                    <td className="px-4 sm:px-6 py-4 text-center">
                      <span className="inline-flex px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 whitespace-nowrap">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-lg transition-all" title="View Subscription Invoice">
                        <FileText size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Finance;
