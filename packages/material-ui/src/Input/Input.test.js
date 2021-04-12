import * as React from 'react';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import InputBase from '@material-ui/core/InputBase';
import Input, { inputClasses as classes } from '@material-ui/core/Input';

describe('<Input />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<Input />, () => ({
    classes,
    inheritComponent: InputBase,
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiInput',
    testDeepOverrides: { slotName: 'input', slotClassName: classes.input },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    skip: ['componentProp', 'componentsProp'],
  }));
});
