import * as React from 'react';
import { createMount, describeConformanceV5 } from 'test/utils';
import Input from './Input';
import InputBase from '../InputBase';
import classes from './inputClasses';

describe('<Input />', () => {
  const mount = createMount();

  describeConformanceV5(<Input />, () => ({
    classes,
    inheritComponent: InputBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiInput',
    testDeepOverrides: { slotName: 'input', slotClassName: classes.input },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    skip: ['componentProp', 'componentsProp'],
  }));
});
