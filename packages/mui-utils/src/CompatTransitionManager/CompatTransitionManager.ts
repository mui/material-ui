import * as ReactDOM from 'react-dom';
import * as React from 'react';

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
  // Apply the pending batches with a timeout so that they
  // are executed in a future macrotask, *after* the blocking
  // changes have been painted.
  //
  // The timeout is a bit arbitrary. One of benefits of transitions are
  // that they enable a kind of debouncing. With a non-zero timeout, we can
  // get some of that benefit in React 17 by allowing non-blocking updates
  // from e.g. keystrokes to cancel our previous timeout and further delay
  // our deferred work instead of blocking the UI, with the trade-off of an
  // increased latency to when the deferred work will be shown.
  //
  // The value should be something high enough that e.g. actively typing into
  // a search box remains responsive, but not so high that the application
  // feels slow to respond when you stop typing.
  PENDING_BATCHES.add(batch);
  window.clearTimeout(PENDING_FLUSH);
  PENDING_FLUSH = window.setTimeout(() => {
    ReactDOM.unstable_batchedUpdates(flushPendingBatches);
  }, 375);
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
