/* eslint-env mocha */

import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from '../styles/getMuiTheme';
import {dateTimeFormat, addYears, defaultUtils} from './dateUtils';
import CalendarYear from './CalendarYear';
import YearButton from './YearButton';

describe('<CalendarYear />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('i18n', () => {
    it('should format the year correctly', () => {
      const date = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      const minDate = addYears(date, -100);
      const maxDate = addYears(date, 100);

      const wrapper = shallowWithContext(
        <CalendarYear
          selectedDate={date}
          DateTimeFormat={dateTimeFormat}
          minDate={minDate}
          maxDate={maxDate}
          locale="en-US"
          utils={defaultUtils}
        />
      );

      assert.strictEqual(wrapper.find(YearButton).length, 201);
      assert.strictEqual(wrapper.find(YearButton).at(0).props().children, '1915');
    });
  });
});
