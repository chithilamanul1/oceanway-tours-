'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Pencil, Trash2, Plus, Loader2, Image as ImageIcon, X,
  ChevronDown, ChevronUp, CalendarDays, Users, DollarSign,
  MapPin, LayoutList, ArrowLeft, CheckCircle2, AlertCircle,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface DayPlan {
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation: string;
  transferTime?: string;
}

interface Itinerary {
  _id?: string;
  id: string;
  title: string;
  destinationName: string;
  duration: number;
  groupSize: string;
  difficulty: string;
  price: number;
  season: string;
  image: string;
  summary: string;
  highlights: string[];
  tier: string;
  theme: string;
  dayPlans: DayPlan[];
  inclusions?: string[];
  exclusions?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

type FormData = Omit<Itinerary, '_id' | 'id'> & { _id?: string; id?: string };

// ─── Helpers ─────────────────────────────────────────────────────────────────

const BLANK_FORM: FormData = {
  title: '',
  summary: '',
  destinationName: '',
  duration: 1,
  groupSize: '',
  price: 0,
  season: '',
  tier: 'Tailor-Made',
  theme: 'Honeymoon',
  difficulty: 'Easy',
  image: '',
  highlights: [''],
  dayPlans: [],
  inclusions: [],
  exclusions: [],
  seoTitle: '',
  seoDescription: '',
};

const BLANK_DAY = (day: number): DayPlan => ({
  day,
  title: '',
  description: '',
  activities: [],
  accommodation: '',
  transferTime: '',
});

const inputCls =
  'w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand';
const labelCls = 'block text-xs font-semibold text-forest mb-1';

// ─── Toast ───────────────────────────────────────────────────────────────────

interface Toast { id: number; message: string; type: 'success' | 'error' }

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);
  return { toasts, push };
}

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`flex items-center gap-2 px-4 py-3 rounded shadow-lg text-white text-sm font-medium
            ${t.type === 'success' ? 'bg-forest' : 'bg-terracotta'}`}
        >
          {t.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ─── Day Plan Card ────────────────────────────────────────────────────────────

function DayCard({
  plan,
  index,
  onChange,
  onRemove,
}: {
  plan: DayPlan;
  index: number;
  onChange: (idx: number, updated: DayPlan) => void;
  onRemove: (idx: number) => void;
}) {
  const [open, setOpen] = useState(index === 0);
  const upd = (patch: Partial<DayPlan>) => onChange(index, { ...plan, ...patch });

  return (
    <div className="border border-line rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-sand/60 hover:bg-sand transition-colors text-left"
      >
        <span className="font-semibold text-forest text-sm">
          Day {plan.day}{plan.title ? ` — ${plan.title}` : ''}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onRemove(index); }}
            className="p-1 text-charcoal/50 hover:text-terracotta transition-colors"
          >
            <X size={14} />
          </button>
          {open ? <ChevronUp size={16} className="text-charcoal" /> : <ChevronDown size={16} className="text-charcoal" />}
        </div>
      </button>
      {open && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
          <div>
            <label className={labelCls}>Day Title</label>
            <input className={inputCls} value={plan.title} onChange={e => upd({ title: e.target.value })} placeholder="e.g. Arrival in Colombo" />
          </div>
          <div>
            <label className={labelCls}>Accommodation</label>
            <input className={inputCls} value={plan.accommodation} onChange={e => upd({ accommodation: e.target.value })} placeholder="Hotel name or type" />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Description</label>
            <textarea className={inputCls} rows={3} value={plan.description} onChange={e => upd({ description: e.target.value })} placeholder="Describe the day..." />
          </div>
          <div>
            <label className={labelCls}>Activities (comma-separated)</label>
            <input
              className={inputCls}
              value={plan.activities.join(', ')}
              onChange={e => upd({ activities: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
              placeholder="e.g. Whale watching, Snorkeling"
            />
          </div>
          <div>
            <label className={labelCls}>Transfer Time (optional)</label>
            <input className={inputCls} value={plan.transferTime ?? ''} onChange={e => upd({ transferTime: e.target.value })} placeholder="e.g. 2h drive" />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-line rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-line bg-sand/40">
        <h3 className="text-sm font-semibold text-forest">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ItinerariesManager() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [form, setForm] = useState<FormData>(BLANK_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toasts, push } = useToast();

  const fetchItineraries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/itineraries');
      if (res.ok) {
        const data = await res.json();
        setItineraries(Array.isArray(data) ? data : (data.itineraries ?? []));
      } else {
        push('Failed to load itineraries', 'error');
      }
    } catch {
      push('Network error loading itineraries', 'error');
    } finally {
      setLoading(false);
    }
  }, [push]);

  useEffect(() => { fetchItineraries(); }, [fetchItineraries]);

  const openCreate = () => { setForm(BLANK_FORM); setEditingId(null); setView('form'); };
  const openEdit = (it: Itinerary) => {
    setForm({ ...it, highlights: it.highlights.length ? it.highlights : [''], inclusions: it.inclusions ?? [], exclusions: it.exclusions ?? [] });
    setEditingId(it._id ?? it.id);
    setView('form');
  };
  const goBack = () => { setView('list'); setEditingId(null); setForm(BLANK_FORM); };
  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const addHighlight = () => setForm(p => ({ ...p, highlights: [...p.highlights, ''] }));
  const removeHighlight = (i: number) =>
    setForm(p => ({ ...p, highlights: p.highlights.filter((_, idx) => idx !== i) }));
  const updateHighlight = (i: number, val: string) =>
    setForm(p => ({ ...p, highlights: p.highlights.map((h, idx) => idx === i ? val : h) }));

  const addDay = () =>
    setForm(p => ({ ...p, dayPlans: [...p.dayPlans, BLANK_DAY(p.dayPlans.length + 1)] }));
  const removeDay = (idx: number) =>
    setForm(p => ({
      ...p,
      dayPlans: p.dayPlans.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 })),
    }));
  const updateDay = (idx: number, updated: DayPlan) =>
    setForm(p => ({ ...p, dayPlans: p.dayPlans.map((d, i) => i === idx ? updated : d) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { push('Title is required', 'error'); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        highlights: form.highlights.filter(Boolean),
        inclusions: Array.isArray(form.inclusions) ? form.inclusions : String(form.inclusions).split(/[\n,]/).map((s: string) => s.trim()).filter(Boolean),
        exclusions: Array.isArray(form.exclusions) ? form.exclusions : String(form.exclusions).split(/[\n,]/).map((s: string) => s.trim()).filter(Boolean),
      };
      const url = editingId ? `/api/itineraries/${editingId}` : '/api/itineraries';
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        push(editingId ? 'Itinerary updated!' : 'Itinerary created!');
        await fetchItineraries();
        goBack();
      } else {
        const err = await res.json().catch(() => ({}));
        push(err.message || err.error || 'Save failed', 'error');
      }
    } catch {
      push('Network error saving itinerary', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (it: Itinerary) => {
    if (!confirm(`Delete "${it.title}"? This cannot be undone.`)) return;
    const id = it._id ?? it.id;
    try {
      const res = await fetch(`/api/itineraries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItineraries(prev => prev.filter(i => (i._id ?? i.id) !== id));
        push('Itinerary deleted');
      } else {
        push('Delete failed', 'error');
      }
    } catch {
      push('Network error', 'error');
    }
  };

  const tierBadge = (tier: string) => {
    if (tier === 'Tailor-Made') return 'bg-brand/10 text-brand';
    if (tier === 'Small Group') return 'bg-forest/10 text-forest';
    return 'bg-charcoal/10 text-charcoal';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-charcoal gap-3">
        <Loader2 className="animate-spin text-brand" size={36} />
        <p className="text-sm font-medium">Loading itineraries…</p>
      </div>
    );
  }

  // ─── FORM VIEW ─────────────────────────────────────────────────────────────
  if (view === 'form') {
    const inclusionsText = Array.isArray(form.inclusions) ? (form.inclusions as string[]).join('\n') : String(form.inclusions ?? '');
    const exclusionsText = Array.isArray(form.exclusions) ? (form.exclusions as string[]).join('\n') : String(form.exclusions ?? '');

    return (
      <>
        <ToastContainer toasts={toasts} />
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <button type="button" onClick={goBack} className="p-2 rounded hover:bg-mist text-charcoal transition-colors">
              <ArrowLeft size={18} />
            </button>
            <h2 className="text-2xl font-display text-forest">
              {editingId ? 'Edit Itinerary' : 'New Itinerary'}
            </h2>
          </div>

          <div className="space-y-8">
            <Section title="Core Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className={labelCls}>Title *</label>
                  <input className={inputCls} value={form.title} onChange={e => setField('title', e.target.value)} placeholder="e.g. Sri Lanka Honeymoon Escape" required />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls}>Summary</label>
                  <textarea className={inputCls} rows={3} value={form.summary} onChange={e => setField('summary', e.target.value)} placeholder="Short enticing description of the package…" />
                </div>
                <div>
                  <label className={labelCls}>Destination Name</label>
                  <input className={inputCls} value={form.destinationName} onChange={e => setField('destinationName', e.target.value)} placeholder="e.g. Sri Lanka" />
                </div>
                <div>
                  <label className={labelCls}>Season</label>
                  <input className={inputCls} value={form.season} onChange={e => setField('season', e.target.value)} placeholder="e.g. November – April" />
                </div>
                <div>
                  <label className={labelCls}>Duration (days)</label>
                  <input className={inputCls} type="number" min={1} value={form.duration} onChange={e => setField('duration', Number(e.target.value))} />
                </div>
                <div>
                  <label className={labelCls}>Group Size</label>
                  <input className={inputCls} value={form.groupSize} onChange={e => setField('groupSize', e.target.value)} placeholder="e.g. 2 – 12 people" />
                </div>
                <div>
                  <label className={labelCls}>Price (USD)</label>
                  <input className={inputCls} type="number" min={0} step={1} value={form.price} onChange={e => setField('price', Number(e.target.value))} />
                </div>
              </div>
            </Section>

            <Section title="Classification">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className={labelCls}>Tier</label>
                  <select className={inputCls} value={form.tier} onChange={e => setField('tier', e.target.value)}>
                    {['Tailor-Made', 'Small Group', 'Fixed Getaway'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Theme</label>
                  <select className={inputCls} value={form.theme} onChange={e => setField('theme', e.target.value)}>
                    {['Honeymoon', 'Wildlife', 'Adventure', 'Culture', 'History'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Difficulty</label>
                  <select className={inputCls} value={form.difficulty} onChange={e => setField('difficulty', e.target.value)}>
                    {['Easy', 'Moderate', 'Challenging'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </Section>

            <Section title="Hero Image">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <div>
                  <label className={labelCls}>Image URL</label>
                  <input className={inputCls} value={form.image} onChange={e => setField('image', e.target.value)} placeholder="https://... or /images/hero.jpg" />
                  <p className="text-xs text-charcoal/60 mt-1">Paste a full URL or a public path.</p>
                </div>
                <div className="flex items-center justify-center border border-dashed border-line rounded-lg h-36 bg-sand/30 overflow-hidden">
                  {form.image ? (
                    <img src={form.image} alt="Preview" className="h-full w-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-charcoal/40">
                      <ImageIcon size={28} />
                      <span className="text-xs">Preview</span>
                    </div>
                  )}
                </div>
              </div>
            </Section>

            <Section title="Highlights">
              <div className="space-y-2">
                {form.highlights.map((h, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input className={inputCls} value={h} onChange={e => updateHighlight(i, e.target.value)} placeholder={`Highlight ${i + 1}`} />
                    <button type="button" onClick={() => removeHighlight(i)} className="text-charcoal/40 hover:text-terracotta transition-colors shrink-0">
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addHighlight} className="flex items-center gap-1 text-brand text-sm font-medium hover:text-forest transition-colors mt-1">
                  <Plus size={14} /> Add Highlight
                </button>
              </div>
            </Section>

            <Section title="Inclusions & Exclusions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Inclusions (one per line or comma-separated)</label>
                  <textarea
                    className={inputCls}
                    rows={5}
                    value={inclusionsText}
                    onChange={e => setField('inclusions', e.target.value.split(/[\n,]/).map(s => s.trim()).filter(Boolean) as unknown as string[])}
                    placeholder={"Airport transfers\nAccommodation (7 nights)\nBreakfast daily"}
                  />
                </div>
                <div>
                  <label className={labelCls}>Exclusions (one per line or comma-separated)</label>
                  <textarea
                    className={inputCls}
                    rows={5}
                    value={exclusionsText}
                    onChange={e => setField('exclusions', e.target.value.split(/[\n,]/).map(s => s.trim()).filter(Boolean) as unknown as string[])}
                    placeholder={"International flights\nVisa fees\nTravel insurance"}
                  />
                </div>
              </div>
            </Section>

            <Section title={`Day Plans (${form.dayPlans.length} days)`}>
              <div className="space-y-3">
                {form.dayPlans.length === 0 && (
                  <p className="text-sm text-charcoal/50 italic">No day plans yet. Click below to add your first day.</p>
                )}
                {form.dayPlans.map((plan, idx) => (
                  <DayCard key={idx} plan={plan} index={idx} onChange={updateDay} onRemove={removeDay} />
                ))}
                <button
                  type="button"
                  onClick={addDay}
                  className="flex items-center gap-2 border border-dashed border-brand text-brand text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand/5 transition-colors w-full justify-center"
                >
                  <Plus size={15} /> Add Day {form.dayPlans.length + 1}
                </button>
              </div>
            </Section>

            <Section title="SEO Metadata">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={labelCls}>Meta Title</label>
                  <input className={inputCls} value={form.seoTitle ?? ''} onChange={e => setField('seoTitle', e.target.value)} placeholder="e.g. 10-Day Sri Lanka Honeymoon Package | OceanWay Tours" />
                  <p className="text-xs text-charcoal/50 mt-1">{(form.seoTitle ?? '').length}/60 characters recommended</p>
                </div>
                <div>
                  <label className={labelCls}>Meta Description</label>
                  <textarea className={inputCls} rows={3} value={form.seoDescription ?? ''} onChange={e => setField('seoDescription', e.target.value)} placeholder="Concise page description for search engines…" />
                  <p className="text-xs text-charcoal/50 mt-1">{(form.seoDescription ?? '').length}/160 characters recommended</p>
                </div>
              </div>
            </Section>
          </div>

          <div className="sticky bottom-0 mt-8 bg-white/90 backdrop-blur border-t border-line py-4 flex items-center justify-between">
            <button type="button" onClick={goBack} className="border border-line px-4 py-2 rounded font-medium hover:bg-mist transition-colors text-sm">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-brand text-white px-6 py-2 rounded font-medium hover:bg-forest transition-colors text-sm disabled:opacity-60"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle2 size={15} />}
              {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create Itinerary'}
            </button>
          </div>
        </form>
      </>
    );
  }

  // ─── LIST VIEW ─────────────────────────────────────────────────────────────
  return (
    <>
      <ToastContainer toasts={toasts} />
      <div className="bg-white border border-line shadow-sm rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 border-b border-line">
          <div>
            <h2 className="text-2xl font-display text-forest">Tour Packages</h2>
            <p className="text-sm text-charcoal/60 mt-0.5">{itineraries.length} itinerar{itineraries.length === 1 ? 'y' : 'ies'}</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded font-medium hover:bg-forest transition-colors text-sm"
          >
            <Plus size={16} /> Add New Package
          </button>
        </div>

        {itineraries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-charcoal/40 gap-3">
            <LayoutList size={40} />
            <p className="font-medium">No itineraries yet</p>
            <button onClick={openCreate} className="text-brand text-sm hover:underline">Create your first one</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-line text-xs text-forest uppercase tracking-wide bg-sand/30">
                  <th className="px-4 py-3 w-16">Image</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Destination</th>
                  <th className="px-4 py-3">Tier</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {itineraries.map(it => {
                  const id = it._id ?? it.id;
                  return (
                    <tr key={id} className="border-b border-line hover:bg-sand/20 transition-colors">
                      <td className="px-4 py-3">
                        {it.image ? (
                          <img src={it.image} alt={it.title} className="w-16 h-11 object-cover rounded shadow-sm" />
                        ) : (
                          <div className="w-16 h-11 bg-mist rounded flex items-center justify-center">
                            <ImageIcon size={15} className="text-charcoal/30" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-forest text-sm leading-tight">{it.title}</p>
                        <p className="text-xs text-charcoal/50 mt-0.5 capitalize">{it.theme} · {it.difficulty}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm text-charcoal">
                          <MapPin size={12} className="text-brand shrink-0" />
                          {it.destinationName}
                        </div>
                        <div className="text-xs text-charcoal/50 mt-0.5 flex items-center gap-1">
                          <CalendarDays size={11} /> {it.season}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${tierBadge(it.tier)}`}>
                          {it.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm text-charcoal">
                          <CalendarDays size={13} className="text-brand" /> {it.duration}d
                        </div>
                        <div className="flex items-center gap-1 text-xs text-charcoal/50 mt-0.5">
                          <Users size={11} /> {it.groupSize}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm font-semibold text-forest">
                          <DollarSign size={13} className="text-brand" />
                          {it.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(it)} title="Edit" className="p-2 rounded hover:bg-brand/10 text-charcoal hover:text-brand transition-colors">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => handleDelete(it)} title="Delete" className="p-2 rounded hover:bg-terracotta/10 text-charcoal hover:text-terracotta transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
