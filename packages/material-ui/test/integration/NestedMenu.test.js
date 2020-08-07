import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, within } from 'test/utils/createClientRender';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function NestedMenu(props) {
  const { firstMenuOpen, secondMenuOpen } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const canBeOpen = Boolean(anchorEl);

  return (
    <div>
      <button type="button" ref={setAnchorEl}>
        anchor
      </button>
      <Menu
        anchorEl={anchorEl}
        MenuListProps={{ id: 'second-menu' }}
        open={Boolean(secondMenuOpen && canBeOpen)}
        transitionDuration={0}
      >
        <MenuItem>Second Menu</MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorEl}
        MenuListProps={{ id: 'first-menu' }}
        open={Boolean(firstMenuOpen && canBeOpen)}
        transitionDuration={0}
      >
        <MenuItem>Profile 1</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </div>
  );
}

describe('<NestedMenu> integration', () => {
  // StrictModeViolation: uses Popover
  const render = createClientRender({ strict: false });

  it('should not be open', () => {
    const { queryAllByRole } = render(<NestedMenu />);

    expect(queryAllByRole('menu')).to.have.length(0);
  });

  it('should focus the first item of the first menu when nothing has been selected', () => {
    const { getByRole } = render(<NestedMenu firstMenuOpen />);

    expect(getByRole('menu')).to.have.id('first-menu');
    expect(within(getByRole('menu')).getAllByRole('menuitem')[0]).toHaveFocus();
  });

  it('should focus the first item of the second menu when nothing has been selected', () => {
    const { getByRole } = render(<NestedMenu secondMenuOpen />);

    expect(getByRole('menu')).to.have.id('second-menu');
    expect(within(getByRole('menu')).getAllByRole('menuitem')[0]).toHaveFocus();
  });

  it('should open the first menu after it was closed', () => {
    const { getByRole, setProps } = render(<NestedMenu firstMenuOpen />);

    setProps({ firstMenuOpen: false });
    setProps({ firstMenuOpen: true });

    expect(getByRole('menu')).to.have.id('first-menu');
    expect(within(getByRole('menu')).getAllByRole('menuitem')[0]).toHaveFocus();
  });

  it('should be able to open second menu again', () => {
    const { getByRole, setProps } = render(<NestedMenu secondMenuOpen />);

    setProps({ secondMenuOpen: false });
    setProps({ secondMenuOpen: true });

    expect(getByRole('menu')).to.have.id('second-menu');
    expect(within(getByRole('menu')).getAllByRole('menuitem')[0]).toHaveFocus();
  });
});
