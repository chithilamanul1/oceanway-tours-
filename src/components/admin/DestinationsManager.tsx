'use client';

import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, Loader2, Image as ImageIcon } from 'lucide-react';
import { Destination } from '@/types/content';

export default function DestinationsManager() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Destination>>({});

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await fetch('/api/destinations');
      if (res.ok) {
        const data = await res.json();
        setDestinations(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (destination: Destination) => {
    setEditingId(destination._id || destination.id);
    setEditForm(destination);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async () => {
    try {
      if (!editingId) return;
      const res = await fetch(`/api/destinations/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const updated = await res.json();
        setDestinations(destinations.map(d => (d._id === editingId || d.id === editingId) ? updated : d));
        setEditingId(null);
        setEditForm({});
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    try {
      const res = await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDestinations(destinations.filter(d => d._id !== id && d.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand" size={32} /></div>;

  return (
    <div className="bg-white p-6 shadow-sm border border-line">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display text-forest">Manage Destinations</h2>
        <button className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded font-medium hover:bg-forest transition-colors">
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-line text-sm text-forest uppercase">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Region</th>
              <th className="p-3">Country Tag</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((destination) => {
              const id = destination._id || destination.id;
              const isEditing = editingId === id;

              if (isEditing) {
                return (
                  <tr key={`edit-${id}`} className="border-b border-line bg-sand/30">
                    <td className="p-3" colSpan={5}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-brand/30 rounded bg-white">
                        <div>
                          <label className="block text-xs font-semibold text-forest mb-1">Name</label>
                          <input 
                            className="w-full border border-line p-2 rounded text-sm" 
                            value={editForm.name || ''} 
                            onChange={e => setEditForm({...editForm, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-forest mb-1">Image URL (e.g., /image.jpg)</label>
                          <input 
                            className="w-full border border-line p-2 rounded text-sm" 
                            value={editForm.image || ''} 
                            onChange={e => setEditForm({...editForm, image: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-forest mb-1">Region</label>
                          <input 
                            className="w-full border border-line p-2 rounded text-sm" 
                            value={editForm.region || ''} 
                            onChange={e => setEditForm({...editForm, region: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-forest mb-1">Best Season</label>
                          <input 
                            className="w-full border border-line p-2 rounded text-sm" 
                            value={editForm.bestSeason || ''} 
                            onChange={e => setEditForm({...editForm, bestSeason: e.target.value})}
                          />
                        </div>
                        <div className="md:col-span-2">
                           <label className="block text-xs font-semibold text-forest mb-1">Description</label>
                           <textarea
                             className="w-full border border-line p-2 rounded text-sm"
                             rows={3}
                             value={editForm.description || ''}
                             onChange={e => setEditForm({...editForm, description: e.target.value})}
                           />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                          <button onClick={handleCancelEdit} className="px-4 py-2 text-sm font-medium text-forest border border-line rounded hover:bg-mist">Cancel</button>
                          <button onClick={handleSaveEdit} className="px-4 py-2 text-sm font-medium text-white bg-brand rounded hover:bg-forest">Save Changes</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={id} className="border-b border-line hover:bg-sand/30 transition-colors">
                  <td className="p-3">
                    {destination.image ? (
                      <img src={destination.image} alt={destination.name} className="w-16 h-12 object-cover rounded shadow-sm" />
                    ) : (
                      <div className="w-16 h-12 bg-line rounded flex items-center justify-center text-charcoal/50"><ImageIcon size={16}/></div>
                    )}
                  </td>
                  <td className="p-3 font-semibold text-forest">{destination.name}</td>
                  <td className="p-3 text-charcoal">{destination.region}</td>
                  <td className="p-3 text-brand font-medium">{destination.tag}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => handleEditClick(destination)} className="p-2 text-charcoal hover:text-brand transition-colors"><Pencil size={18} /></button>
                    <button onClick={() => handleDelete(id)} className="p-2 text-charcoal hover:text-terracotta transition-colors"><Trash2 size={18} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
