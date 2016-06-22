/* eslint-env mocha */
import React from 'react';
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import AppBar, {getStyles} from './AppBar';
import getMuiTheme from '../styles/getMuiTheme';
import IconButton from '../IconButton';

describe('<AppBar />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('renders children by default', () => {
    const testChildren = <div />;
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

    assert.strictEqual(wrapper.find(IconButton).get(0).props.iconClassName, iconClassName,
      'should contain iconClassNameLeft');
  });

  it('renders iconClassNameRight', () => {
    const iconClassName = 'muidocs-icon-navigation-expand-more';
    const wrapper = shallowWithContext(
      <AppBar iconClassNameRight={iconClassName} />
    );

    assert.strictEqual(wrapper.find(IconButton).get(1).props.iconClassName, iconClassName,
      'should contain iconClassNameRight');
  });

  it('renders iconClassNameLeft and iconClassNameRight', () => {
    const iconClassNameLeft = 'muidocs-icon-action-home';
    const iconClassNameRight = 'muidocs-icon-navigation-expand-more';
    const wrapper = shallowWithContext(
      <AppBar iconClassNameLeft={iconClassNameLeft} iconClassNameRight={iconClassNameRight} />
    );

    assert.strictEqual(wrapper.find(IconButton).get(0).props.iconClassName, iconClassNameLeft,
      'should contain iconClassNameLeft');
    assert.strictEqual(wrapper.find(IconButton).get(1).props.iconClassName, iconClassNameRight,
      'should contain iconClassNameRight');
  });

  describe('iconElementLeft', () => {
    it('renders the node', () => {
      const wrapper = shallowWithContext(
        <AppBar iconElementLeft={<span className="icon" />} />
      );

      assert.strictEqual(wrapper.find('.icon').length, 1, 'should contain iconElementLeft');
    });

    it('renders the IconButton with a correct style', () => {
      const wrapper = shallowWithContext(
        <AppBar iconElementLeft={<IconButton><div /></IconButton>} />
      );

      assert.strictEqual(
        Object.keys(wrapper.find(IconButton).get(0).props.iconStyle).length > 0,
        true,
        'should add some properties to the iconStyle'
      );
    });
  });

  it('renders iconElementRight', () => {
    const wrapper = shallowWithContext(
      <AppBar iconElementRight={<span className="icon" />} />
    );

    assert.strictEqual(wrapper.find('.icon').length, 1, 'should contain iconElementRight');
  });

  it('call onLeftIconButtonTouchTap callback', () => {
    const onLeftIconButtonTouchTap = spy();
    const iconClassNameLeft = 'muidocs-icon-action-home';
    const wrapper = shallowWithContext(
      <AppBar
        iconClassNameLeft={iconClassNameLeft}
        onLeftIconButtonTouchTap={onLeftIconButtonTouchTap}
      />
    );

    wrapper.find(IconButton).simulate('touchTap');
    assert.strictEqual(onLeftIconButtonTouchTap.calledOnce, true,
      'should have called onLeftIconButtonTouchTap callback function');
  });

  it('call onRightIconButtonTouchTap callback', () => {
    const onRightIconButtonTouchTap = spy();
    const iconClassNameRight = 'muidocs-icon-action-home';
    const wrapper = shallowWithContext(
      <AppBar
        iconClassNameRight={iconClassNameRight}
        onRightIconButtonTouchTap={onRightIconButtonTouchTap}
      />
    );

    wrapper.find(IconButton).at(1).simulate('touchTap');
    assert.strictEqual(onRightIconButtonTouchTap.calledOnce, true,
      'should have called onRightIconButtonTouchTap callback function');
  });

  it('call onTitleTouchTap callback', () => {
    const onTitleTouchTap = spy();
    const wrapper = shallowWithContext(
      <AppBar title="Title" onTitleTouchTap={onTitleTouchTap} />
    );

    wrapper.find('h1').simulate('touchTap');
    assert.strictEqual(onTitleTouchTap.calledOnce, true,
      'should have called onTitleTouchTap callback function');
  });

  it('hide menu icon when showMenuIconButton is false', () => {
    const wrapper = shallowWithContext(
      <AppBar title="Title" showMenuIconButton={false} />
    );

    assert.strictEqual(wrapper.find(IconButton).length, 0, 'should not have menu icon');
  });

  it('renders AppBar and overwrite styles', () => {
    const style = {
      backgroundColor: 'red',
    };
    const wrapper = shallowWithContext(
      <AppBar title="Title" style={style} />
    );

    assert.strictEqual(wrapper.get(0).props.style.backgroundColor, style.backgroundColor,
      'should have backgroundColor to red');
  });

  it('renders title', () => {
    const wrapper = shallowWithContext(
      <AppBar title="Title" />
    );

    assert.strictEqual(wrapper.find('h1').length, 1, 'should have title');
  });

  it('renders title and overwrite title styles', () => {
    const titleStyle = {
      backgroundColor: 'red',
    };
    const wrapper = shallowWithContext(
      <AppBar title="Title" titleStyle={titleStyle} />
    );

    assert.strictEqual(wrapper.find('h1').length, 1, 'should have title');
    assert.strictEqual(wrapper.find('h1').get(0).props.style.backgroundColor,
      titleStyle.backgroundColor, 'should have backgroundColor to red');
  });

  it('renders zDepth to paper component', () => {
    const wrapper = shallowWithContext(
      <AppBar title="Title" zDepth={2} />
    );

    assert.strictEqual(wrapper.find('Paper').get(0).props.zDepth, 2, 'should have zDepth to 2');
  });

  it('menuElementLeft\'s style should be iconButtonStyle', () => {
    const wrapper = shallowWithContext(
      <AppBar />
    );

    const menuElementLeft = wrapper.find(IconButton).get(0);
    const style = menuElementLeft.props.style;
    const iconButtonStyle = getStyles(wrapper.props(), wrapper.context()).iconButtonStyle;
    assert.deepEqual(style, iconButtonStyle, 'style should be iconButtonStyle');
  });

  it('if pass iconStyleLeft={marginTop}, change the marginTop only', () => {
    const wrapper = shallowWithContext(
      <AppBar iconStyleLeft={{marginTop: 99}} />
    );

    const menuElementLeft = wrapper.find(IconButton).get(0);
    const style = menuElementLeft.props.style;
    const iconButtonStyle = getStyles(wrapper.props(), wrapper.context()).iconButtonStyle;
    const expectedStyle = Object.assign({}, iconButtonStyle, {marginTop: 99});
    assert.deepEqual(style, expectedStyle, 'should be change style.marginTop only');
  });

  it('if pass iconElementLeft and iconStyleLeft={marginTop}, change the marginTop/muiPrepared only', () => {
    const wrapper = shallowWithContext(
      <AppBar iconElementLeft={<span>foo</span>} iconStyleLeft={{marginTop: 99}} />
    );

    const menuElementLeft = wrapper.find('div').get(0);
    const style = menuElementLeft.props.style;
    const iconButtonStyle = getStyles(wrapper.props(), wrapper.context()).iconButtonStyle;
    const expectedStyle = Object.assign({}, iconButtonStyle, {marginTop: 99, muiPrepared: true});
    assert.deepEqual(style, expectedStyle, 'should be change style.marginTop/muiPrepared only');
  });
});
