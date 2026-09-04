import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2, { menu2PopupClasses, menu2TriggerClasses } from '@mui/material/Unstable_Menu2';
import { resetMenu2WarningFlags } from '@mui/material/Unstable_Menu2/menu2Utils';
import Menu2Item, { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu, {
  menu2SubmenuPopupClasses,
  menu2SubmenuTriggerClasses,
} from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import describeConformance from '../../test/describeConformance';

// The collapsed surfaces: trigger as a prop and children as the popup, with
// one explicit behavioral component for the submenu trigger.
describe('<Menu2 /> collapsed API', () => {
  const { render } = createRenderer();

  // Base UI submenus need layout to open, which jsdom does not provide, so the
  // nested popup never mounts there; run this suite in the browser project.
  describe.skipIf(isJsdom())('<Menu2Submenu /> conformance', () => {
    describeConformance(
      <Menu2Submenu
        defaultOpen
        trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}
      >
        <Menu2Item>Nested</Menu2Item>
      </Menu2Submenu>,
      () => ({
        classes: menu2SubmenuPopupClasses,
        render: (node) =>
          render(
            <Menu2 defaultOpen modal={false} anchor={document.body}>
              {node}
            </Menu2>,
          ),
        getRootElement: ({ baseElement }) =>
          baseElement.querySelector(`.${menu2SubmenuPopupClasses.root}`),
        // The public root is the semantic popup, rendered as the Paper. Its host
        // is configured through slots.root rather than a component prop.
        skip: ['componentProp'],
        refInstanceof: window.HTMLDivElement,
        muiName: 'MuiMenu2Submenu',
        testVariantProps: { align: 'center' },
        slots: {
          root: {
            expectedClassName: menu2SubmenuPopupClasses.root,
          },
          list: {
            expectedClassName: menu2SubmenuPopupClasses.list,
          },
        },
      }),
    );
  });

  beforeEach(() => {
    resetMenu2WarningFlags();
  });

  // The popup takes the focus in a frame callback, not with the render. A key
  // that arrives first lands on the body and is lost.
  async function waitForPopupFocus(itemInPopup: HTMLElement) {
    const popup = itemInPopup.closest('[role="menu"]')!;
    await waitFor(() => {
      expect(popup.contains(document.activeElement)).to.equal(true);
    });
  }

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

  ['Menu2', 'Menu2Submenu'].forEach((componentName) => {
    describe(`${componentName} popup props`, () => {
      const TestMenu = React.forwardRef(function TestMenu(
        {
          children = (
            <React.Fragment>
              <Menu2Item>Alpha</Menu2Item>
              <Menu2Item>Beta</Menu2Item>
            </React.Fragment>
          ),
          ...props
        }: React.ComponentPropsWithoutRef<typeof Menu2Submenu>,
        ref: React.ForwardedRef<HTMLDivElement>,
      ) {
        if (componentName === 'Menu2Submenu') {
          return (
            <Menu2 defaultOpen modal={false} trigger={<Button disableRipple>Options</Button>}>
              <Menu2Submenu
                {...props}
                ref={ref}
                trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}
              >
                {children}
              </Menu2Submenu>
            </Menu2>
          );
        }

        return (
          <Menu2 defaultOpen modal={false} anchor={document.body} {...props} ref={ref}>
            {children}
          </Menu2>
        );
      });

      async function openSubmenu(user: ReturnType<typeof render>['user'], keyboard = false) {
        if (componentName === 'Menu2Submenu') {
          const trigger = screen.getByRole('menuitem', { name: 'More' });
          await waitForPopupFocus(trigger);
          if (keyboard) {
            await act(async () => trigger.focus());
            await user.keyboard('{ArrowRight}');
          } else {
            await user.click(trigger);
          }
          await screen.findByRole('menuitem', { name: 'Alpha' });
        }
      }

      function getPopup() {
        return screen
          .getByRole('menuitem', { name: 'Alpha' })
          .closest<HTMLDivElement>('[role="menu"]')!;
      }

      it('applies className, style, and sx to the one root, which is the Paper', async () => {
        const { user } = render(
          <TestMenu
            className="custom-popup"
            style={{ paddingTop: '3px' }}
            sx={{ paddingBottom: '7px' }}
          />,
        );

        await openSubmenu(user);
        const popup = getPopup();
        expect(popup).to.have.class('custom-popup');
        expect(popup).to.have.class('MuiPaper-root');
        expect(popup.style.paddingTop).to.equal('3px');
        expect(getComputedStyle(popup).paddingBottom).to.equal('7px');
      });

      it('merges the root slot className, style, and sx, and keeps the list separate', async () => {
        const { user } = render(
          <TestMenu
            className="custom-popup"
            classes={{ root: 'popup-root', list: 'list-root' }}
            style={{ paddingLeft: '3px' }}
            sx={[{ paddingBottom: '7px' }, (theme) => ({ paddingTop: theme.spacing(1) })]}
            slotProps={{
              root: {
                className: 'root-slot',
                style: { paddingRight: '5px' },
                sx: [{ paddingBottom: '9px' }],
              },
              list: {
                className: 'list-slot',
                sx: { paddingTop: '11px' },
                'data-testid': 'list',
              },
            }}
          />,
        );

        await openSubmenu(user);
        const popup = getPopup();
        const list = screen.getByTestId('list');
        expect(popup).to.have.class('custom-popup');
        expect(popup).to.have.class('popup-root');
        expect(popup).to.have.class('root-slot');
        expect(list).to.have.class('list-root');
        expect(list).to.have.class('list-slot');
        expect(popup.style.paddingLeft).to.equal('3px');
        expect(popup.style.paddingRight).to.equal('5px');
        expect(getComputedStyle(popup).paddingTop).to.equal('8px');
        expect(getComputedStyle(popup).paddingBottom).to.equal('9px');
        expect(getComputedStyle(list).paddingTop).to.equal('11px');
        expect(list.style.paddingLeft).to.equal('');
      });

      it('forwards a root slot ref without a public ref, including a custom root slot', async () => {
        const slotRef = React.createRef<HTMLDivElement>();
        const { user, unmount } = render(
          <TestMenu slots={{ root: 'div' }} slotProps={{ root: () => ({ ref: slotRef }) }} />,
        );

        await openSubmenu(user);
        expect(slotRef.current).to.equal(getPopup());

        unmount();
        expect(slotRef.current).to.equal(null);
      });

      it('composes public and slot refs on the root, which is the Paper', async () => {
        const publicRef = vi.fn();
        const slotRef = React.createRef<HTMLDivElement>();
        const { user, unmount } = render(
          <TestMenu ref={publicRef} slotProps={{ root: { ref: slotRef } }} />,
        );

        await openSubmenu(user);
        const popup = getPopup();
        expect(publicRef).toHaveBeenLastCalledWith(popup);
        expect(slotRef.current).to.equal(popup);
        expect(popup).to.have.class('MuiPaper-root');

        unmount();
        expect(publicRef).toHaveBeenLastCalledWith(null);
        expect(slotRef.current).to.equal(null);
      });

      it('updates public and slot refs without replacing the popup', async () => {
        const firstRef = React.createRef<HTMLDivElement>();
        const nextRef = React.createRef<HTMLDivElement>();
        const firstSlotRef = vi.fn();
        const nextSlotRef = vi.fn();

        function ChangeRefs() {
          const [changed, setChanged] = React.useState(false);
          return (
            <TestMenu
              ref={changed ? nextRef : firstRef}
              slotProps={{ root: () => ({ ref: changed ? nextSlotRef : firstSlotRef }) }}
            >
              <Menu2Item closeOnClick={false} onClick={() => setChanged(true)}>
                Alpha
              </Menu2Item>
            </TestMenu>
          );
        }

        const { user, unmount } = render(<ChangeRefs />);
        await openSubmenu(user);
        const popup = getPopup();
        expect(firstRef.current).to.equal(popup);
        expect(firstSlotRef).toHaveBeenLastCalledWith(popup);

        await user.click(screen.getByRole('menuitem', { name: 'Alpha' }));
        expect(getPopup()).to.equal(popup);
        expect(firstRef.current).to.equal(null);
        expect(firstSlotRef).toHaveBeenLastCalledWith(null);
        expect(nextRef.current).to.equal(popup);
        expect(nextSlotRef).toHaveBeenLastCalledWith(popup);

        unmount();
        expect(nextRef.current).to.equal(null);
        expect(nextSlotRef).toHaveBeenLastCalledWith(null);
      });

      it('forwards HTML and ARIA attributes to the semantic popup', async () => {
        const { user } = render(
          <React.Fragment>
            <span id="actions-description">Available actions</span>
            <TestMenu
              id="actions-menu"
              aria-label="Actions"
              aria-describedby="actions-description"
              data-testid="actions-popup"
              title="Action menu"
            />
          </React.Fragment>,
        );

        await openSubmenu(user);
        const popup = getPopup();
        expect(popup).to.equal(screen.getByTestId('actions-popup'));
        expect(popup).to.have.attribute('id', 'actions-menu');
        expect(popup).to.have.attribute('aria-label', 'Actions');
        expect(popup).to.have.attribute('aria-describedby', 'actions-description');
        expect(popup).to.have.attribute('title', 'Action menu');
      });

      it('preserves popup slot precedence over forwarded attributes', async () => {
        const { user } = render(
          <TestMenu
            id="top-level-id"
            aria-label="Top-level label"
            title="Forwarded title"
            slotProps={{
              root: {
                id: 'slot-id',
                'aria-label': 'Slot label',
              },
            }}
          />,
        );

        await openSubmenu(user);
        const popup = getPopup();
        expect(popup).to.have.attribute('id', 'slot-id');
        expect(popup).to.have.attribute('aria-label', 'Slot label');
        expect(popup).to.have.attribute('title', 'Forwarded title');
      });

      it.skipIf(isJsdom())(
        'forwards keyboard handlers while preserving root behavior',
        async () => {
          const currentTargets: EventTarget[] = [];
          const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLDivElement>) => {
            currentTargets.push(event.currentTarget);
          });
          const onOpenChange = vi.fn();
          const { user } = render(
            <TestMenu loopFocus={false} onKeyDown={onKeyDown} onOpenChange={onOpenChange} />,
          );
          await openSubmenu(user, true);
          const firstItem = screen.getByRole('menuitem', { name: 'Alpha' });
          const lastItem = screen.getByRole('menuitem', { name: 'Beta' });
          const popup = firstItem.closest('[role="menu"]')!;
          await waitForPopupFocus(firstItem);
          await act(async () => firstItem.focus());

          await user.keyboard('{ArrowDown}{ArrowDown}');

          expect(document.activeElement).to.equal(lastItem);
          expect(onKeyDown).toHaveBeenCalledTimes(2);
          expect(currentTargets).to.deep.equal([popup, popup]);
          expect(popup).not.to.have.attribute('loopfocus');

          await user.keyboard('{Escape}');

          expect(onOpenChange).toHaveBeenCalledWith(
            false,
            expect.objectContaining({ reason: 'escape-key' }),
          );
          await waitFor(() =>
            expect(screen.queryByRole('menuitem', { name: 'Alpha' })).to.equal(null),
          );
        },
      );
    });
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
        <Menu2Submenu ref={submenuRef} trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>}>
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

  ['object', 'callback'].forEach((slotPropsType) => {
    it(`composes trigger element and slot refs with ${slotPropsType} slot props without warning`, async () => {
      const elementRef = React.createRef<HTMLButtonElement>();
      const slotRef = vi.fn();
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});

      try {
        const triggerProps = { ref: slotRef };
        const { user, unmount } = render(
          <Menu2
            trigger={
              <Button ref={elementRef} disableRipple>
                Options
              </Button>
            }
            slotProps={{
              trigger: slotPropsType === 'callback' ? () => triggerProps : triggerProps,
            }}
          >
            <Menu2Item>Profile</Menu2Item>
          </Menu2>,
        );

        const trigger = screen.getByRole('button', { name: 'Options' });
        expect(elementRef.current).to.equal(trigger);
        expect(slotRef).toHaveBeenLastCalledWith(trigger);
        expect(error).not.toHaveBeenCalled();

        await user.click(trigger);
        expect(await screen.findByRole('menu')).not.to.equal(null);

        unmount();
        expect(elementRef.current).to.equal(null);
        expect(slotRef).toHaveBeenLastCalledWith(null);
        expect(error).not.toHaveBeenCalled();
      } finally {
        error.mockRestore();
      }
    });
  });

  // The parts are internal, so their theme overrides have to resolve through the
  // collapsed component's slots rather than their own component keys.
  it('applies styleOverrides from the collapsed theme slots', async () => {
    const theme = createTheme({
      components: {
        MuiMenu2: {
          styleOverrides: {
            root: { paddingTop: '9px' },
            list: { paddingBottom: '7px' },
          },
        },
        MuiMenu2Submenu: {
          styleOverrides: {
            root: { paddingTop: '11px' },
          },
        },
      },
    });
    const { user } = render(
      <ThemeProvider theme={theme}>
        <Menu2
          trigger={<Button disableRipple>Options</Button>}
          slotProps={{ root: { 'data-testid': 'paper' } }}
        >
          <Menu2Submenu
            trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>}
            slotProps={{ root: { 'data-testid': 'submenu-paper' } }}
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
        <Menu2Submenu trigger={<Menu2SubmenuTrigger selected>More</Menu2SubmenuTrigger>}>
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
    // Still the primary tint, not the neutral `action.hover` that the list
    // sets for a plain open trigger.
    expect(selectedAndOpen).to.contain('25, 118, 210');
    // And stronger than selected alone, because the open state adds its tint.
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

  it.skipIf(isJsdom())('respects the hover open delay and keeps the element handler', async () => {
    const onMouseEnter = spy();
    const { user } = render(
      <Menu2 defaultOpen trigger={<button type="button">Options</button>}>
        <Menu2Submenu
          trigger={
            <Menu2SubmenuTrigger delay={200} onMouseEnter={onMouseEnter}>
              More
            </Menu2SubmenuTrigger>
          }
        >
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
    await user.hover(submenuTrigger);

    expect(screen.queryByRole('menuitem', { name: 'Nested' })).to.equal(null);
    await waitFor(
      () => {
        expect(screen.queryByRole('menuitem', { name: 'Nested' })).not.to.equal(null);
      },
      { timeout: 2000 },
    );
    // Base UI composes with the element's own handler rather than replacing it.
    expect(onMouseEnter.callCount).to.be.greaterThan(0);
  });

  it.skipIf(isJsdom())('does not open on hover when openOnHover is false', async () => {
    const { user } = render(
      <Menu2 defaultOpen trigger={<button type="button">Options</button>}>
        <Menu2Submenu
          trigger={
            <Menu2SubmenuTrigger delay={0} openOnHover={false}>
              More
            </Menu2SubmenuTrigger>
          }
        >
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
    await user.hover(submenuTrigger);

    expect(screen.queryByRole('menuitem', { name: 'Nested' })).to.equal(null);

    await user.click(submenuTrigger);
    expect(await screen.findByRole('menuitem', { name: 'Nested' })).not.to.equal(null);
  });

  it.skipIf(isJsdom())('keeps the submenu open during pointer transit', async () => {
    const { user } = render(
      <Menu2 defaultOpen trigger={<button type="button">Options</button>}>
        <Menu2Submenu
          trigger={
            <Menu2SubmenuTrigger delay={0} closeDelay={150}>
              More
            </Menu2SubmenuTrigger>
          }
        >
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
    await user.hover(submenuTrigger);
    const nestedItem = await screen.findByRole('menuitem', { name: 'Nested' });
    const submenuPositioner = nestedItem.closest<HTMLElement>('[data-nested]')!;
    const triggerRect = submenuTrigger.getBoundingClientRect();
    const submenuRect = submenuPositioner.getBoundingClientRect();

    // Base UI temporarily blocks pointer events outside the trigger and popup
    // while its safe polygon is active, so dispatch the real transit events
    // directly instead of asking user-event to cross the blocked region.
    fireEvent.mouseLeave(submenuTrigger, {
      relatedTarget: document.body,
      clientX: triggerRect.right,
      clientY: triggerRect.top + triggerRect.height / 2,
    });
    fireEvent.mouseMove(submenuPositioner, {
      clientX: submenuRect.left + 1,
      clientY: submenuRect.top + 1,
    });
    fireEvent.mouseEnter(submenuPositioner, {
      relatedTarget: submenuTrigger,
      clientX: submenuRect.left + 1,
      clientY: submenuRect.top + 1,
    });

    await act(async () => {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 250);
      });
    });
    expect(screen.getByRole('menuitem', { name: 'Nested' })).not.to.equal(null);
  });

  it.skipIf(isJsdom())('respects the hover close delay when moving to another item', async () => {
    const { user } = render(
      <Menu2 defaultOpen trigger={<button type="button">Options</button>}>
        <Menu2Submenu
          trigger={
            <Menu2SubmenuTrigger delay={0} closeDelay={150}>
              More
            </Menu2SubmenuTrigger>
          }
        >
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
        <Menu2Item closeOnClick={false}>Other</Menu2Item>
      </Menu2>,
    );

    const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
    await user.hover(submenuTrigger);
    await screen.findByRole('menuitem', { name: 'Nested' });

    // The safe polygon blocks user-event from targeting a sibling while the
    // submenu is open. Base UI receives the same item-hover signal from the
    // item's mousemove handler.
    const otherItem = screen.getByRole('menuitem', { name: 'Other' });
    fireEvent.mouseOver(otherItem);
    fireEvent.mouseMove(otherItem);

    expect(screen.getByRole('menuitem', { name: 'Nested' })).not.to.equal(null);
    await waitFor(
      () => {
        expect(screen.queryByRole('menuitem', { name: 'Nested' })).to.equal(null);
      },
      { timeout: 1000 },
    );
  });

  // The explicit trigger owns its behavior. Its wrapper need not forward props
  // injected by Menu2Submenu, because the submenu renders it as-is.
  it.skipIf(isJsdom())('opens the submenu when the trigger sits inside a wrapper', async () => {
    function Wrapper({ children }: { children: React.ReactElement }) {
      return children;
    }

    const { user } = render(
      <Menu2 defaultOpen trigger={<button type="button">Options</button>}>
        <Menu2Submenu
          trigger={
            <Wrapper>
              <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
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
        <Menu2Submenu trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>}>
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    const plain = await screen.findByRole('menuitem', { name: 'Plain' });
    const submenuTrigger = screen.getByRole('menuitem', { name: 'More' });
    await waitForPopupFocus(plain);

    // Keyboard: the trigger takes the highlight the same way a plain item does.
    await user.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(plain).to.equal(document.activeElement);
    });
    expect(plain).to.have.class(menu2ItemClasses.highlighted);
    const plainHighlight = window.getComputedStyle(plain).backgroundColor;

    await user.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(submenuTrigger).to.equal(document.activeElement);
    });
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
        slotProps={{ root: { 'data-testid': 'paper' } }}
      >
        <Menu2Submenu
          trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>}
          slotProps={{ root: { 'data-testid': 'submenu-paper' } }}
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

  it.skipIf(isJsdom())('positions a submenu at inline-end in an RTL theme', async () => {
    const theme = createTheme({ direction: 'rtl' });
    const { user } = render(
      <ThemeProvider theme={theme}>
        <div dir="rtl" style={{ padding: '96px 400px' }}>
          <Menu2 defaultOpen trigger={<Button disableRipple>Options</Button>}>
            <Menu2Submenu
              trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>}
              slotProps={{ root: { 'data-testid': 'submenu-paper' } }}
            >
              <Menu2Item>Nested</Menu2Item>
            </Menu2Submenu>
          </Menu2>
        </div>
      </ThemeProvider>,
    );

    const trigger = await screen.findByRole('menuitem', { name: 'More' });
    const triggerRect = trigger.getBoundingClientRect();
    await user.click(trigger);
    const paper = await screen.findByTestId('submenu-paper');
    await waitFor(() => {
      const submenu = paper.getBoundingClientRect();
      expect(submenu.left).to.be.lessThan(triggerRect.left);
      // The 4px overlap stays on the inline-end edge when that edge is left.
      expect(submenu.right).to.be.greaterThan(triggerRect.left);
      expect(submenu.right - triggerRect.left).to.be.lessThan(12);
    });
  });

  // `trigger` takes an element at both levels, and the element the caller passes
  // becomes the trigger itself.
  it('renders the caller element as the trigger at both levels', async () => {
    const { user } = render(
      <Menu2 trigger={<Button disableRipple>Options</Button>}>
        <Menu2Submenu trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>}>
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger).to.have.class('MuiButton-root');
    expect(trigger).to.have.class(menu2TriggerClasses.root);

    await user.click(trigger);
    const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
    expect(submenuTrigger).not.to.have.class(menu2ItemClasses.root);
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
        slotProps={{ root: { 'data-testid': 'paper' } }}
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
        <Menu2Submenu trigger={<Menu2SubmenuTrigger>View</Menu2SubmenuTrigger>}>
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

  // The submenu trigger renders ButtonBase, so it takes the same non-native
  // keyboard path as a plain item and used to fire twice per press. Each key
  // gets a fresh render, because opening the submenu moves focus into it.
  ['[Space]', '[Enter]'].forEach((key) => {
    it(`fires the submenu trigger once per ${key} press`, async () => {
      const onClick = spy();
      const { user } = render(
        <Menu2 defaultOpen trigger={<button type="button">Options</button>}>
          <Menu2Submenu trigger={<Menu2SubmenuTrigger onClick={onClick}>More</Menu2SubmenuTrigger>}>
            <Menu2Item>Nested</Menu2Item>
          </Menu2Submenu>
        </Menu2>,
      );

      const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
      await act(async () => {
        submenuTrigger.focus();
      });

      await user.keyboard(key);
      expect(onClick.callCount).to.equal(1);
    });
  });

  // The trigger background lives in the list styles, so the theme ring has to
  // reach it there too. Otherwise a highlighted trigger keeps the tint while a
  // highlighted plain item in the same menu shows the ring alone.
  [true, false].forEach((focusVisible) => {
    it.skipIf(isJsdom())(
      `highlights the trigger like a plain item, focusVisible=${focusVisible}`,
      async () => {
        const { user } = render(
          <ThemeProvider theme={createTheme({ focusVisible })}>
            <Menu2 defaultOpen modal={false} anchor={document.body}>
              <Menu2Item>Plain</Menu2Item>
              <Menu2Submenu trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>}>
                <Menu2Item>Nested</Menu2Item>
              </Menu2Submenu>
            </Menu2>
          </ThemeProvider>,
        );

        const plain = await screen.findByRole('menuitem', { name: 'Plain' });
        const submenuTrigger = screen.getByRole('menuitem', { name: 'More' });
        await waitForPopupFocus(plain);

        await user.keyboard('{ArrowDown}');
        await waitFor(() => {
          expect(plain).to.equal(document.activeElement);
        });
        const plainHighlight = window.getComputedStyle(plain).backgroundColor;

        await user.keyboard('{ArrowDown}');
        await waitFor(() => {
          expect(submenuTrigger).to.equal(document.activeElement);
        });
        expect(window.getComputedStyle(submenuTrigger).backgroundColor).to.equal(plainHighlight);
      },
    );
  });

  // Open is a state, not a focus cue. The tint stays below the highlight, so an
  // open parent stays visible without reading as the focused item.
  it.skipIf(isJsdom())('tints an open trigger below the highlight', async () => {
    const { user } = render(
      <Menu2 defaultOpen modal={false} anchor={document.body}>
        <Menu2Item>Plain</Menu2Item>
        <Menu2Submenu trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>}>
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    const plain = await screen.findByRole('menuitem', { name: 'Plain' });
    const submenuTrigger = screen.getByRole('menuitem', { name: 'More' });
    await waitForPopupFocus(plain);

    await user.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(plain).to.equal(document.activeElement);
    });
    const highlighted = window.getComputedStyle(plain).backgroundColor;

    await user.click(submenuTrigger);
    await screen.findByRole('menuitem', { name: 'Nested' });
    const open = window.getComputedStyle(submenuTrigger).backgroundColor;

    // `action.hover` against `action.focus`.
    expect(open).to.equal('rgba(0, 0, 0, 0.04)');
    expect(highlighted).to.equal('rgba(0, 0, 0, 0.12)');
  });

  // The trigger node also renders the caller's `Menu.Item`, which reads the
  // highlight from the submenu store with its index in the parent list. When the
  // two indices match, the open parent used to paint the full focus tint and
  // became indistinguishable from the child trigger the reader is on.
  // The menu keeps a real trigger. Anchored to the body it has nothing to give
  // the focus back to, and it closes itself about 200ms after a submenu opens.
  const nestedChain = (
    <Menu2 defaultOpen modal={false} trigger={<Button disableRipple>Options</Button>}>
      {/* Each trigger is index 0 of its own list, so the indices collide. */}
      <Menu2Submenu trigger={<Menu2SubmenuTrigger>View options</Menu2SubmenuTrigger>}>
        <Menu2Submenu trigger={<Menu2SubmenuTrigger>More tools</Menu2SubmenuTrigger>}>
          <Menu2Item>Leaf</Menu2Item>
        </Menu2Submenu>
      </Menu2Submenu>
    </Menu2>
  );

  // `action.hover` for the open parent trail, `action.focus` for the item the
  // reader is on.
  const OPEN_TINT = 'rgba(0, 0, 0, 0.04)';
  const FOCUS_TINT = 'rgba(0, 0, 0, 0.12)';

  it.skipIf(isJsdom())('keeps an open parent below the focused child trigger', async () => {
    const { user } = render(nestedChain);

    const parent = await screen.findByRole('menuitem', { name: 'View options' });
    await waitForPopupFocus(parent);

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowRight}');
    const child = await screen.findByRole('menuitem', { name: 'More tools' });
    await user.keyboard('{ArrowDown}');

    await waitFor(() => {
      expect(child).to.equal(document.activeElement);
    });

    // The parent is open, and only open. The highlight classes are the false
    // highlight that the submenu store used to put on it. A trigger carries the
    // submenu trigger class, so the item class alone misses it.
    expect(parent).to.have.class(menu2SubmenuTriggerClasses.open);
    expect(parent).not.to.have.class(menu2ItemClasses.highlighted);
    expect(parent).not.to.have.class(menu2SubmenuTriggerClasses.highlighted);
    expect(window.getComputedStyle(child).backgroundColor).to.equal(FOCUS_TINT);
    expect(window.getComputedStyle(parent).backgroundColor).to.equal(OPEN_TINT);
  });

  // The pointer sets the same submenu index that the arrow keys do, so it
  // reaches the same state. `fireEvent` drives it, because Base UI blocks the
  // pointer over the fresh popup and `user.hover` refuses to cross it.
  it.skipIf(isJsdom())('keeps an open parent below the hovered child trigger', async () => {
    const { user } = render(nestedChain);

    const parent = await screen.findByRole('menuitem', { name: 'View options' });

    await user.hover(parent);
    const child = await screen.findByRole('menuitem', { name: 'More tools' });
    fireEvent.mouseOver(child);
    fireEvent.mouseMove(child);

    // The child highlights one frame before the parent drops its own highlight,
    // so wait for the focus, the way the keyboard test above does.
    await waitFor(() => {
      expect(child).to.equal(document.activeElement);
    });
    expect(child).to.have.class(menu2SubmenuTriggerClasses.highlighted);

    expect(parent).to.have.class(menu2SubmenuTriggerClasses.open);
    expect(parent).not.to.have.class(menu2ItemClasses.highlighted);
    expect(parent).not.to.have.class(menu2SubmenuTriggerClasses.highlighted);
    expect(window.getComputedStyle(child).backgroundColor).to.equal(FOCUS_TINT);
    expect(window.getComputedStyle(parent).backgroundColor).to.equal(OPEN_TINT);
  });
});
