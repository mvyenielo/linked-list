/** Node: node for a doubly linked list. */

class Node {
  constructor(val, next = null, prev = null) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  head = null;
  tail = null;
  length = 0;

  constructor(vals = []) {
    for (let val of vals) this.push(val);
  }

  /** get(idx) returns a node at the given index */

  _get(idx) {
    let index = 0;
    let current = this.head;

    while (current !== null) {
      if (index === idx) {
        return current;
      }
      current = current.next;
      index += 1;
    }
  }

  /** push(val): add new value to end of list. */

  push(val) {
    this.length += 1;
    const newNode = new Node(val);

    if (!this.head) {
      this.tail = this.head = newNode;
    } else {
      const tail = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
      newNode.prev = tail;
    }

  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    this.length += 1;
    const newNode = new Node(val);

    if (this.head === null) {
      this.tail = this.head = newNode;
      return;
    }

    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  }

  /** pop(): remove last item & return its value */

  pop() {
    if (this.length === 0) throw new Error("List is empty");

    if (this.length === 1) {
      const val = this.head.val;
      this.head = this.tail = null;
      this.length -= 1;
      return val;
    }

    const tail = this.tail;
    this.tail = this.tail.prev;
    this.length -= 1;
    return tail.val;
  }

  /** shift(): remove first item & return its value */

  shift() {
    if (this.length === 0) throw new Error("List is empty");

    if (this.length === 1) {
      const val = this.head.val;
      this.head = this.tail = null;
      this.length -= 1;
      return val;
    }

    const head = this.head;
    this.head = this.head.next;
    this.head.prev = null;
    this.length -= 1;

    return head.val;
  }

  /** getAt(idx): get val at idx.*/

  getAt(idx) {
    if (idx >= this.length || idx < 0) throw new Error("Invalid index");
    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) throw new Error("Invalid index");
    const node = this._get(idx);
    node.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) throw new Error("Invalid index");

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    const newNode = new Node(val);
    const prev = this._get(idx - 1);

    newNode.prev = prev;
    newNode.next = prev.next;
    prev.next = newNode;
    newNode.next.prev = newNode;
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) throw new Error("Invalid index");

    if (idx === 0) return this.shift();
    if (idx === this.length - 1) return this.pop();

    const removedNode = this._get(idx);

    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;

    this.length -= 1;

    return removedNode.val;
  }

  /** return average (mean) of list values. */

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let current = this.head;

    while (current !== null) {
      total += current.val;
    }

    return total / this.length;
  }
}

module.exports = DoublyLinkedList;
