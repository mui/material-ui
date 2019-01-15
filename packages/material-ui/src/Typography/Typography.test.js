import React from 'react';
import { assert } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import createMuiTheme from '../styles/createMuiTheme';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import Typography from './Typography';

describe('<Typography />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Typography />);
  });

  it('should render the text', () => {
    const wrapper = shallow(<Typography>Hello</Typography>);
    assert.strictEqual(wrapper.childAt(0).equals('Hello'), true);
  });

  it('should spread props', () => {
    const wrapper = shallow(<Typography data-test="hello">Hello</Typography>);
    assert.strictEqual(wrapper.props()['data-test'], 'hello');
  });

  it('should render body2 root by default', () => {
    const wrapper = shallow(<Typography>Hello</Typography>);
    assert.strictEqual(wrapper.hasClass(classes.body2), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should merge user classes', () => {
    const wrapper = shallow(<Typography className="woofTypography">Hello</Typography>);
    assert.strictEqual(wrapper.hasClass(classes.body2), true);
    assert.strictEqual(wrapper.hasClass('woofTypography'), true);
  });

  it('should center text', () => {
    const wrapper = shallow(
      <Typography align="center" className="woofTypography">
        Hello
      </Typography>,
    );
    assert.strictEqual(wrapper.hasClass(classes.alignCenter), true);
  });
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'body2', 'body1', 'caption', 'button'].forEach(
    variant => {
      it(`should render ${variant} text`, () => {
        const wrapper = shallow(<Typography variant={variant}>Hello</Typography>);
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
      const wrapper = shallow(<Typography color={color}>Hello</Typography>);
      assert.strictEqual(classes[className] != null, true);
      assert.strictEqual(wrapper.hasClass(classes[className]), true, `should be ${color} text`);
    });
  });

  describe('prop: color', () => {
    it('should inherit the color', () => {
      const wrapper = shallow(<Typography color="inherit">Hello</Typography>);
      assert.strictEqual(wrapper.hasClass(classes.colorInherit), true);
    });
  });

  describe('prop: inline', () => {
    it('should render with the inline class', () => {
      const wrapper = shallow(<Typography inline>Hello</Typography>);
      assert.strictEqual(wrapper.hasClass(classes.inline), true);
    });
  });

  describe('headline', () => {
    it('should render a span by default', () => {
      const wrapper = shallow(<Typography variant="button">Hello</Typography>);
      assert.strictEqual(wrapper.name(), 'span');
    });

    it('should render a p with a paragraph', () => {
      const wrapper = shallow(<Typography paragraph>Hello</Typography>);
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

    beforeEach(() => {
      // eslint-disable-next-line no-underscore-dangle
      global.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = false;
      consoleErrorMock.spy();
    });

    afterEach(() => {
      // eslint-disable-next-line no-underscore-dangle
      global.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
      consoleErrorMock.reset();
    });

    /**
     * tests if a warning is issued from the `warning` module when mounting {component}
     */
    const testMount = (component, expectWarning) => {
      const wrapper = mount(component);
      wrapper.unmount();

      if (expectWarning) {
        assert.strictEqual(consoleErrorMock.callCount(), 1);
        assert.include(consoleErrorMock.args()[0], 'deprecated');
      } else {
        assert.strictEqual(consoleErrorMock.callCount(), 0);
      }
    };

    describe('prop: internalDeprecatedVariant', () => {
      it('suppresses warnings if the user is on a v2 theme', () => {
        testMount(<Typography internalDeprecatedVariant variant="headline" />, false);
      });
    });

    describe('theme.typography.useNextVariants', () => {
      it('maps internal deprecated variants', () => {
        const wrapper = shallow(<Typography variant="display4" />);
        assert.strictEqual(wrapper.hasClass(classes.h1), true);
      });

      it('suppresses warnings for restyled variants', () => {
        const theme = createMuiTheme({ typography: { useNextVariants: true } });
        testMount(<Typography theme={theme} variant="h1" />, false);
      });
    });
  });

  describe('prop: headlineMapping', () => {
    it('should work with a single value', () => {
      const wrapper = shallow(
        <Typography variant="h6" headlineMapping={{ h6: 'aside' }}>
          Hello
        </Typography>,
      );
      assert.strictEqual(wrapper.type(), 'aside');
    });

    it('should work event without the full mapping', () => {
      const wrapper = shallow(
        <Typography variant="h6" headlineMapping={{}}>
          Hello
        </Typography>,
      );
      assert.strictEqual(wrapper.type(), 'h6');
    });
  });
});
