import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import CardActionArea, { cardActionAreaClasses as classes } from '@material-ui/core/CardActionArea';
import ButtonBase from '@material-ui/core/ButtonBase';

describe('<CardActionArea />', () => {
  const render = createClientRender();

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
