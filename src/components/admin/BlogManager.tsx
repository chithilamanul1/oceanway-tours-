'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  PlusCircle,
  Pencil,
  Trash2,
  X,
  PlusSquare,
  Loader2,
  ArrowLeft,
  ImageIcon,
  Clock,
  Tag,
  User,
  CalendarDays,
  FileText,
  Search,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BlogPost {
  _id?: string;
  id?: string;
  title: string;
  excerpt: string;
  content: string[]; // array of paragraphs
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
  seoTitle?: string;
  seoDescription?: string;
}

type View = 'list' | 'form';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const EMPTY_POST: Omit<BlogPost, '_id' | 'id'> = {
  title: '',
  excerpt: '',
  content: [''],
  author: 'OceanWay Team',
  date: new Date().toISOString().split('T')[0],
  category: '',
  image: '',
  readTime: 5,
  seoTitle: '',
  seoDescription: '',
};

function resolveId(post: BlogPost): string {
  return (post._id ?? post.id) as string;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="animate-spin text-brand" size={36} />
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-charcoal uppercase tracking-wide mb-1">
      {children}
    </label>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function BlogManager() {
  const [view, setView] = useState<View>('list');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Form state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Omit<BlogPost, '_id' | 'id'>>(EMPTY_POST);

  // -------------------------------------------------------------------------
  // Data fetching
  // -------------------------------------------------------------------------

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/blog');
      if (!res.ok) throw new Error(`Failed to fetch posts (${res.status})`);
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : data.posts ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // -------------------------------------------------------------------------
  // Navigation helpers
  // -------------------------------------------------------------------------

  function openCreate() {
    setEditingPost(null);
    setForm(EMPTY_POST);
    setView('form');
  }

  function openEdit(post: BlogPost) {
    setEditingPost(post);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content?.length ? post.content : [''],
      author: post.author,
      date: post.date,
      category: post.category,
      image: post.image,
      readTime: post.readTime,
      seoTitle: post.seoTitle ?? '',
      seoDescription: post.seoDescription ?? '',
    });
    setView('form');
  }

  function backToList() {
    setView('list');
    setEditingPost(null);
  }

  // -------------------------------------------------------------------------
  // Form field helpers
  // -------------------------------------------------------------------------

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Paragraph management
  function setParagraph(index: number, value: string) {
    const updated = [...form.content];
    updated[index] = value;
    setField('content', updated);
  }

  function addParagraph() {
    setField('content', [...form.content, '']);
  }

  function removeParagraph(index: number) {
    if (form.content.length === 1) return; // always keep at least one
    setField('content', form.content.filter((_, i) => i !== index));
  }

  // -------------------------------------------------------------------------
  // CRUD operations
  // -------------------------------------------------------------------------

  async function handleSave() {
    if (!form.title.trim()) { alert('Title is required.'); return; }
    if (!form.category.trim()) { alert('Category is required.'); return; }

    setSaving(true);
    setError(null);

    // Strip empty trailing paragraphs
    const cleanContent = form.content.map((p) => p.trim()).filter(Boolean);
    const payload: BlogPost = { ...form, content: cleanContent.length ? cleanContent : [''] };

    try {
      let res: Response;
      if (editingPost) {
        const id = resolveId(editingPost);
        res = await fetch(`/api/blog/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? `Save failed (${res.status})`);
      }

      await fetchPosts();
      backToList();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(post: BlogPost) {
    const id = resolveId(post);
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;

    setDeleting(id);
    setError(null);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      setPosts((prev) => prev.filter((p) => resolveId(p) !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleting(null);
    }
  }

  // -------------------------------------------------------------------------
  // Filtered posts
  // -------------------------------------------------------------------------

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase()),
  );

  // =========================================================================
  // RENDER - LIST VIEW
  // =========================================================================

  if (view === 'list') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display text-forest">Blog &amp; Journal</h2>
            <p className="text-sm text-charcoal/60 mt-0.5">
              Manage articles, travel stories, and destination guides.
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded font-medium hover:bg-forest transition-colors text-sm"
          >
            <PlusCircle size={16} />
            New Post
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="bg-terracotta/10 border border-terracotta text-terracotta text-sm px-4 py-3 rounded flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)}><X size={14} /></button>
          </div>
        )}

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-line pl-9 pr-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        {/* Content */}
        {loading ? (
          <Spinner />
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-charcoal/40 text-sm border border-dashed border-line rounded-lg">
            {search ? 'No posts match your search.' : 'No blog posts yet. Create the first one!'}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-sand border-b border-line text-xs uppercase tracking-wide text-charcoal/60">
                  <th className="px-4 py-3 text-left font-semibold">Thumbnail</th>
                  <th className="px-4 py-3 text-left font-semibold">Title</th>
                  <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Category</th>
                  <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Author</th>
                  <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Date</th>
                  <th className="px-4 py-3 text-left font-semibold hidden xl:table-cell">Read</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredPosts.map((post) => {
                  const id = resolveId(post);
                  return (
                    <tr key={id} className="hover:bg-mist transition-colors">
                      {/* Thumbnail */}
                      <td className="px-4 py-3">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-14 h-10 object-cover rounded border border-line"
                          />
                        ) : (
                          <div className="w-14 h-10 bg-sand rounded border border-line flex items-center justify-center">
                            <ImageIcon size={14} className="text-charcoal/30" />
                          </div>
                        )}
                      </td>
                      {/* Title + excerpt */}
                      <td className="px-4 py-3 max-w-xs">
                        <p className="font-medium text-charcoal leading-tight truncate">{post.title}</p>
                        {post.excerpt && (
                          <p className="text-charcoal/50 text-xs mt-0.5 truncate">{post.excerpt}</p>
                        )}
                      </td>
                      {/* Category */}
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="inline-block bg-brand/10 text-brand text-xs font-medium px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                      </td>
                      {/* Author */}
                      <td className="px-4 py-3 text-charcoal/70 hidden lg:table-cell">{post.author}</td>
                      {/* Date */}
                      <td className="px-4 py-3 text-charcoal/70 hidden lg:table-cell whitespace-nowrap">
                        {post.date}
                      </td>
                      {/* Read time */}
                      <td className="px-4 py-3 text-charcoal/70 hidden xl:table-cell whitespace-nowrap">
                        {post.readTime} min
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(post)}
                            className="flex items-center gap-1 border border-line px-3 py-1.5 rounded text-xs font-medium hover:bg-mist transition-colors"
                          >
                            <Pencil size={12} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post)}
                            disabled={deleting === id}
                            className="flex items-center gap-1 border border-terracotta/40 text-terracotta px-3 py-1.5 rounded text-xs font-medium hover:bg-terracotta/10 transition-colors disabled:opacity-50"
                          >
                            {deleting === id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Trash2 size={12} />
                            )}
                            Delete
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

        {/* Footer count */}
        {!loading && filteredPosts.length > 0 && (
          <p className="text-xs text-charcoal/40 text-right">
            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
            {search ? ` matching "${search}"` : ' total'}
          </p>
        )}
      </div>
    );
  }

  // =========================================================================
  // RENDER - FORM VIEW
  // =========================================================================

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={backToList}
          className="flex items-center gap-1.5 border border-line px-3 py-1.5 rounded text-sm font-medium hover:bg-mist transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <div>
          <h2 className="text-2xl font-display text-forest">
            {editingPost ? 'Edit Post' : 'New Post'}
          </h2>
          <p className="text-sm text-charcoal/60 mt-0.5">
            {editingPost ? `Editing: ${editingPost.title}` : 'Fill in the details to publish a new article.'}
          </p>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-terracotta/10 border border-terracotta text-terracotta text-sm px-4 py-3 rounded flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)}><X size={14} /></button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Main column */}
        <div className="xl:col-span-2 space-y-6">

          {/* Core Info Card */}
          <section className="bg-white border border-line rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-charcoal flex items-center gap-2">
              <FileText size={15} className="text-brand" />
              Post Details
            </h3>

            {/* Title */}
            <div>
              <FieldLabel>Title *</FieldLabel>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setField('title', e.target.value)}
                placeholder="e.g. Exploring the Ancient Temples of Sri Lanka"
                className="w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>

            {/* Excerpt */}
            <div>
              <FieldLabel>Excerpt (SEO summary)</FieldLabel>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => setField('excerpt', e.target.value)}
                placeholder="1-2 sentence summary shown in search results and post cards..."
                className="w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand resize-none"
              />
            </div>

            {/* Meta row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <FieldLabel>
                  <span className="flex items-center gap-1"><Tag size={11} />Category *</span>
                </FieldLabel>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setField('category', e.target.value)}
                  placeholder="e.g. Sri Lanka, Travel Tips"
                  className="w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
              {/* Author */}
              <div>
                <FieldLabel>
                  <span className="flex items-center gap-1"><User size={11} />Author</span>
                </FieldLabel>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setField('author', e.target.value)}
                  placeholder="OceanWay Team"
                  className="w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
              {/* Date */}
              <div>
                <FieldLabel>
                  <span className="flex items-center gap-1"><CalendarDays size={11} />Publish Date</span>
                </FieldLabel>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setField('date', e.target.value)}
                  className="w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
              {/* Read time */}
              <div>
                <FieldLabel>
                  <span className="flex items-center gap-1"><Clock size={11} />Read Time (minutes)</span>
                </FieldLabel>
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={form.readTime}
                  onChange={(e) => setField('readTime', Number(e.target.value))}
                  className="w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
            </div>
          </section>

          {/* Content / Paragraphs Card */}
          <section className="bg-white border border-line rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-charcoal flex items-center gap-2">
                <FileText size={15} className="text-brand" />
                Article Content
                <span className="ml-1 text-xs font-normal text-charcoal/50">
                  ({form.content.length} paragraph{form.content.length !== 1 ? 's' : ''})
                </span>
              </h3>
              <button
                type="button"
                onClick={addParagraph}
                className="flex items-center gap-1.5 text-brand text-xs font-medium hover:text-forest transition-colors"
              >
                <PlusSquare size={14} />
                Add Paragraph
              </button>
            </div>

            <div className="space-y-3">
              {form.content.map((para, idx) => (
                <div key={idx} className="flex gap-2 items-start group">
                  {/* Index badge */}
                  <span className="mt-2.5 flex-shrink-0 w-6 h-6 rounded-full bg-sand border border-line text-xs text-charcoal/50 font-medium flex items-center justify-center select-none">
                    {idx + 1}
                  </span>

                  <textarea
                    rows={4}
                    value={para}
                    onChange={(e) => setParagraph(idx, e.target.value)}
                    placeholder={`Paragraph ${idx + 1}...`}
                    className="w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand resize-y"
                  />

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeParagraph(idx)}
                    disabled={form.content.length === 1}
                    title="Remove paragraph"
                    className="mt-2.5 flex-shrink-0 text-charcoal/30 hover:text-terracotta transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addParagraph}
              className="w-full border border-dashed border-line py-2 rounded text-sm text-charcoal/50 hover:border-brand hover:text-brand transition-colors flex items-center justify-center gap-1.5"
            >
              <PlusSquare size={14} />
              Add Paragraph
            </button>
          </section>

          {/* SEO Card */}
          <section className="bg-white border border-line rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-charcoal">SEO Metadata</h3>
            <div>
              <FieldLabel>Meta Title</FieldLabel>
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => setField('seoTitle', e.target.value)}
                placeholder="Defaults to post title if left empty"
                className="w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand"
              />
              <p className="text-xs text-charcoal/40 mt-1">
                {(form.seoTitle ?? '').length}/60 characters recommended
              </p>
            </div>
            <div>
              <FieldLabel>Meta Description</FieldLabel>
              <textarea
                rows={3}
                value={form.seoDescription}
                onChange={(e) => setField('seoDescription', e.target.value)}
                placeholder="Defaults to excerpt if left empty"
                className="w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand resize-none"
              />
              <p className="text-xs text-charcoal/40 mt-1">
                {(form.seoDescription ?? '').length}/160 characters recommended
              </p>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">

          {/* Publish actions */}
          <section className="bg-white border border-line rounded-xl p-6 space-y-3">
            <h3 className="text-sm font-semibold text-charcoal">Publish</h3>
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-brand text-white px-4 py-2.5 rounded font-medium hover:bg-forest transition-colors text-sm disabled:opacity-60"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              {saving ? 'Saving...' : editingPost ? 'Update Post' : 'Publish Post'}
            </button>
            <button
              onClick={backToList}
              disabled={saving}
              className="w-full border border-line px-4 py-2.5 rounded font-medium hover:bg-mist transition-colors text-sm"
            >
              Cancel
            </button>
          </section>

          {/* Featured image card */}
          <section className="bg-white border border-line rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-charcoal flex items-center gap-2">
              <ImageIcon size={14} className="text-brand" />
              Featured Image
            </h3>
            <div>
              <FieldLabel>Image URL</FieldLabel>
              <input
                type="text"
                value={form.image}
                onChange={(e) => setField('image', e.target.value)}
                placeholder="https://..."
                className="w-full border border-line p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>

            {/* Live preview */}
            <div className="rounded-lg border border-line overflow-hidden bg-sand aspect-video flex items-center justify-center">
              {form.image ? (
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-charcoal/30">
                  <ImageIcon size={28} />
                  <span className="text-xs">Image preview</span>
                </div>
              )}
            </div>
          </section>

          {/* Quick summary card */}
          <section className="bg-mist border border-line rounded-xl p-5 space-y-2 text-xs text-charcoal/60">
            <p className="font-semibold text-charcoal/70 text-xs uppercase tracking-wide">Summary</p>
            <div className="flex justify-between">
              <span>Paragraphs</span>
              <span className="font-medium text-charcoal">{form.content.filter(Boolean).length}</span>
            </div>
            <div className="flex justify-between">
              <span>Word count (est.)</span>
              <span className="font-medium text-charcoal">
                {form.content.join(' ').trim().split(/\s+/).filter(Boolean).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Read time</span>
              <span className="font-medium text-charcoal">{form.readTime} min</span>
            </div>
            <div className="flex justify-between">
              <span>SEO title</span>
              <span className={`font-medium ${(form.seoTitle ?? '').length > 60 ? 'text-terracotta' : 'text-charcoal'}`}>
                {(form.seoTitle ?? '').length}/60
              </span>
            </div>
            <div className="flex justify-between">
              <span>SEO description</span>
              <span className={`font-medium ${(form.seoDescription ?? '').length > 160 ? 'text-terracotta' : 'text-charcoal'}`}>
                {(form.seoDescription ?? '').length}/160
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
