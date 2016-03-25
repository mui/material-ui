import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'DatePicker/Calendar';
import CalendarToolbar from 'DatePicker/CalendarToolbar';
import IconButton from 'IconButton';
import injectTheme from '../fixtures/inject-theme';
import DateTime from 'utils/dateTime';
import TestUtils from 'react-addons-test-utils';

describe('Calendar', () => {
  let ThemedCalendar;

  beforeEach(() => {
    ThemedCalendar = injectTheme(Calendar);
  });

  describe('Next Month Button', () => {
    it('should initially be disabled if the current month is the same as the month in the maxDate prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      const maxDate = new Date(initialDate.toDateString());

      const render = TestUtils.renderIntoDocument(
        <ThemedCalendar
          initialDate={initialDate}
          DateTimeFormat={DateTime.DateTimeFormat}
          locale="en-US"
          maxDate={maxDate}
        />
      );
      const renderedCalendarToolbar =
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

      expect(renderedCalendarToolbar.props.nextMonth).to.be.false;
    });

    it('should initially be disabled if the current month is after the month in the maxDate prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      let maxDate = new Date(initialDate.toDateString());
      maxDate = DateTime.addMonths(maxDate, -1);

      const render = TestUtils.renderIntoDocument(
        <ThemedCalendar
          initialDate={initialDate}
          DateTimeFormat={DateTime.DateTimeFormat}
          locale="en-US"
          maxDate={maxDate}
        />
      );
      const renderedCalendarToolbar =
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

      expect(renderedCalendarToolbar.props.nextMonth).to.be.false;
    });

    it('should initially enable the next month button if the current month is before the maxDate prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      let maxDate = new Date(initialDate.toDateString());
      maxDate = DateTime.addMonths(maxDate, 1);

      const render = TestUtils.renderIntoDocument(
        <ThemedCalendar
          initialDate={initialDate}
          DateTimeFormat={DateTime.DateTimeFormat}
          locale="en-US"
          maxDate={maxDate}
        />
      );

      const renderedCalendarToolbar =
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

      expect(renderedCalendarToolbar.props.nextMonth).to.be.true;
    });

    it('should reenable the next month button when the current month is before the maxDate prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      const maxDate = new Date(initialDate.toDateString());

      const render = TestUtils.renderIntoDocument(
        <ThemedCalendar
          initialDate={initialDate}
          DateTimeFormat={DateTime.DateTimeFormat}
          locale="en-US"
          maxDate={maxDate}
        />
      );
      const prevMonthButton = ReactDOM.findDOMNode(
                TestUtils.scryRenderedComponentsWithType(render, IconButton)[0]);
      TestUtils.Simulate.touchTap(prevMonthButton);

      const renderedCalendarToolbar =
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

      expect(renderedCalendarToolbar.props.nextMonth).to.be.true;
    });

    it('should redisable the next month button when the current month is the same as the maxDate prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      let maxDate = new Date(initialDate.toDateString());
      maxDate = DateTime.addMonths(maxDate, 1);

      const render = TestUtils.renderIntoDocument(
        <ThemedCalendar
          initialDate={initialDate}
          DateTimeFormat={DateTime.DateTimeFormat}
          locale="en-US"
          maxDate={maxDate}
        />
      );
      const nextMonthButton = ReactDOM.findDOMNode(
                TestUtils.scryRenderedComponentsWithType(render, IconButton)[1]);
      TestUtils.Simulate.touchTap(nextMonthButton);

      const renderedCalendarToolbar =
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

      expect(renderedCalendarToolbar.props.nextMonth).to.be.false;
    });
  });

  describe('Previous Month Button', () => {
    it(`should initially disable the previous month button if the current month
      is the same as the minDate month prop`, () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      const minDate = new Date(initialDate.toDateString());

      const render = TestUtils.renderIntoDocument(
        <ThemedCalendar
          initialDate={initialDate}
          DateTimeFormat={DateTime.DateTimeFormat}
          locale="en-US"
          minDate={minDate}
        />
      );
      const calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

      expect(calendarToolbar.props.prevMonth).to.be.false;
    });

    it(`should initially disable the previous month button if the current month
      is before the minDate month prop`, () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      let minDate = new Date(initialDate.toDateString());
      minDate = DateTime.addMonths(initialDate, 1);

      const render = TestUtils.renderIntoDocument(
        <ThemedCalendar
          initialDate={initialDate}
          DateTimeFormat={DateTime.DateTimeFormat}
          locale="en-US"
          minDate={minDate}
        />
      );
      const calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

      expect(calendarToolbar.props.prevMonth).to.be.false;
    });

    it('should initially enable the previous month button if the current month is after the minDate month prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      let minDate = new Date(initialDate.toDateString());
      minDate = DateTime.addMonths(initialDate, -1);

      const render = TestUtils.renderIntoDocument(
        <ThemedCalendar
          initialDate={initialDate}
          DateTimeFormat={DateTime.DateTimeFormat}
          locale="en-US"
          minDate={minDate}
        />
      );
      const calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

      expect(calendarToolbar.props.prevMonth).to.be.true;
    });

    it('should enable the previous month button when the current month is after the minDate month prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      const minDate = new Date(initialDate.toDateString());

      const render = TestUtils.renderIntoDocument(
        <ThemedCalendar
          initialDate={initialDate}
          DateTimeFormat={DateTime.DateTimeFormat}
          locale="en-US"
          minDate={minDate}
        />
      );

      const nextMonthIconButton = ReactDOM.findDOMNode(TestUtils.scryRenderedComponentsWithType(render, IconButton)[1]);
      TestUtils.Simulate.touchTap(nextMonthIconButton);

      const calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);
      expect(calendarToolbar.props.prevMonth).to.be.true;
    });

    it('should disable the previous month button when the current month is the same as the minDate month prop', () => {
      const initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
      let minDate = new Date(initialDate.toDateString());
      minDate = DateTime.addMonths(minDate, -1);

      const render = TestUtils.renderIntoDocument(
        <ThemedCalendar
          initialDate={initialDate}
          DateTimeFormat={DateTime.DateTimeFormat}
          locale="en-US"
          minDate={minDate}
        />
      );

      const prevMonthIconButton = ReactDOM.findDOMNode(TestUtils.scryRenderedComponentsWithType(render, IconButton)[0]);
      TestUtils.Simulate.touchTap(prevMonthIconButton);

      const calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);
      expect(calendarToolbar.props.prevMonth).to.be.false;
    });
  });
});
