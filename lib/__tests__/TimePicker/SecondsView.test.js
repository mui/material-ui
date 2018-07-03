import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { SecondsView } from '../../src/TimePicker/SecondsView';

describe('SecondsView', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SecondsView date={utilsToUse.date()} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
