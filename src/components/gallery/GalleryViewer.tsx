'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Search,
  Sparkles,
  MapPin,
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react';

export interface GalleryPhoto {
  _id: string;
  url: string;
  name: string;
  tags: string[];
  createdAt?: string;
  destination?: string;
}

interface GalleryViewerProps {
  initialPhotos: GalleryPhoto[];
}

export default function GalleryViewer({ initialPhotos }: GalleryViewerProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Fetch freshest photos on mount (e.g. newly uploaded photos from Admin)
  useEffect(() => {
    async function loadFreshPhotos() {
      try {
        const res = await fetch('/api/media', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            // Merge with existing initialPhotos avoiding duplicates
            const urlSet = new Set(data.map((d: any) => d.url));
            const extra = initialPhotos.filter((p) => !urlSet.has(p.url));
            setPhotos([...data, ...extra]);
          }
        }
      } catch {
        // Fall back to initialPhotos
      }
    }
    loadFreshPhotos();
  }, [initialPhotos]);

  // Derive unique categories / filter options
  const filterOptions = useMemo(() => {
    const defaultCategories = ['All', 'Sri Lanka', 'Saudi Arabia', 'Bahrain', 'Wildlife', 'Heritage', 'Recent Uploads'];
    return defaultCategories;
  }, []);

  // Filter and search logic
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      // Tag matching
      let matchesTag = true;
      if (selectedTag === 'All') {
        matchesTag = true;
      } else if (selectedTag === 'Recent Uploads') {
        matchesTag = photo.tags.some(
          (t) =>
            t.toLowerCase() === 'uploaded' ||
            t.toLowerCase() === 'recent' ||
            t.toLowerCase() === 'gallery'
        );
      } else if (selectedTag === 'Wildlife') {
        matchesTag = photo.tags.some((t) =>
          ['wildlife', 'safari', 'yala', 'elephants', 'nature'].includes(t.toLowerCase())
        );
      } else if (selectedTag === 'Heritage') {
        matchesTag = photo.tags.some((t) =>
          ['heritage', 'culture', 'discovery', 'pearling', 'history'].includes(t.toLowerCase())
        );
      } else {
        matchesTag = photo.tags.some((t) =>
          t.toLowerCase().includes(selectedTag.toLowerCase())
        );
      }

      // Search matching
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        matchesSearch =
          photo.name.toLowerCase().includes(query) ||
          photo.tags.some((t) => t.toLowerCase().includes(query));
      }

      return matchesTag && matchesSearch;
    });
  }, [photos, selectedTag, searchQuery]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  const activePhoto =
    lightboxIndex !== null && filteredPhotos[lightboxIndex]
      ? filteredPhotos[lightboxIndex]
      : null;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Controls Bar: Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-line">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {filterOptions.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-brand text-white shadow-md shadow-brand/20'
                    : 'bg-sand text-forest hover:bg-mist border border-line'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Search & Counter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/50" />
            <input
              type="text"
              placeholder="Search places, sights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-line rounded-full focus:outline-none focus:ring-2 focus:ring-brand"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <span className="text-xs font-semibold text-charcoal/60 bg-sand px-3 py-2 rounded-full border border-line shrink-0">
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
          </span>
        </div>
      </div>

      {/* Photo Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-20 bg-sand/30 rounded-2xl border border-dashed border-line">
          <ImageIcon className="w-12 h-12 text-charcoal/30 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-forest mb-1">No Photos Found</h3>
          <p className="text-sm text-charcoal/60 max-w-sm mx-auto mb-4">
            No gallery images matched your current filter criteria. Try choosing another category or clearing your search.
          </p>
          <button
            onClick={() => {
              setSelectedTag('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-brand text-white rounded-lg text-xs font-semibold hover:bg-forest transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo._id || photo.url + index}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-mist/60 border border-line/60 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop';
                }}
              />

              {/* Overlay Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="overflow-hidden">
                    <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold truncate">
                      {photo.tags[0] || 'Gallery'}
                    </p>
                    <h4 className="text-sm font-semibold truncate">{photo.name}</h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 z-50 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            title="Close (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) =>
                prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null
              );
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) =>
                prev !== null ? (prev + 1) % filteredPhotos.length : null
              );
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Box */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[75vh] overflow-hidden rounded-xl shadow-2xl flex items-center justify-center">
              <img
                src={activePhoto.url}
                alt={activePhoto.name}
                className="max-h-[75vh] max-w-full object-contain rounded-xl"
              />
            </div>

            {/* Bottom Info Bar */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 text-white px-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand text-white font-medium">
                    {activePhoto.tags[0] || 'Destination'}
                  </span>
                  <span className="text-xs text-white/60">
                    Photo {lightboxIndex + 1} of {filteredPhotos.length}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold">{activePhoto.name}</h3>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-forest px-4 py-2 rounded-lg text-xs font-bold hover:bg-amber-400 hover:text-forest transition-colors shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Plan Trip Here
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
