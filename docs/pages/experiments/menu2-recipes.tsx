import * as React from 'react';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClassicMenu from '@mui/material/Menu';
import ClassicMenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
// The Unstable_ subpaths use default exports, so the local bindings drop the
// prefix and the JSX mirrors the future stable names.
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

interface MenuSettings {
  modal: boolean;
  disabled: boolean;
  submenusOpenOnHover: boolean;
  focusVisible: boolean;
}

const defaultSettings: MenuSettings = {
  modal: true,
  disabled: false,
  submenusOpenOnHover: false,
  focusVisible: false,
};

function createVirtualAnchor(mouseX: number, mouseY: number) {
  return {
    getBoundingClientRect() {
      return DOMRect.fromRect({
        x: mouseX,
        y: mouseY,
        width: 0,
        height: 0,
      });
    },
  };
}

const horizontalTooltipProps = {
  placement: 'right',
  slotProps: {
    popper: {
      popperOptions: {
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['left', 'right'],
            },
          },
        ],
      },
    },
  },
} satisfies Partial<TooltipProps>;

interface MenuTooltipChildProps {
  onClickCapture?: React.MouseEventHandler<HTMLElement>;
}

// A wrapper used around a menu item, or as a menu trigger, must forward every
// other prop and the ref to its child. Base UI merges the item and trigger
// behavior into the element it renders, and a wrapper that drops those props
// swallows the behavior.
const MenuTooltip = React.forwardRef<
  HTMLElement,
  {
    title: React.ReactNode;
    children: React.ReactElement<MenuTooltipChildProps>;
    tooltipProps?: Partial<TooltipProps>;
  } & Record<string, any>
>(function MenuTooltip(props, ref) {
  const { title, children, tooltipProps = horizontalTooltipProps, ...forwarded } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

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
      {...tooltipProps}
      title={title}
      describeChild
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      {child}
    </Tooltip>
  );
});

function Menu2Demo({ settings }: { settings: MenuSettings }) {
  const handleItemClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    // eslint-disable-next-line no-console
    console.log(`${event.currentTarget.textContent} clicked`);
  }, []);

  return (
    <Menu2
      modal={settings.modal}
      disabled={settings.disabled}
      trigger={
        <Button variant="contained" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
          File
        </Button>
      }
      sideOffset={8}
    >
      <Menu2Item onClick={handleItemClick}>New document</Menu2Item>
      <Menu2Item onClick={handleItemClick}>Open…</Menu2Item>
      <Menu2LinkItem href="/docs/templates">Template gallery</Menu2LinkItem>
      <Menu2LinkItem href="/docs/recent">Recent documents</Menu2LinkItem>
      <Menu2LinkItem href="/help/docs">Docs help center</Menu2LinkItem>
      <Menu2Item onClick={handleItemClick}>Make a copy</Menu2Item>
      <Menu2Separator />
      <Menu2Item closeOnClick={false} onClick={handleItemClick}>
        Rename document
      </Menu2Item>
      <Menu2Item disabled onClick={handleItemClick}>
        Offline editing unavailable
      </Menu2Item>
      <Menu2Separator />

      <Menu2Submenu
        trigger={
          <Menu2SubmenuTrigger openOnHover={settings.submenusOpenOnHover}>
            View options
          </Menu2SubmenuTrigger>
        }
      >
        <Menu2Group>
          <Menu2GroupLabel>Document display</Menu2GroupLabel>
          <Menu2RadioGroup defaultValue="100">
            <Menu2RadioItem value="100">100%</Menu2RadioItem>
            <Menu2RadioItem value="fit">Fit</Menu2RadioItem>
            <Menu2RadioItem value="page-width">Page width</Menu2RadioItem>
            <Menu2RadioItem value="custom" disabled>
              Custom zoom unavailable
            </Menu2RadioItem>
          </Menu2RadioGroup>
        </Menu2Group>

        <Menu2Separator />

        <Menu2Group>
          <Menu2GroupLabel>Show</Menu2GroupLabel>
          <Menu2CheckboxItem defaultChecked>Ruler</Menu2CheckboxItem>
          <Menu2CheckboxItem defaultChecked>Document outline</Menu2CheckboxItem>
          <Menu2CheckboxItem>Line numbers</Menu2CheckboxItem>
          <Menu2CheckboxItem disabled>Page breaks unavailable</Menu2CheckboxItem>
        </Menu2Group>

        <Menu2Separator />

        <Menu2Submenu
          trigger={
            <Menu2SubmenuTrigger openOnHover={settings.submenusOpenOnHover}>
              More tools
            </Menu2SubmenuTrigger>
          }
        >
          <Menu2Item onClick={handleItemClick}>Word count</Menu2Item>
          <Menu2Item onClick={handleItemClick}>Dictionary</Menu2Item>
          <Menu2Item onClick={handleItemClick}>Accessibility settings</Menu2Item>
        </Menu2Submenu>
      </Menu2Submenu>

      <Menu2Submenu
        trigger={
          <Menu2SubmenuTrigger openOnHover={settings.submenusOpenOnHover}>
            Download
          </Menu2SubmenuTrigger>
        }
      >
        <Menu2Item>Microsoft Word (.docx)</Menu2Item>
        <Menu2Item>PDF document (.pdf)</Menu2Item>
        <Menu2Item>Plain text (.txt)</Menu2Item>
      </Menu2Submenu>

      <Menu2Submenu
        trigger={
          <Menu2SubmenuTrigger openOnHover={settings.submenusOpenOnHover} disabled>
            Add-ons unavailable
          </Menu2SubmenuTrigger>
        }
      >
        <Menu2Item>Marketplace</Menu2Item>
      </Menu2Submenu>
    </Menu2>
  );
}

