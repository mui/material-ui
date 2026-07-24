import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Unstable_Menu2 from '@mui/material/Unstable_Menu2';
import Unstable_Menu2Item from '@mui/material/Unstable_Menu2Item';
import Unstable_Menu2Popup, {
  menu2PopupClasses as classes,
} from '@mui/material/Unstable_Menu2Popup';
import describeConformance from '../../test/describeConformance';

describe('<Menu2Popup />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Unstable_Menu2Popup anchor={() => document.body}>
      <Unstable_Menu2Item>Item</Unstable_Menu2Item>
    </Unstable_Menu2Popup>,
    () => ({
      classes,
      render: (node) => {
        const { container, ...other } = render(
          <Unstable_Menu2 defaultOpen modal={false}>
            {node}
          </Unstable_Menu2>,
        );
        // The popup renders in a portal surrounded by Base UI focus-guard
        // spans, so no real parent has it as firstChild; hand the harness a
        // container satisfying its firstChild contract.
        const popup = document.querySelector('[role="menu"]')!;
        return { ...other, container: { firstChild: popup } as unknown as HTMLElement };
      },
      // The popup root is the Base UI Popup element; swapping the host goes
      // through slots.popup rather than the component prop.
      skip: ['componentProp'],
      refInstanceof: window.HTMLDivElement,
      muiName: 'MuiMenu2Popup',
      testVariantProps: { align: 'center' },
      slots: {
        paper: {
          expectedClassName: classes.paper,
        },
        list: {
          expectedClassName: classes.list,
        },
      },
    }),
  );
});
