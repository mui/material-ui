/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import StepContent from './StepContent';
import Collapse from '../transitions/Collapse';

describe('<StepContent />', () => {
  let shallow;
  let mount;
  const defaultProps = {
    orientation: 'vertical',
  };

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('renders a div', () => {
    const wrapper = shallow(<StepContent {...defaultProps}>Here is the content</StepContent>);
    assert.ok(wrapper.is('div'));
  });

  it('merges styles and other props into the root node', () => {
    const wrapper = shallow(
      <StepContent
        style={{ paddingRight: 200, color: 'purple', border: '1px solid tomato' }}
        role="Tabpanel"
        {...defaultProps}
      >
        Lorem ipsum
      </StepContent>,
    );
    const { style, role } = wrapper.props();
    assert.strictEqual(style.paddingRight, 200);
    assert.strictEqual(style.color, 'purple');
    assert.strictEqual(style.border, '1px solid tomato');
    assert.strictEqual(role, 'Tabpanel');
  });

  it('renders children inside an Collapse component', () => {
    const wrapper = shallow(
      <StepContent {...defaultProps}>
        <div className="test-content">This is my content!</div>
      </StepContent>,
    );
    const collapse = wrapper.find(Collapse);
    assert.ok(collapse.length);
    const content = collapse.find('.test-content');
    assert.ok(content.length);
    assert.strictEqual(content.props().children, 'This is my content!');
  });
});
