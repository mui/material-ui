import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import PickerStaticWrapper, { pickerStaticWrapperClasses as classes } from './PickerStaticWrapper';

describe('<PickerStaticWrapper />', () => {
  const { render } = createRenderer();

  describeConformance(<PickerStaticWrapper displayStaticWrapperAs="mobile" />, () => ({
    classes,
    muiName: 'MuiPickerStaticWrapper',
    refInstanceof: undefined,
    render,
    skip: [
      'componentProp',
      'componentsProp',
      'themeVariants',
      'propsSpread',
      'refForwarding',
      'rootClass',
    ],
  }));
});
