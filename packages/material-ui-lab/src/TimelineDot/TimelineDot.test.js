import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformance } from 'test/utils';
import TimelineDot, { timelineDotClasses as classes } from '@material-ui/lab/TimelineDot';

describe('<TimelineDot />', () => {
  const render = createClientRender();

  describeConformance(<TimelineDot />, () => ({
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
        <React.Fragment>
          <TimelineDot color="inherit" />
          <TimelineDot variant="outlined" color="inherit" />
        </React.Fragment>,
      ),
    ).not.to.throw();
  });
});
