/* eslint-env mocha */

import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from '../styles/getMuiTheme';
import {dateTimeFormat} from './dateUtils';
import DayButton from './DayButton';

describe('<DayButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('i18n', () => {
    it('should format the day correctly', () => {
      const date = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT

      const wrapper = shallowWithContext(
        <DayButton
          date={date}
          DateTimeFormat={dateTimeFormat}
          locale="en-US"
        />
      );

      assert.strictEqual(wrapper.find('span').text(), '1');
    });
  });
});
