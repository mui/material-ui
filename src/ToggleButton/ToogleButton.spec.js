// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, getClasses } from '../test-utils';
import ToggleButton, { styleSheet } from './ToggleButton';
import ToggleButtonOption from './ToggleButtonOption';

describe('<ToggleButton/>', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'ToggleButton' });
    classes = getClasses(<ToggleButton />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a div with root class', () => {
    const wrapper = shallow(
      <ToggleButton>
        <ToggleButtonOption key="1" />
      </ToggleButton>,
    );
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  describe('prop: toggleIcons', () => {
    it('should render with toggleIcon class', () => {
      const wrapper = shallow(
        <ToggleButton toggleIcons>
          <ToggleButtonOption key="1" />
        </ToggleButton>,
      );
      assert.strictEqual(wrapper.hasClass(classes.toggleIcon), true);
    });
  });

  describe('user click', () => {
    it('should call onChange with appropriate params', () => {
      const handleChange = spy();
      const wrapper = mount(
        <ToggleButton>
          <ToggleButtonOption onChange={handleChange} value={2} key="1" />
        </ToggleButton>,
      );
      wrapper.find(ToggleButtonOption).at(0).simulate('click');
      assert.strictEqual(handleChange.callCount, 1, 'should have been called once');
      assert.strictEqual(
        handleChange.args[0][1],
        true,
        'should have been called with true for selected',
      );
      assert.strictEqual(handleChange.args[0][0], 2, 'should have been called with 2 for value');
      assert.strictEqual(wrapper.hasClass(classes.active), true);
      wrapper.unmount();
    });
  });
});
