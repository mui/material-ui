import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { expect } from 'chai';
import { screen } from 'test/utils';
import { createPickerRenderer } from '../internal/pickers/test-utils';

describe('<DateTimePicker />', () => {
  const { render } = createPickerRenderer();

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
  it('prop `showToolbar` – renders toolbar in DateTimePicker', () => {
    render(
      <DateTimePicker
        open
        showToolbar
        onChange={() => {}}
        value={null}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    expect(screen.getByMuiTest('picker-toolbar')).toBeVisible();
  });
});
