import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import { TextField } from '@material-ui/core';
import { mount, utilsToUse } from './test-utils';
import { mount as enzymeDefaultMount } from 'enzyme';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { DateTimePicker, DateTimePickerProps } from '../DateTimePicker/DateTimePicker';

const format = process.env.UTILS === 'moment' ? 'MM/DD/YYYY HH:mm' : 'MM/dd/yyyy hh:mm';

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
      <ThemeProvider theme={createMuiTheme()}>
        <DateTimePicker
          renderInput={props => <TextField {...props} />}
          value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
          onChange={jest.fn()}
          dateAdapter={utilsToUse}
        />
      </ThemeProvider>
    );
  });

  it('Should renders and opens without crash', () => {
    component.find('input').simulate('click');
    expect(component.find('[data-mui-test="datetimepicker-toolbar-date"] h4').text()).toBe('Jan 1');
  });
});
