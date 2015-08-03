import React from 'react/addons';
import Checkbox from 'checkbox';
import ThemeContainer from './fixtures/theme-container';
import stubContext from 'react-stub-context';

import ThemeManager from 'styles/theme-manager';

const TestUtils = React.addons.TestUtils;
const Manager = new ThemeManager();


describe('Checkbox', () => {
  let checkboxComponent;

  it('should display checkmark when checked by default', () => {
//    checkboxComponent = TestUtils.renderIntoDocument(
//      <ThemeContainer>
//        <Checkbox defaultChecked={true} checked={false} />
//      </ThemeContainer>
//    ).getBaseComponent()

    let NewCheckbox = stubContext(Checkbox, {muiTheme: Manager.getCurrentTheme()});
    checkboxComponent = TestUtils.renderIntoDocument(<NewCheckbox defaultChecked={true} />);
    console.log(TestUtils.scryRenderedComponentsWithType(checkboxComponent, 'Checkbox'));

//    console.log(Object.keys(checkboxComponent._wrappedElement));
//    console.log(checkboxComponent.getWrappedElement().isChecked() !== undefined);
    //expect(checkboxComponent.isChecked()).to.be.true;
  });
});
