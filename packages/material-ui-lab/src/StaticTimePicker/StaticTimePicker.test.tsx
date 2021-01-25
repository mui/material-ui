import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { describeConformance } from 'test/utils';
import StaticTimePicker from './StaticTimePicker';
import { createPickerMount } from '../internal/pickers/test-utils';

describe('<StaticTimePicker />', () => {
  const mount = createPickerMount();

  describeConformance(
    <StaticTimePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={null}
    />,
    () => ({
      classes: {},
      mount,
      refInstanceof: undefined,
      skip: [
        'componentProp',
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
