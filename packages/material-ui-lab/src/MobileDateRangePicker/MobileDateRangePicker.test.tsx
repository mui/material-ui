import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import MobileDateRangePicker from '@material-ui/lab/MobileDateRangePicker';
import { describeConformance } from 'test/utils';
import { createPickerMount, createPickerRender } from '../internal/pickers/test-utils';

describe('<MobileDateRangePicker />', () => {
  const mount = createPickerMount();
  const render = createPickerRender();

  describeConformance(
    <MobileDateRangePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={[null, null]}
    />,
    () => ({
      classes: {},
      mount,
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'mergeClassName', 'propsSpread', 'rootClass', 'reactTestRenderer'],
    }),
  );

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
