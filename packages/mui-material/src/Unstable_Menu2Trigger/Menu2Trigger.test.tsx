import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import Unstable_Menu2 from '@mui/material/Unstable_Menu2';
import Unstable_Menu2Trigger, {
  menu2TriggerClasses as classes,
} from '@mui/material/Unstable_Menu2Trigger';
import describeConformance from '../../test/describeConformance';

describe('<Menu2Trigger />', () => {
  const { render } = createRenderer();

  describeConformance(<Unstable_Menu2Trigger>Options</Unstable_Menu2Trigger>, () => ({
    classes,
    render: (node) => render(<Unstable_Menu2>{node}</Unstable_Menu2>),
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'a',
    muiName: 'MuiMenu2Trigger',
    testVariantProps: { disabled: true },
  }));
});
