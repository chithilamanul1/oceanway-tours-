'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Calendar, Users, DollarSign, Loader2, Eye, EyeOff } from 'lucide-react';

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
  createdAt: string;
}

export default function EnquiriesViewer() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

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

  const markAsRead = async (id: string, currentStatus: boolean) => {
    // In a real app we'd have a PUT endpoint to update read status
    // For now we'll just optimistically update the UI
    setEnquiries(enquiries.map(e => e._id === id ? { ...e, read: !currentStatus } : e));
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand" size={32} /></div>;
  }

  return (
    <div className="bg-white p-6 shadow-sm border border-line">
      <h2 className="text-2xl font-display text-forest mb-6">Client Enquiries</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 border border-line h-[600px] overflow-y-auto">
          {enquiries.length === 0 ? (
            <p className="p-4 text-sm text-charcoal/60">No enquiries yet.</p>
          ) : (
            enquiries.map(enquiry => (
              <div 
                key={enquiry._id} 
                onClick={() => setSelectedEnquiry(enquiry)}
                className={`p-4 border-b border-line cursor-pointer transition-colors ${selectedEnquiry?._id === enquiry._id ? 'bg-mist' : 'hover:bg-sand/50'} ${!enquiry.read ? 'border-l-4 border-l-brand' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-semibold text-forest ${!enquiry.read ? 'font-bold' : ''}`}>{enquiry.name}</h3>
                  <span className="text-xs text-charcoal/60">{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-charcoal/80 truncate mb-1">{enquiry.interest}</p>
                <p className="text-xs text-charcoal/60 truncate">{enquiry.message}</p>
              </div>
            ))
          )}
        </div>
        
        <div className="lg:col-span-2 border border-line h-[600px] overflow-y-auto bg-sand/30 p-6">
          {selectedEnquiry ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-line">
              <div className="flex justify-between items-start mb-6 pb-6 border-b border-line">
                <div>
                  <h2 className="text-2xl font-bold text-forest mb-2">{selectedEnquiry.name}</h2>
                  <div className="flex gap-4 text-sm text-charcoal/80">
                    <a href={`mailto:${selectedEnquiry.email}`} className="flex items-center gap-1 hover:text-brand"><Mail size={16}/> {selectedEnquiry.email}</a>
                    {selectedEnquiry.phone && <span className="flex items-center gap-1">📞 {selectedEnquiry.phone}</span>}
                  </div>
                </div>
                <button 
                  onClick={() => markAsRead(selectedEnquiry._id, selectedEnquiry.read)}
                  className="flex items-center gap-2 text-sm px-3 py-1.5 border border-line rounded hover:bg-mist transition-colors"
                >
                  {selectedEnquiry.read ? <><EyeOff size={16}/> Mark Unread</> : <><Eye size={16}/> Mark Read</>}
                </button>
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
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-charcoal/50">
              <Mail size={48} className="mb-4 opacity-20" />
              <p>Select an enquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
