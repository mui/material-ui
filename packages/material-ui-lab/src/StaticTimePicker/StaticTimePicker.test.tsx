import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { describeConformanceV5 } from 'test/utils';
import StaticTimePicker from './StaticTimePicker';
import { wrapPickerMount } from '../internal/pickers/test-utils';

describe('<StaticTimePicker />', () => {
  describeConformanceV5(
    <StaticTimePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={null}
    />,
    () => ({
      classes: {},
      wrapMount: wrapPickerMount,
      refInstanceof: undefined,
      skip: [
        'componentProp',
        'componentsProp',
        'themeDefaultProps',
        'mergeClassName',
        'propsSpread',
        // TODO: `ref` is typed but has no effect
        'refForwarding',
        'rootClass',
        'reactTestRenderer',
      ],
    }),
  );
});
