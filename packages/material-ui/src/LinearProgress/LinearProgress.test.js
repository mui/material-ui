import React from 'react';
import { assert } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
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
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.indeterminate), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Indeterminate), true);
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true);
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar2Indeterminate), true);
  });

  it('should render for the primary color', () => {
    const wrapper = shallow(<LinearProgress color="primary" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true);
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true);
  });

  it('should render for the secondary color', () => {
    const wrapper = shallow(<LinearProgress color="secondary" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorSecondary), true);
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorSecondary), true);
  });

  it('should render with determinate classes for the primary color by default', () => {
    const wrapper = shallow(<LinearProgress value={1} variant="determinate" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.determinate), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Determinate), true);
  });

  it('should render with determinate classes for the primary color', () => {
    const wrapper = shallow(<LinearProgress color="primary" value={1} variant="determinate" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.determinate), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Determinate), true);
  });

  it('should render with determinate classes for the secondary color', () => {
    const wrapper = shallow(<LinearProgress color="secondary" value={1} variant="determinate" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.determinate), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorSecondary), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Determinate), true);
  });

  it('should set width of bar1 on determinate variant', () => {
    const wrapper = shallow(<LinearProgress variant="determinate" value={77} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.determinate), true);
    assert.strictEqual(
      wrapper.childAt(0).props().style.transform,
      'translateX(-23%)',
      'should have width set',
    );
    assert.strictEqual(wrapper.props()['aria-valuenow'], 77);
  });

  it('should render with buffer classes for the primary color by default', () => {
    const wrapper = shallow(<LinearProgress value={1} valueBuffer={1} variant="buffer" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.dashedColorPrimary),
      true,
      'should have the dashedColorPrimary class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.barColorPrimary),
      true,
      'should have the barColorPrimary class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.bar1Buffer),
      true,
      'should have the bar1Buffer class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.colorPrimary),
      true,
      'should have the colorPrimary class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.bar2Buffer),
      true,
      'should have the bar2Buffer class',
    );
  });

  it('should render with buffer classes for the primary color', () => {
    const wrapper = shallow(
      <LinearProgress value={1} valueBuffer={1} color="primary" variant="buffer" />,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.dashedColorPrimary), true);
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true);
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar1Buffer), true);
    assert.strictEqual(wrapper.childAt(2).hasClass(classes.colorPrimary), true);
    assert.strictEqual(wrapper.childAt(2).hasClass(classes.bar2Buffer), true);
  });

  it('should render with buffer classes for the secondary color', () => {
    const wrapper = shallow(
      <LinearProgress value={1} valueBuffer={1} color="secondary" variant="buffer" />,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.dashedColorSecondary), true);
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorSecondary), true);
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar1Buffer), true);
    assert.strictEqual(wrapper.childAt(2).hasClass(classes.colorSecondary), true);
    assert.strictEqual(wrapper.childAt(2).hasClass(classes.bar2Buffer), true);
  });

  it('should set width of bar1 and bar2 on buffer variant', () => {
    const wrapper = shallow(<LinearProgress variant="buffer" value={77} valueBuffer={85} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.childAt(1).props().style.transform,
      'translateX(-23%)',
      'should have width set',
    );
    assert.strictEqual(
      wrapper.childAt(2).props().style.transform,
      'translateX(-15%)',
      'should have width set',
    );
  });

  it('should render with query classes', () => {
    const wrapper = shallow(<LinearProgress variant="query" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.query), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Indeterminate), true);
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true);
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar2Indeterminate), true);
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
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.match(
        consoleErrorMock.args()[0][0],
        /Warning: Material-UI: you need to provide a value property/,
      );
      shallow(<LinearProgress variant="buffer" value={undefined} />);
      assert.strictEqual(consoleErrorMock.callCount(), 3);
      assert.match(
        consoleErrorMock.args()[1][0],
        /Warning: Material-UI: you need to provide a value property/,
      );
      assert.match(
        consoleErrorMock.args()[2][0],
        /Warning: Material-UI: you need to provide a valueBuffer property/,
      );
    });
  });
});
