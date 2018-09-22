// Waiting
// - https://github.com/sinonjs/lolex/issues/136
// - https://github.com/sinonjs/lolex/issues/170
// to be fixed.
window.performance = {
  now: () => new Date().getTime(),
};
