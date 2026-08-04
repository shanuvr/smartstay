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
  Percent,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;

const chartData = [
  { name: 'Mar 2026', gross: 85000, payout: 72250, commission: 12750 },
  { name: 'Apr 2026', gross: 112000, payout: 95200, commission: 16800 },
  { name: 'May 2026', gross: 98000, payout: 83300, commission: 14700 },
  { name: 'Jun 2026', gross: 145000, payout: 123250, commission: 21750 },
  { name: 'Jul 2026', gross: 198000, payout: 168300, commission: 29700 },
  { name: 'Aug 2026', gross: 165000, payout: 140250, commission: 24750 }
];

const initialTransactions = [
  { id: 'TXN-93821', date: '2026-08-04', guestName: 'Aarav Sharma', bookingId: 'SS-98234', total: 4500, commission: 675, netPayout: 3825, method: 'UPI (GPay)', status: 'Settled' },
  { id: 'TXN-93820', date: '2026-08-04', guestName: 'Priya Patel', bookingId: 'SS-98235', total: 7500, commission: 1125, netPayout: 6375, method: 'Credit Card', status: 'Settled' },
  { id: 'TXN-93815', date: '2026-08-02', guestName: 'Rohan Mehta', bookingId: 'SS-98236', total: 6000, commission: 900, netPayout: 5100, method: 'Net Banking', status: 'Settled' },
  { id: 'TXN-93798', date: '2026-07-28', guestName: 'Sanjay Dutt', bookingId: 'SS-98201', total: 9800, commission: 1470, netPayout: 8330, method: 'UPI (PhonePe)', status: 'Settled' }
];

const payoutStatements = [
  { id: 'STMT-2026-W31', period: '28 Jul - 03 Aug 2026', grossSales: 165000, commission: 24750, netPayout: 140250, date: '2026-08-04', status: 'Transferred' },
  { id: 'STMT-2026-W30', period: '21 Jul - 27 Jul 2026', grossSales: 198000, commission: 29700, netPayout: 168300, date: '2026-07-28', status: 'Transferred' }
];

