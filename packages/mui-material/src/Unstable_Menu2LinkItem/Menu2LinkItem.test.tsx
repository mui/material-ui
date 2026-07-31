import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Unstable_Menu2 from '@mui/material/Unstable_Menu2';
import Unstable_Menu2LinkItem, {
  menu2LinkItemClasses as classes,
} from '@mui/material/Unstable_Menu2LinkItem';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2LinkItem />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Unstable_Menu2LinkItem href="/profile">Profile</Unstable_Menu2LinkItem>,
    () => ({
      classes,
      render: (node) =>
        withPortalledRoot(
          render(
            <Unstable_Menu2 defaultOpen modal={false} anchor={document.body}>
              {node}
            </Unstable_Menu2>,
          ),
          `.${classes.root}`,
        ),
      refInstanceof: window.HTMLAnchorElement,
      muiName: 'MuiMenu2LinkItem',
      testVariantProps: { 'data-variant': 'probe' },
    }),
  );
});
