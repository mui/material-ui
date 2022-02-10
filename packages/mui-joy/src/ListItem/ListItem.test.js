import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import ListItem, { listItemClasses as classes } from '@mui/joy/ListItem';

describe('Joy <ListItem />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItem />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    ThemeProvider,
    muiName: 'MuiListItem',
    refInstanceof: window.HTMLLIElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<ListItem />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<ListItem className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });
});
