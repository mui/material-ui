import Calendar from 'date-picker/calendar';
import React from 'react';
import injectTheme from '../fixtures/inject-theme';
import DateDisplay  from 'date-picker/date-display';
import DateTime from 'utils/date-time';

const TestUtils = React.addons.TestUtils;

describe('Calendar', function() {
    let ThemedCalendar;

    beforeEach(() => {
        ThemedCalendar = injectTheme(Calendar);
    });

    it(`should set the DateDisplay height to 64 if the mode prop is not provided 
        (default mode is potrait)`, () => {
        let render = TestUtils.renderIntoDocument(<ThemedCalendar />);
        let dateDisplay = React.findDOMNode(
            TestUtils.findRenderedComponentWithType(render, DateDisplay));

        expect(dateDisplay.style.height).to.equal('64px');
    });

    it(`should set the DateDisplay height to 64 if the mode prop is set to
        potrait`, function() {
        let render = TestUtils.renderIntoDocument(<ThemedCalendar mode='potrait'/>);
        let dateDisplay = React.findDOMNode(
            TestUtils.findRenderedComponentWithType(render, DateDisplay));

        expect(dateDisplay.style.height).to.equal('64px');
    });

    it(`should set the DateDisplay height to 198 if the weekCount is not equal 
        to 5 or 6 and the mode prop is landscape`, () => {
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
});