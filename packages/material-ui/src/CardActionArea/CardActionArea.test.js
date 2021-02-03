import * as React from 'react';
import { createMount, describeConformanceV5 } from 'test/utils';
import ButtonBase from '../ButtonBase';
import CardActionArea from './CardActionArea';
import classes from './cardActionAreaClasses';

describe('<CardActionArea />', () => {
  const mount = createMount();

  describeConformanceV5(<CardActionArea />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    muiName: 'MuiCardActionArea',
    testDeepOverrides: { slotName: 'focusHighlight', slotClassName: classes.focusHighlight },
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp', 'componentsProp'],
  }));
});
