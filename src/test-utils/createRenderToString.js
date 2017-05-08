// @flow weak

import { create } from 'jss';
import jssPreset from 'jss-preset-default';
import { createStyleManager } from 'jss-theme-reactor';
import React from 'react';
import { renderToString } from 'react-dom/server';
import createMuiTheme from '../styles/theme';
import MuiThemeProvider from '../styles/MuiThemeProvider';

export default function createRenderToString() {
  const theme = createMuiTheme();
  const jss = create(jssPreset());
  const styleManager = createStyleManager({ jss, theme });
  const renderToStringWithContext = function renderToStringWithContext(node) {
    return renderToString(
      <MuiThemeProvider theme={theme} styleManager={styleManager}>
        {node}
      </MuiThemeProvider>,
    );
  };

  renderToStringWithContext.cleanUp = () => {
    styleManager.reset();
  };

  return renderToStringWithContext;
}
