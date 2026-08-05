import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, MoreVertical, Reply, CheckCircle2 } from 'lucide-react';

const mockReviews = [
  {
    id: 'REV-921',
    guestName: 'Aarav Sharma',
    bookingId: 'BKG-9928-XY',
    roomName: 'Deluxe King Room',
    rating: 5,
    title: 'Excellent stay and great service!',
    comment: 'The room was incredibly clean and the staff were very accommodating. I loved the breakfast options. Will definitely come back.',
    date: '10 Aug 2026',
    reply: null,
  },
  {
    id: 'REV-814',
    guestName: 'Priya Patel',
    bookingId: 'BKG-4412-AB',
    roomName: 'Standard Double Room',
    rating: 3,
    title: 'Good, but could be better',
    comment: 'The location is fantastic, but the AC in our room was making a lot of noise. Took a while for maintenance to fix it.',
    date: '02 Aug 2026',
    reply: 'We sincerely apologize for the inconvenience caused by the AC noise. We have since replaced the unit to ensure this does not happen again. We hope you will give us another chance!',
  }
];

const AdminReviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const submitReply = (id) => {
    if (!replyText.trim()) return;
    
    setReviews(reviews.map(r => r.id === id ? { ...r, reply: replyText } : r));
    setReplyingTo(null);
    setReplyText('');
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'} 
      />
    ));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col relative p-4 md:p-8 overflow-hidden w-full max-w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Star className="text-amber-500 fill-amber-500" size={28} />
          Guest Reviews
        </h1>
        <p className="text-sm font-semibold text-slate-500 mt-1">Manage feedback from your guests and respond to their reviews.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8">
        <div className="bg-white p-3 md:px-5 md:py-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-6">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Average Rating</p>
            <div className="flex items-end gap-1.5">
              <span className="text-xl md:text-2xl font-black text-slate-800">4.0</span>
              <span className="text-[10px] md:text-xs font-bold text-slate-400 mb-1">/ 5.0</span>
            </div>
          </div>
          <div className="flex gap-0.5">{renderStars(4)}</div>
        </div>
        
        <div className="bg-white p-3 md:px-5 md:py-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-6">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Reviews</p>
            <span className="text-xl md:text-2xl font-black text-slate-800">124</span>
          </div>
          <p className="text-[10px] md:text-xs font-semibold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded w-max"><CheckCircle2 size={12}/> +12</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {reviews.map(review => (
          <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden w-full">
            <div className="p-5 flex flex-col md:flex-row gap-5">
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {review.guestName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{review.guestName}</h3>
                      <p className="text-[11px] font-bold text-blue-600 mb-0.5">{review.roomName}</p>
                      <p className="text-[11px] font-semibold text-slate-400">Booking: {review.bookingId} • {review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{review.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
                </div>

                {review.reply ? (
                  <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-3">
                    <div className="mt-0.5"><Reply size={16} className="text-blue-500" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-700 mb-1">Your Reply</p>
                      <p className="text-sm text-slate-600 italic">{review.reply}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    {replyingTo === review.id ? (
                      <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                        <textarea 
                          rows={3} 
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply here... (Guests will see this)" 
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-800 resize-none"
                        ></textarea>
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => { setReplyingTo(null); setReplyText(''); }}
                            className="px-4 py-2 font-bold text-slate-600 text-xs hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => submitReply(review.id)}
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                          >
                            Post Reply
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setReplyingTo(review.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Reply size={16} /> Reply to Guest
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
