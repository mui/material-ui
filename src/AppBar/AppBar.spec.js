/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import AppBar from './AppBar';
import getMuiTheme from '../styles/getMuiTheme';

describe('<AppBar />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('renders children by default', () => {
    const testChildren = <div className="unique">Hello World</div>;
    const wrapper = shallowWithContext(
      <AppBar>{testChildren}</AppBar>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
  });

  it('renders className', () => {
    const wrapper = shallowWithContext(
      <AppBar className="testClassName" />
    );

    assert.ok(wrapper.is('.testClassName'), 'should contain the className');
  });

  it('renders iconClassNameLeft', () => {
    const iconClassName = 'muidocs-icon-navigation-expand-more';
    const wrapper = shallowWithContext(
      <AppBar iconClassNameLeft={iconClassName} />
    );

    assert.equal(wrapper.find('IconButton').get(0).props.iconClassName, iconClassName,
      'should contain iconClassNameLeft');
  });

  it('renders iconClassNameRight', () => {
    const iconClassName = 'muidocs-icon-navigation-expand-more';
    const wrapper = shallowWithContext(
      <AppBar iconClassNameRight={iconClassName} />
    );

    assert.equal(wrapper.find('IconButton').get(1).props.iconClassName, iconClassName,
      'should contain iconClassNameRight');
  });

  it('renders iconClassNameLeft and iconClassNameRight', () => {
    const iconClassNameLeft = 'muidocs-icon-action-home';
    const iconClassNameRight = 'muidocs-icon-navigation-expand-more';
    const wrapper = shallowWithContext(
      <AppBar iconClassNameLeft={iconClassNameLeft} iconClassNameRight={iconClassNameRight} />
    );

    assert.equal(wrapper.find('IconButton').get(0).props.iconClassName, iconClassNameLeft,
      'should contain iconClassNameLeft');
    assert.equal(wrapper.find('IconButton').get(1).props.iconClassName, iconClassNameRight,
      'should contain iconClassNameRight');
  });

  it('renders iconElementLeft', () => {
    const wrapper = shallowWithContext(
      <AppBar iconElementLeft={<span className="icon" />} />
    );

    assert.equal(wrapper.find('.icon').length, 1, 'should contain iconElementLeft');
  });

  it('renders iconElementRight', () => {
    const wrapper = shallowWithContext(
      <AppBar iconElementRight={<span className="icon" />} />
    );

    assert.equal(wrapper.find('.icon').length, 1, 'should contain iconElementRight');
  });

  it('call onLeftIconButtonTouchTap callback', () => {
    const onLeftIconButtonTouchTap = sinon.spy();
    const iconClassNameLeft = 'muidocs-icon-action-home';
    const wrapper = shallowWithContext(
      <AppBar
        iconClassNameLeft={iconClassNameLeft}
        onLeftIconButtonTouchTap={onLeftIconButtonTouchTap}
      />
    );

    wrapper.find('IconButton').simulate('touchTap');
    assert.equal(onLeftIconButtonTouchTap.calledOnce, true,
      'should have called onLeftIconButtonTouchTap callback function');
  });

  it('call onRightIconButtonTouchTap callback', () => {
    const onRightIconButtonTouchTap = sinon.spy();
    const iconClassNameRight = 'muidocs-icon-action-home';
    const wrapper = shallowWithContext(
      <AppBar
        iconClassNameRight={iconClassNameRight}
        onRightIconButtonTouchTap={onRightIconButtonTouchTap}
      />
    );

    wrapper.find('IconButton').at(1).simulate('touchTap');
    assert.equal(onRightIconButtonTouchTap.calledOnce, true,
      'should have called onRightIconButtonTouchTap callback function');
  });

  it('call onTitleTouchTap callback', () => {
    const onTitleTouchTap = sinon.spy();
    const wrapper = shallowWithContext(
      <AppBar
        title="Title"
        onTitleTouchTap={onTitleTouchTap}
      />
    );

    wrapper.find('h1').simulate('touchTap');
    assert.equal(onTitleTouchTap.calledOnce, true,
      'should have called onTitleTouchTap callback function');
  });

  it('hide menu icon when showMenuIconButton is false', () => {
    const wrapper = shallowWithContext(
      <AppBar
        title="Title"
        showMenuIconButton={false}
      />
    );

    assert.equal(wrapper.find('IconButton').length, 0, 'should not have menu icon');
  });

  it('renders AppBar and overwrite styles', () => {
    const style = {
      backgroundColor: 'red',
    };
    const wrapper = shallowWithContext(
      <AppBar title="Title" style={style} />
    );

    assert.equal(wrapper.get(0).props.style.backgroundColor, style.backgroundColor,
      'should have backgroundColor to red');
  });

  it('renders title', () => {
    const wrapper = shallowWithContext(
      <AppBar title="Title" />
    );

    assert.equal(wrapper.find('h1').length, 1, 'should have title');
  });

  it('renders title and overwrite title styles', () => {
    const titleStyle = {
      backgroundColor: 'red',
    };
    const wrapper = shallowWithContext(
      <AppBar title="Title" titleStyle={titleStyle} />
    );

    assert.equal(wrapper.find('h1').length, 1, 'should have title');
    assert.equal(wrapper.find('h1').get(0).props.style.backgroundColor,
      titleStyle.backgroundColor, 'should have backgroundColor to red');
  });

  it('renders zDepth to paper component', () => {
    const wrapper = shallowWithContext(
      <AppBar title="Title" zDepth={2} />
    );

    assert.equal(wrapper.find('Paper').get(0).props.zDepth, 2, 'should have zDepth to 2');
  });
});
