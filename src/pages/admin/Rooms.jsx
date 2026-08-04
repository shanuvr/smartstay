import React, { useState, useMemo } from 'react';
import CreateRoomModal from '../../components/admin/CreateRoomModal';
import EditRoomModal from '../../components/admin/EditRoomModal';
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal';
import {
  Search,
  Plus,
  ChevronRight,
  HelpCircle,
  BedDouble,
  Users,
  Maximize2,
  MoreVertical,
  Edit,
  Trash,
} from 'lucide-react';

const ROOM_TYPE_STYLES = {
  'Standard Room': 'bg-blue-50 text-blue-600',
  'Deluxe Queen': 'bg-indigo-50 text-indigo-600',
  '1 Bedroom Deluxe': 'bg-sky-50 text-sky-600',
  '1 Bedroom Superior': 'bg-cyan-50 text-cyan-600',
  'Family Room': 'bg-blue-50 text-blue-600',
};

const initialRooms = [
  { id: '985682272', name: 'Standard Room', occupancy: '2 adults, 1 child', size: '102 m²', rate: 2600, count: 1, status: 'Active' },
  { id: '985682273', name: 'Deluxe Queen', occupancy: '2 adults, 1 child', size: '105 m²', rate: 2500, count: 1, status: 'Active' },
  { id: '985682274', name: '1 Bedroom Deluxe', occupancy: '2 adults, 1 child', size: '102 m²', rate: 3000, count: 1, status: 'Active' },
  { id: '985682275', name: '1 Bedroom Superior', occupancy: '2 adults, 1 child', size: '102 m²', rate: 2500, count: 1, status: 'Active' },
  { id: '985682276', name: 'Family Room', occupancy: '2 adults, 1 child', size: '102 m²', rate: 2600, count: 1, status: 'Active' },
];

const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;

const Rooms = () => {
  const [roomsList, setRoomsList] = useState(initialRooms);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('Active');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (room) => {
    setRoomToDelete(room);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (roomToDelete) {
      setRoomsList(prev => prev.filter(r => r.id !== roomToDelete.id));
    }
    setIsDeleteModalOpen(false);
    setRoomToDelete(null);
  };

  const filtered = useMemo(() => {
    return roomsList.filter((r) => {
      const matchesTab = r.status === tab;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || r.name.toLowerCase().includes(q) || r.id.includes(q);
      return matchesTab && matchesQuery;
    });
  }, [query, tab]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 pt-6 md:pt-8 pb-5 flex flex-col gap-4 md:gap-5">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Rooms</h1>
          <span className="inline-flex items-center justify-center min-w-[26px] h-[26px] px-2 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
            {roomsList.length}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or ID"
                className="w-full sm:w-64 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none transition-colors focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="inline-flex bg-slate-100 rounded-lg p-1 text-sm font-medium w-fit">
              {['Active', 'Inactive'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-md transition-all ${
                    tab === t
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm shadow-blue-600/20"
          >
            <Plus size={17} strokeWidth={2.5} />
            Create room
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 md:px-8 py-4 md:py-8 w-full min-w-0 flex flex-col items-center">
        {/* Table layout (responsive) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 w-fit max-w-full overflow-x-auto">
          <table className="w-auto text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="pl-3 sm:pl-6 pr-3 sm:pr-5 py-3 sm:py-4 w-10 sm:w-12">
                  <input type="checkbox" className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </th>
                <th className="px-3 sm:px-5 py-3 sm:py-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">Room</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">Occupancy</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">Size</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">Rack rate</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Units</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((room) => (
                <tr key={room.id} className="group hover:bg-blue-50/40 transition-colors">
                  <td className="pl-3 sm:pl-6 pr-3 sm:pr-5 py-3 sm:py-4">
                    <input type="checkbox" className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 ${ROOM_TYPE_STYLES[room.name] || 'bg-blue-50 text-blue-600'}`}>
                        <BedDouble className="w-4 h-4 sm:w-[17px] sm:h-[17px]" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">{room.name}</p>
                        <p className="text-[10px] sm:text-xs text-slate-400 font-mono leading-tight mt-0.5">{room.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-4">
                    <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-slate-600">
                      <Users size={14} className="text-slate-400 hidden sm:block" />
                      {room.occupancy}
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-4">
                    <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-slate-600">
                      <Maximize2 size={14} className="text-slate-400 hidden sm:block" />
                      {room.size}
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-blue-600">{formatINR(room.rate)}</td>
                  <td className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-slate-600 text-center">{room.count}</td>
                  <td className="px-3 sm:px-5 py-3 sm:py-4">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-50 text-emerald-600 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {room.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-5 py-3 sm:py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(room)}
                        className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition-colors" 
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(room)}
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors" 
                        title="Delete"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-sm text-slate-400">
                    No rooms match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* End of Table */}
      </div>

      {/* Help button */}
      <div className="fixed bottom-6 right-6">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5">
          <HelpCircle size={17} />
          Need help
        </button>
      </div>

      <CreateRoomModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
      
      <EditRoomModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        room={selectedRoom}
      />

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={roomToDelete?.name}
      />
    </div>
  );
};

export default Rooms;