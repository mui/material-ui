import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import CardActionArea, { cardActionAreaClasses as classes } from '@mui/material/CardActionArea';
import ButtonBase from '@mui/material/ButtonBase';

describe('<CardActionArea />', () => {
  const { render } = createRenderer();

  describeConformance(<CardActionArea />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiCardActionArea',
    testDeepOverrides: { slotName: 'focusHighlight', slotClassName: classes.focusHighlight },
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp', 'componentsProp'],
  }));
});
