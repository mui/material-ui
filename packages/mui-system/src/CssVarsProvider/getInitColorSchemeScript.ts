import { STORAGE_KEY } from './CssVarsProvider';

export default function getInitColorSchemeScript() {
  return `(function() { try {
    var mode = localStorage.getItem('${STORAGE_KEY}');
    if (mode) {
      document.body.dataset.theme = mode;
    }
  } catch (e) {} })();`;
}
