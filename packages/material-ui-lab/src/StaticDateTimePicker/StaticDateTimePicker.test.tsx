import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { expect } from 'chai';
import { spy, useFakeTimers, SinonFakeTimers } from 'sinon';
import { fireEvent, screen } from 'test/utils';
import StaticDateTimePicker from '@material-ui/lab/StaticDateTimePicker';
import { adapterToUse, createPickerRender } from '../internal/pickers/test-utils';

describe('<StaticDateTimePicker />', () => {
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = useFakeTimers(adapterToUse.date('2018-01-01T00:00:00.000').getTime());
  });

  afterEach(() => {
    clock.restore();
  });

  const render = createPickerRender();

  it('allows to select the same day and move to the next view', () => {
    const onChangeMock = spy();
    render(
      <StaticDateTimePicker
        onChange={onChangeMock}
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
      />,
    );

    fireEvent.click(screen.getByLabelText('Jan 1, 2018'));
    expect(onChangeMock.callCount).to.equal(1);

    expect(screen.getByLabelText(/Selected time/)).toBeVisible();
  });
});
