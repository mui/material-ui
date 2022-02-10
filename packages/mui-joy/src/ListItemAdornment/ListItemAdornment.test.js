import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import ListItemAdornment, { listItemAdornmentClasses as classes } from '@mui/joy/ListItemAdornment';

describe('Joy <ListItemAdornment />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItemAdornment />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    ThemeProvider,
    muiName: 'MuiListItemAdornment',
    refInstanceof: window.HTMLSpanElement,
    testVariantProps: { end: true },
    skip: ['componentsProp', 'classesRoot'],
  }));

  it('should have root className', () => {
    const { container } = render(<ListItemAdornment />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<ListItemAdornment className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('should have end classes', () => {
    const { container } = render(<ListItemAdornment end />);
    expect(container.firstChild).to.have.class(classes.end);
  });
});
