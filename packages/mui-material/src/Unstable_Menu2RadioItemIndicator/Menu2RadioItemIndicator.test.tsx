import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2RadioItemIndicator, {
  menu2RadioItemIndicatorClasses as classes,
} from '@mui/material/Unstable_Menu2RadioItemIndicator';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

// The item renders its own indicator; this suppresses it so the suite can
// mount one directly.
function NoIndicator() {
  return null;
}

describe('<Menu2RadioItemIndicator />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2RadioItemIndicator keepMounted />, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Menu2 defaultOpen modal={false} anchor={document.body}>
            <Menu2RadioGroup>
              <Menu2RadioItem value="one" slots={{ indicator: NoIndicator }}>
                {node}One
              </Menu2RadioItem>
            </Menu2RadioGroup>
          </Menu2>,
        ),
        `.${classes.root}`,
      ),
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'i',
    muiName: 'MuiMenu2RadioItemIndicator',
    testVariantProps: { 'data-variant': 'probe' },
  }));
});
