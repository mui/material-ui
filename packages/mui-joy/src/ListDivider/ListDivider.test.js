import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import ListDivider, { listDividerClasses as classes } from '@mui/joy/ListDivider';

describe('Joy <ListDivider />', () => {
  const { render } = createRenderer();

  describeConformance(<ListDivider />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    ThemeProvider,
    muiName: 'MuiListDivider',
    refInstanceof: window.HTMLLIElement,
    testVariantProps: { inset: 'gutter' },
    skip: ['componentsProp', 'classesRoot'],
  }));

  it('should have role separator', () => {
    render(<ListDivider />);
    expect(screen.getByRole('separator')).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<ListDivider className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });
});
