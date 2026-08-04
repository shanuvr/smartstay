import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Car,
  Briefcase,
  ArrowUpDown,
  Dumbbell,
  Wifi,
  Clock,
  Shirt,
  Sparkles,
  Utensils,
  Shield,
  Ban,
  Cigarette,
  Flower,
  Waves,
  Sun,
  Gamepad2,
  Baby,
  Tv,
  Coffee,
  Wine,
  Bus,
  Dog,
  ConciergeBell,
  Trophy,
  Accessibility,
  Globe,
  Leaf,
  Presentation,
  CreditCard,
  Droplets
} from 'lucide-react';

const iconMap = {
  'Car': Car,
  'Briefcase': Briefcase,
  'ArrowUpDown': ArrowUpDown,
  'Dumbbell': Dumbbell,
  'Wifi': Wifi,
  'Clock': Clock,
  'Shirt': Shirt,
  'Sparkles': Sparkles,
  'Utensils': Utensils,
  'Shield': Shield,
  'Ban': Ban,
  'Cigarette': Cigarette,
  'Flower': Flower,
  'Waves': Waves,
  'Sun': Sun,
  'Gamepad2': Gamepad2,
  'Baby': Baby,
  'Tv': Tv,
  'Coffee': Coffee,
  'Wine': Wine,
  'Bus': Bus,
  'Dog': Dog,
  'ConciergeBell': ConciergeBell,
  'Trophy': Trophy,
  'Accessibility': Accessibility,
  'Globe': Globe,
  'Leaf': Leaf,
  'Presentation': Presentation,
  'CreditCard': CreditCard,
  'Droplets': Droplets,
};

