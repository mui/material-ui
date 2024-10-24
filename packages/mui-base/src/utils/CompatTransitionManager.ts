import * as ReactDOM from 'react-dom';

export type Callback = () => void;
export type BatchCallback = (batch: Batch) => void;

interface Batch {
  queue: Set<Callback>;
}

let ACTIVE_BATCH: Batch | null = null;
let PENDING_FLUSH: number = 0;
const PENDING_BATCHES: Set<Batch> = new Set();

/**
 * Executes the given function inside of a batch.
 *
 * If a batch doesn't already exist, a new one will be created, and the given
 * callback will be executed when it ends.
 */
export function runWithBatch<T>(fn: () => T, batchCallback: BatchCallback): T {
  return ReactDOM.unstable_batchedUpdates(() => {
    const prevBatch = ACTIVE_BATCH;
    const batch = prevBatch == null ? ({ queue: new Set() } as Batch) : prevBatch;
    let result: T;

    try {
      ACTIVE_BATCH = batch;
      result = fn();
    } finally {
      ACTIVE_BATCH = prevBatch;
    }

    if (batch !== prevBatch) {
      batchCallback(batch);
    }
    return result;
  });
}

/**
 * A batch callback that immediately executes all of the updates
 * in every batch (the current one, and any pending). Assumes it's
 * called in a ReactDOM batch.
 */
export function blockingBatchCallback(batch: Batch) {
  flushPendingBatches();
  batch.queue.forEach((callback) => callback());
}

/**
 * A batch callback that executes every update in a future macro
 * task. Assumes it's called in a ReactDOM batch.
 */
export function nonBlockingBatchCallback(batch: Batch) {
  PENDING_BATCHES.add(batch);
  window.clearTimeout(PENDING_FLUSH);
  PENDING_FLUSH = window.setTimeout(() => {
    ReactDOM.unstable_batchedUpdates(flushPendingBatches);
  }, 500);
}

/**
 * Creates a batch callback that executes every update in the given
 * `startTransition` function.
 */
export function createPassthroughBatchCallback(startTransition: (callback: Callback) => void) {
  return (batch: Batch) => {
    startTransition(() => {
      batch.queue.forEach((callback) => callback());
    });
  };
}

/**
 * Attempt to enqueue the given state update.
 *
 * If there is an existing batch, the update will be added to it and
 * run later. Otherwise, it will be run immediately, without batching.
 */
export function enqueueStateUpdate<T>(fn: Callback): Callback {
  const queue = ACTIVE_BATCH?.queue;
  if (queue) {
    queue.add(fn);
    return () => {
      queue.delete(fn);
    };
  } else {
    fn();
    return () => {};
  }
}

/**
 * Flush any pending batches. Assumes it's called within a ReactDOM batch.
 */
function flushPendingBatches() {
  window.clearTimeout(PENDING_FLUSH);
  PENDING_FLUSH = 0;

  PENDING_BATCHES.forEach((batch) => {
    batch.queue.forEach((callback) => callback());
  });
  PENDING_BATCHES.clear();
}
