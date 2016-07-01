/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Step from './Step';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Step />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node, context = {}) => {
    return shallow(node, {
      context: {
        muiTheme,
        stepper: {orientation: 'horizontal'},
        ...context,
      },
    });
  };

  it('merges styles and other props into the root node', () => {
    const wrapper = shallowWithContext(
      <Step
        style={{paddingRight: 200, color: 'purple', border: '1px solid tomato'}}
        role="hello"
      />
    );
    const {style, role} = wrapper.props();
    assert.strictEqual(style.paddingRight, 200);
    assert.strictEqual(style.color, 'purple');
    assert.strictEqual(style.border, '1px solid tomato');
    assert.strictEqual(role, 'hello');
  });

  describe('rendering children', () => {
    it('renders children', () => {
      const children = <h1 className="hello-world">Hello World</h1>;
      const wrapper = shallowWithContext(
        <Step label="Step One">{children}</Step>
      );
      assert.strictEqual(wrapper.find('.hello-world').length, 1);
    });

    it('renders children with all props passed through', () => {
      const children = [
        <h1 key={1} className="hello-world">Hello World</h1>,
        <p key={2} className="hay">How are you?</p>,
      ];
      const wrapper = shallowWithContext(
        <Step
          active={false}
          completed={true}
          disabled={true}
          index={0}
        >
          {children}
        </Step>
      );
      const child1 = wrapper.find('.hello-world');
      const child2 = wrapper.find('.hay');
      [child1, child2].forEach((child) => {
        assert.strictEqual(child.length, 1);
        assert.strictEqual(child.prop('active'), false);
        assert.strictEqual(child.prop('completed'), true);
        assert.strictEqual(child.prop('disabled'), true);
        assert.strictEqual(child.prop('icon'), 1);
      });
    });

    it('honours children overriding props passed through', () => {
      const children = (
        <h1 active={false} className="hello-world">Hello World</h1>
      );
      const wrapper = shallowWithContext(
        <Step active={true} label="Step One">{children}</Step>
      );
      const childWrapper = wrapper.find('.hello-world');
      assert.strictEqual(childWrapper.prop('active'), false);
    });
  });
});
