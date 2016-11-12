/* eslint-env mocha */
import React from 'react';
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import SvgIcon from './SvgIcon';
import getMuiTheme from '../styles/getMuiTheme';

describe('<SvgIcon />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const path = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;

  it('renders children by default', () => {
    const wrapper = shallowWithContext(
      <SvgIcon>{path}</SvgIcon>
    );

    assert.ok(wrapper.contains(path), 'should contain the children');
  });

  it('renders children and color', () => {
    const wrapper = shallowWithContext(
      <SvgIcon color="red">{path}</SvgIcon>
    );

    assert.ok(wrapper.contains(path), 'should contain the children');
    assert.equal(wrapper.node.props.style.fill, 'red', 'should have color set to red');
  });

  it('renders children and hoverColor when mouseEnter', () => {
    const onMouseEnter = spy();
    const wrapper = shallowWithContext(
      <SvgIcon
        className="material-icons"
        color="red"
        hoverColor="green"
        onMouseEnter={onMouseEnter}
      >
        {path}
      </SvgIcon>
    );

    assert.ok(wrapper.contains(path), 'should contain the children');
    assert.equal(wrapper.node.props.style.fill, 'red', 'should have color set to red');
    wrapper.simulate('mouseEnter');
    assert.equal(wrapper.node.props.style.fill, 'green', 'should have color set to green after hover');
    assert.equal(onMouseEnter.calledOnce, true,
      'should have called onMouseEnter callback function');
  });

  it('renders children and call onMouseEnter callback', () => {
    const onMouseEnter = spy();
    const wrapper = shallowWithContext(
      <SvgIcon onMouseEnter={onMouseEnter} hoverColor="green">{path}</SvgIcon>
    );

    assert.ok(wrapper.contains(path), 'should contain the children');
    wrapper.simulate('mouseEnter');
    assert.equal(onMouseEnter.calledOnce, true,
      'should have called onMouseEnter callback function');
  });

  it('renders children and call onMouseEnter callback even when hoverColor is not set', () => {
    const onMouseEnter = spy();
    const wrapper = shallowWithContext(
      <SvgIcon onMouseEnter={onMouseEnter}>{path}</SvgIcon>
    );

    assert.ok(wrapper.contains(path), 'should contain the children');
    wrapper.simulate('mouseEnter');
    assert.equal(onMouseEnter.calledOnce, true,
      'should have called onMouseEnter callback function');
  });

  it('renders children and call onMouseLeave callback', () => {
    const onMouseLeave = spy();
    const wrapper = shallowWithContext(
      <SvgIcon onMouseLeave={onMouseLeave} hoverColor="green">{path}</SvgIcon>
    );

    assert.ok(wrapper.contains(path), 'should contain the children');
    wrapper.simulate('mouseLeave');
    assert.equal(onMouseLeave.calledOnce, true,
      'should have called onMouseLeave callback function');
  });

  it('renders children and call onMouseLeave callback even when hoverColor is not set', () => {
    const onMouseLeave = spy();
    const wrapper = shallowWithContext(
      <SvgIcon onMouseLeave={onMouseLeave}>{path}</SvgIcon>
    );

    assert.ok(wrapper.contains(path), 'should contain the children');
    wrapper.simulate('mouseLeave');
    assert.equal(onMouseLeave.calledOnce, true,
      'should have called onMouseLeave callback function');
  });

  it('renders children and overwrite styles', () => {
    const style = {
      backgroundColor: 'red',
    };
    const wrapper = shallowWithContext(
      <SvgIcon style={style}>{path}</SvgIcon>
    );

    assert.equal(wrapper.get(0).props.style.backgroundColor, style.backgroundColor,
      'should have backgroundColor to red');
  });
});
