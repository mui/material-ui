import * as React from 'react';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { describeConformance } from 'test/utils';

describe('<PopperUnstyled />', () => {
  const defaultProps = {
    anchorEl: () => document.createElement('svg'),
    children: <span>Hello World</span>,
    open: true,
  };

  describeConformance(<PopperUnstyled {...defaultProps} />, () => ({
    classes: {},
    inheritComponent: 'div',
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentsProp',
      'themeDefaultProps',
      'themeStyleOverrides',
      'themeVariants',
      // https://github.com/facebook/react/issues/11565
      'reactTestRenderer',
    ],
  }));
});
