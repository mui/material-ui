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

describe('<Menu2SubmenuTrigger />', () => {
  const { render } = createRenderer();

  it('renders a decorative submenu indicator by default', () => {
    render(
      <Menu2 defaultOpen modal={false} anchor={document.body}>
        <Menu2Submenu trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>}>
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );
    const trigger = screen.getByRole('menuitem', { name: 'More' });
    const indicator = trigger.querySelector(`.${classes.indicator}`);
    expect(indicator).not.to.equal(null);
    expect(indicator).to.have.attribute('aria-hidden', 'true');
    expect(indicator!.querySelector('svg')).not.to.equal(null);
  });

  describeConformance(<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false} anchor={document.body}>
          <Menu2Submenu trigger={node}>
            <Menu2Item>Nested</Menu2Item>
          </Menu2Submenu>
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) =>
      baseElement.querySelector('[role="menuitem"][aria-haspopup="menu"]'),
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenu2SubmenuTrigger',
    testVariantProps: { dense: true },
    slots: {
      indicator: { expectedClassName: classes.indicator },
    },
    testDeepOverrides: { slotName: 'indicator', slotClassName: classes.indicator },
  }));

  (['ltr', 'rtl'] as const).forEach((direction) => {
    it.skipIf(isJsdom())(`aligns the indicator at the trailing edge in ${direction}`, () => {
      render(
        <ThemeProvider theme={createTheme({ direction })}>
          <Menu2
            defaultOpen
            modal={false}
            anchor={document.body}
            slots={{ transition: null }}
            slotProps={{ list: { dir: direction } }}
          >
            <Menu2Submenu
              trigger={
                <Menu2SubmenuTrigger sx={{ width: 240 }}>
                  <span data-testid="label">More</span>
                </Menu2SubmenuTrigger>
              }
            >
              <Menu2Item>Nested</Menu2Item>
            </Menu2Submenu>
          </Menu2>
        </ThemeProvider>,
      );
      const trigger = screen.getByRole('menuitem', { name: 'More' });
      const indicator = trigger.querySelector(`.${classes.indicator}`)!;
      expect(
        indicator.querySelector(
          `[data-testid="KeyboardArrow${direction === 'rtl' ? 'Left' : 'Right'}Icon"]`,
        ),
      ).not.to.equal(null);
      const triggerRect = trigger.getBoundingClientRect();
      const iconRect = indicator.querySelector('svg')!.getBoundingClientRect();
      const labelRect = screen.getByTestId('label').getBoundingClientRect();
      if (direction === 'rtl') {
        expect(iconRect.left - triggerRect.left).to.be.closeTo(16, 0.1);
        expect(labelRect.left - iconRect.right).to.be.greaterThan(8);
      } else {
        expect(triggerRect.right - iconRect.right).to.be.closeTo(16, 0.1);
        expect(iconRect.left - labelRect.right).to.be.greaterThan(8);
      }
    });
  });

  it('can replace the icon or hide the indicator', () => {
    function NoIndicator() {
      return null;
    }
    render(
      <Menu2 defaultOpen modal={false} anchor={document.body}>
        <Menu2Submenu
          trigger={
            <Menu2SubmenuTrigger slotProps={{ indicator: { children: <span>+</span> } }}>
              Custom
            </Menu2SubmenuTrigger>
          }
        >
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
        <Menu2Submenu
          trigger={
            <Menu2SubmenuTrigger slots={{ indicator: NoIndicator }}>Hidden</Menu2SubmenuTrigger>
          }
        >
          <Menu2Item>Nested</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );
    const custom = screen.getByRole('menuitem', { name: 'Custom' });
    expect(custom.querySelector(`.${classes.indicator}`)).to.have.text('+');
    expect(custom.querySelector('svg')).to.equal(null);
    expect(
      screen.getByRole('menuitem', { name: 'Hidden' }).querySelector(`.${classes.indicator}`),
    ).to.equal(null);
  });

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
    const forwardedRef = React.createRef<HTMLDivElement>();
    const slotRef = React.createRef<HTMLDivElement>();
    const indicatorRef = React.createRef<HTMLSpanElement>();
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
                indicator: (state) => ({
                  ref: indicatorRef,
                  'data-open-state': String(state.open),
                  sx: { color: state.open ? 'rgb(1, 2, 3)' : 'rgb(4, 5, 6)' },
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
    expect(indicatorRef.current).to.equal(trigger.querySelector(`.${classes.indicator}`));
    expect(indicatorRef.current).to.have.attribute('data-open-state', 'false');
    expect(getComputedStyle(indicatorRef.current!).color).to.equal('rgb(4, 5, 6)');
    expect(trigger).to.have.attribute('data-open-state', 'false');
    // Let the parent popup take its initial focus before opening a child popup.
    await waitFor(() =>
      expect(screen.getByRole('menu').contains(document.activeElement)).to.equal(true),
    );
    await user.click(trigger);
    await waitFor(() => expect(trigger).to.have.attribute('data-open-state', 'true'));
    expect(indicatorRef.current).to.have.attribute('data-open-state', 'true');
    expect(getComputedStyle(indicatorRef.current!).color).to.equal('rgb(1, 2, 3)');
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
