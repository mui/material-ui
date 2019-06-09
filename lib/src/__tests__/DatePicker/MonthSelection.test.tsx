import * as React from 'react';
import Month from '../../views/Month/Month';
import { ReactWrapper } from 'enzyme';
import { mount, utilsToUse } from '../test-utils';
import { MonthSelection, MonthSelectionProps } from '../../views/Month/MonthView';

describe('MonthSelection', () => {
  let component: ReactWrapper<MonthSelectionProps>;

  beforeEach(() => {
    component = mount(
      <MonthSelection
        minDate={new Date('03-01-2017')}
        maxDate={new Date('05-01-2017')}
        date={utilsToUse.date('04-01-2017')}
        onChange={jest.fn()}
      />
    );
  });

  it('Should render disabled months before min date and after max date', () => {
    expect(component.find(Month).map(month => month.prop('disabled'))).toEqual([
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
