import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Unstable_Menu2 from '@mui/material/Unstable_Menu2';
import Unstable_Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Unstable_Menu2Separator, {
  menu2SeparatorClasses as classes,
} from '@mui/material/Unstable_Menu2Separator';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2Separator />', () => {
  const { render } = createRenderer();

  describeConformance(<Unstable_Menu2Separator />, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Unstable_Menu2 defaultOpen modal={false}>
            <Unstable_Menu2Popup anchor={document.body}>{node}</Unstable_Menu2Popup>
          </Unstable_Menu2>,
        ),
        `.${classes.root}`,
      ),
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenu2Separator',
    testVariantProps: { orientation: 'vertical' },
  }));
});
