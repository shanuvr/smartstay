import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  X,
  CreditCard,
  TrendingUp,
  Download,
  Building2,
  Calendar,
  IndianRupee,
  CheckCircle,
  Clock,
  Ban
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Jan', volume: 400000, commission: 60000 },
  { name: 'Feb', volume: 300000, commission: 45000 },
  { name: 'Mar', volume: 550000, commission: 82500 },
  { name: 'Apr', volume: 450000, commission: 67500 },
  { name: 'May', volume: 700000, commission: 105000 },
  { name: 'Jun', volume: 900000, commission: 135000 },
];

const SuperAdminFinance = () => {
  // Mock data for transactions
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-9021',
      date: '24 Oct 2026, 14:30',
      type: 'Booking',
      partner: 'Hyatt Group India',
      property: 'Grand Hyatt Mumbai',
      amount: 24000,
      commissionPercent: 15,
      commissionAmount: 3600,
      netPayout: 20400,
      status: 'Completed',
      paymentMethod: 'Credit Card (Visa)',
      guest: 'Rahul Sharma',
      reference: 'BK-7781-MMX'
    },
    {
      id: 'TXN-9022',
      date: '23 Oct 2026, 09:15',
      type: 'Subscription',
      partner: 'Sharma Hospitality',
      property: 'Platform Subscription',
      amount: 4999,
      commissionPercent: 100,
      commissionAmount: 4999,
      netPayout: 0,
      status: 'Completed',
      paymentMethod: 'Net Banking',
      guest: 'N/A',
      reference: 'SUB-PREM-OCT'
    },
    {
      id: 'TXN-9023',
      date: '22 Oct 2026, 18:45',
      type: 'Booking',
      partner: 'Goa Stays Ltd',
      property: 'Goa Beachfront Villa',
      amount: 18000,
      commissionPercent: 15,
      commissionAmount: 2700,
      netPayout: 15300,
      status: 'Unpaid',
      paymentMethod: 'UPI',
      guest: 'Priya Patel',
      reference: 'BK-5542-GOA'
    },
    {
      id: 'TXN-9024',
      date: '20 Oct 2026, 11:20',
      type: 'Refund',
      partner: 'Himalayan Retreats',
      property: 'Mountain View Lodge',
      amount: 12000,
      commissionPercent: 15,
      commissionAmount: -1800,
      netPayout: -10200,
      status: 'Refunded',
      paymentMethod: 'Original Source',
      guest: 'Amit Kumar',
      reference: 'RF-3321-HIM'
    },
    {
      id: 'TXN-9025',
      date: '19 Oct 2026, 16:10',
      type: 'Booking',
      partner: 'QuickStays',
      property: 'Delhi Airport Transit',
      amount: 8500,
      commissionPercent: 15,
      commissionAmount: 1275,
      netPayout: 7225,
      status: 'Unpaid',
      paymentMethod: 'Debit Card',
      guest: 'Vikram Singh',
      reference: 'BK-1109-DEL'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [isConfirmingPayment, setIsConfirmingPayment] = useState(false);
  const [paymentReference, setPaymentReference] = useState('');

  // Filter transactions
  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.partner.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          txn.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || txn.status === statusFilter || (statusFilter === 'Revenue' && (txn.type === 'Booking' || txn.type === 'Subscription'));
    return matchesSearch && matchesStatus;
  });

  const openModal = (txn) => {
    setSelectedTxn(txn);
    setIsConfirmingPayment(false);
    setPaymentReference('');
    setIsModalOpen(true);
  };

  const markAsPaid = (id, e) => {
    e.stopPropagation();
    setTransactions(transactions.map(t => t.id === id ? { ...t, status: 'Completed' } : t));
    if (selectedTxn && selectedTxn.id === id) {
      setSelectedTxn({ ...selectedTxn, status: 'Completed' });
    }
    setIsConfirmingPayment(false);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200"><CheckCircle size={12} /> Paid</span>;
      case 'Unpaid': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200"><Clock size={12} /> Unpaid</span>;
      case 'Refunded': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200"><Ban size={12} /> Refunded</span>;
      default: return null;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="animate-in fade-in duration-300 relative">
      
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Finance & Invoices</h1>
          <p className="text-sm text-slate-500 mt-1">Track platform revenue, invoices, and transaction history.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white hover:bg-slate-50 text-slate-700 rounded-xl shadow-sm border border-slate-200 px-4 py-2 text-sm font-bold transition-colors flex items-center gap-2">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
            <IndianRupee size={80} className="text-blue-600" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Gross Volume</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{formatCurrency(3300000)}</h3>
            <p className="text-sm font-semibold text-emerald-600 mt-2 flex items-center gap-1">
              <TrendingUp size={14} /> +12.5% this month
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
            <CreditCard size={80} className="text-emerald-600" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Platform Commission</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{formatCurrency(495000)}</h3>
            <p className="text-sm font-semibold text-emerald-600 mt-2 flex items-center gap-1">
              <TrendingUp size={14} /> +15.2% this month
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-lg relative overflow-hidden group text-white">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
            <Clock size={80} className="text-amber-400" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Unpaid Invoices</p>
            <h3 className="text-3xl font-black text-white tracking-tight">{formatCurrency(22525)}</h3>
            <p className="text-sm font-medium text-slate-300 mt-2">
              From 2 partner accounts
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 p-6">
        <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
          <TrendingUp size={18} className="text-blue-600" />
          Revenue Growth (6 Months)
        </h3>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(value, name) => [formatCurrency(value), name === 'volume' ? 'Gross Volume' : 'Platform Comm.']}
              />
              <Area type="monotone" dataKey="volume" stroke="#94a3b8" fillOpacity={1} fill="url(#colorVolume)" />
              <Area type="monotone" dataKey="commission" stroke="#2563eb" fillOpacity={1} fill="url(#colorCommission)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Filters Bar */}
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-[350px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search TXN ID, Reference, or Partner..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 placeholder:text-slate-400 font-medium shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <Filter size={14} /> Filter
            </span>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {['All', 'Revenue', 'Unpaid', 'Refunded'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                    statusFilter === status 
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 border border-transparent'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Transaction / Date</th>
                <th className="px-6 py-4">Partner / Entity</th>
                <th className="px-6 py-4 text-right">Gross Amount</th>
                <th className="px-6 py-4 text-right">Commission Billed</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                    <CreditCard className="mx-auto h-12 w-12 text-slate-200 mb-3" />
                    <p className="text-sm font-medium">No transactions found matching criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => (
                  <tr 
                    key={txn.id} 
                    onClick={() => openModal(txn)}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${
                          txn.type === 'Subscription' ? 'bg-purple-50 border-purple-100 text-purple-600' :
                          txn.type === 'Refund' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-blue-50 border-blue-100 text-blue-600'
                        }`}>
                          {txn.type === 'Subscription' ? <TrendingUp size={18} /> : 
                           txn.type === 'Refund' ? <Ban size={18} /> : <CreditCard size={18} />}
                        </div>
                        <div>
                          <h3 className="text-[13px] font-bold text-slate-800">{txn.id}</h3>
                          <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{txn.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-slate-700">{txn.partner}</span>
                        <span className="text-xs font-semibold text-slate-500">{txn.type} • {txn.reference}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-slate-700">{formatCurrency(txn.amount)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-black ${txn.commissionAmount < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {formatCurrency(txn.commissionAmount)}
                      </span>
                      <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{txn.commissionPercent}% Fee</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(txn.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {isModalOpen && selectedTxn && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <div>
                <h2 className="text-xl font-black text-slate-800">Transaction Details</h2>
                <p className="text-sm font-medium text-slate-500 flex items-center gap-2 mt-1">
                  <span className="font-mono bg-slate-200 px-1.5 rounded">{selectedTxn.id}</span>
                  <span>{selectedTxn.date}</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                {getStatusBadge(selectedTxn.status)}
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors bg-white shadow-sm border border-slate-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200 bg-white">
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Partner / Beneficiary</p>
                  <p className="text-base font-bold text-slate-800">{selectedTxn.partner}</p>
                  <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5"><Building2 size={14}/> {selectedTxn.property}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Customer / Guest</p>
                  <p className="text-base font-bold text-slate-800">{selectedTxn.guest}</p>
                  <p className="text-sm text-slate-500 mt-0.5">Paid via {selectedTxn.paymentMethod}</p>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-200">Financial Breakdown</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">Gross Transaction Amount</span>
                    <span className="text-sm font-bold text-slate-800">{formatCurrency(selectedTxn.amount)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                    <span className="text-sm font-medium text-slate-600">Commission Billed ({selectedTxn.commissionPercent}%)</span>
                    <span className={`text-sm font-black ${selectedTxn.commissionAmount < 0 ? 'text-rose-600' : 'text-blue-600'}`}>
                       {formatCurrency(Math.abs(selectedTxn.commissionAmount))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reference Data */}
              <div className="grid grid-cols-2 gap-4 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">External Reference ID</p>
                  <p className="text-sm font-mono font-medium text-slate-700">{selectedTxn.reference}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Transaction Type</p>
                  <p className="text-sm font-medium text-slate-700">{selectedTxn.type}</p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
              {isConfirmingPayment ? (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Bank Transfer / UTR Reference (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. UTR-123456789"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-lg text-sm w-full focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-3 mt-1">
                    <button 
                      onClick={() => setIsConfirmingPayment(false)}
                      className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-lg transition-colors shadow-sm"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={(e) => markAsPaid(selectedTxn.id, e)}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2"
                    >
                      <CheckCircle size={16} /> Confirm Manually Marked as Paid
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <div>
                    {selectedTxn.status === 'Unpaid' && (
                      <p className="text-xs font-bold text-amber-600 flex items-center gap-1">
                        <Clock size={14} /> Unpaid Commission Invoice
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-lg transition-colors shadow-sm"
                    >
                      Close
                    </button>
                    {selectedTxn.status === 'Unpaid' && (
                      <button 
                        onClick={() => setIsConfirmingPayment(true)}
                        className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                      >
                        Manually Mark as Paid
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminFinance;
