// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import SelectionLabel, { styleSheet } from './SelectionLabel';

describe('<SelectionLabel />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <SelectionLabel
        label="Pizza"
        labelClassName="foo"
        labelReverse={false}
        disabled={false}
      />,
    );
  });

  it('should render a label', () => {
    assert.strictEqual(wrapper.is('label'), true, 'should be a label');
  });

  it('should render the label text inside an additional span', () => {
    const span = wrapper.childAt(0);
    assert.strictEqual(span.is('span'), true, 'should render a span');
    assert.strictEqual(span.childAt(0).node, 'Pizza', 'should be the label text');
  });

  it('should render with accessibility attributes', () => {
    assert.strictEqual(
      wrapper.prop('role'),
      'presentation',
      'should set the role to presentation for screen readers',
    );
    const span = wrapper.childAt(0);
    assert.strictEqual(
      span.prop('role'),
      'presentation',
      'should set the span role to presentation for screen readers',
    );
    assert.strictEqual(
      span.prop('aria-hidden'),
      'true',
      'should set to aria hidden for screen readers',
    );
  });

  it('should render with the default and custom classes', () => {
    assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the "foo" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the "root" class');
  });

  describe('prop: disabled', () => {
    it('should disable the component', () => {
      wrapper.setProps({
        disabled: true,
      });

      assert.strictEqual(
        wrapper.childAt(0).hasClass(classes.disabled),
        true,
        'should have the disabled class',
      );
    });
  });
});
