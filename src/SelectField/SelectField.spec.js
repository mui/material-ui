import React, {PropTypes} from 'react';
import {mount, shallow} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from '../styles/getMuiTheme';

import SelectField from './SelectField';
import DropDownMenu from '../DropDownMenu';
import IconButton from '../IconButton';
import TouchRipple from '../internal/TouchRipple';

describe('<SelectField />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, { context: { muiTheme } });
  const mountWithContext = (node) => mount(node, {
    context: {muiTheme},
    childContextTypes: {muiTheme: PropTypes.object},
  });

  describe('prop: disabled', () => {
    it('disables the ripple effect if disabled={true} and disableTouchRipple is undefined', () => {
      const wrapper = mountWithContext(
        <SelectField disabled />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 0, 'should not contain a TouchRipple')
    });
    it('disables the ripple effect if disabled={true} and disableTouchRipple={true}', () => {
      const wrapper = mountWithContext(
        <SelectField disabled disableTouchRipple />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 0, 'should not contain a TouchRipple')
    });
    it('does not disable the ripple effect if disabled={true} and disableTouchRipple={false}', () => {
      const wrapper = mountWithContext(
        <SelectField disabled disableTouchRipple={false} />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 1, 'should not contain a TouchRipple')
    });
  });

  describe('prop: disableTouchRipple', () => {
    it('has a ripple effect by default', () => {
      const wrapper = mountWithContext(
        <SelectField />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 1, 'should contain a TouchRipple')
    });
    it('disables the ripple effect when disableTouchRipple={true} ', () => {
      const wrapper = mountWithContext(
        <SelectField disableTouchRipple />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 0, 'should not contain a TouchRipple')
    });
  });
});
