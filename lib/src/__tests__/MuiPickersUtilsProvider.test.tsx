// required to use just shallow here because utils prop override
import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import LocalizationProvider, { LocalizationProviderProps } from '../LocalizationProvider';
import { shallow, ShallowWrapper } from 'enzyme'; // required to use just shallow here because utils prop override

describe('LocalizationProvider', () => {
  let component: ShallowWrapper<LocalizationProviderProps>;

  beforeEach(() => {
    component = shallow(
      <LocalizationProvider dateAdapter={DateFnsUtils}>
        <div />
      </LocalizationProvider>
    );
  });

  it('Should render context provider', () => {
    expect(component).toBeTruthy();
  });
});
