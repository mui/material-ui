import prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';

/* eslint-disable import/no-webpack-loader-syntax  */
import lightTheme from '!raw-loader!prismjs/themes/prism.css';
import darkTheme from '!raw-loader!prismjs/themes/prism-okaidia.css';
/* eslint-enable import/no-webpack-loader-syntax  */

export { lightTheme, darkTheme };

const styleNode = document.createElement('style');
styleNode.setAttribute('data-prism', 'true');
if (document.head) {
  document.head.appendChild(styleNode);
}

export function setPrismTheme(theme) {
  styleNode.textContent = theme === 'light' ? lightTheme : darkTheme;
}

setPrismTheme('light'); // by default

export default prism;
