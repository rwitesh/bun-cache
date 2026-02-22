export type Node<K> = {
  key: K;
  prev: Node<K> | null;
  next: Node<K> | null;
};

export class List<K> {
  head: Node<K> | null = null;
  tail: Node<K> | null = null;
  size = 0;

  addToHead(node: Node<K>) {
    node.prev = this.head;
    node.next = null;

    if (this.head) {
      this.head.next = node;
    }

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    this.size++;
  }

  remove(node: Node<K>) {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.tail = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.head = node.prev;
    }

    node.prev = null;
    node.next = null;
    this.size--;
  }

  removeTail(): Node<K> | null {
    if (!this.tail) return null;
    const node = this.tail;
    this.remove(node);
    return node;
  }

  isEmpty() {
    return this.size === 0;
  }
}
