/* eslint-env mocha */
import * as ReactDOMServer from 'react-dom/server';

export default function createServerRender() {
  return function render(node) {
    const markup = ReactDOMServer.renderToStaticMarkup(node);
    const container = document.createElement('div');
    container.innerHTML = markup;

    return container;
  };
}
