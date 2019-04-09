import * as React from 'react';
import { ShallowWrapper } from 'enzyme';
import { shallow, utilsToUse } from '../test-utils';
import { TimePickerView, TimePickerViewProps } from '../../TimePicker/components/TimePickerView';

describe('TimePickerView', () => {
  let component: ShallowWrapper<TimePickerViewProps>;
  let onChangeMock: any;

  beforeEach(() => {
    onChangeMock = jest.fn();
    component = shallow(
      <TimePickerView
        classes={{}}
        type="seconds"
        onSecondsChange={onChangeMock}
        onMinutesChange={onChangeMock}
        date={utilsToUse.date('01-01-2017 12:00')}
        onHourChange={jest.fn()}
        utils={utilsToUse}
      />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  if (process.env.UTILS !== 'moment') {
    it('Should dispatch onChange onSecondsChange', () => {
      (component.instance() as TimePickerView).handleSecondsChange(45, true);
      expect(onChangeMock).toHaveBeenCalledWith(utilsToUse.date('01-01-2017 12:00:45'), true);
    });

    it('Should dispatch onChange on', () => {
      (component.instance() as TimePickerView).handleMinutesChange(45, true);
      expect(onChangeMock).toHaveBeenCalledWith(utilsToUse.date('01-01-2017 12:45'), true);
    });
  }
});
