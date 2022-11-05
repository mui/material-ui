export const requestAnimationFrameMUI =
  (typeof self !== "undefined" &&
    self.requestAnimationFrame &&
    self.requestAnimationFrame.bind(window)) ||
  function (cb) {
    let start = Date.now();
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 166);
  };

export const cancelAnimationFrameMUI =
  (typeof self !== "undefined" &&
    self.cancelAnimationFrame &&
    self.cancelAnimationFrame.bind(window)) ||
  function (id) {
    return clearTimeout(id);
  };

// Corresponds to 10 frames at 60 Hz.
// A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
export default function debounce(func) {
  let timeout;
  function debounced(...args) {
    const later = () => {
      func.apply(this, args);
    };
    cancelAnimationFrameMUI(timeout);
    timeout = requestAnimationFrameMUI(later);
  }

  debounced.clear = () => {
    cancelAnimationFrameMUI(timeout);
  };

  return debounced;
}
