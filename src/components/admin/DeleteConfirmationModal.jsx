import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header (optional, usually delete modals are simpler, but a close button is nice) */}
        <div className="flex justify-end p-3 pb-0">
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 pt-2 text-center flex flex-col items-center">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="text-red-500 w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-2">Delete Room?</h2>
          <p className="text-sm text-slate-500 mb-6">
            Are you sure you want to delete <span className="font-semibold text-slate-700">{itemName || 'this item'}</span>? This action cannot be undone and will remove all associated data.
          </p>

          {/* Action Buttons */}
          <div className="flex w-full gap-3">
            <button 
              onClick={onClose} 
              className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm} 
              className="flex-1 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl transition-colors shadow-sm shadow-red-600/20"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
