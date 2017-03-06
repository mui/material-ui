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
    it('disables the ripple effect', () => {
      const wrapper = mountWithContext(
        <SelectField disabled={true} />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 0, 'should not contain a TouchRipple');
    });
  });
});
