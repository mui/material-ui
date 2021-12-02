import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import Timeline, { timelineClasses as classes } from '@mui/lab/Timeline';

describe('<Timeline />', () => {
  const { render } = createRenderer();

  describeConformance(<Timeline />, () => ({
    classes,
    inheritComponent: 'ul',
    render,
    muiName: 'MuiTimeline',
    refInstanceof: window.HTMLUListElement,
    testVariantProps: { position: 'left' },
    testStateOverrides: { prop: 'position', value: 'left', styleKey: 'positionLeft' },
    skip: ['componentProp', 'componentsProp'],
  }));
});
