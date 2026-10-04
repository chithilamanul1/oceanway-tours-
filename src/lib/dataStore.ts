import fs from 'fs';
import path from 'path';

interface StoreData {
  itineraries: Record<string, any>;
  destinations: Record<string, any>;
  blogs: Record<string, any>;
  enquiries: Record<string, any>;
  media: Record<string, any>;
  deletedItineraries: string[];
  deletedDestinations: string[];
  deletedBlogs: string[];
  deletedEnquiries: string[];
  deletedMedia: string[];
}

declare global {
  // eslint-disable-next-line no-var
  var __globalStoreData: StoreData | undefined;
}

const PRIMARY_FILE = path.join(process.cwd(), 'src', 'data', 'store_overrides.json');
const FALLBACK_FILE = path.join('/tmp', 'store_overrides.json');

const SEED_ENQUIRIES: any[] = [
  {
    _id: 'enq-sample-1',
    id: 'enq-sample-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@gmail.com',
    phone: '+44 7700 900077',
    travelDates: 'November 2026',
    travellers: '2 Adults',
    interest: 'Sri Lanka Highlights',
    message: 'Looking for a private tailor-made 8-day tour covering Sigiriya, Kandy, and a beach stay in Bentota.',
    budget: '$2,500 – $3,500',
    read: false,
    funnelStep: 1, // New Leads
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    _id: 'enq-sample-2',
    id: 'enq-sample-2',
    name: 'Mohammed Al-Otaibi',
    email: 'm.otaibi@outlook.com',
    phone: '+966 50 123 4567',
    travelDates: 'December 2026',
    travellers: 'Family (4 Pax)',
    interest: 'Sri Lanka & Maldives',
    message: 'Interested in a luxury 10-day combined holiday with private chauffeur and 5-star ocean villas.',
    budget: '$5,000+',
    read: true,
    funnelStep: 2, // Contacted
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    _id: 'enq-sample-3',
    id: 'enq-sample-3',
    name: 'David & Emma Clark',
    email: 'clark.travels@yahoo.co.uk',
    phone: '+44 7800 123456',
    travelDates: 'January 2027',
    travellers: '2 Adults (Honeymoon)',
    interest: 'Ella & Wildlife Safari',
    message: 'Planning our honeymoon trip with safari in Yala and tea plantation bungalow in Nuwara Eliya.',
    budget: '$3,000 – $4,500',
    read: true,
    funnelStep: 3, // Quoted
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

function getInitialData(): StoreData {
  if (global.__globalStoreData) {
    return global.__globalStoreData;
  }

  const defaultData: StoreData = {
    itineraries: {},
    destinations: {},
    blogs: {},
    enquiries: {},
    media: {},
    deletedItineraries: [],
    deletedDestinations: [],
    deletedBlogs: [],
    deletedEnquiries: [],
    deletedMedia: [],
  };

  for (const item of SEED_ENQUIRIES) {
    defaultData.enquiries[item._id] = item;
  }

  for (const filePath of [PRIMARY_FILE, FALLBACK_FILE]) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        global.__globalStoreData = {
          itineraries: parsed.itineraries || {},
          destinations: parsed.destinations || {},
          blogs: parsed.blogs || {},
          enquiries: { ...defaultData.enquiries, ...(parsed.enquiries || {}) },
          media: parsed.media || {},
          deletedItineraries: parsed.deletedItineraries || [],
          deletedDestinations: parsed.deletedDestinations || [],
          deletedBlogs: parsed.deletedBlogs || [],
          deletedEnquiries: parsed.deletedEnquiries || [],
          deletedMedia: parsed.deletedMedia || [],
        };
        return global.__globalStoreData;
      }
    } catch {
      // Continue to next fallback
    }
  }

  global.__globalStoreData = defaultData;
  return defaultData;
}

