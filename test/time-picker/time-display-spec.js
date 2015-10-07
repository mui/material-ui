import TimeDisplay from 'time-picker/time-display';
import React from 'react';
import injectTheme from '../fixtures/inject-theme';

const TestUtils = React.addons.TestUtils;

describe('TimeDisplay', () => {
    let ThemedTimeDisplay;

    beforeEach(() => {
        ThemedTimeDisplay = injectTheme(TimeDisplay);
    });

    it('should have a height of 102', () => {
        let render = TestUtils.renderIntoDocument(
            <ThemedTimeDisplay selectedTime={new Date()}/>);
        let timeDisplay = React.findDOMNode(
            TestUtils.findRenderedComponentWithType(render, ThemedTimeDisplay));

        expect(timeDisplay.style.height).to.equal('102px');
    });
});