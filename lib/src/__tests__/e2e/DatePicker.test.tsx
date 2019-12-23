import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import { mount, utilsToUse } from '../test-utils';
import { DatePicker, DatePickerProps } from '../../DatePicker/DatePicker';

describe('e2e - DatePicker default year format', () => {
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();
  const date = utilsToUse.date('2018-01-01T00:00:00.000Z');

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <DatePicker
        value={utilsToUse.date('2018-01-01T00:00:00.000')}
        onChange={onChangeMock}
        views={['year']}
      />
    );
  });

  it('Should use year format by default for year only view', () => {
    expect(component.find('input').props().value).toBe(
      utilsToUse.format(date, utilsToUse.yearFormat)
    );
  });
});

describe('e2e - DatePicker default year month format', () => {
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();
  const date = utilsToUse.date('2018-01-01T00:00:00.000Z');

  beforeEach(() => {
    component = mount(
      <DatePicker onChange={onChangeMock} value={date} views={['year', 'month']} />
    );
  });

  it('Should use year month format by default for year & month views', () => {
    expect(component.find('input').props().value).toBe(
      utilsToUse.format(date, utilsToUse.yearMonthFormat)
    );
  });
});

describe('e2e - DatePicker default year month day format', () => {
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();
  const date = utilsToUse.date('2018-01-01T00:00:00.000Z');

  beforeEach(() => {
    component = mount(
      <DatePicker onChange={onChangeMock} value={date} views={['year', 'month', 'date']} />
    );
  });

  it('Should use default for year & month & day views', () => {
    expect(component.find('input').props().value).toBe(
      utilsToUse.format(date, utilsToUse.dateFormat)
    );
  });
});

describe('e2e - DatePicker inline variant', () => {
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();
  const onCloseMock = jest.fn();
  const onOpenMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <DatePicker
        autoOk
        variant="inline"
        onChange={onChangeMock}
        onClose={onCloseMock}
        onOpen={onOpenMock}
        loadingIndicator={<div data-mui-test="loading" />}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should open modal with picker on click', () => {
    component.find('input').simulate('click');

    expect(component.find('WithStyles(ForwardRef(Popover))').props().open).toBeTruthy();
    expect(onOpenMock).toHaveBeenCalled();
  });

  it('Should close on popover close request', () => {
    const popoverOnClose = component
      .find('WithStyles(ForwardRef(Popover))')
      .prop('onClose') as () => void;

    popoverOnClose();

    expect(component.find('WithStyles(ForwardRef(Popover))').prop('open')).toBeFalsy();
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('Should dispatch onChange and close on day select', () => {
    component.find('input').simulate('click');
    component
      .find('Day button')
      .at(10)
      .simulate('click');

    expect(onChangeMock).toHaveBeenCalled();
    expect(component.find('WithStyles(ForwardRef(Popover))').props().open).toBeFalsy();
  });
});

describe('e2e - DatePicker without month change', () => {
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();
  const date = utilsToUse.date('2018-01-01T00:00:00.000Z');

  beforeEach(() => {
    component = mount(
      <DatePicker
        open
        loadingIndicator={<div data-mui-test="loading" />}
        onChange={onChangeMock}
        value={date}
      />
    );
  });

  it('Should not add to loading queue if callback is undefined', () => {
    component
      .find('CalendarHeader button')
      .first()
      .simulate('click');

    expect(component.find('[data-mui-test="loading"]').length).toEqual(0);
  });
});

describe('e2e - DatePicker month change sync', () => {
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();
  const onMonthChangeMock = jest.fn();

  const date = utilsToUse.date('2018-01-01T00:00:00.000Z');
  beforeEach(() => {
    component = mount(
      <DatePicker open onChange={onChangeMock} onMonthChange={onMonthChangeMock} value={date} />
    );
  });

  it('Should not add to loading queue when synchronous', () => {
    component
      .find('button[data-mui-test="previous-month"]')
      .first()
      .simulate('click');

    expect(component.find('[data-mui-test="loading-progress"]').length).toBe(0);
  });
});

describe('e2e - DatePicker month change async', () => {
  jest.useFakeTimers();
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();

  const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
  const onMonthChangeAsyncMock = jest.fn(() => sleep(10));

  const date = utilsToUse.date('2018-01-01T00:00:00.000Z');

  beforeEach(() => {
    component = mount(
      <DatePicker
        open
        onChange={onChangeMock}
        onMonthChange={onMonthChangeAsyncMock}
        value={date}
      />
    );
  });

  it('Should add to loading queue when loading asynchronous data', () => {
    component.find('button[data-mui-test="previous-month"]').simulate('click');

    expect(component.find('[data-mui-test="loading-progress"]').length).toBeGreaterThan(1);
  });

  it.skip('Should empty loading queue after loading asynchronous data', async () => {
    component.find('button[data-mui-test="previous-month"]').simulate('click');
    jest.runTimersToTime(10);

    expect(component.find('[data-mui-test="loading-progress"]').length).toBe(0);
  });
});

test('Custom toolbar component', () => {
  const component = mount(
    <DatePicker
      open
      inputProps={{}}
      value={new Date()}
      onChange={jest.fn()}
      ToolbarComponent={() => <div id="custom-toolbar" />}
    />
  );

  expect(component.find('#custom-toolbar').length).toBe(1);
});

test('Selected date is disabled', () => {
  const component = mount(
    <DatePicker
      open
      value={utilsToUse.date('01-01-2019')}
      maxDate={utilsToUse.date('01-01-2018')}
      onChange={jest.fn()}
    />
  );

  expect(
    component
      .find('[data-mui-test="calendar-year-text"]')
      .first()
      .text()
  ).toBe('2018');
  expect(
    component
      .find('[data-mui-test="calendar-month-text"]')
      .first()
      .text()
  ).toBe('January');
});
