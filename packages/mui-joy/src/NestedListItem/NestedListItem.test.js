import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import NestedListItem, { nestedListItemClasses as classes } from '@mui/joy/NestedListItem';

describe('Joy <NestedListItem />', () => {
  const { render } = createRenderer();

  describeConformance(<NestedListItem />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    ThemeProvider,
    muiName: 'MuiNestedListItem',
    refInstanceof: window.HTMLLIElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<NestedListItem />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<NestedListItem className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('should have sticky classes', () => {
    const { container } = render(<NestedListItem sticky />);
    expect(container.firstChild).to.have.class(classes.sticky);
  });

  it('should show action if provided', () => {
    const { getByText } = render(<NestedListItem secondaryAction="foo" />);
    expect(getByText('foo')).toBeVisible();
    expect(getByText('foo')).to.have.class(classes.secondaryAction);
  });
});
