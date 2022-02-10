import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import ListItemSeparator, { listItemSeparatorClasses as classes } from '@mui/joy/ListItemSeparator';

describe('Joy <ListItemSeparator />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItemSeparator />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    ThemeProvider,
    muiName: 'MuiListItemSeparator',
    refInstanceof: window.HTMLLIElement,
    testVariantProps: { inset: 'gutter' },
    skip: ['componentsProp', 'classesRoot'],
  }));

  it('should have role separator', () => {
    render(<ListItemSeparator />);
    expect(screen.getByRole('separator')).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<ListItemSeparator className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });
});
