import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Menu, {
  CheckboxItem,
  CheckboxItemIndicator,
  Group,
  GroupLabel,
  Item,
  LinkItem,
  Popup,
  RadioGroup,
  RadioItem,
  RadioItemIndicator,
  Separator,
  SubmenuPopup,
  SubmenuRoot,
  SubmenuTrigger,
  Trigger,
} from '@mui/material/MenuPreview';
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
}) {
  const { title, children } = props;
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
      {...horizontalTooltipProps}
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

function MenuPreviewWithPreviewCardsDemo({
  submenusOpenOnHover,
}: {
  submenusOpenOnHover: boolean;
}) {
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
    <Menu
      onOpenChange={(open) => {
        if (!open) {
          setActiveItemId(null);
          setAnchorEl(null);
        }
      }}
    >
      <Trigger variant="contained" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
        Help cards
      </Trigger>
      <Popup sideOffset={8}>
        <Item
          label={rootPreviewCardItems[0].label}
          {...getPreviewCardProps(rootPreviewCardItems[0])}
        >
          {rootPreviewCardItems[0].label}
        </Item>
        <SubmenuRoot>
          <SubmenuTrigger
            openOnHover={submenusOpenOnHover}
            onFocus={clearActiveItem}
            onMouseEnter={clearActiveItem}
          >
            Version history
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </SubmenuTrigger>
          <SubmenuPopup sideOffset={8}>
            {versionHistoryPreviewCardItems.map((item) => (
              <Item key={item.id} label={item.label} {...getPreviewCardProps(item)}>
                {item.label}
              </Item>
            ))}
          </SubmenuPopup>
        </SubmenuRoot>
        <Item
          label={rootPreviewCardItems[1].label}
          {...getPreviewCardProps(rootPreviewCardItems[1])}
        >
          {rootPreviewCardItems[1].label}
        </Item>
      </Popup>
      <MaterialPreviewCard id={activePreviewCardId} item={activeItem} anchorEl={anchorEl} />
    </Menu>
  );
}

function MenuPreviewDemo({ settings }: { settings: MenuSettings }) {
  const handleItemClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    // eslint-disable-next-line no-console
    console.log(`${event.currentTarget.textContent} clicked`);
  }, []);

  return (
    <Menu modal={settings.modal} disabled={settings.disabled}>
      <Trigger variant="contained" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
        File
      </Trigger>
      <Popup sideOffset={8}>
        <Item onClick={handleItemClick}>New document</Item>
        <Item onClick={handleItemClick}>Open…</Item>
        <LinkItem href="/docs/templates">Template gallery</LinkItem>
        <LinkItem href="/docs/recent">Recent documents</LinkItem>
        <LinkItem href="/help/docs">Docs help center</LinkItem>
        <Item onClick={handleItemClick}>Make a copy</Item>
        <Separator />
        <Item closeOnClick={false} onClick={handleItemClick}>
          Rename document
        </Item>
        <Item disabled onClick={handleItemClick}>
          Offline editing unavailable
        </Item>
        <Separator />

        <SubmenuRoot>
          <SubmenuTrigger openOnHover={settings.submenusOpenOnHover}>
            View options
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </SubmenuTrigger>
          <SubmenuPopup sideOffset={8}>
            <Group>
              <GroupLabel>Document display</GroupLabel>
              <RadioGroup defaultValue="100">
                <RadioItem value="100">
                  <RadioItemIndicator keepMounted />
                  100%
                </RadioItem>
                <RadioItem value="fit">
                  <RadioItemIndicator keepMounted />
                  Fit
                </RadioItem>
                <RadioItem value="page-width">
                  <RadioItemIndicator keepMounted />
                  Page width
                </RadioItem>
                <RadioItem value="custom" disabled>
                  <RadioItemIndicator keepMounted />
                  Custom zoom unavailable
                </RadioItem>
              </RadioGroup>
            </Group>

            <Separator />

            <Group>
              <GroupLabel>Show</GroupLabel>
              <CheckboxItem defaultChecked>
                <CheckboxItemIndicator keepMounted />
                Ruler
              </CheckboxItem>
              <CheckboxItem defaultChecked>
                <CheckboxItemIndicator keepMounted />
                Document outline
              </CheckboxItem>
              <CheckboxItem>
                <CheckboxItemIndicator keepMounted />
                Line numbers
              </CheckboxItem>
              <CheckboxItem disabled>
                <CheckboxItemIndicator keepMounted />
                Page breaks unavailable
              </CheckboxItem>
            </Group>

            <Separator />

            <SubmenuRoot>
              <SubmenuTrigger openOnHover={settings.submenusOpenOnHover}>
                More tools
                <KeyboardArrowRightRoundedIcon fontSize="small" />
              </SubmenuTrigger>
              <SubmenuPopup sideOffset={8}>
                <Item onClick={handleItemClick}>Word count</Item>
                <Item onClick={handleItemClick}>Dictionary</Item>
                <Item onClick={handleItemClick}>Accessibility settings</Item>
              </SubmenuPopup>
            </SubmenuRoot>
          </SubmenuPopup>
        </SubmenuRoot>

        <SubmenuRoot>
          <SubmenuTrigger openOnHover={settings.submenusOpenOnHover}>
            Download
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </SubmenuTrigger>
          <SubmenuPopup sideOffset={8}>
            <Item>Microsoft Word (.docx)</Item>
            <Item>PDF document (.pdf)</Item>
            <Item>Plain text (.txt)</Item>
          </SubmenuPopup>
        </SubmenuRoot>

        <SubmenuRoot disabled>
          <SubmenuTrigger disabled openOnHover={settings.submenusOpenOnHover}>
            Add-ons unavailable
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </SubmenuTrigger>
          <SubmenuPopup sideOffset={8}>
            <Item>Marketplace</Item>
          </SubmenuPopup>
        </SubmenuRoot>
      </Popup>
    </Menu>
  );
}

