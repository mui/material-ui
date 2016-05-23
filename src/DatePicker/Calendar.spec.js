/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Calendar from './Calendar';
import {addMonths, dateTimeFormat} from './dateUtils';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Calendar />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('Next Month Button', () => {
    it('should initially be disabled if the current month is the same as the month in the maxDate prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      const maxDate = new Date(initialDate.toDateString());

      const wrapper = shallowWithContext(
        <Calendar
          initialDate={initialDate}
          DateTimeFormat={dateTimeFormat}
          locale="en-US"
          maxDate={maxDate}
        />
      );

      assert.notOk(wrapper.find('CalendarToolbar').prop('nextMonth'));
    });

    it('should initially be disabled if the current month is after the month in the maxDate prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      let maxDate = new Date(initialDate.toDateString());
      maxDate = addMonths(maxDate, -1);

      const wrapper = shallowWithContext(
        <Calendar
          initialDate={initialDate}
          DateTimeFormat={dateTimeFormat}
          locale="en-US"
          maxDate={maxDate}
        />
      );

      assert.notOk(wrapper.find('CalendarToolbar').prop('nextMonth'));
    });

    it('should initially enable the next month button if the current month is before the maxDate prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      let maxDate = new Date(initialDate.toDateString());
      maxDate = addMonths(maxDate, 1);

      const wrapper = shallowWithContext(
        <Calendar
          initialDate={initialDate}
          DateTimeFormat={dateTimeFormat}
          locale="en-US"
          maxDate={maxDate}
        />
      );

      assert.ok(wrapper.find('CalendarToolbar').prop('nextMonth'));
    });

    it('should reenable the next month button when the current month is before the maxDate prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      const maxDate = new Date(initialDate.toDateString());

      const wrapper = shallowWithContext(
        <Calendar
          initialDate={initialDate}
          DateTimeFormat={dateTimeFormat}
          locale="en-US"
          maxDate={maxDate}
        />
      );

      wrapper.instance().handleMonthChange(-1);
      wrapper.update();

      assert.ok(wrapper.find('CalendarToolbar').prop('nextMonth'));
    });

    it('should redisable the next month button when the current month is the same as the maxDate prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      let maxDate = new Date(initialDate.toDateString());
      maxDate = addMonths(maxDate, 1);

      const wrapper = shallowWithContext(
        <Calendar
          initialDate={initialDate}
          DateTimeFormat={dateTimeFormat}
          locale="en-US"
          maxDate={maxDate}
        />
      );

      wrapper.instance().handleMonthChange(1);
      wrapper.update();

      assert.notOk(wrapper.find('CalendarToolbar').prop('nextMonth'));
    });
  });

  describe('Previous Month Button', () => {
    it(`should initially disable the previous month button if the current month
      is the same as the minDate month prop`, () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      const minDate = new Date(initialDate.toDateString());

      const wrapper = shallowWithContext(
        <Calendar
          initialDate={initialDate}
          DateTimeFormat={dateTimeFormat}
          locale="en-US"
          minDate={minDate}
        />
      );

      assert.notOk(wrapper.find('CalendarToolbar').prop('prevMonth'));
    });

    it(`should initially disable the previous month button if the current month
      is before the minDate month prop`, () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      let minDate = new Date(initialDate.toDateString());
      minDate = addMonths(initialDate, 1);

      const wrapper = shallowWithContext(
        <Calendar
          initialDate={initialDate}
          DateTimeFormat={dateTimeFormat}
          locale="en-US"
          minDate={minDate}
        />
      );

      assert.notOk(wrapper.find('CalendarToolbar').prop('prevMonth'));
    });

    it('should initially enable the previous month button if the current month is after the minDate month prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      let minDate = new Date(initialDate.toDateString());
      minDate = addMonths(initialDate, -1);

      const wrapper = shallowWithContext(
        <Calendar
          initialDate={initialDate}
          DateTimeFormat={dateTimeFormat}
          locale="en-US"
          minDate={minDate}
        />
      );

      assert.ok(wrapper.find('CalendarToolbar').prop('prevMonth'));
    });

    it('should enable the previous month button when the current month is after the minDate month prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      const minDate = new Date(initialDate.toDateString());

      const wrapper = shallowWithContext(
        <Calendar
          initialDate={initialDate}
          DateTimeFormat={dateTimeFormat}
          locale="en-US"
          minDate={minDate}
        />
      );

      wrapper.instance().handleMonthChange(1);
      wrapper.update();

      assert.ok(wrapper.find('CalendarToolbar').prop('prevMonth'));
    });

    it('should disable the previous month button when the current month is the same as the minDate month prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      let minDate = new Date(initialDate.toDateString());
      minDate = addMonths(minDate, -1);

      const wrapper = shallowWithContext(
        <Calendar
          initialDate={initialDate}
          DateTimeFormat={dateTimeFormat}
          locale="en-US"
          minDate={minDate}
        />
      );

      wrapper.instance().handleMonthChange(-1);
      wrapper.update();

      assert.notOk(wrapper.find('CalendarToolbar').prop('prevMonth'));
    });
  });
});
