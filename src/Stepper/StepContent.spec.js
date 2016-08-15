/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import StepContent from './StepContent';
import getMuiTheme from '../styles/getMuiTheme';

describe('<StepContent />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node, context = {}) => {
    return shallow(node, {
      context: {
        muiTheme,
        stepper: {orientation: 'vertical'},
        ...context,
      },
    });
  };

  it('renders a div', () => {
    const wrapper = shallowWithContext(
      <StepContent />
    );
    assert.ok(wrapper.is('div'));
  });

  it('merges styles and other props into the root node', () => {
    const wrapper = shallowWithContext(
      <StepContent
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

  it('renders children inside an ExpandTransition group', () => {
    const wrapper = shallowWithContext(
      <StepContent>
        <div className="test-content">This is my content!</div>
      </StepContent>
    );
    const transitionGroup = wrapper.find('ExpandTransition');
    assert.ok(transitionGroup.length);
    const content = transitionGroup.find('.test-content');
    assert.ok(content.length);
    assert.strictEqual(content.props().children, 'This is my content!');
  });
});
