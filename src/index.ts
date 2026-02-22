export class Cache<K, V> {
  private store = new Map<K, V>();

  constructor(
    private maxSize: number,
    private policy: {
      recordAccess(key: K): void;
      onInsert(key: K): void;
      onDelete?(key: K): void;
      evict(): K | null;
    },
  ) {}

  get(key: K): V | undefined {
    const value = this.store.get(key);
    if (value) {
      this.policy.recordAccess(key);
    }
    return value;
  }

  set(key: K, value: V): void {
    if (this.store.has(key)) {
      this.store.set(key, value);
      this.policy.recordAccess(key);
      return;
    }

    if (this.store.size >= this.maxSize) {
      const victim = this.policy.evict();
      if (victim) {
        this.store.delete(victim);
      }
    }

    this.store.set(key, value);
    this.policy.onInsert(key);
  }

  delete(key: K) {
    this.store.delete(key);
    this.policy.onDelete?.(key);
  }
}
