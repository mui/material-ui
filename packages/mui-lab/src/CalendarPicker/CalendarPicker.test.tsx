import * as React from 'react';
import { expect } from 'chai';
import { SinonFakeTimers, spy, useFakeTimers } from 'sinon';
import { fireEvent, screen, describeConformance } from 'test/utils';
import CalendarPicker, { calendarPickerClasses as classes } from '@mui/lab/CalendarPicker';
import {
  adapterToUse,
  wrapPickerMount,
  createPickerRenderer,
} from '../internal/pickers/test-utils';

describe('<CalendarPicker />', () => {
  let clock: SinonFakeTimers;
  beforeEach(() => {
    clock = useFakeTimers();
  });
  afterEach(() => {
    clock.restore();
  });

  const { render } = createPickerRenderer();

  describeConformance(<CalendarPicker date={adapterToUse.date()} onChange={() => {}} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiCalendarPicker',
    wrapMount: wrapPickerMount,
    refInstanceof: window.HTMLDivElement,
    // cannot test reactTestRenderer because of required context
    skip: [
      'componentProp',
      'componentsProp',
      'propsSpread',
      'reactTestRenderer',
      // TODO: Fix CalendarPicker is not spreading props on root
      'themeDefaultProps',
      'themeVariants',
    ],
  }));

  it('renders calendar standalone', () => {
    render(
      <CalendarPicker date={adapterToUse.date('2019-01-01T00:00:00.000')} onChange={() => {}} />,
    );

    expect(screen.getByText('January')).toBeVisible();
    expect(screen.getByText('2019')).toBeVisible();
    expect(screen.getAllByMuiTest('day')).to.have.length(31);
    // It should follow https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
    expect(
      document.querySelector('[role="grid"] > [role="row"] > [role="cell"] > button'),
    ).to.have.text('1');
  });

  it('renders year selection standalone', () => {
    render(
      <CalendarPicker
        date={adapterToUse.date('2019-01-01T00:00:00.000')}
        openTo="year"
        onChange={() => {}}
      />,
    );

    expect(screen.getAllByMuiTest('year')).to.have.length(200);
  });

  it('switches between views uncontrolled', () => {
    const handleViewChange = spy();
    render(
      <CalendarPicker
        date={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={() => {}}
        onViewChange={handleViewChange}
      />,
    );

    fireEvent.click(screen.getByLabelText(/switch to year view/i));

    expect(handleViewChange.callCount).to.equal(1);
    expect(screen.queryByLabelText(/switch to year view/i)).to.equal(null);
    expect(screen.getByLabelText('year view is open, switch to calendar view')).toBeVisible();
  });

  it('allows month and view changing, but not selection when readOnly prop is passed', () => {
    const onChangeMock = spy();
    const onMonthChangeMock = spy();
    render(
      <CalendarPicker
        date={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={onChangeMock}
        onMonthChange={onMonthChangeMock}
        readOnly
      />,
    );

    fireEvent.click(screen.getByTitle('Previous month'));
    expect(onMonthChangeMock.callCount).to.equal(1);

    fireEvent.click(screen.getByTitle('Next month'));
    expect(onMonthChangeMock.callCount).to.equal(2);

    fireEvent.click(screen.getByLabelText(/Jan 5, 2019/i));
    expect(onChangeMock.callCount).to.equal(0);

    fireEvent.click(screen.getByText('January'));
    expect(screen.queryByLabelText('year view is open, switch to calendar view')).toBeVisible();
  });

  it('does not allow interaction when disabled prop is passed', () => {
    const onChangeMock = spy();
    const onMonthChangeMock = spy();
    render(
      <CalendarPicker
        date={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={onChangeMock}
        onMonthChange={onMonthChangeMock}
        disabled
      />,
    );

    fireEvent.click(screen.getByText('January'));
    expect(screen.queryByText('January')).toBeVisible();
    expect(screen.queryByLabelText('year view is open, switch to calendar view')).to.equal(null);

    fireEvent.click(screen.getByTitle('Previous month'));
    expect(onMonthChangeMock.callCount).to.equal(1);

    fireEvent.click(screen.getByTitle('Next month'));
    expect(onMonthChangeMock.callCount).to.equal(1);

    fireEvent.click(screen.getByLabelText(/Jan 5, 2019/i));
    expect(onChangeMock.callCount).to.equal(0);
  });
});
