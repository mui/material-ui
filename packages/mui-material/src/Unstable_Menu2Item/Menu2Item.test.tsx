import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item, { menu2ItemClasses as classes } from '@mui/material/Unstable_Menu2Item';
import describeConformance from '../../test/describeConformance';

describe('<Menu2Item />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2Item>Item</Menu2Item>, () => ({
    classes,
    render: (node) => {
      const { container, ...other } = render(
        <Menu2 defaultOpen modal={false} anchor={document.body}>
          {node}
        </Menu2>,
      );
      // The popup renders in a portal; hand the harness a container whose
      // firstChild is the item root (the conformance contract).
      const item = document.querySelector('[role="menuitem"]')!;
      return { ...other, container: { firstChild: item } as unknown as HTMLElement };
    },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenu2Item',
    testVariantProps: { dense: true },
  }));
});
