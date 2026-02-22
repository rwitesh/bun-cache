import { List, type Node } from "../list";

export class LFU<K> {
  private nodes = new Map<K, { node: Node<K>; freq: number }>();
  private freqLists = new Map<number, List<K>>();
  private minFreq = 0;

  private getOrCreateList(freq: number): List<K> {
    if (!this.freqLists.has(freq)) {
      this.freqLists.set(freq, new List<K>());
    }
    return this.freqLists.get(freq)!;
  }

  private promote(key: K): void {
    const entry = this.nodes.get(key);
    if (!entry) return;

    const { node, freq } = entry;
    const oldList = this.freqLists.get(freq)!;
    oldList.remove(node);

    // if the old list is now empty and it was the minimum frequency list,
    // min freq must go up by 1 since we're the only key that was there
    if (oldList.isEmpty() && freq === this.minFreq) {
      this.minFreq = freq + 1;
    }

    const newFreq = freq + 1;
    entry.freq = newFreq;
    this.getOrCreateList(newFreq).addToHead(node);
  }

  recordAccess(key: K): void {
    this.promote(key);
  }

  onInsert(key: K): void {
    const node: Node<K> = { key, prev: null, next: null };
    this.nodes.set(key, { node, freq: 1 });
    this.getOrCreateList(1).addToHead(node);
    this.minFreq = 1; // new items always start at freq 1, so min is always 1 on insert
  }

  onDelete(key: K): void {
    const entry = this.nodes.get(key);
    if (!entry) return;

    const { node, freq } = entry;
    this.freqLists.get(freq)?.remove(node);
    this.nodes.delete(key);
  }

  evict(): K | null {
    const list = this.freqLists.get(this.minFreq);
    if (!list) return null;

    const node = list.removeTail(); 
    if (!node) return null;

    this.nodes.delete(node.key);
    return node.key;
  }
}