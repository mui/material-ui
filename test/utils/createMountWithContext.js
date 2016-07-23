// @flow weak

import { PropTypes } from 'react';
import { mount as enzymeMount } from 'enzyme';
import { createDefaultContext } from 'src/styles/MuiThemeProvider';

export default function createMountWithContext(mount = enzymeMount, props = {}) {
  cleanStyles();

  const attachTo = window.document.createElement('div');
  attachTo.className = 'app';
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
  for (let i = 0; i < head.children.length; i++) {
    if (head.children[i].tagName.toLowerCase() === 'style') {
      head.removeChild(head.children[i]);
    }
  }
}
