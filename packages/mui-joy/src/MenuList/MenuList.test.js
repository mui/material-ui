import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import MenuList, { menuListClasses as classes } from '@mui/joy/MenuList';
import ListItem from '@mui/joy/ListItem';
import List, { listClasses } from '@mui/joy/List';

describe('Joy <MenuList />', () => {
  const { render } = createRenderer();

  describeConformance(<MenuList />, () => ({
    classes,
    inheritComponent: List,
    render,
    ThemeProvider,
    muiName: 'MuiMenuList',
    refInstanceof: window.HTMLUListElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<MenuList />);
    expect(container.firstChild).to.have.class(classes.root);
    expect(container.firstChild).to.have.class(listClasses.sizeMd);
  });

  it('should accept className prop', () => {
    const { container } = render(<MenuList className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('should have sm classes', () => {
    const { container } = render(<MenuList size="sm" />);
    expect(container.firstChild).to.have.class(listClasses.sizeSm);
  });

  it('should have lg classes', () => {
    const { container } = render(<MenuList size="lg" />);
    expect(container.firstChild).to.have.class(listClasses.sizeLg);
  });

  it('should have nested classes', () => {
    const { getByRole } = render(
      <ListItem nested>
        <MenuList />
      </ListItem>,
    );
    expect(getByRole('menu')).to.have.class(listClasses.nesting);
  });
});
