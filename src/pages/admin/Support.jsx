import React, { useState } from 'react';
import { LifeBuoy, MessageSquare, Plus, ChevronRight, CheckCircle2, Clock } from 'lucide-react';

const mockTickets = [
  {
    id: 'TKT-1042',
    subject: 'Disputing commission invoice for October',
    status: 'Open',
    date: '24 Oct 2026, 09:30 AM',
  }
];

const AdminSupport = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newSubject || !newMessage) return;
    
    const newTicket = {
      id: `TKT-${Math.floor(Math.random() * 9000) + 1000}`,
      subject: newSubject,
      status: 'Open',
      date: new Date().toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };
    
    setTickets([newTicket, ...tickets]);
    setIsModalOpen(false);
    setNewSubject('');
    setNewMessage('');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col relative p-4 md:p-8 overflow-hidden w-full max-w-full">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <LifeBuoy className="text-blue-600" size={28} />
            Partner Support
          </h1>
          <p className="text-sm font-semibold text-slate-500 mt-1">Need help from SmartStay? Open a ticket with our partner support team.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2 shrink-0"
        >
          <Plus size={18} />
          Create New Ticket
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden w-full max-w-[100vw]">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
          <MessageSquare size={18} className="text-slate-600" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Your Active Tickets</h2>
        </div>
        <div className="divide-y divide-slate-100 overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white">
                <th className="px-6 py-4">Ticket ID</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Date Submitted</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold text-slate-700 bg-white">
              {tickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{ticket.id}</td>
                  <td className="px-6 py-4 text-slate-800 font-bold group-hover:text-blue-600 transition-colors">{ticket.subject}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{ticket.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' :
                      ticket.status === 'Open' ? 'bg-amber-50 text-amber-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {ticket.status === 'Resolved' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400 group-hover:text-blue-600 transition-colors">
                    <ChevronRight size={20} />
                  </td>
                </tr>
              ))}
              {tickets.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-500">
                    <p>You have no open support tickets.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <h3 className="text-lg font-black text-slate-800">Submit a New Ticket</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">SmartStay partner support will respond within 12 hours.</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 bg-white">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                <input 
                  type="text" 
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="E.g., Query regarding July commission invoice" 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Message</label>
                <textarea 
                  required
                  rows={5}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Describe your issue in detail..." 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-semibold text-slate-800 resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4 border-t border-slate-100 pt-5">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 font-bold text-slate-600 text-sm hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSupport;
