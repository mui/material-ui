import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import TabPanelUnstyled, { tabPanelUnstyledClasses } from '@mui/core/TabPanelUnstyled';

describe('<TabPanelUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<TabPanelUnstyled value="1" />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiTabPanel',
    slots: {
      root: {
        expectedClassName: tabPanelUnstyledClasses.root,
      },
    },
  }));
});
