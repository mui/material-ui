module.exports = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
