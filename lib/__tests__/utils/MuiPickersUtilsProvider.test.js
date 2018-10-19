import React from 'react';
import { shallow } from 'enzyme'; // required to use just shallow here because utils prop override
import DateFnsUtils from '../../src/date-fns-utils';
import MuiPickersUtilsProvider from '../../src/MuiPickersUtilsProvider';

describe('MuiPickersUtilsProvider', () => {
  let component;

  beforeEach(() => {
    component = shallow(<MuiPickersUtilsProvider utils={DateFnsUtils} />);
  });

  it('Should render context provider', () => {
    expect(component).toBeTruthy();
  });
});