function persistData(data: StoreData) {
  global.__globalStoreData = data;
  const jsonStr = JSON.stringify(data, null, 2);

  let saved = false;
  try {
    const dir = path.dirname(PRIMARY_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(PRIMARY_FILE, jsonStr, 'utf-8');
    saved = true;
  } catch {
    // EROFS or similar
  }

  if (!saved) {
    try {
      fs.writeFileSync(FALLBACK_FILE, jsonStr, 'utf-8');
    } catch {
      // Memory cache is still preserved in global.__globalStoreData
    }
  }
}

// ─── ITINERARIES ─────────────────────────────────────────────────────────────

export function getStoreItinerary(id: string) {
  const store = getInitialData();
  if (store.deletedItineraries.includes(id)) return null;
  return store.itineraries[id] || null;
}

export function saveStoreItinerary(id: string, data: any) {
  const store = getInitialData();
  const cleanId = id || data.id || ('itin-' + Date.now());
  const item = { ...data, id: cleanId };
  if (!item._id) item._id = cleanId;

  store.itineraries[cleanId] = item;
  store.deletedItineraries = store.deletedItineraries.filter(dId => dId !== cleanId);
  persistData(store);
  return item;
}

export function deleteStoreItinerary(id: string) {
  const store = getInitialData();
  delete store.itineraries[id];
  if (!store.deletedItineraries.includes(id)) {
    store.deletedItineraries.push(id);
  }
  persistData(store);
}

export function mergeItinerariesWithStore(baseList: any[] = []): any[] {
  const store = getInitialData();
  const deletedSet = new Set(store.deletedItineraries);
  const overrides = store.itineraries;

  const map = new Map<string, any>();

  for (const item of baseList) {
    const itemId = item.id || item._id;
    if (itemId && !deletedSet.has(itemId)) {
      map.set(itemId, item);
    }
  }

  for (const [id, item] of Object.entries(overrides)) {
    if (!deletedSet.has(id)) {
      map.set(id, { ...(map.get(id) || {}), ...item });
    }
  }

  return Array.from(map.values());
}

// ─── DESTINATIONS ────────────────────────────────────────────────────────────

export function getStoreDestination(id: string) {
  const store = getInitialData();
  if (store.deletedDestinations.includes(id)) return null;
  return store.destinations[id] || null;
}

export function saveStoreDestination(id: string, data: any) {
  const store = getInitialData();
  const cleanId = id || data.id || ('dest-' + Date.now());
  const item = { ...data, id: cleanId };
  if (!item._id) item._id = cleanId;

  store.destinations[cleanId] = item;
  store.deletedDestinations = store.deletedDestinations.filter(dId => dId !== cleanId);
  persistData(store);
  return item;
}

export function deleteStoreDestination(id: string) {
  const store = getInitialData();
  delete store.destinations[id];
  if (!store.deletedDestinations.includes(id)) {
    store.deletedDestinations.push(id);
  }
  persistData(store);
}

export function mergeDestinationsWithStore(baseList: any[] = []): any[] {
  const store = getInitialData();
  const deletedSet = new Set(store.deletedDestinations);
  const overrides = store.destinations;

  const map = new Map<string, any>();

  for (const item of baseList) {
    const itemId = item.id || item._id;
    if (itemId && !deletedSet.has(itemId)) {
      map.set(itemId, item);
    }
  }

  for (const [id, item] of Object.entries(overrides)) {
    if (!deletedSet.has(id)) {
      map.set(id, { ...(map.get(id) || {}), ...item });
    }
  }

  return Array.from(map.values());
}

// ─── BLOG POSTS ──────────────────────────────────────────────────────────────

export function getStoreBlogPost(id: string) {
  const store = getInitialData();
  if (store.deletedBlogs.includes(id)) return null;
  return store.blogs[id] || null;
}

export function saveStoreBlogPost(id: string, data: any) {
  const store = getInitialData();
  const cleanId = id || data.id || ('post-' + Date.now());
  const item = { ...data, id: cleanId };
  if (!item._id) item._id = cleanId;

  store.blogs[cleanId] = item;
  store.deletedBlogs = store.deletedBlogs.filter(dId => dId !== cleanId);
  persistData(store);
  return item;
}

export function deleteStoreBlogPost(id: string) {
  const store = getInitialData();
  delete store.blogs[id];
  if (!store.deletedBlogs.includes(id)) {
    store.deletedBlogs.push(id);
  }
  persistData(store);
}

export function mergeBlogPostsWithStore(baseList: any[] = []): any[] {
  const store = getInitialData();
  const deletedSet = new Set(store.deletedBlogs);
  const overrides = store.blogs;

  const map = new Map<string, any>();

  for (const item of baseList) {
    const itemId = item.id || item._id;
    if (itemId && !deletedSet.has(itemId)) {
      map.set(itemId, item);
    }
  }

  for (const [id, item] of Object.entries(overrides)) {
    if (!deletedSet.has(id)) {
      map.set(id, { ...(map.get(id) || {}), ...item });
    }
  }

  return Array.from(map.values());
}

// ─── ENQUIRIES ───────────────────────────────────────────────────────────────

export function getStoreEnquiries(): any[] {
  const store = getInitialData();
  const deletedSet = new Set(store.deletedEnquiries);
  const list = Object.values(store.enquiries).filter(e => !deletedSet.has(e._id));
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function saveStoreEnquiry(data: any): any {
  const store = getInitialData();
  const cleanId = data._id || data.id || ('enq-' + Date.now());
  const item = {
    _id: cleanId,
    id: cleanId,
    createdAt: data.createdAt || new Date().toISOString(),
    funnelStep: data.funnelStep || 1,
    read: data.read || false,
    ...data,
  };
  store.enquiries[cleanId] = item;
  store.deletedEnquiries = store.deletedEnquiries.filter(id => id !== cleanId);
  persistData(store);
  return item;
}

export function updateStoreEnquiry(id: string, patch: any): any {
  const store = getInitialData();
  const existing = store.enquiries[id] || { _id: id, id };
  const updated = { ...existing, ...patch };
  store.enquiries[id] = updated;
  persistData(store);
  return updated;
}

export function deleteStoreEnquiry(id: string) {
  const store = getInitialData();
  delete store.enquiries[id];
  if (!store.deletedEnquiries.includes(id)) {
    store.deletedEnquiries.push(id);
  }
  persistData(store);
}

// ─── MEDIA ───────────────────────────────────────────────────────────────────

export function getStoreMedia(id: string) {
  const store = getInitialData();
  if (store.deletedMedia.includes(id)) return null;
  return store.media[id] || null;
}

export function saveStoreMedia(data: any): any {
  const store = getInitialData();
  const cleanId = data._id || data.id || ('media-' + Date.now());
  const item = {
    _id: cleanId,
    id: cleanId,
    url: data.url,
    name: data.name || 'Image',
    tags: Array.isArray(data.tags) ? data.tags : [],
    createdAt: data.createdAt || new Date().toISOString(),
    ...data,
  };
  item._id = cleanId;
  item.id = cleanId;

  store.media[cleanId] = item;
  store.deletedMedia = store.deletedMedia.filter(dId => dId !== cleanId);
  persistData(store);
  return item;
}

export function deleteStoreMedia(id: string) {
  const store = getInitialData();
  delete store.media[id];
  if (!store.deletedMedia.includes(id)) {
    store.deletedMedia.push(id);
  }
  persistData(store);
}

export function getStoreAllMedia(): any[] {
  const store = getInitialData();
  const deletedSet = new Set(store.deletedMedia);
  const list = Object.values(store.media).filter(m => !deletedSet.has(m._id) && !deletedSet.has(m.id));
  return list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export function mergeMediaWithStore(baseList: any[] = []): any[] {
  const store = getInitialData();
  const deletedSet = new Set(store.deletedMedia);
  const overrides = store.media;

  const map = new Map<string, any>();

  for (const item of baseList) {
    const itemId = item._id || item.id;
    if (itemId && !deletedSet.has(itemId)) {
      map.set(itemId, item);
    }
  }

  for (const [id, item] of Object.entries(overrides)) {
    if (!deletedSet.has(id)) {
      map.set(id, { ...(map.get(id) || {}), ...item });
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
}

