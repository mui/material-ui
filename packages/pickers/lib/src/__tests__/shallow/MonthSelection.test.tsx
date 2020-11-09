import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import { Month } from '../../views/Calendar/Month';
import { mount, utilsToUse } from '../test-utils';
import { MonthSelection, MonthSelectionProps } from '../../views/Calendar/MonthSelection';

describe('MonthSelection', () => {
  let component: ReactWrapper<MonthSelectionProps<any>>;

  beforeEach(() => {
    component = mount(
      <MonthSelection
        minDate={utilsToUse.date('03-01-2017')}
        maxDate={utilsToUse.date('05-01-2017')}
        date={utilsToUse.date('04-01-2017')}
        onChange={jest.fn()}
      />
    );
  });

  it('Should render disabled months before min date and after max date', () => {
    expect(component.find(Month).map((month) => month.prop('disabled'))).toEqual([
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);
  });
});
