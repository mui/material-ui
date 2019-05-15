import React from 'react';
import { assert } from 'chai';
import {
  createShallow,
  createMount,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Typography from './Typography';

describe('<Typography />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<Typography />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Typography />, () => ({
    classes,
    inheritComponent: 'p',
    mount,
    refInstanceof: window.HTMLParagraphElement,
  }));

  it('should render the text', () => {
    const wrapper = shallow(<Typography>Hello</Typography>);
    assert.strictEqual(wrapper.text(), 'Hello');
  });

  it('should render body1 root by default', () => {
    const wrapper = shallow(<Typography>Hello</Typography>);
    assert.strictEqual(wrapper.hasClass(classes.body1), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
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

  describe('prop: variantMapping', () => {
    it('should work with a single value', () => {
      const wrapper = shallow(
        <Typography variant="h6" variantMapping={{ h6: 'aside' }}>
          Hello
        </Typography>,
      );
      assert.strictEqual(wrapper.type(), 'aside');
    });

    it('should work event without the full mapping', () => {
      const wrapper = shallow(
        <Typography variant="h6" variantMapping={{}}>
          Hello
        </Typography>,
      );
      assert.strictEqual(wrapper.type(), 'h6');
    });
  });

  describe('prop: display', () => {
    it('should render with displayInline class in display="inline"', () => {
      const wrapper = shallow(<Typography display="inline">Hello</Typography>);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.displayInline), true);
      assert.strictEqual(wrapper.hasClass(classes.displayBlock), false);
    });

    it('should render with displayInline class in display="block"', () => {
      const wrapper = shallow(<Typography display="block">Hello</Typography>);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.displayBlock), true);
      assert.strictEqual(wrapper.hasClass(classes.displayInline), false);
    });

    it('should render with no display classes if display="initial"', () => {
      const wrapper = shallow(<Typography display="initial">Hello</Typography>);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.displayBlock), false);
      assert.strictEqual(wrapper.hasClass(classes.displayInline), false);
    });
  });
});
