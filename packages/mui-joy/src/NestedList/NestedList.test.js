import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import NestedList, { nestedListClasses as classes } from '@mui/joy/NestedList';

describe('Joy <NestedList />', () => {
  const { render } = createRenderer();

  describeConformance(<NestedList />, () => ({
    classes,
    inheritComponent: 'ul',
    render,
    ThemeProvider,
    muiName: 'MuiNestedList',
    refInstanceof: window.HTMLUListElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<NestedList />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<NestedList className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });
});
