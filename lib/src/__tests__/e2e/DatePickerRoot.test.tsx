import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import DatePickerRoot, { DatePickerRootProps } from '../../DatePicker/DatePickerRoot';
import { mount, utilsToUse } from '../test-utils';

describe('e2e - DatePickerRoot', () => {
  let component: ReactWrapper<DatePickerRootProps>;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <DatePickerRoot
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

describe('e2e -- DatePickerRoot views year', () => {
  const onChangeMock = jest.fn();
  const onYearChangeMock = jest.fn();

  let component: ReactWrapper<DatePickerRootProps>;

  beforeEach(() => {
    component = mount(
      <DatePickerRoot
        date={utilsToUse.date('2018-01-01T00:00:00.000Z')}
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

    expect(onChangeMock).toHaveBeenCalled();
    expect(onYearChangeMock).toHaveBeenCalled();
  });
});

describe('e2e -- DatePickerRoot views year and month', () => {
  const onChangeMock = jest.fn();
  const onMonthChangeMock = jest.fn();

  let component: ReactWrapper<DatePickerRootProps>;

  beforeEach(() => {
    component = mount(
      <DatePickerRoot
        date={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        onMonthChange={onMonthChangeMock}
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
    expect(onMonthChangeMock).toHaveBeenCalled();
  });
});

describe('e2e -- DatePickerRoot views year and month open from year', () => {
  const onChangeMock = jest.fn();
  let component: ReactWrapper<DatePickerRootProps>;

  beforeEach(() => {
    component = mount(
      <DatePickerRoot
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
