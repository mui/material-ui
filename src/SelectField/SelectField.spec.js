/* eslint-env mocha */
import React, {PropTypes} from 'react';
import {mount} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from '../styles/getMuiTheme';

import SelectField from './SelectField';
import TouchRipple from '../internal/TouchRipple';

describe('<SelectField />', () => {
  const muiTheme = getMuiTheme();
  const mountWithContext = (node) => mount(node, {
    context: {muiTheme},
    childContextTypes: {muiTheme: PropTypes.object},
  });

  describe('prop: disabled', () => {
    it('disables the ripple effect if disabled={true} and disableTouchRipple is undefined', () => {
      const wrapper = mountWithContext(
        <SelectField disabled={true} />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 0, 'should not contain a TouchRipple');
    });
    it('disables the ripple effect if disabled={true} and disableTouchRipple={true}', () => {
      const wrapper = mountWithContext(
        <SelectField disabled={true} disableTouchRipple={true} />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 0, 'should not contain a TouchRipple');
    });
    it('does not disable the ripple effect if disabled={true} and disableTouchRipple={false}', () => {
      const wrapper = mountWithContext(
        <SelectField disabled={true} disableTouchRipple={false} />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 1, 'should not contain a TouchRipple');
    });
  });

  describe('prop: disableTouchRipple', () => {
    it('has a ripple effect by default', () => {
      const wrapper = mountWithContext(
        <SelectField />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 1, 'should contain a TouchRipple');
    });
    it('disables the ripple effect when disableTouchRipple={true} ', () => {
      const wrapper = mountWithContext(
        <SelectField disableTouchRipple={true} />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 0, 'should not contain a TouchRipple');
    });
  });
});
