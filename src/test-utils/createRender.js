// @flow weak

import { create } from 'jss';
import jssPreset from 'jss-preset-default';
import { createStyleManager } from 'jss-theme-reactor';
import React, { Element } from 'react';
import { render as enzymeRender } from 'enzyme';
import createMuiTheme from '../styles/theme';
import MuiThemeProvider from '../styles/MuiThemeProvider';

// Generate a render to string function with the needed context.
export default function createRender(options = {}) {
  const { render = enzymeRender } = options;
  const theme = createMuiTheme();
  const jss = create(jssPreset());
  const styleManager = createStyleManager({ jss, theme });
  const renderWithContext = function renderWithContext(node: Element<*>) {
    return render(
      <MuiThemeProvider styleManager={styleManager}>
        {node}
      </MuiThemeProvider>,
    );
  };

  renderWithContext.cleanUp = () => {
    styleManager.reset();
  };

  return renderWithContext;
}
