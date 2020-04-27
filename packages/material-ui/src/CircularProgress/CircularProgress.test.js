import * as React from 'react';
import { expect } from 'chai';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
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
    expect(wrapper.hasClass(classes.colorPrimary)).to.equal(true);
  });

  it('should render with the primary color', () => {
    const wrapper = shallow(<CircularProgress color="primary" />);
    expect(wrapper.hasClass(classes.colorPrimary)).to.equal(true);
  });

  it('should render with the secondary color', () => {
    const wrapper = shallow(<CircularProgress color="secondary" />);
    expect(wrapper.hasClass(classes.colorSecondary)).to.equal(true);
  });

  it('should contain an SVG with the svg class, and a circle with the circle class', () => {
    const wrapper = shallow(<CircularProgress />);
    const svg = wrapper.childAt(0);
    expect(svg.name()).to.equal('svg');
    expect(wrapper.hasClass(classes.indeterminate)).to.equal(true);
    expect(svg.childAt(0).name()).to.equal('circle');
    expect(svg.childAt(0).hasClass(classes.circle)).to.equal(true);
  });

  it('should render intermediate variant by default', () => {
    const wrapper = shallow(<CircularProgress />);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    const svg = wrapper.childAt(0);
    expect(svg.childAt(0).hasClass(classes.circleIndeterminate)).to.equal(true);
  });

  it('should render with a different size', () => {
    const wrapper = shallow(<CircularProgress size={60} />);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    expect(wrapper.props().style.width).to.equal(60);
    expect(wrapper.props().style.height).to.equal(60);
    const svg = wrapper.childAt(0);
    expect(svg.name()).to.equal('svg');
    expect(svg.childAt(0).name()).to.equal('circle');
    expect(svg.childAt(0).props().cx).to.equal(44);
    expect(svg.childAt(0).props().cy).to.equal(44);
  });

  describe('prop: variant="static', () => {
    it('should set strokeDasharray of circle', () => {
      const wrapper = shallow(<CircularProgress variant="static" value={70} />);
      expect(wrapper.hasClass(classes.root)).to.equal(true);
      const svg = wrapper.childAt(0);
      const style = svg.childAt(0).props().style;
      expect(style.strokeDasharray).to.equal('126.920');
      expect(style.strokeDashoffset).to.equal('38.076px');
      expect(wrapper.props()['aria-valuenow']).to.equal(70);
    });
  });

  describe('prop: variant="determinate"', () => {
    it('should render with determinate classes', () => {
      const wrapper = shallow(<CircularProgress variant="determinate" />);
      expect(wrapper.hasClass(classes.root)).to.equal(true);
      const svg = wrapper.childAt(0);
      expect(svg.name()).to.equal('svg');
      expect(svg.hasClass(classes.svgIndeterminate)).to.equal(false);
    });

    it('should set strokeDasharray of circle', () => {
      const wrapper = shallow(<CircularProgress variant="determinate" value={70} />);
      expect(wrapper.hasClass(classes.root)).to.equal(true);
      const svg = wrapper.childAt(0);
      const style = svg.childAt(0).props().style;
      expect(style.strokeDasharray).to.equal('126.920');
      expect(style.strokeDashoffset).to.equal('11.423px');
      expect(wrapper.props()['aria-valuenow']).to.equal(70);
    });
  });

  describe('prop: disableShrink ', () => {
    it('should default to false', () => {
      const wrapper = shallow(<CircularProgress variant="indeterminate" />);
      expect(wrapper.hasClass(classes.root)).to.equal(true);
      const svg = wrapper.childAt(0);
      const circle = svg.childAt(0);
      expect(circle.name()).to.equal('circle');
      expect(circle.hasClass(classes.circleDisableShrink)).to.equal(false);
    });

    it('should render without disableShrink class when set to false', () => {
      const wrapper = shallow(<CircularProgress variant="indeterminate" disableShrink={false} />);
      expect(wrapper.hasClass(classes.root)).to.equal(true);
      const svg = wrapper.childAt(0);
      const circle = svg.childAt(0);
      expect(circle.name()).to.equal('circle');
      expect(circle.hasClass(classes.circleDisableShrink)).to.equal(false);
    });

    it('should render with disableShrink class when set to true', () => {
      const wrapper = shallow(<CircularProgress variant="indeterminate" disableShrink />);
      expect(wrapper.hasClass(classes.root)).to.equal(true);
      const svg = wrapper.childAt(0);
      const circle = svg.childAt(0);
      expect(circle.name()).to.equal('circle');
      expect(circle.hasClass(classes.circleDisableShrink)).to.equal(true);
    });
  });
});
