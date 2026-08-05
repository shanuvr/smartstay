import React, { useState } from 'react';
import { LifeBuoy, MessageSquare, Plus, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import UserLayout from '../../layouts/Userlayout';

const mockTickets = [
  {
    id: 'TKT-1043',
    subject: 'Customer demanding refund for cancellation',
    status: 'In Progress',
    date: '23 Oct 2026, 14:15 PM',
  },
  {
    id: 'TKT-0982',
    subject: 'Incorrect amenity listed on hotel page',
    status: 'Resolved',
    date: '10 Sep 2026, 09:00 AM',
  }
];

const UserSupport = () => {
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
    <UserLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 min-h-[70vh]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <LifeBuoy className="text-blue-600" size={32} />
              Help Center & Support
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Need help with a booking? Submit a ticket below.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <Plus size={20} />
            Create New Ticket
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
            <MessageSquare size={20} className="text-slate-600" />
            <h2 className="text-lg font-bold text-slate-800">Your Support Tickets</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {tickets.map(ticket => (
              <div key={ticket.id} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{ticket.id}</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' :
                        ticket.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                          'bg-amber-50 text-amber-700'
                      }`}>
                      {ticket.status === 'Resolved' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {ticket.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors mt-1">{ticket.subject}</h3>
                  <p className="text-sm text-slate-500 font-medium">{ticket.date}</p>
                </div>
                <div className="text-slate-400 group-hover:text-blue-600 transition-colors hidden md:block">
                  <ChevronRight size={24} />
                </div>
              </div>
            ))}
            {tickets.length === 0 && (
              <div className="p-12 text-center text-slate-500">
                <p>You have no support tickets.</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-800">Submit a New Ticket</h3>
                <p className="text-sm text-slate-500 mt-1">Our support team will get back to you within 24 hours.</p>
              </div>
              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="E.g., Issue with booking BKG-4412-AB"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Describe your issue in detail..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-800 resize-none"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserSupport;
