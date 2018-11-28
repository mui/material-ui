import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { DateTimePickerInlineProps, InlineDateTimePicker } from '../../DateTimePicker';
import { shallow, utilsToUse } from '../test-utils';

const spy = jest.fn();

const props = {
  keyboard: true,
  format: 'YYYY',
  onChange: spy,
  value: utilsToUse.date('2018'),
};

describe('DatePickerModal', () => {
  let component: ShallowWrapper<DateTimePickerInlineProps>;

  beforeEach(() => {
    component = shallow(<InlineDateTimePicker variant="outlined" {...props} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
