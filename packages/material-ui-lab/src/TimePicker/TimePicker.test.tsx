import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { describeConformanceV5 } from 'test/utils';
import TimePicker from './TimePicker';
import { wrapPickerMount } from '../internal/pickers/test-utils';

describe('<TimePicker />', () => {
  describeConformanceV5(
    <TimePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={null}
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
});
