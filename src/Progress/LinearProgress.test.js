// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import LinearProgress from './LinearProgress';
import consoleErrorMock from '../../test/utils/consoleErrorMock';

describe('<LinearProgress />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<LinearProgress />);
  });

  it('should render a div with the root class', () => {
    const wrapper = shallow(<LinearProgress />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<LinearProgress className="woofLinearProgress" />);
    assert.strictEqual(wrapper.hasClass('woofLinearProgress'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render intermediate variant by default', () => {
    const wrapper = shallow(<LinearProgress />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.barColorPrimary),
      true,
      'should have the barColorPrimary class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.bar1Indeterminate),
      true,
      'should have the bar1Indeterminate class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.barColorPrimary),
      true,
      'should have the barColorPrimary class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.bar2Indeterminate),
      true,
      'should have the bar2Indeterminate class',
    );
  });

  it('should render for the primary color', () => {
    const wrapper = shallow(<LinearProgress color="primary" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.barColorPrimary),
      true,
      'should have the barColorPrimary class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.barColorPrimary),
      true,
      'should have the barColorPrimary class',
    );
  });

  it('should render for the secondary color', () => {
    const wrapper = shallow(<LinearProgress color="secondary" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.barColorSecondary),
      true,
      'should have the barColorSecondary class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.barColorSecondary),
      true,
      'should have the barColorSecondary class',
    );
  });

  it('should render with determinate classes for the primary color by default', () => {
    const wrapper = shallow(<LinearProgress value={1} variant="determinate" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.barColorPrimary),
      true,
      'should have the barColorPrimary class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.bar1Determinate),
      true,
      'should have the bar1Determinate class',
    );
  });

  it('should render with determinate classes for the primary color', () => {
    const wrapper = shallow(<LinearProgress color="primary" value={1} variant="determinate" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.barColorPrimary),
      true,
      'should have the barColorPrimary class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.bar1Determinate),
      true,
      'should have the bar1Determinate class',
    );
  });

  it('should render with determinate classes for the secondary color', () => {
    const wrapper = shallow(<LinearProgress color="secondary" value={1} variant="determinate" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.barColorSecondary),
      true,
      'should have the barColorSecondary class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.bar1Determinate),
      true,
      'should have the bar1Determinate class',
    );
  });

  it('should set width of bar1 on determinate variant', () => {
    const wrapper = shallow(<LinearProgress variant="determinate" value={77} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.childAt(0).props().style.transform,
      'scaleX(0.77)',
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
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
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

  it('should render with buffer classes for the secondary color', () => {
    const wrapper = shallow(
      <LinearProgress value={1} valueBuffer={1} color="secondary" variant="buffer" />,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.dashedColorSecondary),
      true,
      'should have the dashedColorSecondary class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.barColorSecondary),
      true,
      'should have the barColorSecondary class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.bar1Buffer),
      true,
      'should have the bar1Buffer class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.colorSecondary),
      true,
      'should have the colorSecondary class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.bar2Buffer),
      true,
      'should have the bar2Buffer class',
    );
  });

  it('should set width of bar1 and bar2 on buffer variant', () => {
    const wrapper = shallow(<LinearProgress variant="buffer" value={77} valueBuffer={85} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.childAt(1).props().style.transform,
      'scaleX(0.77)',
      'should have width set',
    );
    assert.strictEqual(
      wrapper.childAt(2).props().style.transform,
      'scaleX(0.85)',
      'should have width set',
    );
  });

  it('should render with query classes', () => {
    const wrapper = shallow(<LinearProgress variant="query" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.query), true, 'should have the query class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.barColorPrimary),
      true,
      'should have the barColorPrimary class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.bar1Indeterminate),
      true,
      'should have the bar1Indeterminate class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.barColorPrimary),
      true,
      'should have the barColorPrimary class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.bar2Indeterminate),
      true,
      'should have the bar2Indeterminate class',
    );
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
