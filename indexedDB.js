import { openDB } from 'idb';

const DB_NAME = 'API_CACHE';
const STORE_NAME = 'responses';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME);
  },
});

export const cacheSet = async (key, data) => {
  const db = await dbPromise;
  await db.put(STORE_NAME, { data, timestamp: Date.now() }, key);
};

export const cacheGet = async (key) => {
  const db = await dbPromise;
  return await db.get(STORE_NAME, key);
};

export const cacheDelete = async (key) => {
  const db = await dbPromise;
  await db.delete(STORE_NAME, key);
};
