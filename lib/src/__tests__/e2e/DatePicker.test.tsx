import * as React from 'react';
// import { act } from 'react-dom'
import { ReactWrapper } from 'enzyme';
import { Picker } from '../../Picker/Picker';
import { mount, utilsToUse } from '../test-utils';
import {
  DatePicker,
  MobileDatePicker,
  DesktopDatePicker,
  DatePickerProps,
} from '../../DatePicker/DatePicker';

describe('e2e - DatePicker default year format', () => {
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();
  const date = utilsToUse.date('2018-01-01T00:00:00.000Z');

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <DatePicker
        DialogProps={{}}
        PopoverProps={{}}
        desktopModeBreakpoint="xs"
        value={utilsToUse.date('2018-01-01T00:00:00.000')}
        onChange={onChangeMock}
        views={['year']}
      />
    );
  });

  it('Should use year format by default for year only view', () => {
    expect(component.find('input').props().value).toBe(utilsToUse.format(date, 'year'));
  });
});

describe('e2e - DatePicker default year month format', () => {
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();
  const date = utilsToUse.date('2018-01-01T00:00:00.000Z');

  beforeEach(() => {
    component = mount(
      <MobileDatePicker onChange={onChangeMock} value={date} views={['year', 'month']} />
    );
  });

  it('Should use year month format by default for year & month views', () => {
    expect(component.find('input').props().value).toBe(utilsToUse.format(date, 'monthAndYear'));
  });
});

describe('e2e - DatePicker default year month day format', () => {
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();
  const date = utilsToUse.date('2018-01-01T00:00:00.000Z');

  beforeEach(() => {
    component = mount(
      <MobileDatePicker onChange={onChangeMock} value={date} views={['year', 'month', 'date']} />
    );
  });

  it('Should use default for year & month & day views', () => {
    expect(component.find('input').props().value).toBe(utilsToUse.format(date, 'keyboardDate'));
  });
});

describe.only('e2e - DatePicker inline variant', () => {
  let component: ReactWrapper<DatePickerProps>;
  const onChangeMock = jest.fn();
  const onCloseMock = jest.fn();
  const onOpenMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <DesktopDatePicker
        autoOk
        onChange={onChangeMock}
        onClose={onCloseMock}
        onOpen={onOpenMock}
        loadingIndicator={<div data-mui-test="loading" />}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );
  });

  it('Should open modal with picker on click', () => {
    component.find('button[data-mui-test="open-picker-from-keyboard"]').simulate('click');

    expect(component.find(Picker)).toHaveLength(1);
    expect(onOpenMock).toHaveBeenCalled();
  });

  it.skip('Should close on popover close request', () => {
    component.find('button[data-mui-test="open-picker-from-keyboard"]').simulate('click');
    const popoverOnClose = component
      .find('WithStyles(ForwardRef(Popover))')
      .prop('onClose') as () => void;

    popoverOnClose();

    expect(component.find(Picker)).toHaveLength(0);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('Should dispatch onChange and close on day select', () => {
    component.find('button[data-mui-test="open-picker-from-keyboard"]').simulate('click');
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
      <MobileDatePicker
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
      <MobileDatePicker
        open
        onChange={onChangeMock}
        onMonthChange={onMonthChangeMock}
        value={date}
      />
    );
  });

  it('Should not add to loading queue when synchronous', () => {
    component
      .find('button[data-mui-test="previous-arrow-button"]')
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
      <MobileDatePicker
        open
        onChange={onChangeMock}
        onMonthChange={onMonthChangeAsyncMock}
        value={date}
      />
    );
  });

  it('Should add to loading queue when loading asynchronous data', () => {
    component.find('button[data-mui-test="previous-arrow-button"]').simulate('click');

    expect(component.find('[data-mui-test="loading-progress"]').length).toBeGreaterThan(1);
  });

  it.skip('Should empty loading queue after loading asynchronous data', async () => {
    component.find('button[data-mui-test="previous-arrow-button"]').simulate('click');
    jest.runTimersToTime(10);

    expect(component.find('[data-mui-test="loading-progress"]').length).toBe(0);
  });
});

test('Custom toolbar component', () => {
  const component = mount(
    <MobileDatePicker
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
    <MobileDatePicker
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
