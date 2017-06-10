// @flow weak

import { create } from 'jss';
import jssPreset from 'jss-preset-default';
import { createStyleManager } from 'jss-theme-reactor';
import PropTypes from 'prop-types';
import { mount as enzymeMount } from 'enzyme';
import createMuiTheme from '../styles/theme';

function cleanStyles() {
  const head = window.document.head;
  const length = head.children.length;
  for (let i = length - 1; i >= 0; i -= 1) {
    if (head.children[i].tagName.toLowerCase() === 'style') {
      head.removeChild(head.children[i]);
    }
  }
}

// Generate an enhanced mount function with the needed context.
export default function createMount(options = {}) {
  const { mount = enzymeMount } = options;
  cleanStyles();

  const attachTo = window.document.createElement('div');
  attachTo.className = 'app';
  attachTo.setAttribute('id', 'app');
  window.document.body.insertBefore(attachTo, window.document.body.firstChild);
  const theme = createMuiTheme();
  const jss = create(jssPreset());
  const styleManager = createStyleManager({ jss, theme });
  const context = { styleManager };
  const childContextTypes = {
    styleManager: PropTypes.object,
  };

  const mountWithContext = function mountWithContext(node) {
    return mount(node, { context, attachTo, childContextTypes });
  };

  mountWithContext.context = context;
  mountWithContext.attachTo = attachTo;

  mountWithContext.cleanUp = () => {
    styleManager.reset();
    cleanStyles();
    attachTo.parentNode.removeChild(attachTo);
  };

  return mountWithContext;
}
