import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react/addons';
import Calendar from 'date-picker/calendar';
import CalendarToolbar from 'date-picker/calendar-toolbar';
import IconButton from 'icon-button';
import DateDisplay  from 'date-picker/date-display';
import DateTime from 'utils/date-time';

import injectTheme from '../fixtures/inject-theme';

const TestUtils = React.addons.TestUtils;

describe(`Calendar`, () => {
    let ThemedCalendar;

    beforeEach(() => {
        ThemedCalendar = injectTheme(Calendar);
    });

    it(`should set the DateDisplay height to 64 if the mode prop is not provided (default mode is potrait)`, () => {
        let render = TestUtils.renderIntoDocument(<ThemedCalendar />);
        let dateDisplay = React.findDOMNode(
            TestUtils.findRenderedComponentWithType(render, DateDisplay));

        expect(dateDisplay.style.height).to.equal('64px');
    });

    it(`should set the DateDisplay height to 64 if the mode prop is set to potrait`, function() {
        let render = TestUtils.renderIntoDocument(<ThemedCalendar mode='potrait'/>);
        let dateDisplay = React.findDOMNode(
            TestUtils.findRenderedComponentWithType(render, DateDisplay));

        expect(dateDisplay.style.height).to.equal('64px');
    });

    it(`should set the DateDisplay height to 198 if the weekCount is not equal to 5 or 6 and the mode prop is landscape`, () => {
        let initialDate = new Date('February 01, 2015');
        let weekCount = DateTime.getWeekArray(initialDate);

        expect(weekCount).to.not.equal(5);
        expect(weekCount).to.not.equal(6);

        let render = TestUtils.renderIntoDocument(
            <ThemedCalendar mode='landscape' initialDate={initialDate}/>);
        let dateDisplay = React.findDOMNode(
            TestUtils.findRenderedComponentWithType(render, DateDisplay));

        expect(dateDisplay.style.height).to.equal('198px');
    });

    it(`should set the DateDisplay height to 238 if the weekCount is equal to 5 and the mode prop is landscape`, () => {
        let initialDate = new Date('March 01, 2015');
        let weekCount = DateTime.getWeekArray(initialDate).length;

        expect(weekCount).to.equal(5);

        let render = TestUtils.renderIntoDocument(
            <ThemedCalendar mode='landscape' initialDate={initialDate} />);
        let dateDisplay = React.findDOMNode(
            TestUtils.findRenderedComponentWithType(render, DateDisplay));

        expect(dateDisplay.style.height).to.equal('238px');
    });

    it(`should set the DateDisplay height to 278 if the weekCount is equal to 6 and the mode prop is landscape`, () => {
        let initialDate = new Date('May 01, 2015');
        let weekCount = DateTime.getWeekArray(initialDate).length;

        expect(weekCount).to.equal(6);

        let render = TestUtils.renderIntoDocument(
            <ThemedCalendar mode='landscape' initialDate={initialDate} />);
        let dateDisplay = React.findDOMNode(
            TestUtils.findRenderedComponentWithType(render, DateDisplay));

        expect(dateDisplay.style.height).to.equal('278px');
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

    describe('Previous Month Button', () => {
        it(`should initially disable the previous month button if the current month is the same as the minDate month prop`, () => {
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

        it(`should initially disable the previous month button if the current month is before the minDate month prop`, () => {
            let initialDate = new Date();
            let minDate = new Date(initialDate.toDateString());
            minDate.setMonth(initialDate.getMonth() + 1);

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar 
                    initialDate={initialDate}
                    minDate={minDate} 
                />
            );
            let calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);

            expect(calendarToolbar.props.prevMonth).to.be.false;
        });

        it(`should initially enable the previous month button if the current month is after the minDate month prop`, () => {
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

        it(`should enable the previous month button when the current month is after the minDate month prop`, () => {
            let initialDate = new Date();
            let minDate = new Date(initialDate.toDateString());

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar 
                    initialDate={initialDate}
                    minDate={minDate} 
                />
            );

            let nextMonthIconButton = React.findDOMNode(TestUtils.scryRenderedComponentsWithType(render, IconButton)[1]);
            TestUtils.Simulate.touchTap(nextMonthIconButton);

            let calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);
            expect(calendarToolbar.props.prevMonth).to.be.true;
        });

        it(`should disable the previous month button when the current month is the same as the minDate month prop`, () => {
            let initialDate = new Date();
            let minDate = new Date(initialDate.toDateString());
            minDate.setMonth(minDate.getMonth() - 1);

            let render = TestUtils.renderIntoDocument(
                <ThemedCalendar 
                    initialDate={initialDate}
                    minDate={minDate} 
                />
            );

            let prevMonthIconButton = React.findDOMNode(TestUtils.scryRenderedComponentsWithType(render, IconButton)[0]);
            TestUtils.Simulate.touchTap(prevMonthIconButton);

            let calendarToolbar = TestUtils.findRenderedComponentWithType(render, CalendarToolbar);
            expect(calendarToolbar.props.prevMonth).to.be.false;
        });
    });
});