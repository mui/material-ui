import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { listClasses } from '@mui/material/List';
import { paperClasses } from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import MenuPreview, {
  MenuPreviewCheckboxItem,
  MenuPreviewCheckboxItemIndicator,
  MenuPreviewGroup,
  MenuPreviewGroupLabel,
  MenuPreviewItem,
  MenuPreviewLinkItem,
  MenuPreviewPopup,
  MenuPreviewRadioGroup,
  MenuPreviewRadioItem,
  MenuPreviewRadioItemIndicator,
  MenuPreviewSeparator,
  MenuPreviewSubmenuPopup,
  MenuPreviewSubmenuRoot,
  MenuPreviewSubmenuTrigger,
  MenuPreviewTrigger,
  menuPreviewCheckboxItemClasses,
  menuPreviewItemClasses,
  menuPreviewPopupClasses,
  menuPreviewTriggerClasses,
} from '@mui/material/MenuPreview';
import { ThemeProvider, createTheme } from '@mui/material/styles';

describe('<MenuPreview />', () => {
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
      <MenuPreview>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup slotProps={{ paper: { 'data-testid': 'paper' } }}>
          <MenuPreviewItem>Profile</MenuPreviewItem>
        </MenuPreviewPopup>
      </MenuPreview>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger).to.have.class(menuPreviewTriggerClasses.root);

    await user.click(trigger);

    const menu = await screen.findByRole('menu');
    expect(menu).to.have.class(menuPreviewPopupClasses.root);
    expect(screen.getByTestId('paper')).to.have.class(menuPreviewPopupClasses.paper);

    const list = screen.getByTestId('paper').querySelector(`.${menuPreviewPopupClasses.list}`);
    expect(list).not.to.equal(null);
    expect(list!.tagName).to.equal('DIV');
    expect(list!).to.have.class(listClasses.padding);

    expect(screen.getByRole('menuitem', { name: 'Profile' })).to.have.class(
      menuPreviewItemClasses.root,
    );
  });

  it('does not render the trigger as a link when href is passed by a JS caller', async () => {
    const { user } = render(
      <MenuPreview>
        <MenuPreviewTrigger {...({ href: '/profile' } as any)}>Options</MenuPreviewTrigger>
        <MenuPreviewPopup>
          <MenuPreviewItem>Profile</MenuPreviewItem>
        </MenuPreviewPopup>
      </MenuPreview>,
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
        MuiMenuPreviewTrigger: {
          defaultProps: {
            variant: 'outlined',
          },
        },
        MuiMenuPreviewPopup: {
          styleOverrides: {
            paper: {
              minWidth: 128,
            },
          },
          variants: [
            {
              props: { align: 'start' },
              style: {
                '--MenuPreviewPopup-variant': '"applied"',
              },
            },
          ],
        },
        MuiMenuPreviewItem: {
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
                '--MenuPreviewItem-disabledVariant': '"applied"',
              },
            },
          ],
        },
        MuiMenuPreviewCheckboxItem: {
          variants: [
            {
              props: { checked: true },
              style: {
                '--MenuPreviewCheckboxItem-checkedVariant': '"applied"',
              },
            },
          ],
        },
        MuiMenuPreviewRadioItem: {
          variants: [
            {
              props: { value: 'small' },
              style: {
                '--MenuPreviewRadioItem-valueVariant': '"applied"',
              },
            },
          ],
        },
        MuiMenuPreviewLinkItem: {
          variants: [
            {
              props: { href: '/profile' },
              style: {
                '--MenuPreviewLinkItem-hrefVariant': '"applied"',
              },
            },
          ],
        },
      },
    });

    const { user } = render(
      <ThemeProvider theme={theme}>
        <MenuPreview>
          <MenuPreviewTrigger classes={{ root: 'custom-trigger' }}>Options</MenuPreviewTrigger>
          <MenuPreviewPopup
            classes={{ paper: 'custom-paper', list: 'custom-list' }}
            slotProps={{ list: { 'data-testid': 'list' } }}
          >
            <MenuPreviewItem selected classes={{ root: 'custom-item' }}>
              Profile
            </MenuPreviewItem>
            <MenuPreviewItem disabled>Disabled profile</MenuPreviewItem>
            <MenuPreviewCheckboxItem checked>Checked profile</MenuPreviewCheckboxItem>
            <MenuPreviewRadioGroup value="small">
              <MenuPreviewRadioItem value="small">Small</MenuPreviewRadioItem>
            </MenuPreviewRadioGroup>
            <MenuPreviewLinkItem href="/profile">Link profile</MenuPreviewLinkItem>
          </MenuPreviewPopup>
        </MenuPreview>
      </ThemeProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(screen.getByRole('button', { name: 'Options' })).to.have.class('custom-trigger');
    expect(await screen.findByTestId('list')).to.have.class('custom-list');
    expect(
      window
        .getComputedStyle(screen.getByRole('menu'))
        .getPropertyValue('--MenuPreviewPopup-variant'),
    ).to.equal('"applied"');
    expect(await screen.findByRole('menuitem', { name: 'Profile' })).to.have.class('custom-item');
    expect(screen.getByRole('menuitem', { name: 'Profile' })).to.have.class(
      menuPreviewItemClasses.selected,
    );
    expect(screen.getByRole('menuitem', { name: 'Disabled profile' })).to.have.class(
      menuPreviewItemClasses.disabled,
    );
    expect(
      window
        .getComputedStyle(screen.getByRole('menuitem', { name: 'Disabled profile' }))
        .getPropertyValue('--MenuPreviewItem-disabledVariant'),
    ).to.equal('"applied"');
    expect(screen.getByRole('menuitemcheckbox', { name: 'Checked profile' })).to.have.class(
      menuPreviewCheckboxItemClasses.checked,
    );
    expect(
      window
        .getComputedStyle(screen.getByRole('menuitemcheckbox', { name: 'Checked profile' }))
        .getPropertyValue('--MenuPreviewCheckboxItem-checkedVariant'),
    ).to.equal('"applied"');
    expect(
      window
        .getComputedStyle(screen.getByRole('menuitemradio', { name: 'Small' }))
        .getPropertyValue('--MenuPreviewRadioItem-valueVariant'),
    ).to.equal('"applied"');
    expect(
      window
        .getComputedStyle(screen.getByRole('menuitem', { name: 'Link profile' }))
        .getPropertyValue('--MenuPreviewLinkItem-hrefVariant'),
    ).to.equal('"applied"');
  });

  it('composes popup class names', async () => {
    const { user } = render(
      <MenuPreview>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup
          className="popup-open"
          slotProps={{
            popup: {
              className: 'popup-side-bottom',
            },
          }}
        >
          <MenuPreviewItem>Profile</MenuPreviewItem>
        </MenuPreviewPopup>
      </MenuPreview>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const menu = await screen.findByRole('menu');
    expect(menu).to.have.class('popup-open');
    expect(menu).to.have.class('popup-side-bottom');
    expect(menu).to.have.class(menuPreviewPopupClasses.root);
  });

  it('does not pass ownerState to host popup slots', async () => {
    const { user } = render(
      <MenuPreview>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup
          slots={{ popup: 'div' }}
          slotProps={{ popup: { 'data-testid': 'popup' } }}
        >
          <MenuPreviewItem>Profile</MenuPreviewItem>
        </MenuPreviewPopup>
      </MenuPreview>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByTestId('popup')).not.to.have.attribute('ownerState');
  });

  it('derives native button behavior from host root slots', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      const { user } = render(
        <MenuPreview>
          <MenuPreviewTrigger slots={{ root: 'div' }}>Options</MenuPreviewTrigger>
          <MenuPreviewPopup>
            <MenuPreviewItem closeOnClick={false} slots={{ root: 'button' }}>
              Native item
            </MenuPreviewItem>
            <MenuPreviewCheckboxItem closeOnClick={false} slots={{ root: 'button' }}>
              Native checkbox
            </MenuPreviewCheckboxItem>
            <MenuPreviewRadioGroup defaultValue="small">
              <MenuPreviewRadioItem closeOnClick={false} slots={{ root: 'button' }} value="large">
                Native radio
              </MenuPreviewRadioItem>
            </MenuPreviewRadioGroup>
            <MenuPreviewSubmenuRoot>
              <MenuPreviewSubmenuTrigger slots={{ root: 'button' }}>
                Native submenu trigger
              </MenuPreviewSubmenuTrigger>
              <MenuPreviewSubmenuPopup>
                <MenuPreviewItem>Nested</MenuPreviewItem>
              </MenuPreviewSubmenuPopup>
            </MenuPreviewSubmenuRoot>
          </MenuPreviewPopup>
        </MenuPreview>,
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
        <MenuPreview>
          <MenuPreviewTrigger nativeButton={false} slots={{ root: CustomDivRoot }}>
            Options
          </MenuPreviewTrigger>
          <MenuPreviewPopup>
            <MenuPreviewItem closeOnClick={false} nativeButton slots={{ root: CustomButtonRoot }}>
              Custom native item
            </MenuPreviewItem>
            <MenuPreviewSubmenuRoot>
              <MenuPreviewSubmenuTrigger nativeButton slots={{ root: CustomButtonRoot }}>
                Custom native submenu trigger
              </MenuPreviewSubmenuTrigger>
              <MenuPreviewSubmenuPopup>
                <MenuPreviewItem>Nested</MenuPreviewItem>
              </MenuPreviewSubmenuPopup>
            </MenuPreviewSubmenuRoot>
          </MenuPreviewPopup>
        </MenuPreview>,
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
      <MenuPreview>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup
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
          <MenuPreviewItem>Profile</MenuPreviewItem>
        </MenuPreviewPopup>
      </MenuPreview>,
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
      <MenuPreview>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup slotProps={{ paper: { 'data-testid': 'paper' } }}>
          <MenuPreviewItem>Profile</MenuPreviewItem>
        </MenuPreviewPopup>
      </MenuPreview>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByTestId('paper')).to.have.class(paperClasses.elevation8);
  });

  it('forwards a custom elevation to the popup surface', async () => {
    const { user } = render(
      <MenuPreview>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup elevation={4} slotProps={{ paper: { 'data-testid': 'paper' } }}>
          <MenuPreviewItem>Profile</MenuPreviewItem>
        </MenuPreviewPopup>
      </MenuPreview>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByTestId('paper')).to.have.class(paperClasses.elevation4);
  });

  it('supports controlled open state and Base UI cancellation details', async () => {
    const handleOpenChange = spy((open: boolean, eventDetails: any) => {
      expect(open).to.equal(true);
      expect(eventDetails.reason).to.equal('trigger-press');
      eventDetails.cancel();
      expect(eventDetails.isCanceled).to.equal(true);
    });

    const { user } = render(
      <MenuPreview onOpenChange={handleOpenChange}>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup>
          <MenuPreviewItem>Profile</MenuPreviewItem>
        </MenuPreviewPopup>
      </MenuPreview>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    await waitFor(() => {
      expect(handleOpenChange.callCount).to.equal(1);
    });
    expect(screen.queryByRole('menu')).to.equal(null);
  });

  it('does not open when the root is disabled', async () => {
    render(
      <MenuPreview disabled>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup>
          <MenuPreviewItem>Profile</MenuPreviewItem>
        </MenuPreviewPopup>
      </MenuPreview>,
    );

    expect(screen.getByRole('button', { name: 'Options' })).to.have.attribute('disabled');
    expect(screen.queryByRole('menu')).to.equal(null);
  });

  it('supports defaultOpen', () => {
    render(
      <MenuPreview defaultOpen>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup>
          <MenuPreviewItem>Profile</MenuPreviewItem>
        </MenuPreviewPopup>
      </MenuPreview>,
    );

    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  it('supports keepMounted', () => {
    render(
      <MenuPreview>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup keepMounted>
          <MenuPreviewItem>Profile</MenuPreviewItem>
        </MenuPreviewPopup>
      </MenuPreview>,
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
        <MenuPreview>
          <MenuPreviewTrigger>Options</MenuPreviewTrigger>
          <MenuPreviewPopup finalFocus={finalFocusRef}>
            <MenuPreviewItem>Profile</MenuPreviewItem>
          </MenuPreviewPopup>
        </MenuPreview>
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
        <MenuPreview>
          <MenuPreviewTrigger>Options</MenuPreviewTrigger>
          <MenuPreviewPopup>
            <MenuPreviewItem>Profile</MenuPreviewItem>
          </MenuPreviewPopup>
        </MenuPreview>
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
      <MenuPreview>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup>
          <MenuPreviewItem>Profile</MenuPreviewItem>
        </MenuPreviewPopup>
      </MenuPreview>,
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
        <MenuPreview modal>
          <MenuPreviewTrigger>Modal menu</MenuPreviewTrigger>
          <MenuPreviewPopup slotProps={{ positioner: { 'data-testid': 'modal-positioner' } }}>
            <MenuPreviewItem>Profile</MenuPreviewItem>
          </MenuPreviewPopup>
        </MenuPreview>
        <MenuPreview modal={false}>
          <MenuPreviewTrigger>Non-modal menu</MenuPreviewTrigger>
          <MenuPreviewPopup slotProps={{ positioner: { 'data-testid': 'non-modal-positioner' } }}>
            <MenuPreviewItem>Settings</MenuPreviewItem>
          </MenuPreviewPopup>
        </MenuPreview>
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
        <MenuPreview>
          <MenuPreviewTrigger>Options</MenuPreviewTrigger>
          <MenuPreviewPopup>
            <MenuPreviewItem>Profile</MenuPreviewItem>
          </MenuPreviewPopup>
        </MenuPreview>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByRole('menu')).not.to.equal(null);
  });

  it.skipIf(isJsdom())('applies Base UI positioning attributes in the browser', async () => {
    const { user } = render(
      <div style={{ padding: 96 }}>
        <MenuPreview>
          <MenuPreviewTrigger>Options</MenuPreviewTrigger>
          <MenuPreviewPopup
            side="bottom"
            align="start"
            sideOffset={4}
            slotProps={{ positioner: { 'data-testid': 'positioner' } }}
          >
            <MenuPreviewItem>Profile</MenuPreviewItem>
          </MenuPreviewPopup>
        </MenuPreview>
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
      <MenuPreview>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup>
          <MenuPreviewCheckboxItem onChange={handleCheckboxChange}>
            <MenuPreviewCheckboxItemIndicator />
            Show hidden files
          </MenuPreviewCheckboxItem>
          <MenuPreviewRadioGroup defaultValue="small" onChange={handleRadioChange}>
            <MenuPreviewRadioItem value="small">
              <MenuPreviewRadioItemIndicator />
              Small
            </MenuPreviewRadioItem>
            <MenuPreviewRadioItem value="large">
              <MenuPreviewRadioItemIndicator />
              Large
            </MenuPreviewRadioItem>
          </MenuPreviewRadioGroup>
        </MenuPreviewPopup>
      </MenuPreview>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const checkbox = await screen.findByRole('menuitemcheckbox', { name: /show hidden files/i });
    expect(checkbox).to.have.attribute('aria-checked', 'false');

    await user.click(checkbox);

    expect(checkbox).to.have.attribute('aria-checked', 'true');
    expect(checkbox).to.have.class(menuPreviewCheckboxItemClasses.checked);
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
      <MenuPreview open>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup>
          <MenuPreviewCheckboxItem>
            <MenuPreviewCheckboxItemIndicator keepMounted data-testid="checkbox-indicator" />
            Show hidden files
          </MenuPreviewCheckboxItem>
          <MenuPreviewRadioGroup defaultValue="small">
            <MenuPreviewRadioItem value="small">
              <MenuPreviewRadioItemIndicator keepMounted data-testid="checked-radio-indicator" />
              Small
            </MenuPreviewRadioItem>
            <MenuPreviewRadioItem value="large">
              <MenuPreviewRadioItemIndicator keepMounted data-testid="unchecked-radio-indicator" />
              Large
            </MenuPreviewRadioItem>
          </MenuPreviewRadioGroup>
        </MenuPreviewPopup>
      </MenuPreview>,
    );

    const checkboxIndicator = screen.getByTestId('checkbox-indicator');
    const checkboxIcon = checkboxIndicator.querySelector('[data-mui-menu-preview-indicator-icon]');
    const checkboxMark = checkboxIndicator.querySelector('[data-mui-menu-preview-indicator-mark]');
    expect(checkboxIndicator).to.have.attribute('data-unchecked', '');
    expect(window.getComputedStyle(checkboxIndicator).visibility).to.equal('visible');
    expect(checkboxIcon).not.to.equal(null);
    expect(window.getComputedStyle(checkboxIcon!).visibility).to.equal('visible');
    expect(checkboxMark).not.to.equal(null);
    expect(window.getComputedStyle(checkboxMark!).visibility).to.equal('hidden');

    const checkedRadioIndicator = screen.getByTestId('checked-radio-indicator');
    const checkedRadioIcon = checkedRadioIndicator.querySelector(
      '[data-mui-menu-preview-indicator-icon]',
    );
    const checkedRadioMark = checkedRadioIndicator.querySelector(
      '[data-mui-menu-preview-indicator-mark]',
    );
    expect(checkedRadioIndicator).to.have.attribute('data-checked', '');
    expect(checkedRadioIcon).not.to.equal(null);
    expect(window.getComputedStyle(checkedRadioIcon!).visibility).to.equal('visible');
    expect(checkedRadioMark).not.to.equal(null);
    expect(window.getComputedStyle(checkedRadioMark!).visibility).to.equal('visible');

    const uncheckedRadioIndicator = screen.getByTestId('unchecked-radio-indicator');
    const uncheckedRadioIcon = uncheckedRadioIndicator.querySelector(
      '[data-mui-menu-preview-indicator-icon]',
    );
    const uncheckedRadioMark = uncheckedRadioIndicator.querySelector(
      '[data-mui-menu-preview-indicator-mark]',
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
      <MenuPreview>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup>
          <MenuPreviewGroup>
            <MenuPreviewGroupLabel>Account</MenuPreviewGroupLabel>
            <MenuPreviewLinkItem href="/profile">Profile</MenuPreviewLinkItem>
          </MenuPreviewGroup>
          <MenuPreviewSeparator />
          <MenuPreviewSubmenuRoot defaultOpen>
            <MenuPreviewSubmenuTrigger>More</MenuPreviewSubmenuTrigger>
            <MenuPreviewSubmenuPopup>
              <MenuPreviewItem>Archive</MenuPreviewItem>
            </MenuPreviewSubmenuPopup>
          </MenuPreviewSubmenuRoot>
        </MenuPreviewPopup>
      </MenuPreview>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByText('Account')).not.to.equal(null);
    expect(screen.getByRole('separator')).not.to.equal(null);
    expect(screen.getByRole('menuitem', { name: 'Profile' })).to.have.attribute('href', '/profile');
    expect(screen.getByRole('menuitem', { name: 'More' })).to.not.equal(null);
    expect(screen.getByRole('menuitem', { name: 'Archive' })).to.not.equal(null);
  });

  it('supports Material UI Tooltip on enabled item flavors', async () => {
    const { user } = render(
      <MenuPreview open>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup>
          <Tooltip title="Create a blank document" describeChild enterDelay={0} leaveDelay={0}>
            <MenuPreviewItem>New document</MenuPreviewItem>
          </Tooltip>
          <Tooltip title="Toggle comments" describeChild enterDelay={0} leaveDelay={0}>
            <MenuPreviewCheckboxItem>
              <MenuPreviewCheckboxItemIndicator />
              Comments
            </MenuPreviewCheckboxItem>
          </Tooltip>
          <MenuPreviewRadioGroup defaultValue="fit">
            <Tooltip title="Fit to viewport" describeChild enterDelay={0} leaveDelay={0}>
              <MenuPreviewRadioItem value="fit">
                <MenuPreviewRadioItemIndicator />
                Fit
              </MenuPreviewRadioItem>
            </Tooltip>
          </MenuPreviewRadioGroup>
        </MenuPreviewPopup>
      </MenuPreview>,
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
      <MenuPreview open>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup>
          <MenuPreviewSubmenuRoot>
            <ClickClosingTooltip title="Open view settings">
              <MenuPreviewSubmenuTrigger openOnHover={false}>
                View options
              </MenuPreviewSubmenuTrigger>
            </ClickClosingTooltip>
            <MenuPreviewSubmenuPopup>
              <MenuPreviewItem>Comments</MenuPreviewItem>
            </MenuPreviewSubmenuPopup>
          </MenuPreviewSubmenuRoot>
        </MenuPreviewPopup>
      </MenuPreview>,
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
      <MenuPreview defaultOpen>
        <MenuPreviewTrigger>Options</MenuPreviewTrigger>
        <MenuPreviewPopup>
          <Tooltip title="Unavailable while offline" describeChild enterDelay={0} leaveDelay={0}>
            <span data-testid="disabled-item-tooltip-target">
              <MenuPreviewItem disabled>Import from Drive</MenuPreviewItem>
            </span>
          </Tooltip>
        </MenuPreviewPopup>
      </MenuPreview>,
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
        <MenuPreview>
          <MenuPreviewTrigger>Options</MenuPreviewTrigger>
          <MenuPreviewPopup>
            <MenuPreviewSubmenuRoot disabled>
              <MenuPreviewSubmenuTrigger disabled>Add-ons unavailable</MenuPreviewSubmenuTrigger>
              <MenuPreviewSubmenuPopup>
                <MenuPreviewItem>Marketplace</MenuPreviewItem>
              </MenuPreviewSubmenuPopup>
            </MenuPreviewSubmenuRoot>
          </MenuPreviewPopup>
        </MenuPreview>,
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
