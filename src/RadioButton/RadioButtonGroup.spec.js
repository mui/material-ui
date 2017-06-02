/* eslint-env mocha */

import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import RadioButtonGroup from './RadioButtonGroup';
import getMuiTheme from '../styles/getMuiTheme';

describe('<RadioButtonGroup />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('initial state', () => {
    it('should accept string valueSelected prop and set to state', () => {
      const wrapper = shallowWithContext(<RadioButtonGroup name="testGroup" valueSelected={'value'} />);
      assert.strictEqual(wrapper.state('selected'), 'value');
    });
    it('should accept truthy valueSelected prop and set to state', () => {
      const wrapper = shallowWithContext(<RadioButtonGroup name="testGroup" valueSelected={true} />);
      assert.strictEqual(wrapper.state('selected'), true);
    });
    it('should accept falsy valueSelected prop and set to state', () => {
      const wrapper = shallowWithContext(<RadioButtonGroup name="testGroup" valueSelected={false} />);
      assert.strictEqual(wrapper.state('selected'), false);
    });
    it('should accept string defaultSelected prop and set to state', () => {
      const wrapper = shallowWithContext(<RadioButtonGroup name="testGroup" defaultSelected={'value'} />);
      assert.strictEqual(wrapper.state('selected'), 'value');
    });
    it('should accept truthy defaultSelected prop and set to state', () => {
      const wrapper = shallowWithContext(<RadioButtonGroup name="testGroup" defaultSelected={true} />);
      assert.strictEqual(wrapper.state('selected'), true);
    });
    it('should accept falsy defaultSelected prop and set to state', () => {
      const wrapper = shallowWithContext(<RadioButtonGroup name="testGroup" defaultSelected={false} />);
      assert.strictEqual(wrapper.state('selected'), false);
    });
  });
});
