import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import { TabsContext } from '@mui/base/TabsUnstyled';
import TabsList, { tabsListUnstyledClasses as classes } from '@mui/base/TabsListUnstyled';

describe('<TabsListUnstyled />', () => {
  const { render } = createRenderer();
  const mount = createMount();

  // TODO: Support wrapper for adding TabContext
  // describeConformanceUnstyled(<TabsList />, () => ({
  //   classes,
  //   mount,
  //   inheritComponent: 'div',
  //   render: (node) => render(<TabsContext.Provider value={{ value: "0" }}>{node}</TabsContext.Provider>),
  //   wrapMount: (mount) => (node) => mount(<TabsContext.Provider value={{ value: "0" }}>{node}</TabsContext.Provider>),
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
