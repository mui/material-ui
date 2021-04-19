import * as React from 'react';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import Timeline, { timelineClasses as classes } from './index';

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
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));
});
