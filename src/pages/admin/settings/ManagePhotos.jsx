import React, { useState, useRef } from 'react';
import { 
  Save, 
  Camera, 
  Trash2, 
  Star, 
  UploadCloud, 
  CheckCircle2, 
  Plus,
  AlertCircle,
  Ban
} from 'lucide-react';

const initialPhotos = [
  { id: '1', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&fit=crop', isPrimary: true },
  { id: '2', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&fit=crop', isPrimary: false },
  { id: '3', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&fit=crop', isPrimary: false },
  { id: '4', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&fit=crop', isPrimary: false }
];

const ManagePhotos = () => {
  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('smartstay_photos');
    return saved ? JSON.parse(saved) : initialPhotos;
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);

  const updatePhotosState = (newPhotos) => {
    setPhotos(newPhotos);
    try {
      localStorage.setItem('smartstay_photos', JSON.stringify(newPhotos));
    } catch (e) {
      console.warn("Storage quota exceeded or error saving to localStorage.");
    }
    window.dispatchEvent(new Event('smartstay_photos_updated'));
  };

  const handleSetPrimary = (id) => {
    const newPhotos = photos.map(p => ({
      ...p,
      isPrimary: p.id === id
    }));
    updatePhotosState(newPhotos);
  };

  const handleDelete = (id) => {
    const photoToDelete = photos.find(p => p.id === id);
    if (photoToDelete?.isPrimary) {
      alert('Cannot delete the primary cover photo. Set another photo as primary first.');
      return;
    }
    const newPhotos = photos.filter(p => p.id !== id);
    updatePhotosState(newPhotos);
  };

  const triggerFileUpload = () => {
    if (photos.length >= 7) {
      alert('Maximum limit of 7 photos reached.');
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Check if adding this file will exceed the limit
    if (photos.length >= 7) {
      alert('Maximum limit of 7 photos reached.');
      return;
    }

    const file = files[0]; // just taking the first file
    
    // For a real app this would upload to a server. 
    // Here we use a FileReader to get a base64 string or Object URL.
    const reader = new FileReader();
    reader.onloadend = () => {
      const newPhoto = {
        id: Date.now().toString(),
        url: reader.result,
        isPrimary: photos.length === 0,
      };

      const newPhotos = [...photos, newPhoto];
      updatePhotosState(newPhotos);
    };
    reader.readAsDataURL(file);

    // Reset input
    e.target.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate that at least one photo is primary
    const hasPrimary = photos.some(p => p.isPrimary);
    if (photos.length > 0 && !hasPrimary) {
      alert('Please select one primary cover photo before saving.');
      return;
    }

    setSuccessMessage('Property gallery updated successfully.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 animate-in fade-in duration-300">
      
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Camera className="text-blue-600" size={22} />
            Manage Photos
          </h2>
          <p className="text-sm text-slate-500 mt-1">Upload up to 7 photos of your property. Ensure exactly one photo is marked as the primary cover photo.</p>
        </div>
        <button 
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors self-start shadow-sm"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-xl text-green-800 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Warning alert if limit is reached */}
      {photos.length >= 7 && (
        <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl text-amber-800 text-xs font-semibold flex items-start gap-2 animate-in slide-in-from-top-2 duration-300">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Gallery Limit Reached:</span> You have uploaded the maximum limit of 7 photos. Delete an existing image if you wish to upload a new one.
          </div>
        </div>
      )}

      {/* Photos Management Section */}
      <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">
              Property Gallery ({photos.length} / 7)
            </h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Use horizontal orientation images. Supported formats: JPG, PNG, WebP.</p>
          </div>
          
          {photos.length < 7 && (
            <button
              type="button"
              onClick={triggerFileUpload}
              className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all self-start shadow-sm"
            >
              <Plus size={14} />
              Upload New Photo
            </button>
          )}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className={`group relative bg-white rounded-xl overflow-hidden border transition-all ${photo.isPrimary ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md' : 'border-slate-200'}`}
            >
              {/* Photo */}
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <img 
                  src={photo.url} 
                  alt="Property" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                
                {/* Status Overlay Badges */}
                {photo.isPrimary && (
                  <div className="absolute top-2.5 left-2.5 bg-blue-600 text-white px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Star size={10} fill="currentColor" /> Primary Cover
                  </div>
                )}

                {/* Actions overlay panel on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {!photo.isPrimary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(photo.id)}
                      className="p-2 bg-white hover:bg-blue-600 text-slate-700 hover:text-white rounded-lg transition-all shadow-md text-xs font-bold flex items-center gap-1"
                      title="Set as Primary Cover"
                    >
                      <Star size={14} />
                      Make Primary
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => handleDelete(photo.id)}
                    className={`p-2 rounded-lg transition-all shadow-md ${photo.isPrimary ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-white hover:bg-red-600 text-red-600 hover:text-white'}`}
                    title="Delete Photo"
                    disabled={photo.isPrimary}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Dotted Upload Card Mockup */}
          {photos.length < 7 ? (
            <button
              type="button"
              onClick={triggerFileUpload}
              className="aspect-[4/3] bg-white border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl flex flex-col items-center justify-center p-4 text-slate-400 hover:text-blue-500 transition-all cursor-pointer group"
            >
              <UploadCloud size={28} className="group-hover:scale-105 transition-transform" />
              <span className="text-xs font-bold mt-2">Upload Photo</span>
              <span className="text-[10px] text-slate-400 mt-1">{7 - photos.length} slots remaining</span>
            </button>
          ) : (
            <div className="aspect-[4/3] bg-slate-100 border border-slate-200 rounded-xl flex flex-col items-center justify-center p-4 text-slate-400 text-center">
              <Ban size={24} className="text-slate-400" />
              <span className="text-xs font-bold mt-2 text-slate-500">Upload Limit Reached</span>
              <span className="text-[10px] text-slate-400 mt-1">Maximum 7 photos allowed</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ManagePhotos;
