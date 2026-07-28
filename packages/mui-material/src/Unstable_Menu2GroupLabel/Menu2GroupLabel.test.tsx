import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Unstable_Menu2 from '@mui/material/Unstable_Menu2';
import Unstable_Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Unstable_Menu2Group from '@mui/material/Unstable_Menu2Group';
import Unstable_Menu2GroupLabel, {
  menu2GroupLabelClasses as classes,
} from '@mui/material/Unstable_Menu2GroupLabel';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2GroupLabel />', () => {
  const { render } = createRenderer();

  describeConformance(<Unstable_Menu2GroupLabel>Section</Unstable_Menu2GroupLabel>, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Unstable_Menu2 defaultOpen modal={false}>
            <Unstable_Menu2Popup anchor={document.body}>
              <Unstable_Menu2Group>{node}</Unstable_Menu2Group>
            </Unstable_Menu2Popup>
          </Unstable_Menu2>,
        ),
        `.${classes.root}`,
      ),
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'h3',
    muiName: 'MuiMenu2GroupLabel',
    testVariantProps: { 'data-variant': 'probe' },
  }));
});
