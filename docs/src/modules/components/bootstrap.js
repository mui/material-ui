// Disable auto highlighting
// https://github.com/PrismJS/prism/issues/765
if (process.browser) {
  window.Prism = window.Prism || {};
  window.Prism.manual = true;
}
