import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import MobileDateRangePicker from '@material-ui/lab/MobileDateRangePicker';
import { createPickerRender } from '../internal/pickers/test-utils';

describe('<MobileDateRangePicker />', () => {
  const render = createPickerRender();

  // TODO: Write actual test. This test should be removed after adding actual tests.
  it('renders without crashing', () => {
    render(
      <MobileDateRangePicker
        renderInput={(params) => <TextField {...params} />}
        onChange={() => {}}
        value={[null, null]}
      />,
    );
  });
});
