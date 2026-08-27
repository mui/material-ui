import { describe } from 'vitest';
import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Separator, {
  menu2SeparatorClasses as classes,
} from '@mui/material/Unstable_Menu2Separator';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2Separator />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2Separator />, () => ({
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
    testComponentPropWith: 'span',
    muiName: 'MuiMenu2Separator',
    testVariantProps: { orientation: 'vertical' },
  }));
});
