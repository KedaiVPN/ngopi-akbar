"use client";

import { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

interface DynamicParticipantFormProps {
  participants: string[];
  onChange: (participants: string[]) => void;
}

export default function DynamicParticipantForm({ participants, onChange }: DynamicParticipantFormProps) {
  const handleAdd = () => {
    onChange([...participants, '']);
  };

  const handleRemove = (index: number) => {
    const newParticipants = [...participants];
    newParticipants.splice(index, 1);
    onChange(newParticipants);
  };

  const handleChange = (index: number, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    onChange(newParticipants);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-[#4A3728]">Daftar Peserta</label>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 text-sm bg-[#8B5A2B] hover:bg-[#6e4823] text-white px-3 py-1.5 rounded-md transition-colors"
        >
          <Plus size={16} />
          <span>Tambah</span>
        </button>
      </div>

      {participants.length === 0 ? (
        <div className="text-center p-6 border-2 border-dashed border-[#d4c5b9] rounded-lg bg-[#fdfaf6]">
          <p className="text-[#8B5A2B] text-sm">Belum ada peserta yang ditambahkan.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
          {participants.map((participant, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-8 text-center text-sm text-[#8B5A2B] font-medium">{index + 1}.</span>
              <input
                type="text"
                value={participant}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="Nama peserta..."
                className="flex-1 px-4 py-2 border border-[#d4c5b9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] focus:border-transparent transition-all"
                required
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus Peserta"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
