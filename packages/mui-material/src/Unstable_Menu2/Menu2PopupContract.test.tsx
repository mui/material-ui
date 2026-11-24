import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen, waitFor, within } from '@mui/internal-test-utils';
import Menu2Trigger from '../Unstable_Menu2Trigger';
import type { Menu2SubmenuPopupProps } from '../Unstable_Menu2SubmenuPopup';
import Menu2SubmenuPopup, { menu2SubmenuPopupClasses } from '../Unstable_Menu2SubmenuPopup';
import type { Menu2PopupProps } from '../Unstable_Menu2Popup';
import Menu2Popup, { menu2PopupClasses } from '../Unstable_Menu2Popup';
import Menu2 from './Menu2';
import type { Menu2PopupSharedSlotProps } from './menu2PopupShared';
import Menu2Item from '../Unstable_Menu2Item';
import type { Menu2SubmenuProps } from '../Unstable_Menu2Submenu';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '../Unstable_Menu2SubmenuTrigger';
import type { PaperProps } from '../Paper';
import Paper from '../Paper';
import { createTheme, ThemeProvider } from '../styles';

interface TestMenuProps
  extends
    Omit<Menu2SubmenuPopupProps, 'slotProps'>,
    Pick<Menu2SubmenuProps, 'open' | 'onOpenChange' | 'onOpenChangeComplete'> {
  slotProps?: Menu2PopupSharedSlotProps<Menu2PopupProps | Menu2SubmenuPopupProps> &
    Menu2SubmenuPopupProps['slotProps'];
}

const CustomPositioner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { ownerState?: object }
>(function CustomPositioner({ ownerState, ...props }, ref) {
  return <div {...props} ref={ref} />;
});

const CustomPaper = React.forwardRef<HTMLDivElement, PaperProps & { ownerState?: object }>(
  function CustomPaper({ ownerState, ...props }, ref) {
    return <Paper {...props} ref={ref} />;
  },
);

