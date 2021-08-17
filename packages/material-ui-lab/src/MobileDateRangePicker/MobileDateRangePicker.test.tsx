import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import MobileDateRangePicker from '@material-ui/lab/MobileDateRangePicker';
import { describeConformanceV5 } from 'test/utils';
import { wrapPickerMount, createPickerRender } from '../internal/pickers/test-utils';

describe('<MobileDateRangePicker />', () => {
  const render = createPickerRender();

  describeConformanceV5(
    <MobileDateRangePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={[null, null]}
    />,
    () => ({
      classes: {},
      wrapMount: wrapPickerMount,
      refInstanceof: window.HTMLDivElement,
      skip: [
        'componentProp',
        'componentsProp',
        'themeDefaultProps',
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
