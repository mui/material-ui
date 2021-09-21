import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { expect } from 'chai';
import { screen } from 'test/utils';
import { createPickerRender } from '../internal/pickers/test-utils';

describe('<DateTimePicker />', () => {
  const render = createPickerRender();

  // TODO: Write tests for responsive pickers. This test should be removed after adding actual tests.
  it('renders without crashing', () => {
    render(
      <DateTimePicker
        renderInput={(params) => <TextField {...params} />}
        onChange={() => {}}
        value={null}
      />,
    );
  });

  it('should be render seconds on view', () => {
    const date = new Date(2021, 10, 20, 10, 1, 22);
    render(
      <DateTimePicker
        renderInput={(params) => <TextField {...params} />}
        onChange={() => {}}
        open={Boolean(true)}
        views={['seconds']}
        value={date}
      />,
    );
    expect(screen.getByMuiTest('seconds')).to.have.text('22');
  });

  it('should not be render seconds by default', () => {
    const date = new Date(2021, 10, 20, 10, 1, 22);
    render(
      <DateTimePicker
        renderInput={(params) => <TextField {...params} />}
        onChange={() => {}}
        open={Boolean(true)}
        value={date}
      />,
    );
    expect(() => screen.getByMuiTest('seconds')).throw('Unable to find an element');
  });

  it('should be render date and time by default', () => {
    const date = new Date(2021, 10, 20, 10, 1, 22);
    render(
      <DateTimePicker
        renderInput={(params) => <TextField {...params} />}
        onChange={() => {}}
        open={Boolean(true)}
        value={date}
      />,
    );
    expect(screen.getByMuiTest('hours')).to.have.text('10');
    expect(screen.getByMuiTest('minutes')).to.have.text('01');
    expect(screen.getByMuiTest('datetimepicker-toolbar-year')).to.have.text('2021');
    expect(screen.getByMuiTest('datetimepicker-toolbar-day')).to.have.text('Nov 20');
  });
});
