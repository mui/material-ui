import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import { clickOKButton } from './commands';
import { TextField } from '@material-ui/core';
import { mount, utilsToUse } from './test-utils';
import { DatePicker, DatePickerProps } from '../DatePicker';

describe('e2e - DatePicker', () => {
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <DatePicker
        renderInput={props => <TextField {...props} />}
        open
        autoOk
        openTo="date"
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
      />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should render proper count of days', () => {
    expect(component.find('Day').length).toBe(35);
  });

  it('Should dispatch onChange on day click', () => {
    component
      .find('Day button')
      .at(2)
      .simulate('click');
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should render year selection', () => {
    component.find('button[data-mui-test="calendar-view-switcher"]').simulate('click');

    expect(component.find('Year').length).toBe(201);

    component
      .find('Year')
      .at(1)
      .simulate('click');

    clickOKButton(component);
    expect(onChangeMock).toHaveBeenCalled();
  });
});

describe('e2e -- DatePicker views year', () => {
  const onChangeMock = jest.fn();
  const onYearChangeMock = jest.fn();

  let component: ReactWrapper<DatePickerProps>;

  beforeEach(() => {
    component = mount(
      <DatePicker
        renderInput={props => <TextField {...props} />}
        open
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        onYearChange={onYearChangeMock}
        views={['year']}
      />
    );
  });

  it('Should render year selection and select year', () => {
    expect(component.find('Year').length).toBe(201);

    component
      .find('Year')
      .at(1)
      .simulate('click');

    clickOKButton(component);
    expect(onYearChangeMock).toHaveBeenCalled();
  });
});

describe('e2e -- DatePicker views year and month', () => {
  const onChangeMock = jest.fn();
  const onMonthChangeMock = jest.fn();

  let component: ReactWrapper<DatePickerProps>;

  beforeEach(() => {
    component = mount(
      <DatePicker
        renderInput={props => <TextField {...props} />}
        open
        autoOk
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        onMonthChange={onMonthChangeMock}
        openTo="month"
        views={['year', 'month']}
      />
    );
  });

  it('Should select month', () => {
    expect(component.find('Month').length).toBe(12);
    component
      .find('div[data-mui-test="month"]')
      .first()
      .simulate('click');

    expect(onMonthChangeMock).toHaveBeenCalled();
  });

  it('Should switch to year selection and back to month', () => {
    component.find('button[data-mui-test="calendar-view-switcher"]').simulate('click');

    const year = component.find('Year');
    expect(component.find('Year').length).toBe(201);

    year.first().simulate('click');
    expect(component.find('Month').length).toBe(12);
  });
});

describe('e2e -- DatePicker views year and month open from year', () => {
  const onChangeMock = jest.fn();
  let component: ReactWrapper<DatePickerProps>;

  beforeEach(() => {
    component = mount(
      <DatePicker
        renderInput={props => <TextField {...props} />}
        open
        autoOk
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        views={['year', 'month']}
        openTo="year"
      />
    );
  });

  it('Should render year selection', () => {
    expect(component.find('Year').length).toBe(201);
  });
});
