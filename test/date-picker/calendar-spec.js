import Calendar from 'date-picker/calendar';
import injectTheme from '../fixtures/inject-theme';
import React from 'react';
import CalendarToolbar from 'date-picker/calendar-toolbar';
import IconButton from 'icon-button';

const TestUtils = React.addons.TestUtils;

describe(`Calendar`, () => {
    let ThemedCalendar;

    beforeEach(() => {
        ThemedCalendar = injectTheme(Calendar);
    });

    describe(`Next Month Button`, () => {
        it(`should initially be disabled if the current month is the same as the month in the maxDate prop`, () => {
            let initialDate = new Date();
            let maxDate = new Date(initialDate.toDateString());

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar 
                    initialDate={initialDate}
                    maxDate={maxDate}
                />
            );
            let renderedCalendarToolbar = 
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(renderedCalendarToolbar.props.nextMonth).to.be.false;
        });

        it(`should initially be disabled if the current month is after the month in the maxDate prop`, () => {
            let initialDate = new Date();
            let maxDate = new Date(initialDate.toDateString());
            maxDate.setMonth(maxDate.getMonth() - 1);

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar
                    initialDate={initialDate}
                    maxDate={maxDate} />
            );
            let renderedCalendarToolbar = 
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(renderedCalendarToolbar.props.nextMonth).to.be.false;
        });

        it.only(`should reenable the next month button when the current month is before the maxDate prop`, () => {
            let initialDate = new Date();
            let maxDate = new Date(initialDate.toDateString());

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar 
                    initialDate={initialDate}
                    maxDate={maxDate} />
            );
            let prevMonthButton = React.findDOMNode(
                TestUtils.scryRenderedComponentWithType(render, IconButton)[0]);
            TestUtils.Simulate.touchTap(prevMonthButton);

            let CalendarToolbar = 
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(CalendarToolbar.props.nextButton).to.be.true;
        });
    });
});