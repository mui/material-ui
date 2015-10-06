import Calendar from 'date-picker/calendar';
import injectTheme from '../fixtures/inject-theme';
import React from 'react';
import CalendarToolbar from 'date-picker/calendar-toolbar';

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
    });
});