// Inspired by https://caolan.github.io/async/v3/docs.html#cargo
// The main difference is that we have a timeout.
class Batcher {
  pendingEntries = [];

  timeout = null;

  context = {};

  constructor(worker, options = {}) {
    // max waiting time before flushing the pending entries (process them)
    this.maxWait = options.maxWait || 1000;
    // max number of entries in the queue before flushing them (process them)
    this.maxItems = options.maxItems || 100;
    this.worker = worker;
  }

  // public method
  push(entries, contextItem) {
    this.context = contextItem;
    this.pendingEntries = this.pendingEntries.concat(entries);

    if (this.pendingEntries.length >= this.maxItems) {
      return this.sendItems();
    }

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.sendItems();
    }, this.maxWait);

    return null;
  }

  sendItems() {
    const pendingEntries = this.pendingEntries.splice(0); // Transfer the item to the job.
    clearTimeout(this.timeout);
    return this.worker(pendingEntries, this.context);
  }

  clear() {
    clearTimeout(this.timeout);
    this.pendingEntries = [];
  }
}

export default Batcher;
