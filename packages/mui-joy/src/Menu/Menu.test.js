import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Menu, { menuClasses as classes } from '@mui/joy/Menu';

describe('Joy <Menu />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'MuiMenu',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<Menu />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<Menu className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });
});
