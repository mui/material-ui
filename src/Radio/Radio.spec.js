// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Radio, { styleSheet } from './Radio';

describe('<Radio />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a SwitchBase', () => {
    const wrapper = shallow(
      <Radio />,
    );
    assert.strictEqual(wrapper.is('SwitchBase'), true, 'should be a SwitchBase');
  });

  it('should render with the default and checked classes', () => {
    const wrapper = shallow(<Radio checked className="woof" checkedClassName="meow" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.default), true, 'should have the default class');
    assert.strictEqual(
      wrapper.prop('checkedClassName').indexOf('meow') !== -1,
      true,
      'should have the "meow" class',
    );
    assert.strictEqual(
      wrapper.prop('checkedClassName').indexOf(classes.checked) !== -1,
      true,
      'should have the checked class',
    );
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<Radio data-my-prop="woof" />);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });

  describe('integrated label', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Radio label="Pizza" />,
      );
    });

    it('should render the SwitchBase inside a label', () => {
      assert.strictEqual(wrapper.is('label'), true, 'should render a label');
      assert.strictEqual(
        wrapper.prop('role'),
        'presentation',
        'should set the role to presentation for screen readers',
      );
      assert.strictEqual(wrapper.childAt(0).is('SwitchBase'), true, 'should be the SwitchBase');
    });

    it('should render the label text inside an additional span', () => {
      assert.strictEqual(wrapper.childAt(1).is('span'), true, 'should render a span after the SwitchBase');
      assert.strictEqual(
        wrapper.childAt(1).prop('role'),
        'presentation',
        'should set the role to presentation for screen readers',
      );
      assert.strictEqual(
        wrapper.childAt(1).prop('aria-hidden'),
        'true',
        'should set to aria hidden for screen readers',
      );
      assert.strictEqual(wrapper.childAt(1).childAt(0).node, 'Pizza', 'should be the label text');
    });
  });
});
