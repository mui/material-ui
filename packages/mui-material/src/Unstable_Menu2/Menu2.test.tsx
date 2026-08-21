import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer, fireEvent, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import { listClasses } from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { paperClasses } from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Menu2, { menu2PopupClasses, menu2TriggerClasses } from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem, {
  menu2CheckboxItemClasses,
} from '@mui/material/Unstable_Menu2CheckboxItem';
import { menu2CheckboxItemIndicatorClasses } from '@mui/material/Unstable_Menu2CheckboxItemIndicator';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item, { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2Submenu, { menu2SubmenuTriggerClasses } from '@mui/material/Unstable_Menu2Submenu';
import { createTheme, enhanceHighContrast, ThemeProvider } from '@mui/material/styles';

describe('<Menu2 />', () => {
  const { render } = createRenderer();
  type User = ReturnType<typeof render>['user'];

  async function expectTooltipOnHover(user: User, element: Element, title: string) {
    await user.hover(element);

    expect(await screen.findByRole('tooltip')).to.have.text(title);

    await user.unhover(element);

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });
  }

  it('opens from the trigger and keeps Menu.Popup as the semantic menu root', async () => {
    const { user } = render(
      <Menu2
        slotProps={{ paper: { 'data-testid': 'paper' } }}
        trigger={<Button disableRipple>Options</Button>}
      >
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger).to.have.class(menu2TriggerClasses.root);

    await user.click(trigger);

    const menu = await screen.findByRole('menu');
    expect(menu).to.have.class(menu2PopupClasses.root);
    expect(screen.getByTestId('paper')).to.have.class(menu2PopupClasses.paper);

    const list = screen.getByTestId('paper').querySelector(`.${menu2PopupClasses.list}`);
    expect(list).not.to.equal(null);
    expect(list!.tagName).to.equal('DIV');
    expect(list!).to.have.class(listClasses.padding);

    expect(screen.getByRole('menuitem', { name: 'Profile' })).to.have.class(menu2ItemClasses.root);
  });

  // Theming, classes, slots and the `component` prop are covered per part by
  // the describeConformance suites next to each component; what stays here is
  // Base UI-specific behavior and Material integration.

  it('does not pass ownerState to host popup slots', async () => {
    const { user } = render(
      <Menu2
        slots={{ popup: 'div' }}
        slotProps={{ popup: { 'data-testid': 'popup' } }}
        trigger={<Button disableRipple>Options</Button>}
      >
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByTestId('popup')).not.to.have.attribute('ownerState');
  });

  it('derives native button behavior from host root slots', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      const { user } = render(
        <Menu2
          trigger={
            <div role="button" tabIndex={0}>
              Options
            </div>
          }
          slotProps={{ trigger: { nativeButton: false } }}
        >
          <Menu2Item closeOnClick={false} slots={{ root: 'button' }}>
            Native item
          </Menu2Item>
          <Menu2CheckboxItem closeOnClick={false} slots={{ root: 'button' }}>
            Native checkbox
          </Menu2CheckboxItem>
          <Menu2RadioGroup defaultValue="small">
            <Menu2RadioItem closeOnClick={false} slots={{ root: 'button' }} value="large">
              Native radio
            </Menu2RadioItem>
          </Menu2RadioGroup>
          <Menu2Submenu
            trigger={<Menu2Item slots={{ root: 'button' }}>Native submenu trigger</Menu2Item>}
            slotProps={{ trigger: { nativeButton: true } }}
          >
            <Menu2Item>Nested</Menu2Item>
          </Menu2Submenu>
        </Menu2>,
      );

      const trigger = screen.getByRole('button', { name: 'Options' });
      expect(trigger.tagName).to.equal('DIV');

      trigger.focus();
      await user.keyboard('[Enter]');

      expect(await screen.findByRole('menuitem', { name: 'Native item' })).to.have.property(
        'tagName',
        'BUTTON',
      );
      expect(screen.getByRole('menuitemcheckbox', { name: 'Native checkbox' })).to.have.property(
        'tagName',
        'BUTTON',
      );
      expect(screen.getByRole('menuitemradio', { name: 'Native radio' })).to.have.property(
        'tagName',
        'BUTTON',
      );
      expect(screen.getByRole('menuitem', { name: 'Native submenu trigger' })).to.have.property(
        'tagName',
        'BUTTON',
      );
      expect(
        error.mock.calls.some(([message]) => String(message).includes('nativeButton')),
      ).to.equal(false);
    } finally {
      error.mockRestore();
    }
  });

  it('allows nativeButton to override root slot inference for custom slots', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const CustomDivRoot = React.forwardRef<
      HTMLDivElement,
      React.ComponentPropsWithoutRef<'div'> & { ownerState?: unknown }
    >(function CustomDivRoot({ ownerState: _ownerState, ...props }, ref) {
      return <div ref={ref} {...props} />;
    });
    const CustomButtonRoot = React.forwardRef<
      HTMLButtonElement,
      React.ComponentPropsWithoutRef<'button'> & { ownerState?: unknown }
    >(function CustomButtonRoot({ ownerState: _ownerState, ...props }, ref) {
      return <button ref={ref} type="button" {...props} />;
    });

    try {
      const { user } = render(
        <Menu2
          trigger={
            <CustomDivRoot role="button" tabIndex={0}>
              Options
            </CustomDivRoot>
          }
          slotProps={{ trigger: { nativeButton: false } }}
        >
          <Menu2Item closeOnClick={false} nativeButton slots={{ root: CustomButtonRoot }}>
            Custom native item
          </Menu2Item>
          <Menu2Submenu
            trigger={
              <Menu2Item nativeButton slots={{ root: CustomButtonRoot }}>
                Custom native submenu trigger
              </Menu2Item>
            }
            slotProps={{ trigger: { nativeButton: true } }}
          >
            <Menu2Item>Nested</Menu2Item>
          </Menu2Submenu>
        </Menu2>,
      );

      const trigger = screen.getByRole('button', { name: 'Options' });
      expect(trigger.tagName).to.equal('DIV');

      trigger.focus();
      await user.keyboard('[Enter]');

      expect(await screen.findByRole('menuitem', { name: 'Custom native item' })).to.have.property(
        'tagName',
        'BUTTON',
      );
      expect(
        screen.getByRole('menuitem', { name: 'Custom native submenu trigger' }),
      ).to.have.property('tagName', 'BUTTON');
      expect(
        error.mock.calls.some(([message]) => String(message).includes('nativeButton')),
      ).to.equal(false);
    } finally {
      error.mockRestore();
    }
  });

  it('does not pass internal props to host paper and list slots', async () => {
    const { user } = render(
      <Menu2
        sx={{ minWidth: 120 }}
        slots={{ paper: 'div', list: 'div' }}
        slotProps={{
          paper: {
            'data-testid': 'paper',
            classes: { root: 'paper-root' },
            component: 'section',
            elevation: 4,
          },
          list: {
            'data-testid': 'list',
            classes: { root: 'list-root' },
            component: 'ul',
            disablePadding: false,
            sx: { color: 'red' },
          },
        }}
        trigger={<Button disableRipple>Options</Button>}
      >
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const paper = await screen.findByTestId('paper');
    expect(paper).not.to.have.attribute('classes');
    expect(paper).not.to.have.attribute('component');
    expect(paper).not.to.have.attribute('elevation');
    expect(paper).not.to.have.attribute('sx');

    const list = screen.getByTestId('list');
    expect(list).not.to.have.attribute('classes');
    expect(list).not.to.have.attribute('component');
    expect(list).not.to.have.attribute('disablePadding');
    expect(list).not.to.have.attribute('disablepadding');
    expect(list).not.to.have.attribute('sx');
  });

  it('defaults the popup surface elevation to 8', async () => {
    const { user } = render(
      <Menu2
        slotProps={{ paper: { 'data-testid': 'paper' } }}
        trigger={<Button disableRipple>Options</Button>}
      >
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByTestId('paper')).to.have.class(paperClasses.elevation8);
  });

  it('forwards a custom elevation to the popup surface', async () => {
    const { user } = render(
      <Menu2
        elevation={4}
        slotProps={{ paper: { 'data-testid': 'paper' } }}
        trigger={<Button disableRipple>Options</Button>}
      >
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByTestId('paper')).to.have.class(paperClasses.elevation4);
  });

  it.skipIf(isJsdom())('animates the popup surface by default', async () => {
    const { user } = render(
      <Menu2 trigger={<Button disableRipple>Options</Button>}>
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    const popup = await screen.findByRole('menu');

    // Assert the emitted rule rather than the computed style: the test runner
    // emulates `prefers-reduced-motion`, under which the default deliberately
    // resolves to `transition: none`.
    const emitted = Array.from(document.styleSheets)
      .flatMap((sheet) => {
        try {
          return Array.from(sheet.cssRules);
        } catch {
          return [];
        }
      })
      .map((rule) => rule.cssText)
      .join('\n');

    expect(emitted).to.contain('scale(0.75, 0.5625)');
    expect(emitted).to.contain('data-starting-style');
    expect(emitted).to.contain('prefers-reduced-motion');
    expect(popup).to.have.class(menu2PopupClasses.root);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Base UI suppresses the transition for the frame in which it applies the
      // starting style, so this settles a tick after the popup appears.
      await waitFor(() => {
        const { transitionProperty } = window.getComputedStyle(popup);
        expect(transitionProperty).to.contain('opacity');
        expect(transitionProperty).to.contain('transform');
      });
    }
  });

  it.skipIf(isJsdom())(
    'emits forced-colors rules for items under the contrast enhancer',
    async () => {
      const { user } = render(
        <ThemeProvider theme={enhanceHighContrast(createTheme())}>
          <Menu2 trigger={<Button disableRipple>Options</Button>}>
            <Menu2Item>Profile</Menu2Item>
            <Menu2CheckboxItem defaultChecked>Bookmarks</Menu2CheckboxItem>
            <Menu2Submenu trigger={<Menu2Item>View</Menu2Item>}>
              <Menu2Item>Zoom in</Menu2Item>
            </Menu2Submenu>
          </Menu2>
        </ThemeProvider>,
      );

      await user.click(screen.getByRole('button', { name: 'Options' }));
      await screen.findByRole('menu');

      // The rules only apply in forced colors, which the runner cannot emulate;
      // assert that the enhancer's overrides reach the stylesheet at all.
      // Look inside the forced-colors media rules specifically: the class names
      // and the media query itself are both emitted without the enhancer, so
      // matching on the whole stylesheet would pass with the overrides removed.
      const menu2ForcedColorsRules = Array.from(document.styleSheets)
        .flatMap((sheet) => {
          try {
            return Array.from(sheet.cssRules);
          } catch {
            return [];
          }
        })
        .filter((rule) => (rule as CSSMediaRule).conditionText?.includes('forced-colors'))
        .flatMap((rule) => Array.from((rule as CSSMediaRule).cssRules ?? []))
        .map((rule) => rule.cssText)
        .filter((text) => text.includes('MuiMenu2'));

      // The CSSOM lowercases system colour keywords.
      expect(menu2ForcedColorsRules.join('\n').toLowerCase()).to.contain('highlighttext');
      const matches = (needle: string) =>
        menu2ForcedColorsRules.some((text) => text.includes(needle));
      expect(matches(menu2ItemClasses.highlighted)).to.equal(true);
      expect(matches(menu2CheckboxItemClasses.highlighted)).to.equal(true);
      expect(matches(menu2SubmenuTriggerClasses.open)).to.equal(true);
      expect(matches(menu2CheckboxItemIndicatorClasses.root)).to.equal(true);
      // The indicator's own `[data-checked]` colour is (0,2,0). The override has
      // to carry the same attribute, or a checked indicator keeps the MUI blue
      // in forced colors instead of the system colour.
      expect(
        menu2ForcedColorsRules.some(
          (text) =>
            text.includes(menu2CheckboxItemIndicatorClasses.root) &&
            text.includes('[data-checked]'),
        ),
      ).to.equal(true);
    },
  );

  it.skipIf(isJsdom())('lets the default animation be overridden', async () => {
    const { user } = render(
      <Menu2
        slotProps={{ popup: { sx: { transition: 'none' } } }}
        trigger={<Button disableRipple>Options</Button>}
      >
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const popup = await screen.findByRole('menu');
    expect(window.getComputedStyle(popup).transitionProperty).to.equal('none');
  });

  it('renders an invisible backdrop that does not swallow clicks', async () => {
    const { user } = render(
      <Menu2
        slotProps={{ backdrop: { 'data-testid': 'backdrop' } }}
        trigger={<Button disableRipple>Options</Button>}
      >
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const backdrop = await screen.findByTestId('backdrop');
    expect(backdrop).to.have.class(menu2PopupClasses.backdrop);
    // Invisible and inert by default, like the classic Menu's backdrop;
    // dismissal stays with Base UI's outside-press listener.
    const { backgroundColor, pointerEvents } = window.getComputedStyle(backdrop);
    expect(backgroundColor).to.equal('rgba(0, 0, 0, 0)');
    expect(pointerEvents).to.equal('none');
  });

  it('supports dimming through the backdrop slot', async () => {
    const { user } = render(
      <Menu2
        slotProps={{
          backdrop: { 'data-testid': 'backdrop', sx: { backgroundColor: 'rgb(0, 0, 0)' } },
        }}
        trigger={<Button disableRipple>Options</Button>}
      >
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const backdrop = await screen.findByTestId('backdrop');
    expect(window.getComputedStyle(backdrop).backgroundColor).to.equal('rgb(0, 0, 0)');
  });

  it.skipIf(isJsdom())('constrains the popup surface to the collision-aware height', async () => {
    const { user } = render(
      <Menu2
        slotProps={{ paper: { 'data-testid': 'paper' } }}
        trigger={<Button disableRipple>Options</Button>}
      >
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const paper = await screen.findByTestId('paper');
    const { maxHeight, overflowY } = window.getComputedStyle(paper);
    // Regression: the classic `calc(100% - 96px)` resolved against the
    // content-sized popup instead of the viewport and clipped the end of the
    // menu (separators and trailing items).
    expect(maxHeight).not.to.equal('calc(100% - 96px)');
    expect(maxHeight).not.to.equal('none');
    expect(overflowY).to.equal('auto');
  });

  it('supports controlled open state and Base UI cancellation details', async () => {
    const handleOpenChange = spy((open: boolean, eventDetails: any) => {
      expect(open).to.equal(true);
      expect(eventDetails.reason).to.equal('trigger-press');
      eventDetails.cancel();
      expect(eventDetails.isCanceled).to.equal(true);
    });

    const { user } = render(
      <Menu2 onOpenChange={handleOpenChange} trigger={<Button disableRipple>Options</Button>}>
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    await waitFor(() => {
      expect(handleOpenChange.callCount).to.equal(1);
    });
    expect(screen.queryByRole('menu')).to.equal(null);
  });

  it('does not open when the root is disabled', async () => {
    render(
      <Menu2 disabled trigger={<Button disableRipple>Options</Button>}>
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    expect(screen.getByRole('button', { name: 'Options' })).to.have.attribute('disabled');
    expect(screen.queryByRole('menu')).to.equal(null);
  });

  it('supports defaultOpen', () => {
    render(
      <Menu2 defaultOpen trigger={<Button disableRipple>Options</Button>}>
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  it('supports keepMounted', () => {
    render(
      <Menu2 keepMounted trigger={<Button disableRipple>Options</Button>}>
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    expect(screen.getByText('Profile')).not.to.equal(null);
    expect(screen.getByRole('button', { name: 'Options' })).to.have.attribute(
      'aria-expanded',
      'false',
    );
  });

  it('supports finalFocus', async () => {
    const finalFocusRef = React.createRef<HTMLButtonElement>();
    const { user } = render(
      <React.Fragment>
        <button ref={finalFocusRef} type="button">
          Final target
        </button>
        <Menu2 finalFocus={finalFocusRef} trigger={<Button disableRipple>Options</Button>}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2>
      </React.Fragment>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Profile' }));

    await waitFor(() => {
      expect(document.activeElement).to.equal(finalFocusRef.current);
    });
  });

  it('returns focus to the trigger on Escape and closes on outside press', async () => {
    const { user } = render(
      <React.Fragment>
        <button type="button">Outside</button>
        <Menu2 trigger={<Button disableRipple>Options</Button>}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2>
      </React.Fragment>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    await user.click(trigger);
    await screen.findByRole('menu');

    await user.keyboard('[Escape]');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).to.equal(null);
    });
    expect(document.activeElement).to.equal(trigger);

    await user.click(trigger);
    await screen.findByRole('menu');
    await user.click(screen.getByRole('button', { name: 'Outside' }));

    await waitFor(() => {
      expect(screen.queryByRole('menu')).to.equal(null);
    });
  });

  it('supports touch trigger interactions', async () => {
    const { user } = render(
      <Menu2 trigger={<Button disableRipple>Options</Button>}>
        <Menu2Item>Profile</Menu2Item>
      </Menu2>,
    );

    await user.pointer({
      keys: '[TouchA]',
      target: screen.getByRole('button', { name: 'Options' }),
    });

    expect(await screen.findByRole('menu')).not.to.equal(null);
  });

  it('supports modal backdrop behavior', async () => {
    const { user } = render(
      <React.Fragment>
        <Menu2
          modal
          slotProps={{ positioner: { 'data-testid': 'modal-positioner' } }}
          trigger={<Button disableRipple>Modal menu</Button>}
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2>
        <Menu2
          modal={false}
          slotProps={{ positioner: { 'data-testid': 'non-modal-positioner' } }}
          trigger={<Button disableRipple>Non-modal menu</Button>}
        >
          <Menu2Item>Settings</Menu2Item>
        </Menu2>
      </React.Fragment>,
    );

    await user.click(screen.getByRole('button', { name: 'Modal menu' }));
    await screen.findByRole('menu');
    expect(screen.getByTestId('modal-positioner').previousElementSibling).to.have.attribute(
      'role',
      'presentation',
    );

    await user.keyboard('[Escape]');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).to.equal(null);
    });

    await user.click(screen.getByRole('button', { name: 'Non-modal menu' }));
    await screen.findByRole('menu');
    expect(screen.getByTestId('non-modal-positioner').previousElementSibling).to.equal(null);
  });

  it('opens in an RTL tree', async () => {
    const { user } = render(
      <div dir="rtl">
        <Menu2 trigger={<Button disableRipple>Options</Button>}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByRole('menu')).not.to.equal(null);
  });

  it.skipIf(isJsdom())('applies Base UI positioning attributes in the browser', async () => {
    const { user } = render(
      <div style={{ padding: 96 }}>
        <Menu2
          side="bottom"
          align="start"
          sideOffset={4}
          slotProps={{ positioner: { 'data-testid': 'positioner' } }}
          trigger={<Button disableRipple>Options</Button>}
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const positioner = await screen.findByTestId('positioner');
    expect(positioner).to.have.attribute('data-side', 'bottom');
    expect(positioner).to.have.attribute('data-align', 'start');
    expect(positioner.style.transform).not.to.equal('');
  });

  it('supports checkbox and radio item state', async () => {
    const handleCheckboxChange = spy((event: Event, checked: boolean, eventDetails: any) => {
      expect(event).to.be.instanceOf(Event);
      expect(checked).to.equal(true);
      expect(eventDetails.reason).to.equal('item-press');
    });
    const handleRadioChange = spy((event: Event, value: string, eventDetails: any) => {
      expect(event).to.be.instanceOf(Event);
      expect(value).to.equal('large');
      expect(eventDetails.reason).to.equal('item-press');
    });

    const { user } = render(
      <Menu2 trigger={<Button disableRipple>Options</Button>}>
        <Menu2CheckboxItem onChange={handleCheckboxChange}>Show hidden files</Menu2CheckboxItem>
        <Menu2RadioGroup defaultValue="small" onChange={handleRadioChange}>
          <Menu2RadioItem value="small">Small</Menu2RadioItem>
          <Menu2RadioItem value="large">Large</Menu2RadioItem>
        </Menu2RadioGroup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const checkbox = await screen.findByRole('menuitemcheckbox', { name: /show hidden files/i });
    expect(checkbox).to.have.attribute('aria-checked', 'false');

    await user.click(checkbox);

    expect(checkbox).to.have.attribute('aria-checked', 'true');
    expect(checkbox).to.have.class(menu2CheckboxItemClasses.checked);
    expect(handleCheckboxChange.callCount).to.equal(1);

    expect(screen.getByRole('menuitemradio', { name: /small/i })).to.have.attribute(
      'aria-checked',
      'true',
    );
    expect(screen.getByRole('menuitemradio', { name: /large/i })).to.have.attribute(
      'aria-checked',
      'false',
    );

    await user.click(screen.getByRole('menuitemradio', { name: /large/i }));

    expect(screen.getByRole('menuitemradio', { name: /large/i })).to.have.attribute(
      'aria-checked',
      'true',
    );
    expect(handleRadioChange.callCount).to.equal(1);
  });

  it.skipIf(isJsdom())('gives the items a ripple, and disableRipple turns it off', async () => {
    const { user } = render(
      <Menu2 defaultOpen trigger={<Button disableRipple>Options</Button>}>
        <Menu2Item closeOnClick={false}>Profile</Menu2Item>
        <Menu2Item closeOnClick={false} disableRipple>
          No ripple
        </Menu2Item>
      </Menu2>,
    );

    const withRipple = await screen.findByRole('menuitem', { name: 'Profile' });
    const withoutRipple = screen.getByRole('menuitem', { name: 'No ripple' });

    // The items keep their element; ButtonBase renders a <button> by default.
    expect(withRipple.tagName).to.equal('DIV');

    // ButtonBase mounts the ripple lazily, on the first interaction.
    await user.pointer({ keys: '[MouseLeft>]', target: withRipple });
    await waitFor(() => {
      expect(withRipple.querySelectorAll('.MuiTouchRipple-ripple').length).to.be.greaterThan(0);
    });
    await user.pointer({ keys: '[/MouseLeft]', target: withRipple });

    await user.pointer({ keys: '[MouseLeft>]', target: withoutRipple });
    expect(withoutRipple.querySelector('.MuiTouchRipple-root')).to.equal(null);
    await user.pointer({ keys: '[/MouseLeft]', target: withoutRipple });
  });

  it('renders the Checkbox and Radio icons for each indicator state', () => {
    render(
      <Menu2 open trigger={<Button disableRipple>Options</Button>}>
        <Menu2CheckboxItem slotProps={{ indicator: { 'data-testid': 'unchecked-checkbox' } }}>
          Show hidden files
        </Menu2CheckboxItem>
        <Menu2CheckboxItem
          defaultChecked
          slotProps={{ indicator: { 'data-testid': 'checked-checkbox' } }}
        >
          Show the sidebar
        </Menu2CheckboxItem>
        <Menu2RadioGroup defaultValue="small">
          <Menu2RadioItem
            value="small"
            slotProps={{ indicator: { 'data-testid': 'checked-radio' } }}
          >
            Small
          </Menu2RadioItem>
          <Menu2RadioItem
            value="large"
            slotProps={{ indicator: { 'data-testid': 'unchecked-radio' } }}
          >
            Large
          </Menu2RadioItem>
        </Menu2RadioGroup>
      </Menu2>,
    );

    // The checkbox swaps the icon the way the real Checkbox does: an outlined
    // empty box, then the filled box with the check.
    const uncheckedCheckbox = screen.getByTestId('unchecked-checkbox');
    expect(uncheckedCheckbox).to.have.attribute('data-unchecked', '');
    expect(
      uncheckedCheckbox.querySelector('[data-testid="CheckBoxOutlineBlankIcon"]'),
    ).not.to.equal(null);
    expect(uncheckedCheckbox.querySelector('[data-testid="CheckBoxIcon"]')).to.equal(null);

    const checkedCheckbox = screen.getByTestId('checked-checkbox');
    expect(checkedCheckbox).to.have.attribute('data-checked', '');
    expect(checkedCheckbox.querySelector('[data-testid="CheckBoxIcon"]')).not.to.equal(null);
    expect(checkedCheckbox.querySelector('[data-testid="CheckBoxOutlineBlankIcon"]')).to.equal(
      null,
    );

    // The radio keeps both layers of `RadioButtonIcon` mounted, so the dot can
    // animate; only the scale changes with the state.
    const checkedRadio = screen.getByTestId('checked-radio');
    const uncheckedRadio = screen.getByTestId('unchecked-radio');
    expect(checkedRadio).to.have.attribute('data-checked', '');
    expect(uncheckedRadio).to.have.attribute('data-unchecked', '');

    [checkedRadio, uncheckedRadio].forEach((indicator) => {
      expect(indicator.querySelector('[data-testid="RadioButtonUncheckedIcon"]')).not.to.equal(
        null,
      );
      expect(indicator.querySelector('[data-testid="RadioButtonCheckedIcon"]')).not.to.equal(null);
    });

    // A real browser reports the transform as a matrix, jsdom as written.
    const getScale = (element: Element) => {
      const { transform } = window.getComputedStyle(element);
      return Number(/^(?:matrix|scale)\(([^,)]+)/.exec(transform)?.[1]);
    };
    const checkedDot = checkedRadio.querySelector('[data-testid="RadioButtonCheckedIcon"]')!;
    const uncheckedDot = uncheckedRadio.querySelector('[data-testid="RadioButtonCheckedIcon"]')!;
    expect(getScale(checkedDot)).to.equal(1);
    expect(getScale(uncheckedDot)).to.equal(0);
  });

  it('supports groups, labels, separators, link items, and submenus', async () => {
    const { user } = render(
      <Menu2 trigger={<Button disableRipple>Options</Button>}>
        <Menu2Group>
          <Menu2GroupLabel>Account</Menu2GroupLabel>
          <Menu2LinkItem href="/profile">Profile</Menu2LinkItem>
        </Menu2Group>
        <Menu2Separator />
        <Menu2Submenu defaultOpen trigger={<Menu2Item>More</Menu2Item>}>
          <Menu2Item>Archive</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByText('Account')).not.to.equal(null);
    expect(screen.getByRole('separator')).not.to.equal(null);
    expect(screen.getByRole('menuitem', { name: 'Profile' })).to.have.attribute('href', '/profile');
    expect(screen.getByRole('menuitem', { name: 'More' })).to.not.equal(null);
    expect(screen.getByRole('menuitem', { name: 'Archive' })).to.not.equal(null);
  });

  it.skipIf(isJsdom())(
    'restores focus to finalFocus when a detached context menu closes',
    async () => {
      function ContextMenuHarness() {
        const [anchor, setAnchor] = React.useState<{ getBoundingClientRect: () => DOMRect } | null>(
          null,
        );
        const areaRef = React.useRef<HTMLDivElement | null>(null);

        return (
          <div
            ref={areaRef}
            tabIndex={-1}
            data-testid="context-area"
            onContextMenu={(event) => {
              event.preventDefault();
              const { clientX, clientY } = event;
              setAnchor({
                getBoundingClientRect: () =>
                  DOMRect.fromRect({ x: clientX, y: clientY, width: 0, height: 0 }),
              });
            }}
          >
            Context area
            <Menu2
              open={anchor !== null}
              onOpenChange={(nextOpen) => {
                if (!nextOpen) {
                  setAnchor(null);
                }
              }}
              anchor={anchor ?? undefined}
              positionMethod="fixed"
              finalFocus={areaRef}
            >
              <Menu2Item>Copy</Menu2Item>
            </Menu2>
          </div>
        );
      }

      const { user } = render(
        <React.Fragment>
          <Menu2 trigger={<Button disableRipple>Other menu</Button>}>
            <Menu2Item>Other item</Menu2Item>
          </Menu2>
          <ContextMenuHarness />
        </React.Fragment>,
      );

      // Seed Base UI's internal previously-focused record with an unrelated
      // trigger by opening and closing that menu first.
      const otherTrigger = screen.getByRole('button', { name: 'Other menu' });
      await user.click(otherTrigger);
      await screen.findByRole('menuitem', { name: 'Other item' });
      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(otherTrigger).toHaveFocus();
      });

      // A detached menu has no trigger; without finalFocus, closing it restores
      // focus to that stale record instead of the invoked surface.
      const area = screen.getByTestId('context-area');
      fireEvent.contextMenu(area, { clientX: 100, clientY: 100 });
      await screen.findByRole('menuitem', { name: 'Copy' });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(area).toHaveFocus();
      });
    },
  );

  it.skipIf(isJsdom())('supports inset list text composed inside items', async () => {
    const { user } = render(
      <Menu2 trigger={<Button disableRipple>Options</Button>}>
        <Menu2Item>
          <ListItemIcon data-testid="icon">i</ListItemIcon>
          <ListItemText>Cut</ListItemText>
        </Menu2Item>
        <Menu2Item>
          <ListItemText inset data-testid="inset-text">
            Paste
          </ListItemText>
        </Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    // `inset` is a ListItemText prop, not an item prop: the shared item styles
    // align it with the icon column so icon-less items line up.
    const insetText = await screen.findByTestId('inset-text');
    expect(window.getComputedStyle(insetText).paddingLeft).to.equal('36px');
    expect(window.getComputedStyle(screen.getByTestId('icon')).minWidth).to.equal('36px');
  });

  it.skipIf(isJsdom())('keeps separator spacing stable while a submenu is open', async () => {
    const { user } = render(
      <Menu2 trigger={<Button disableRipple>Options</Button>}>
        <Menu2Submenu defaultOpen trigger={<Menu2Item>View</Menu2Item>}>
          <Menu2Item>Zoom</Menu2Item>
        </Menu2Submenu>
        <Menu2Separator />
        <Menu2Item>After</Menu2Item>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    await screen.findByRole('menuitem', { name: 'Zoom' });

    const separator = screen.getByRole('separator');
    const { marginTop, marginBottom } = window.getComputedStyle(separator);
    // Regression: the inline focus-guard nodes of an open submenu broke the
    // legacy `[item] + divider` adjacency rule and collapsed this spacing.
    expect(marginTop).to.equal('8px');
    expect(marginBottom).to.equal('8px');
  });

  it('supports Material UI Tooltip on enabled item flavors', async () => {
    const { user } = render(
      <Menu2 open trigger={<Button disableRipple>Options</Button>}>
        <Tooltip title="Create a blank document" describeChild enterDelay={0} leaveDelay={0}>
          <Menu2Item>New document</Menu2Item>
        </Tooltip>
        <Tooltip title="Toggle comments" describeChild enterDelay={0} leaveDelay={0}>
          <Menu2CheckboxItem>Comments</Menu2CheckboxItem>
        </Tooltip>
        <Menu2RadioGroup defaultValue="fit">
          <Tooltip title="Fit to viewport" describeChild enterDelay={0} leaveDelay={0}>
            <Menu2RadioItem value="fit">Fit</Menu2RadioItem>
          </Tooltip>
        </Menu2RadioGroup>
      </Menu2>,
    );

    await expectTooltipOnHover(
      user,
      screen.getByRole('menuitem', { name: 'New document' }),
      'Create a blank document',
    );
    await expectTooltipOnHover(
      user,
      screen.getByRole('menuitemcheckbox', { name: 'Comments' }),
      'Toggle comments',
    );
    await expectTooltipOnHover(
      user,
      screen.getByRole('menuitemradio', { name: 'Fit' }),
      'Fit to viewport',
    );
  });

  it('can close a controlled Material UI Tooltip when a submenu trigger opens', async () => {
    interface TooltipChildProps {
      onClickCapture?: React.MouseEventHandler<HTMLElement>;
    }

    // A wrapper used as a trigger must forward the trigger's props and ref to
    // its child, the way Material UI's own Tooltip does.
    const ClickClosingTooltip = React.forwardRef<
      HTMLElement,
      { title: string; children: React.ReactElement<TooltipChildProps> } & Record<string, any>
    >(function ClickClosingTooltip(props, ref) {
      const { title, children, ...forwarded } = props;
      const [open, setOpen] = React.useState(false);

      const child = React.cloneElement(children, {
        ...forwarded,
        ref,
        onClickCapture: (event: React.MouseEvent<HTMLElement>) => {
          setOpen(false);
          children.props.onClickCapture?.(event);
        },
      });

      return (
        <Tooltip
          title={title}
          describeChild
          enterDelay={0}
          leaveDelay={0}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          {child}
        </Tooltip>
      );
    });

    const { user } = render(
      <Menu2 open trigger={<Button disableRipple>Options</Button>}>
        <Menu2Submenu
          trigger={
            <ClickClosingTooltip title="Open view settings">
              <Menu2Item>View options</Menu2Item>
            </ClickClosingTooltip>
          }
          slotProps={{ trigger: { openOnHover: false } }}
        >
          <Menu2Item>Comments</Menu2Item>
        </Menu2Submenu>
      </Menu2>,
    );

    const submenuTrigger = screen.getByRole('menuitem', { name: 'View options' });

    await user.hover(submenuTrigger);
    expect(await screen.findByRole('tooltip')).to.have.text('Open view settings');

    await user.click(submenuTrigger);

    expect(await screen.findByRole('menuitem', { name: 'Comments' })).not.to.equal(null);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });
  });

  it('supports Material UI Tooltip on disabled items through a non-disabled wrapper', async () => {
    const { user } = render(
      <Menu2 defaultOpen trigger={<Button disableRipple>Options</Button>}>
        <Tooltip title="Unavailable while offline" describeChild enterDelay={0} leaveDelay={0}>
          <span data-testid="disabled-item-tooltip-target">
            <Menu2Item disabled>Import from Drive</Menu2Item>
          </span>
        </Tooltip>
      </Menu2>,
    );

    expect(screen.getByRole('menuitem', { name: 'Import from Drive' })).to.have.attribute(
      'aria-disabled',
      'true',
    );
    await expectTooltipOnHover(
      user,
      screen.getByTestId('disabled-item-tooltip-target'),
      'Unavailable while offline',
    );
  });

  it('does not warn when a submenu trigger is disabled', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      const { user } = render(
        <Menu2 trigger={<Button disableRipple>Options</Button>}>
          <Menu2Submenu disabled trigger={<Menu2Item>Add-ons unavailable</Menu2Item>}>
            <Menu2Item>Marketplace</Menu2Item>
          </Menu2Submenu>
        </Menu2>,
      );

      await user.click(screen.getByRole('button', { name: 'Options' }));

      const submenuTrigger = await screen.findByRole('menuitem', {
        name: 'Add-ons unavailable',
      });
      expect(submenuTrigger).to.have.attribute('aria-disabled', 'true');
      expect(
        warn.mock.calls.some(([message]) =>
          String(message).includes('A disabled element was detected on <Menu.SubmenuTrigger>'),
        ),
      ).to.equal(false);
    } finally {
      warn.mockRestore();
    }
  });
});
