// @flow weak

import { PropTypes } from 'react';
import { mount as enzymeMount } from 'enzyme';
import { createDefaultContext } from 'src/styles/MuiThemeProvider';

export default function createMountWithContext(mount = enzymeMount, props = {}) {
  cleanStyles();

  const attachTo = window.document.createElement('div');
  attachTo.className = 'app';
  attachTo.setAttribute('id', 'app');
  window.document.body.insertBefore(attachTo, window.document.body.firstChild);

  const { theme, styleManager } = createDefaultContext(props);
  const context = { theme, styleManager };
  const childContextTypes = {
    theme: PropTypes.object,
    styleManager: PropTypes.object,
  };

  const mountWithContext = function mountWithContext(node) {
    return mount(node, { context, attachTo, childContextTypes });
  };

  mountWithContext.context = context;
  mountWithContext.attachTo = attachTo;

  mountWithContext.cleanUp = () => {
    cleanStyles();
    attachTo.parentNode.removeChild(attachTo);
  };

  mountWithContext.reset = () => {
    attachTo.innerHTML = '';
  };

  return mountWithContext;
}

function cleanStyles() {
  const head = window.document.head;
  const length = head.children.length;
  for (let i = length - 1; i >= 0; i--) {
    if (head.children[i].tagName.toLowerCase() === 'style') {
      head.removeChild(head.children[i]);
    }
  }
}
