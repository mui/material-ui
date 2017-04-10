// @flow weak

import { assert } from 'chai';
import { create } from 'jss';
import path from 'path';
import fs from 'fs';
import jssPreset from 'jss-preset-default';
import { createStyleManager } from 'jss-theme-reactor';
import React from 'react';
import htmlLooksLike from 'html-looks-like';
import { renderToString } from 'react-dom/server';
import { createMuiTheme } from 'src/styles/theme';
import Button from 'src/Button';
import MuiThemeProvider from './MuiThemeProvider';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

describe('<MuiThemeProvider />', () => {
  describe('server side', () => {
    // Only run the test on node.
    if (!/Node.js/.test(window.navigator.userAgent)) {
      return;
    }

    let theme;
    let styleManager;

    before(() => {
      theme = createMuiTheme();
      const jss = create(jssPreset());
      styleManager = createStyleManager({ jss, theme });
    });

    after(() => {
      styleManager.reset();
    });

    it('should be able to extract the styles', () => {
      const markup = renderToString(
        <MuiThemeProvider theme={theme} styleManager={styleManager}>
          <Button>
            Hello World
          </Button>
        </MuiThemeProvider>,
      );

      htmlLooksLike(markup, `
        <button
          tabindex="0"
          class="MuiButtonBase-buttonBase-3170508663 MuiButton-root-3593367901"
          type="button"
          data-reactroot=""
          data-reactid="1"
          data-react-checksum="-1899863948"
        >
          <span class="MuiButton-label-49836587" data-reactid="2">
            Hello World
          </span>
          <span class="MuiTouchRipple-root-3868442396" data-reactid="3"></span>
        </button>
      `);

      const expected = fs.readFileSync(
        path.join(__dirname, 'MuiThemeProvider.spec.output.css'),
        'utf-8',
      );
      assert.strictEqual(styleManager.sheetsToString(), trim(expected));
    });
  });
});
