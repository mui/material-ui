/* eslint-disable import/no-mutable-exports, global-require */
import prism from 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-tsx';

let styleNode;
let darkTheme;

if (process.browser) {
  darkTheme = require('./prism-okaidia.css');
  styleNode = document.querySelector('#prismjs');
}

export { darkTheme };

export function setPrismTheme(theme) {
  styleNode.textContent = theme;
}

export default prism;
