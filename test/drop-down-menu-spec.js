import React from 'react/addons';
import DropDownMenu from 'drop-down-menu';
import injectTheme from './fixtures/inject-theme';

const TestUtils = React.addons.TestUtils

describe('DropDownMenu', () => {
    let ThemedDropdownMenu;

    beforeEach(() => {
        ThemedDropdownMenu = injectTheme(DropDownMenu);
    });

    it(`displays the text field of menuItems prop at index x when value prop is x`, () => {
        let menuItems = [
            {
                text: 'Text1',
                payload: 0
            },
            {
                text: 'Text2',
                payload: 1
            },
            {
                text: 'Text3',
                payload: 2
            }
        ];

        let value = 0;
        let expectedSelectedText = menuItems[0].text;

        let render = TestUtils.renderIntoDocument(
            <ThemedDropdownMenu 
                menuItems={menuItems}
                value={value}/>
        );
        let divWithSelectedText = 
            TestUtils.scryRenderedDOMComponentsWithTag(render, 'div')[1];
            
        expect(divWithSelectedText.textContent).to.be.equal(expectedSelectedText);
    });
});