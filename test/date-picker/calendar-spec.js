import Calendar from 'date-picker/calendar';
import React from 'react';
import injectTheme from '../fixtures/inject-theme';
import DateDisplay  from 'date-picker/date-display';

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
});