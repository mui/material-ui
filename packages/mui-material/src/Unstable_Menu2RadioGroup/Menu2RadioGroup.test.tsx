import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Unstable_Menu2 from '@mui/material/Unstable_Menu2';
import Unstable_Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Unstable_Menu2RadioGroup, {
  menu2RadioGroupClasses as classes,
} from '@mui/material/Unstable_Menu2RadioGroup';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2RadioGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<Unstable_Menu2RadioGroup>Group</Unstable_Menu2RadioGroup>, () => ({
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
    testComponentPropWith: 'section',
    muiName: 'MuiMenu2RadioGroup',
    testVariantProps: { 'data-variant': 'probe' },
  }));
});
