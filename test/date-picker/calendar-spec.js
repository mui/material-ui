import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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

        it(`should initially enable the next month button if the current month is before the maxDate prop`, () => {
            let initialDate = new Date();
            let maxDate = new Date(initialDate.toDateString());
            maxDate.setMonth(maxDate.getMonth() + 1);

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar 
                    initialDate={initialDate}
                    maxDate={maxDate} />
            );

            let renderedCalendarToolbar = 
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(renderedCalendarToolbar.props.nextMonth).to.be.true;
        });

        it(`should reenable the next month button when the current month is before the maxDate prop`, () => {
            let initialDate = new Date();
            let maxDate = new Date(initialDate.toDateString());

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar 
                    initialDate={initialDate}
                    maxDate={maxDate} />
            );
            let prevMonthButton = React.findDOMNode(
                TestUtils.scryRenderedComponentsWithType(render, IconButton)[0]);
            TestUtils.Simulate.touchTap(prevMonthButton);

            let renderedCalendarToolbar = 
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(renderedCalendarToolbar.props.nextMonth).to.be.true;
        });

        it(`should redisable the next month button when the current month is the same as the maxDate prop`, () => {
            let initialDate = new Date();
            let maxDate = new Date(initialDate.toDateString());
            maxDate.setMonth(maxDate.getMonth() + 1);

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar 
                    initialDate={initialDate}
                    maxDate={maxDate} />
            );
            let nextMonthButton = React.findDOMNode(
                TestUtils.scryRenderedComponentsWithType(render, IconButton)[1]);
            TestUtils.Simulate.touchTap(nextMonthButton);

            let renderedCalendarToolbar = 
                TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(renderedCalendarToolbar.props.nextMonth).to.be.false;
        });
    });

    it(`should disable the previous month button if the current month is the same as the minDate month prop`, () => {
        let initialDate = new Date();
        let minDate = new Date(initialDate.toDateString());

        let render = TestUtils.renderIntoDocument(
            <ThemedCalendar 
                initialDate={initialDate}
                minDate={minDate} 
            />
        );
        let calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

        expect(calendarToolbar.props.prevMonth).to.be.false;
    });

    it(`should enable the previous month button if the current month is after the minDate month prop`, () => {
        let initialDate = new Date();
        let minDate = new Date(initialDate.toDateString());
        minDate.setMonth(initialDate.getMonth() - 1);

        let render = TestUtils.renderIntoDocument(
            <ThemedCalendar 
                initialDate={initialDate}
                minDate={minDate} 
            />
        );
        let calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

        expect(calendarToolbar.props.prevMonth).to.be.true;
    });
});