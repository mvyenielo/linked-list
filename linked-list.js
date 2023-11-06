/** Node: node for a singly linked list. */

class Node {
  val = null;
  next = null;

  constructor(val) {
    this.val = val;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  head = null;
  tail = null;
  length = 0;

  constructor(vals = []) {
    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
    }

    if (this.tail !== null) {
      this.tail.next = newNode;
    }

    this.tail = newNode;

    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.head !== null) {
      newNode.next = this.head;
    }

    if (this.tail === null) {
      this.tail = newNode;
    }

    this.head = newNode;

    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (!this.length) {
      throw new Error("list is empty");
    }

    if (this.length === 1) {
      let onlyNode = this.head;
      this.head = null;
      this.tail = null;

      this.length--;
      return onlyNode.val;
    }

    let current = this.head;
    while (current !== null) {
      if (current.next === this.tail) {
        current.next = null;
        let tail = this.tail;
        this.tail = current;

        this.length--;
        return tail.val;
      }
      current = current.next;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (!this.length) {
      throw new Error("list is empty");
    }

    if (this.length === 1) {
      let onlyNode = this.head;
      this.head = null;
      this.tail = null;
      this.length--;

      return onlyNode.val;
    }

    let poppedNode = this.head;
    this.head = this.head.next;

    this.length--;

    return poppedNode.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx > this.length - 1 || idx < 0) throw new Error("Invalid index");

    let index = 0;
    let current = this.head;

    while (current !== null) {
      if (index === idx) return current.val;

      current = current.next;
      index++;
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx > this.length - 1 || idx < 0) throw new Error("Invalid index");

    let index = 0;
    let current = this.head;

    while (current !== null) {
      if (index === idx) {
        current.val = val;
        return;
      }

      current = current.next;
      index++;
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) throw new Error("Invalid index");

    let index = 0;
    let current = this.head;
    let newNode = new Node(val);

    if (idx === 0) {
      this.unshift(val);
      return;
    }

    if (idx === this.length) {
      this.push(val);
      return;
    }

    while (current !== null) {
      if (index === idx - 1) {
        let newNext = current.next;
        current.next = newNode;
        newNode.next = newNext;
        this.length++;
        return;
      }
      current = current.next;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx > this.length - 1 || idx < 0) throw new Error("Invalid index");

    if (this.length === 1) {
      let onlyNode = this.head;
      this.head = null;
      this.tail = null;
      this.length--;

      return onlyNode.val;
    }

    if (idx === 0) {
      let removedNode = this.shift();
      return removedNode;
    }

    let index = 0;
    let current = this.head;

    while (current !== null) {
      if (index === idx - 1) {
        console.log("if ran");
        let removedNode = current.next;
        current.next = current.next.next;
        this.length--;
        return removedNode.val;
      }
      index++;
      current = current.next;
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if (!this.length) return 0;

    let sum = 0;

    let current = this.head;

    while (current !== null) {
      sum += current.val;
      current = current.next;
    }

    return sum / this.length;
  }
}

module.exports = LinkedList;
