/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import FontIcon from './FontIcon';
import getMuiTheme from '../styles/getMuiTheme';

describe('<FontIcon />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('renders className', () => {
    const wrapper = shallowWithContext(
      <FontIcon
        className="muidocs-icon-action-home"
      />
    );

    assert.ok(wrapper.is('.muidocs-icon-action-home'), 'should contain the className');
  });

  it('renders children by default', () => {
    const wrapper = shallowWithContext(
      <FontIcon className="material-icons">home</FontIcon>
    );

    assert.ok(wrapper.contains('home'), 'should contain the children');
  });

  it('renders children and color', () => {
    const wrapper = shallowWithContext(
      <FontIcon className="material-icons" color="red">home</FontIcon>
    );

    assert.ok(wrapper.contains('home'), 'should contain the children');
    assert.equal(wrapper.node.props.style.color, 'red', 'should have color set to red');
  });

  it('renders children and hoverColor when mouseEnter', () => {
    const onMouseEnter = sinon.spy();
    const wrapper = shallowWithContext(
      <FontIcon
        className="material-icons"
        color="red"
        hoverColor="green"
        onMouseEnter={onMouseEnter}
      >
        home
      </FontIcon>
    );

    assert.ok(wrapper.contains('home'), 'should contain the children');
    assert.equal(wrapper.node.props.style.color, 'red', 'should have color set to red');
    wrapper.simulate('mouseEnter');
    assert.equal(wrapper.node.props.style.color, 'green', 'should have color set to green after hover');
    assert.equal(onMouseEnter.calledOnce, true,
      'should have called onMouseEnter callback function');
  });

  it('renders children and call onMouseEnter callback', () => {
    const onMouseEnter = sinon.spy();
    const wrapper = shallowWithContext(
      <FontIcon className="material-icons" onMouseEnter={onMouseEnter}>home</FontIcon>
    );

    wrapper.simulate('mouseEnter');
    assert.ok(wrapper.contains('home'), 'should contain the children');
    assert.equal(onMouseEnter.calledOnce, true,
      'should have called onMouseEnter callback function');
  });

  it('renders children and call onMouseLeave callback', () => {
    const onMouseLeave = sinon.spy();
    const wrapper = shallowWithContext(
      <FontIcon className="material-icons" onMouseLeave={onMouseLeave}>home</FontIcon>
    );

    wrapper.simulate('mouseLeave');
    assert.ok(wrapper.contains('home'), 'should contain the children');
    assert.equal(onMouseLeave.calledOnce, true,
      'should have called onMouseLeave callback function');
  });

  it('renders children and overwrite styles', () => {
    const style = {
      backgroundColor: 'red',
    };
    const wrapper = shallowWithContext(
      <FontIcon className="material-icons" style={style}>home</FontIcon>
    );

    assert.equal(wrapper.get(0).props.style.backgroundColor, style.backgroundColor,
      'should have backgroundColor to red');
  });
});
