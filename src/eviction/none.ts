export class NoEviction<K> {
    recordAccess(_key: K): void {}
    onInsert(_key: K): void {}
    onDelete(_key: K): void {}
    evict(): K | null {
      return null;
    }
  }