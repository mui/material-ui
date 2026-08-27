import { describe } from 'vitest';
import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Group, { menu2GroupClasses as classes } from '@mui/material/Unstable_Menu2Group';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2Group />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2Group>Group</Menu2Group>, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Menu2 defaultOpen modal={false} anchor={document.body}>
            {node}
          </Menu2>,
        ),
        `.${classes.root}`,
      ),
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'section',
    muiName: 'MuiMenu2Group',
    testVariantProps: { 'data-variant': 'probe' },
  }));
});
