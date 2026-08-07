import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2RadioGroup, {
  menu2RadioGroupClasses as classes,
} from '@mui/material/Unstable_Menu2RadioGroup';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2RadioGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2RadioGroup>Group</Menu2RadioGroup>, () => ({
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
    muiName: 'MuiMenu2RadioGroup',
    testVariantProps: { 'data-variant': 'probe' },
  }));
});
