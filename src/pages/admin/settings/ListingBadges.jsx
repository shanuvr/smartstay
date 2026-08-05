import React, { useState } from 'react';
import { Tag, Trash2, Edit2, Plus, Sparkles, Check, AlertTriangle } from 'lucide-react';

const badgeColors = {
  green: {
    bg: 'bg-green-50 text-green-700 border-green-200',
    label: 'Green (Cancellation/Inclusions)',
    previewBg: 'bg-green-500'
  },
  orange: {
    bg: 'bg-orange-50 text-orange-700 border-orange-200',
    label: 'Orange (Promo/Deals)',
    previewBg: 'bg-orange-500'
  },
  blue: {
    bg: 'bg-blue-50 text-blue-700 border-blue-200',
    label: 'Blue (Standard features)',
    previewBg: 'bg-blue-500'
  },
  purple: {
    bg: 'bg-purple-50 text-purple-700 border-purple-200',
    label: 'Purple (Exclusive Deals)',
    previewBg: 'bg-purple-500'
  },
  red: {
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    label: 'Red (Urgency/Alerts)',
    previewBg: 'bg-rose-500'
  }
};

const initialBadges = [
  { id: 'b1', text: 'Special Package Available', color: 'orange', active: true },
  { id: 'b2', text: 'Free Cancellation on most stays', color: 'green', active: true },
  { id: 'b3', text: 'Breakfast Included', color: 'green', active: true },
  { id: 'b4', text: 'Pay at Hotel', color: 'blue', active: false }
];

