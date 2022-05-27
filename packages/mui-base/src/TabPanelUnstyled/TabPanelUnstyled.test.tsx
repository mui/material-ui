import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import { TabsContext } from '@mui/base/TabsUnstyled';
import TabPanelUnstyled, { tabPanelUnstyledClasses } from '@mui/base/TabPanelUnstyled';

describe('<TabPanelUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<TabPanelUnstyled value="1" />, () => ({
    inheritComponent: 'div',
    render: (node) => {
      const { container, ...other } = render(
        <TabsContext.Provider value={{ value: '1', idPrefix: '1', onSelected: () => {} }}>
          {node}
        </TabsContext.Provider>,
      );

      return { container, ...other };
    },
    mount: (node: any) => {
      const wrapper = mount(
        <TabsContext.Provider value={{ value: '1', idPrefix: '1', onSelected: () => {} }}>
          {node}
        </TabsContext.Provider>,
      );
      return wrapper.childAt(0);
    },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiTabPanel',
    slots: {
      root: {
        expectedClassName: tabPanelUnstyledClasses.root,
      },
    },

    skip: [
      'reactTestRenderer', // Need to be wrapped with TabsContext
      'componentsPropsCallbacks', // not implemented yet
    ],
  }));
});
