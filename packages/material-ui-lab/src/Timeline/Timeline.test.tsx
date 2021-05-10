import * as React from 'react';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import Timeline, { timelineClasses as classes } from '@material-ui/lab/Timeline';

describe('<Timeline />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceV5(<Timeline />, () => ({
    classes,
    inheritComponent: 'ul',
    mount,
    render,
    muiName: 'MuiTimeline',
    refInstanceof: window.HTMLUListElement,
    testVariantProps: { position: 'left' },
    testStateOverrides: { prop: 'position', value: 'left', styleKey: 'positionLeft' },
    skip: ['componentProp', 'componentsProp'],
  }));
});
