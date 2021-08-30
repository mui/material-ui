import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import Masonry, { masonryClasses as classes } from '@material-ui/lab/Masonry';

describe('<Masonry />', () => {
  const render = createClientRender();

  describeConformance(
    <Masonry>
      <div />
    </Masonry>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'span',
      muiName: 'MuiMasonry',
      skip: ['componentsProp', 'themeVariants'],
    }),
  );
});
