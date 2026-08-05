import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  X,
  LifeBuoy,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Building2,
  Send
} from 'lucide-react';

const SuperAdminSupport = () => {
  // Mock data for support tickets
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-1042',
      subject: 'Disputing commission invoice for October',
      type: 'Partner Support',
      requester: 'Hyatt Group India',
      email: 'finance@hyatt.in',
      priority: 'High',
      status: 'Open',
      date: '24 Oct 2026, 09:30 AM',
      messages: [
        { sender: 'Partner', text: 'Hi, our commission invoice for October seems to include bookings that were cancelled. Can you please check and adjust the billed amount?', time: '24 Oct, 09:30 AM' },
        { sender: 'System', text: 'Ticket assigned to Finance Team.', time: '24 Oct, 09:35 AM' }
      ]
    },
    {
      id: 'TKT-1043',
      subject: 'Customer demanding refund for cancellation',
      type: 'Dispute',
      requester: 'Rahul Sharma',
      email: 'rahul.s@example.com',
      priority: 'Medium',
      status: 'In Progress',
      date: '23 Oct 2026, 14:15 PM',
      messages: [
        { sender: 'Guest', text: 'The hotel refused my check-in because I arrived late, but I was charged full price. I need a refund!', time: '23 Oct, 14:15 PM' },
        { sender: 'Support Agent', text: 'Hi Rahul, we are sorry for the inconvenience. We are contacting the property (Goa Stays Ltd) to verify their no-show policy.', time: '23 Oct, 15:00 PM' },
        { sender: 'Guest', text: 'Okay, please resolve this quickly.', time: '23 Oct, 15:10 PM' }
      ]
    },
    {
      id: 'TKT-1044',
      subject: 'Update KYC document',
      type: 'Partner Support',
      requester: 'Himalayan Retreats',
      email: 'contact@himalayan-retreats.in',
      priority: 'Low',
      status: 'Open',
      date: '22 Oct 2026, 11:20 AM',
      messages: [
        { sender: 'Partner', text: 'I need to upload our new GST registration certificate. Where can I do this?', time: '22 Oct, 11:20 AM' }
      ]
    },
    {
      id: 'TKT-1045',
      subject: 'Cannot log into partner dashboard',
      type: 'Technical',
      requester: 'Goa Stays Ltd',
      email: 'hello@goastays.com',
      priority: 'High',
      status: 'Closed',
      date: '20 Oct 2026, 16:45 PM',
      messages: [
        { sender: 'Partner', text: 'I am getting a 500 error when trying to access the dashboard.', time: '20 Oct, 16:45 PM' },
        { sender: 'Support Agent', text: 'We had a brief server outage. It has been resolved. Please clear your cache and try again.', time: '20 Oct, 17:10 PM' },
        { sender: 'Partner', text: 'Working now, thanks.', time: '20 Oct, 17:30 PM' }
      ]
    },
    {
      id: 'TKT-1046',
      subject: 'Fake review on my property',
      type: 'Dispute',
      requester: 'Sharma Hospitality',
      email: 'admin@sharma-stays.com',
      priority: 'Medium',
      status: 'Closed',
      date: '18 Oct 2026, 10:05 AM',
      messages: [
        { sender: 'Partner', text: 'User Priya Patel left a 1-star review but they never actually checked in! Please remove it.', time: '18 Oct, 10:05 AM' },
        { sender: 'Support Agent', text: 'We have verified the system logs and confirmed it was a no-show. The review has been removed as per our policy.', time: '19 Oct, 09:00 AM' }
      ]
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal State
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Filter tickets based on search and status
  const filteredTickets = tickets.filter(tkt => {
    const matchesSearch = tkt.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tkt.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tkt.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || tkt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openModal = (tkt) => {
    setSelectedTicket(tkt);
    setIsModalOpen(true);
    setReplyText('');
  };

  const handleSendReply = () => {
    if(!replyText.trim()) return;
    
    const updatedTicket = {
      ...selectedTicket,
      status: 'In Progress',
      messages: [
        ...selectedTicket.messages,
        { sender: 'Support Agent', text: replyText, time: 'Just now' }
      ]
    };
    
    setTickets(tickets.map(t => t.id === updatedTicket.id ? updatedTicket : t));
    setSelectedTicket(updatedTicket);
    setReplyText('');
  };

  const markAsResolved = () => {
    const updatedTicket = { ...selectedTicket, status: 'Closed' };
    setTickets(tickets.map(t => t.id === updatedTicket.id ? updatedTicket : t));
    setSelectedTicket(updatedTicket);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Closed': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 whitespace-nowrap"><CheckCircle size={12} /> Closed</span>;
      case 'Open': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200 whitespace-nowrap"><AlertCircle size={12} /> Open</span>;
      case 'In Progress': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 whitespace-nowrap"><Clock size={12} /> In Progress</span>;
      default: return null;
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'High': return <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold uppercase tracking-wider whitespace-nowrap">High</span>;
      case 'Medium': return <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-bold uppercase tracking-wider whitespace-nowrap">Medium</span>;
      case 'Low': return <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold uppercase tracking-wider whitespace-nowrap">Low</span>;
      default: return null;
    }
  };

  return (
    <div className="animate-in fade-in duration-300 relative h-full flex flex-col">
      
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Support Tickets</h1>
          <p className="text-sm text-slate-500 mt-1">Manage partner disputes, customer complaints, and technical issues.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <LifeBuoy size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Open Tickets</p>
              <p className="text-lg font-bold text-slate-800 leading-none mt-0.5">
                {tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col">
        
        {/* Filters Bar */}
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 justify-between bg-slate-50/50 shrink-0">
          <div className="relative w-full sm:w-[350px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Subject, Requester, or ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 placeholder:text-slate-400 font-medium shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <Filter size={14} /> Filter
            </span>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {['All', 'Open', 'In Progress', 'Closed'].map((status) => (
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
        <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-white border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Ticket details</th>
                <th className="px-6 py-4">Requester</th>
                <th className="px-6 py-4 text-center">Category</th>
                <th className="px-6 py-4 text-center">Priority</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                    <MessageSquare className="mx-auto h-12 w-12 text-slate-200 mb-3" />
                    <p className="text-sm font-medium">No tickets found matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredTickets.map((tkt) => (
                  <tr 
                    key={tkt.id} 
                    onClick={() => openModal(tkt)}
                    className={`hover:bg-slate-50/80 transition-colors group cursor-pointer ${
                      tkt.status === 'Closed' ? 'opacity-60' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <h3 className="text-[14px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{tkt.subject}</h3>
                        <span className="text-[11px] font-semibold text-slate-400 font-mono">{tkt.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-slate-700">{tkt.requester}</span>
                        <span className="text-xs font-semibold text-slate-500">{tkt.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200 whitespace-nowrap inline-flex items-center justify-center min-w-[110px]">
                        {tkt.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getPriorityBadge(tkt.priority)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(tkt.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">{tkt.date}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-sm font-medium text-slate-500 shrink-0">
          <div>Showing <span className="text-slate-800 font-bold">{filteredTickets.length}</span> tickets</div>
          
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors cursor-not-allowed opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-blue-600 bg-blue-50 text-blue-600 font-semibold mx-1">
              1
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors cursor-not-allowed opacity-50" disabled>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Ticket Details & Chat Modal */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="pr-8">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-xs bg-slate-200 px-1.5 rounded font-bold text-slate-600">{selectedTicket.id}</span>
                  {getPriorityBadge(selectedTicket.priority)}
                  {getStatusBadge(selectedTicket.status)}
                </div>
                <h2 className="text-lg font-bold text-slate-800 leading-tight">{selectedTicket.subject}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors bg-white shadow-sm border border-slate-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Layout - 2 Columns */}
            <div className="flex flex-1 overflow-hidden">
              
              {/* Left Column: Chat History */}
              <div className="flex-1 flex flex-col border-r border-slate-100 bg-white">
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
                  {selectedTicket.messages.map((msg, idx) => {
                    const isSystem = msg.sender === 'System';
                    const isAgent = msg.sender === 'Support Agent';
                    const isGuest = msg.sender === 'Guest' || msg.sender === 'Partner';
                    
                    if (isSystem) {
                      return (
                        <div key={idx} className="flex justify-center my-4">
                          <span className="bg-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-slate-200">
                            {msg.text} • {msg.time}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div key={idx} className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-2 mb-1 px-1">
                          <span className="text-xs font-bold text-slate-600">{msg.sender}</span>
                          <span className="text-[10px] font-semibold text-slate-400">{msg.time}</span>
                        </div>
                        <div className={`px-4 py-3 rounded-2xl max-w-[85%] ${
                          isAgent 
                            ? 'bg-blue-600 text-white rounded-tr-sm shadow-sm' 
                            : 'bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200'
                        }`}>
                          <p className="text-sm font-medium">{msg.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reply Box */}
                {selectedTicket.status !== 'Closed' ? (
                  <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
                    <div className="relative">
                      <textarea 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply here..." 
                        className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 resize-none h-20 shadow-sm"
                      />
                      <button 
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className="absolute right-3 bottom-3 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors shadow-sm"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border-t border-slate-100 bg-slate-50 text-center shrink-0">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">This ticket is closed and cannot be replied to.</p>
                  </div>
                )}
              </div>

              {/* Right Column: Sidebar Info */}
              <div className="w-64 bg-slate-50 p-6 overflow-y-auto hidden md:block">
                
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-200">Requester Details</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border border-slate-300">
                      {selectedTicket.type === 'Partner Support' ? <Building2 size={16} className="text-slate-500"/> : <User size={16} className="text-slate-500"/>}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{selectedTicket.requester}</p>
                      <p className="text-[11px] font-semibold text-slate-500">{selectedTicket.type === 'Partner Support' ? 'Partner Account' : 'Guest Account'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                    <p className="text-sm font-medium text-slate-700">{selectedTicket.email}</p>
                  </div>
                </div>

                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-200">Ticket Info</h3>
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</p>
                    <p className="text-sm font-medium text-slate-700">{selectedTicket.type}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Created At</p>
                    <p className="text-sm font-medium text-slate-700">{selectedTicket.date}</p>
                  </div>
                </div>

                {/* Actions */}
                {selectedTicket.status !== 'Closed' && (
                  <button 
                    onClick={markAsResolved}
                    className="w-full py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={16} /> Mark as Resolved
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminSupport;
