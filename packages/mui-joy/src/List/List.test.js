import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import List, { listClasses as classes } from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import MenuList from '@mui/joy/MenuList';
import Menu from '@mui/joy/Menu';
import Select from '@mui/joy/Select';

describe('Joy <List />', () => {
  const { render } = createRenderer();

  describeConformance(<List />, () => ({
    classes,
    inheritComponent: 'ul',
    render,
    ThemeProvider,
    muiName: 'JoyList',
    refInstanceof: window.HTMLUListElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<List />);
    expect(container.firstChild).to.have.class(classes.root);
    expect(container.firstChild).to.have.class(classes.sizeMd);
  });

  it('should accept className prop', () => {
    const { container } = render(<List className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('should have sm classes', () => {
    const { container } = render(<List size="sm" />);
    expect(container.firstChild).to.have.class(classes.sizeSm);
  });

  it('should have lg classes', () => {
    const { container } = render(<List size="lg" />);
    expect(container.firstChild).to.have.class(classes.sizeLg);
  });

  it('should have nesting classes', () => {
    const { getByRole } = render(
      <ListItem nested>
        <List />
      </ListItem>,
    );
    expect(getByRole('list')).to.have.class(classes.nesting);
  });

  it('should have row classes', () => {
    const { getByRole } = render(<List row />);
    expect(getByRole('list')).to.have.class(classes.row);
  });

  describe('MenuList - integration', () => {
    it('should have role="group" inside MenuList', () => {
      render(
        <MenuList>
          <List />
        </MenuList>,
      );
      expect(screen.getByRole('group')).toBeVisible();
    });

    it('should inherit size', () => {
      render(
        <MenuList size="sm">
          <List />
        </MenuList>,
      );
      expect(screen.getByRole('group')).to.have.class(classes.nesting);
    });

    it('should use instance size', () => {
      render(
        <MenuList size="sm">
          <List size="lg" />
        </MenuList>,
      );
      expect(screen.getByRole('group')).to.have.class(classes.sizeLg);
    });
  });

  describe('Menu - integration', () => {
    it('should have role="group" inside Menu', () => {
      render(
        <Menu open anchorEl={() => document.createElement('div')}>
          <List />
        </Menu>,
      );
      expect(screen.getByRole('group')).toBeVisible();
    });

    it('should inherit size', () => {
      render(
        <Menu size="sm" open anchorEl={() => document.createElement('div')}>
          <List />
        </Menu>,
      );
      expect(screen.getByRole('group')).to.have.class(classes.nesting);
    });

    it('should use instance size', () => {
      render(
        <Menu size="sm" open anchorEl={() => document.createElement('div')}>
          <List size="lg" />
        </Menu>,
      );
      expect(screen.getByRole('group')).to.have.class(classes.sizeLg);
    });
  });

  describe('Select - integration', () => {
    it('should have role="group" inside Select', () => {
      render(
        <Select defaultListboxOpen>
          <List />
        </Select>,
      );
      expect(screen.getByRole('group')).toBeVisible();
    });

    it('should inherit size', () => {
      render(
        <Select size="sm" defaultListboxOpen>
          <List />
        </Select>,
      );
      expect(screen.getByRole('group')).to.have.class(classes.nesting);
    });

    it('should use instance size', () => {
      render(
        <Select size="sm" defaultListboxOpen>
          <List size="lg" />
        </Select>,
      );
      expect(screen.getByRole('group')).to.have.class(classes.sizeLg);
    });
  });
});
