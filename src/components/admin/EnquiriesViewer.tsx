'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Calendar, Users, DollarSign, Loader2, GripVertical } from 'lucide-react';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  travelDates: string;
  travellers: string;
  interest: string;
  message: string;
  budget: string;
  read: boolean;
  funnelStep: number;
  createdAt: string;
}

const COLUMNS = [
  { id: 1, title: 'New Leads' },
  { id: 2, title: 'Contacted' },
  { id: 3, title: 'Quoted' },
  { id: 4, title: 'Booked' }
];

export default function EnquiriesViewer() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateFunnelStep = async (id: string, newStep: number) => {
    // Optimistic update
    setEnquiries(enquiries.map(e => e._id === id ? { ...e, funnelStep: newStep } : e));
    
    // In a real app we would have a PUT endpoint to update `funnelStep`
    // We can use the generic update endpoint if it existed, or we can just simulate it.
    // Assuming we have `/api/inquiries/[id]`
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ funnelStep: newStep })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e: React.DragEvent, stepId: number) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) {
      updateFunnelStep(id, stepId);
    }
    setDraggedId(null);
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand" size={32} /></div>;
  }

  // If viewing details
  if (selectedEnquiry) {
    return (
      <div className="bg-white p-6 shadow-sm border border-line rounded-lg">
        <button onClick={() => setSelectedEnquiry(null)} className="text-sm font-bold text-brand mb-6 hover:underline">
          &larr; Back to Kanban Board
        </button>
        <div className="flex justify-between items-start mb-6 pb-6 border-b border-line">
          <div>
            <h2 className="text-2xl font-bold text-forest mb-2">{selectedEnquiry.name}</h2>
            <div className="flex gap-4 text-sm text-charcoal/80">
              <a href={`mailto:${selectedEnquiry.email}`} className="flex items-center gap-1 hover:text-brand"><Mail size={16}/> {selectedEnquiry.email}</a>
              {selectedEnquiry.phone && <span className="flex items-center gap-1">📞 {selectedEnquiry.phone}</span>}
            </div>
          </div>
          <div className="bg-mist text-brand px-3 py-1 rounded font-bold text-sm">
            {COLUMNS.find(c => c.id === selectedEnquiry.funnelStep)?.title || 'New Lead'}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-sand p-3 rounded">
            <p className="text-xs text-charcoal/60 font-semibold mb-1 flex items-center gap-1"><Calendar size={14}/> DATES</p>
            <p className="text-sm font-medium text-forest">{selectedEnquiry.travelDates || 'N/A'}</p>
          </div>
          <div className="bg-sand p-3 rounded">
            <p className="text-xs text-charcoal/60 font-semibold mb-1 flex items-center gap-1"><Users size={14}/> TRAVELLERS</p>
            <p className="text-sm font-medium text-forest">{selectedEnquiry.travellers || 'N/A'}</p>
          </div>
          <div className="bg-sand p-3 rounded">
            <p className="text-xs text-charcoal/60 font-semibold mb-1 flex items-center gap-1">📍 DESTINATION</p>
            <p className="text-sm font-medium text-forest">{selectedEnquiry.interest || 'N/A'}</p>
          </div>
          <div className="bg-sand p-3 rounded">
            <p className="text-xs text-charcoal/60 font-semibold mb-1 flex items-center gap-1"><DollarSign size={14}/> BUDGET</p>
            <p className="text-sm font-medium text-forest">{selectedEnquiry.budget || 'N/A'}</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-bold text-forest mb-3 uppercase tracking-wider">Message</h4>
          <div className="text-charcoal whitespace-pre-wrap leading-relaxed bg-sand/30 p-4 rounded border border-line/50">
            {selectedEnquiry.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow-sm border border-line rounded-lg overflow-x-auto">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-display text-forest mb-1">Sales CRM Board</h2>
          <p className="text-sm text-charcoal/70">Drag and drop leads to track booking progress.</p>
        </div>
      </div>
      
      <div className="flex gap-4 min-w-[800px] pb-4">
        {COLUMNS.map(column => {
          const columnEnquiries = enquiries.filter(e => (e.funnelStep || 1) === column.id);
          
          return (
            <div 
              key={column.id}
              className="flex-1 bg-mist/50 rounded-lg p-3 min-h-[500px]"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, column.id)}
            >
              <h3 className="font-bold text-forest mb-3 flex justify-between">
                {column.title} 
                <span className="bg-white text-xs px-2 py-0.5 rounded-full border border-line">{columnEnquiries.length}</span>
              </h3>
              
              <div className="space-y-3">
                {columnEnquiries.map(enquiry => (
                  <div
                    key={enquiry._id}
                    draggable
                    onDragStart={(e) => onDragStart(e, enquiry._id)}
                    className={`bg-white p-3 rounded shadow-sm border border-line cursor-grab active:cursor-grabbing hover:border-brand transition-colors ${draggedId === enquiry._id ? 'opacity-50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-2">
                        <GripVertical size={14} className="text-line mt-1 shrink-0" />
                        <h4 className="font-bold text-forest text-sm leading-tight" onClick={() => setSelectedEnquiry(enquiry)}>
                          <span className="hover:text-brand cursor-pointer">{enquiry.name}</span>
                        </h4>
                      </div>
                    </div>
                    <p className="text-xs text-charcoal/70 truncate pl-6 mb-2">{enquiry.interest}</p>
                    <div className="pl-6 flex justify-between items-center text-[10px] text-charcoal/50 font-medium">
                      <span>{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                      <span className="bg-sand px-1.5 py-0.5 rounded text-forest">{enquiry.budget || '?' }</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
