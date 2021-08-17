import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { describeConformance } from 'test/utils';
import TimePicker from './TimePicker';
import { wrapPickerMount } from '../internal/pickers/test-utils';

describe('<TimePicker />', () => {
  describeConformance(
    <TimePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={null}
    />,
    () => ({
      classes: {},
      muiName: 'MuiTimePicker',
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
});
