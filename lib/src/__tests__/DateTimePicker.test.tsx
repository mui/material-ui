import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import DateFnsLocaleDe from 'date-fns/locale/de';
import LocalizationProvider from '../LocalizationProvider';
import { ReactWrapper } from 'enzyme';
import { TextField } from '@material-ui/core';
import { mount as enzymeDefaultMount } from 'enzyme';
import { MaterialUiPickersDate } from '../typings/date';
import { createClientRender, fireEvent } from './createClientRender';
import { mount, utilsToUse, mountPickerWithState } from './test-utils';
import {
  DesktopDateTimePicker,
  DateTimePicker,
  DateTimePickerProps,
} from '../DateTimePicker/DateTimePicker';

const format = process.env.UTILS === 'moment' ? 'MM/DD/YYYY HH:mm' : 'MM/dd/yyyy hh:mm';

describe('DateTimePicker', () => {
  const render = createClientRender();

  describe('prop: mask', () => {
    it('should take the mask prop into account', () => {
      const { getByRole } = render(
        <LocalizationProvider dateAdapter={DateFnsUtils} locale={DateFnsLocaleDe}>
          <DesktopDateTimePicker
            renderInput={props => <TextField autoFocus {...props} />}
            mask="__.__.____ __:__"
            onChange={() => {}}
            value={null}
          />
        </LocalizationProvider>
      );
      const textbox = getByRole('textbox');
      fireEvent.change(textbox, {
        target: {
          value: '12',
        },
      });
      expect(textbox.value).toBe('12.');
    });
  });
});

describe('e2e - DateTimePicker', () => {
  let component: ReactWrapper<DateTimePickerProps>;

  const onCloseMock = jest.fn();
  const onChangeMock = jest.fn();

  beforeEach(() => {
    component = mount(
      <DateTimePicker
        renderInput={props => <TextField {...props} />}
        clearable
        inputFormat={format}
        onClose={onCloseMock}
        onChange={onChangeMock}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should open modal with picker on click', () => {
    component.find('input').simulate('click');
    expect(component.find('WithStyles(ForwardRef(Dialog))').prop('open')).toBeTruthy();
  });

  it('Should change internal state on update', () => {
    component.find('input').simulate('click');
    component
      .find('Day button')
      .at(3)
      .simulate('click');

    expect(
      component
        .find('ToolbarButton')
        .at(0)
        .text()
    ).toBe('2018');
    // expect(component.find('ToolbarButton').at(1).text()).toBe('Jan 3');
  });
});

describe('e2e -- Controlling open state', () => {
  let component: ReactWrapper<DateTimePickerProps>;
  const onCloseMock = jest.fn();

  beforeEach(() => {
    component = mount(
      <DateTimePicker
        renderInput={props => <TextField {...props} />}
        open
        onClose={onCloseMock}
        onChange={jest.fn()}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );
  });

  it('Should be opened', () => {
    expect(component.find('WithStyles(ForwardRef(Dialog))').prop('open')).toBeTruthy();
  });

  it('Should close', () => {
    component
      .find('ForwardRef(DialogActions) button')
      .at(0)
      .simulate('click');
    expect(onCloseMock).toHaveBeenCalled();
  });
});

describe('e2e -- Override utils using `dateAdapter`', () => {
  let component: ReactWrapper<DateTimePickerProps>;

  beforeEach(() => {
    component = enzymeDefaultMount(
      <DateTimePicker
        renderInput={props => <TextField {...props} />}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={jest.fn()}
        dateAdapter={utilsToUse}
      />
    );
  });

  it('Should renders and opens without crash', () => {
    component.find('input').simulate('click');
    expect(component.find('[data-mui-test="datetimepicker-toolbar-date"] h4').text()).toBe('Jan 1');
  });
});

it('e2e - DateTimePicker empty date', () => {
  const component = mountPickerWithState(null as MaterialUiPickersDate, props => (
    <DateTimePicker open toolbarPlaceholder="Enter Date" {...props} />
  ));

  expect(component.find('button[data-mui-test="datetimepicker-toolbar-date"]').text()).toBe(
    'Enter Date'
  );

  expect(component.find('button[data-mui-test="hours"]').text()).toBe('--');
  expect(component.find('button[data-mui-test="minutes"]').text()).toBe('--');

  component
    .find('button[data-mui-test="day"]')
    .at(0)
    .simulate('click');

  expect(component.find('button[data-mui-test="datetimepicker-toolbar-date"]').text()).not.toBe(
    'Enter Date'
  );

  expect(component.find('button[data-mui-test="hours"]').text()).not.toBe('--');
  expect(component.find('button[data-mui-test="minutes"]').text()).not.toBe('--');
});