function Menu2WithTooltipsDemo({ submenusOpenOnHover }: { submenusOpenOnHover: boolean }) {
  const { direction } = useTheme();
  const submenuTriggerTooltipProps = React.useMemo<Partial<TooltipProps>>(
    () => ({
      placement: direction === 'rtl' ? 'right' : 'left',
      slotProps: {
        popper: {
          popperOptions: {
            modifiers: [
              {
                // Submenus default to inline-end, so keep this tooltip on
                // inline-start instead of letting Popper flip it onto the submenu.
                name: 'flip',
                enabled: false,
              },
            ],
          },
        },
      },
    }),
    [direction],
  );

  return (
    <Menu2
      trigger={
        <Button variant="contained" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
          Tools
        </Button>
      }
      sideOffset={8}
    >
      <MenuTooltip title="Create a blank document">
        <Menu2Item>New document</Menu2Item>
      </MenuTooltip>
      <MenuTooltip title="Open recently edited documents">
        <Menu2Item>Open recent</Menu2Item>
      </MenuTooltip>
      <MenuTooltip
        title={
          <React.Fragment>
            <Box
              component="img"
              src="/static/images/menu2/document-copy.svg"
              alt=""
              width={240}
              height={112}
              sx={{ display: 'block', maxWidth: '100%', height: 'auto', mb: 1, borderRadius: 1 }}
            />
            <Typography component="p" variant="inherit" sx={{ mb: 1 }}>
              Create a <strong>separate copy</strong> in your Drive.
            </Typography>
            <Typography component="p" variant="inherit">
              Your edits <em>do not change</em> the original document.
            </Typography>
          </React.Fragment>
        }
      >
        <Menu2Item>Make a copy</Menu2Item>
      </MenuTooltip>
      <MenuTooltip title="Import is disabled while offline">
        <Menu2Item disabled>Import from Drive</Menu2Item>
      </MenuTooltip>
      <MenuTooltip title="Sharing is unavailable in preview">
        <Menu2Item disabled>Share with people</Menu2Item>
      </MenuTooltip>
      <Menu2Separator />

      <Menu2Submenu
        trigger={
          <MenuTooltip title="Open view settings" tooltipProps={submenuTriggerTooltipProps}>
            <Menu2SubmenuTrigger openOnHover={submenusOpenOnHover}>
              View options
            </Menu2SubmenuTrigger>
          </MenuTooltip>
        }
      >
        <Menu2Group>
          <Menu2GroupLabel>Show</Menu2GroupLabel>
          <MenuTooltip title="Display comments in the document">
            <Menu2CheckboxItem defaultChecked>Comments</Menu2CheckboxItem>
          </MenuTooltip>
          <MenuTooltip title="Page breaks are locked in published view">
            <Menu2CheckboxItem disabled>Page breaks</Menu2CheckboxItem>
          </MenuTooltip>
        </Menu2Group>

        <Menu2Separator />

        <Menu2Group>
          <Menu2GroupLabel>Zoom</Menu2GroupLabel>
          <Menu2RadioGroup defaultValue="fit">
            <MenuTooltip title="Use the available viewport width">
              <Menu2RadioItem value="fit">Fit</Menu2RadioItem>
            </MenuTooltip>
            <MenuTooltip title="Custom zoom is unavailable in preview">
              <Menu2RadioItem value="custom" disabled>
                Custom
              </Menu2RadioItem>
            </MenuTooltip>
          </Menu2RadioGroup>
        </Menu2Group>
      </Menu2Submenu>
    </Menu2>
  );
}

