// @flow

import prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';

/* eslint-disable import/no-webpack-loader-syntax */
import lightTheme from '!raw-loader!prismjs/themes/prism.css';
import darkTheme from '!raw-loader!prismjs/themes/prism-okaidia.css';
/* eslint-enable import/no-webpack-loader-syntax */

export { lightTheme, darkTheme };

const styleNode = window.document.createElement('style');
styleNode.setAttribute('data-prism', true);
window.document.head.appendChild(styleNode);

export function setPrismTheme(theme: Object = lightTheme) {
  styleNode.textContent = theme;
}

export default prism;
