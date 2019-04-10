import {
  unstable_cancelCallback as cancelCallback,
  unstable_scheduleCallback as scheduleCallback,
  unstable_LowPriority as LowPriority,
} from 'scheduler';

/**
 * implementing lodash/throttle and debounce via scheduler
 * @param {Function} callback
 */
export default function scheduledCallback(callback) {
  let callbackNode;

  function run() {
    callbackNode = scheduleCallback(callback, LowPriority);
  }

  function cancel() {
    if (callbackNode) {
      cancelCallback(callbackNode);
    }
  }

  run.cancel = cancel; // throttle
  run.clear = cancel; // debounce
  run.flush = cancel; // debounce

  return run;
}