function MenuInDialogRecipe({ menuType }: { menuType: 'classic' | 'menu2' }) {
  const titleId = React.useId();
  const triggerId = `${titleId}-trigger`;
  const menuId = `${titleId}-menu`;
  const isClassic = menuType === 'classic';
  const label = isClassic ? 'Classic Menu' : 'Menu2';
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [menuEvent, setMenuEvent] = React.useState('none');
  const [dialogEvent, setDialogEvent] = React.useState('none');
  const [selectedAction, setSelectedAction] = React.useState('none');
  const [buttonClicks, setButtonClicks] = React.useState(0);

  const handleDialogClose = (reason: string) => {
    setDialogEvent(reason);
    setAnchorEl(null);
    setOpen(false);
  };

  const handleSelect = (action: string) => {
    setSelectedAction(action);
    if (isClassic) {
      // Classic Menu requires the caller to close it after item selection.
      setAnchorEl(null);
      setMenuEvent('closed (item click handler)');
    }
  };

  const status = (
    <Box sx={{ typography: 'body2' }}>
      <div>
        Last menu event: <code>{menuEvent}</code>
      </div>
      <div>
        Last dialog close: <code>{dialogEvent}</code>
      </div>
      <div>Selected action: {selectedAction}</div>
      <div>Other button clicks: {buttonClicks}</div>
    </Box>
  );

  return (
    <Stack spacing={2} useFlexGap sx={{ alignItems: 'flex-start', minWidth: 0 }}>
      <Typography component="h3" variant="h6">
        {label}
      </Typography>
      <Button
        variant="outlined"
        onClick={() => {
          setMenuEvent('none');
          setDialogEvent('none');
          setSelectedAction('none');
          setButtonClicks(0);
          setAnchorEl(null);
          setOpen(true);
        }}
      >
        Open {label} dialog
      </Button>
      {status}
      <Dialog
        open={open}
        aria-labelledby={titleId}
        fullWidth
        maxWidth="sm"
        onClose={(_event, reason) => handleDialogClose(reason)}
      >
        <DialogTitle id={titleId}>{label}: Document settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Open Actions, then select an item, press Escape, or click outside the menu. Check the
            event details below. The other button counts clicks that reach the dialog.
          </DialogContentText>
          <Stack spacing={2} useFlexGap sx={{ mt: 2 }}>
            <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
              {isClassic ? (
                <React.Fragment>
                  <Button
                    id={triggerId}
                    variant="contained"
                    aria-haspopup="menu"
                    aria-expanded={Boolean(anchorEl)}
                    aria-controls={anchorEl ? menuId : undefined}
                    onClick={(event) => {
                      setAnchorEl(event.currentTarget);
                      setMenuEvent('open (trigger)');
                    }}
                  >
                    Actions
                  </Button>
                  <ClassicMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={(_event, reason) => {
                      setAnchorEl(null);
                      setMenuEvent(`closed (${reason})`);
                    }}
                    slotProps={{ list: { id: menuId, 'aria-labelledby': triggerId } }}
                  >
                    <ClassicMenuItem onClick={() => handleSelect('Rename document')}>
                      Rename document
                    </ClassicMenuItem>
                    <ClassicMenuItem onClick={() => handleSelect('Duplicate document')}>
                      Duplicate document
                    </ClassicMenuItem>
                  </ClassicMenu>
                </React.Fragment>
              ) : (
                <Menu2
                  trigger={<Button variant="contained">Actions</Button>}
                  onOpenChange={(nextOpen, details) => {
                    setMenuEvent(`${nextOpen ? 'open' : 'closed'} (${details.reason})`);
                  }}
                >
                  <Menu2Item onClick={() => handleSelect('Rename document')}>
                    Rename document
                  </Menu2Item>
                  <Menu2Item onClick={() => handleSelect('Duplicate document')}>
                    Duplicate document
                  </Menu2Item>
                  <Menu2Submenu trigger={<Menu2SubmenuTrigger>Export</Menu2SubmenuTrigger>}>
                    <Menu2Item onClick={() => handleSelect('Export as PDF')}>
                      Export as PDF
                    </Menu2Item>
                    <Menu2Item onClick={() => handleSelect('Export as text')}>
                      Export as text
                    </Menu2Item>
                  </Menu2Submenu>
                </Menu2>
              )}
              <Button onClick={() => setButtonClicks((count) => count + 1)}>Other button</Button>
            </Stack>
            {status}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose('close-button')}>Close dialog</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

function MenuOpensDialogRecipe({
  menuType,
  restoreFocus,
}: {
  menuType: 'classic' | 'menu2';
  restoreFocus: boolean;
}) {
  const titleId = React.useId();
  const triggerId = `${titleId}-trigger`;
  const menuId = `${titleId}-menu`;
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const focusCheckFrame = React.useRef<number | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [focusResult, setFocusResult] = React.useState('not checked');
  const isClassic = menuType === 'classic';
  const label = isClassic ? 'Classic Menu' : 'Menu2';
  const useExplicitReturnTarget = !isClassic && restoreFocus;

  React.useEffect(() => {
    return () => {
      if (focusCheckFrame.current !== null) {
        cancelAnimationFrame(focusCheckFrame.current);
      }
    };
  }, []);

  const openDialog = () => {
    setFocusResult('not checked');
    setAnchorEl(null);
    setDialogOpen(true);
  };

  const handleDialogExited = () => {
    if (useExplicitReturnTarget) {
      triggerRef.current?.focus({ preventScroll: true });
    }

    // Read after Dialog unmounts. This frame only reports focus; it does not move it.
    focusCheckFrame.current = requestAnimationFrame(() => {
      const activeElement = document.activeElement;
      if (activeElement === triggerRef.current) {
        setFocusResult('menu trigger');
      } else if (activeElement === document.body) {
        setFocusResult('page body');
      } else {
        setFocusResult('another element');
      }
    });
  };

  return (
    <Stack spacing={2} useFlexGap sx={{ alignItems: 'flex-start', minWidth: 0 }}>
      <Typography component="h3" variant="h6">
        {label}
      </Typography>
      {isClassic ? (
        <React.Fragment>
          <Button
            ref={triggerRef}
            id={triggerId}
            variant="outlined"
            aria-haspopup="menu"
            aria-expanded={Boolean(anchorEl)}
            aria-controls={anchorEl ? menuId : undefined}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            Classic Menu actions
          </Button>
          <ClassicMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            slotProps={{ list: { id: menuId, 'aria-labelledby': triggerId } }}
          >
            <ClassicMenuItem aria-haspopup="dialog" onClick={openDialog}>
              Edit settings
            </ClassicMenuItem>
          </ClassicMenu>
        </React.Fragment>
      ) : (
        <Menu2
          trigger={
            <Button ref={triggerRef} variant="outlined">
              Menu2 actions
            </Button>
          }
        >
          <Menu2Item aria-haspopup="dialog" onClick={openDialog}>
            Edit settings
          </Menu2Item>
        </Menu2>
      )}
      <Typography variant="body2">Focus after Dialog closes: {focusResult}</Typography>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby={titleId}
        disableRestoreFocus={useExplicitReturnTarget}
        slotProps={{ transition: { onExited: handleDialogExited } }}
      >
        <DialogTitle id={titleId}>{label}: Edit settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Close this dialog. Then check the focus result below the menu trigger.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setDialogOpen(false)}>
            Close dialog
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

function MenuDialogFocusRecipe() {
  const [restoreFocus, setRestoreFocus] = React.useState(true);

  return (
    <Stack spacing={2} useFlexGap>
      <label>
        <input
          type="checkbox"
          checked={restoreFocus}
          onChange={(event) => setRestoreFocus(event.target.checked)}
        />{' '}
        Set the Dialog return target for Menu2
      </label>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
          gap: 3,
        }}
      >
        <MenuOpensDialogRecipe menuType="classic" restoreFocus={false} />
        <MenuOpensDialogRecipe menuType="menu2" restoreFocus={restoreFocus} />
      </Box>
    </Stack>
  );
}

