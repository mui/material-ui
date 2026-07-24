import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
// The Unstable_ subpaths use default exports, so the local bindings drop the
// prefix and the JSX mirrors the future stable names.
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2CheckboxItemIndicator from '@mui/material/Unstable_Menu2CheckboxItemIndicator';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2RadioItemIndicator from '@mui/material/Unstable_Menu2RadioItemIndicator';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2SubmenuRoot from '@mui/material/Unstable_Menu2SubmenuRoot';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

interface MenuSettings {
  modal: boolean;
  disabled: boolean;
  submenusOpenOnHover: boolean;
}

const theme = createTheme({});

const defaultSettings: MenuSettings = {
  modal: true,
  disabled: false,
  submenusOpenOnHover: false,
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

interface PreviewCardItem {
  id: string;
  label: string;
  description: string;
  footer: string;
}

const rootPreviewCardItems: PreviewCardItem[] = [
  {
    id: 'template-gallery',
    label: 'Template gallery',
    description: 'Start from a polished document layout for notes, proposals, and project plans.',
    footer: 'Opens the template picker',
  },
  {
    id: 'publish-web',
    label: 'Publish to web',
    description: 'Create a public read-only page that updates when this document changes.',
    footer: 'Requires sharing permission',
  },
];

const versionHistoryPreviewCardItems: PreviewCardItem[] = [
  {
    id: 'named-versions',
    label: 'Named versions',
    description: 'Create and manage named checkpoints for important document milestones.',
    footer: 'Keeps the current version history',
  },
  {
    id: 'compare-changes',
    label: 'Compare changes',
    description: 'Review edits between two versions and inspect who changed each section.',
    footer: 'Opens in a side-by-side view',
  },
  {
    id: 'restore-version',
    label: 'Restore version',
    description: 'Replace the current document with a selected earlier version.',
    footer: 'Creates a new restore checkpoint',
  },
];

const previewCardItems = [...rootPreviewCardItems, ...versionHistoryPreviewCardItems];

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

function MenuTooltip(props: {
  title: string;
  children: React.ReactElement<MenuTooltipChildProps>;
  tooltipProps?: Partial<TooltipProps>;
}) {
  const { title, children, tooltipProps = horizontalTooltipProps } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const child = React.cloneElement(children, {
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
}

function MaterialPreviewCard(props: {
  id: string | undefined;
  item: PreviewCardItem | null;
  anchorEl: HTMLElement | null;
}) {
  const { id, item, anchorEl } = props;
  const open = Boolean(item && anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      marginThreshold={8}
      // Material UI does not have a PreviewCard primitive, so keep the Popover
      // non-interactive and opt out of Modal focus behavior for this experiment.
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
      disableScrollLock
      hideBackdrop
      slotProps={{
        root: {
          sx: {
            pointerEvents: 'none',
          },
        },
        paper: {
          id,
          sx: {
            width: 256,
            p: 1.5,
            ml: 1,
            pointerEvents: 'none',
          },
        },
      }}
    >
      {item ? (
        <React.Fragment>
          <Typography variant="subtitle2" aria-hidden>
            {item.label}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }} variant="body2">
            {item.description}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }} variant="caption">
            {item.footer}
          </Typography>
        </React.Fragment>
      ) : null}
    </Popover>
  );
}

function DisabledTooltip(props: { title: string; children: React.ReactElement }) {
  const { title, children } = props;

  return (
    <Tooltip {...horizontalTooltipProps} title={title} describeChild>
      {/* Disabled menu items need a wrapper for pointer events. This means aria-describedby
          is attached to the wrapper, not the disabled menuitem itself. */}
      <span>{children}</span>
    </Tooltip>
  );
}

function Menu2WithPreviewCardsDemo({ submenusOpenOnHover }: { submenusOpenOnHover: boolean }) {
  const previewCardIdPrefix = React.useId();
  const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const activeItem =
    previewCardItems.find((previewCardItem) => previewCardItem.id === activeItemId) ?? null;
  const activePreviewCardId = activeItem
    ? `${previewCardIdPrefix}-${activeItem.id}-preview-card`
    : undefined;

  const clearActiveItem = () => {
    setActiveItemId(null);
    setAnchorEl(null);
  };

  const getPreviewCardProps = (item: PreviewCardItem) => {
    const setActiveItem = (element: HTMLElement) => {
      setActiveItemId(item.id);
      setAnchorEl(element);
    };

    return {
      'aria-describedby':
        activeItemId === item.id ? `${previewCardIdPrefix}-${item.id}-preview-card` : undefined,
      onFocus: (event: React.FocusEvent<HTMLElement>) => {
        setActiveItem(event.currentTarget);
      },
      onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
        setActiveItem(event.currentTarget);
      },
    };
  };

  return (
    <Menu2
      onOpenChange={(open) => {
        if (!open) {
          setActiveItemId(null);
          setAnchorEl(null);
        }
      }}
    >
      <Menu2Trigger variant="contained" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
        Help cards
      </Menu2Trigger>
      <Menu2Popup sideOffset={8}>
        <Menu2Item
          label={rootPreviewCardItems[0].label}
          {...getPreviewCardProps(rootPreviewCardItems[0])}
        >
          {rootPreviewCardItems[0].label}
        </Menu2Item>
        <Menu2SubmenuRoot>
          <Menu2SubmenuTrigger
            openOnHover={submenusOpenOnHover}
            onFocus={clearActiveItem}
            onMouseEnter={clearActiveItem}
          >
            Version history
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </Menu2SubmenuTrigger>
          <Menu2SubmenuPopup sideOffset={8}>
            {versionHistoryPreviewCardItems.map((item) => (
              <Menu2Item key={item.id} label={item.label} {...getPreviewCardProps(item)}>
                {item.label}
              </Menu2Item>
            ))}
          </Menu2SubmenuPopup>
        </Menu2SubmenuRoot>
        <Menu2Item
          label={rootPreviewCardItems[1].label}
          {...getPreviewCardProps(rootPreviewCardItems[1])}
        >
          {rootPreviewCardItems[1].label}
        </Menu2Item>
      </Menu2Popup>
      <MaterialPreviewCard id={activePreviewCardId} item={activeItem} anchorEl={anchorEl} />
    </Menu2>
  );
}

