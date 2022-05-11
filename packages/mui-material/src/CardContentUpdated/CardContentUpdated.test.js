import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import CardContentUpdated, {
  cardContentUpdatedClasses as classes,
} from '@mui/material/CardContentUpdated';

describe('<CardContentUpdated />', () => {
  const { render } = createRenderer();

  describeConformance(<CardContentUpdated />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiCardContentUpdated',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp', 'themeVariants'],
    testComponentPropWith: 'span',
  }));
});
