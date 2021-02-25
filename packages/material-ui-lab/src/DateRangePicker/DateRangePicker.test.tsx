import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import { createPickerRender } from '../internal/pickers/test-utils';

describe('<DateRangePicker />', () => {
  const render = createPickerRender();

  // TODO: Write tests for responsive pickers. This test should be removed after adding actual tests.
  it('renders without crashing', () => {
    render(
      <DateRangePicker
        renderInput={(params) => <TextField {...params} />}
        onChange={() => {}}
        value={[null, null]}
      />,
    );
  });
});
