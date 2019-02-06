import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import Month from '../../DatePicker/components/Month';
import { MonthSelection, MonthSelectionProps } from '../../DatePicker/components/MonthSelection';
import { shallow, utilsToUse } from '../test-utils';

describe('MonthSelection', () => {
  let component: ShallowWrapper<MonthSelectionProps>;

  beforeEach(() => {
    component = shallow(
      <MonthSelection
        classes={{} as any}
        minDate={new Date('03-01-2017')}
        maxDate={new Date('05-01-2017')}
        date={utilsToUse.date('04-01-2017')}
        onChange={jest.fn()}
        utils={utilsToUse}
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
