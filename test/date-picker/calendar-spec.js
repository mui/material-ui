import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react/addons';
import ReactDOM from 'react-dom';
import Calendar from 'date-picker/calendar';
import CalendarToolbar from 'date-picker/calendar-toolbar';
import IconButton from 'icon-button';
import injectTheme from '../fixtures/inject-theme';
import DateTime from 'utils/date-time';

const TestUtils = React.addons.TestUtils;

describe(`Calendar`, () => {
    let ThemedCalendar;

    beforeEach(() => {
        ThemedCalendar = injectTheme(Calendar);
    });

    describe(`Next Month Button`, () => {
        it(`should initially be disabled if the current month is the same as the month in the maxDate prop`, () => {
            let initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
            let maxDate = new Date(initialDate.toDateString());

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar
                    initialDate={initialDate}
                    DateTimeFormat={DateTime.DateTimeFormat}
                    locale="en-US"
                    maxDate={maxDate}
                />
            );
            let renderedCalendarToolbar =
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(renderedCalendarToolbar.props.nextMonth).to.be.false;
        });

        it(`should initially be disabled if the current month is after the month in the maxDate prop`, () => {
            let initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
            let maxDate = new Date(initialDate.toDateString());
            maxDate = DateTime.addMonths(maxDate, -1);

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar
                    initialDate={initialDate}
                    DateTimeFormat={DateTime.DateTimeFormat}
                    locale="en-US"
                    maxDate={maxDate} />
            );
            let renderedCalendarToolbar =
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(renderedCalendarToolbar.props.nextMonth).to.be.false;
        });

        it(`should initially enable the next month button if the current month is before the maxDate prop`, () => {
            let initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
            let maxDate = new Date(initialDate.toDateString());
            maxDate = DateTime.addMonths(maxDate, 1);

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar
                    initialDate={initialDate}
                    DateTimeFormat={DateTime.DateTimeFormat}
                    locale="en-US"
                    maxDate={maxDate} />
            );

            let renderedCalendarToolbar =
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(renderedCalendarToolbar.props.nextMonth).to.be.true;
        });

        it(`should reenable the next month button when the current month is before the maxDate prop`, () => {
            let initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
            let maxDate = new Date(initialDate.toDateString());

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar
                    initialDate={initialDate}
                    DateTimeFormat={DateTime.DateTimeFormat}
                    locale="en-US"
                    maxDate={maxDate} />
            );
            let prevMonthButton = ReactDOM.findDOMNode(
                TestUtils.scryRenderedComponentsWithType(render, IconButton)[0]);
            TestUtils.Simulate.touchTap(prevMonthButton);

            let renderedCalendarToolbar =
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(renderedCalendarToolbar.props.nextMonth).to.be.true;
        });

        it(`should redisable the next month button when the current month is the same as the maxDate prop`, () => {
            let initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
            let maxDate = new Date(initialDate.toDateString());
            maxDate = DateTime.addMonths(maxDate, 1);

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar
                    initialDate={initialDate}
                    DateTimeFormat={DateTime.DateTimeFormat}
                    locale="en-US"
                    maxDate={maxDate} />
            );
            let nextMonthButton = ReactDOM.findDOMNode(
                TestUtils.scryRenderedComponentsWithType(render, IconButton)[1]);
            TestUtils.Simulate.touchTap(nextMonthButton);

            let renderedCalendarToolbar =
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(renderedCalendarToolbar.props.nextMonth).to.be.false;
        });
    });

    describe('Previous Month Button', () => {
        it(`should initially disable the previous month button if the current month is the same as the minDate month prop`, () => {
            let initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
            let minDate = new Date(initialDate.toDateString());

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar
                    initialDate={initialDate}
                    DateTimeFormat={DateTime.DateTimeFormat}
                    locale="en-US"
                    minDate={minDate}
                />
            );
            let calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(calendarToolbar.props.prevMonth).to.be.false;
        });

        it(`should initially disable the previous month button if the current month is before the minDate month prop`, () => {
            let initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
            let minDate = new Date(initialDate.toDateString());
            minDate = DateTime.addMonths(initialDate, 1);

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar
                    initialDate={initialDate}
                    DateTimeFormat={DateTime.DateTimeFormat}
                    locale="en-US"
                    minDate={minDate}
                />
            );
            let calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(calendarToolbar.props.prevMonth).to.be.false;
        });

        it(`should initially enable the previous month button if the current month is after the minDate month prop`, () => {
            let initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
            let minDate = new Date(initialDate.toDateString());
            minDate = DateTime.addMonths(initialDate, -1);

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar
                    initialDate={initialDate}
                    DateTimeFormat={DateTime.DateTimeFormat}
                    locale="en-US"
                    minDate={minDate}
                />
            );
            let calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(calendarToolbar.props.prevMonth).to.be.true;
        });

        it(`should enable the previous month button when the current month is after the minDate month prop`, () => {
            let initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
            let minDate = new Date(initialDate.toDateString());

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar
                    initialDate={initialDate}
                    DateTimeFormat={DateTime.DateTimeFormat}
                    locale="en-US"
                    minDate={minDate}
                />
            );

            let nextMonthIconButton = ReactDOM.findDOMNode(TestUtils.scryRenderedComponentsWithType(render, IconButton)[1]);
            TestUtils.Simulate.touchTap(nextMonthIconButton);

            let calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);
            expect(calendarToolbar.props.prevMonth).to.be.true;
        });

        it(`should disable the previous month button when the current month is the same as the minDate month prop`, () => {
            let initialDate = new Date(1448967059892); // Tue, 01 Dec 2015 10:50:59 GMT
            let minDate = new Date(initialDate.toDateString());
            minDate = DateTime.addMonths(minDate, -1);

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar
                    initialDate={initialDate}
                    DateTimeFormat={DateTime.DateTimeFormat}
                    locale="en-US"
                    minDate={minDate}
                />
            );

            let prevMonthIconButton = ReactDOM.findDOMNode(TestUtils.scryRenderedComponentsWithType(render, IconButton)[0]);
            TestUtils.Simulate.touchTap(prevMonthIconButton);

            let calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);
            expect(calendarToolbar.props.prevMonth).to.be.false;
        });
    });
});
