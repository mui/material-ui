import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import TabUnstyled, { tabUnstyledClasses as classes } from '@mui/core/TabUnstyled';

describe('<TabUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  // TODO: Support wrapper for adding TabContext
  // describeConformanceUnstyled(<TabUnstyled value={0} />, () => ({
  //   classes,
  //   inheritComponent: 'div',
  //   render,
  //   mount,
  //   muiName: 'MuiTabs',
  //   refInstanceof: window.HTMLDivElement,
  //   testComponentPropWith: 'header',
  //   slots: {
  //     root: {
  //       expectedClassName: classes.root,
  //     },
  //   },
  // }));
});
