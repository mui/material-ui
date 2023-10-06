import * as React from 'react';
import { createRenderer, describeConformance } from '@mui-internal/test-utils';
import AccordionActions, {
  accordionActionsClasses as classes,
} from '@mui/material/AccordionActions';

describe('<AccordionActions />', () => {
  const { render } = createRenderer();

  describeConformance(<AccordionActions>Conformance</AccordionActions>, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAccordionActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp', 'componentsProp'],
  }));
});
