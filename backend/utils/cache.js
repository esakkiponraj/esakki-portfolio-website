// High-performance in-memory cache with TTL and prefix/resource invalidation
const store = new Map();

function get(key) {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.data;
}

function set(key, data, ttlMs = 180000) { // Default 3 minutes TTL
  store.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
  });
}

function del(patternOrPrefix) {
  if (!patternOrPrefix) {
    store.clear();
    return;
  }
  for (const key of store.keys()) {
    if (key.startsWith(patternOrPrefix)) {
      store.delete(key);
    }
  }
}

function clear() {
  store.clear();
}

module.exports = { get, set, del, clear };
