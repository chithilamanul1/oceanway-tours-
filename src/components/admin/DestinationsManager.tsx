'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Pencil,
  Trash2,
  Plus,
  Loader2,
  Image as ImageIcon,
  X,
  Star,
  StarOff,
  ChevronLeft,
  GalleryHorizontal,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Destination {
  _id?: string;
  id?: string;
  name: string;
  tagline: string;
  region: string;
  tag: string; // 'Sri Lanka' | 'Saudi Arabia' | 'Bahrain'
  description: string;
  image: string;
  bestSeason: string;
  gallery?: string[];
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const EMPTY_FORM: Omit<Destination, '_id' | 'id'> = {
  name: '',
  tagline: '',
  region: '',
  tag: 'Sri Lanka',
  description: '',
  image: '',
  bestSeason: '',
  gallery: [],
  featured: false,
  seoTitle: '',
  seoDescription: '',
};

const COUNTRY_TAGS = ['Sri Lanka', 'Saudi Arabia', 'Bahrain'] as const;

const getId = (d: Destination) => d._id || d.id || '';

const inputCls =
  'w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand';
const labelCls = 'block text-xs font-semibold text-forest mb-1';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Single label + input wrapper */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

/** Destination card shown in the list grid */
function DestinationCard({
  destination,
  onEdit,
  onDelete,
}: {
  destination: Destination;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group bg-white border border-line rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-44 bg-mist overflow-hidden">
        {destination.image ? (
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-charcoal/30 gap-2">
            <ImageIcon size={32} />
            <span className="text-xs">No image</span>
          </div>
        )}
        {/* Featured badge */}
        {destination.featured && (
          <span className="absolute top-2 left-2 bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Star size={10} fill="currentColor" /> Featured
          </span>
        )}
        {/* Country tag badge */}
        <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
          {destination.tag}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-semibold text-forest text-sm leading-tight line-clamp-1">
          {destination.name || <span className="text-charcoal/40 italic">Unnamed</span>}
        </h3>
        {destination.tagline && (
          <p className="text-xs text-charcoal/70 line-clamp-1 italic">{destination.tagline}</p>
        )}
        <div className="flex items-center gap-1 mt-1 flex-wrap">
          <span className="text-[10px] font-medium text-brand bg-brand/10 px-2 py-0.5 rounded-full">
            {destination.region || 'No Region'}
          </span>
          {destination.bestSeason && (
            <span className="text-[10px] text-charcoal/60 bg-sand px-2 py-0.5 rounded-full">
              {destination.bestSeason}
            </span>
          )}
        </div>
        {destination.gallery && destination.gallery.length > 0 && (
          <p className="text-[10px] text-charcoal/50 flex items-center gap-1 mt-1">
            <GalleryHorizontal size={10} />
            {destination.gallery.length} gallery image{destination.gallery.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-line px-4 py-2.5 flex justify-end gap-2 bg-sand/30">
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 border border-line px-3 py-1.5 rounded font-medium hover:bg-mist transition-colors text-sm text-forest"
        >
          <Pencil size={13} /> Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 border border-terracotta/40 px-3 py-1.5 rounded font-medium hover:bg-terracotta/10 transition-colors text-sm text-terracotta"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function DestinationsManager() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Panel state: null = list, 'new' = create form, 'edit' = edit form
  const [panelMode, setPanelMode] = useState<'new' | 'edit' | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Destination, '_id' | 'id'>>(EMPTY_FORM);

  // ---------------------------------------------------------------------------
  // Data fetching
  // ---------------------------------------------------------------------------
  const fetchDestinations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/destinations');
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      setDestinations(Array.isArray(data) ? data : data.destinations ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load destinations.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  // ---------------------------------------------------------------------------
  // Panel helpers
  // ---------------------------------------------------------------------------
  const openCreate = () => {
    setForm({ ...EMPTY_FORM, gallery: [] });
    setEditingId(null);
    setPanelMode('new');
  };

  const openEdit = (dest: Destination) => {
    setForm({
      name: dest.name ?? '',
      tagline: dest.tagline ?? '',
      region: dest.region ?? '',
      tag: dest.tag ?? 'Sri Lanka',
      description: dest.description ?? '',
      image: dest.image ?? '',
      bestSeason: dest.bestSeason ?? '',
      gallery: dest.gallery ? [...dest.gallery] : [],
      featured: dest.featured ?? false,
      seoTitle: dest.seoTitle ?? '',
      seoDescription: dest.seoDescription ?? '',
    });
    setEditingId(getId(dest));
    setPanelMode('edit');
  };

  const closePanel = () => {
    setPanelMode(null);
    setEditingId(null);
    setForm({ ...EMPTY_FORM, gallery: [] });
  };

  // ---------------------------------------------------------------------------
  // Form field helpers
  // ---------------------------------------------------------------------------
  type FormKey = keyof typeof EMPTY_FORM;
  const setField = <K extends FormKey>(key: K, value: (typeof EMPTY_FORM)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setGalleryItem = (index: number, value: string) => {
    setForm((prev) => {
      const g = [...(prev.gallery ?? [])];
      g[index] = value;
      return { ...prev, gallery: g };
    });
  };

  const addGalleryItem = () => {
    setForm((prev) => ({ ...prev, gallery: [...(prev.gallery ?? []), ''] }));
  };

  const removeGalleryItem = (index: number) => {
    setForm((prev) => {
      const g = [...(prev.gallery ?? [])];
      g.splice(index, 1);
      return { ...prev, gallery: g };
    });
  };

  // ---------------------------------------------------------------------------
  // Save
  // ---------------------------------------------------------------------------
  const handleSave = async () => {
    if (!form.name.trim()) {
      alert('Destination name is required.');
      return;
    }
    setSaving(true);
    try {
      const isEditing = panelMode === 'edit' && editingId;
      const url = isEditing ? `/api/destinations/${editingId}` : '/api/destinations';
      const method = isEditing ? 'PUT' : 'POST';

      const payload = {
        ...form,
        gallery: (form.gallery ?? []).filter((g) => g.trim() !== ''),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string; message?: string }).error || (body as { error?: string; message?: string }).message || `Server error ${res.status}`);
      }

      const saved: Destination = await res.json();

      if (isEditing) {
        setDestinations((prev) => prev.map((d) => (getId(d) === editingId ? saved : d)));
        alert('Destination updated successfully!');
      } else {
        setDestinations((prev) => [saved, ...prev]);
        alert('Destination created successfully!');
      }

      closePanel();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Delete
  // ---------------------------------------------------------------------------
  const handleDelete = async (dest: Destination) => {
    const id = getId(dest);
    if (!confirm(`Delete "${dest.name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      setDestinations((prev) => prev.filter((d) => getId(d) !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed.');
    }
  };

  // ---------------------------------------------------------------------------
  // Render — loading
  // ---------------------------------------------------------------------------
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <Loader2 className="animate-spin text-brand" size={36} />
        <p className="text-sm text-charcoal/60">Loading destinations…</p>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Render — error
  // ---------------------------------------------------------------------------
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <p className="text-terracotta font-medium">{error}</p>
        <button
          onClick={fetchDestinations}
          className="border border-line px-4 py-2 rounded font-medium hover:bg-mist transition-colors text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Render — form panel
  // ---------------------------------------------------------------------------
  const isFormOpen = panelMode !== null;

  return (
    <div className="relative bg-white border border-line rounded-xl shadow-sm overflow-hidden">

      {/* ------------------------------------------------------------------- */}
      {/* LIST VIEW                                                            */}
      {/* ------------------------------------------------------------------- */}
      <div className={isFormOpen ? 'hidden' : ''}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 border-b border-line">
          <div>
            <h2 className="text-2xl font-display text-forest">Manage Destinations</h2>
            <p className="text-xs text-charcoal/50 mt-0.5">
              {destinations.length} destination{destinations.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded font-medium hover:bg-forest transition-colors text-sm"
          >
            <Plus size={16} /> Add New Destination
          </button>
        </div>

        {/* Card grid */}
        <div className="p-6">
          {destinations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
              <div className="w-16 h-16 rounded-full bg-mist flex items-center justify-center">
                <ImageIcon size={28} className="text-charcoal/30" />
              </div>
              <p className="text-forest font-semibold">No destinations yet</p>
              <p className="text-sm text-charcoal/50">
                Click &ldquo;Add New Destination&rdquo; to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {destinations.map((dest) => (
                <DestinationCard
                  key={getId(dest)}
                  destination={dest}
                  onEdit={() => openEdit(dest)}
                  onDelete={() => handleDelete(dest)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* FORM PANEL                                                           */}
      {/* ------------------------------------------------------------------- */}
      {isFormOpen && (
        <div className="flex flex-col">
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-mist/40">
            <div className="flex items-center gap-3">
              <button
                onClick={closePanel}
                className="flex items-center gap-1 text-charcoal/60 hover:text-forest transition-colors text-sm font-medium"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <div className="w-px h-4 bg-line" />
              <h2 className="text-lg font-display text-forest">
                {panelMode === 'new' ? 'Add New Destination' : 'Edit Destination'}
              </h2>
            </div>
            <button
              onClick={closePanel}
              className="text-charcoal/40 hover:text-terracotta transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Panel body */}
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

              {/* ---- Core Info Section ---- */}
              <div className="md:col-span-2">
                <h3 className="text-xs font-bold text-charcoal/40 uppercase tracking-widest pb-1 border-b border-line">
                  Core Information
                </h3>
              </div>

              <Field label="Destination Name *">
                <input
                  className={inputCls}
                  placeholder="e.g. Sigiriya Rock Fortress"
                  value={form.name}
                  onChange={(e) => setField('name', e.target.value)}
                />
              </Field>

              <Field label="Tagline">
                <input
                  className={inputCls}
                  placeholder="Short subtitle or catchphrase"
                  value={form.tagline}
                  onChange={(e) => setField('tagline', e.target.value)}
                />
              </Field>

              <Field label="Region">
                <input
                  className={inputCls}
                  placeholder="e.g. Central Province"
                  value={form.region}
                  onChange={(e) => setField('region', e.target.value)}
                />
              </Field>

              <Field label="Country Tag">
                <select
                  className={inputCls}
                  value={form.tag}
                  onChange={(e) => setField('tag', e.target.value)}
                >
                  {COUNTRY_TAGS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Best Season">
                <input
                  className={inputCls}
                  placeholder="e.g. December – April"
                  value={form.bestSeason}
                  onChange={(e) => setField('bestSeason', e.target.value)}
                />
              </Field>

              {/* Featured toggle */}
              <div className="flex items-end pb-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-brand"
                    checked={!!form.featured}
                    onChange={(e) => setField('featured', e.target.checked)}
                  />
                  <span className="text-sm font-medium text-forest flex items-center gap-1.5">
                    {form.featured ? (
                      <Star size={14} className="text-brand" fill="currentColor" />
                    ) : (
                      <StarOff size={14} className="text-charcoal/40" />
                    )}
                    Featured Destination
                  </span>
                </label>
              </div>

              <div className="md:col-span-2">
                <Field label="Description">
                  <textarea
                    className={inputCls}
                    rows={5}
                    placeholder="Detailed multi-paragraph description of the destination…"
                    value={form.description}
                    onChange={(e) => setField('description', e.target.value)}
                  />
                </Field>
              </div>

              {/* ---- Main Image Section ---- */}
              <div className="md:col-span-2 mt-2">
                <h3 className="text-xs font-bold text-charcoal/40 uppercase tracking-widest pb-1 border-b border-line">
                  Main Image
                </h3>
              </div>

              <Field label="Image URL">
                <input
                  className={inputCls}
                  placeholder="https://… or /images/destination.jpg"
                  value={form.image}
                  onChange={(e) => setField('image', e.target.value)}
                />
                <p className="text-[11px] text-charcoal/40 mt-1">
                  Absolute URL or a path relative to the /public folder.
                </p>
              </Field>

              {/* Live preview */}
              <div>
                <p className={labelCls}>Live Preview</p>
                <div className="h-36 rounded-lg overflow-hidden border border-line bg-mist flex items-center justify-center">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-charcoal/30">
                      <ImageIcon size={28} />
                      <span className="text-xs">No preview</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ---- Gallery Section ---- */}
              <div className="md:col-span-2 mt-2">
                <h3 className="text-xs font-bold text-charcoal/40 uppercase tracking-widest pb-1 border-b border-line mb-3">
                  Gallery Images
                </h3>
                <div className="space-y-2">
                  {(form.gallery ?? []).map((url, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        className={inputCls}
                        placeholder={`Gallery image URL #${idx + 1}`}
                        value={url}
                        onChange={(e) => setGalleryItem(idx, e.target.value)}
                      />
                      {url && (
                        <div className="w-10 h-8 rounded overflow-hidden border border-line flex-shrink-0 bg-mist">
                          <img
                            src={url}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.opacity = '0';
                            }}
                          />
                        </div>
                      )}
                      <button
                        onClick={() => removeGalleryItem(idx)}
                        className="flex-shrink-0 text-charcoal/40 hover:text-terracotta transition-colors"
                        title="Remove"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addGalleryItem}
                    className="flex items-center gap-2 border border-dashed border-line px-3 py-2 rounded text-sm text-charcoal/60 hover:border-brand hover:text-brand transition-colors"
                  >
                    <Plus size={14} /> Add Gallery Image
                  </button>
                </div>
              </div>

              {/* ---- SEO Section ---- */}
              <div className="md:col-span-2 mt-2">
                <h3 className="text-xs font-bold text-charcoal/40 uppercase tracking-widest pb-1 border-b border-line">
                  SEO Metadata
                </h3>
              </div>

              <div className="md:col-span-2">
                <Field label="SEO Meta Title">
                  <input
                    className={inputCls}
                    placeholder="Override page title for search engines"
                    value={form.seoTitle ?? ''}
                    onChange={(e) => setField('seoTitle', e.target.value)}
                  />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="SEO Meta Description">
                  <textarea
                    className={inputCls}
                    rows={3}
                    placeholder="150–160 character description for search result snippets…"
                    value={form.seoDescription ?? ''}
                    onChange={(e) => setField('seoDescription', e.target.value)}
                  />
                  {form.seoDescription && (
                    <p
                      className={`text-[11px] mt-1 ${
                        (form.seoDescription?.length ?? 0) > 160
                          ? 'text-terracotta'
                          : 'text-charcoal/40'
                      }`}
                    >
                      {form.seoDescription?.length ?? 0} / 160 characters
                    </p>
                  )}
                </Field>
              </div>

            </div>
          </div>

          {/* Panel footer / actions */}
          <div className="border-t border-line px-6 py-4 bg-white flex flex-col sm:flex-row justify-end gap-3 mt-4">
            <button
              onClick={closePanel}
              disabled={saving}
              className="border border-line px-4 py-2 rounded font-medium hover:bg-mist transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center justify-center gap-2 bg-brand text-white px-5 py-2 rounded font-medium hover:bg-forest transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Saving…
                </>
              ) : panelMode === 'new' ? (
                <>
                  <Plus size={15} /> Create Destination
                </>
              ) : (
                <>
                  <Pencil size={15} /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
