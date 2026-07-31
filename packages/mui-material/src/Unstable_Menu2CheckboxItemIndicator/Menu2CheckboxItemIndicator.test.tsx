import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Unstable_Menu2 from '@mui/material/Unstable_Menu2';
import Unstable_Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Unstable_Menu2CheckboxItemIndicator, {
  menu2CheckboxItemIndicatorClasses as classes,
} from '@mui/material/Unstable_Menu2CheckboxItemIndicator';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2CheckboxItemIndicator />', () => {
  const { render } = createRenderer();

  describeConformance(<Unstable_Menu2CheckboxItemIndicator keepMounted />, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Unstable_Menu2 defaultOpen modal={false} anchor={document.body}>
            <Unstable_Menu2CheckboxItem slots={{ indicator: null }}>
              {node}Ruler
            </Unstable_Menu2CheckboxItem>
          </Unstable_Menu2>,
        ),
        `.${classes.root}`,
      ),
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'i',
    muiName: 'MuiMenu2CheckboxItemIndicator',
    testVariantProps: { 'data-variant': 'probe' },
  }));
});
