/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { cleanup, createClientRender, fireEvent, wait } from 'test/utils/createClientRender';

const options = [
  'Show some love to Material-UI',
  'Show all notification content',
  'Hide sensitive notification content',
];

function SimpleMenu(props) {
  const { selectedIndex: selectedIndexProp, ...other } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(selectedIndexProp || null);

  const handleClickListItem = event => {
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
      <Menu id="lock-menu" anchorEl={anchorEl} open={open} onClose={handleClose} {...other}>
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

SimpleMenu.propTypes = { selectedIndex: PropTypes.number };

describe('<Menu /> integration', () => {
  const render = createClientRender({ strict: false });

  afterEach(() => {
    cleanup();
  });

  it('is not part of the DOM by default', () => {
    const { queryByRole } = render(<SimpleMenu transitionDuration={0} />);

    expect(queryByRole('menu')).to.be.null;
  });

  it('is not part of the DOM by default even with a selectedIndex', () => {
    const { queryByRole } = render(<SimpleMenu transitionDuration={0} selectedIndex={2} />);

    expect(queryByRole('menu')).to.be.null;
  });

  it('should focus the list on open', () => {
    const { getByLabelText, getByRole } = render(<SimpleMenu transitionDuration={0} keepMounted />);
    const button = getByLabelText('open menu');
    const menu = getByRole('menu');

    expect(menu).to.not.be.focused;

    button.focus();
    fireEvent.click(button);
    expect(menu).to.be.focused;
  });

  it('should focus the list as nothing has been selected and changes focus according to keyboard navigation', () => {
    const { getAllByRole, queryByRole, getByLabelText } = render(
      <SimpleMenu transitionDuration={0} />,
    );
    const button = getByLabelText('open menu');

    expect(queryByRole('menu')).to.be.null;

    button.focus();
    fireEvent.click(button);
    expect(queryByRole('menu')).to.be.focused;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
    expect(getAllByRole('menuitem')[0]).to.be.focused;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
    expect(getAllByRole('menuitem')[2]).to.be.focused;

    fireEvent.keyDown(document.activeElement, { key: 'Home' });
    expect(getAllByRole('menuitem')[0]).to.be.focused;

    fireEvent.keyDown(document.activeElement, { key: 'End' });
    expect(getAllByRole('menuitem')[2]).to.be.focused;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
    expect(getAllByRole('menuitem')[2], 'no change on unassociated keys').to.be.focused;
  });

  it('focuses the selected item when opening', () => {
    const { getAllByRole, getByLabelText } = render(
      <SimpleMenu transitionDuration={0} selectedIndex={2} />,
    );
    const button = getByLabelText('open menu');

    expect(document.body).to.be.focused;

    button.focus();
    fireEvent.click(button);
    expect(getAllByRole('menuitem')[2]).to.be.focused;
  });

  describe('Menu variant differences', () => {
    function OpenMenu(props) {
      return <Menu anchorEl={document.body} open {...props} />;
    }

    specify('[variant=menu] will focus the menu if nothing is selected', () => {
      const { getAllByRole, getByRole } = render(
        <OpenMenu variant="menu">
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getByRole('menu')).to.be.focused;
      expect(getAllByRole('menuitem')[0]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[1]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[2]).to.have.property('tabIndex', -1);
    });

    specify('[variant=selectedMenu] will focus the menu if nothing is selected', () => {
      const { getAllByRole, getByRole } = render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getByRole('menu')).to.be.focused;
      expect(getAllByRole('menuitem')[0]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[1]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[2]).to.have.property('tabIndex', -1);
    });

    // no case for variant=selectedMenu
    specify('[variant=menu] ignores `autoFocus` on `MenuItem`', () => {
      const { getAllByRole, getByRole } = render(
        <OpenMenu variant="menu">
          <MenuItem />
          <MenuItem />
          <MenuItem autoFocus />
        </OpenMenu>,
      );

      expect(getByRole('menu')).to.be.focused;
      expect(getAllByRole('menuitem')[0]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[1]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[2]).to.have.property('tabIndex', -1);
    });

    specify('[variant=menu] ignores `selected` on `MenuItem`', () => {
      const { getAllByRole, getByRole } = render(
        <OpenMenu variant="menu">
          <MenuItem />
          <MenuItem selected />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getByRole('menu')).to.be.focused;
      expect(getAllByRole('menuitem')[0]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[1]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[2]).to.have.property('tabIndex', -1);
    });

    specify('[variant=selectedMenu] focuses the `selected` `MenuItem`', () => {
      const { getAllByRole } = render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem selected />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getAllByRole('menuitem')[1]).to.be.focused;
      expect(getAllByRole('menuitem')[0]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[1]).to.have.property('tabIndex', 0);
      expect(getAllByRole('menuitem')[2]).to.have.property('tabIndex', -1);
    });

    specify('[variant=selectedMenu] allows overriding `tabIndex` on `MenuItem`', () => {
      const { getAllByRole } = render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem selected tabIndex={2} />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getAllByRole('menuitem')[1]).to.be.focused;
      expect(getAllByRole('menuitem')[0]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[1]).to.have.property('tabIndex', 2);
      expect(getAllByRole('menuitem')[2]).to.have.property('tabIndex', -1);
    });

    // no case for menu
    specify('[variant=selectedMenu] focuses the menu if the selected menuitem is disabled', () => {
      const { getAllByRole, getByRole } = render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem disabled selected />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getByRole('menu')).to.be.focused;
      expect(getAllByRole('menuitem')[0]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[1]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[2]).to.have.property('tabIndex', -1);
    });

    // no case for menu
    specify('[variant=selectedMenu] focuses no part of the menu when `autoFocus={false}`', () => {
      const { getAllByRole, getByTestId } = render(
        <OpenMenu autoFocus={false} variant="selectedMenu" PaperProps={{ 'data-testid': 'Paper' }}>
          <MenuItem />
          <MenuItem selected />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getByTestId('Paper')).to.be.focused;
      expect(getAllByRole('menuitem')[0]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[1]).to.have.property('tabIndex', 0);
      expect(getAllByRole('menuitem')[2]).to.have.property('tabIndex', -1);
    });
  });

  it('closes the menu when Tabbing while the list is active', async () => {
    const { queryByRole, getByLabelText } = render(<SimpleMenu transitionDuration={0} />);
    const button = getByLabelText('open menu');

    expect(document.body).to.be.focused;

    button.focus();
    fireEvent.click(button);
    expect(queryByRole('menu')).to.be.focused;

    fireEvent.keyDown(document.activeElement, { key: 'Tab' });

    // react-transition-group uses one commit per state transition so we need to wait a bit
    await wait(() => expect(queryByRole('menu')).to.be.null, { timeout: 10 });
  });

  it('closes the menu when the backdrop is clicked', async () => {
    const { queryByRole, getByLabelText } = render(<SimpleMenu transitionDuration={0} />);
    const button = getByLabelText('open menu');

    expect(queryByRole('menu')).to.be.null;

    button.focus();
    fireEvent.click(button);
    expect(queryByRole('menu')).to.be.focused;

    fireEvent.click(document.querySelector('[data-mui-test="Backdrop"]'));

    await wait(() => expect(queryByRole('menu')).to.be.null, { timeout: 10 });
  });
});
