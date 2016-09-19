/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import ListItem from './ListItem';
import NestedList from './NestedList';
import getMuiTheme from '../styles/getMuiTheme';

describe('<ListItem />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('should render an EnhancedButton', () => {
    const wrapper = shallowWithContext(
      <ListItem />
    );
    const enhancedButton = wrapper.find('EnhancedButton');
    assert.ok(enhancedButton.length);
  });

  it('should display a list-item with text if primaryText is specified', () => {
    const testText = 'Primary Text';
    const wrapper = shallowWithContext(
      <ListItem
        primaryText={testText}
      />
    );
    const enhancedButton = wrapper.find('EnhancedButton');

    assert.strictEqual(enhancedButton.children().text(), testText);
  });

  it('should display a list-item elment with a class if specified', () => {
    const testClass = 'test-class';
    const wrapper = shallowWithContext(
      <ListItem
        className={testClass}
      />
    );
    const enhancedButton = wrapper.find('EnhancedButton');
    assert.strictEqual(enhancedButton.prop('className'), testClass);
  });

  it('should display a disabled list-item if specified.', () => {
    const wrapper = shallowWithContext(
      <ListItem
        disabled={true}
      />
    );
    assert.notOk(wrapper.find('EnhancedButton').length, 'should not have an EnhancedButton');
  });

  it('should display a disabled list-item with a class if specified.', () => {
    const testClass = 'test-class';
    const wrapper = shallowWithContext(
      <ListItem
        className={testClass}
        disabled={true}
      />
    );

    assert.notOk(wrapper.find('EnhancedButton').length, 'should not have an EnhancedButton');
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

  describe('props: primaryTogglesNestedList', () => {
    it('should toggle nested list when true', () => {
      const wrapper = shallowWithContext(
        <ListItem
          leftCheckbox={<div />}
          primaryText="Item text"
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem key={1} primaryText="Nested item text" />,
          ]}
        />
      );
      const primaryTextButton = wrapper.find('EnhancedButton');

      assert.strictEqual(wrapper.find(NestedList).props().open, false);

      primaryTextButton.simulate('touchTap', {stopPropagation: () => {}});
      assert.strictEqual(wrapper.find(NestedList).props().open, true);

      primaryTextButton.simulate('touchTap', {stopPropagation: () => {}});
      assert.strictEqual(wrapper.find(NestedList).props().open, false);
    });

    it('should not render primary text button when false', () => {
      const wrapper = shallowWithContext(
        <ListItem
          leftCheckbox={<div />}
          primaryText="Item text"
          primaryTogglesNestedList={false}
          nestedItems={[
            <ListItem key={1} primaryText="Nested item text" />,
          ]}
        />
      );

      assert.strictEqual(wrapper.filter('EnhancedButton').length, 0);
    });
  });

  describe('props: open', () => {
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
  });
});
