import React from 'react';
import { assert } from 'chai';
import { mock } from 'sinon';
import MuiThemeProvider from '../styles/MuiThemeProvider';
import createMuiTheme from '../styles/createMuiTheme';
import { createMount, createShallow, getClasses } from '../test-utils';
import Typography from './Typography';

describe('<Typography />', () => {
  let shallow;
  let classes;
  let v1ThemeWithoutWarnings;
  let v2Theme;

  before(() => {
    shallow = createShallow({ dive: true });
    v1ThemeWithoutWarnings = createMuiTheme({
      typography: {
        suppressDeprecationWarnings: true,
      },
    });
    v2Theme = createMuiTheme({
      typography: {
        suppressDeprecationWarnings: false,
        useNextVariants: true,
      },
    });
    classes = getClasses(<Typography theme={v2Theme} />);
  });

  it('should render the text', () => {
    const wrapper = shallow(<Typography theme={v1ThemeWithoutWarnings}>Hello</Typography>);
    assert.strictEqual(wrapper.childAt(0).equals('Hello'), true);
  });

  it('should spread props', () => {
    const wrapper = shallow(
      <Typography data-test="hello" theme={v1ThemeWithoutWarnings}>
        Hello
      </Typography>,
    );
    assert.strictEqual(wrapper.props()['data-test'], 'hello');
  });

  it('should render body1 root by default', () => {
    const wrapper = shallow(<Typography theme={v2Theme}>Hello</Typography>);
    assert.strictEqual(wrapper.hasClass(classes.body1), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should merge user classes', () => {
    const wrapper = shallow(
      <Typography className="woofTypography" theme={v2Theme}>
        Hello
      </Typography>,
    );
    assert.strictEqual(wrapper.hasClass(classes.body1), true);
    assert.strictEqual(wrapper.hasClass('woofTypography'), true);
  });

  it('should center text', () => {
    const wrapper = shallow(
      <Typography align="center" className="woofTypography" theme={v1ThemeWithoutWarnings}>
        Hello
      </Typography>,
    );
    assert.strictEqual(wrapper.hasClass(classes.alignCenter), true);
  });
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'body2', 'body1', 'caption', 'button'].forEach(
    variant => {
      it(`should render ${variant} text`, () => {
        const wrapper = shallow(
          <Typography theme={v2Theme} variant={variant}>
            Hello
          </Typography>,
        );
        assert.strictEqual(classes[variant] != null, true);
        assert.strictEqual(wrapper.hasClass(classes[variant]), true, `should be ${variant} text`);
      });
    },
  );

  [
    ['primary', 'colorPrimary'],
    ['textSecondary', 'colorTextSecondary'],
    ['secondary', 'colorSecondary'],
    ['inherit', 'colorInherit'],
    ['error', 'colorError'],
  ].forEach(([color, className]) => {
    it(`should render ${color} color`, () => {
      const wrapper = shallow(
        <Typography color={color} theme={v1ThemeWithoutWarnings}>
          Hello
        </Typography>,
      );
      assert.strictEqual(classes[className] != null, true);
      assert.strictEqual(wrapper.hasClass(classes[className]), true, `should be ${color} text`);
    });
  });

  describe('prop: color', () => {
    it('should inherit the color', () => {
      const wrapper = shallow(
        <Typography color="inherit" theme={v1ThemeWithoutWarnings}>
          Hello
        </Typography>,
      );
      assert.strictEqual(wrapper.hasClass(classes.colorInherit), true);
    });
  });

  describe('headline', () => {
    it('should render a span by default', () => {
      const wrapper = shallow(
        <Typography variant="button" theme={v1ThemeWithoutWarnings}>
          Hello
        </Typography>,
      );
      assert.strictEqual(wrapper.name(), 'span');
    });

    it('should render a p with a paragraph', () => {
      const wrapper = shallow(
        <Typography paragraph theme={v1ThemeWithoutWarnings}>
          Hello
        </Typography>,
      );
      assert.strictEqual(wrapper.name(), 'p');
    });

    it('should render the mapped headline', () => {
      const wrapper = shallow(<Typography variant="h6">Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'h6');
    });

    it('should render a h1', () => {
      const wrapper = shallow(<Typography component="h1">Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'h1');
    });
  });

  describe('v2 migration', () => {
    const mount = createMount();
    let warning;

    beforeEach(() => {
      warning = mock(console).expects('error');
    });

    afterEach(() => {
      warning.restore();
    });

    /**
     * tests if a warning is issued from the `warning` module when mounting {component}
     */
    const testMount = (component, expectDeprecation) => {
      const expectedWarning = expectDeprecation ? 'Deprecation Warning: Material-UI:' : undefined;
      warning.resetHistory();

      const theme = createMuiTheme({
        typography: {
          suppressDeprecationWarnings: false,
        },
      });
      const wrapper = mount(<MuiThemeProvider theme={theme}>{component}</MuiThemeProvider>);
      wrapper.unmount();

      assert.strictEqual(warning.calledOnce, expectDeprecation);

      if (expectedWarning) {
        assert.include(warning.firstCall.args[0], expectedWarning);
      }
    };

    it('should warn on deprecated variant usage', () => {
      testMount(<Typography variant="display4" />, true);
    });

    it('warns on restyle variant usage', () => {
      testMount(<Typography variant="body1" />, true);
    });

    describe('prop: internalDeprecatedVariant', () => {
      it('still warns if the user is on a v1 theme', () => {
        testMount(<Typography internalDeprecatedVariant variant="headline" />, true);
      });

      it('suppresses warnings if the user is on a v2 theme', () => {
        testMount(
          <Typography internalDeprecatedVariant theme={v2Theme} variant="headline" />,
          false,
        );
      });
    });

    describe('theme.typography.useNextVariants', () => {
      it('maps internal deprecated variants', () => {
        const theme = createMuiTheme({ typography: { useNextVariants: true } });
        const v2Typography = <Typography theme={theme} variant="display4" />;
        const wrapper = shallow(v2Typography);
        assert.strictEqual(wrapper.hasClass(classes.h1), true);
      });

      it('will still warn if you use them in your app', () => {
        testMount(<Typography theme={v2Theme} variant="display4" />, true);
      });

      it('suppresses warnings for restyled variants', () => {
        testMount(<Typography theme={v2Theme} variant="body1" />, false);
      });
    });

    describe('with MUI_SUPPRESS_DEPRECATION_WARNINGS', () => {
      it('causes mui to not log deprecation warnings', () => {
        const theme = createMuiTheme();
        testMount(<Typography theme={theme} variant="display4" />, false);
      });
    });
  });

  describe('prop: headlineMapping', () => {
    it('should work with a single value', () => {
      const wrapper = shallow(
        <Typography variant="title" headlineMapping={{ title: 'aside' }}>
          Hello
        </Typography>,
      );
      assert.strictEqual(wrapper.type(), 'aside');
    });

    it('should work event without the full mapping', () => {
      const wrapper = shallow(
        <Typography variant="title" headlineMapping={{}}>
          Hello
        </Typography>,
      );
      assert.strictEqual(wrapper.type(), 'h2');
    });
  });
});
