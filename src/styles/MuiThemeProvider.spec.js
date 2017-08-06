// @flow

import { spy } from 'sinon';
import { assert } from 'chai';
import React from 'react';
import PropTypes from 'prop-types';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { renderToString } from 'react-dom/server';
import { createMount } from '../test-utils';
import { createMuiTheme } from '../styles';
import Button from '../Button';
import createGenerateClassName from './createGenerateClassName';
import withTheme from './withTheme';
import MuiThemeProvider from './MuiThemeProvider';

function getThemeSpy() {
  const themeSpy = spy();
  const ThemeSpy = props => {
    themeSpy(props.theme);
    return props.children;
  };

  ThemeSpy.propTypes = {
    children: PropTypes.element.isRequired,
    theme: PropTypes.object,
  };

  return {
    ThemeSpy: withTheme(ThemeSpy),
    themeSpy,
  };
}

describe('<MuiThemeProvider />', () => {
  describe('server side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should be able to extract the styles', () => {
      const theme = createMuiTheme();
      const sheetsRegistry = new SheetsRegistry();
      const jss = create(preset());
      jss.options.createGenerateClassName = createGenerateClassName;

      const markup = renderToString(
        <JssProvider registry={sheetsRegistry} jss={jss}>
          <MuiThemeProvider theme={theme} sheetsManager={new WeakMap()}>
            <Button>Hello World</Button>
          </MuiThemeProvider>
        </JssProvider>,
      );

      assert.notStrictEqual(markup.match('Hello World'), null);
      assert.strictEqual(sheetsRegistry.registry.length, 3);
      assert.strictEqual(sheetsRegistry.toString().length > 4000, true);
      assert.strictEqual(sheetsRegistry.registry[0].classes.root, 'MuiTouchRipple-root-17');
      assert.deepEqual(
        sheetsRegistry.registry[1].classes,
        {
          disabled: 'MuiButtonBase-disabled-16',
          root: 'MuiButtonBase-root-15',
        },
        'the class names should be deterministic',
      );
      assert.strictEqual(sheetsRegistry.registry[2].classes.root, 'MuiButton-root-1');
    });
  });

  describe('mount', () => {
    let mount;

    before(() => {
      mount = createMount();
    });

    after(() => {
      mount.cleanUp();
    });

    it('should work with nesting theme', () => {
      const { themeSpy: themeSpy1, ThemeSpy: ThemeSpy1 } = getThemeSpy();
      const { themeSpy: themeSpy2, ThemeSpy: ThemeSpy2 } = getThemeSpy();
      const { themeSpy: themeSpy3, ThemeSpy: ThemeSpy3 } = getThemeSpy();

      const theme1 = createMuiTheme({
        status: {
          color: 'orange',
        },
      });

      const theme2 = outerTheme => ({
        ...outerTheme,
        status: {
          color: 'green',
        },
      });

      const theme3 = createMuiTheme({
        status: {
          color: 'yellow',
        },
      });

      const wrapper = mount(
        <MuiThemeProvider theme={theme1}>
          <ThemeSpy1>
            <div>
              <MuiThemeProvider theme={theme2}>
                <ThemeSpy2>
                  <span>Foo</span>
                </ThemeSpy2>
              </MuiThemeProvider>
              <MuiThemeProvider theme={theme3}>
                <ThemeSpy3>
                  <span>Bar</span>
                </ThemeSpy3>
              </MuiThemeProvider>
            </div>
          </ThemeSpy1>
        </MuiThemeProvider>,
      );

      assert.strictEqual(themeSpy1.callCount, 1);
      assert.strictEqual(themeSpy1.args[0][0].status.color, 'orange');
      assert.strictEqual(themeSpy2.callCount, 1);
      assert.strictEqual(themeSpy2.args[0][0].status.color, 'green');
      assert.strictEqual(themeSpy3.callCount, 1);
      assert.strictEqual(themeSpy3.args[0][0].status.color, 'yellow');

      wrapper.setProps({
        theme: createMuiTheme({
          status: {
            color: 'blue',
          },
        }),
      });

      assert.strictEqual(themeSpy1.callCount, 2);
      assert.strictEqual(themeSpy1.args[1][0].status.color, 'blue');
      assert.strictEqual(themeSpy2.callCount, 2);
      assert.strictEqual(themeSpy2.args[1][0].status.color, 'green');
      assert.strictEqual(themeSpy3.callCount, 2);
      assert.strictEqual(themeSpy3.args[1][0].status.color, 'yellow');
    });
  });
});
