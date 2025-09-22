import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const options = [
  'Show some love to MUI',
  'Show all notification content',
  'Hide sensitive notification content',
];

function ButtonMenu(props) {
  const { selectedIndex: selectedIndexProp, ...other } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(selectedIndexProp || null);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button
        aria-haspopup="true"
        aria-controls="lock-menu"
        aria-label="open menu"
        onClick={handleClickListItem}
      >
        {`selectedIndex: ${selectedIndex}, open: ${open}`}
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        transitionDuration={0}
        BackdropProps={{ 'data-testid': 'Backdrop' }}
        {...other}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

ButtonMenu.propTypes = { selectedIndex: PropTypes.number };

describe('<Menu /> integration', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  it('is part of the DOM by default but hidden', () => {
    const { getByRole } = render(<ButtonMenu />);

    expect(getByRole('menu', { hidden: true })).toBeInaccessible();
  });

  it('does not gain any focus when mounted ', () => {
    const { getByRole } = render(<ButtonMenu />);

    expect(getByRole('menu', { hidden: true })).not.to.contain(document.activeElement);
  });

  it('should focus the first item on open', async () => {
    const { getByRole, getAllByRole } = render(<ButtonMenu />);

    const button = getByRole('button', { name: 'open menu' });
    await act(async () => {
      button.focus();
      button.click();
    });

    expect(getAllByRole('menuitem')[0]).toHaveFocus();
  });

  it('changes focus according to keyboard navigation', async () => {
    const { getAllByRole, getByRole } = render(<ButtonMenu />);

    const button = getByRole('button', { name: 'open menu' });
    await act(async () => {
      button.focus();
      button.click();
    });
    const menuitems = getAllByRole('menuitem');

    fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();

    fireEvent.keyDown(menuitems[1], { key: 'ArrowUp' });
    expect(menuitems[0]).toHaveFocus();

    fireEvent.keyDown(menuitems[0], { key: 'ArrowUp' });
    expect(menuitems[2]).toHaveFocus();

    fireEvent.keyDown(menuitems[2], { key: 'Home' });
    expect(menuitems[0]).toHaveFocus();

    fireEvent.keyDown(menuitems[0], { key: 'End' });
    expect(menuitems[2]).toHaveFocus();

    fireEvent.keyDown(menuitems[2], { key: 'ArrowRight' });
    expect(menuitems[2], 'no change on unassociated keys').toHaveFocus();
  });

  it('focuses the selected item when opening', async () => {
    const { getAllByRole, getByRole } = render(<ButtonMenu selectedIndex={2} />);

    const button = getByRole('button', { name: 'open menu' });
    await act(async () => {
      button.focus();
      button.click();
    });

    expect(getAllByRole('menuitem')[2]).toHaveFocus();
  });

  describe('Menu variant differences', () => {
    function OpenMenu(props) {
      return <Menu anchorEl={document.body} open {...props} />;
    }

    specify('[variant=menu] will focus the first item if nothing is selected', () => {
      const { getAllByRole } = render(
        <OpenMenu variant="menu">
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </OpenMenu>,
      );
      const menuitems = getAllByRole('menuitem');

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    specify('[variant=selectedMenu] will focus the first item if nothing is selected', () => {
      const { getAllByRole } = render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </OpenMenu>,
      );
      const menuitems = getAllByRole('menuitem');

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    // no case for variant=selectedMenu
    specify('[variant=menu] prioritizes `autoFocus` on `MenuItem`', () => {
      const { getAllByRole } = render(
        <OpenMenu variant="menu">
          <MenuItem />
          <MenuItem />
          <MenuItem autoFocus />
        </OpenMenu>,
      );
      const menuitems = getAllByRole('menuitem');

      expect(menuitems[2]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    specify('[variant=menu] ignores `selected` on `MenuItem`', () => {
      const { getAllByRole } = render(
        <OpenMenu variant="menu">
          <MenuItem />
          <MenuItem selected />
          <MenuItem />
        </OpenMenu>,
      );
      const menuitems = getAllByRole('menuitem');

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    specify('[variant=selectedMenu] focuses the `selected` `MenuItem`', () => {
      const { getAllByRole } = render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem selected />
          <MenuItem />
        </OpenMenu>,
      );
      const menuitems = getAllByRole('menuitem');

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    specify('[variant=selectedMenu] allows overriding `tabIndex` on `MenuItem`', () => {
      const { getAllByRole } = render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem selected tabIndex={2} />
          <MenuItem />
        </OpenMenu>,
      );
      const menuitems = getAllByRole('menuitem');

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 2);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    // falling back to the menu immediately so that we don't have to come up
    // with custom fallbacks (for example what happens if the first item is also selected)
    // it's debatable whether disabled items should still be focusable
    specify(
      '[variant=selectedMenu] focuses the first non-disabled item if the selected menuitem is disabled',
      () => {
        const { getAllByRole } = render(
          <OpenMenu variant="selectedMenu">
            <MenuItem disabled />
            <MenuItem />
            <MenuItem disabled selected />
            <MenuItem />
          </OpenMenu>,
        );
        const menuitems = getAllByRole('menuitem');

        expect(menuitems[1]).toHaveFocus();
        expect(menuitems[0]).to.have.property('tabIndex', -1);
        expect(menuitems[1]).to.have.property('tabIndex', 0);
        expect(menuitems[2]).to.have.property('tabIndex', -1);
        expect(menuitems[3]).to.have.property('tabIndex', -1);
      },
    );

    // no case for menu
    // TODO: should this even change focus? I would guess that autoFocus={false}
    // means "developer: I take care of focus don't steal it from me"
    specify('[variant=selectedMenu] focuses no part of the menu when `autoFocus={false}`', () => {
      const { getAllByRole, getByTestId } = render(
        <OpenMenu autoFocus={false} variant="selectedMenu" PaperProps={{ 'data-testid': 'Paper' }}>
          <MenuItem />
          <MenuItem selected />
          <MenuItem />
        </OpenMenu>,
      );
      const menuitems = getAllByRole('menuitem');

      expect(getByTestId('Paper')).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    specify('[variant=selectedMenu] focuses nothing when it is closed and mounted', () => {
      const { getByRole } = render(<ButtonMenu selectedIndex={1} variant="selectedMenu" />);

      expect(getByRole('menu', { hidden: true })).not.to.contain(document.activeElement);
    });

    specify(
      '[variant=selectedMenu] focuses the selected item when opening when it was already mounted',
      async () => {
        const { getAllByRole, getByRole } = render(
          <ButtonMenu selectedIndex={1} variant="selectedMenu" />,
        );

        await act(async () => {
          getByRole('button').focus();
          getByRole('button').click();
        });
        const menuitems = getAllByRole('menuitem');

        expect(menuitems[1]).toHaveFocus();
        expect(menuitems[0]).to.have.property('tabIndex', -1);
        expect(menuitems[1]).to.have.property('tabIndex', 0);
        expect(menuitems[2]).to.have.property('tabIndex', -1);
      },
    );
  });

  it('closes the menu when Tabbing while the list is active', async () => {
    render(<ButtonMenu />);

    const trigger = screen.getByRole('button');
    await act(async () => {
      trigger.focus();
    });
    await act(async () => {
      trigger.click();
    });

    // react-transition-group uses one commit per state transition so we need to wait a bit
    await act(async () => {
      fireEvent.keyDown(screen.getAllByRole('menuitem')[0], { key: 'Tab' });
    });
    clock.tick(0);

    expect(screen.getByRole('menu', { hidden: true })).toBeInaccessible();
  });

  it('closes the menu when the backdrop is clicked', async () => {
    const { getByRole, getByTestId } = render(<ButtonMenu />);
    const button = getByRole('button');
    await act(async () => {
      button.focus();
      button.click();
      getByTestId('Backdrop').click();
    });

    expect(getByRole('menu', { hidden: true })).toBeInaccessible();
  });
});
