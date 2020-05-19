// @ts-check
import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import Typography from './Typography';

describe('<Typography />', () => {
  /**
   * @type {ReturnType<typeof createMount>}
   */
  const mount = createMount();
  /**
   * @type {ReturnType<typeof createShallow>}
   */
  let shallow;
  /**
   * // we test at runtime that this is equal to
   * Record<import('./Typography').TypographyClassKey, string>
   * @type {Record<string, string>}
   */
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Typography />);
  });

  describeConformance(<Typography />, () => ({
    classes,
    inheritComponent: 'p',
    mount,
    refInstanceof: window.HTMLParagraphElement,
  }));

  it('should render the text', () => {
    const wrapper = shallow(<Typography>Hello</Typography>);
    expect(wrapper.text()).to.equal('Hello');
  });

  it('should render body1 root by default', () => {
    const wrapper = shallow(<Typography>Hello</Typography>);
    expect(wrapper.hasClass(classes.body1)).to.equal(true);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
  });

  it('should center text', () => {
    const wrapper = shallow(
      <Typography align="center" className="woofTypography">
        Hello
      </Typography>,
    );
    expect(wrapper.hasClass(classes.alignCenter)).to.equal(true);
  });
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'body2', 'body1', 'caption', 'button'].forEach(
    (variant) => {
      it(`should render ${variant} text`, () => {
        // @ts-ignore literal/tuple type widening
        const wrapper = shallow(<Typography variant={variant}>Hello</Typography>);
        expect(classes[variant] != null).to.equal(true);
        expect(wrapper.hasClass(classes[variant])).to.equal(true);
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
      // @ts-ignore literal/tuple type widening
      const wrapper = shallow(<Typography color={color}>Hello</Typography>);
      expect(classes[className] != null).to.equal(true);
      expect(wrapper.hasClass(classes[className])).to.equal(true);
    });
  });

  describe('prop: color', () => {
    it('should inherit the color', () => {
      const wrapper = shallow(<Typography color="inherit">Hello</Typography>);
      expect(wrapper.hasClass(classes.colorInherit)).to.equal(true);
    });
  });

  describe('headline', () => {
    it('should render a span by default', () => {
      const wrapper = shallow(<Typography variant="button">Hello</Typography>);
      expect(wrapper.name()).to.equal('span');
    });

    it('should render a p with a paragraph', () => {
      const wrapper = shallow(<Typography paragraph>Hello</Typography>);
      expect(wrapper.name()).to.equal('p');
    });

    it('should render the mapped headline', () => {
      const wrapper = shallow(<Typography variant="h6">Hello</Typography>);
      expect(wrapper.name()).to.equal('h6');
    });

    it('should render a h1', () => {
      const wrapper = shallow(<Typography component="h1">Hello</Typography>);
      expect(wrapper.name()).to.equal('h1');
    });
  });

  describe('prop: variantMapping', () => {
    it('should work with a single value', () => {
      const wrapper = shallow(
        <Typography variant="h6" variantMapping={{ h6: 'aside' }}>
          Hello
        </Typography>,
      );
      expect(wrapper.type()).to.equal('aside');
    });

    it('should work event without the full mapping', () => {
      const wrapper = shallow(
        <Typography variant="h6" variantMapping={{}}>
          Hello
        </Typography>,
      );
      expect(wrapper.type()).to.equal('h6');
    });
  });

  describe('prop: display', () => {
    it('should render with displayInline class in display="inline"', () => {
      const wrapper = shallow(<Typography display="inline">Hello</Typography>);
      expect(wrapper.hasClass(classes.root)).to.equal(true);
      expect(wrapper.hasClass(classes.displayInline)).to.equal(true);
      expect(wrapper.hasClass(classes.displayBlock)).to.equal(false);
    });

    it('should render with displayInline class in display="block"', () => {
      const wrapper = shallow(<Typography display="block">Hello</Typography>);
      expect(wrapper.hasClass(classes.root)).to.equal(true);
      expect(wrapper.hasClass(classes.displayBlock)).to.equal(true);
      expect(wrapper.hasClass(classes.displayInline)).to.equal(false);
    });

    it('should render with no display classes if display="initial"', () => {
      const wrapper = shallow(<Typography display="initial">Hello</Typography>);
      expect(wrapper.hasClass(classes.root)).to.equal(true);
      expect(wrapper.hasClass(classes.displayBlock)).to.equal(false);
      expect(wrapper.hasClass(classes.displayInline)).to.equal(false);
    });
  });
});