function Menu2ContextMenuRecipe() {
  const [anchor, setAnchor] = React.useState<ReturnType<typeof createVirtualAnchor> | null>(null);
  const open = anchor !== null;
  const contextAreaRef = React.useRef<HTMLDivElement | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    setAnchor(
      anchor === null
        ? createVirtualAnchor(event.clientX + 2, event.clientY - 6)
        : // Keep the old Material recipe behavior: a repeated contextmenu event while
          // open closes the menu instead of relocating it through the backdrop.
          null,
    );

    // Preserve selected text after opening the context menu in Safari and Firefox.
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      setTimeout(() => {
        selection.addRange(range);
      });
    }
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleOpenChange: React.ComponentProps<typeof Menu2>['onOpenChange'] = (
    nextOpen,
    eventDetails,
  ) => {
    if (nextOpen) {
      return;
    }

    if (
      eventDetails.reason === 'item-press' ||
      eventDetails.reason === 'outside-press' ||
      eventDetails.reason === 'escape-key'
    ) {
      handleClose();
      return;
    }

    eventDetails.cancel();
  };

  return (
    // tabIndex={-1} makes the invoked surface a valid focus-restore target. A
    // detached menu has no trigger to return focus to, and Base UI's fallback
    // is its internal "previously focused element" record, which can point at
    // an unrelated menu trigger from an earlier interaction.
    <div
      ref={contextAreaRef}
      tabIndex={-1}
      onContextMenu={handleContextMenu}
      style={{ cursor: 'context-menu' }}
    >
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit
        amet vulputate eget, porta semper ligula. Donec bibendum vulputate erat, ac fringilla mi
        finibus nec. Donec ac dolor sed dolor porttitor blandit vel vel purus. Fusce vel malesuada
        ligula. Nam quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci, quis
        finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus finibus ex, sit amet
        facilisis neque enim sed neque. Quisque accumsan metus vel maximus consequat. Suspendisse
        lacinia tellus a libero volutpat maximus.
      </Typography>
      <Menu2
        aria-label="Context actions"
        open={open}
        onOpenChange={handleOpenChange}
        anchor={anchor ?? undefined}
        positionMethod="fixed"
        finalFocus={contextAreaRef}
      >
        <Menu2Item onClick={handleClose}>Copy</Menu2Item>
        <Menu2Item onClick={handleClose}>Print</Menu2Item>
        <Menu2Item onClick={handleClose}>Highlight</Menu2Item>
        <Menu2Item onClick={handleClose}>Email</Menu2Item>
      </Menu2>
    </div>
  );
}

