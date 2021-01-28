import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { describeConformance } from 'test/utils';
import TimePicker from './TimePicker';
import { createPickerMount } from '../internal/pickers/test-utils';

describe('<TimePicker />', () => {
  const mount = createPickerMount();

  describeConformance(
    <TimePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={null}
    />,
    () => ({
      classes: {},
      mount,
      // TODO: The `ref` on the `TimePicker` is forwarded as `inputRef` in the `renderInput` parameters.
      refInstanceof: window.HTMLInputElement,
      skip: ['componentProp', 'mergeClassName', 'propsSpread', 'rootClass', 'reactTestRenderer'],
    }),
  );
});
