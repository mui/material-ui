import * as ReactDOM from 'react-dom';

export type Callback = () => void;
export type BatchCallback = (batch: Batch) => void;
export type TransitionFunction = () => void;

export interface StartTransitionFunction {
  (callback: TransitionFunction): void;
}

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
}

/**
 * Silly wrapper around `unstable_batchedUpdates` so that we don't
 * have to import ReactDOM elsewhere.
 */
export function batchReactUpdates<T>(callback: () => T): T {
  return ReactDOM.unstable_batchedUpdates(callback);
}

/**
 * A batch callback that immediately executes all of the updates
 * in every batch (the current one, and any pending).
 */
export function blockingBatchCallback(batch: Batch) {
  batchReactUpdates(() => {
    flushPendingBatches();
    batch.queue.forEach((callback) => callback());
  });
}

/**
 * A batch callback that executes every update in a future macro
 * task.
 */
export function asyncBatchCallback(batch: Batch) {
  PENDING_BATCHES.add(batch);
  window.clearTimeout(PENDING_FLUSH);
  PENDING_FLUSH = window.setTimeout(flushPendingBatches, 500);
}

/**
 * Creates a batch callback that executes every update in the given
 * `startTransition` function.
 */
export function createPassthroughBatchCallback(startTransition: StartTransitionFunction) {
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
 * run later. Otherwise, it will be run immediately.
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

function flushPendingBatches() {
  window.clearTimeout(PENDING_FLUSH);
  PENDING_FLUSH = 0;

  batchReactUpdates(() => {
    PENDING_BATCHES.forEach((batch) => {
      batch.queue.forEach((callback) => callback());
    });
    PENDING_BATCHES.clear();
  });
}
