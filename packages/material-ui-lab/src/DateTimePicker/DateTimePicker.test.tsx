import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
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
});
