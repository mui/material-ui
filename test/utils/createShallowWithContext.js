// @flow weak

import { createMuiTheme } from 'src/styles/theme';
import { create } from 'jss';
import jssPreset from 'jss-preset-default';
import { createStyleManager } from 'jss-theme-reactor';
import { shallow as enzymeShallow } from 'enzyme';

export default function createShallowWithContext(
  shallow = enzymeShallow,
  otherContext = {}
) {
  const theme = createMuiTheme();
  const jss = create(jssPreset());
  const styleManager = createStyleManager({ jss, theme });
  const context = { theme, styleManager, ...otherContext };
  const shallowWithContext = function shallowWithContext(node) {
    return shallow(node, { context });
  };
  shallowWithContext.context = context;
  return shallowWithContext;
}
