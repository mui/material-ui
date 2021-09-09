export default function getInitColorModeScript() {
  // TODO optimize variables to letters
  // https://github.com/pacocoursey/next-themes/blob/52e76f4ed5aec50015e6c1ce2fb48eb500303ea8/index.tsx#L237
  return `(function() { try {
    var mode = localStorage.getItem('mui-mode');
    if (mode) {
      document.body.classList.add('mui-' + mode);
    }
  } catch (e) {} })();`;
}
