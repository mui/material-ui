import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Unstable_Menu2 from '@mui/material/Unstable_Menu2';
import Unstable_Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Unstable_Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Unstable_Menu2RadioItemIndicator, {
  menu2RadioItemIndicatorClasses as classes,
} from '@mui/material/Unstable_Menu2RadioItemIndicator';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2RadioItemIndicator />', () => {
  const { render } = createRenderer();

  describeConformance(<Unstable_Menu2RadioItemIndicator keepMounted />, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Unstable_Menu2 defaultOpen modal={false} anchor={document.body}>
            <Unstable_Menu2RadioGroup>
              <Unstable_Menu2RadioItem value="one" slots={{ indicator: null }}>
                {node}One
              </Unstable_Menu2RadioItem>
            </Unstable_Menu2RadioGroup>
          </Unstable_Menu2>,
        ),
        `.${classes.root}`,
      ),
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'i',
    muiName: 'MuiMenu2RadioItemIndicator',
    testVariantProps: { 'data-variant': 'probe' },
  }));
});
