import DateFnsUtils from '@date-io/date-fns';
import { shallow, ShallowWrapper } from 'enzyme'; // required to use just shallow here because utils prop override
import * as React from 'react';
import MuiPickersUtilsProvider, { MuiPickersUtilsProviderProps } from '../MuiPickersUtilsProvider';

describe('MuiPickersUtilsProvider', () => {
  let component: ShallowWrapper<MuiPickersUtilsProviderProps>;

  beforeEach(() => {
    component = shallow(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div />
      </MuiPickersUtilsProvider>
    );
  });

  it('Should render context provider', () => {
    expect(component).toBeTruthy();
  });
});
