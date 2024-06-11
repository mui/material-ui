import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import List, { listClasses as classes } from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import MenuList from '@mui/joy/MenuList';
import Menu from '@mui/joy/Menu';
import Select from '@mui/joy/Select';
import RadioGroup from '@mui/joy/RadioGroup';
import describeConformance from '../../test/describeConformance';

describe('Joy <List />', () => {
  const { render } = createRenderer();

  describeConformance(<List />, () => ({
    classes,
    inheritComponent: 'ul',
    render,
    ThemeProvider,
    muiName: 'JoyList',
    refInstanceof: window.HTMLUListElement,
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['componentsProp', 'classesRoot'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
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

  it('should have default size="md" classes', () => {
    const { container } = render(<List size={undefined} />);
    expect(container.firstChild).to.have.class(classes.sizeMd);
  });

  it('should have `nesting` classes', () => {
    const { getByRole } = render(
      <ListItem nested>
        <List />
      </ListItem>,
    );
    expect(getByRole('list')).to.have.class(classes.nesting);
  });

  it('should have `orientation` classes', () => {
    const { getByRole } = render(<List orientation="horizontal" />);
    expect(getByRole('list')).to.have.class(classes.horizontal);
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
    const element = document.createElement('div');
    element.setAttribute('aria-controls', 'test');

    it('should have role="group" inside Menu', () => {
      render(
        <Menu open anchorEl={() => element}>
          <List />
        </Menu>,
      );
      expect(screen.getByRole('group')).toBeVisible();
    });

    it('should inherit size', () => {
      render(
        <Menu size="sm" open anchorEl={() => element}>
          <List />
        </Menu>,
      );
      expect(screen.getByRole('group')).to.have.class(classes.nesting);
    });

    it('should use instance size', () => {
      render(
        <Menu size="sm" open anchorEl={() => element}>
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

  describe('RadioGroup - integration', () => {
    it('should have div tag', () => {
      render(
        <RadioGroup>
          <List />
        </RadioGroup>,
      );

      expect(screen.getByRole('radiogroup').firstChild).to.have.attribute('role', 'presentation');
    });

    it('can override by prop', () => {
      render(
        <RadioGroup>
          <List role="none" />
        </RadioGroup>,
      );

      expect(screen.getByRole('radiogroup').firstChild).to.have.attribute('role', 'none');
    });
  });
});
