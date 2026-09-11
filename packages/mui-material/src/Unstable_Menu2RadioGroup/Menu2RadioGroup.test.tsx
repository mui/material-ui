import { describe } from 'vitest';
import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2RadioGroup, {
  menu2RadioGroupClasses as classes,
} from '@mui/material/Unstable_Menu2RadioGroup';
import describeConformance from '../../test/describeConformance';

describe('<Menu2RadioGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2RadioGroup>Group</Menu2RadioGroup>, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false} anchor={document.body}>
          {node}
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) => baseElement.querySelector(`.${classes.root}`),
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'section',
    muiName: 'MuiMenu2RadioGroup',
    testVariantProps: { 'data-variant': 'probe' },
  }));
});