function Menu2Demo({ settings }: { settings: MenuSettings }) {
  const handleItemClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    // eslint-disable-next-line no-console
    console.log(`${event.currentTarget.textContent} clicked`);
  }, []);

  return (
    <Menu2 modal={settings.modal} disabled={settings.disabled}>
      <Menu2Trigger variant="contained" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
        File
      </Menu2Trigger>
      <Menu2Popup sideOffset={8}>
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

        <Menu2SubmenuRoot>
          <Menu2SubmenuTrigger openOnHover={settings.submenusOpenOnHover}>
            View options
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </Menu2SubmenuTrigger>
          <Menu2SubmenuPopup sideOffset={8}>
            <Menu2Group>
              <Menu2GroupLabel>Document display</Menu2GroupLabel>
              <Menu2RadioGroup defaultValue="100">
                <Menu2RadioItem value="100">
                  <Menu2RadioItemIndicator keepMounted />
                  100%
                </Menu2RadioItem>
                <Menu2RadioItem value="fit">
                  <Menu2RadioItemIndicator keepMounted />
                  Fit
                </Menu2RadioItem>
                <Menu2RadioItem value="page-width">
                  <Menu2RadioItemIndicator keepMounted />
                  Page width
                </Menu2RadioItem>
                <Menu2RadioItem value="custom" disabled>
                  <Menu2RadioItemIndicator keepMounted />
                  Custom zoom unavailable
                </Menu2RadioItem>
              </Menu2RadioGroup>
            </Menu2Group>

            <Menu2Separator />

            <Menu2Group>
              <Menu2GroupLabel>Show</Menu2GroupLabel>
              <Menu2CheckboxItem defaultChecked>
                <Menu2CheckboxItemIndicator keepMounted />
                Ruler
              </Menu2CheckboxItem>
              <Menu2CheckboxItem defaultChecked>
                <Menu2CheckboxItemIndicator keepMounted />
                Document outline
              </Menu2CheckboxItem>
              <Menu2CheckboxItem>
                <Menu2CheckboxItemIndicator keepMounted />
                Line numbers
              </Menu2CheckboxItem>
              <Menu2CheckboxItem disabled>
                <Menu2CheckboxItemIndicator keepMounted />
                Page breaks unavailable
              </Menu2CheckboxItem>
            </Menu2Group>

            <Menu2Separator />

            <Menu2SubmenuRoot>
              <Menu2SubmenuTrigger openOnHover={settings.submenusOpenOnHover}>
                More tools
                <KeyboardArrowRightRoundedIcon fontSize="small" />
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup sideOffset={8}>
                <Menu2Item onClick={handleItemClick}>Word count</Menu2Item>
                <Menu2Item onClick={handleItemClick}>Dictionary</Menu2Item>
                <Menu2Item onClick={handleItemClick}>Accessibility settings</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2SubmenuRoot>
          </Menu2SubmenuPopup>
        </Menu2SubmenuRoot>

        <Menu2SubmenuRoot>
          <Menu2SubmenuTrigger openOnHover={settings.submenusOpenOnHover}>
            Download
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </Menu2SubmenuTrigger>
          <Menu2SubmenuPopup sideOffset={8}>
            <Menu2Item>Microsoft Word (.docx)</Menu2Item>
            <Menu2Item>PDF document (.pdf)</Menu2Item>
            <Menu2Item>Plain text (.txt)</Menu2Item>
          </Menu2SubmenuPopup>
        </Menu2SubmenuRoot>

        <Menu2SubmenuRoot disabled>
          <Menu2SubmenuTrigger disabled openOnHover={settings.submenusOpenOnHover}>
            Add-ons unavailable
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </Menu2SubmenuTrigger>
          <Menu2SubmenuPopup sideOffset={8}>
            <Menu2Item>Marketplace</Menu2Item>
          </Menu2SubmenuPopup>
        </Menu2SubmenuRoot>
      </Menu2Popup>
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
    <Menu2>
      <Menu2Trigger variant="contained" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
        Tools
      </Menu2Trigger>
      <Menu2Popup sideOffset={8}>
        <MenuTooltip title="Create a blank document">
          <Menu2Item>New document</Menu2Item>
        </MenuTooltip>
        <MenuTooltip title="Open recently edited documents">
          <Menu2Item>Open recent</Menu2Item>
        </MenuTooltip>
        <MenuTooltip title="Copy this document to your Drive">
          <Menu2Item>Make a copy</Menu2Item>
        </MenuTooltip>
        <DisabledTooltip title="Import is disabled while offline">
          <Menu2Item disabled>Import from Drive</Menu2Item>
        </DisabledTooltip>
        <DisabledTooltip title="Sharing is unavailable in preview">
          <Menu2Item disabled>Share with people</Menu2Item>
        </DisabledTooltip>
        <Menu2Separator />

        <Menu2SubmenuRoot>
          <MenuTooltip title="Open view settings" tooltipProps={submenuTriggerTooltipProps}>
            <Menu2SubmenuTrigger openOnHover={submenusOpenOnHover}>
              View options
              <KeyboardArrowRightRoundedIcon fontSize="small" />
            </Menu2SubmenuTrigger>
          </MenuTooltip>
          <Menu2SubmenuPopup sideOffset={8}>
            <Menu2Group>
              <Menu2GroupLabel>Show</Menu2GroupLabel>
              <MenuTooltip title="Display comments in the document">
                <Menu2CheckboxItem defaultChecked>
                  <Menu2CheckboxItemIndicator keepMounted />
                  Comments
                </Menu2CheckboxItem>
              </MenuTooltip>
              <DisabledTooltip title="Page breaks are locked in published view">
                <Menu2CheckboxItem disabled>
                  <Menu2CheckboxItemIndicator keepMounted />
                  Page breaks
                </Menu2CheckboxItem>
              </DisabledTooltip>
            </Menu2Group>

            <Menu2Separator />

            <Menu2Group>
              <Menu2GroupLabel>Zoom</Menu2GroupLabel>
              <Menu2RadioGroup defaultValue="fit">
                <MenuTooltip title="Use the available viewport width">
                  <Menu2RadioItem value="fit">
                    <Menu2RadioItemIndicator keepMounted />
                    Fit
                  </Menu2RadioItem>
                </MenuTooltip>
                <DisabledTooltip title="Custom zoom is unavailable in preview">
                  <Menu2RadioItem value="custom" disabled>
                    <Menu2RadioItemIndicator keepMounted />
                    Custom
                  </Menu2RadioItem>
                </DisabledTooltip>
              </Menu2RadioGroup>
            </Menu2Group>
          </Menu2SubmenuPopup>
        </Menu2SubmenuRoot>
      </Menu2Popup>
    </Menu2>
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
      <Menu2 open={open} onOpenChange={handleOpenChange}>
        <Menu2Popup anchor={anchor ?? undefined} positionMethod="fixed" finalFocus={contextAreaRef}>
          <Menu2Item onClick={handleClose}>Copy</Menu2Item>
          <Menu2Item onClick={handleClose}>Print</Menu2Item>
          <Menu2Item onClick={handleClose}>Highlight</Menu2Item>
          <Menu2Item onClick={handleClose}>Email</Menu2Item>
        </Menu2Popup>
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head title="Menu2 experiment" description="Material UI Menu2 experiment" />
      <Container maxWidth="md" sx={{ pt: 4 }}>
        <Stack spacing={4}>
          <Typography component="h2" variant="h4">
            Menu Preview
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
          </fieldset>
          <section>
            <h3 id="fully-featured-menu">Fully featured menu</h3>
            <p>Fully-featured menu with submenus, links, radio groups, and checkbox items.</p>
            <Menu2Demo settings={settings} />
          </section>
          <section>
            <h3 id="menu-preview-tooltips">Menu2 + Tooltip</h3>
            <p>Material UI Tooltip integrated with every menu item.</p>
            <Menu2WithTooltipsDemo submenusOpenOnHover={settings.submenusOpenOnHover} />
          </section>
          <section>
            <h3 id="menu-preview-popover-preview-card">Menu2 + Popover-based preview card</h3>
            <p>Material UI Popover used as a PreviewCard-style menu item help card.</p>
            <Menu2WithPreviewCardsDemo submenusOpenOnHover={settings.submenusOpenOnHover} />
          </section>
          <section>
            <h3 id="menu-preview-context-menu-recipe">Menu2 as ContextMenu recipe</h3>
            <p>Right-click the text to open a cursor-positioned Menu2 popup.</p>
            <Menu2ContextMenuRecipe />
          </section>
          <a href="https://base-ui.com/react/components/menu">Base UI Menu API</a>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
