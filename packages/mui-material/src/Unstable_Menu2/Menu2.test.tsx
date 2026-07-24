import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { listClasses } from '@mui/material/List';
import { paperClasses } from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem, {
  menu2CheckboxItemClasses,
} from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2CheckboxItemIndicator from '@mui/material/Unstable_Menu2CheckboxItemIndicator';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item, { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2Popup, { menu2PopupClasses } from '@mui/material/Unstable_Menu2Popup';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2RadioItemIndicator from '@mui/material/Unstable_Menu2RadioItemIndicator';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2SubmenuRoot from '@mui/material/Unstable_Menu2SubmenuRoot';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import Menu2Trigger, { menu2TriggerClasses } from '@mui/material/Unstable_Menu2Trigger';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
      <Menu2>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup slotProps={{ paper: { 'data-testid': 'paper' } }}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
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

  it('does not render the trigger as a link when href is passed by a JS caller', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger {...({ href: '/profile' } as any)}>Options</Menu2Trigger>
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger.tagName).to.equal('BUTTON');
    expect(trigger).not.to.have.attribute('href');

    await user.click(trigger);

    expect(await screen.findByRole('menu')).not.to.equal(null);
  });

  it('supports component props, slotProps, classes, styleOverrides, and variants', async () => {
    const theme = createTheme({
      components: {
        MuiMenu2Trigger: {
          defaultProps: {
            variant: 'outlined',
          },
        },
        MuiMenu2Popup: {
          styleOverrides: {
            paper: {
              minWidth: 128,
            },
          },
          variants: [
            {
              props: { align: 'start' },
              style: {
                '--Menu2Popup-variant': '"applied"',
              },
            },
          ],
        },
        MuiMenu2Item: {
          variants: [
            {
              props: { selected: true },
              style: {
                fontWeight: 700,
              },
            },
            {
              props: { disabled: true },
              style: {
                '--Menu2Item-disabledVariant': '"applied"',
              },
            },
          ],
        },
        MuiMenu2CheckboxItem: {
          variants: [
            {
              props: { checked: true },
              style: {
                '--Menu2CheckboxItem-checkedVariant': '"applied"',
              },
            },
          ],
        },
        MuiMenu2RadioItem: {
          variants: [
            {
              props: { value: 'small' },
              style: {
                '--Menu2RadioItem-valueVariant': '"applied"',
              },
            },
          ],
        },
        MuiMenu2LinkItem: {
          variants: [
            {
              props: { href: '/profile' },
              style: {
                '--Menu2LinkItem-hrefVariant': '"applied"',
              },
            },
          ],
        },
      },
    });

    const { user } = render(
      <ThemeProvider theme={theme}>
        <Menu2>
          <Menu2Trigger classes={{ root: 'custom-trigger' }}>Options</Menu2Trigger>
          <Menu2Popup
            classes={{ paper: 'custom-paper', list: 'custom-list' }}
            slotProps={{ list: { 'data-testid': 'list' } }}
          >
            <Menu2Item selected classes={{ root: 'custom-item' }}>
              Profile
            </Menu2Item>
            <Menu2Item disabled>Disabled profile</Menu2Item>
            <Menu2CheckboxItem checked>Checked profile</Menu2CheckboxItem>
            <Menu2RadioGroup value="small">
              <Menu2RadioItem value="small">Small</Menu2RadioItem>
            </Menu2RadioGroup>
            <Menu2LinkItem href="/profile">Link profile</Menu2LinkItem>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(screen.getByRole('button', { name: 'Options' })).to.have.class('custom-trigger');
    expect(await screen.findByTestId('list')).to.have.class('custom-list');
    expect(
      window.getComputedStyle(screen.getByRole('menu')).getPropertyValue('--Menu2Popup-variant'),
    ).to.equal('"applied"');
    expect(await screen.findByRole('menuitem', { name: 'Profile' })).to.have.class('custom-item');
    expect(screen.getByRole('menuitem', { name: 'Profile' })).to.have.class(
      menu2ItemClasses.selected,
    );
    expect(screen.getByRole('menuitem', { name: 'Disabled profile' })).to.have.class(
      menu2ItemClasses.disabled,
    );
    expect(
      window
        .getComputedStyle(screen.getByRole('menuitem', { name: 'Disabled profile' }))
        .getPropertyValue('--Menu2Item-disabledVariant'),
    ).to.equal('"applied"');
    expect(screen.getByRole('menuitemcheckbox', { name: 'Checked profile' })).to.have.class(
      menu2CheckboxItemClasses.checked,
    );
    expect(
      window
        .getComputedStyle(screen.getByRole('menuitemcheckbox', { name: 'Checked profile' }))
        .getPropertyValue('--Menu2CheckboxItem-checkedVariant'),
    ).to.equal('"applied"');
    expect(
      window
        .getComputedStyle(screen.getByRole('menuitemradio', { name: 'Small' }))
        .getPropertyValue('--Menu2RadioItem-valueVariant'),
    ).to.equal('"applied"');
    expect(
      window
        .getComputedStyle(screen.getByRole('menuitem', { name: 'Link profile' }))
        .getPropertyValue('--Menu2LinkItem-hrefVariant'),
    ).to.equal('"applied"');
  });

  it('composes popup class names', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup
          className="popup-open"
          slotProps={{
            popup: {
              className: 'popup-side-bottom',
            },
          }}
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const menu = await screen.findByRole('menu');
    expect(menu).to.have.class('popup-open');
    expect(menu).to.have.class('popup-side-bottom');
    expect(menu).to.have.class(menu2PopupClasses.root);
  });

  it('does not pass ownerState to host popup slots', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup slots={{ popup: 'div' }} slotProps={{ popup: { 'data-testid': 'popup' } }}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByTestId('popup')).not.to.have.attribute('ownerState');
  });

  it('derives native button behavior from host root slots', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      const { user } = render(
        <Menu2>
          <Menu2Trigger slots={{ root: 'div' }}>Options</Menu2Trigger>
          <Menu2Popup>
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
            <Menu2SubmenuRoot>
              <Menu2SubmenuTrigger slots={{ root: 'button' }}>
                Native submenu trigger
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2SubmenuRoot>
          </Menu2Popup>
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
        <Menu2>
          <Menu2Trigger nativeButton={false} slots={{ root: CustomDivRoot }}>
            Options
          </Menu2Trigger>
          <Menu2Popup>
            <Menu2Item closeOnClick={false} nativeButton slots={{ root: CustomButtonRoot }}>
              Custom native item
            </Menu2Item>
            <Menu2SubmenuRoot>
              <Menu2SubmenuTrigger nativeButton slots={{ root: CustomButtonRoot }}>
                Custom native submenu trigger
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2SubmenuRoot>
          </Menu2Popup>
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
      <Menu2>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup
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
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
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
      <Menu2>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup slotProps={{ paper: { 'data-testid': 'paper' } }}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByTestId('paper')).to.have.class(paperClasses.elevation8);
  });

  it('forwards a custom elevation to the popup surface', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup elevation={4} slotProps={{ paper: { 'data-testid': 'paper' } }}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByTestId('paper')).to.have.class(paperClasses.elevation4);
  });

  it.skipIf(isJsdom())('constrains the popup surface to the collision-aware height', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup slotProps={{ paper: { 'data-testid': 'paper' } }}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
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
      <Menu2 onOpenChange={handleOpenChange}>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
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
      <Menu2 disabled>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    expect(screen.getByRole('button', { name: 'Options' })).to.have.attribute('disabled');
    expect(screen.queryByRole('menu')).to.equal(null);
  });

  it('supports defaultOpen', () => {
    render(
      <Menu2 defaultOpen>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  it('supports keepMounted', () => {
    render(
      <Menu2>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup keepMounted>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
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
        <Menu2>
          <Menu2Trigger>Options</Menu2Trigger>
          <Menu2Popup finalFocus={finalFocusRef}>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
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
        <Menu2>
          <Menu2Trigger>Options</Menu2Trigger>
          <Menu2Popup>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
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
      <Menu2>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
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
        <Menu2 modal>
          <Menu2Trigger>Modal menu</Menu2Trigger>
          <Menu2Popup slotProps={{ positioner: { 'data-testid': 'modal-positioner' } }}>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>
        <Menu2 modal={false}>
          <Menu2Trigger>Non-modal menu</Menu2Trigger>
          <Menu2Popup slotProps={{ positioner: { 'data-testid': 'non-modal-positioner' } }}>
            <Menu2Item>Settings</Menu2Item>
          </Menu2Popup>
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
        <Menu2>
          <Menu2Trigger>Options</Menu2Trigger>
          <Menu2Popup>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByRole('menu')).not.to.equal(null);
  });

  it.skipIf(isJsdom())('applies Base UI positioning attributes in the browser', async () => {
    const { user } = render(
      <div style={{ padding: 96 }}>
        <Menu2>
          <Menu2Trigger>Options</Menu2Trigger>
          <Menu2Popup
            side="bottom"
            align="start"
            sideOffset={4}
            slotProps={{ positioner: { 'data-testid': 'positioner' } }}
          >
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
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
      <Menu2>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup>
          <Menu2CheckboxItem onChange={handleCheckboxChange}>
            <Menu2CheckboxItemIndicator />
            Show hidden files
          </Menu2CheckboxItem>
          <Menu2RadioGroup defaultValue="small" onChange={handleRadioChange}>
            <Menu2RadioItem value="small">
              <Menu2RadioItemIndicator />
              Small
            </Menu2RadioItem>
            <Menu2RadioItem value="large">
              <Menu2RadioItemIndicator />
              Large
            </Menu2RadioItem>
          </Menu2RadioGroup>
        </Menu2Popup>
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

  it('keeps mounted unchecked indicator marks hidden', () => {
    render(
      <Menu2 open>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup>
          <Menu2CheckboxItem>
            <Menu2CheckboxItemIndicator keepMounted data-testid="checkbox-indicator" />
            Show hidden files
          </Menu2CheckboxItem>
          <Menu2RadioGroup defaultValue="small">
            <Menu2RadioItem value="small">
              <Menu2RadioItemIndicator keepMounted data-testid="checked-radio-indicator" />
              Small
            </Menu2RadioItem>
            <Menu2RadioItem value="large">
              <Menu2RadioItemIndicator keepMounted data-testid="unchecked-radio-indicator" />
              Large
            </Menu2RadioItem>
          </Menu2RadioGroup>
        </Menu2Popup>
      </Menu2>,
    );

    const checkboxIndicator = screen.getByTestId('checkbox-indicator');
    const checkboxIcon = checkboxIndicator.querySelector('[data-mui-menu2-indicator-icon]');
    const checkboxMark = checkboxIndicator.querySelector('[data-mui-menu2-indicator-mark]');
    expect(checkboxIndicator).to.have.attribute('data-unchecked', '');
    expect(window.getComputedStyle(checkboxIndicator).visibility).to.equal('visible');
    expect(checkboxIcon).not.to.equal(null);
    expect(window.getComputedStyle(checkboxIcon!).visibility).to.equal('visible');
    expect(checkboxMark).not.to.equal(null);
    expect(window.getComputedStyle(checkboxMark!).visibility).to.equal('hidden');

    const checkedRadioIndicator = screen.getByTestId('checked-radio-indicator');
    const checkedRadioIcon = checkedRadioIndicator.querySelector('[data-mui-menu2-indicator-icon]');
    const checkedRadioMark = checkedRadioIndicator.querySelector('[data-mui-menu2-indicator-mark]');
    expect(checkedRadioIndicator).to.have.attribute('data-checked', '');
    expect(checkedRadioIcon).not.to.equal(null);
    expect(window.getComputedStyle(checkedRadioIcon!).visibility).to.equal('visible');
    expect(checkedRadioMark).not.to.equal(null);
    expect(window.getComputedStyle(checkedRadioMark!).visibility).to.equal('visible');

    const uncheckedRadioIndicator = screen.getByTestId('unchecked-radio-indicator');
    const uncheckedRadioIcon = uncheckedRadioIndicator.querySelector(
      '[data-mui-menu2-indicator-icon]',
    );
    const uncheckedRadioMark = uncheckedRadioIndicator.querySelector(
      '[data-mui-menu2-indicator-mark]',
    );
    expect(uncheckedRadioIndicator).to.have.attribute('data-unchecked', '');
    expect(window.getComputedStyle(uncheckedRadioIndicator).visibility).to.equal('visible');
    expect(uncheckedRadioIcon).not.to.equal(null);
    expect(window.getComputedStyle(uncheckedRadioIcon!).visibility).to.equal('visible');
    expect(uncheckedRadioMark).not.to.equal(null);
    expect(window.getComputedStyle(uncheckedRadioMark!).visibility).to.equal('hidden');
  });

  it('supports groups, labels, separators, link items, and submenus', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup>
          <Menu2Group>
            <Menu2GroupLabel>Account</Menu2GroupLabel>
            <Menu2LinkItem href="/profile">Profile</Menu2LinkItem>
          </Menu2Group>
          <Menu2Separator />
          <Menu2SubmenuRoot defaultOpen>
            <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Archive</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2SubmenuRoot>
        </Menu2Popup>
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
            >
              <Menu2Popup anchor={anchor ?? undefined} positionMethod="fixed" finalFocus={areaRef}>
                <Menu2Item>Copy</Menu2Item>
              </Menu2Popup>
            </Menu2>
          </div>
        );
      }

      const { user } = render(
        <React.Fragment>
          <Menu2>
            <Menu2Trigger>Other menu</Menu2Trigger>
            <Menu2Popup>
              <Menu2Item>Other item</Menu2Item>
            </Menu2Popup>
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

  it.skipIf(isJsdom())('keeps separator spacing stable while a submenu is open', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup>
          <Menu2SubmenuRoot defaultOpen>
            <Menu2SubmenuTrigger>View</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Zoom</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2SubmenuRoot>
          <Menu2Separator />
          <Menu2Item>After</Menu2Item>
        </Menu2Popup>
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
      <Menu2 open>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup>
          <Tooltip title="Create a blank document" describeChild enterDelay={0} leaveDelay={0}>
            <Menu2Item>New document</Menu2Item>
          </Tooltip>
          <Tooltip title="Toggle comments" describeChild enterDelay={0} leaveDelay={0}>
            <Menu2CheckboxItem>
              <Menu2CheckboxItemIndicator />
              Comments
            </Menu2CheckboxItem>
          </Tooltip>
          <Menu2RadioGroup defaultValue="fit">
            <Tooltip title="Fit to viewport" describeChild enterDelay={0} leaveDelay={0}>
              <Menu2RadioItem value="fit">
                <Menu2RadioItemIndicator />
                Fit
              </Menu2RadioItem>
            </Tooltip>
          </Menu2RadioGroup>
        </Menu2Popup>
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

    function ClickClosingTooltip(props: {
      title: string;
      children: React.ReactElement<TooltipChildProps>;
    }) {
      const { title, children } = props;
      const [open, setOpen] = React.useState(false);

      const child = React.cloneElement(children, {
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
    }

    const { user } = render(
      <Menu2 open>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup>
          <Menu2SubmenuRoot>
            <ClickClosingTooltip title="Open view settings">
              <Menu2SubmenuTrigger openOnHover={false}>View options</Menu2SubmenuTrigger>
            </ClickClosingTooltip>
            <Menu2SubmenuPopup>
              <Menu2Item>Comments</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2SubmenuRoot>
        </Menu2Popup>
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
      <Menu2 defaultOpen>
        <Menu2Trigger>Options</Menu2Trigger>
        <Menu2Popup>
          <Tooltip title="Unavailable while offline" describeChild enterDelay={0} leaveDelay={0}>
            <span data-testid="disabled-item-tooltip-target">
              <Menu2Item disabled>Import from Drive</Menu2Item>
            </span>
          </Tooltip>
        </Menu2Popup>
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
        <Menu2>
          <Menu2Trigger>Options</Menu2Trigger>
          <Menu2Popup>
            <Menu2SubmenuRoot disabled>
              <Menu2SubmenuTrigger disabled>Add-ons unavailable</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Marketplace</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2SubmenuRoot>
          </Menu2Popup>
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
