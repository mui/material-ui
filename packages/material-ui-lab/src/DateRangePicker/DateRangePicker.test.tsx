import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import { describeConformance } from 'test/utils';
import { createPickerMount } from '../internal/pickers/test-utils';

// TODO: Write tests for responsive pickers.
describe('<DateRangePicker />', () => {
  const mount = createPickerMount();

  describeConformance(
    <DateRangePicker
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
