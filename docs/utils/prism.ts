import prism from 'prismjs';
import { ThemeType } from '../layout/PageWithContext';

import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-typescript';

export type AvailableLanguages = 'jsx' | 'typescript' | 'markup' | 'json' | 'diff';
export const prismThemes = {
  light: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/themes/prism.min.css',
  dark: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/themes/prism-okaidia.min.css',
};

export function setPrismTheme(type: ThemeType) {
  const newThemeCss = prismThemes[type];
  const currentLinkElement = document.querySelector<HTMLLinkElement>('link[data-prism="true"]');

  if (!currentLinkElement) {
    throw new Error('Cannot find prism link');
  }

  const newLinkElement = document.createElement('link');
  newLinkElement.rel = 'stylesheet';
  newLinkElement.dataset.prism = 'true';
  newLinkElement.href = newThemeCss;

  document.head.appendChild(newLinkElement);
  currentLinkElement.remove();
}

export function highlight(code: string, language: AvailableLanguages) {
  return prism.highlight(code, prism.languages[language], language);
}
