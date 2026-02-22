import { List, type Node } from "../list";

export class LRU<K> {
  private nodes = new Map<K, Node<K>>();
  private list = new List<K>();

  recordAccess(key: K): void {
    const node = this.nodes.get(key);
    if (!node) return;

    this.list.remove(node);
    this.list.addToHead(node);
  }

  onInsert(key: K): void {
    const node: Node<K> = { key, prev: null, next: null };
    this.nodes.set(key, node);
    this.list.addToHead(node);
  }

  onDelete(key: K): void {
    const node = this.nodes.get(key);
    if (!node) return;

    this.list.remove(node);
    this.nodes.delete(key);
  }

  evict(): K | null {
    const node = this.list.removeTail();
    if (!node) return null;

    this.nodes.delete(node.key);
    return node.key;
  }
}