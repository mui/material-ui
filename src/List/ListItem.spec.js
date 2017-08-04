/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';
import ListItem from './ListItem';
import EnhancedButton from '../internal/EnhancedButton';
import getMuiTheme from '../styles/getMuiTheme';
import NestedList from './NestedList';

describe('<ListItem />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('should render an EnhancedButton', () => {
    const wrapper = shallowWithContext(
      <ListItem />
    );
    const enhancedButton = wrapper.find(EnhancedButton);
    assert.ok(enhancedButton.length);
  });

  it('should display a list-item with text if primaryText is specified', () => {
    const testText = 'Primary Text';
    const wrapper = shallowWithContext(
      <ListItem
        primaryText={testText}
      />
    );
    const enhancedButton = wrapper.find(EnhancedButton);

    assert.strictEqual(enhancedButton.children().text(), testText);
  });

  it('should display a list-item elment with a class if specified', () => {
    const testClass = 'test-class';
    const wrapper = shallowWithContext(
      <ListItem
        className={testClass}
      />
    );
    const enhancedButton = wrapper.find(EnhancedButton);
    assert.strictEqual(enhancedButton.prop('className'), testClass);
  });

  it('should display a disabled list-item if specified.', () => {
    const wrapper = shallowWithContext(
      <ListItem
        disabled={true}
      />
    );
    assert.notOk(wrapper.find(EnhancedButton).length, 'should not have an EnhancedButton');
  });

  it('should display a disabled list-item with a class if specified.', () => {
    const testClass = 'test-class';
    const wrapper = shallowWithContext(
      <ListItem
        className={testClass}
        disabled={true}
      />
    );

    assert.notOk(wrapper.find(EnhancedButton).length, 'should not have an EnhancedButton');
    assert.strictEqual(wrapper.find(`.${testClass}`).length, 1, 'should have a div with the test class');
  });

  it('should display a checkbox in the list-item if specified.', () => {
    const testClass = 'test-class';
    const wrapper = shallowWithContext(
      <ListItem
        leftCheckbox={<div className="test-checkbox" />}
        className={testClass}
      />
    );
    assert.ok(wrapper.find('.test-checkbox').length);
    assert.strictEqual(wrapper.find(`.${testClass}`).length, 1, 'should have a div with the test class');
  });

  it('should trigger onClick handler when appropriate.', () => {
    const onClick = spy();
    const wrapper = shallowWithContext(
      <ListItem
        onClick={onClick}
      />
    );
    const primaryTextButton = wrapper.find(EnhancedButton);

    primaryTextButton.simulate('click', {stopPropagation: () => {}});
    assert.strictEqual(onClick.callCount, 1);
  });

  describe('prop: primaryTogglesNestedList', () => {
    it('should toggle nested list when true', () => {
      const wrapper = shallowWithContext(
        <ListItem
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem key={1} />,
          ]}
        />
      );
      const primaryTextButton = wrapper.find(EnhancedButton);

      assert.strictEqual(wrapper.find(NestedList).props().open, false);

      primaryTextButton.simulate('click', {preventDefault: () => {}, stopPropagation: () => {}});
      assert.strictEqual(wrapper.find(NestedList).props().open, true);

      primaryTextButton.simulate('click', {preventDefault: () => {}, stopPropagation: () => {}});
      assert.strictEqual(wrapper.find(NestedList).props().open, false);
    });

    it('should not render primary text button when false', () => {
      const wrapper = shallowWithContext(
        <ListItem
          primaryTogglesNestedList={false}
          nestedItems={[
            <ListItem key={1} />,
          ]}
        />
      );

      assert.strictEqual(wrapper.filter(EnhancedButton).length, 0);
    });
  });

  describe('prop: open', () => {
    it('should initially open nested list', () => {
      const wrapper = shallowWithContext(
        <ListItem
          initiallyOpen={true}
          nestedItems={[
            <ListItem key={1} />,
          ]}
        />
      );

      assert.strictEqual(wrapper.find(NestedList).length > 0, true);
      assert.strictEqual(wrapper.find(NestedList).props().open, true);
    });

    it('should toggle nested list', () => {
      const wrapper = shallowWithContext(
        <ListItem
          open={false}
          nestedItems={[
            <ListItem key={1} />,
          ]}
        />
      );

      assert.strictEqual(wrapper.find(NestedList).props().open, false);
      wrapper.setProps({
        open: true,
      });
      assert.strictEqual(wrapper.find(NestedList).props().open, true);
    });

    it('should not control the state', () => {
      const wrapper = shallowWithContext(
        <ListItem
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem key={1} />,
          ]}
        />
      );

      const primaryTextButton = wrapper.find(EnhancedButton);
      primaryTextButton.simulate('click', {preventDefault: () => {}, stopPropagation: () => {}});
      assert.strictEqual(wrapper.find(NestedList).props().open, true);
    });

    it('should control the state', () => {
      const wrapper = shallowWithContext(
        <ListItem
          open={false}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem key={1} />,
          ]}
        />
      );

      const primaryTextButton = wrapper.find(EnhancedButton);
      primaryTextButton.simulate('click', {preventDefault: () => {}, stopPropagation: () => {}});
      assert.strictEqual(wrapper.find(NestedList).props().open, false);
    });
  });

  describe('prop: hoverColor', () => {
    const testColor = '#ededed';

    it('should use a background color on hover if hoverColor is specified', () => {
      const wrapper = shallowWithContext(
        <ListItem hoverColor={testColor} />
      );
      wrapper.find(EnhancedButton).simulate('mouseEnter');
      assert.strictEqual(wrapper.find(EnhancedButton).props().style.backgroundColor, testColor);
    });

    it('should use a background color if isKeyboardFocused is true', () => {
      const wrapper = shallowWithContext(
        <ListItem hoverColor={testColor} isKeyboardFocused={true} />
      );
      assert.strictEqual(wrapper.find(EnhancedButton).props().style.backgroundColor, testColor);
    });
  });

  describe('hover state', () => {
    it('should reset the hover state when disabled', () => {
      const wrapper = shallowWithContext(
        <ListItem primaryText="foo" />
      );

      wrapper.find(EnhancedButton).simulate('mouseEnter');
      assert.strictEqual(wrapper.state().hovered, true, 'should respond to the event');
      wrapper.setProps({
        disabled: true,
      });
      assert.strictEqual(wrapper.state().hovered, false, 'should reset the state');
    });
  });

  describe('prop: containerElement', () => {
    it('should use the given string containerElement prop', () => {
      const wrapper = shallowWithContext(
        <ListItem
          containerElement="a"
          primaryText="Links are great"
        />
      );
      const button = wrapper.find(EnhancedButton).dive({context: {muiTheme}});
      assert.strictEqual(button.is('a'), true, 'should match an a element');
    });

    it('should use the given ReactElement containerElement', () => {
      const CustomElement = (props) => <a {...props} />;
      const wrapper = shallowWithContext(
        <ListItem
          containerElement={<CustomElement someProp="yuuuuuge" />}
          primaryText="Custom links are even greater"
        />
      );
      const button = wrapper.find(EnhancedButton).dive({context: {muiTheme}});
      assert.strictEqual(button.is(CustomElement), true, 'should match the custom element');
    });
  });
});
