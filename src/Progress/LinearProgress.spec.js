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

  it('should render intermediate mode by default', () => {
    const wrapper = shallow(<LinearProgress />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryColorBar),
      true,
      'should have the primaryColorBar class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.indeterminateBar1),
      true,
      'should have the indeterminateBar1 class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.primaryColorBar),
      true,
      'should have the primaryColorBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.indeterminateBar2),
      true,
      'should have the indeterminateBar2 class',
    );
  });

  it('should render for the primary color', () => {
    const wrapper = shallow(<LinearProgress color="primary" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryColorBar),
      true,
      'should have the primaryColorBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.primaryColorBar),
      true,
      'should have the primaryColorBar class',
    );
  });

  it('should render for the secondary color', () => {
    const wrapper = shallow(<LinearProgress color="secondary" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.secondaryColorBar),
      true,
      'should have the secondaryColorBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.secondaryColorBar),
      true,
      'should have the secondaryColorBar class',
    );
  });

  it('should render with determinate classes for the primary color by default', () => {
    const wrapper = shallow(<LinearProgress value={1} mode="determinate" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryColorBar),
      true,
      'should have the primaryColorBar class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.determinateBar1),
      true,
      'should have the determinateBar1 class',
    );
  });

  it('should render with determinate classes for the primary color', () => {
    const wrapper = shallow(<LinearProgress color="primary" value={1} mode="determinate" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryColorBar),
      true,
      'should have the primaryColorBar class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.determinateBar1),
      true,
      'should have the determinateBar1 class',
    );
  });

  it('should render with determinate classes for the secondary color', () => {
    const wrapper = shallow(<LinearProgress color="secondary" value={1} mode="determinate" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.secondaryColorBar),
      true,
      'should have the secondaryColorBar class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.determinateBar1),
      true,
      'should have the determinateBar1 class',
    );
  });

  it('should set width of bar1 on determinate mode', () => {
    const wrapper = shallow(<LinearProgress mode="determinate" value={77} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.childAt(0).props().style.transform,
      'scaleX(0.77)',
      'should have width set',
    );
    assert.strictEqual(wrapper.props()['aria-valuenow'], 77);
  });

  it('should render with buffer classes for the primary color by default', () => {
    const wrapper = shallow(<LinearProgress value={1} valueBuffer={1} mode="buffer" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryDashed),
      true,
      'should have the primaryDashed class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.primaryColorBar),
      true,
      'should have the primaryColorBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.bufferBar1),
      true,
      'should have the bufferBar1 class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.primaryColor),
      true,
      'should have the primaryColor class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.bufferBar2),
      true,
      'should have the bufferBar2 class',
    );
  });

  it('should render with buffer classes for the primary color', () => {
    const wrapper = shallow(
      <LinearProgress value={1} valueBuffer={1} color="primary" mode="buffer" />,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryDashed),
      true,
      'should have the primaryDashed class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.primaryColorBar),
      true,
      'should have the primaryColorBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.bufferBar1),
      true,
      'should have the bufferBar1 class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.primaryColor),
      true,
      'should have the primaryColor class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.bufferBar2),
      true,
      'should have the bufferBar2 class',
    );
  });

  it('should render with buffer classes for the secondary color', () => {
    const wrapper = shallow(
      <LinearProgress value={1} valueBuffer={1} color="secondary" mode="buffer" />,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.secondaryDashed),
      true,
      'should have the secondaryDashed class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.secondaryColorBar),
      true,
      'should have the secondaryColorBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.bufferBar1),
      true,
      'should have the bufferBar1 class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.secondaryColor),
      true,
      'should have the secondaryColor class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.bufferBar2),
      true,
      'should have the bufferBar2 class',
    );
  });

  it('should set width of bar1 and bar2 on buffer mode', () => {
    const wrapper = shallow(<LinearProgress mode="buffer" value={77} valueBuffer={85} />);
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
    const wrapper = shallow(<LinearProgress mode="query" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper.hasClass(classes.rootQuery),
      true,
      'should have the rootQuery class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryColorBar),
      true,
      'should have the primaryColorBar class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.indeterminateBar1),
      true,
      'should have the indeterminateBar1 class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.primaryColorBar),
      true,
      'should have the primaryColorBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.indeterminateBar2),
      true,
      'should have the indeterminateBar2 class',
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
      shallow(<LinearProgress mode="determinate" value={undefined} />);
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.match(
        consoleErrorMock.args()[0][0],
        /Warning: Material-UI: you need to provide a value property/,
      );
      shallow(<LinearProgress mode="buffer" value={undefined} />);
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
