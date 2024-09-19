export default class KV {
  constructor() {
    this.store = {};
  }

  set(key, value, ttl) {
    const expiration = ttl ? Date.now() + ttl * 1000 : null;
    this.store[key] = { value, expiration };
  }

  get(key) {
    const entry = this.store[key];

    if (!entry) {
      throw new Error(`Key "${key}" does not exist.`);
    }

    if (entry.expiration && Date.now() > entry.expiration) {
      delete this.store[key];
      throw new Error(`Key "${key}" has expired.`);
    }

    return this.store[key];
  }

  delete(key) {
    if (!this.has(key)) {
      throw new Error(`Key "${key}" does not exist.`);
    }
    delete this.store[key];
  }

  has(key) {
    return key in this.store;
  }
}
