// @flow weak

import prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';

import lightTheme from '!raw!prismjs/themes/prism.css';
import darkTheme from '!raw!prismjs/themes/prism-okaidia.css';

export { lightTheme, darkTheme };

const styleNode = window.document.createElement('style');
styleNode.setAttribute('data-prism', true);
window.document.head.appendChild(styleNode);

export function setPrismTheme(theme = lightTheme) {
  styleNode.textContent = theme;
}

export default prism;
