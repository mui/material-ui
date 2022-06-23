// This file should be testable.
/* eslint-disable prefer-template */
export default function getInitColorSchemeScript(options) {
  // remove-start: this part is not needed in the minification
  const {
    enableColorScheme = true,
    enableSystem = false,
    defaultLightColorScheme = 'light',
    defaultDarkColorScheme = 'dark',
    modeStorageKey,
    colorSchemeStorageKey,
    attribute,
  } = options || {};
  // remove-end

  const getStorageItem = localStorage.getItem;
  // Code-golfing the amount of characters in the script
  const mode = getStorageItem(modeStorageKey);
  const c = colorSchemeStorageKey;
  const lightColorScheme = getStorageItem(c + 'light') || defaultLightColorScheme;
  const darkColorScheme = getStorageItem(c + 'dark') || defaultDarkColorScheme;
  let cssColorScheme = mode;
  let colorScheme = '';
  if (mode === 'system' || (!mode && enableSystem)) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      cssColorScheme = 'dark';
      colorScheme = darkColorScheme;
    } else {
      cssColorScheme = 'light';
      colorScheme = lightColorScheme;
    }
  }
  if (mode === 'light') {
    colorScheme = lightColorScheme;
  }
  if (mode === 'dark') {
    colorScheme = darkColorScheme;
  }
  if (colorScheme) {
    document.documentElement.setAttribute(attribute, colorScheme);
  }
  if (enableColorScheme && !!cssColorScheme) {
    document.documentElement.style.setProperty('color-scheme', cssColorScheme);
  }
}
