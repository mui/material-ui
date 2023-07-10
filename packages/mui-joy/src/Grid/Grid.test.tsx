import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Grid, { gridClasses as classes } from '@mui/joy/Grid';

describe('Joy UI <Grid />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    children: <div />,
  };

  describeConformance(<Grid {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    refInstanceof: window.HTMLDivElement,
    muiName: 'JoyGrid',
    testVariantProps: { container: true, spacing: 5 },
    skip: ['componentsProp', 'classesRoot', 'rootClass'],
  }));

  it('className should be prefixed with Mui', () => {
    const { container } = render(<Grid />);
    expect(container.firstChild).to.have.class('MuiGrid-root');
  });
});
