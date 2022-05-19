import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { TabsContext } from '@mui/base/TabsUnstyled';

describe('<TabUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<TabUnstyled value="1" />, () => ({
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
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'div',
    muiName: 'MuiTab',
    slots: {
      root: {
        expectedClassName: tabUnstyledClasses.root,
      },
    },

    skip: [
      'reactTestRenderer', // Need to be wrapped with TabsContext
      'componentsPropsCallbacks', // not implemented yet
    ],
  }));
});
