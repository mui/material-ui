import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2, { menu2PopupClasses, menu2TriggerClasses } from '@mui/material/Unstable_Menu2';
import { resetMenu2WarningFlags } from '@mui/material/Unstable_Menu2/menu2Utils';
import Menu2Item, { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu, {
  menu2SubmenuPopupClasses,
  menu2SubmenuTriggerClasses,
} from '@mui/material/Unstable_Menu2Submenu';

// The collapsed shape: one component per menu at both levels, trigger as a
// prop, children as the popup.
describe('<Menu2 /> collapsed API', () => {
  const { render } = createRenderer();

  beforeEach(() => {
    resetMenu2WarningFlags();
  });

  it('renders the trigger element as-is and opens the menu', async () => {
    const { user } = render(
      <Menu2 trigger={<Button disableRipple>Options</Button>}>
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
        trigger={<Button disableRipple>Options</Button>}
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
      <Menu2 ref={menuRef} trigger={<Button disableRipple>Options</Button>}>
        <Menu2Submenu ref={submenuRef} trigger={<Menu2Item>More</Menu2Item>}>
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

  // The parts are internal, so their theme overrides have to resolve through the
  // collapsed component's slots rather than their own component keys.
  it('applies styleOverrides from the collapsed theme slots', async () => {
    const theme = createTheme({
      components: {
        MuiMenu2: {
          styleOverrides: {
            paper: { paddingTop: '9px' },
            list: { paddingBottom: '7px' },
          },
        },
        MuiMenu2Submenu: {
          styleOverrides: {
            paper: { paddingTop: '11px' },
          },
        },
      },
    });
    const { user } = render(
      <ThemeProvider theme={theme}>
        <Menu2
          trigger={<Button disableRipple>Options</Button>}
          slotProps={{ paper: { 'data-testid': 'paper' } }}
        >
          <Menu2Submenu
            trigger={<Menu2Item>More</Menu2Item>}
            slotProps={{ paper: { 'data-testid': 'submenu-paper' } }}
          >
            <Menu2Item>Nested</Menu2Item>
          </Menu2Submenu>
        </Menu2>
      </ThemeProvider>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });

    await user.click(trigger);
    const menu = await screen.findByRole('menu');
    expect(window.getComputedStyle(screen.getByTestId('paper')).paddingTop).to.equal('9px');
    const list = menu.querySelector(`.${menu2PopupClasses.list}`)!;
    expect(window.getComputedStyle(list).paddingBottom).to.equal('7px');

    const submenuTrigger = screen.getByRole('menuitem', { name: 'More' });

    await user.click(submenuTrigger);
    await waitFor(() => {
      expect(screen.queryByTestId('submenu-paper')).not.to.equal(null);
    });
    expect(window.getComputedStyle(screen.getByTestId('submenu-paper')).paddingTop).to.equal(
      '11px',
    );
  });

  // Geometry only: jsdom has no layout, so this runs in the browser project.
  // The open state is styled from the list, and the selected state from the item.
  // Both selectors are (0,2,0), so the winner depends on style insertion order.
  // A selected trigger that is open must keep the selected blend, not the plain
  // neutral open colour.
  it.skipIf(isJsdom())('keeps the selected blend on a trigger whose submenu is open', async () => {
    const { user } = render(
      <Menu2 defaultOpen trigger={<button type="button">Options</button>}>
        <Menu2Submenu trigger={<Menu2Item selected>More</Menu2Item>}>
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
    const selectedOnly = window.getComputedStyle(submenuTrigger).backgroundColor;
    // The selected item tints with the primary colour.
    expect(selectedOnly).to.contain('25, 118, 210');

    await user.click(submenuTrigger);
    await screen.findByRole('menuitem', { name: 'Nested' });

    const selectedAndOpen = window.getComputedStyle(submenuTrigger).backgroundColor;
    // Still the primary tint, not the neutral `action.focus` that the list sets
    // for a plain open trigger.
    expect(selectedAndOpen).to.contain('25, 118, 210');
    // And stronger than selected alone, because the open state adds focus opacity.
    expect(selectedAndOpen).not.to.equal(selectedOnly);
  });

  it('warns when the trigger is a fragment', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      render(
        <Menu2 trigger={<React.Fragment>Options</React.Fragment>}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2>,
      );

      expect(
        error.mock.calls.some(([message]) => String(message).includes('cannot be a fragment')),
      ).to.equal(true);
    } finally {
      error.mockRestore();
    }
  });

  it('warns once, however many times the bad trigger renders', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      const { setProps } = render(
        <Menu2 trigger={<React.Fragment>Options</React.Fragment>}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2>,
      );
      setProps({ 'aria-label': 'first' });
      setProps({ 'aria-label': 'second' });

      expect(
        error.mock.calls.filter(([message]) => String(message).includes('cannot be a fragment')),
      ).to.have.length(1);
    } finally {
      error.mockRestore();
    }
  });

  // Hover is the default way to open a submenu, and it kept working only by
  // accident until now: nothing covered it.
  it.skipIf(isJsdom())('opens a submenu on hover, and keeps the element handler', async () => {
    const onMouseEnter = spy();
    const { user } = render(
      <Menu2 defaultOpen trigger={<button type="button">Options</button>}>
        <Menu2Submenu trigger={<Menu2Item onMouseEnter={onMouseEnter}>More</Menu2Item>}>
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
    await user.hover(submenuTrigger);

    await waitFor(
      () => {
        expect(screen.queryByRole('menuitem', { name: 'Nested' })).not.to.equal(null);
      },
      { timeout: 2000 },
    );
    // Base UI composes with the element's own handler rather than replacing it.
    expect(onMouseEnter.callCount).to.be.greaterThan(0);
  });

  // A wrapper around the trigger swallows props that it does not forward, so
  // `closeOnClick` never reaches the item inside it.
  it.skipIf(isJsdom())('opens the submenu when the trigger sits inside a wrapper', async () => {
    // A wrapper that forwards keeps the behavior. One that drops props, the way
    // a hand-written Tooltip helper easily does, swallows it: the submenu never
    // opens and the click closes the menu instead.
    const Wrapper = React.forwardRef<
      HTMLElement,
      { children: React.ReactElement } & Record<string, any>
    >(function Wrapper(props, ref) {
      const { children, ...forwarded } = props;
      return React.cloneElement(children, { ...forwarded, ref });
    });

    const { user } = render(
      <Menu2 defaultOpen trigger={<button type="button">Options</button>}>
        <Menu2Submenu
          trigger={
            <Wrapper>
              <Menu2Item>More</Menu2Item>
            </Wrapper>
          }
        >
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    await user.click(await screen.findByRole('menuitem', { name: 'More' }));

    // The submenu opens, and the parent menu stays open.
    expect(await screen.findByRole('menuitem', { name: 'Nested' })).not.to.equal(null);
    expect(screen.queryByRole('menuitem', { name: 'More' })).not.to.equal(null);
  });

  it('warns when a wrapper swallows the trigger ref', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    // Drops every prop and the ref, the way a hand-written helper easily does.
    function SwallowingWrapper(props: { children: React.ReactElement }) {
      return props.children;
    }

    try {
      render(
        <Menu2
          defaultOpen
          trigger={
            <SwallowingWrapper>
              <button type="button">Options</button>
            </SwallowingWrapper>
          }
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2>,
      );

      expect(
        error.mock.calls.some(([message]) => String(message).includes('did not receive a ref')),
      ).to.equal(true);
    } finally {
      error.mockRestore();
    }
  });

  // The trigger showed no highlight for the keyboard, and only the weaker CSS
  // `:hover` for the pointer, because the highlighted state was not mapped.
  it.skipIf(isJsdom())('highlights the submenu trigger like a plain item', async () => {
    const { user } = render(
      <Menu2 defaultOpen trigger={<button type="button">Options</button>}>
        <Menu2Item>Plain</Menu2Item>
        <Menu2Submenu trigger={<Menu2Item>More</Menu2Item>}>
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    const plain = await screen.findByRole('menuitem', { name: 'Plain' });
    const submenuTrigger = screen.getByRole('menuitem', { name: 'More' });

    // Keyboard: the trigger takes the highlight the same way a plain item does.
    await user.keyboard('{ArrowDown}');
    expect(plain).to.have.class(menu2ItemClasses.highlighted);
    const plainHighlight = window.getComputedStyle(plain).backgroundColor;

    await user.keyboard('{ArrowDown}');
    expect(submenuTrigger).to.have.class(menu2SubmenuTriggerClasses.highlighted);
    expect(window.getComputedStyle(submenuTrigger).backgroundColor).to.equal(plainHighlight);
  });

  it.skipIf(isJsdom())('overlaps the parent menu by default', async () => {
    // The popup animates, so geometry has to be read after the transition ends.
    async function settle(element: HTMLElement) {
      await Promise.all(
        element.getAnimations().map((animation) => animation.finished.catch(() => {})),
      );
      await waitFor(() => {
        const { transform, opacity } = window.getComputedStyle(element);
        expect(transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)').to.equal(true);
        expect(Number(opacity)).to.equal(1);
      });
    }

    // `defaultOpen` avoids clicking the trigger Button, whose ripple animates
    // past the end of the test and trips the act() check.
    const { user } = render(
      <Menu2
        defaultOpen
        trigger={<Button disableRipple>Options</Button>}
        slotProps={{ paper: { 'data-testid': 'paper' } }}
      >
        <Menu2Submenu
          trigger={<Menu2Item>More</Menu2Item>}
          slotProps={{ paper: { 'data-testid': 'submenu-paper' } }}
        >
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    const menu = await screen.findByRole('menu');
    await settle(menu);
    const parent = screen.getByTestId('paper').getBoundingClientRect();
    const triggerRect = screen.getByRole('menuitem', { name: 'More' }).getBoundingClientRect();

    await user.click(screen.getByRole('menuitem', { name: 'More' }));
    await waitFor(() => {
      expect(screen.queryByTestId('submenu-paper')).not.to.equal(null);
    });
    await settle(document.querySelectorAll('[role="menu"]')[1] as HTMLElement);
    const submenu = screen.getByTestId('submenu-paper').getBoundingClientRect();

    // The submenu starts before the parent's right edge, so the two overlap.
    expect(submenu.left).to.be.lessThan(parent.right);
    // The overlap stays small, so the parent stays readable.
    expect(parent.right - submenu.left).to.be.lessThan(12);
    // The list's top padding is cancelled, so the first item meets the trigger.
    expect(Math.round(submenu.top)).to.equal(Math.round(triggerRect.top) - 8);
  });

  // `trigger` takes an element at both levels, and the element the caller passes
  // becomes the trigger itself.
  it('renders the caller element as the trigger at both levels', async () => {
    const { user } = render(
      <Menu2 trigger={<Button disableRipple>Options</Button>}>
        <Menu2Submenu trigger={<Menu2Item>More</Menu2Item>}>
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger).to.have.class('MuiButton-root');
    expect(trigger).to.have.class(menu2TriggerClasses.root);

    await user.click(trigger);
    const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
    expect(submenuTrigger).to.have.class(menu2ItemClasses.root);
    expect(submenuTrigger).to.have.class(menu2SubmenuTriggerClasses.root);

    // It must lay out as a menu item row, not as inline content. A fragment
    // trigger used to render bare text here.
    const { display } = window.getComputedStyle(submenuTrigger);
    expect(display).to.equal('flex');
    const list = submenuTrigger.parentElement!;
    expect(submenuTrigger.getBoundingClientRect().width).to.be.closeTo(
      list.getBoundingClientRect().width,
      2,
    );
  });

  it('falls back to the default trigger for a non-element', async () => {
    const { user } = render(
      <Menu2 trigger={<Button disableRipple>Options</Button>}>
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
      <Menu2 trigger={<Button disableRipple>Options</Button>}>
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
        trigger={<Button disableRipple>Options</Button>}
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
      <Menu2 trigger={<Button disableRipple>Options</Button>}>
        <Menu2Item>Cut</Menu2Item>
        <Menu2Submenu trigger={<Menu2Item>View</Menu2Item>}>
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