describe.skipIf(isJsdom())('Menu2 popup contract', () => {
  const { render } = createRenderer();

  [false, true].forEach((submenu) => {
    describe(`Menu2${submenu ? 'Submenu' : ''}`, () => {
      const popupClasses = submenu ? menu2SubmenuPopupClasses : menu2PopupClasses;
      const TestMenu = React.forwardRef<HTMLDivElement, TestMenuProps>(function TestMenu(
        {
          children = <Menu2Item>Alpha</Menu2Item>,
          open,
          onOpenChange,
          onOpenChangeComplete,
          ...props
        },
        ref,
      ) {
        return (
          <React.Fragment>
            <span id="menu-label">Available actions</span>
            <span id="slot-label">Slot actions</span>
            <span id="menu-description">Choose an action</span>
            <span id="slot-description">Choose a slot action</span>
            {submenu ? (
              <Menu2 modal={false}>
                <Menu2Trigger render={<button type="button">Options</button>} />
                <Menu2Popup slotProps={{ portal: { sx: { zIndex: 2000 } } }} transitionDuration={0}>
                  <Menu2Submenu
                    open={open}
                    onOpenChange={onOpenChange}
                    onOpenChangeComplete={onOpenChangeComplete}
                  >
                    <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                    <Menu2SubmenuPopup ref={ref} transitionDuration={0} {...props}>
                      {children}
                    </Menu2SubmenuPopup>
                  </Menu2Submenu>
                </Menu2Popup>
              </Menu2>
            ) : (
              <Menu2
                modal={false}
                open={open}
                onOpenChange={onOpenChange}
                onOpenChangeComplete={onOpenChangeComplete}
              >
                <Menu2Trigger render={<button type="button">Options</button>} />
                <Menu2Popup ref={ref} transitionDuration={0} {...props}>
                  {children}
                </Menu2Popup>
              </Menu2>
            )}
          </React.Fragment>
        );
      });

      async function openMenu(
        user: ReturnType<typeof render>['user'],
        { keyboard = false, name = submenu ? 'More' : 'Options' } = {},
      ) {
        await user.click(screen.getByRole('button', { name: 'Options' }));
        if (submenu) {
          const trigger = await screen.findByRole('menuitem', { name: 'More' });
          if (keyboard) {
            await waitFor(() =>
              expect(
                screen.getByRole('menu', { name: 'Options' }).contains(document.activeElement),
              ).to.equal(true),
            );
            await act(async () => trigger.focus());
            await user.keyboard('{ArrowRight}');
          } else {
            await user.click(trigger);
          }
        }
        return screen.findByRole<HTMLDivElement>('menu', { name });
      }

      [false, true].forEach((slotOverride) => {
        it(`registers the surface ID with its trigger, root override=${slotOverride}`, async () => {
          const popupRef = React.createRef<HTMLDivElement>();
          const slotRef = React.createRef<HTMLDivElement>();
          const { user } = render(
            <TestMenu
              ref={popupRef}
              id="menu-surface"
              title="Available actions"
              className="public-popup"
              style={{ paddingLeft: 3 }}
              sx={{ paddingRight: '7px' }}
              slotProps={{ root: { ref: slotRef, ...(slotOverride && { id: 'slot-surface' }) } }}
            />,
          );
          const popup = await openMenu(user);
          const trigger = submenu
            ? screen.getByRole('menuitem', { name: 'More' })
            : screen.getByRole('button', { name: 'Options' });

          expect(popupRef.current).to.equal(popup);
          expect(slotRef.current).to.equal(popup);
          expect(popup).to.have.attribute('id', slotOverride ? 'slot-surface' : 'menu-surface');
          expect(trigger).to.have.attribute('aria-controls', popup.id);
          expect(popup).to.have.attribute('title', 'Available actions');
          expect(popup).to.have.class('public-popup');
          expect(popup.style.paddingLeft).to.equal('3px');
          expect(getComputedStyle(popup).paddingRight).to.equal('7px');
          expect(popup.parentElement).not.to.have.attribute('title');
          expect(popup.parentElement!.parentElement).not.to.have.attribute('title');
        });
      });

      ['host', 'custom'].forEach((slot) => {
        it(`forwards placement, slot props, and refs to ${slot} root and positioner slots`, async () => {
          const paperRef = React.createRef<HTMLDivElement>();
          const positionerRef = React.createRef<HTMLDivElement>();
          const { user } = render(
            <TestMenu
              align="end"
              slots={{
                positioner: slot === 'host' ? 'div' : CustomPositioner,
                root: slot === 'host' ? 'div' : CustomPaper,
              }}
              // The casts pass data-* without a DataAttributesOverrides augmentation.
              slotProps={{
                positioner: {
                  align: 'start',
                  ...({ 'data-custom': 'positioner' } as object),
                  className: 'custom-positioner',
                  ref: positionerRef,
                },
                root: {
                  ...({ 'data-custom': 'paper' } as object),
                  className: 'custom-paper',
                  ref: paperRef,
                },
              }}
            />,
          );
          const popup = await openMenu(user);
          const root = popup.closest(`.${popupClasses.portal}`)!;
          const positioner = popup.closest<HTMLElement>(`.${popupClasses.positioner}`)!;
          expect(popup.parentElement).to.equal(positioner);
          expect(positioner.parentElement).to.equal(root);
          expect(paperRef.current).to.equal(popup);
          expect(positionerRef.current).to.equal(positioner);
          expect(popup).to.have.class('custom-paper');
          expect(positioner).to.have.class('custom-positioner');
          expect(popup).to.have.attribute('data-custom', 'paper');
          expect(positioner).to.have.attribute('data-custom', 'positioner');
          expect(positioner).to.have.attribute('data-side');
          expect(popup.getAttribute('data-side')).to.equal(positioner.getAttribute('data-side'));
          [popup, positioner].forEach((element) => {
            expect(element).to.have.attribute('data-align', 'start');
            expect(element).to.have.attribute('data-open', '');
            expect(element).not.to.have.attribute('data-closed');
            expect(element).not.to.have.attribute('ownerState');
          });
          expect(positioner.style.position).to.equal('absolute');
          expect(positioner.style.transform).not.to.equal('');
          [root, popup.querySelector(`.${popupClasses.list}`)!].forEach((element) => {
            ['data-align', 'data-side', 'data-open', 'data-closed'].forEach((attribute) => {
              expect(element).not.to.have.attribute(attribute);
            });
          });
        });
      });

      it('keeps the Material surface when render changes the element', async () => {
        const popupRef = React.createRef<HTMLDivElement>();
        const states: Array<{ open: boolean; side: string; align: string }> = [];
        const theme = createTheme({
          components: { MuiMenu2Popup: { styleOverrides: { root: { outlineOffset: 7 } } } },
        });
        const { user } = render(
          <ThemeProvider theme={theme}>
            <TestMenu
              ref={popupRef}
              className="public-popup"
              sx={{ minWidth: 123 }}
              render={(props, state) => {
                states.push({ open: state.open, side: state.side, align: state.align });
                return <section {...props} />;
              }}
            />
          </ThemeProvider>,
        );

        // A keyboard open moves focus into the submenu too.
        const popup = await openMenu(user, { keyboard: true });
        expect(popup.tagName).to.equal('SECTION');
        expect(popupRef.current).to.equal(popup);
        expect(popup).to.have.class(popupClasses.root);
        expect(popup).to.have.class('MuiPaper-root');
        expect(popup).to.have.class('public-popup');
        expect(popup).toHaveComputedStyle({ minWidth: '123px', outlineOffset: '7px' });
        expect(screen.getByRole('menuitem', { name: 'Alpha' }).closest('section')).to.equal(popup);
        // Grow and focus management reach the rendered element.
        await waitFor(() => expect(popup.style.opacity).to.equal('1'));
        await waitFor(() => expect(popup.contains(document.activeElement)).to.equal(true));
        expect(states.at(-1)).to.deep.equal({
          open: true,
          side: popup.getAttribute('data-side'),
          align: popup.getAttribute('data-align'),
        });
      });

      it('lets slots.root take precedence over render', async () => {
        const renderSpy = vi.fn((props: React.HTMLAttributes<HTMLElement>) => (
          <section {...props} />
        ));
        const { user } = render(<TestMenu slots={{ root: 'div' }} render={renderSpy} />);

        const popup = await openMenu(user);
        expect(popup.tagName).to.equal('DIV');
        expect(renderSpy).not.toHaveBeenCalled();
      });

      it('ignores a component in the root slot props', async () => {
        const { user } = render(
          // The cast passes `component` as a JavaScript caller can.
          <TestMenu slotProps={{ root: { ...({ component: 'section' } as object) } }} />,
        );

        const popup = await openMenu(user);
        expect(popup.tagName).to.equal('DIV');
        expect(popup).not.to.have.attribute('component');
      });

      it('keeps the portal and positioner styles when render changes the elements', async () => {
        const portalRef = React.createRef<HTMLDivElement>();
        const positionerRef = React.createRef<HTMLDivElement>();
        const positionerStates: Array<{ side: string; align: string }> = [];
        const theme = createTheme({
          components: {
            MuiMenu2Popup: {
              styleOverrides: { portal: { outlineOffset: 5 }, positioner: { outlineOffset: 6 } },
            },
          },
        });
        const { user } = render(
          <ThemeProvider theme={theme}>
            <TestMenu
              slotProps={{
                portal: { ref: portalRef, render: <section />, sx: { paddingTop: '3px' } },
                positioner: {
                  ref: positionerRef,
                  sx: { paddingTop: '4px' },
                  render: (props, state) => {
                    positionerStates.push({ side: state.side, align: state.align });
                    return <aside {...props} />;
                  },
                },
              }}
            />
          </ThemeProvider>,
        );

        const popup = await openMenu(user);
        const positioner = popup.parentElement!;
        const portal = positioner.parentElement!;
        expect(positioner.tagName).to.equal('ASIDE');
        expect(portal.tagName).to.equal('SECTION');
        expect(positionerRef.current).to.equal(positioner);
        expect(portalRef.current).to.equal(portal);
        expect(positioner).to.have.class(popupClasses.positioner);
        expect(portal).to.have.class(popupClasses.portal);
        // Base UI links its hidden owner element to the portal by id.
        expect(portal.id).not.to.equal('');
        expect(document.querySelector(`[aria-owns="${portal.id}"]`)).not.to.equal(null);
        expect(positioner).toHaveComputedStyle({
          position: 'absolute',
          zIndex: '1',
          outlineOffset: '6px',
          paddingTop: '4px',
        });
        expect(portal).toHaveComputedStyle({
          position: 'absolute',
          outlineOffset: '5px',
          paddingTop: '3px',
        });
        expect(positionerStates.at(-1)).to.deep.equal({
          side: positioner.getAttribute('data-side'),
          align: positioner.getAttribute('data-align'),
        });
      });

      it('lets the portal and positioner slots take precedence over render', async () => {
        const renderSpy = vi.fn((props: React.HTMLAttributes<HTMLElement>) => (
          <section {...props} />
        ));
        const { user } = render(
          <TestMenu
            slots={{ portal: 'div', positioner: 'div' }}
            slotProps={{ portal: { render: renderSpy }, positioner: { render: renderSpy } }}
          />,
        );

        const positioner = (await openMenu(user)).parentElement!;
        expect(positioner.tagName).to.equal('DIV');
        expect(positioner.parentElement!.tagName).to.equal('DIV');
        expect(renderSpy).not.toHaveBeenCalled();
      });

      it('ignores a component in the portal and positioner slot props', async () => {
        const { user } = render(
          <TestMenu
            slotProps={{
              // The casts pass `component` as a JavaScript caller can.
              portal: { ...({ component: 'section' } as object) },
              positioner: { ...({ component: 'section' } as object) },
            }}
          />,
        );

        const positioner = (await openMenu(user)).parentElement!;
        [positioner, positioner.parentElement!].forEach((element) => {
          expect(element.tagName).to.equal('DIV');
          expect(element).not.to.have.attribute('component');
        });
      });

      [false, true].forEach((rendered) => {
        it(`hides a retained portal only after its popup exit transition, render=${rendered}`, async () => {
          const completed = vi.fn();
          function RetainedMenu() {
            const [open, setOpen] = React.useState(false);
            return (
              <TestMenu
                open={open}
                onOpenChange={setOpen}
                onOpenChangeComplete={completed}
                keepMounted
                transitionDuration={{ enter: 0, exit: 200 }}
                slotProps={{
                  portal: {
                    render: rendered ? <section /> : undefined,
                    sx: {
                      position: 'fixed',
                      inset: 0,
                      padding: 1,
                      backgroundColor: 'rgb(1, 2, 3)',
                    },
                  },
                  positioner: { render: rendered ? <aside /> : undefined },
                }}
              >
                <Menu2Item closeOnClick={false} onClick={() => setOpen(false)}>
                  Alpha
                </Menu2Item>
              </TestMenu>
            );
          }
          const { user } = render(<RetainedMenu />);
          if (submenu) {
            await user.click(screen.getByRole('button', { name: 'Options' }));
            await screen.findByRole('menuitem', { name: 'More' });
          }
          // The closed retained popup has no accessible name, so start from its portal.
          const root = document.querySelector<HTMLElement>(`.${popupClasses.portal}`)!;
          const popup = within(root).getByRole('menu', { hidden: true });
          const positioner = popup.parentElement!;
          const list = popup.querySelector(`.${popupClasses.list}`)!;
          expect(root.tagName).to.equal(rendered ? 'SECTION' : 'DIV');
          expect(positioner.tagName).to.equal(rendered ? 'ASIDE' : 'DIV');
          function expectOpenState(open: boolean) {
            [popup, positioner].forEach((element) => {
              expect(element).to.have.attribute(open ? 'data-open' : 'data-closed', '');
              expect(element).not.to.have.attribute(open ? 'data-closed' : 'data-open');
            });
            [root, list].forEach((element) => {
              ['data-open', 'data-closed', 'data-starting-style', 'data-ending-style'].forEach(
                (attribute) => expect(element).not.to.have.attribute(attribute),
              );
            });
          }
          const getOutsideTarget = () =>
            document.elementFromPoint(window.innerWidth - 8, window.innerHeight - 8);
          expectOpenState(false);
          expect(getComputedStyle(root).display).to.equal('none');
          expect(root).not.toBeVisible();
          expect(getOutsideTarget()).not.to.equal(root);

          await user.click(
            submenu
              ? screen.getByRole('menuitem', { name: 'More' })
              : screen.getByRole('button', { name: 'Options' }),
          );
          const item = await screen.findByRole('menuitem', { name: 'Alpha' });
          expect(item.closest('[role="menu"]')).to.equal(popup);
          await waitFor(() => expect(completed).toHaveBeenCalledWith(true));
          expectOpenState(true);
          expect(popup.getAttribute('data-side')).to.equal(positioner.getAttribute('data-side'));
          expect(popup.getAttribute('data-align')).to.equal(positioner.getAttribute('data-align'));
          expect(popup).not.to.have.attribute('data-starting-style');
          expect(root).toBeVisible();
          expect(getComputedStyle(root).backgroundColor).to.equal('rgb(1, 2, 3)');
          expect(getOutsideTarget()).to.equal(root);
          completed.mockClear();

          // Browser clicks can return after a short exit transition completes.
          // Capture the intermediate state when Base UI starts the exit.
          const exitStates: object[] = [];
          const observer = new MutationObserver(() => {
            if (popup.hasAttribute('data-ending-style')) {
              exitStates.push({
                popupClosed: popup.hasAttribute('data-closed'),
                positionerClosed: positioner.hasAttribute('data-closed'),
                positionerEnding: positioner.hasAttribute('data-ending-style'),
                portalVisible: getComputedStyle(root).display !== 'none',
                outsideTargetIsPortal: getOutsideTarget() === root,
                completedCalls: completed.mock.calls.length,
              });
            }
          });
          observer.observe(popup, { attributes: true, attributeFilter: ['data-ending-style'] });
          try {
            await user.click(item);
            expect(exitStates).to.deep.equal([
              {
                popupClosed: true,
                positionerClosed: true,
                positionerEnding: false,
                portalVisible: true,
                outsideTargetIsPortal: true,
                completedCalls: 0,
              },
            ]);
          } finally {
            observer.disconnect();
          }

          await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
          expectOpenState(false);
          expect(popup).not.to.have.attribute('data-ending-style');
          expect(root.isConnected).to.equal(true);
          expect(popup.isConnected).to.equal(true);
          expect(getComputedStyle(root).display).to.equal('none');
          expect(root).not.toBeVisible();
          expect(getOutsideTarget()).not.to.equal(root);

          completed.mockClear();
          await user.click(
            submenu
              ? screen.getByRole('menuitem', { name: 'More' })
              : screen.getByRole('button', { name: 'Options' }),
          );
          await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
          expect(screen.getByRole('menu', { name: submenu ? 'More' : 'Options' })).to.equal(popup);
          expectOpenState(true);
          expect(popup).not.to.have.attribute('data-ending-style');
          expect(root).toBeVisible();
        });
      });

      it('preserves placement inside a positioned portal container', async () => {
        const containerRef = React.createRef<HTMLDivElement>();
        const { user } = render(
          <div
            ref={containerRef}
            style={{ position: 'relative', marginTop: 64, marginLeft: 80, width: 400, height: 300 }}
          >
            <TestMenu
              container={containerRef}
              side="bottom"
              align="start"
              alignOffset={0}
              sideOffset={8}
            />
          </div>,
        );
        const popup = await openMenu(user);
        const positioner = popup.parentElement!;
        const root = positioner.parentElement!;
        const trigger = submenu
          ? screen.getByRole('menuitem', { name: 'More' })
          : screen.getByRole('button', { name: 'Options' });

        expect(root.parentElement).to.equal(containerRef.current);
        await waitFor(() => {
          const anchorRect = trigger.getBoundingClientRect();
          const positionerRect = positioner.getBoundingClientRect();
          expect(positionerRect.left).to.be.closeTo(anchorRect.left, 1);
          expect(positionerRect.top).to.be.closeTo(anchorRect.bottom + 8, 1);
        });
      });

      const namingCases: {
        title: string;
        props: TestMenuProps;
        name: string;
        labelledby?: string;
      }[] = [
        {
          title: 'top-level label replaces the inferred trigger label',
          props: { 'aria-label': 'Actions' },
          name: 'Actions',
        },
        {
          title: 'root label replaces the inferred trigger label',
          props: { slotProps: { root: { 'aria-label': 'Actions' } } },
          name: 'Actions',
        },
        {
          title: 'top-level labelledby replaces the inferred trigger label',
          props: { 'aria-labelledby': 'menu-label' },
          name: 'Available actions',
          labelledby: 'menu-label',
        },
        {
          title: 'root labelledby replaces the inferred trigger label',
          props: { slotProps: { root: { 'aria-labelledby': 'menu-label' } } },
          name: 'Available actions',
          labelledby: 'menu-label',
        },
        {
          title: 'explicit labelledby takes precedence over an explicit label',
          props: {
            'aria-labelledby': 'menu-label',
            slotProps: { root: { 'aria-label': 'Actions' } },
          },
          name: 'Available actions',
          labelledby: 'menu-label',
        },
        {
          title: 'root label takes precedence over the top-level label',
          props: {
            'aria-label': 'Actions',
            slotProps: { root: { 'aria-label': 'Slot actions' } },
          },
          name: 'Slot actions',
        },
        {
          title: 'root labelledby takes precedence over the top-level labelledby',
          props: {
            'aria-labelledby': 'menu-label',
            slotProps: { root: { 'aria-labelledby': 'slot-label' } },
          },
          name: 'Slot actions',
          labelledby: 'slot-label',
        },
      ];

      namingCases.forEach(({ title, props, name, labelledby }) => {
        it(`${title}`, async () => {
          const { user } = render(<TestMenu {...props} />);
          const popup = await openMenu(user, { name });
          expect(popup).toHaveAccessibleName(name);
          expect(popup.getAttribute('aria-labelledby')).to.equal(labelledby ?? null);
          expect(popup.parentElement).not.to.have.attribute('aria-label');
          expect(popup.parentElement).not.to.have.attribute('aria-labelledby');
        });
      });

      [false, true].forEach((paperOverride) => {
        it(`puts the description on the semantic popup, paper override=${paperOverride}`, async () => {
          const { user } = render(
            <TestMenu
              aria-describedby="menu-description"
              slotProps={{
                root: paperOverride ? { 'aria-describedby': 'slot-description' } : undefined,
              }}
            />,
          );
          const popup = await openMenu(user);
          expect(popup).toHaveAccessibleDescription(
            paperOverride ? 'Choose a slot action' : 'Choose an action',
          );
          expect(popup.parentElement).not.to.have.attribute('aria-describedby');
        });
      });

      it('restores the inferred trigger name when the explicit label is removed', async () => {
        function ChangeName() {
          const [label, setLabel] = React.useState<string | undefined>('Actions');
          return (
            <TestMenu aria-label={label}>
              <Menu2Item closeOnClick={false} onClick={() => setLabel(undefined)}>
                Alpha
              </Menu2Item>
            </TestMenu>
          );
        }
        const { user } = render(<ChangeName />);
        const popup = await openMenu(user, { name: 'Actions' });
        expect(popup).toHaveAccessibleName('Actions');

        await user.click(screen.getByRole('menuitem', { name: 'Alpha' }));

        expect(popup).toHaveAccessibleName(submenu ? 'More' : 'Options');
      });

      it('preserves keyboard callbacks and cancellation of navigation and dismissal', async () => {
        const currentTargets: EventTarget[] = [];
        const onKeyDown = vi.fn<NonNullable<Menu2SubmenuPopupProps['onKeyDown']>>((event) => {
          currentTargets.push(event.currentTarget);
          if (event.key === 'ArrowDown') {
            event.preventBaseUIHandler();
          }
        });
        const onOpenChange = vi.fn<NonNullable<Menu2SubmenuProps['onOpenChange']>>(
          (open, details) => {
            if (!open) {
              details.cancel();
            }
          },
        );
        const { user } = render(
          <TestMenu onKeyDown={onKeyDown} onOpenChange={onOpenChange}>
            <Menu2Item>Alpha</Menu2Item>
            <Menu2Item>Beta</Menu2Item>
          </TestMenu>,
        );
        const popup = await openMenu(user, { keyboard: true });
        const alpha = screen.getByRole('menuitem', { name: 'Alpha' });
        await waitFor(() => expect(popup.contains(document.activeElement)).to.equal(true));
        await act(async () => alpha.focus());
        onKeyDown.mockClear();
        onOpenChange.mockClear();

        await user.keyboard('{ArrowDown}');

        expect(document.activeElement).to.equal(alpha);

        await user.keyboard('{Escape}');

        expect(onKeyDown).toHaveBeenCalledTimes(2);
        expect(currentTargets).to.deep.equal([popup, popup]);
        expect(document.activeElement).to.equal(alpha);
        expect(popup).to.have.attribute('data-open');
        expect(onOpenChange).toHaveBeenCalledWith(
          false,
          expect.objectContaining({ reason: 'escape-key' }),
        );
      });

      it('lets a root slot handler cancel Base UI keyboard navigation', async () => {
        const onKeyDown = vi.fn<NonNullable<Menu2PopupProps['onKeyDown']>>((event) => {
          if (event.key === 'ArrowDown') {
            event.preventBaseUIHandler();
          }
        });
        const { user } = render(
          <TestMenu slotProps={{ root: { onKeyDown } }}>
            <Menu2Item>Alpha</Menu2Item>
            <Menu2Item>Beta</Menu2Item>
          </TestMenu>,
        );
        const popup = await openMenu(user, { keyboard: true });
        const alpha = screen.getByRole('menuitem', { name: 'Alpha' });
        await waitFor(() => expect(popup.contains(document.activeElement)).to.equal(true));
        await act(async () => alpha.focus());
        onKeyDown.mockClear();

        await user.keyboard('{ArrowDown}');

        expect(onKeyDown).toHaveBeenCalledOnce();
        expect(document.activeElement).to.equal(alpha);
      });

      it('uses the portal slot z-index for hit testing', async () => {
        const { user } = render(
          <React.Fragment>
            <div
              data-testid="overlay"
              style={{ position: 'fixed', inset: 0, zIndex: 1500, pointerEvents: 'none' }}
            />
            <TestMenu slotProps={{ portal: { sx: { zIndex: 2000 } } }}>
              <Menu2Item>Alpha</Menu2Item>
            </TestMenu>
          </React.Fragment>,
        );
        const popup = await openMenu(user);
        const overlay = screen.getByTestId('overlay');
        overlay.style.pointerEvents = 'auto';
        const item = screen.getByRole('menuitem', { name: 'Alpha' }).getBoundingClientRect();
        expect(getComputedStyle(popup.parentElement!.parentElement!).zIndex).to.equal('2000');
        expect(
          popup.contains(document.elementFromPoint(item.left + 8, item.top + item.height / 2)),
        ).to.equal(true);
      });
    });
  });

  it('uses the portal slot z-index for the modal click blocker', async () => {
    const { user } = render(
      <React.Fragment>
        <div
          data-testid="overlay"
          style={{ position: 'fixed', inset: 0, zIndex: 1500, pointerEvents: 'none' }}
        />
        <Menu2>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup slots={{ transition: null }} slotProps={{ portal: { sx: { zIndex: 2000 } } }}>
            <Menu2Item>Alpha</Menu2Item>
          </Menu2Popup>
        </Menu2>
      </React.Fragment>,
    );
    await user.click(screen.getByRole('button', { name: 'Options' }));
    const popup = await screen.findByRole('menu');
    const root = popup.closest<HTMLElement>(`.${menu2PopupClasses.portal}`)!;
    const positioner = popup.parentElement!;
    const blocker = positioner.previousElementSibling!;
    screen.getByTestId('overlay').style.pointerEvents = 'auto';

    expect(blocker).to.have.attribute('role', 'presentation');
    expect(blocker.parentElement).to.equal(root);
    expect(getComputedStyle(root).zIndex).to.equal('2000');
    expect(document.elementFromPoint(window.innerWidth - 8, window.innerHeight - 8)).to.equal(
      blocker,
    );
    const item = screen.getByRole('menuitem', { name: 'Alpha' }).getBoundingClientRect();
    expect(
      popup.contains(document.elementFromPoint(item.left + 8, item.top + item.height / 2)),
    ).to.equal(true);
  });
});
