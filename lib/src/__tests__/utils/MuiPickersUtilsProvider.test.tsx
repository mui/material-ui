import { shallow, ShallowWrapper } from 'enzyme'; // required to use just shallow here because utils prop override
import React from 'react';
import DateFnsUtils from '../../utils/date-fns-utils';
import MuiPickersUtilsProvider, {
  MuiPickersUtilsProviderProps,
} from '../../utils/MuiPickersUtilsProvider';

describe('MuiPickersUtilsProvider', () => {
  let component: ShallowWrapper<MuiPickersUtilsProviderProps>;

  beforeEach(() => {
    component = shallow(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        foo
      </MuiPickersUtilsProvider>
    );
  });

  it('Should render context provider', () => {
    expect(component).toBeTruthy();
  });
});