const initialCategories = [
  {
    category: 'Guest favorites',
    total: 15,
    items: [
      { id: 'f1', name: 'Car park', icon: 'Car' },
      { id: 'f2', name: 'Daily housekeeping', icon: 'Briefcase' },
      { id: 'f3', name: 'Elevator', icon: 'ArrowUpDown' },
      { id: 'f4', name: 'Fitness center [free]', icon: 'Dumbbell' },
      { id: 'f5', name: 'Free Wi-Fi in all rooms!', icon: 'Wifi' },
      { id: 'f6', name: 'Front desk [24-hour]', icon: 'Clock' },
      { id: 'f7', name: 'Laundry service', icon: 'Shirt' },
      { id: 'f8', name: 'Luggage storage', icon: 'Briefcase' },
      { id: 'f9', name: 'Massage', icon: 'Sparkles' },
      { id: 'f10', name: 'Restaurants', icon: 'Utensils' },
      { id: 'f11', name: 'Security [24-hour]', icon: 'Shield' },
      { id: 'f12', name: 'Smoke-free property', icon: 'Ban' },
      { id: 'f13', name: 'Smoking area', icon: 'Cigarette' },
      { id: 'f14', name: 'Spa', icon: 'Flower' },
      { id: 'f15', name: 'Wi-Fi in public areas', icon: 'Wifi' },
    ]
  },
  { 
    category: 'Things to do, ways to relax', 
    total: 47, 
    items: [
      { id: 'f16', name: 'Swimming pool', icon: 'Waves' },
      { id: 'f17', name: 'Sauna', icon: 'Sun' },
      { id: 'f18', name: 'Game room', icon: 'Gamepad2' },
      { id: 'f19', name: 'Garden', icon: 'Flower' },
      { id: 'f20', name: 'Hot tub', icon: 'Waves' }
    ] 
  },
  { 
    category: 'Dining, drinking, and snacking', 
    total: 60, 
    items: [
      { id: 'f26', name: 'Coffee shop', icon: 'Coffee' },
      { id: 'f27', name: 'Bar', icon: 'Wine' },
      { id: 'f28', name: 'Room service [24-hour]', icon: 'Utensils' },
    ] 
  },
  { 
    category: 'For the kids', 
    total: 15, 
    items: [
      { id: 'f21', name: 'Babysitting service', icon: 'Baby' },
      { id: 'f22', name: 'Kids club', icon: 'Gamepad2' },
      { id: 'f23', name: 'Playground', icon: 'Baby' },
      { id: 'f24', name: 'Family room', icon: 'Tv' },
      { id: 'f25', name: 'Swimming pool [kids]', icon: 'Waves' }
    ] 
  },
  { 
    category: 'Getting around', 
    total: 12, 
    items: [
      { id: 'f29', name: 'Airport transfer', icon: 'Car' },
      { id: 'f30', name: 'Shuttle service', icon: 'Bus' },
      { id: 'f31', name: 'Rental car', icon: 'Car' },
    ] 
  },
  { 
    category: 'Pets', 
    total: 13, 
    items: [
      { id: 'f32', name: 'Pets allowed', icon: 'Dog' },
    ] 
  },
  { 
    category: 'Services and conveniences', 
    total: 32, 
    items: [
      { id: 'f33', name: 'Concierge', icon: 'ConciergeBell' },
      { id: 'f34', name: 'Currency exchange', icon: 'Briefcase' },
    ] 
  },
  { 
    category: 'Sports', 
    total: 29, 
    items: [
      { id: 'f35', name: 'Tennis court', icon: 'Trophy' },
      { id: 'f36', name: 'Golf course [on-site]', icon: 'Trophy' },
    ] 
  },
  { 
    category: 'Cleanliness and safety', 
    total: 38, 
    items: [
      { id: 'f37', name: 'Hand sanitizer', icon: 'Droplets' },
      { id: 'f38', name: 'First aid kit', icon: 'Shield' },
    ] 
  },
  { 
    category: 'Accessibility', 
    total: 3, 
    items: [
      { id: 'f39', name: 'Wheelchair accessible', icon: 'Accessibility' },
    ] 
  },
  { 
    category: 'Internet access', 
    total: 4, 
    items: [
      { id: 'f40', name: 'Free Wi-Fi in all rooms', icon: 'Wifi' },
      { id: 'f41', name: 'Wi-Fi in public areas', icon: 'Wifi' },
    ] 
  },
  { 
    category: 'Sustainability', 
    total: 14, 
    items: [
      { id: 'f42', name: 'Recycling bins', icon: 'Leaf' },
    ] 
  },
  { 
    category: 'Meetings and events', 
    total: 31, 
    items: [
      { id: 'f43', name: 'Meeting/banquet facilities', icon: 'Presentation' },
    ] 
  },
  { 
    category: 'Unique selling point of property', 
    total: 20, 
    items: [
      { id: 'f44', name: 'Ocean view', icon: 'Waves' },
    ] 
  },
  { 
    category: 'Languages spoken', 
    total: 44, 
    items: [
      { id: 'f45', name: 'English', icon: 'Globe' },
      { id: 'f46', name: 'Spanish', icon: 'Globe' },
      { id: 'f47', name: 'French', icon: 'Globe' },
    ] 
  },
  { 
    category: 'Payment types accepted for services', 
    total: 63, 
    items: [
      { id: 'f48', name: 'Visa', icon: 'CreditCard' },
      { id: 'f49', name: 'Mastercard', icon: 'CreditCard' },
    ] 
  },
];

