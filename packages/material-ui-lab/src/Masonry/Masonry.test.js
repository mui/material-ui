import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Masonry, { masonryClasses as classes } from '@material-ui/lab/Masonry';

describe('<Masonry />', () => {
  const render = createClientRender();

  describeConformanceV5(
    <Masonry>
      <div />
    </Masonry>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'div',
      testVariantProps: { variant: 'foo' },
      muiName: 'MuiMasonry',
      skip: ['componentsProp'],
    }),
  );
});
