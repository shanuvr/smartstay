import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, User, Mail, MapPin, Calendar, Globe, 
  UploadCloud, Camera, Trash2, ArrowRight, Sparkles, 
  Phone, CheckCircle, QrCode, UserPlus, X
} from 'lucide-react';

export default function Checkin() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract booking details if passed, or default
  const bookingId = location.state?.bookingId || 'BKG-9928-XY';
  const hotelName = location.state?.hotelName || 'Novotel Hyderabad Convention Centre';

  const [step, setStep] = useState('form'); // 'form' or 'success'
  
  // Primary Guest Form State (Pre-fetched from logged-in user credentials)
  const [formData, setFormData] = useState({
    name: 'Rahul Sharma', // Pre-fetched Primary Guest Name
    email: 'shanuprogramers@gmail.com', // Pre-fetched Email
    phone: '9876543210', // Pre-fetched Mobile
    idType: 'Aadhaar',
    idNumber: ''
  });

  const [idFile, setIdFile] = useState(null);
  const [idFileName, setIdFileName] = useState('');
  const [selfie, setSelfie] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Secondary Guests State
  const [coGuests, setCoGuests] = useState([]);
  const [showExistingGuests, setShowExistingGuests] = useState(false);

  const existingGuestsList = [
    { name: 'Amit Kumar', phone: '9876543211', idType: 'Aadhaar', idNumber: '1234 5678 9012' },
    { name: 'Priya Sharma', phone: '9876543212', idType: 'Passport', idNumber: 'L1234567' },
    { name: 'Rohan Gupta', phone: '9876543213', idType: 'Driving Licence', idNumber: 'DL-142011001' }
  ];

  // Video stream refs
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowExistingGuests(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdFile(URL.createObjectURL(file));
      setIdFileName(file.name);
    }
  };

  // Co-guest handlers
  const handleAddCoGuest = () => {
    setCoGuests([
      ...coGuests,
      {
        id: Date.now(),
        name: '',
        phone: '',
        idType: 'Aadhaar',
        idNumber: '',
        idFileName: '',
        idFile: null
      }
    ]);
  };

  const handleAddExistingGuest = (guest) => {
    setCoGuests([
      ...coGuests,
      {
        id: Date.now() + Math.random(),
        name: guest.name,
        phone: guest.phone,
        idType: guest.idType,
        idNumber: guest.idNumber,
        idFileName: 'existing_id_front.jpg',
        idFile: 'dummy_url'
      }
    ]);
    setShowExistingGuests(false);
  };

  const handleRemoveCoGuest = (id) => {
    setCoGuests(coGuests.filter(g => g.id !== id));
  };

  const handleCoGuestChange = (id, field, value) => {
    setCoGuests(coGuests.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const handleCoGuestFileUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      setCoGuests(coGuests.map(g => g.id === id ? { 
        ...g, 
        idFileName: file.name, 
        idFile: URL.createObjectURL(file) 
      } : g));
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setCameraStream(stream);
      setIsCameraActive(true);
      setCountdown(3);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Could not access camera. Please make sure to grant camera permissions.");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
    setCountdown(null);
  };

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 240;
      const ctx = canvas.getContext('2d');
      
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const dataUrl = canvas.toDataURL('image/jpeg');
      setSelfie(dataUrl);
    }
    stopCamera();
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      capturePhoto();
    }
  }, [countdown]);

  const handleCompleteCheckIn = (e) => {
    e.preventDefault();
    if (!idFileName || !formData.idNumber) {
      alert('Please provide Primary Guest ID Number and upload ID proof.');
      return;
    }

    // Check if any co-guest has missing details
    const missingCoGuestInfo = coGuests.some(g => !g.idFileName || !g.idNumber || !g.name);
    if (missingCoGuestInfo) {
      alert('Please complete all co-guest details and upload their ID proof.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const profileData = {
        ...formData,
        selfie: selfie,
        coGuests: coGuests,
        isVerified: true
      };
      localStorage.setItem('smartstay_guest_profile', JSON.stringify(profileData));
      // Mark digital check-in as completed (admin must still confirm to hand over key)
      localStorage.setItem(`digital_checkin_completed_${bookingId}`, 'true');
      setIsSubmitting(false);
      setStep('success');
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-[#0F1E36] bg-[#F8FAFC] font-sans">
      <style>{`
        .form-input {
          background: #FAFBFD;
          border: 1px solid rgba(15, 30, 54, 0.12);
          transition: all 0.2s ease-in-out;
        }
        .form-input:focus {
          background: #ffffff;
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.06);
          outline: none;
        }
        .form-input-readonly {
          background: #F1F5F9;
          border: 1px solid rgba(15, 30, 54, 0.08);
          color: #475569;
        }
      `}</style>

      {/* TOP HEADER */}
      <header className="relative z-10 w-full flex items-center justify-between px-6 py-4 border-b border-[#0F1E36]/5 bg-white/40 backdrop-blur-md">
        <div>
          <span className="text-xl sm:text-2xl tracking-tight leading-none font-bold">
            <span className="text-slate-900">smart</span>
            <span className="text-[#2563eb]">stay</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0F1E36]/60">
          <Mail className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>Booking ID: </span>
          <span className="text-[#0F1E36] font-bold">{bookingId}</span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 w-full flex-grow flex flex-col items-center justify-center px-4 py-6 md:px-8 lg:px-12">
        <div className="w-full max-w-5xl">

          {/* Form Card Layout - Single Page */}
          {step === 'form' && (
            <form onSubmit={handleCompleteCheckIn} className="space-y-6">
              
              {/* Header Title */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 mb-1 uppercase tracking-wider">
                    <Sparkles className="h-3 w-3" /> Contactless Digital Check-In
                  </div>
                  <h1 className="text-xl md:text-2xl font-extrabold text-[#0F1E36] tracking-tight">
                    {hotelName}
                  </h1>
                </div>
                
                <div className="mt-2 md:mt-0 flex items-center gap-1.5 text-[10px] text-[#0F1E36]/50 bg-white border border-blue-100 rounded-full px-3 py-1 shadow-2xs w-fit">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600" /> Secure 256-bit AES Encryption
                </div>
              </div>

              {/* Main Form Container */}
              <div className="bg-white rounded-[24px] border border-slate-200 p-4 md:p-6 lg:p-8 shadow-sm space-y-8">
                
                {/* 2 Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  
                  {/* LEFT SIDE: Primary Guest Information (Pre-fetched) */}
                  <div className="space-y-4">
                    <h3 className="text-[11px] font-extrabold text-blue-600 uppercase tracking-widest border-b border-[#0F1E36]/5 pb-1.5 flex items-center justify-between">
                      <span>1. Primary Guest Details</span>
                      <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">Auto-Fetched</span>
                    </h3>

                    {/* Full Name (Pre-fetched) */}
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[9px] font-extrabold text-[#0F1E36]/70 uppercase tracking-wider">
                        Primary Guest Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#0F1E36]/40" />
                        <input
                          type="text"
                          readOnly
                          value={formData.name}
                          className="form-input form-input-readonly w-full rounded-lg pl-9 pr-3 py-2 text-xs font-bold select-none cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Email Address (Pre-fetched) */}
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[9px] font-extrabold text-[#0F1E36]/70 uppercase tracking-wider">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#0F1E36]/40" />
                        <input
                          type="email"
                          readOnly
                          value={formData.email}
                          className="form-input form-input-readonly w-full rounded-lg pl-9 pr-3 py-2 text-xs font-bold select-none cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Phone Number (Pre-fetched) */}
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[9px] font-extrabold text-[#0F1E36]/70 uppercase tracking-wider">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#0F1E36]/40" />
                        <input
                          type="tel"
                          readOnly
                          value={formData.phone}
                          className="form-input form-input-readonly w-full rounded-lg pl-9 pr-3 py-2 text-xs font-bold select-none cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Info Note */}
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-[11px] text-slate-600 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>Primary guest details are automatically loaded from your verified SmartStay account.</span>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Primary Guest ID & Selfie Upload */}
                  <div className="space-y-6">
                    
                    {/* Primary Guest ID Upload */}
                    <div className="space-y-3">
                      <h3 className="text-[11px] font-extrabold text-blue-600 uppercase tracking-widest border-b border-[#0F1E36]/5 pb-1.5">
                        2. Primary Guest ID Verification
                      </h3>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1 grid grid-cols-1 gap-1">
                          <label className="text-[9px] font-extrabold text-[#0F1E36]/70 uppercase tracking-wider">ID Type</label>
                          <select
                            name="idType"
                            value={formData.idType}
                            onChange={handleInputChange}
                            className="form-input w-full rounded-lg px-2 py-2 text-xs font-semibold text-[#0F1E36] focus:outline-none"
                          >
                            <option value="Aadhaar">Aadhaar</option>
                            <option value="Passport">Passport</option>
                            <option value="Driving Licence">DL</option>
                          </select>
                        </div>

                        <div className="col-span-2 relative mt-4">
                          <input
                            id="primaryIdNumber"
                            type="text"
                            name="idNumber"
                            required
                            placeholder={`Enter ${formData.idType} number`}
                            value={formData.idNumber}
                            onChange={handleInputChange}
                            className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[#0F1E36] placeholder-transparent relative z-0"
                          />
                          <label
                            htmlFor="primaryIdNumber"
                            className="absolute left-3 bg-white px-1 text-[10px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                          >
                            Document / ID Number
                          </label>
                        </div>
                      </div>

                      {/* ID Drag & Drop */}
                      <div className="grid grid-cols-1 gap-1">
                        <label className="text-[9px] font-extrabold text-[#0F1E36]/70 uppercase tracking-wider">
                          Upload ID Document Front
                        </label>
                        <label className={`flex flex-col items-center justify-center border border-dashed ${idFileName ? 'border-green-300 bg-green-50/10' : 'border-blue-200 bg-[#FAFBFD] hover:bg-blue-50/10'} rounded-xl p-4 text-center cursor-pointer transition-colors duration-200`}>
                          <UploadCloud className={`h-6 w-6 ${idFileName ? 'text-green-500' : 'text-blue-600'}`} />
                          <span className="text-xs font-bold text-[#0F1E36] mt-1.5">
                            {idFileName ? 'Primary ID Uploaded' : 'Drag & drop or browse Primary ID'}
                          </span>
                          <span className="text-[9px] text-[#0F1E36]/50 mt-0.5">
                            {idFileName ? idFileName : 'PNG, JPG, PDF up to 5MB'}
                          </span>
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Selfie Verification */}
                    <div className="space-y-2">
                      <h3 className="text-[11px] font-extrabold text-blue-600 uppercase tracking-widest border-b border-[#0F1E36]/5 pb-1">
                        3. Selfie Verification (Optional)
                      </h3>
                      
                      <div className="flex items-center gap-3 bg-[#FAFBFD] p-3 rounded-xl border border-black/5">
                        <div className="relative h-14 w-14 rounded-xl bg-blue-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-blue-200 shadow-inner">
                          {isCameraActive ? (
                            <video
                              ref={videoRef}
                              autoPlay
                              playsInline
                              muted
                              className="h-full w-full object-cover scale-x-[-1]"
                            />
                          ) : selfie ? (
                            <img src={selfie} alt="Selfie Preview" className="h-full w-full object-cover" />
                          ) : (
                            <Camera className="h-4 w-4 text-[#2563EB]" />
                          )}
                          
                          {countdown !== null && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-extrabold">
                              {countdown}
                            </div>
                          )}
                        </div>

                        <div className="flex-grow">
                          <h4 className="text-xs font-bold text-[#0F1E36] leading-none">Real-time Portrait Match</h4>
                          <p className="text-[9px] text-[#0F1E36]/50 mt-0.5 leading-tight">
                            Verify identity against ID proof.
                          </p>
                          
                          <div className="flex gap-2 mt-1.5">
                            {isCameraActive ? (
                              <button
                                type="button"
                                onClick={stopCamera}
                                className="px-2.5 py-1 bg-red-50 hover:bg-red-150 text-[9px] text-red-500 font-bold rounded transition-colors shadow-sm"
                              >
                                Cancel
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={startCamera}
                                className="px-2.5 py-1 bg-[#2563EB] hover:bg-blue-600 text-[9px] text-white font-bold rounded transition-colors flex items-center gap-1 shadow-sm"
                              >
                                <Camera className="h-2.5 w-2.5" />
                                {selfie ? 'Retake' : 'Open Camera'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* DYNAMIC SECONDARY GUESTS (CO-GUESTS) SECTION */}
                <div className="pt-6 border-t border-slate-200/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <UsersIcon className="w-4 h-4 text-blue-600" />
                        Secondary Guests / Co-Guests
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">Add details of other guests staying in the same room.</p>
                    </div>
                    <div className="flex items-center gap-2 relative z-20" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowExistingGuests(!showExistingGuests)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 px-3.5 py-1.5 rounded-xl transition-colors border border-slate-200 shadow-sm"
                      >
                        <UserPlus className="w-3.5 h-3.5 text-slate-400" />
                        Add Existing Guest
                      </button>
                      
                      {showExistingGuests && (
                        <div className="absolute right-0 top-10 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 animate-in fade-in slide-in-from-top-2">
                          <div className="flex items-center justify-between mb-2 px-2 border-b border-slate-100 pb-2">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select from previous stays</h4>
                            <button type="button" onClick={() => setShowExistingGuests(false)} className="text-slate-400 hover:text-slate-700 p-0.5 rounded hover:bg-slate-100 transition-colors">
                              <X size={12} />
                            </button>
                          </div>
                          <div className="flex flex-col gap-1">
                            {existingGuestsList.map((g, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleAddExistingGuest(g)}
                                className="flex flex-col text-left px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors"
                              >
                                <span className="text-xs font-bold text-slate-800">{g.name}</span>
                                <span className="text-[10px] text-slate-500 font-semibold">{g.phone} • {g.idType}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleAddCoGuest}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3.5 py-1.5 rounded-xl transition-colors border border-blue-150"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        Add New Guest
                      </button>
                    </div>
                  </div>

                  {coGuests.length === 0 ? (
                    <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                      <p className="text-xs text-slate-400 font-medium">No co-guests added. Click "+ Add Guest" if you are traveling with companions.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {coGuests.map((guest, index) => (
                        <div key={guest.id} className="relative bg-slate-50/80 p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4 items-stretch">
                          <button
                            type="button"
                            onClick={() => handleRemoveCoGuest(guest.id)}
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 p-1 hover:bg-slate-200/50 rounded-full transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          {/* Co-guest details column */}
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 pr-2">
                            <div className="relative mt-4">
                              <input
                                id={`guest_name_${guest.id}`}
                                type="text"
                                required
                                placeholder="Full Name"
                                value={guest.name}
                                onChange={(e) => handleCoGuestChange(guest.id, 'name', e.target.value)}
                                className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[#0F1E36] placeholder-transparent relative z-0"
                              />
                              <label
                                htmlFor={`guest_name_${guest.id}`}
                                className="absolute left-3 bg-white px-1 text-[10px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                              >
                                Secondary Guest {index + 1} Name
                              </label>
                            </div>
                            <div className="relative mt-4">
                              <input
                                id={`guest_phone_${guest.id}`}
                                type="tel"
                                required
                                placeholder="10-digit mobile"
                                value={guest.phone}
                                onChange={(e) => handleCoGuestChange(guest.id, 'phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[#0F1E36] placeholder-transparent relative z-0"
                              />
                              <label
                                htmlFor={`guest_phone_${guest.id}`}
                                className="absolute left-3 bg-white px-1 text-[10px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                              >
                                Mobile Number
                              </label>
                            </div>
                          </div>

                          {/* Co-guest Verification details */}
                          <div className="flex-1 flex flex-col sm:flex-row gap-3 items-end">
                            <div className="w-full sm:w-28 grid grid-cols-1 gap-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">ID Type</label>
                              <select
                                value={guest.idType}
                                onChange={(e) => handleCoGuestChange(guest.id, 'idType', e.target.value)}
                                className="form-input w-full rounded-lg px-2 py-2 text-xs font-semibold"
                              >
                                <option value="Aadhaar">Aadhaar</option>
                                <option value="Passport">Passport</option>
                                <option value="Driving Licence">DL</option>
                              </select>
                            </div>

                            <div className="w-full sm:flex-1 relative mt-4">
                              <input
                                id={`guest_id_${guest.id}`}
                                type="text"
                                required
                                placeholder={`Enter ${guest.idType} ID`}
                                value={guest.idNumber}
                                onChange={(e) => handleCoGuestChange(guest.id, 'idNumber', e.target.value)}
                                className="w-full bg-white peer border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[#0F1E36] placeholder-transparent relative z-0"
                              />
                              <label
                                htmlFor={`guest_id_${guest.id}`}
                                className="absolute left-3 bg-white px-1 text-[10px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-blue-600 cursor-text -top-2 z-10"
                              >
                                ID Number
                              </label>
                            </div>

                            {/* Co-guest file upload */}
                            <div className="w-full sm:w-auto shrink-0 flex items-center">
                              <label className={`flex items-center gap-1.5 px-3.5 py-2 border rounded-lg cursor-pointer text-xs font-bold transition-all ${
                                guest.idFileName ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-blue-200 text-blue-600 hover:bg-blue-50/40'
                              }`}>
                                <UploadCloud className="w-4 h-4" />
                                <span>{guest.idFileName ? 'ID Uploaded' : 'Upload ID'}</span>
                                <input
                                  type="file"
                                  accept="image/*,application/pdf"
                                  onChange={(e) => handleCoGuestFileUpload(guest.id, e)}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <div className="border-t border-[#0F1E36]/5 pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto py-3 px-6 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md transition-all duration-300 active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-1" />
                        Completing Check-In...
                      </>
                    ) : (
                      <>
                        Complete Check-In
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

              </div>

            </form>
          )}

          {/* --- SUCCESS VIEW (CHECK-IN COMPLETE) --- */}
          {step === 'success' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl shadow-blue-900/5 max-w-md mx-auto w-full text-center space-y-8 relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50 to-white/0 pointer-events-none" />
              
              <div className="relative">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-inner ring-4 ring-green-50/50">
                  <CheckCircle className="w-12 h-12" />
                </div>
              </div>

              <div className="space-y-2 relative">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E36] tracking-tight">Check-In Complete!</h2>
                <p className="text-slate-500 text-sm">Your digital verification is successful.</p>
              </div>

              {/* Booking ID Card */}
              <div className="bg-gradient-to-br from-[#0F1E36] to-slate-800 text-white rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                  <QrCode className="w-32 h-32 translate-x-6 translate-y-6" />
                </div>
                
                <p className="text-[10px] text-blue-200 uppercase font-bold tracking-widest mb-1">Booking ID</p>
                <div className="text-3xl font-black tracking-wider font-mono text-white mb-4 bg-white/10 py-3 rounded-xl border border-white/20 shadow-inner">
                  {bookingId}
                </div>
                
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10 text-left flex items-start gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-100">Next Step</p>
                    <p className="text-xs font-bold leading-relaxed mt-0.5">Please show this Booking ID to the hotel reception to collect your physical room key.</p>
                  </div>
                </div>
              </div>

              <div className="relative pt-2">
                <button
                  onClick={() => navigate('/bookings')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] text-sm shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  Return to My Bookings
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* FOOTER BAR */}
      <footer className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t border-[#0F1E36]/5 bg-white/40 text-[10px] text-[#0F1E36]/50">
        <span>© 2026 SmartStay Hospitality. All rights reserved.</span>
        <div className="flex gap-4 mt-1 md:mt-0">
          <span>GDPR Compliant</span>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
        </div>
      </footer>
    </div>
  );
}

// Simple inline component for users icon fallback
function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
