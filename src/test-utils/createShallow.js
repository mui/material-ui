// @flow weak

import { create } from 'jss';
import jssPreset from 'jss-preset-default';
import { createStyleManager } from 'jss-theme-reactor';
import { shallow as enzymeShallow } from 'enzyme';
import createMuiTheme from '../styles/theme';

export default function createShallow(options = {}) {
  const {
    shallow = enzymeShallow,
    otherContext = {},
    dive = false,
  } = options;
  const theme = createMuiTheme();
  const jss = create(jssPreset());
  const styleManager = createStyleManager({ jss, theme });
  const context = {
    theme,
    styleManager,
    ...otherContext,
  };
  const shallowWithContext = function shallowWithContext(node, options2 = {}) {
    const wrapper = shallow(node, {
      context: {
        ...context,
        ...options2.context,
      },
    });

    if (dive) {
      return wrapper.dive();
    }

    return wrapper;
  };

  shallowWithContext.context = context;

  return shallowWithContext;
}
