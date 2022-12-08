import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import Toolbar, { toolbarClasses as classes } from '@mui/material/Toolbar';

describe('<Toolbar />', () => {
  const { render } = createRenderer();

  describeConformance(<Toolbar />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiToolbar',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'variant', value: 'foo', styleKey: 'foo' },
    skip: ['componentsProp'],
  }));

  it('should render with gutters class', () => {
    const { container } = render(<Toolbar className="woofToolbar">foo</Toolbar>);

    expect(container.firstChild).to.have.class(classes.gutters);
  });

  it('can disable the gutters', () => {
    const { container } = render(<Toolbar disableGutters>foo</Toolbar>);

    expect(container.firstChild).not.to.have.class(classes.gutters);
  });

  it('can condense itself', () => {
    const { container } = render(<Toolbar variant="dense">foo</Toolbar>);

    expect(container.firstChild).to.have.class(classes.dense);
  });
});
