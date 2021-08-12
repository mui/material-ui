import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformanceV5, fireEvent, screen } from 'test/utils';
import PickersDay, { pickersDayClasses as classes } from '@material-ui/lab/PickersDay';
import { adapterToUse, wrapPickerMount, createPickerRender } from '../internal/pickers/test-utils';

describe('<PickersDay />', () => {
  const render = createPickerRender();

  describeConformanceV5(
    <PickersDay
      day={adapterToUse.date()}
      outsideCurrentMonth={false}
      selected
      onDaySelect={() => {}}
    />,
    () => ({
      classes,
      inheritComponent: 'button',
      render,
      wrapMount: wrapPickerMount,
      muiName: 'MuiPickersDay',
      refInstanceof: window.HTMLButtonElement,
      testVariantProps: { variant: 'disableMargin' },
      // cannot test reactTestRenderer because of required context
      skip: ['componentProp', 'componentsProp', 'reactTestRenderer'],
    }),
  );

  it('selects the date on click, Enter and Space', () => {
    const handleDaySelect = spy();
    const day = adapterToUse.date();
    render(<PickersDay day={day} outsideCurrentMonth={false} onDaySelect={handleDaySelect} />);
    const targetDay = screen.getByRole('button', {
      name: `${adapterToUse.format(day, 'fullDate')}`,
    });

    // A native button implies Enter and Space keydown behavior
    // These keydown events only trigger click behavior if they're trusted (programmatically dispatched events aren't trusted).
    // If this breaks, make sure to add tests for
    // - fireEvent.keyDown(targetDay, { key: 'Enter' })
    // - fireEvent.keyUp(targetDay, { key: 'Space' })
    expect(targetDay.tagName).to.equal('BUTTON');

    fireEvent.click(targetDay);

    expect(handleDaySelect.callCount).to.equal(1);
    expect(handleDaySelect.args[0][0]).toEqualDateTime(day);
  });

  it('renders the day of the month by default', () => {
    render(
      <PickersDay
        day={adapterToUse.date('2020-02-02T02:02:02.000')}
        onDaySelect={() => {}}
        outsideCurrentMonth={false}
      />,
    );

    const day = screen.getByRole('button');
    // TODO: This can be disorienting if the accessible name is not the same as the visible label
    // Investigate if we can drop `aria-label` and let screenreaders announce the full date in a calendar picker.
    expect(day).to.have.text('2');
    expect(day).toHaveAccessibleName('Feb 2, 2020');
  });

  it('should render children instead of the day of the month when children prop is present', () => {
    render(
      <PickersDay
        day={adapterToUse.date('2020-02-02T02:02:02.000')}
        outsideCurrentMonth={false}
        onDaySelect={() => {}}
      >
        2 (free)
      </PickersDay>,
    );

    const day = screen.getByRole('button');
    expect(day).to.have.text('2 (free)');
    expect(day).toHaveAccessibleName('2 (free)');
  });
});
