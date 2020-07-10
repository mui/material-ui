import React from 'react';
import TextField from '@material-ui/core/TextField';
import { mount } from './test-utils';
import { DatePicker } from '../DatePicker';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { DateTimePicker } from '../DateTimePicker/DateTimePicker';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

it('Should renders without crash in dark theme', () => {
  const component = mount(
    <ThemeProvider theme={theme}>
      <DateTimePicker
        renderInput={props => <TextField {...props} />}
        open
        openTo="hours"
        value={null}
        onChange={jest.fn()}
      />
    </ThemeProvider>
  );

  expect(component).toBeTruthy();
});

it('Should render component with different orientation', () => {
  const component = mount(
    <DatePicker
      renderInput={props => <TextField {...props} />}
      open
      orientation="landscape"
      value={null}
      onChange={jest.fn()}
    />
  );

  expect(component).toBeTruthy();
});