const Facilities = () => {
  const [expandedCats, setExpandedCats] = useState({ 'Guest favorites': true });
  
  // State storing facility selection: true (Yes), false (No)
  const [selections, setSelections] = useState({});

  const toggleCategory = (catName) => {
    setExpandedCats(prev => ({
      ...prev,
      [catName]: !prev[catName]
    }));
  };

  const handleSelect = (id, val) => {
    setSelections(prev => ({ ...prev, [id]: val }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8 relative">
      
      <div className="w-full max-w-4xl flex flex-col gap-6 mb-20">
        
        {/* Header & Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 flex flex-col gap-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Property facilities</h1>
          
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 bg-slate-100 border-transparent rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-slate-800 outline-none shadow-sm"
              placeholder="Search for a facility"
            />
          </div>
        </div>

        {/* Categories List */}
        <div className="flex flex-col gap-4">
          {initialCategories.map((cat, idx) => {
            const isExpanded = !!expandedCats[cat.category];
            // Count how many are opted (true)
            const optedCount = cat.items ? cat.items.filter(item => selections[item.id] === true).length : 0;
            
            return (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300">
                {/* Accordion Header */}
                <button 
                  onClick={() => toggleCategory(cat.category)}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <h3 className="text-sm sm:text-lg font-bold text-slate-800 text-left pr-2">{cat.category}</h3>
                  <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-500 bg-slate-100 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                      [{optedCount}/{cat.total} opted]
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="text-slate-400 hidden sm:block" size={20} />
                    ) : (
                      <ChevronDown className="text-slate-400 hidden sm:block" size={20} />
                    )}
                  </div>
                </button>

                {/* Accordion Body */}
                {isExpanded && cat.items && cat.items.length > 0 && (
                  <div className="border-t border-slate-100 px-6 py-2 bg-white animate-in fade-in slide-in-from-top-2 duration-300">
                    {cat.items.map((item, itemIdx) => {
                      const IconComp = item.icon ? iconMap[item.icon] : null;
                      const isYes = selections[item.id] === true;
                      const isNo = selections[item.id] === false;

                      return (
                        <div key={item.id} className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 ${itemIdx !== cat.items.length - 1 ? 'border-b border-slate-100' : ''}`}>
                          <div className="flex items-center gap-3 mb-3 sm:mb-0">
                            {IconComp ? (
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                                <IconComp size={16} />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0" />
                            )}
                            <span className="text-sm font-medium text-slate-700">{item.name}</span>
                          </div>
                          
                          {/* Radios */}
                          <div className="flex items-center gap-6 ml-11 sm:ml-0 bg-slate-50 sm:bg-transparent px-3 py-2 sm:p-0 rounded-lg">
                            <label className="flex items-center gap-2 cursor-pointer group">
                              <div className="relative flex items-center justify-center">
                                <input 
                                  type="radio" 
                                  name={item.id}
                                  checked={isYes}
                                  onChange={() => handleSelect(item.id, true)}
                                  className="w-5 h-5 appearance-none border-2 border-slate-300 rounded-full checked:border-blue-600 transition-colors cursor-pointer group-hover:border-blue-400"
                                />
                                {isYes && <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                              </div>
                              <span className={`text-sm font-semibold transition-colors ${isYes ? 'text-blue-700' : 'text-slate-600'}`}>Yes</span>
                            </label>
                            
                            <label className="flex items-center gap-2 cursor-pointer group">
                              <div className="relative flex items-center justify-center">
                                <input 
                                  type="radio" 
                                  name={item.id}
                                  checked={isNo}
                                  onChange={() => handleSelect(item.id, false)}
                                  className="w-5 h-5 appearance-none border-2 border-slate-300 rounded-full checked:border-blue-600 transition-colors cursor-pointer group-hover:border-blue-400"
                                />
                                {isNo && <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                              </div>
                              <span className={`text-sm font-semibold transition-colors ${isNo ? 'text-blue-700' : 'text-slate-600'}`}>No</span>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Empty State for Accordions without items (Mock) */}
                {isExpanded && (!cat.items || cat.items.length === 0) && (
                  <div className="border-t border-slate-100 px-6 py-8 bg-slate-50 text-center text-sm font-medium text-slate-500">
                    No items loaded for this category.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Need Help Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="flex items-center gap-2 bg-[#002e6e] hover:bg-[#002252] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-0.5">
          <HelpCircle size={15} />
          Need Help
        </button>
      </div>

    </div>
  );
};

export default Facilities;
