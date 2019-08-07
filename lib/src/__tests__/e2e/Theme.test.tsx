import React from 'react';
import { mount } from '../test-utils';
import { DatePicker } from '../../DatePicker';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { DateTimePicker } from '../../DateTimePicker/DateTimePicker';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

test('Should renders without crash in dark theme', () => {
  const component = mount(
    <ThemeProvider theme={theme}>
      <DateTimePicker open openTo="hours" value={null} onChange={jest.fn()} />
    </ThemeProvider>
  );

  expect(component).toBeTruthy();
});

test('Should render component with different orientation', () => {
  const component = mount(
    <DatePicker open orientation="landscape" value={null} onChange={jest.fn()} />
  );

  expect(component).toBeTruthy();
});