function MenuPreviewWithTooltipsDemo({ submenusOpenOnHover }: { submenusOpenOnHover: boolean }) {
  return (
    <Menu>
      <Trigger variant="contained" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
        Tools
      </Trigger>
      <Popup sideOffset={8}>
        <MenuTooltip title="Create a blank document">
          <Item>New document</Item>
        </MenuTooltip>
        <MenuTooltip title="Open recently edited documents">
          <Item>Open recent</Item>
        </MenuTooltip>
        <MenuTooltip title="Copy this document to your Drive">
          <Item>Make a copy</Item>
        </MenuTooltip>
        <DisabledTooltip title="Import is disabled while offline">
          <Item disabled>Import from Drive</Item>
        </DisabledTooltip>
        <DisabledTooltip title="Sharing is unavailable in preview">
          <Item disabled>Share with people</Item>
        </DisabledTooltip>
        <Separator />

        <SubmenuRoot>
          <MenuTooltip title="Open view settings">
            <SubmenuTrigger openOnHover={submenusOpenOnHover}>
              View options
              <KeyboardArrowRightRoundedIcon fontSize="small" />
            </SubmenuTrigger>
          </MenuTooltip>
          <SubmenuPopup sideOffset={8}>
            <Group>
              <GroupLabel>Show</GroupLabel>
              <MenuTooltip title="Display comments in the document">
                <CheckboxItem defaultChecked>
                  <CheckboxItemIndicator keepMounted />
                  Comments
                </CheckboxItem>
              </MenuTooltip>
              <DisabledTooltip title="Page breaks are locked in published view">
                <CheckboxItem disabled>
                  <CheckboxItemIndicator keepMounted />
                  Page breaks
                </CheckboxItem>
              </DisabledTooltip>
            </Group>

            <Separator />

            <Group>
              <GroupLabel>Zoom</GroupLabel>
              <RadioGroup defaultValue="fit">
                <MenuTooltip title="Use the available viewport width">
                  <RadioItem value="fit">
                    <RadioItemIndicator keepMounted />
                    Fit
                  </RadioItem>
                </MenuTooltip>
                <DisabledTooltip title="Custom zoom is unavailable in preview">
                  <RadioItem value="custom" disabled>
                    <RadioItemIndicator keepMounted />
                    Custom
                  </RadioItem>
                </DisabledTooltip>
              </RadioGroup>
            </Group>
          </SubmenuPopup>
        </SubmenuRoot>
      </Popup>
    </Menu>
  );
}

export default function MenuPreviewExperiment() {
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
      <Head title="MenuPreview experiment" description="Material UI MenuPreview experiment" />
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
            <p>Fully-featured menu with submenus, links, radio groups, and checkbox items.</p>
            <MenuPreviewDemo settings={settings} />
          </section>
          <section>
            <p>Material UI Tooltip integrated with every menu item.</p>
            <MenuPreviewWithTooltipsDemo submenusOpenOnHover={settings.submenusOpenOnHover} />
          </section>
          <section>
            <p>Material UI Popover used as a PreviewCard-style menu item help card.</p>
            <MenuPreviewWithPreviewCardsDemo submenusOpenOnHover={settings.submenusOpenOnHover} />
          </section>
          <a href="https://base-ui.com/react/components/menu">Base UI Menu API</a>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
