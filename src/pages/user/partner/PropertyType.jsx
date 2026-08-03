import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Home, Tent, Building, BedDouble, CheckCircle2 } from 'lucide-react';

const PropertyType = () => {
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();

  const propertyTypes = [
    {
      id: 'hotel',
      name: 'Hotel',
      description: 'Standard lodging with private rooms and services',
      icon: Building2
    },
    {
      id: 'resort',
      name: 'Resort',
      description: 'Large property with recreational facilities',
      icon: Tent // using Tent as an approximation for a resort/vacation spot
    },
    {
      id: 'homestay',
      name: 'Home Stay',
      description: 'A private home where guests stay with locals',
      icon: Home
    },
    {
      id: 'apartment',
      name: 'Apartment / Villa',
      description: 'Furnished residential property rented as a whole',
      icon: Building
    },
    {
      id: 'hostel',
      name: 'Hostel',
      description: 'Budget-friendly shared accommodation',
      icon: BedDouble
    }
  ];

  const handleContinue = (e) => {
    e.preventDefault();
    if (selectedType) {
      navigate('/list-your-place/details');
    }
  };

  return (
    <div className="p-6 sm:p-8 flex flex-col justify-start overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-200 bg-white">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">Property Type</h1>
        <h2 className="text-[10px] sm:text-[11px] font-bold text-[#2563eb] uppercase tracking-wider mb-1">
          Category of property
        </h2>
        <p className="text-[11px] sm:text-xs font-semibold text-slate-400">
          Select the category that best describes your property
        </p>
      </div>

      <form onSubmit={handleContinue} className="flex-1 flex flex-col">
        
        {/* Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 content-start">
          {propertyTypes.map((type) => {
            const isSelected = selectedType === type.id;
            const Icon = type.icon;
            
            return (
              <div
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`relative cursor-pointer flex items-start p-4 rounded-xl border-2 transition-all duration-200 ${
                  isSelected 
                    ? 'border-[#2563eb] bg-blue-50/50 shadow-md shadow-blue-900/5' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`p-3 rounded-lg mr-4 shrink-0 transition-colors ${
                  isSelected ? 'bg-[#2563eb] text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <div className="flex flex-col pr-6">
                  <span className={`text-sm font-bold mb-1 ${isSelected ? 'text-[#2563eb]' : 'text-slate-800'}`}>
                    {type.name}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 leading-tight">
                    {type.description}
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className="w-5 h-5 text-[#2563eb]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-4 mt-6 border-t border-slate-100 shrink-0">
          <button
            type="submit"
            disabled={!selectedType}
            className="bg-[#2563eb] hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-all shadow-sm active:scale-[0.98]"
          >
            Continue
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default PropertyType;
