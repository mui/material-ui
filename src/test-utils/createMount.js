// @flow weak

import { unmountComponentAtNode } from 'react-dom';
import { mount as enzymeMount } from 'enzyme';

// Generate an enhanced mount function.
export default function createMount(options: Object = {}) {
  const { mount = enzymeMount } = options;

  const attachTo = window.document.createElement('div');
  attachTo.className = 'app';
  attachTo.setAttribute('id', 'app');
  window.document.body.insertBefore(attachTo, window.document.body.firstChild);

  const mountWithContext = function mountWithContext(
    node: React$Element<any>,
    options2: Object = {},
  ) {
    return mount(node, {
      attachTo,
      ...options2,
    });
  };

  mountWithContext.attachTo = attachTo;
  mountWithContext.cleanUp = () => {
    unmountComponentAtNode(attachTo);
    attachTo.parentNode.removeChild(attachTo);
  };

  return mountWithContext;
}
