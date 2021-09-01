import * as React from 'react';
import TextField from '@mui/material/TextField';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import { describeConformance } from 'test/utils';
import { wrapPickerMount, createPickerRender } from '../internal/pickers/test-utils';

describe('<MobileDateRangePicker />', () => {
  const render = createPickerRender();

  describeConformance(
    <MobileDateRangePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={[null, null]}
    />,
    () => ({
      classes: {},
      muiName: 'MuiMobileDateRangePicker',
      wrapMount: wrapPickerMount,
      refInstanceof: window.HTMLDivElement,
      skip: [
        'componentProp',
        'componentsProp',
        'themeDefaultProps',
        'themeStyleOverrides',
        'themeVariants',
        'mergeClassName',
        'propsSpread',
        'rootClass',
        'reactTestRenderer',
      ],
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
