export class Random<K> {
  private keys: K[] = [];
  private indexOfKey = new Map<K, number>();

  recordAccess(_key: K): void {}

  onInsert(key: K): void {
    this.indexOfKey.set(key, this.keys.length);
    this.keys.push(key);
  }

  onDelete(key: K): void {
    const i = this.indexOfKey.get(key);
    if (i === undefined) return;
    this.removeAt(i);
  }

  evict(): K | null {
    if (this.keys.length === 0) return null;
    const i = Math.floor(Math.random() * this.keys.length);
    return this.removeAt(i);
  }

  private removeAt(i: number): K {
    const key = this.keys[i] as K;
    this.indexOfKey.delete(key);

    const last = this.keys.length - 1;
    if (i !== last) {
      const lastKey = this.keys[last] as K;
      this.keys[i] = lastKey;
      this.indexOfKey.set(lastKey, i);
    }

    this.keys.pop();
    return key;
  }
}