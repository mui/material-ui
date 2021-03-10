import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import MobileDateRangePicker from '@material-ui/lab/MobileDateRangePicker';
import { describeConformance } from 'test/utils';
import { createPickerMount } from '../internal/pickers/test-utils';

describe('<MobileDateRangePicker />', () => {
  const mount = createPickerMount();

  describeConformance(
    <MobileDateRangePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={[null, null]}
    />,
    () => ({
      classes: {},
      // TODO: Does not apply if `propsSpread` and `mergeClassName` aren't implemented.
      // inheritComponent: 'div',
      mount,
      // TODO: How do we document the component that is referenced?
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'mergeClassName', 'propsSpread', 'reactTestRenderer'],
    }),
  );
});