const Finance = () => {
  const [transactions] = useState(initialTransactions);
  const [statements] = useState(payoutStatements);
  const [activeSubTab, setActiveSubTab] = useState('transactions');

  const grossBookingVolume = 705800; // Total Gross Sales
  const platformCommission = 105870; // 15% SmartStay cut
  const netHotelPayout = 599930; // 85% Hotel Owner Payout

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col relative p-4 md:p-8 overflow-hidden w-full max-w-full">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Finance & Payouts</h1>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md">
              15% Commission Model
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">Track guest booking volume, SmartStay 15% platform fee, and net weekly bank transfers.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors self-start shadow-sm whitespace-nowrap shrink-0">
          <Download size={16} />
          Export Payout Statement
        </button>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
        
        {/* Gross Booking Volume */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 xl:p-5 flex items-center justify-between gap-2 overflow-hidden">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block truncate">Gross Booking Volume</span>
            <span className="text-xl lg:text-2xl font-extrabold text-slate-800 mt-1.5 block truncate">{formatINR(grossBookingVolume)}</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
            <IndianRupee size={20} />
          </div>
        </div>

        {/* Net Hotel Payout (85%) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 xl:p-5 flex items-center justify-between gap-2 overflow-hidden">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block truncate">Net Payout to Hotel (85%)</span>
            <span className="text-xl lg:text-2xl font-extrabold text-emerald-600 mt-1.5 block truncate">{formatINR(netHotelPayout)}</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
            <CheckCircle2 size={20} />
          </div>
        </div>

        {/* SmartStay Platform Commission (15%) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 xl:p-5 flex items-center justify-between gap-2 overflow-hidden">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block truncate">SmartStay Fee (15%)</span>
            <span className="text-xl lg:text-2xl font-extrabold text-slate-800 mt-1.5 block truncate">{formatINR(platformCommission)}</span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
            <Percent size={20} />
          </div>
        </div>

        {/* Partnership Rate */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 xl:p-5 flex items-center justify-between gap-2 overflow-hidden">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block truncate">Listing Plan</span>
            <span className="text-[15px] font-extrabold text-slate-800 mt-2 block truncate">0% Upfront Listing</span>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-1 inline-block truncate">Weekly Payouts (Mondays)</span>
          </div>
          <div className="p-3 bg-slate-50 text-slate-600 rounded-xl shrink-0 self-start">
            <ShieldCheck size={20} />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-6 w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-800">Monthly Payout & Revenue Breakdown</h3>
            <p className="text-xs text-slate-400 mt-0.5">Gross guest payments vs net payouts remitted to your bank.</p>
          </div>
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1 text-[11px] font-semibold text-slate-500 w-fit shrink-0">
            <span className="flex items-center gap-1 px-2.5 py-1 bg-white rounded-lg text-slate-800 shadow-sm whitespace-nowrap">
              <TrendingUp size={12} className="text-emerald-500" />
              Monthly Earnings
            </span>
          </div>
        </div>

        <div className="w-full h-64 sm:h-80 -ml-4 sm:ml-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPayout" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
              <Tooltip 
                formatter={(val, name) => [formatINR(val), name === 'payout' ? 'Net Payout (85%)' : 'Gross Booking Volume']}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
              />
              <Area type="monotone" dataKey="payout" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPayout)" name="Net Payout" />
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
            Booking Settlements
          </button>
          <button
            onClick={() => setActiveSubTab('statements')}
            className={`px-3 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-xs font-bold border-b-2 transition-all uppercase tracking-wider whitespace-nowrap ${activeSubTab === 'statements' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Weekly Payout Statements
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
                  <th className="px-4 sm:px-6 py-4">Guest / Booking</th>
                  <th className="px-4 sm:px-6 py-4 text-right">Gross Total</th>
                  <th className="px-4 sm:px-6 py-4 text-right">SmartStay (15%)</th>
                  <th className="px-4 sm:px-6 py-4 text-right">Net Payout (85%)</th>
                  <th className="px-4 sm:px-6 py-4 text-center">Status</th>
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
                    <td className="px-4 sm:px-6 py-4 text-right font-bold text-slate-800">{formatINR(t.total)}</td>
                    <td className="px-4 sm:px-6 py-4 text-right text-rose-600 font-semibold">- {formatINR(t.commission)}</td>
                    <td className="px-4 sm:px-6 py-4 text-right font-bold text-emerald-600">{formatINR(t.netPayout)}</td>
                    <td className="px-4 sm:px-6 py-4 text-center">
                      <span className="inline-flex px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 whitespace-nowrap">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/20">
                  <th className="px-4 sm:px-6 py-4">Statement ID</th>
                  <th className="px-4 sm:px-6 py-4">Payout Period</th>
                  <th className="px-4 sm:px-6 py-4 text-right">Gross Sales</th>
                  <th className="px-4 sm:px-6 py-4 text-right">Commission (15%)</th>
                  <th className="px-4 sm:px-6 py-4 text-right">Net Bank Payout</th>
                  <th className="px-4 sm:px-6 py-4 text-center">Transfer Status</th>
                  <th className="px-4 sm:px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                {statements.map((stmt) => (
                  <tr key={stmt.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-4 sm:px-6 py-4 font-mono text-xs text-slate-500">{stmt.id}</td>
                    <td className="px-4 sm:px-6 py-4 text-slate-600 font-bold">{stmt.period}</td>
                    <td className="px-4 sm:px-6 py-4 text-right text-slate-600">{formatINR(stmt.grossSales)}</td>
                    <td className="px-4 sm:px-6 py-4 text-right text-rose-600 font-semibold">- {formatINR(stmt.commission)}</td>
                    <td className="px-4 sm:px-6 py-4 text-right font-bold text-emerald-600">{formatINR(stmt.netPayout)}</td>
                    <td className="px-4 sm:px-6 py-4 text-center">
                      <span className="inline-flex px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 whitespace-nowrap">
                        {stmt.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-lg transition-all" title="View Statement PDF">
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
