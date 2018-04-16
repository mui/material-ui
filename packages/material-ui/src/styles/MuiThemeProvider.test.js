// @flow

import { spy } from 'sinon';
import { assert } from 'chai';
import React from 'react';
import PropTypes from 'prop-types';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { renderToString } from 'react-dom/server';
import { createMount } from '../test-utils';
import createMuiTheme from './createMuiTheme';
import Button from '../Button';
import createGenerateClassName from './createGenerateClassName';
import withTheme from './withTheme';
import MuiThemeProvider from './MuiThemeProvider';

function getThemeSpy() {
  const themeSpy = spy();
  const ThemeSpy = (props: Object) => {
    themeSpy(props.theme);
    return props.children;
  };

  ThemeSpy.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.object,
  };

  return {
    ThemeSpy: withTheme()(ThemeSpy),
    themeSpy,
  };
}

function getOptionsSpy() {
  const optionsSpy = spy();
  const OptionsSpy = (props, context) => {
    optionsSpy(context.muiThemeProviderOptions);
    return props.children;
  };

  OptionsSpy.propTypes = {
    children: PropTypes.element.isRequired,
  };

  OptionsSpy.contextTypes = {
    muiThemeProviderOptions: PropTypes.object,
  };

  return {
    OptionsSpy,
    optionsSpy,
  };
}

describe('<MuiThemeProvider />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('server side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should be able to extract the styles', () => {
      const theme = createMuiTheme();
      const sheetsRegistry = new SheetsRegistry();
      const generateClassName = createGenerateClassName();

      const markup = renderToString(
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
            <Button>Hello World</Button>
          </MuiThemeProvider>
        </JssProvider>,
      );

      assert.notStrictEqual(markup.match('Hello World'), null);
      assert.strictEqual(sheetsRegistry.registry.length, 3);
      assert.strictEqual(sheetsRegistry.toString().length > 4000, true);
      assert.strictEqual(sheetsRegistry.registry[0].classes.root, 'MuiTouchRipple-root-19');
      assert.deepEqual(
        sheetsRegistry.registry[1].classes,
        {
          disabled: 'MuiButtonBase-disabled-17',
          keyboardFocused: 'MuiButtonBase-keyboardFocused-18',
          root: 'MuiButtonBase-root-16',
        },
        'the class names should be deterministic',
      );
      assert.strictEqual(sheetsRegistry.registry[2].classes.root, 'MuiButton-root-1');
    });
  });

  describe('mount', () => {
    it('should work with nesting theme', () => {
      const { themeSpy: themeSpy1, ThemeSpy: ThemeSpy1 } = getThemeSpy();
      const { themeSpy: themeSpy2, ThemeSpy: ThemeSpy2 } = getThemeSpy();
      const { themeSpy: themeSpy3, ThemeSpy: ThemeSpy3 } = getThemeSpy();

      const theme1 = createMuiTheme({ status: { color: 'orange' } });
      const theme2 = outerTheme => ({ ...outerTheme, status: { color: 'green' } });
      const theme3 = createMuiTheme({ status: { color: 'yellow' } });

      const wrapper = mount(
        <MuiThemeProvider theme={theme1}>
          <ThemeSpy1>
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
          </ThemeSpy1>
        </MuiThemeProvider>,
      );

      assert.strictEqual(themeSpy1.callCount, 1);
      assert.strictEqual(themeSpy1.args[0][0].status.color, 'orange');
      assert.strictEqual(themeSpy2.callCount, 1);
      assert.strictEqual(themeSpy2.args[0][0].status.color, 'green');
      assert.strictEqual(themeSpy3.callCount, 1);
      assert.strictEqual(themeSpy3.args[0][0].status.color, 'yellow');

      wrapper.setProps({ theme: createMuiTheme({ status: { color: 'blue' } }) });

      assert.strictEqual(themeSpy1.callCount, 3);
      assert.strictEqual(themeSpy1.args[2][0].status.color, 'blue');
      assert.strictEqual(themeSpy2.callCount, 3);
      assert.strictEqual(themeSpy2.args[2][0].status.color, 'green');
      assert.strictEqual(themeSpy3.callCount, 3);
      assert.strictEqual(themeSpy3.args[2][0].status.color, 'yellow');
    });

    it('should forward the parent options', () => {
      const theme = createMuiTheme({ status: { color: 'orange' } });

      const optionsSpy = spy();

      function OptionsSpy(props, context) {
        optionsSpy(context.muiThemeProviderOptions);
        return <div />;
      }

      OptionsSpy.contextTypes = {
        muiThemeProviderOptions: PropTypes.object.isRequired,
      };

      mount(
        <MuiThemeProvider theme={theme} disableStylesGeneration>
          <MuiThemeProvider theme={theme}>
            <OptionsSpy />
          </MuiThemeProvider>
        </MuiThemeProvider>,
      );
      assert.strictEqual(optionsSpy.callCount, 1);
      assert.deepEqual(optionsSpy.args[0][0], {
        disableStylesGeneration: true,
      });
    });
  });

  describe('prop: disableStylesGeneration', () => {
    it('should provide the property down the context', () => {
      const { optionsSpy, OptionsSpy } = getOptionsSpy();

      const theme = createMuiTheme();
      const wrapper = mount(
        <MuiThemeProvider theme={theme} disableStylesGeneration>
          <OptionsSpy>
            <div>Foo</div>
          </OptionsSpy>
        </MuiThemeProvider>,
      );

      assert.strictEqual(optionsSpy.callCount, 1);
      assert.strictEqual(optionsSpy.args[0][0].disableStylesGeneration, true);

      wrapper.setProps({ disableStylesGeneration: false });
      assert.strictEqual(optionsSpy.args[1][0].disableStylesGeneration, false);
    });
  });
});
