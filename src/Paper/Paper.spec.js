/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Paper from './Paper';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Paper />', () => {
  const testChildren = <div className="unique">Hello World</div>;
  const theme = getMuiTheme();

  it('renders children by default', () => {
    const wrapper = shallow(
      <Paper>{testChildren}</Paper>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
  });

  it('renders children and have borderRadius by default', () => {
    const wrapper = shallow(
      <Paper>{testChildren}</Paper>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
    assert.strictEqual(wrapper.prop('style').borderRadius, '2px', 'should have round corner');
  });

  it('renders children and should be a circle', () => {
    const wrapper = shallow(
      <Paper circle={true}>{testChildren}</Paper>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
    assert.strictEqual(wrapper.prop('style').borderRadius, '50%', 'should be a circle');
  });

  it('renders children and does not have rounded corners', () => {
    const wrapper = shallow(
      <Paper rounded={false}>{testChildren}</Paper>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
    assert.strictEqual(wrapper.prop('style').borderRadius, '0px', 'should not have borderRadius');
  });

  it('renders children and overwrite styles', () => {
    const style = {
      backgroundColor: 'red',
      borderRadius: '70px',
    };
    const wrapper = shallow(
      <Paper style={style}>{testChildren}</Paper>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
    assert.strictEqual(wrapper.prop('style').backgroundColor, 'red', 'should have red backgroundColor');
    assert.strictEqual(wrapper.prop('style').borderRadius, '70px', 'should have borderRadius');
  });

  it('renders children and has css transitions by default', () => {
    const wrapper = shallow(
      <Paper>{testChildren}</Paper>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
    assert.ok(wrapper.prop('style').transition, 'should have css transitions');
  });

  it('renders children and disable css transitions', () => {
    const wrapper = shallow(
      <Paper transitionEnabled={false}>{testChildren}</Paper>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
    assert.isNotOk(wrapper.prop('style').transition, 'should not have css transitions');
  });

  it('renders children and change zDepth', () => {
    const zDepth = 3;
    const wrapper = shallow(
      <Paper zDepth={zDepth}>{testChildren}</Paper>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
    assert.strictEqual(wrapper.prop('style').boxShadow, theme.paper.zDepthShadows[zDepth - 1],
      'should have good zDepthShadows');
  });
});
