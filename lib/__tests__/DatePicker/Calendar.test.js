import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { Calendar } from '../../src/DatePicker/Calendar';

describe('Calendar', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Calendar classes={{}} date={utilsToUse.date('01-01-2017')} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});

describe('Calendar - disabled selected date on mount', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Calendar
      classes={{}}
      date={utilsToUse.date('01-01-2017')}
      minDate="01-01-2018"
      onChange={jest.fn()}
    />);
  });

  it('Should dispatch onDateSelect with isFinish = false on mount', () => {
    const { onChange } = component.instance().props;
    expect(onChange).toHaveBeenCalledWith(utilsToUse.date('01-01-2018'), false);
  });
});
