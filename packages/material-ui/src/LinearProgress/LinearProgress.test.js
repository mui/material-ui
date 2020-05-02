import * as React from 'react';
import { expect } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import LinearProgress from './LinearProgress';

describe('<LinearProgress />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<LinearProgress />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<LinearProgress />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render indeterminate variant by default', () => {
    const wrapper = shallow(<LinearProgress />);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    expect(wrapper.hasClass(classes.indeterminate)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.barColorPrimary)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.bar1Indeterminate)).to.equal(true);
    expect(wrapper.childAt(1).hasClass(classes.barColorPrimary)).to.equal(true);
    expect(wrapper.childAt(1).hasClass(classes.bar2Indeterminate)).to.equal(true);
  });

  it('should render for the primary color', () => {
    const wrapper = shallow(<LinearProgress color="primary" />);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.barColorPrimary)).to.equal(true);
    expect(wrapper.childAt(1).hasClass(classes.barColorPrimary)).to.equal(true);
  });

  it('should render for the secondary color', () => {
    const wrapper = shallow(<LinearProgress color="secondary" />);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.barColorSecondary)).to.equal(true);
    expect(wrapper.childAt(1).hasClass(classes.barColorSecondary)).to.equal(true);
  });

  it('should render with determinate classes for the primary color by default', () => {
    const wrapper = shallow(<LinearProgress value={1} variant="determinate" />);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    expect(wrapper.hasClass(classes.determinate)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.barColorPrimary)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.bar1Determinate)).to.equal(true);
  });

  it('should render with determinate classes for the primary color', () => {
    const wrapper = shallow(<LinearProgress color="primary" value={1} variant="determinate" />);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    expect(wrapper.hasClass(classes.determinate)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.barColorPrimary)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.bar1Determinate)).to.equal(true);
  });

  it('should render with determinate classes for the secondary color', () => {
    const wrapper = shallow(<LinearProgress color="secondary" value={1} variant="determinate" />);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    expect(wrapper.hasClass(classes.determinate)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.barColorSecondary)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.bar1Determinate)).to.equal(true);
  });

  it('should set width of bar1 on determinate variant', () => {
    const wrapper = shallow(<LinearProgress variant="determinate" value={77} />);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    expect(wrapper.hasClass(classes.determinate)).to.equal(true);
    expect(wrapper.childAt(0).props().style.transform).to.equal('translateX(-23%)');
    expect(wrapper.props()['aria-valuenow']).to.equal(77);
  });

  it('should render with buffer classes for the primary color by default', () => {
    const wrapper = shallow(<LinearProgress value={1} valueBuffer={1} variant="buffer" />);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.dashedColorPrimary)).to.equal(true);
    expect(wrapper.childAt(1).hasClass(classes.barColorPrimary)).to.equal(true);
    expect(wrapper.childAt(1).hasClass(classes.bar1Buffer)).to.equal(true);
    expect(wrapper.childAt(2).hasClass(classes.colorPrimary)).to.equal(true);
    expect(wrapper.childAt(2).hasClass(classes.bar2Buffer)).to.equal(true);
  });

  it('should render with buffer classes for the primary color', () => {
    const wrapper = shallow(
      <LinearProgress value={1} valueBuffer={1} color="primary" variant="buffer" />,
    );
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.dashedColorPrimary)).to.equal(true);
    expect(wrapper.childAt(1).hasClass(classes.barColorPrimary)).to.equal(true);
    expect(wrapper.childAt(1).hasClass(classes.bar1Buffer)).to.equal(true);
    expect(wrapper.childAt(2).hasClass(classes.colorPrimary)).to.equal(true);
    expect(wrapper.childAt(2).hasClass(classes.bar2Buffer)).to.equal(true);
  });

  it('should render with buffer classes for the secondary color', () => {
    const wrapper = shallow(
      <LinearProgress value={1} valueBuffer={1} color="secondary" variant="buffer" />,
    );
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.dashedColorSecondary)).to.equal(true);
    expect(wrapper.childAt(1).hasClass(classes.barColorSecondary)).to.equal(true);
    expect(wrapper.childAt(1).hasClass(classes.bar1Buffer)).to.equal(true);
    expect(wrapper.childAt(2).hasClass(classes.colorSecondary)).to.equal(true);
    expect(wrapper.childAt(2).hasClass(classes.bar2Buffer)).to.equal(true);
  });

  it('should set width of bar1 and bar2 on buffer variant', () => {
    const wrapper = shallow(<LinearProgress variant="buffer" value={77} valueBuffer={85} />);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    expect(wrapper.childAt(1).props().style.transform).to.equal('translateX(-23%)');
    expect(wrapper.childAt(2).props().style.transform).to.equal('translateX(-15%)');
  });

  it('should render with query classes', () => {
    const wrapper = shallow(<LinearProgress variant="query" />);
    expect(wrapper.hasClass(classes.root)).to.equal(true);
    expect(wrapper.hasClass(classes.query)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.barColorPrimary)).to.equal(true);
    expect(wrapper.childAt(0).hasClass(classes.bar1Indeterminate)).to.equal(true);
    expect(wrapper.childAt(1).hasClass(classes.barColorPrimary)).to.equal(true);
    expect(wrapper.childAt(1).hasClass(classes.bar2Indeterminate)).to.equal(true);
  });

  describe('prop: value', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should warn when not used as expected', () => {
      shallow(<LinearProgress variant="determinate" value={undefined} />);
      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.match(
        /Material-UI: You need to provide a value prop/,
      );
      shallow(<LinearProgress variant="buffer" value={undefined} />);
      expect(consoleErrorMock.callCount()).to.equal(3);
      expect(consoleErrorMock.messages()[1]).to.match(
        /Material-UI: You need to provide a value prop/,
      );
      expect(consoleErrorMock.messages()[2]).to.match(
        /Material-UI: You need to provide a valueBuffer prop/,
      );
    });
  });
});
