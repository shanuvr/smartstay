import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';

const NotificationToggle = ({ icon: Icon, title, description, enabled, onChange }) => (
  <div className="flex items-start justify-between p-3 md:p-4 border border-slate-200 rounded-xl mb-3 md:mb-4 bg-white hover:border-blue-200 transition-colors">
    <div className="flex items-start gap-3 md:gap-4">
      <div className="mt-0.5 bg-blue-50 p-2 md:p-2.5 rounded-lg text-blue-600 shrink-0 flex items-center justify-center">
        <Icon className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <div>
        <h4 className="text-sm md:text-base font-bold text-slate-800">{title}</h4>
        <p className="text-[11px] md:text-sm text-slate-500 mt-0.5 leading-snug">{description}</p>
      </div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer mt-0.5 md:mt-1 ml-2 shrink-0">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={enabled}
        onChange={onChange}
      />
      <div className="w-9 h-5 md:w-11 md:h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

const Notifications = () => {
  const [settings, setSettings] = useState({
    newBookings: true,
    cancellations: true,
    guestMessages: true,
    promotions: false
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    // Show save animation or toast (for now just placeholder)
    console.log("Saved notification settings", settings);
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-slate-800">Notification Preferences</h2>
        <p className="text-sm text-slate-500 mt-1">Manage how and when you receive updates about your property.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Email Notifications</h3>
        
        <NotificationToggle 
          icon={Mail}
          title="New Bookings" 
          description="Get notified immediately when a guest books your property."
          enabled={settings.newBookings}
          onChange={() => handleToggle('newBookings')}
        />

        <NotificationToggle 
          icon={Bell}
          title="Cancellations" 
          description="Receive alerts if a guest cancels or modifies their reservation."
          enabled={settings.cancellations}
          onChange={() => handleToggle('cancellations')}
        />

        <NotificationToggle 
          icon={MessageSquare}
          title="Guest Messages" 
          description="Be alerted when guests send you a message or inquiry."
          enabled={settings.guestMessages}
          onChange={() => handleToggle('guestMessages')}
        />

        <NotificationToggle 
          icon={Smartphone}
          title="Promotions & Offers" 
          description="Receive news about SmartStay partner programs and optimization tips."
          enabled={settings.promotions}
          onChange={() => handleToggle('promotions')}
        />

      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Notifications;
