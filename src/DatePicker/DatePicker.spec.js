/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';

import DatePicker from './DatePicker';
import getMuiTheme from '../styles/getMuiTheme';
import TextField from '../TextField';

describe('<DatePicker />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('formatDate', () => {
    it('should use the default format', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      const wrapper = shallowWithContext(
        <DatePicker value={initialDate} />
      );

      assert.strictEqual(wrapper.find(TextField).props().value, '2015-12-01',
        'should format the date to ISO 8601 (YYYY-MM-DD)');
    });
  });
});
