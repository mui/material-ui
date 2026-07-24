import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Unstable_Menu2 from '@mui/material/Unstable_Menu2';
import Unstable_Menu2Item, { menu2ItemClasses as classes } from '@mui/material/Unstable_Menu2Item';
import Unstable_Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import describeConformance from '../../test/describeConformance';

describe('<Menu2Item />', () => {
  const { render } = createRenderer();

  describeConformance(<Unstable_Menu2Item>Item</Unstable_Menu2Item>, () => ({
    classes,
    render: (node) => {
      const { container, ...other } = render(
        <Unstable_Menu2 defaultOpen modal={false}>
          <Unstable_Menu2Popup anchor={document.body}>{node}</Unstable_Menu2Popup>
        </Unstable_Menu2>,
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
