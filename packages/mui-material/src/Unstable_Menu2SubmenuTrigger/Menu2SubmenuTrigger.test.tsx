import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger, {
  menu2SubmenuTriggerClasses as classes,
} from '@mui/material/Unstable_Menu2SubmenuTrigger';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2SubmenuTrigger />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Menu2 defaultOpen modal={false} anchor={document.body}>
            <Menu2Submenu trigger={node}>
              <Menu2Item>Nested</Menu2Item>
            </Menu2Submenu>
          </Menu2>,
        ),
        '[role="menuitem"][aria-haspopup="menu"]',
      ),
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenu2SubmenuTrigger',
    testVariantProps: { dense: true },
  }));

  it.skipIf(isJsdom())(
    'preserves Tooltip-wrapped label overrides and a single keyboard position',
    async () => {
      const { user } = render(
        <Menu2 trigger={<Button>Open</Button>}>
          <Menu2Item>Alpha</Menu2Item>
          <Menu2Submenu
            trigger={
              <Tooltip title="Open more actions" describeChild>
                <Menu2SubmenuTrigger label="Zebra">More</Menu2SubmenuTrigger>
              </Tooltip>
            }
          >
            <Menu2Item>Nested</Menu2Item>
          </Menu2Submenu>
          <Menu2Item>Omega</Menu2Item>
        </Menu2>,
      );
      await act(async () => screen.getByRole('button', { name: 'Open' }).focus());
      await user.keyboard('{ArrowDown}');
      await waitFor(() =>
        expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'Alpha' })),
      );
      await user.keyboard('z');
      const trigger = screen.getByRole('menuitem', { name: 'More' });
      expect(document.activeElement).to.equal(trigger);
      expect(trigger).not.to.have.class('MuiMenu2Item-root');
      await user.keyboard('{ArrowDown}');
      expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'Omega' }));
      await user.keyboard('{ArrowUp}{ArrowRight}');
      await waitFor(() =>
        expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'Nested' })),
      );
      // Base UI omits aria-expanded during keyboard opening on VoiceOver platforms.
      expect(trigger).to.have.class(classes.open);
      await user.keyboard('{Escape}');
      await waitFor(() => expect(document.activeElement).to.equal(trigger));
      expect(screen.getByRole('menuitem', { name: 'Alpha' })).not.to.equal(null);
    },
  );

  it.skipIf(isJsdom())(
    'keeps a Tooltip-wrapped disabled trigger focusable without opening it',
    async () => {
      const onOpenChange = vi.fn();
      const { user } = render(
        <Menu2 trigger={<Button>Open</Button>}>
          <Menu2Submenu
            onOpenChange={onOpenChange}
            trigger={
              <Tooltip title="Unavailable" describeChild>
                <Menu2SubmenuTrigger disabled>More</Menu2SubmenuTrigger>
              </Tooltip>
            }
          >
            <Menu2Item>Nested</Menu2Item>
          </Menu2Submenu>
          <Menu2Item>After</Menu2Item>
        </Menu2>,
      );
      await act(async () => screen.getByRole('button', { name: 'Open' }).focus());
      await user.keyboard('{ArrowDown}');
      const trigger = await screen.findByRole('menuitem', { name: 'More' });
      // Initial focus skips disabled items; arrow navigation can still reach them.
      await waitFor(() =>
        expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'After' })),
      );
      await user.keyboard('{ArrowUp}');
      await waitFor(() => expect(document.activeElement).to.equal(trigger));
      expect(trigger).to.have.attribute('aria-disabled', 'true');
      expect(getComputedStyle(trigger).pointerEvents).to.equal('none');
      await user.keyboard('{Enter}{ArrowRight}');
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(screen.queryByRole('menuitem', { name: 'Nested' })).to.equal(null);
      await user.keyboard('{ArrowDown}');
      expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'After' }));
    },
  );

  it('composes public and slot refs and provides live slot state', async () => {
    const forwardedRef = React.createRef<HTMLElement>();
    const slotRef = React.createRef<HTMLElement>();
    const onClick = vi.fn();
    const onSlotClick = vi.fn();
    const { user } = render(
      <Menu2 defaultOpen modal={false} anchor={document.body}>
        <Menu2Submenu
          trigger={
            <Menu2SubmenuTrigger
              openOnHover={false}
              ref={forwardedRef}
              onClick={onClick}
              slotProps={{
                root: (state) => ({
                  ref: slotRef,
                  onClick: onSlotClick,
                  'data-open-state': String(state.open),
                  'data-highlighted-state': String(state.highlighted),
                }),
              }}
            >
              More
            </Menu2SubmenuTrigger>
          }
        >
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );
    const trigger = screen.getByRole('menuitem', { name: 'More' });
    expect(forwardedRef.current).to.equal(trigger);
    expect(slotRef.current).to.equal(trigger);
    expect(trigger).to.have.attribute('data-open-state', 'false');
    // Let the parent popup take its initial focus before opening a child popup.
    await waitFor(() =>
      expect(screen.getByRole('menu').contains(document.activeElement)).to.equal(true),
    );
    await user.click(trigger);
    await waitFor(() => expect(trigger).to.have.attribute('data-open-state', 'true'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onSlotClick).toHaveBeenCalledTimes(1);
  });

  it('themes the trigger independently of its parent list', () => {
    const theme = createTheme({
      components: {
        MuiMenu2SubmenuTrigger: {
          defaultProps: { dense: true, disableRipple: true },
          styleOverrides: { root: { color: 'rgb(1, 2, 3)' } },
          variants: [{ props: { selected: true }, style: { paddingLeft: 24 } }],
        },
      },
    });
    render(
      <ThemeProvider theme={theme}>
        <Menu2 defaultOpen modal={false} anchor={document.body}>
          <Menu2Submenu trigger={<Menu2SubmenuTrigger selected>More</Menu2SubmenuTrigger>}>
            <Menu2Item>Nested</Menu2Item>
          </Menu2Submenu>
        </Menu2>
      </ThemeProvider>,
    );
    const trigger = screen.getByRole('menuitem', { name: 'More' });
    expect(trigger).to.have.class(classes.dense);
    expect(getComputedStyle(trigger).color).to.equal('rgb(1, 2, 3)');
    expect(getComputedStyle(trigger).paddingLeft).to.equal('24px');
  });
});
