import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import MenuPopup, { menuClasses as classes } from '@mui/joy/MenuPopup';

describe('Joy <MenuPopup />', () => {
  const { render } = createRenderer();

  describeConformance(<MenuPopup />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'MuiMenuPopup',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<MenuPopup />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<MenuPopup className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });
});
