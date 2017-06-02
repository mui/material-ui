/* eslint-env mocha */

import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from '../styles/getMuiTheme';
import {dateTimeFormat} from './dateUtils';
import DateDisplay from './DateDisplay';

describe('<DateDisplay />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('i18n', () => {
    it('should format the date correctly', () => {
      const date = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT

      const wrapper = shallowWithContext(
        <DateDisplay
          selectedDate={date}
          DateTimeFormat={dateTimeFormat}
          locale="en-US"
        />
      );

      assert.strictEqual(wrapper.find('div').at(1).text(), '2015');
      assert.strictEqual(wrapper.find('div').at(2).text(), 'Tue, Dec 1');
    });
  });
});
