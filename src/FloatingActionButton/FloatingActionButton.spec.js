/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import FloatingActionButton from './FloatingActionButton';
import FontIcon from '../FontIcon';
import getMuiTheme from '../styles/getMuiTheme';
import ContentAdd from '../svg-icons/content/add';

describe('<FloatingActionButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('hover state', () => {
    it('should reset the hover state when disabled', () => {
      const wrapper = shallowWithContext(
        <FloatingActionButton>
          <ContentAdd />
        </FloatingActionButton>
      );
      wrapper.setState({
        hovered: true,
      });
      wrapper.setProps({
        disabled: true,
      });
      assert.strictEqual(wrapper.state().hovered, false, 'should reset the state');
    });
  });

  describe('prop: iconClassName', () => {
    it('should add a FontIcon element when using the iconClassName property', () => {
      const iconClassName = 'foo';
      const wrapper = shallowWithContext(
        <FloatingActionButton iconClassName={iconClassName} />
      );

      assert.strictEqual(wrapper.find(FontIcon).props().className, iconClassName);
    });
  });

  describe('style', () => {
    it('should apply children style', () => {
      const wrapper = shallowWithContext(
        <FloatingActionButton>
          <FontIcon
            className="material-icons"
            style={{
              transform: 'scale(1.5)',
            }}
          >
            add
          </FontIcon>
        </FloatingActionButton>
      );
      assert.strictEqual(
        wrapper.find(FontIcon).props().style.transform,
        'scale(1.5)',
        'should apply inline style'
      );
    });

    it('should work with two children', () => {
      const wrapper = shallowWithContext(
        <FloatingActionButton>
          <ContentAdd />
          <ContentAdd />
        </FloatingActionButton>
      );

      const children = wrapper.find(ContentAdd);

      assert.strictEqual(children.length, 2);
      assert.strictEqual(children.at(0).props().style.fill,
        '#ffffff',
        'should use the default style'
      );
    });
  });
});
