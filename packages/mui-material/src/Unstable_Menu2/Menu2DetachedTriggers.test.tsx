import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2, { createHandle, menu2TriggerClasses } from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';

describe('Menu2 detached triggers', () => {
  const { render } = createRenderer();

  it('opens with the keyboard and returns focus to the active detached trigger', async () => {
    const handle = createHandle();
    const { user } = render(
      <React.Fragment>
        <Menu2Trigger handle={handle}>
          <Button disableRipple>First</Button>
        </Menu2Trigger>
        <Menu2Trigger handle={handle}>
          <Button disableRipple>Second</Button>
        </Menu2Trigger>
        <Menu2 handle={handle} transitionDuration={0}>
          <Menu2Item>Profile</Menu2Item>
          <Menu2Item>Settings</Menu2Item>
        </Menu2>
      </React.Fragment>,
    );
    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });

    expect(first).to.have.attribute('aria-haspopup', 'menu');
    expect(second).to.have.attribute('aria-expanded', 'false');
    await act(async () => second.focus());
    await user.keyboard('{ArrowDown}');

    const popup = await screen.findByRole('menu', { name: 'Second' });
    await waitFor(() =>
      expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'Profile' })),
    );
    expect(popup).to.have.attribute('aria-labelledby', second.id);
    expect(second).to.have.attribute('aria-controls', popup.id);
    expect(second).to.have.attribute('aria-expanded', 'true');
    expect(second).to.have.class(menu2TriggerClasses.open);
    expect(first).to.have.attribute('aria-expanded', 'false');
    expect(first).not.to.have.class(menu2TriggerClasses.open);

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
    await waitFor(() => expect(document.activeElement).to.equal(second));
    expect(second).to.have.attribute('aria-expanded', 'false');
    expect(second).not.to.have.class(menu2TriggerClasses.open);
  });

  it('updates the active payload and uses it when selecting an item', async () => {
    const handle = createHandle<string>();
    const selected = vi.fn();
    function Test() {
      const [name, setName] = React.useState('Document');
      return (
        <React.Fragment>
          <Menu2Trigger handle={handle} payload={name}>
            <Button disableRipple>Actions</Button>
          </Menu2Trigger>
          <Menu2 handle={handle} transitionDuration={0}>
            {({ payload }) => (
              <React.Fragment>
                <Menu2Item closeOnClick={false} onClick={() => setName('Renamed document')}>
                  Rename
                </Menu2Item>
                <Menu2Item onClick={() => selected(payload)}>Choose {payload}</Menu2Item>
              </React.Fragment>
            )}
          </Menu2>
        </React.Fragment>
      );
    }
    const { user } = render(<Test />);

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(await screen.findByRole('menuitem', { name: 'Choose Document' })).not.to.equal(null);
    await user.click(screen.getByRole('menuitem', { name: 'Rename' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Choose Renamed document' }));

    expect(selected).toHaveBeenCalledExactlyOnceWith('Renamed document');
    await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
  });

  it.skipIf(isJsdom())(
    'transitions between triggers while open with modal=false and the default Grow',
    async () => {
      const handle = createHandle<string>();
      const completed = vi.fn();
      const selected = vi.fn();
      const { user } = render(
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 32 }}
        >
          <Menu2Trigger handle={handle} payload="first">
            <Button disableRipple>First</Button>
          </Menu2Trigger>
          <Menu2Trigger handle={handle} payload="second">
            <Button disableRipple>Second</Button>
          </Menu2Trigger>
          <Menu2
            handle={handle}
            modal={false}
            side="right"
            onOpenChangeComplete={completed}
            slotProps={{
              positioner: {
                'data-testid': 'positioner',
              },
            }}
          >
            {({ payload }) => (
              <Menu2Item onClick={() => selected(payload)}>Choose {payload}</Menu2Item>
            )}
          </Menu2>
        </div>,
      );
      const first = screen.getByRole('button', { name: 'First' });
      const second = screen.getByRole('button', { name: 'Second' });

      await user.click(first);
      const popup = await screen.findByRole('menu', { name: 'First' });
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
      const positioner = screen.getByTestId('positioner');
      await waitFor(() => expect(positioner.getAnimations()).to.have.length(0));
      const initialTop = positioner.getBoundingClientRect().top;
      const transitionStarted = vi.fn();
      positioner.addEventListener('transitionrun', (event) => {
        if (event.target === positioner && event.propertyName === 'transform') {
          transitionStarted();
        }
      });
      await user.click(second);

      expect(await screen.findByRole('menu', { name: 'Second' })).to.equal(popup);
      await waitFor(() => expect(transitionStarted).toHaveBeenCalled());
      await waitFor(() => expect(positioner.getAnimations()).to.have.length(0));
      expect(positioner.getBoundingClientRect().top).to.be.greaterThan(initialTop);
      expect(positioner.getBoundingClientRect().top).to.be.closeTo(
        second.getBoundingClientRect().top,
        1,
      );
      expect(completed).toHaveBeenCalledExactlyOnceWith(true);
      expect(second).to.have.attribute('aria-controls', popup.id);
      expect(second).to.have.class(menu2TriggerClasses.open);
      expect(first).not.to.have.class(menu2TriggerClasses.open);
      expect(popup).to.have.attribute('data-open');
      await user.click(screen.getByRole('menuitem', { name: 'Choose second' }));

      expect(selected).toHaveBeenCalledExactlyOnceWith('second');
      await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
      await waitFor(() => expect(document.activeElement).to.equal(second));
      expect(completed).toHaveBeenCalledTimes(2);
      expect(completed).toHaveBeenLastCalledWith(false);
    },
  );

  describe.skipIf(isJsdom())('position transitions', () => {
    (['always', 'never', 'system'] as const).forEach((reducedMotion) => {
      it(`respects motion.reducedMotion=${reducedMotion}`, async () => {
        const handle = createHandle();
        const theme = createTheme({
          motion: { reducedMotion },
        });
        const { user } = render(
          <ThemeProvider theme={theme}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 32,
              }}
            >
              <Menu2Trigger handle={handle}>
                <Button disableRipple>First</Button>
              </Menu2Trigger>
              <Menu2Trigger handle={handle}>
                <Button disableRipple>Second</Button>
              </Menu2Trigger>
            </div>
            <Menu2
              handle={handle}
              modal={false}
              side="right"
              transitionDuration={0}
              slotProps={{ positioner: { 'data-testid': 'positioner' } }}
            >
              <Menu2Item>Profile</Menu2Item>
            </Menu2>
          </ThemeProvider>,
        );

        await user.click(screen.getByRole('button', { name: 'First' }));
        await screen.findByRole('menu');

        const positioner = screen.getByTestId('positioner');
        await waitFor(() => expect(positioner.style.transition).to.equal(''));
        const transitionStarted = vi.fn();
        positioner.addEventListener('transitionrun', (event) => {
          if (event.target === positioner && event.propertyName === 'transform') {
            transitionStarted();
          }
        });
        const second = screen.getByRole('button', { name: 'Second' });
        await user.click(second);
        await screen.findByRole('menu', { name: 'Second' });
        await waitFor(() =>
          expect(positioner.getBoundingClientRect().top).to.be.closeTo(
            second.getBoundingClientRect().top,
            1,
          ),
        );
        const shouldReduceMotion =
          reducedMotion === 'always' ||
          (reducedMotion === 'system' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        if (shouldReduceMotion) {
          expect(transitionStarted).not.toHaveBeenCalled();
        } else {
          expect(transitionStarted).toHaveBeenCalled();
        }
      });
    });

    ['sx', 'theme'].forEach((source) => {
      it(`allows ${source} styles to disable position transitions`, async () => {
        const handle = createHandle();
        const theme = createTheme({
          components: {
            MuiMenu2: {
              styleOverrides: {
                positioner: source === 'theme' ? { transition: 'none' } : undefined,
              },
            },
          },
        });
        const { user } = render(
          <ThemeProvider theme={theme}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 32,
              }}
            >
              <Menu2Trigger handle={handle}>
                <Button disableRipple>First</Button>
              </Menu2Trigger>
              <Menu2Trigger handle={handle}>
                <Button disableRipple>Second</Button>
              </Menu2Trigger>
            </div>
            <Menu2
              handle={handle}
              modal={false}
              side="right"
              transitionDuration={0}
              slotProps={{
                positioner: {
                  'data-testid': 'positioner',
                  sx: source === 'sx' ? { transition: 'none' } : undefined,
                },
              }}
            >
              <Menu2Item>Profile</Menu2Item>
            </Menu2>
          </ThemeProvider>,
        );

        await user.click(screen.getByRole('button', { name: 'First' }));
        await screen.findByRole('menu');
        const positioner = screen.getByTestId('positioner');
        await waitFor(() => expect(positioner.style.transition).to.equal(''));
        const transitionStarted = vi.fn();
        positioner.addEventListener('transitionrun', (event) => {
          if (event.target === positioner && event.propertyName === 'transform') {
            transitionStarted();
          }
        });
        const second = screen.getByRole('button', { name: 'Second' });
        await user.click(second);
        await screen.findByRole('menu', { name: 'Second' });
        await waitFor(() =>
          expect(positioner.getBoundingClientRect().top).to.be.closeTo(
            second.getBoundingClientRect().top,
            1,
          ),
        );

        expect(transitionStarted).not.toHaveBeenCalled();
      });
    });

    it('does not add position transitions to ordinary menus or submenus', async () => {
      const { user } = render(
        <Menu2
          trigger={<Button disableRipple>Actions</Button>}
          transitionDuration={0}
          slotProps={{ positioner: { 'data-testid': 'positioner' } }}
        >
          <Menu2Submenu
            trigger={<Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>}
            transitionDuration={0}
            slotProps={{ positioner: { 'data-testid': 'submenu-positioner' } }}
          >
            <Menu2Item>Profile</Menu2Item>
          </Menu2Submenu>
        </Menu2>,
      );
      await user.click(screen.getByRole('button', { name: 'Actions' }));
      await user.click(await screen.findByRole('menuitem', { name: 'More' }));
      await screen.findByRole('menuitem', { name: 'Profile' });

      const positioners = ['positioner', 'submenu-positioner'].map((testId) =>
        screen.getByTestId(testId),
      );
      await waitFor(() => {
        positioners.forEach((positioner) => expect(positioner.style.transition).to.equal(''));
      });
      positioners.forEach((positioner) => {
        expect(window.getComputedStyle(positioner).transitionDuration).to.equal('0s');
      });
    });

    [false, true].forEach((afterSwitch) => {
      it(`tracks a scrolling container without a transition ${afterSwitch ? 'after' : 'before'} switching triggers`, async () => {
        const handle = createHandle();
        const { user } = render(
          <div data-testid="scroller" style={{ height: 220, width: 600, overflow: 'auto' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 64,
                paddingTop: 50,
                height: 500,
              }}
            >
              <Menu2Trigger handle={handle}>
                <Button disableRipple>First</Button>
              </Menu2Trigger>
              <Menu2Trigger handle={handle}>
                <Button disableRipple>Second</Button>
              </Menu2Trigger>
              <Menu2
                handle={handle}
                modal={false}
                side="right"
                transitionDuration={0}
                slotProps={{ positioner: { 'data-testid': 'positioner' } }}
              >
                <Menu2Item>Profile</Menu2Item>
              </Menu2>
            </div>
          </div>,
        );
        const first = screen.getByRole('button', { name: 'First' });
        const second = screen.getByRole('button', { name: 'Second' });
        const scroller = screen.getByTestId('scroller');

        await user.click(first);
        await screen.findByRole('menu');
        const positioner = screen.getByTestId('positioner');
        await waitFor(() => expect(positioner.style.transition).to.equal(''));
        const transitionStarted = vi.fn();
        positioner.addEventListener('transitionrun', (event) => {
          if (event.target === positioner && event.propertyName === 'transform') {
            transitionStarted();
          }
        });
        await waitFor(() =>
          expect(positioner.getBoundingClientRect().top).to.be.closeTo(
            first.getBoundingClientRect().top,
            1,
          ),
        );

        async function scrollWithoutTransition(trigger: HTMLElement) {
          const previousTransform = positioner.style.transform;
          await act(async () => {
            scroller.scrollTop += 20;
          });
          await waitFor(() => expect(positioner.style.transform).not.to.equal(previousTransform));
          await act(async () => {
            await new Promise<void>((resolve) => {
              requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
            });
          });

          expect(transitionStarted).not.toHaveBeenCalled();
          expect(positioner.getBoundingClientRect().top).to.be.closeTo(
            trigger.getBoundingClientRect().top,
            1,
          );
        }

        if (afterSwitch) {
          await user.click(second);
          await waitFor(() => expect(transitionStarted).toHaveBeenCalled());
          await waitFor(() => expect(positioner.getAnimations()).to.have.length(0));
          transitionStarted.mockClear();
        }
        await scrollWithoutTransition(afterSwitch ? second : first);
      });

      it(`tracks layout resizing without a position transition ${afterSwitch ? 'after' : 'before'} switching triggers`, async () => {
        const handle = createHandle();
        const { user } = render(
          <div
            data-testid="layout"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 32,
              width: 200,
            }}
          >
            <Menu2Trigger handle={handle}>
              <Button disableRipple>First</Button>
            </Menu2Trigger>
            <Menu2Trigger handle={handle}>
              <Button disableRipple>Second</Button>
            </Menu2Trigger>
            <Menu2
              handle={handle}
              modal={false}
              side="right"
              transitionDuration={0}
              slotProps={{ positioner: { 'data-testid': 'positioner' } }}
            >
              <Menu2Item>Profile</Menu2Item>
            </Menu2>
          </div>,
        );
        const first = screen.getByRole('button', { name: 'First' });
        const second = screen.getByRole('button', { name: 'Second' });
        await user.click(first);
        await screen.findByRole('menu');
        const positioner = screen.getByTestId('positioner');
        await waitFor(() => expect(positioner.style.transition).to.equal(''));
        const transitionStarted = vi.fn();
        positioner.addEventListener('transitionrun', (event) => {
          if (event.target === positioner && event.propertyName === 'transform') {
            transitionStarted();
          }
        });
        await waitFor(() =>
          expect(positioner.getBoundingClientRect().left).to.be.closeTo(
            first.getBoundingClientRect().right,
            1,
          ),
        );
        if (afterSwitch) {
          await user.click(second);
          await waitFor(() => expect(transitionStarted).toHaveBeenCalled());
          await waitFor(() => expect(positioner.getAnimations()).to.have.length(0));
          transitionStarted.mockClear();
        }
        const previousTransform = positioner.style.transform;
        await act(async () => {
          screen.getByTestId('layout').style.width = '300px';
        });
        await waitFor(() => expect(positioner.style.transform).not.to.equal(previousTransform));
        await act(async () => {
          await new Promise<void>((resolve) => {
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
          });
        });

        expect(transitionStarted).not.toHaveBeenCalled();
        expect(positioner.getBoundingClientRect().left).to.be.closeTo(
          (afterSwitch ? second : first).getBoundingClientRect().right,
          1,
        );
      });
    });
  });

  [false, true].forEach((controlled) => {
    it(`uses ${controlled ? 'triggerId and open' : 'defaultTriggerId and defaultOpen'} for the initial trigger`, async () => {
      const handle = createHandle<string>();
      function Test() {
        const [open, setOpen] = React.useState(true);
        const [triggerId, setTriggerId] = React.useState<string | null>('second-trigger');
        return (
          <React.Fragment>
            <Menu2Trigger id="first-trigger" handle={handle} payload="first">
              <Button disableRipple>First</Button>
            </Menu2Trigger>
            <Menu2Trigger id="second-trigger" handle={handle} payload="second">
              <Button disableRipple>Second</Button>
            </Menu2Trigger>
            <Menu2
              handle={handle}
              modal={false}
              transitionDuration={0}
              {...(controlled
                ? { open, triggerId }
                : { defaultOpen: true, defaultTriggerId: 'second-trigger' })}
              onOpenChange={(nextOpen, details) => {
                setOpen(nextOpen);
                if (nextOpen) {
                  setTriggerId(details.trigger?.id ?? null);
                }
              }}
            >
              {({ payload }) => <Menu2Item>Choose {payload}</Menu2Item>}
            </Menu2>
          </React.Fragment>
        );
      }
      const { user } = render(<Test />);
      const first = screen.getByRole('button', { name: 'First' });
      const second = screen.getByRole('button', { name: 'Second' });

      expect(await screen.findByRole('menu', { name: 'Second' })).not.to.equal(null);
      expect(screen.getByRole('menuitem', { name: 'Choose second' })).not.to.equal(null);
      expect(second).to.have.class(menu2TriggerClasses.open);
      expect(first).not.to.have.class(menu2TriggerClasses.open);
      await user.keyboard('{Escape}');
      await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
      await waitFor(() => expect(document.activeElement).to.equal(second));

      await act(async () => first.focus());
      await user.keyboard('{ArrowDown}');

      expect(await screen.findByRole('menu', { name: 'First' })).not.to.equal(null);
      expect(screen.getByRole('menuitem', { name: 'Choose first' })).not.to.equal(null);
      expect(first).to.have.class(menu2TriggerClasses.open);
      expect(second).not.to.have.class(menu2TriggerClasses.open);
    });
  });

  it('keeps independently handled menus separate', async () => {
    const firstHandle = createHandle();
    const secondHandle = createHandle();
    const firstChanged = vi.fn();
    const secondChanged = vi.fn();
    const { user } = render(
      <React.Fragment>
        <Menu2Trigger handle={firstHandle}>
          <Button disableRipple>First</Button>
        </Menu2Trigger>
        <Menu2Trigger handle={secondHandle}>
          <Button disableRipple>Second</Button>
        </Menu2Trigger>
        <Menu2 handle={firstHandle} transitionDuration={0} onOpenChange={firstChanged}>
          <Menu2Item>First item</Menu2Item>
        </Menu2>
        <Menu2 handle={secondHandle} transitionDuration={0} onOpenChange={secondChanged}>
          <Menu2Item>Second item</Menu2Item>
        </Menu2>
      </React.Fragment>,
    );

    await user.click(screen.getByRole('button', { name: 'First' }));
    expect(await screen.findByRole('menuitem', { name: 'First item' })).not.to.equal(null);
    expect(screen.queryByRole('menuitem', { name: 'Second item' })).to.equal(null);
    expect(secondChanged).not.toHaveBeenCalled();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
    firstChanged.mockClear();

    await user.click(screen.getByRole('button', { name: 'Second' }));

    expect(await screen.findByRole('menuitem', { name: 'Second item' })).not.to.equal(null);
    expect(screen.queryByRole('menuitem', { name: 'First item' })).to.equal(null);
    expect(firstChanged).not.toHaveBeenCalled();
    expect(secondChanged).toHaveBeenCalledTimes(1);
  });

  it('opens a specified detached trigger and closes through the handle', async () => {
    const handle = createHandle<string>();
    render(
      <React.Fragment>
        <Menu2Trigger id="first-trigger" handle={handle} payload="first">
          <Button disableRipple>First</Button>
        </Menu2Trigger>
        <Menu2Trigger id="second-trigger" handle={handle} payload="second">
          <Button disableRipple>Second</Button>
        </Menu2Trigger>
        <Menu2 handle={handle} transitionDuration={0}>
          {({ payload }) => <Menu2Item>Choose {payload}</Menu2Item>}
        </Menu2>
      </React.Fragment>,
    );
    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });

    await act(async () => handle.open('second-trigger'));

    expect(await screen.findByRole('menu', { name: 'Second' })).not.to.equal(null);
    expect(screen.getByRole('menuitem', { name: 'Choose second' })).not.to.equal(null);
    expect(second).to.have.class(menu2TriggerClasses.open);
    expect(first).not.to.have.class(menu2TriggerClasses.open);
    await act(async () => handle.close());

    await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
    expect(second).to.have.attribute('aria-expanded', 'false');
    expect(second).not.to.have.class(menu2TriggerClasses.open);
  });
});
