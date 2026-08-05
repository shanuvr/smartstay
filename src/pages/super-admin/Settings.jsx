import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Globe, 
  CreditCard, 
  ShieldCheck, 
  Save,
  Check
} from 'lucide-react';

const SuperAdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // General
    platformName: 'SmartStay Platform',
    supportEmail: 'support@smartstay.com',
    supportPhone: '+91 1800 123 4567',
    // Financials
    defaultCommission: '15',
    globalTaxRate: '18',
    currency: 'INR',
    // Security
    requireKYC: true,
    requirePartner2FA: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Mock API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  const tabs = [
    { id: 'general', label: 'General Configuration', icon: Globe },
    { id: 'financials', label: 'Financial Rules', icon: CreditCard },
    { id: 'security', label: 'Security & Compliance', icon: ShieldCheck },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Platform Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage global configurations, financial rules, and security policies.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2 ${
              saveSuccess 
                ? 'bg-emerald-500 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {saveSuccess ? (
              <><Check size={16} /> Saved Successfully</>
            ) : (
              <><Save size={16} /> {isSaving ? 'Saving...' : 'Save Changes'}</>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-col gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-800">General Configuration</h2>
                  <p className="text-sm text-slate-500 mt-1">Basic information about the platform visible to users and partners.</p>
                </div>
                
                <div className="space-y-6 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Platform Name</label>
                    <input 
                      type="text" 
                      name="platformName"
                      value={formData.platformName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Support Email</label>
                      <input 
                        type="email" 
                        name="supportEmail"
                        value={formData.supportEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Support Phone</label>
                      <input 
                        type="text" 
                        name="supportPhone"
                        value={formData.supportPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Financial Rules */}
            {activeTab === 'financials' && (
              <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-800">Financial Rules</h2>
                  <p className="text-sm text-slate-500 mt-1">Configure global commission rates and taxation structures.</p>
                </div>
                
                <div className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex justify-between">
                        Default Commission Rate 
                        <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md text-xs">{formData.defaultCommission}%</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="number" 
                          name="defaultCommission"
                          value={formData.defaultCommission}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 pr-10"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500">Applied to new partners automatically.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex justify-between">
                        Global Tax Rate (GST)
                        <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md text-xs">{formData.globalTaxRate}%</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="number" 
                          name="globalTaxRate"
                          value={formData.globalTaxRate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 pr-10"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500">Default tax applied to all bookings.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Base Currency</label>
                    <select 
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                    >
                      <option value="INR">INR - Indian Rupee (₹)</option>
                      <option value="USD">USD - US Dollar ($)</option>
                      <option value="EUR">EUR - Euro (€)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-800">Security & Compliance</h2>
                  <p className="text-sm text-slate-500 mt-1">Enforce strict security measures for partners and platform administrators.</p>
                </div>
                
                <div className="space-y-6 max-w-2xl">
                  {/* KYC Toggle */}
                  <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 bg-slate-50">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Strict Partner KYC Verification</h3>
                      <p className="text-xs font-medium text-slate-500 mt-1">Do not allow partners to receive payouts until KYC is manually verified.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, requireKYC: !formData.requireKYC})}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${formData.requireKYC ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.requireKYC ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* 2FA Toggle */}
                  <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 bg-slate-50">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Require 2FA for Partner Logins</h3>
                      <p className="text-xs font-medium text-slate-500 mt-1">Force all hotel owners to use two-factor authentication when accessing the partner portal.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, requirePartner2FA: !formData.requirePartner2FA})}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${formData.requirePartner2FA ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.requirePartner2FA ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminSettings;
