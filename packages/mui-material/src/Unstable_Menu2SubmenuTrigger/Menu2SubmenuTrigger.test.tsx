import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Unstable_Menu2 from '@mui/material/Unstable_Menu2';
import Unstable_Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Unstable_Menu2SubmenuRoot from '@mui/material/Unstable_Menu2SubmenuRoot';
import Unstable_Menu2SubmenuTrigger, {
  menu2SubmenuTriggerClasses as classes,
} from '@mui/material/Unstable_Menu2SubmenuTrigger';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2SubmenuTrigger />', () => {
  const { render } = createRenderer();

  describeConformance(<Unstable_Menu2SubmenuTrigger>More</Unstable_Menu2SubmenuTrigger>, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Unstable_Menu2 defaultOpen modal={false}>
            <Unstable_Menu2Popup anchor={document.body}>
              <Unstable_Menu2SubmenuRoot>{node}</Unstable_Menu2SubmenuRoot>
            </Unstable_Menu2Popup>
          </Unstable_Menu2>,
        ),
        `.${classes.root}`,
      ),
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenu2SubmenuTrigger',
    testVariantProps: { dense: true },
  }));
});
