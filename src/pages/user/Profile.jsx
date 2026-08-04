import React, { useState } from 'react';
import UserLayout from '../../laybouts/Userlayout';
import { User, Mail, Phone, MapPin, Camera, Shield, Bell, CreditCard, Save } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Apt 4B',
    city: 'Hyderabad',
    state: 'Telangana',
    zipCode: '500081'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would make an API call to update the user profile
  };

  return (
    <UserLayout>
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-8 font-sans text-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="mb-6 sm:mb-8 mt-12 md:mt-20 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Personal Details</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage your personal information and preferences.</p>
            </div>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-colors w-max"
              >
                Edit Profile
              </button>
            ) : (
              <button 
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center gap-2 w-max"
              >
                <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Save Changes
              </button>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Sidebar - Profile Picture & Quick Links */}
            <div className="w-full lg:w-[320px] shrink-0 space-y-6">
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 flex flex-col items-center border-b border-slate-100 relative">
                  <div className="relative group cursor-pointer mb-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-md">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" 
                        alt="Profile avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center transition-opacity">
                        <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{profileData.firstName} {profileData.lastName}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
                    <Shield className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-green-500" /> Verified Account
                  </p>
                </div>
                
                <div className="p-2 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1 sm:gap-2 custom-scrollbar pb-3 lg:pb-2">
                  <button className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50/50 rounded-lg whitespace-nowrap">
                    <User className="w-4 h-4 shrink-0" /> Personal info
                  </button>
                  <button className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap">
                    <CreditCard className="w-4 h-4 text-slate-400 shrink-0" /> Payment methods
                  </button>
                  <button className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap">
                    <Shield className="w-4 h-4 text-slate-400 shrink-0" /> Security & login
                  </button>
                  <button className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap">
                    <Bell className="w-4 h-4 text-slate-400 shrink-0" /> Notifications
                  </button>
                </div>
              </div>

            </div>

            {/* Right Side - Details Form */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-5 sm:p-6 space-y-6">
                
                {/* Basic Info */}
                <section>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">First Name</label>
                      <input 
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3.5 py-2.5 rounded-xl border ${isEditing ? 'border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white' : 'border-transparent bg-slate-50'} text-slate-900 text-xs sm:text-sm font-medium transition-all outline-none disabled:opacity-90`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Last Name</label>
                      <input 
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3.5 py-2.5 rounded-xl border ${isEditing ? 'border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white' : 'border-transparent bg-slate-50'} text-slate-900 text-xs sm:text-sm font-medium transition-all outline-none disabled:opacity-90`}
                      />
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Contact Info */}
                <section>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Contact Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                        </div>
                        <input 
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full pl-9 sm:pl-10 pr-3.5 py-2.5 rounded-xl border ${isEditing ? 'border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white' : 'border-transparent bg-slate-50'} text-slate-900 text-xs sm:text-sm font-medium transition-all outline-none disabled:opacity-90`}
                        />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                        </div>
                        <input 
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full pl-9 sm:pl-10 pr-3.5 py-2.5 rounded-xl border ${isEditing ? 'border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white' : 'border-transparent bg-slate-50'} text-slate-900 text-xs sm:text-sm font-medium transition-all outline-none disabled:opacity-90`}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Address Info */}
                <section>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Address</h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Street Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                        </div>
                        <input 
                          type="text"
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full pl-9 sm:pl-10 pr-3.5 py-2.5 rounded-xl border ${isEditing ? 'border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white' : 'border-transparent bg-slate-50'} text-slate-900 text-xs sm:text-sm font-medium transition-all outline-none disabled:opacity-90`}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">City</label>
                        <input 
                          type="text"
                          name="city"
                          value={profileData.city}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-3.5 py-2.5 rounded-xl border ${isEditing ? 'border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white' : 'border-transparent bg-slate-50'} text-slate-900 text-xs sm:text-sm font-medium transition-all outline-none disabled:opacity-90`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">State</label>
                        <input 
                          type="text"
                          name="state"
                          value={profileData.state}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-3.5 py-2.5 rounded-xl border ${isEditing ? 'border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white' : 'border-transparent bg-slate-50'} text-slate-900 text-xs sm:text-sm font-medium transition-all outline-none disabled:opacity-90`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Zip Code</label>
                        <input 
                          type="text"
                          name="zipCode"
                          value={profileData.zipCode}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-3.5 py-2.5 rounded-xl border ${isEditing ? 'border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white' : 'border-transparent bg-slate-50'} text-slate-900 text-xs sm:text-sm font-medium transition-all outline-none disabled:opacity-90`}
                        />
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>

          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
