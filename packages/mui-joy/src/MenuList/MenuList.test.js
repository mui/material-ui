import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import MenuList, { menuListClasses as classes } from '@mui/joy/MenuList';

describe('Joy <MenuList />', () => {
  const { render } = createRenderer();

  describeConformance(<MenuList />, () => ({
    classes,
    inheritComponent: 'ul',
    render,
    ThemeProvider,
    muiName: 'MuiMenuList',
    refInstanceof: window.HTMLUListElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<MenuList />);
    expect(container.firstChild).to.have.class(classes.root);
    expect(container.firstChild).to.have.class(classes.sizeMd);
  });

  it('should accept className prop', () => {
    const { container } = render(<MenuList className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('prop: size', () => {
    render(<MenuList size="sm" />);
    expect(screen.getByRole('menu')).to.have.class(classes.sizeSm);
  });

  it('prop: variant', () => {
    render(<MenuList variant="outlined" />);
    expect(screen.getByRole('menu')).to.have.class(classes.variantOutlined);
  });

  it('prop: color', () => {
    render(<MenuList color="primary" />);
    expect(screen.getByRole('menu')).to.have.class(classes.colorPrimary);
  });
});
