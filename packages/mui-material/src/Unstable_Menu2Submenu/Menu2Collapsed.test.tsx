import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import Menu2, { menu2PopupClasses, menu2TriggerClasses } from '@mui/material/Unstable_Menu2';
import Menu2Item, { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu, { menu2SubmenuPopupClasses } from '@mui/material/Unstable_Menu2Submenu';

// The collapsed shape: one component per menu at both levels, trigger as a
// prop, children as the popup.
describe('<Menu2 /> collapsed API', () => {
  const { render } = createRenderer();

  it('renders the trigger element as-is and opens the menu', async () => {
    const { user } = render(
      <Menu2 trigger={<Button>Options</Button>}>
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    // The caller's component survives; only the trigger behavior is merged in.
    expect(trigger).to.have.class('MuiButton-root');
    expect(trigger).to.have.class(menu2TriggerClasses.root);
    expect(trigger).to.have.attribute('aria-haspopup', 'menu');

    await user.click(trigger);

    const menu = await screen.findByRole('menu');
    expect(menu).to.have.class(menu2PopupClasses.root);
    expect(screen.getByRole('menuitem', { name: 'Profile' })).to.have.class(menu2ItemClasses.root);
  });

  // The type fixture advertises these slots but only typechecks them. They are
  // context providers, so swapping them for a plain element used to break the
  // tree at runtime; these render for real.
  it('renders with the portal and positioner slots swapped', async () => {
    const { user } = render(
      <Menu2
        trigger="Options"
        slots={{ portal: 'div', positioner: 'div' }}
        slotProps={{
          portal: { 'data-testid': 'portal' },
          positioner: { 'data-testid': 'positioner' },
        }}
      >
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const menu = await screen.findByRole('menu');
    expect(menu).to.have.class(menu2PopupClasses.root);
    expect(screen.getByTestId('positioner')).to.contain(menu);
    expect(screen.getByRole('menuitem', { name: 'Profile' })).not.to.equal(null);
  });

  it('forwards a ref to the popup surface', async () => {
    const menuRef = React.createRef<HTMLDivElement>();
    const submenuRef = React.createRef<HTMLDivElement>();
    const { user } = render(
      <Menu2 ref={menuRef} trigger="Options">
        <Menu2Submenu ref={submenuRef} trigger="More">
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    const menu = await screen.findByRole('menu');
    expect(menuRef.current).to.equal(menu);

    await user.click(screen.getByRole('menuitem', { name: 'More' }));
    await waitFor(() => {
      expect(submenuRef.current).not.to.equal(null);
    });
    expect(submenuRef.current).to.have.class(menu2SubmenuPopupClasses.root);
  });

  it('falls back to the default trigger for a non-element', async () => {
    const { user } = render(
      <Menu2 trigger="Options">
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger).to.have.class(menu2TriggerClasses.root);

    await user.click(trigger);

    expect(await screen.findByRole('menu')).not.to.equal(null);
  });

  it('marks the trigger open while the menu is open', async () => {
    const { user } = render(
      <Menu2 trigger={<Button>Options</Button>}>
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger).not.to.have.class(menu2TriggerClasses.open);

    await user.click(trigger);
    await screen.findByRole('menu');

    expect(trigger).to.have.class(menu2TriggerClasses.open);
  });

  it('accepts the hoisted popup props', async () => {
    const { user } = render(
      <Menu2
        trigger={<Button>Options</Button>}
        side="top"
        elevation={16}
        slotProps={{ paper: { 'data-testid': 'paper' } }}
      >
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByTestId('paper')).to.have.class('MuiPaper-elevation16');
  });

  it('works without a trigger, driven by open and anchor', async () => {
    function ControlledMenu() {
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      return (
        <React.Fragment>
          <button type="button" onClick={(event) => setAnchorEl(event.currentTarget)}>
            Open
          </button>
          <Menu2 open={Boolean(anchorEl)} anchor={anchorEl} onOpenChange={() => setAnchorEl(null)}>
            <Menu2Item>Profile</Menu2Item>
          </Menu2>
        </React.Fragment>
      );
    }

    const { user } = render(<ControlledMenu />);

    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(await screen.findByRole('menu')).not.to.equal(null);
  });

  // The nested popup needs real layout to mount.
  it.skipIf(isJsdom())('uses the same shape for submenus', async () => {
    const { user } = render(
      <Menu2 trigger={<Button>Options</Button>}>
        <Menu2Item>Cut</Menu2Item>
        <Menu2Submenu trigger="View">
          <Menu2Item>Zoom in</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const submenuTrigger = await screen.findByRole('menuitem', { name: 'View' });
    expect(submenuTrigger).to.have.attribute('aria-haspopup', 'menu');

    await user.click(submenuTrigger);

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Zoom in' })).not.to.equal(null);
    });
  });
});
