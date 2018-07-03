import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { MinutesView } from '../../src/TimePicker/MinutesView';


describe('MinutesView', () => {
  let component;

  beforeEach(() => {
    component = shallow(<MinutesView date={utilsToUse.date()} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
