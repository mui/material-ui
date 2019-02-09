import { spy } from 'sinon';
import { assert } from 'chai';
import React from 'react';
import PropTypes from 'prop-types';
import { SheetsRegistry } from 'jss';
import { JssProvider } from 'react-jss';
import ReactDOMServer from 'react-dom/server';
import { createMount } from '@material-ui/core/test-utils';
import createMuiTheme from './createMuiTheme';
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

  describe('server-side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    const theme = createMuiTheme();

    function assertRendering(markup, sheetsRegistry) {
      assert.notStrictEqual(markup.match('Hello World'), null);
      assert.strictEqual(sheetsRegistry.registry.length, 2);
      assert.strictEqual(sheetsRegistry.toString().length > 4000, true);
      assert.strictEqual(sheetsRegistry.registry[0].classes.root, 'MuiButtonBase-root-27');
      assert.deepEqual(
        sheetsRegistry.registry[0].classes,
        {
          disabled: 'MuiButtonBase-disabled-28',
          focusVisible: 'MuiButtonBase-focusVisible-29',
          root: 'MuiButtonBase-root-27',
        },
        'the class names should be deterministic',
      );
      assert.strictEqual(sheetsRegistry.registry[1].classes.root, 'MuiButton-root-1');
    }

    it('should be able to extract the styles', () => {
      const sheetsRegistry = new SheetsRegistry();
      const generateClassName = createGenerateClassName();

      const markup = ReactDOMServer.renderToString(
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
            <Button>Hello World</Button>
          </MuiThemeProvider>
        </JssProvider>,
      );

      assertRendering(markup, sheetsRegistry);
    });

    it('should be able to cache the sheets between two requests', () => {
      const generateClassName = createGenerateClassName();
      const sheetsCache = new Map();

      const sheetsRegistry1 = new SheetsRegistry();
      const markup1 = ReactDOMServer.renderToString(
        <JssProvider registry={sheetsRegistry1} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={new Map()} sheetsCache={sheetsCache}>
            <Button>Hello World</Button>
          </MuiThemeProvider>
        </JssProvider>,
      );
      assertRendering(markup1, sheetsRegistry1);

      const sheetsRegistry2 = new SheetsRegistry();
      const markup2 = ReactDOMServer.renderToString(
        <JssProvider registry={sheetsRegistry2} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={new Map()} sheetsCache={sheetsCache}>
            <Button>Hello World</Button>
          </MuiThemeProvider>
        </JssProvider>,
      );
      assertRendering(markup2, sheetsRegistry2);
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

  describe('prop: sheetsCache', () => {
    it('should provide the property down the context', () => {
      const { optionsSpy, OptionsSpy } = getOptionsSpy();

      const theme = createMuiTheme();
      const sheetsCache = new Map();
      mount(
        <MuiThemeProvider theme={theme} sheetsCache={sheetsCache}>
          <OptionsSpy>
            <div>Foo</div>
          </OptionsSpy>
        </MuiThemeProvider>,
      );

      assert.strictEqual(optionsSpy.callCount, 1);
      assert.strictEqual(optionsSpy.args[0][0].sheetsCache, sheetsCache);
    });
  });
});
