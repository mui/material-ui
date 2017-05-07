// @flow weak

import { create } from 'jss';
import jssPreset from 'jss-preset-default';
import { createStyleManager } from 'jss-theme-reactor';
import { shallow as enzymeShallow } from 'enzyme';
import createMuiTheme from '../styles/theme';

export default function createShallow(
  shallow = enzymeShallow,
  otherContext = {},
) {
  const theme = createMuiTheme();
  const jss = create(jssPreset());
  const styleManager = createStyleManager({ jss, theme });
  const context = { theme, styleManager, ...otherContext };
  const shallowWithContext = function shallowWithContext(node, options = {}) {
    return shallow(node, {
      context: {
        ...context,
        ...options.context,
      },
    });
  };

  shallowWithContext.context = context;

  return shallowWithContext;
}
