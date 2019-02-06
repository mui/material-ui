import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import DatePicker, { DatePickerProps } from '../../DatePicker/DatePicker';
import { mount, utilsToUse } from '../test-utils';

describe('e2e - DatePicker', () => {
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <DatePicker
        animateYearScrolling={false}
        date={utilsToUse.date('2018-01-01T00:00:00.000Z')}
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
    component
      .find('ToolbarButton')
      .first()
      .simulate('click');

    expect(component.find('Year').length).toBe(201);

    component
      .find('Year')
      .at(1)
      .simulate('click');
    expect(onChangeMock).toHaveBeenCalled();
  });
});

describe('e2e -- DatePicker views year', () => {
  const onChangeMock = jest.fn();
  let component: ReactWrapper<DatePickerProps>;

  beforeEach(() => {
    component = mount(
      <DatePicker
        date={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        views={['year']}
      />
    );
  });

  it('Should render year selection', () => {
    expect(component.find('Year').length).toBe(201);

    component
      .find('Year')
      .at(1)
      .simulate('click');
    expect(onChangeMock).toHaveBeenCalled();
  });
});

describe('e2e -- DatePicker views year and month', () => {
  const onChangeMock = jest.fn();
  let component: ReactWrapper<DatePickerProps>;

  beforeEach(() => {
    component = mount(
      <DatePicker
        date={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        views={['year', 'month']}
      />
    );
  });

  it('Should render month selection', () => {
    expect(component.find('Month').length).toBe(12);
  });

  it('Should switch to year selection and back to month', () => {
    component
      .find('ToolbarButton')
      .first()
      .simulate('click');

    const year = component.find('Year');
    expect(component.find('Year').length).toBe(201);

    year.first().simulate('click');

    expect(component.find('Month').length).toBe(12);
  });

  it('Should select month', () => {
    component
      .find('Month')
      .first()
      .simulate('click');

    expect(onChangeMock).toHaveBeenCalled();
  });
});

describe('e2e -- DatePicker views year and month open from year', () => {
  const onChangeMock = jest.fn();
  let component: ReactWrapper<DatePickerProps>;

  beforeEach(() => {
    component = mount(
      <DatePicker
        date={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        views={['year', 'month']}
        openToYearSelection
      />
    );
  });

  it('Should render year selection', () => {
    expect(component.find('Year').length).toBe(201);
  });
});
