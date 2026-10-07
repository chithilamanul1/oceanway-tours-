'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2, Image as ImageIcon, Copy, Check } from 'lucide-react';

interface MediaItem {
  _id: string;
  url: string;
  name: string;
  tags: string[];
  createdAt: string;
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1600;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [newTags, setNewTags] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/media', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
          return;
        }
      }
      const { mediaSeed } = await import('@/data/mediaSeed');
      setItems(mediaSeed);
    } catch (err) {
      try {
        const { mediaSeed } = await import('@/data/mediaSeed');
        setItems(mediaSeed);
      } catch (e) {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setSaving(true);
    setUploadStatus(`Uploading ${files.length} image(s)...`);

    const uploadedItems: MediaItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const base64String = await compressImage(file);
        const res = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: base64String,
            name: file.name.replace(/\.[^/.]+$/, ''),
            tags: ['Uploaded', 'Gallery'],
          }),
        });

        if (res.ok) {
          const item = await res.json();
          uploadedItems.unshift(item);
        } else {
          const localItem: MediaItem = {
            _id: 'local-' + Date.now() + '-' + i,
            url: base64String,
            name: file.name.replace(/\.[^/.]+$/, ''),
            tags: ['Uploaded', 'Gallery'],
            createdAt: new Date().toISOString(),
          };
          uploadedItems.unshift(localItem);
        }
      } catch (err) {
        console.error('Failed to upload file:', file.name, err);
      }
    }

    if (uploadedItems.length > 0) {
      setItems((prev) => [...uploadedItems, ...prev]);
    }

    setSaving(false);
    setUploadStatus(null);
    e.target.value = '';
  };

  const handleAdd = async () => {
    if (!newUrl.trim()) return;
    setSaving(true);
    const tagsArr = newTags.split(',').map(t => t.trim()).filter(Boolean);
    const itemName = newName.trim() || newUrl.trim().split('/').pop() || 'Image';
    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: newUrl.trim(),
          name: itemName,
          tags: tagsArr
        })
      });
      if (res.ok) {
        const item = await res.json();
        setItems([item, ...items]);
      } else {
        const localItem: MediaItem = {
          _id: 'local-' + Date.now(),
          url: newUrl.trim(),
          name: itemName,
          tags: tagsArr,
          createdAt: new Date().toISOString()
        };
        setItems([localItem, ...items]);
      }
      setNewUrl(''); setNewName(''); setNewTags('');
      setAdding(false);
    } catch (err) {
      const localItem: MediaItem = {
        _id: 'local-' + Date.now(),
        url: newUrl.trim(),
        name: itemName,
        tags: tagsArr,
        createdAt: new Date().toISOString()
      };
      setItems([localItem, ...items]);
      setNewUrl(''); setNewName(''); setNewTags('');
      setAdding(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this image from the library?')) return;
    try {
      await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
      setItems(items.filter(i => i._id !== id));
    } catch (err) { console.error(err); }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // All unique tags
  const allTags = Array.from(new Set(items.flatMap(i => i.tags)));
  const filtered = filterTag ? items.filter(i => i.tags.includes(filterTag)) : items;

  if (loading) return (
    <div className="flex justify-center p-12">
      <Loader2 className="animate-spin text-brand" size={32} />
    </div>
  );

  return (
    <div className="bg-white p-6 shadow-sm border border-line rounded-lg">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-display text-forest mb-1">Media Library</h2>
          <p className="text-sm text-charcoal/70">{items.length} images stored. Click an image to copy its URL.</p>
        </div>
        <div className="flex gap-2">
          <label className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded font-medium hover:bg-forest transition-colors text-sm cursor-pointer disabled:opacity-50">
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
            {uploadStatus || 'Upload Images'}
            <input 
              type="file" 
              accept="image/*" 
              multiple
              disabled={saving}
              className="hidden" 
              onChange={handleFileUpload}
            />
          </label>
          <button
            onClick={() => setAdding(!adding)}
            className="flex items-center gap-2 border border-line text-forest px-4 py-2 rounded font-medium hover:bg-mist transition-colors text-sm"
          >
            <Plus size={16} /> Add via URL
          </button>
        </div>
      </div>

      {/* Add Form */}
      {adding && (
        <div className="mb-6 p-4 border border-brand/30 rounded-lg bg-mist/40">
          <h3 className="font-semibold text-forest mb-3 text-sm">Add New Image to Library</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-semibold text-forest mb-1">Image URL *</label>
              <input
                className="w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand"
                placeholder="https://example.com/image.jpg"
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-forest mb-1">Name / Label</label>
              <input
                className="w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand"
                placeholder="e.g. Galle Fort Sunset"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-forest mb-1">Tags (comma-separated)</label>
              <input
                className="w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand"
                placeholder="e.g. sri lanka, galle, hero"
                value={newTags}
                onChange={e => setNewTags(e.target.value)}
              />
            </div>
          </div>
          {newUrl && (
            <div className="mb-3">
              <p className="text-xs text-charcoal/60 mb-1">Preview:</p>
              <img src={newUrl} alt="preview" className="h-32 rounded object-cover border border-line" onError={e => (e.currentTarget.style.display = 'none')} />
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={handleAdd} disabled={saving || !newUrl.trim()} className="bg-brand text-white px-4 py-2 rounded font-medium hover:bg-forest transition-colors text-sm disabled:opacity-50">
              {saving ? 'Saving...' : 'Save to Library'}
            </button>
            <button onClick={() => setAdding(false)} className="border border-line px-4 py-2 rounded font-medium hover:bg-mist transition-colors text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setFilterTag('')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!filterTag ? 'bg-brand text-white' : 'bg-mist text-charcoal hover:bg-line'}`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag === filterTag ? '' : tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterTag === tag ? 'bg-brand text-white' : 'bg-mist text-charcoal hover:bg-line'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-charcoal/40">
          <ImageIcon size={48} className="mb-3 opacity-40" />
          <p>No images yet. Click "Add Image URL" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map(item => (
            <div key={item._id} className="group relative border border-line rounded-lg overflow-hidden bg-mist/30 hover:border-brand transition-colors">
              <div className="aspect-square overflow-hidden bg-mist">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => { e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-charcoal/30"><svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\'><rect x=\'3\' y=\'3\' width=\'18\' height=\'18\' rx=\'2\'/><circle cx=\'8.5\' cy=\'8.5\' r=\'1.5\'/><path d=\'m21 15-5-5L5 21\'/></svg></div>'; }}
                />
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-forest truncate" title={item.name}>{item.name}</p>
                {item.tags.length > 0 && (
                  <p className="text-[10px] text-charcoal/50 truncate mt-0.5">{item.tags.join(', ')}</p>
                )}
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => copyUrl(item._id, item.url)}
                  className="p-2 bg-white rounded text-forest hover:bg-sand transition-colors"
                  title="Copy URL"
                >
                  {copiedId === item._id ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 bg-white rounded text-terracotta hover:bg-sand transition-colors"
                  title="Remove"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
