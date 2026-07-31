import * as React from 'react';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import Unstable_Menu2 from '@mui/material/Unstable_Menu2';
import Unstable_Menu2Item from '@mui/material/Unstable_Menu2Item';
import Unstable_Menu2SubmenuRoot from '@mui/material/Unstable_Menu2SubmenuRoot';
import Unstable_Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import Unstable_Menu2SubmenuPopup, {
  menu2SubmenuPopupClasses as classes,
} from '@mui/material/Unstable_Menu2SubmenuPopup';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

// Base UI submenus need layout to open, which jsdom does not provide, so the
// nested popup never mounts there; run this suite in the browser project.
describe.skipIf(isJsdom())('<Menu2SubmenuPopup />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Unstable_Menu2SubmenuPopup>
      <Unstable_Menu2Item>Nested</Unstable_Menu2Item>
    </Unstable_Menu2SubmenuPopup>,
    () => ({
      classes,
      render: (node) =>
        withPortalledRoot(
          render(
            <Unstable_Menu2 defaultOpen modal={false} anchor={document.body}>
              <Unstable_Menu2SubmenuRoot defaultOpen>
                <Unstable_Menu2SubmenuTrigger>More</Unstable_Menu2SubmenuTrigger>
                {node}
              </Unstable_Menu2SubmenuRoot>
            </Unstable_Menu2>,
          ),
          `.${classes.root}`,
        ),
      // The popup root is the Base UI Popup element; swapping the host goes
      // through slots.popup rather than the component prop.
      skip: ['componentProp'],
      refInstanceof: window.HTMLDivElement,
      muiName: 'MuiMenu2SubmenuPopup',
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