const ListingBadges = () => {
  const [badges, setBadges] = useState(initialBadges);
  const [inputText, setInputText] = useState('');
  const [selectedColor, setSelectedColor] = useState('orange');
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const charLimit = 35;
  const maxActiveBadges = 3;

  const triggerError = (msg) => {
    setErrorMessage(msg);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const activeCount = badges.filter(b => b.active).length;

    if (editingId) {
      setBadges(badges.map(b => b.id === editingId ? { ...b, text: inputText, color: selectedColor } : b));
      setEditingId(null);
    } else {
      const shouldBeActive = activeCount < maxActiveBadges;
      const newBadge = {
        id: `b-${Date.now()}`,
        text: inputText,
        color: selectedColor,
        active: shouldBeActive
      };
      setBadges([...badges, newBadge]);
      if (!shouldBeActive) {
        triggerError(`Badge added as inactive. You've reached the maximum limit of ${maxActiveBadges} active badges.`);
      }
    }
    setInputText('');
  };

  const handleEditClick = (badge) => {
    setEditingId(badge.id);
    setInputText(badge.text);
    setSelectedColor(badge.color);
  };

  const handleDelete = (id) => {
    setBadges(badges.filter(b => b.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setInputText('');
    }
  };

  const toggleActive = (id) => {
    const badgeToToggle = badges.find(b => b.id === id);
    if (!badgeToToggle) return;

    const activeCount = badges.filter(b => b.active).length;

    if (!badgeToToggle.active && activeCount >= maxActiveBadges) {
      triggerError(`Cannot activate. You can only show a maximum of ${maxActiveBadges} active badges on the listing card.`);
      return;
    }

    setErrorMessage('');
    setBadges(badges.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const activeBadgesCount = badges.filter(b => b.active).length;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      
      {/* Header Info */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 lg:p-8">
        <h2 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2">
          <Tag className="text-blue-600 w-5 h-5 md:w-[22px] md:h-[22px]" />
          Listing Badges & Highlights
        </h2>
        <p className="text-[11px] md:text-sm text-slate-500 mt-1">
          Manage promotional text, highlights, and policies shown on search result cards. These help attract guests.
        </p>
      </div>

      {/* Error / Warning Alert */}
      {errorMessage && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl text-amber-800 text-sm font-semibold flex items-center gap-2.5 shadow-sm animate-in slide-in-from-top-2 duration-300">
          <AlertTriangle size={18} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Middle Columns: Creator & List */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Create / Edit Badge Form */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6">
            <h3 className="text-sm md:text-base font-bold text-slate-800 mb-3 md:mb-4">
              {editingId ? 'Edit Highlight Badge' : 'Add New Highlight Badge'}
            </h3>
            
            <form onSubmit={handleAddOrEdit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-600">Badge Text</label>
                  <span className={`text-[11px] font-bold ${inputText.length > charLimit ? 'text-red-500' : 'text-slate-400'}`}>
                    {inputText.length} / {charLimit} char limit
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={charLimit}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="e.g. Free Cancellation, Breakfast Included"
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-slate-50 border border-slate-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-medium"
                />
              </div>

              {/* Color Picker */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Select Style / Theme</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {Object.entries(badgeColors).map(([key, style]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedColor(key)}
                      className={`flex items-center gap-2 p-2 border rounded-xl transition-all text-xs font-semibold ${selectedColor === key ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                    >
                      <span className={`w-3 h-3 rounded-full ${style.previewBg}`} />
                      <span className="truncate">{key.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed px-4 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-all shadow-sm"
                >
                  {editingId ? <Check className="w-4 h-4 md:w-[16px] md:h-[16px]" /> : <Plus className="w-4 h-4 md:w-[16px] md:h-[16px]" />}
                  {editingId ? 'Update Badge' : 'Add Badge'}
                </button>
                
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setInputText('');
                    }}
                    className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List of Badges */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 flex flex-col gap-3 md:gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 md:pb-3">
              <h3 className="text-sm md:text-base font-bold text-slate-800">Existing Badges</h3>
              <span className="text-[10px] md:text-xs text-slate-500 font-semibold">{badges.length} items</span>
            </div>
            
            <div className="space-y-3">
              {badges.map((badge) => {
                const colorStyle = badgeColors[badge.color] || badgeColors.blue;
                return (
                  <div 
                    key={badge.id} 
                    className={`flex items-center justify-between p-3.5 border rounded-2xl transition-all ${badge.active ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50/50 border-slate-100 opacity-60'}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Active/Inactive Toggle */}
                      <button
                        onClick={() => toggleActive(badge.id)}
                        className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${badge.active ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${badge.active ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>

                      {/* Badge Preview */}
                      <span className={`inline-block px-2.5 py-1 text-[11px] font-bold border rounded-md truncate max-w-[180px] sm:max-w-[280px] ${colorStyle.bg}`}>
                        {badge.text}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditClick(badge)}
                        className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-lg transition-colors"
                        title="Edit Badge"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(badge.id)}
                        className="p-1.5 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-lg transition-colors"
                        title="Delete Badge"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {badges.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm font-medium">
                  No highlight badges defined yet. Add some above.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Live Card Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 sticky top-6">
            <h3 className="text-sm md:text-base font-bold text-slate-800 mb-3 md:mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 md:w-[16px] md:h-[16px] text-yellow-500" />
              Live Listing Preview
            </h3>
            
            <div className="border border-slate-100 rounded-xl md:rounded-2xl overflow-hidden shadow-md bg-white">
              {/* Hotel image mockup */}
              <div className="h-36 bg-gradient-to-tr from-slate-200 to-slate-100 relative flex items-center justify-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hotel Cover Image</span>
                <span className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                  8.8 Fabulous
                </span>
              </div>
              
              {/* Hotel details mockup */}
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">SmartStay Grand Hotel</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Downtown, Mumbai</p>
                </div>

                {/* Badge tags container */}
                <div className="flex flex-wrap gap-1.5 min-h-[36px] py-1 border-y border-slate-50">
                  {badges.filter(b => b.active).map((b) => {
                    const colorStyle = badgeColors[b.color] || badgeColors.blue;
                    return (
                      <span 
                        key={b.id} 
                        className={`inline-block px-1.5 py-0.5 text-[9px] font-bold border rounded ${colorStyle.bg} animate-in zoom-in-95 duration-200`}
                      >
                        {b.text}
                      </span>
                    );
                  })}
                  
                  {activeBadgesCount === 0 && (
                    <span className="text-[10px] text-slate-400 italic">No active badges</span>
                  )}
                </div>

                <div className="flex justify-between items-end pt-1">
                  <div>
                    <span className="text-[8px] text-slate-400 block line-through">INR 3,500</span>
                    <span className="text-xs font-bold text-slate-800">INR 2,250</span>
                    <span className="text-[8px] text-slate-400 block font-medium">/ night</span>
                  </div>
                  <button type="button" className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">
                    Book Room
                  </button>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed text-center">
              Badges configured here dynamically update the search listing highlights. Keep texts brief and enticing for higher click rates!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ListingBadges;
