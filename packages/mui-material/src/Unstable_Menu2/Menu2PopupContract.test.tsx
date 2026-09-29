import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Menu2 from './Menu2';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2Submenu, { Menu2SubmenuProps } from '../Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '../Unstable_Menu2SubmenuTrigger';

describe.skipIf(isJsdom())('Menu2 popup contract', () => {
  const { render } = createRenderer();

  [false, true].forEach((submenu) => {
    describe(`Menu2${submenu ? 'Submenu' : ''}`, () => {
      function TestMenu({ children = <Menu2Item>Alpha</Menu2Item>, ...props }: Menu2SubmenuProps) {
        return (
          <React.Fragment>
            <span id="menu-label">Available actions</span>
            <span id="slot-label">Slot actions</span>
            <span id="menu-description">Choose an action</span>
            <span id="slot-description">Choose a slot action</span>
            {submenu ? (
              <Menu2
                modal={false}
                transitionDuration={0}
                trigger={<button type="button">Options</button>}
              >
                <Menu2Submenu
                  transitionDuration={0}
                  {...props}
                  trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}
                >
                  {children}
                </Menu2Submenu>
              </Menu2>
            ) : (
              <Menu2
                modal={false}
                transitionDuration={0}
                {...props}
                trigger={<button type="button">Options</button>}
              >
                {children}
              </Menu2>
            )}
          </React.Fragment>
        );
      }

      async function openMenu(user: ReturnType<typeof render>['user'], keyboard = false) {
        await user.click(screen.getByRole('button', { name: 'Options' }));
        if (submenu) {
          const trigger = await screen.findByRole('menuitem', { name: 'More' });
          if (keyboard) {
            await waitFor(() =>
              expect(trigger.closest('[role="menu"]')!.contains(document.activeElement)).to.equal(
                true,
              ),
            );
            await act(async () => trigger.focus());
            await user.keyboard('{ArrowRight}');
          } else {
            await user.click(trigger);
          }
        }
        const item = await screen.findByRole('menuitem', { name: 'Alpha' });
        return item.closest<HTMLDivElement>('[role="menu"]')!;
      }

      const namingCases: {
        title: string;
        props: Menu2SubmenuProps;
        name: string;
        labelledby?: string;
      }[] = [
        {
          title: 'top-level label replaces the inferred trigger label',
          props: { 'aria-label': 'Actions' },
          name: 'Actions',
        },
        {
          title: 'paper label replaces the inferred trigger label',
          props: { slotProps: { paper: { 'aria-label': 'Actions' } } },
          name: 'Actions',
        },
        {
          title: 'top-level labelledby replaces the inferred trigger label',
          props: { 'aria-labelledby': 'menu-label' },
          name: 'Available actions',
          labelledby: 'menu-label',
        },
        {
          title: 'paper labelledby replaces the inferred trigger label',
          props: { slotProps: { paper: { 'aria-labelledby': 'menu-label' } } },
          name: 'Available actions',
          labelledby: 'menu-label',
        },
        {
          title: 'explicit labelledby takes precedence over an explicit label',
          props: {
            'aria-labelledby': 'menu-label',
            slotProps: { paper: { 'aria-label': 'Actions' } },
          },
          name: 'Available actions',
          labelledby: 'menu-label',
        },
        {
          title: 'paper label takes precedence over the top-level label',
          props: {
            'aria-label': 'Actions',
            slotProps: { paper: { 'aria-label': 'Slot actions' } },
          },
          name: 'Slot actions',
        },
        {
          title: 'paper labelledby takes precedence over the top-level labelledby',
          props: {
            'aria-labelledby': 'menu-label',
            slotProps: { paper: { 'aria-labelledby': 'slot-label' } },
          },
          name: 'Slot actions',
          labelledby: 'slot-label',
        },
      ];

      namingCases.forEach(({ title, props, name, labelledby }) => {
        it(`${title}`, async () => {
          const { user } = render(<TestMenu {...props} />);
          const popup = await openMenu(user);
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
                paper: paperOverride ? { 'aria-describedby': 'slot-description' } : undefined,
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
        const popup = await openMenu(user);
        expect(popup).toHaveAccessibleName('Actions');

        await user.click(screen.getByRole('menuitem', { name: 'Alpha' }));

        expect(popup).toHaveAccessibleName(submenu ? 'More' : 'Options');
      });

      it('preserves keyboard callbacks and cancellation of navigation and dismissal', async () => {
        const currentTargets: EventTarget[] = [];
        const onKeyDown = vi.fn<NonNullable<Menu2SubmenuProps['onKeyDown']>>((event) => {
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
        const popup = await openMenu(user, true);
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

      it('uses the public root z-index for hit testing', async () => {
        const { user } = render(
          <React.Fragment>
            <div
              data-testid="overlay"
              style={{ position: 'fixed', inset: 0, zIndex: 1500, pointerEvents: 'none' }}
            />
            <TestMenu sx={{ zIndex: 2000 }}>
              <Menu2Item>Alpha</Menu2Item>
            </TestMenu>
          </React.Fragment>,
        );
        const popup = await openMenu(user);
        const overlay = screen.getByTestId('overlay');
        overlay.style.pointerEvents = 'auto';
        const item = screen.getByRole('menuitem', { name: 'Alpha' }).getBoundingClientRect();
        expect(getComputedStyle(popup.parentElement!).zIndex).to.equal('2000');
        expect(
          popup.contains(document.elementFromPoint(item.left + 8, item.top + item.height / 2)),
        ).to.equal(true);
      });
    });
  });
});