export default function Menu2Experiment() {
  const [settings, setSettings] = React.useState<MenuSettings>(defaultSettings);

  const handleCheckboxChange = (setting: keyof MenuSettings) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setSettings((currentSettings) => ({
        ...currentSettings,
        [setting]: event.target.checked,
      }));
    };
  };

  // Opt-in keyboard focus ring, to compare the Menu2 item indicator against the classic one.
  // The ring also opts out of the ripple, the way the focus visible docs page does.
  const theme = React.useMemo(
    () =>
      createTheme({
        focusVisible: settings.focusVisible,
        ...(settings.focusVisible && {
          components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
        }),
      }),
    [settings.focusVisible],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head
        title="Menu2 recipes"
        description="Menu2 integrations with Dialog, Tooltip, and context menus"
      />
      <Container maxWidth="md" sx={{ pt: 4 }}>
        <Stack spacing={4}>
          <Typography component="h1" variant="h4">
            Menu2 recipes
          </Typography>
          <Typography>
            Integration recipes for Menu2. See also the{' '}
            <NextLink href="/experiments/menu2-rfc/">Menu2 RFC draft</NextLink> and the{' '}
            <NextLink href="/experiments/menu2-playground/">Menu2 playground</NextLink>.
          </Typography>
          <fieldset>
            <legend>Demo controls</legend>
            <label>
              <input
                type="checkbox"
                checked={settings.modal}
                onChange={handleCheckboxChange('modal')}
              />{' '}
              Modal
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.disabled}
                onChange={handleCheckboxChange('disabled')}
              />{' '}
              Disabled
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.submenusOpenOnHover}
                onChange={handleCheckboxChange('submenusOpenOnHover')}
              />{' '}
              Submenus open on hover
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.focusVisible}
                onChange={handleCheckboxChange('focusVisible')}
              />{' '}
              focusVisible theme (keyboard focus ring)
            </label>
          </fieldset>
          <section>
            <h2 id="menu2-fully-featured">Fully featured menu</h2>
            <p>Fully-featured menu with submenus, links, radio groups, and checkbox items.</p>
            <Menu2Demo settings={settings} />
          </section>
          <section>
            <h2 id="menu2-tooltips">Menu2 + Tooltip</h2>
            <p>
              Material UI Tooltip adds descriptions to menu items. Hover over or focus Make a copy
              to see an image and paragraphs with bold and italic text. Tooltip content has no
              links, buttons, or other controls.
            </p>
            <p>
              Use the arrow keys to focus a disabled item and read its description. Disabled items
              do not receive pointer events, so their tooltips open on keyboard focus only.
            </p>
            <Menu2WithTooltipsDemo submenusOpenOnHover={settings.submenusOpenOnHover} />
          </section>
          <section>
            <h2 id="menu2-in-dialog">Classic Menu and Menu2 inside Dialog</h2>
            <p>
              Compare the default menu behavior inside a Material UI Dialog. Each example has its
              own dialog and event details. Only the focus ring control above applies to these
              examples.
            </p>
            <ol>
              <li>Open the dialog and select an item from Actions. The dialog should stay open.</li>
              <li>
                Open Actions with the keyboard. Press Escape to close the menu and return focus to
                Actions. Menu2 also has an Export submenu. With Export open, Escape should close the
                submenu first.
              </li>
              <li>
                With Actions open, click Other button. The first click should close only the menu. A
                second click should increase the count.
              </li>
              <li>
                Open Actions again and click the dimmed area outside the dialog. The first click
                should close only the menu. A second click should close the dialog.
              </li>
            </ol>
            <p>
              Repeat the same steps with Classic Menu to compare the results. In both examples, the
              first outside click should close only the menu. The event details remain visible after
              each dialog closes.
            </p>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                gap: 3,
              }}
            >
              <MenuInDialogRecipe menuType="classic" />
              <MenuInDialogRecipe menuType="menu2" />
            </Box>
          </section>
          <section>
            <h2 id="menu2-open-dialog">Open a Dialog from a menu</h2>
            <p>
              Open either menu, select Edit settings, and wait for the menu to close. Then close the
              dialog. You can also use Enter to open the menu and select its item, then Escape to
              close the dialog. The focus result should read <code>menu trigger</code>.
            </p>
            <p>
              Known limitation: Menu2 uses Base UI to manage focus. Base UI checks whether to return
              focus after the menu finishes closing. By default, it does not return focus if focus
              is already in Dialog. Dialog can therefore save a menu item as its return target. That
              item is then removed or hidden.
            </p>
            <p>
              Classic Menu restores focus when it starts closing. In this example, that lets Dialog
              save the menu trigger as its return target. The <code>finalFocus</code> prop on Menu2
              changes the return target, not when focus returns.
            </p>
            <p>
              The Menu2 example sets a return target on Dialog. It uses{' '}
              <code>disableRestoreFocus</code> and focuses the menu trigger from the{' '}
              <code>slotProps.transition.onExited</code> callback on Dialog. Keep the trigger
              mounted and enabled until the dialog closes.
            </p>
            <p>
              Clear the checkbox to test Menu2 without this workaround. Dialog then tries to return
              focus to the closed menu item, and focus moves to the page body. Classic Menu does not
              use the workaround here; its callback only reports the result. The controls at the top
              of this page do not change this comparison, except for the focus ring setting.
            </p>
            <MenuDialogFocusRecipe />
          </section>
          <section>
            <h2 id="menu2-context-menu-recipe">Menu2 as ContextMenu recipe</h2>
            <p>Right-click the text to open a cursor-positioned Menu2 popup.</p>
            <Menu2ContextMenuRecipe />
          </section>
          <a href="https://base-ui.com/react/components/menu">Base UI Menu API</a>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
