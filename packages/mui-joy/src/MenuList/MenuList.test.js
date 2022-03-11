import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Menu, { menuListClasses as classes } from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';

describe('Joy <Menu />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu />, () => ({
    classes,
    inheritComponent: 'ul',
    render,
    ThemeProvider,
    muiName: 'MuiMenu',
    refInstanceof: window.HTMLUMenuElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<Menu />);
    expect(container.firstChild).to.have.class(classes.root);
    expect(container.firstChild).to.have.class(classes.sizeMd);
  });

  it('should accept className prop', () => {
    const { container } = render(<Menu className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('should have sm classes', () => {
    const { container } = render(<Menu size="sm" />);
    expect(container.firstChild).to.have.class(classes.sizeSm);
  });

  it('should have lg classes', () => {
    const { container } = render(<Menu size="lg" />);
    expect(container.firstChild).to.have.class(classes.sizeLg);
  });

  it('should have nested classes', () => {
    const { getByRole } = render(
      <MenuItem nested>
        <Menu />
      </MenuItem>,
    );
    expect(getByRole('menu')).to.have.class(classes.nested);
  });
});
