import waitUntil from './waitUntil.mjs';

class Queue {
  pendingEntries = [];

  inFlight = 0;

  err = null;

  constructor(worker, options = {}) {
    this.worker = worker;
    this.concurrency = options.concurrency || 1;
  }

  push = (entries) => {
    this.pendingEntries = this.pendingEntries.concat(entries);
    this.process();
  };

  process = () => {
    const scheduled = this.pendingEntries.splice(0, this.concurrency - this.inFlight);
    this.inFlight += scheduled.length;
    scheduled.forEach(async (task) => {
      try {
        await this.worker(task);
      } catch (err) {
        this.err = err;
      } finally {
        this.inFlight -= 1;
      }

      if (this.pendingEntries.length > 0) {
        this.process();
      }
    });
  };

  wait = (options = {}) =>
    waitUntil(
      () => {
        if (this.err) {
          this.pendingEntries = [];
          throw this.err;
        }

        return {
          predicate: options.empty
            ? this.inFlight === 0 && this.pendingEntries.length === 0
            : this.concurrency > this.pendingEntries.length,
        };
      },
      {
        delay: 50,
      },
    );
}

export default Queue;
