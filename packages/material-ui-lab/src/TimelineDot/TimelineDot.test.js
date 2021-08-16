import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import TimelineDot, { timelineDotClasses as classes } from '@material-ui/lab/TimelineDot';

describe('<TimelineDot />', () => {
  const render = createClientRender();

  describeConformanceV5(<TimelineDot />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiTimelineDot',
    refInstanceof: window.HTMLSpanElement,
    testVariantProps: { color: 'secondary', variant: 'outlined' },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render with color inherit', () => {
    expect(() =>
      render(
        <>
          <TimelineDot color="inherit" />
          <TimelineDot variant="outlined" color="inherit" />
        </>,
      ),
    ).not.to.throw();
  });
});
