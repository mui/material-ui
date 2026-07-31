import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Unstable_Menu2 from '@mui/material/Unstable_Menu2';
import Unstable_Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Unstable_Menu2RadioItem, {
  menu2RadioItemClasses as classes,
} from '@mui/material/Unstable_Menu2RadioItem';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2RadioItem />', () => {
  const { render } = createRenderer();

  describeConformance(<Unstable_Menu2RadioItem value="one">One</Unstable_Menu2RadioItem>, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Unstable_Menu2 defaultOpen modal={false} anchor={document.body}>
            <Unstable_Menu2RadioGroup>{node}</Unstable_Menu2RadioGroup>
          </Unstable_Menu2>,
        ),
        `.${classes.root}`,
      ),
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenu2RadioItem',
    testVariantProps: { 'data-variant': 'probe' },
  }));
});
