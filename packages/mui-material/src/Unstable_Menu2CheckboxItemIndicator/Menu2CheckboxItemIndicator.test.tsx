import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2CheckboxItemIndicator, {
  menu2CheckboxItemIndicatorClasses as classes,
} from '@mui/material/Unstable_Menu2CheckboxItemIndicator';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

// The item renders its own indicator; this suppresses it so the suite can
// mount one directly.
function NoIndicator() {
  return null;
}

describe('<Menu2CheckboxItemIndicator />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2CheckboxItemIndicator keepMounted />, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Menu2 defaultOpen modal={false} anchor={document.body}>
            <Menu2CheckboxItem slots={{ indicator: NoIndicator }}>{node}Ruler</Menu2CheckboxItem>
          </Menu2>,
        ),
        `.${classes.root}`,
      ),
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'i',
    muiName: 'MuiMenu2CheckboxItemIndicator',
    testVariantProps: { 'data-variant': 'probe' },
  }));
});
