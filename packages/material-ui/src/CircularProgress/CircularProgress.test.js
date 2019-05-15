import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import CircularProgress from './CircularProgress';

describe('<CircularProgress />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<CircularProgress />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<CircularProgress />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render with the primary color by default', () => {
    const wrapper = shallow(<CircularProgress />);
    assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
  });

  it('should render with the primary color', () => {
    const wrapper = shallow(<CircularProgress color="primary" />);
    assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
  });

  it('should render with the secondary color', () => {
    const wrapper = shallow(<CircularProgress color="secondary" />);
    assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
  });

  it('should contain an SVG with the svg class, and a circle with the circle class', () => {
    const wrapper = shallow(<CircularProgress />);
    const svg = wrapper.childAt(0);
    assert.strictEqual(svg.name(), 'svg');
    assert.strictEqual(wrapper.hasClass(classes.indeterminate), true);
    assert.strictEqual(svg.childAt(0).name(), 'circle', 'should be a circle');
    assert.strictEqual(
      svg.childAt(0).hasClass(classes.circle),
      true,
      'should have the circle class',
    );
  });

  it('should render intermediate variant by default', () => {
    const wrapper = shallow(<CircularProgress />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    const svg = wrapper.childAt(0);
    assert.strictEqual(
      svg.childAt(0).hasClass(classes.circleIndeterminate),
      true,
      'should have the circleIndeterminate class',
    );
  });

  it('should render with a different size', () => {
    const wrapper = shallow(<CircularProgress size={60} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.props().style.width, 60, 'should have width correctly set');
    assert.strictEqual(wrapper.props().style.height, 60, 'should have width correctly set');
    const svg = wrapper.childAt(0);
    assert.strictEqual(svg.name(), 'svg');
    assert.strictEqual(svg.childAt(0).name(), 'circle');
    assert.strictEqual(svg.childAt(0).props().cx, 44, 'should have cx correctly set');
    assert.strictEqual(svg.childAt(0).props().cy, 44, 'should have cx correctly set');
  });

  describe('prop: variant="static', () => {
    it('should set strokeDasharray of circle', () => {
      const wrapper = shallow(<CircularProgress variant="static" value={70} />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      const svg = wrapper.childAt(0);
      const style = svg.childAt(0).props().style;
      assert.strictEqual(style.strokeDasharray, '126.920', 'should have strokeDasharray set');
      assert.strictEqual(style.strokeDashoffset, '38.076px', 'should have strokeDashoffset set');
      assert.strictEqual(wrapper.props()['aria-valuenow'], 70);
    });
  });

  describe('prop: variant="determinate"', () => {
    it('should render with determinate classes', () => {
      const wrapper = shallow(<CircularProgress variant="determinate" />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      const svg = wrapper.childAt(0);
      assert.strictEqual(svg.name(), 'svg');
      assert.strictEqual(
        svg.hasClass(classes.svgIndeterminate),
        false,
        'should not have the svgIndeterminate class',
      );
    });

    it('should set strokeDasharray of circle', () => {
      const wrapper = shallow(<CircularProgress variant="determinate" value={70} />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      const svg = wrapper.childAt(0);
      const style = svg.childAt(0).props().style;
      assert.strictEqual(style.strokeDasharray, '126.920');
      assert.strictEqual(style.strokeDashoffset, '11.423px');
      assert.strictEqual(wrapper.props()['aria-valuenow'], 70);
    });
  });

  describe('prop: disableShrink ', () => {
    it('should default to false', () => {
      const wrapper = shallow(<CircularProgress variant="indeterminate" />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      const svg = wrapper.childAt(0);
      const circle = svg.childAt(0);
      assert.strictEqual(circle.name(), 'circle');
      assert.strictEqual(circle.hasClass(classes.circleDisableShrink), false);
    });

    it('should render without disableShrink class when set to false', () => {
      const wrapper = shallow(<CircularProgress variant="indeterminate" disableShrink={false} />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      const svg = wrapper.childAt(0);
      const circle = svg.childAt(0);
      assert.strictEqual(circle.name(), 'circle');
      assert.strictEqual(circle.hasClass(classes.circleDisableShrink), false);
    });

    it('should render with disableShrink class when set to true', () => {
      const wrapper = shallow(<CircularProgress variant="indeterminate" disableShrink />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      const svg = wrapper.childAt(0);
      const circle = svg.childAt(0);
      assert.strictEqual(circle.name(), 'circle');
      assert.strictEqual(circle.hasClass(classes.circleDisableShrink), true);
    });
  });
});
