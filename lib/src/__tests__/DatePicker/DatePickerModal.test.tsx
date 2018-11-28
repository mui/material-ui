import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { DatePickerModal, DatePickerModalProps } from '../../DatePicker/DatePickerModal';
import { shallow, utilsToUse } from '../test-utils';

const spy = jest.fn();

const props = {
  keyboard: true,
  format: 'YYYY',
  onChange: spy,
  value: utilsToUse.date('2018'),
};

describe('DatePickerModal', () => {
  let component: ShallowWrapper<DatePickerModalProps>;

  beforeEach(() => {
    component = shallow(<DatePickerModal {...props} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
