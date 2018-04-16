// @flow weak

import { unmountComponentAtNode } from 'react-dom';
import type { Element } from 'react';
import { mount as enzymeMount } from 'enzyme';

// Generate an enhanced mount function.
export default function createMount(options1: Object = {}) {
  const { mount = enzymeMount, ...other1 } = options1;

  const attachTo = window.document.createElement('div');
  attachTo.className = 'app';
  attachTo.setAttribute('id', 'app');
  window.document.body.insertBefore(attachTo, window.document.body.firstChild);

  const mountWithContext = function mountWithContext(node: Element<any>, options2: Object = {}) {
    return mount(node, {
      attachTo,
      ...other1,
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
