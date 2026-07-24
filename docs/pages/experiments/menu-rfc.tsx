import * as React from 'react';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClassicMenu from '@mui/material/Menu';
import ClassicMenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { ThemeProvider, createTheme, type SxProps, type Theme } from '@mui/material/styles';
import { DirectionProvider } from '@base-ui/react/direction-provider';
import Unstable_Menu2 from '@mui/material/Unstable_Menu2';
import Unstable_Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Unstable_Menu2CheckboxItemIndicator from '@mui/material/Unstable_Menu2CheckboxItemIndicator';
import Unstable_Menu2Group from '@mui/material/Unstable_Menu2Group';
import Unstable_Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Unstable_Menu2Item from '@mui/material/Unstable_Menu2Item';
import Unstable_Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Unstable_Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Unstable_Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Unstable_Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Unstable_Menu2RadioItemIndicator from '@mui/material/Unstable_Menu2RadioItemIndicator';
import Unstable_Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Unstable_Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Unstable_Menu2SubmenuRoot from '@mui/material/Unstable_Menu2SubmenuRoot';
import Unstable_Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import Unstable_Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

// Local aliases for demo readability; the import lines above reflect the real
// one-component-per-subpath ergonomics (no Base UI-style short aliases).
const Menu = Unstable_Menu2;
const CheckboxItem = Unstable_Menu2CheckboxItem;
const CheckboxItemIndicator = Unstable_Menu2CheckboxItemIndicator;
const Group = Unstable_Menu2Group;
const GroupLabel = Unstable_Menu2GroupLabel;
const Item = Unstable_Menu2Item;
const LinkItem = Unstable_Menu2LinkItem;
const Popup = Unstable_Menu2Popup;
const RadioGroup = Unstable_Menu2RadioGroup;
const RadioItem = Unstable_Menu2RadioItem;
const RadioItemIndicator = Unstable_Menu2RadioItemIndicator;
const Separator = Unstable_Menu2Separator;
const SubmenuPopup = Unstable_Menu2SubmenuPopup;
const SubmenuRoot = Unstable_Menu2SubmenuRoot;
const SubmenuTrigger = Unstable_Menu2SubmenuTrigger;
const Trigger = Unstable_Menu2Trigger;

type MenuProps = React.ComponentProps<typeof Menu>;
type PopupProps = React.ComponentProps<typeof Popup>;
type PopupSide = NonNullable<PopupProps['side']>;
type PopupAlign = NonNullable<PopupProps['align']>;

interface PlaygroundSettings {
  // Root behavior
  modal: boolean;
  rootOpenOnHover: boolean;
  loopFocus: boolean;
  highlightItemOnHover: boolean;
  // Submenu behavior
  submenusOpenOnHover: boolean;
  submenuDelay: number;
  submenuCloseDelay: number;
  closeParentOnEsc: boolean;
  // Positioning
  side: PopupSide;
  align: PopupAlign;
  sideOffset: number;
  alignOffset: number;
  keepMounted: boolean;
  // Appearance / RFC open questions
  elevation: number;
  animation: 'none' | 'grow';
  dense: boolean;
  dividers: boolean;
  rtl: boolean;
}

const defaultSettings: PlaygroundSettings = {
  modal: true,
  rootOpenOnHover: false,
  loopFocus: true,
  highlightItemOnHover: true,
  submenusOpenOnHover: true,
  submenuDelay: 100,
  submenuCloseDelay: 0,
  closeParentOnEsc: false,
  side: 'bottom',
  align: 'start',
  sideOffset: 8,
  alignOffset: 0,
  keepMounted: false,
  elevation: 8,
  animation: 'none',
  dense: false,
  dividers: false,
  rtl: false,
};

const SIDES: PopupSide[] = ['bottom', 'top', 'left', 'right', 'inline-start', 'inline-end'];
const ALIGNS: PopupAlign[] = ['start', 'center', 'end'];
const ELEVATIONS = [0, 1, 4, 8, 16, 24];

const theme = createTheme({});
const rtlTheme = createTheme({ direction: 'rtl' });

// RFC open question "default open/close animation": CSS approximation of the
// classic Grow transition, driven by Base UI's data-starting/ending-style.
const growPopupSx: SxProps<Theme> = {
  transformOrigin: 'var(--transform-origin)',
  transition:
    'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1), transform 225ms cubic-bezier(0.4, 0, 0.2, 1)',
  '&[data-starting-style], &[data-ending-style]': {
    opacity: 0,
    transform: 'scale(0.8, 0.6)',
  },
  '&[data-ending-style]': {
    transitionDuration: '195ms, 195ms',
  },
};

function usePopupKnobProps(settings: PlaygroundSettings) {
  return React.useMemo(
    () => ({
      // Top-level convenience prop (forwards to the Paper slot).
      elevation: settings.elevation,
      ...(settings.animation === 'grow' ? { slotProps: { popup: { sx: growPopupSx } } } : null),
    }),
    [settings.elevation, settings.animation],
  );
}

function PlaygroundDemo({
  settings,
  onLog,
}: {
  settings: PlaygroundSettings;
  onLog: (entry: string) => void;
}) {
  const popupKnobProps = usePopupKnobProps(settings);
  const itemProps = { dense: settings.dense, divider: settings.dividers };
  const submenuTriggerProps = {
    ...itemProps,
    openOnHover: settings.submenusOpenOnHover,
    delay: settings.submenuDelay,
    closeDelay: settings.submenuCloseDelay,
  };
  const submenuPopupProps = { sideOffset: 8, ...popupKnobProps };

  const handleOpenChange: MenuProps['onOpenChange'] = (nextOpen, eventDetails) => {
    onLog(`onOpenChange -> ${nextOpen ? 'open' : 'close'} (reason: ${eventDetails.reason})`);
  };

  const handleOpenChangeComplete: MenuProps['onOpenChangeComplete'] = (nextOpen) => {
    onLog(`onOpenChangeComplete -> ${nextOpen ? 'opened' : 'closed'}`);
  };

  const handleItemClick = (event: React.MouseEvent<HTMLElement>) => {
    onLog(`item click: ${event.currentTarget.textContent}`);
  };

  return (
    <Menu
      modal={settings.modal}
      openOnHover={settings.rootOpenOnHover}
      loopFocus={settings.loopFocus}
      highlightItemOnHover={settings.highlightItemOnHover}
      onOpenChange={handleOpenChange}
      onOpenChangeComplete={handleOpenChangeComplete}
    >
      <Trigger variant="contained" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
        Project
      </Trigger>
      <Popup
        side={settings.side}
        align={settings.align}
        sideOffset={settings.sideOffset}
        alignOffset={settings.alignOffset}
        keepMounted={settings.keepMounted}
        {...popupKnobProps}
      >
        <Group>
          <GroupLabel>Actions</GroupLabel>
          <Item {...itemProps} onClick={handleItemClick}>
            New file
          </Item>
          <Item {...itemProps} onClick={handleItemClick}>
            Duplicate
          </Item>
          <Item {...itemProps} disabled onClick={handleItemClick}>
            Archive (disabled)
          </Item>
        </Group>
        <Separator />

        <SubmenuRoot closeParentOnEsc={settings.closeParentOnEsc}>
          <SubmenuTrigger {...submenuTriggerProps}>
            Share
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </SubmenuTrigger>
          <SubmenuPopup {...submenuPopupProps}>
            <Item {...itemProps} onClick={handleItemClick}>
              Email
            </Item>
            <Item {...itemProps} onClick={handleItemClick}>
              Copy link
            </Item>
            <SubmenuRoot closeParentOnEsc={settings.closeParentOnEsc}>
              <SubmenuTrigger {...submenuTriggerProps}>
                Export as
                <KeyboardArrowRightRoundedIcon fontSize="small" />
              </SubmenuTrigger>
              <SubmenuPopup {...submenuPopupProps}>
                <RadioGroup defaultValue="pdf">
                  <RadioItem {...itemProps} value="pdf">
                    <RadioItemIndicator keepMounted />
                    PDF document
                  </RadioItem>
                  <RadioItem {...itemProps} value="epub">
                    <RadioItemIndicator keepMounted />
                    EPUB publication
                  </RadioItem>
                  <RadioItem {...itemProps} value="markdown">
                    <RadioItemIndicator keepMounted />
                    Markdown
                  </RadioItem>
                </RadioGroup>
              </SubmenuPopup>
            </SubmenuRoot>
          </SubmenuPopup>
        </SubmenuRoot>

        <SubmenuRoot closeParentOnEsc={settings.closeParentOnEsc}>
          <SubmenuTrigger {...submenuTriggerProps}>
            View
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </SubmenuTrigger>
          <SubmenuPopup {...submenuPopupProps}>
            <CheckboxItem {...itemProps} defaultChecked>
              <CheckboxItemIndicator keepMounted />
              Show ruler
            </CheckboxItem>
            <CheckboxItem {...itemProps}>
              <CheckboxItemIndicator keepMounted />
              Show outline
            </CheckboxItem>
          </SubmenuPopup>
        </SubmenuRoot>
        <Separator />

        <Item {...itemProps} selected onClick={handleItemClick}>
          Selected item (visual-only)
        </Item>
        <LinkItem {...itemProps} href="https://mui.com/material-ui/react-menu/">
          Menu documentation
        </LinkItem>
      </Popup>
    </Menu>
  );
}

const parityItems = [
  { label: 'Profile' },
  { label: 'My account', selected: true },
  { label: 'Settings' },
  { label: 'Read-only mode', disabled: true },
  { label: 'Logout' },
] as const;

function ClassicVersusSuccessorDemo({ settings }: { settings: PlaygroundSettings }) {
  const [classicAnchorEl, setClassicAnchorEl] = React.useState<null | HTMLElement>(null);
  const popupKnobProps = usePopupKnobProps(settings);
  const itemProps = { dense: settings.dense, divider: settings.dividers };

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}
          onClick={(event) => setClassicAnchorEl(event.currentTarget)}
        >
          Classic Menu
        </Button>
        <ClassicMenu
          open={Boolean(classicAnchorEl)}
          anchorEl={classicAnchorEl}
          onClose={() => setClassicAnchorEl(null)}
          elevation={settings.elevation}
        >
          {parityItems.map((item) => (
            <ClassicMenuItem
              key={item.label}
              {...itemProps}
              selected={'selected' in item && item.selected}
              disabled={'disabled' in item && item.disabled}
              onClick={() => setClassicAnchorEl(null)}
            >
              {item.label}
            </ClassicMenuItem>
          ))}
        </ClassicMenu>
      </div>
      <Menu>
        <Trigger variant="outlined" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
          Successor
        </Trigger>
        <Popup sideOffset={2} {...popupKnobProps}>
          {parityItems.map((item) => (
            <Item
              key={item.label}
              {...itemProps}
              selected={'selected' in item && item.selected}
              disabled={'disabled' in item && item.disabled}
            >
              {item.label}
            </Item>
          ))}
        </Popup>
      </Menu>
    </Stack>
  );
}

function ControlledAnchorDemo() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenChange: MenuProps['onOpenChange'] = (nextOpen) => {
    if (!nextOpen) {
      setAnchorEl(null);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<MoreVertRoundedIcon fontSize="small" />}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        Open (controlled)
      </Button>
      <Menu open={open} onOpenChange={handleOpenChange}>
        <Popup anchor={anchorEl ?? undefined} sideOffset={4}>
          <Item onClick={() => setAnchorEl(null)}>Profile</Item>
          <Item onClick={() => setAnchorEl(null)}>My account</Item>
          <Item onClick={() => setAnchorEl(null)}>Logout</Item>
        </Popup>
      </Menu>
    </div>
  );
}

const typeaheadEntries = [
  'Argentina',
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Canada',
  'Chile',
  'Colombia',
  'Czechia',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'India',
  'Ireland',
  'Italy',
  'Japan',
  'Lithuania',
  'Mexico',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Poland',
  'Portugal',
  'Spain',
  'Sweden',
  'Switzerland',
  'United Kingdom',
];

function TypeaheadScrollDemo() {
  return (
    <Menu>
      <Trigger variant="outlined" endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}>
        Country
      </Trigger>
      <Popup sideOffset={4} slotProps={{ paper: { sx: { maxHeight: 320, overflow: 'auto' } } }}>
        {typeaheadEntries.map((entry) => (
          <Item key={entry} dense>
            {entry}
          </Item>
        ))}
      </Popup>
    </Menu>
  );
}

function SettingsPanel({
  settings,
  onChange,
}: {
  settings: PlaygroundSettings;
  onChange: React.Dispatch<React.SetStateAction<PlaygroundSettings>>;
}) {
  const setSetting = <Key extends keyof PlaygroundSettings>(
    key: Key,
    value: PlaygroundSettings[Key],
  ) => {
    onChange((currentSettings) => ({ ...currentSettings, [key]: value }));
  };

  const renderCheckbox = (key: keyof PlaygroundSettings, label: string) => (
    <label style={{ display: 'block' }}>
      <input
        type="checkbox"
        checked={settings[key] as boolean}
        onChange={(event) => setSetting(key, event.target.checked as never)}
      />{' '}
      {label}
    </label>
  );

  const renderNumber = (key: keyof PlaygroundSettings, label: string, step = 50) => (
    <label style={{ display: 'block' }}>
      {label}{' '}
      <input
        type="number"
        min={0}
        step={step}
        value={settings[key] as number}
        style={{ width: 64 }}
        onChange={(event) => setSetting(key, Number(event.target.value) as never)}
      />
    </label>
  );

  return (
    <Box
      component="fieldset"
      sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, '& legend + *': { minWidth: 160 } }}
    >
      <legend>Playground knobs</legend>
      <div>
        <strong>Root behavior</strong>
        {renderCheckbox('modal', 'modal')}
        {renderCheckbox('rootOpenOnHover', 'openOnHover (root)')}
        {renderCheckbox('loopFocus', 'loopFocus')}
        {renderCheckbox('highlightItemOnHover', 'highlightItemOnHover')}
      </div>
      <div>
        <strong>Submenus</strong>
        {renderCheckbox('submenusOpenOnHover', 'openOnHover')}
        {renderNumber('submenuDelay', 'delay (ms)')}
        {renderNumber('submenuCloseDelay', 'closeDelay (ms)')}
        {renderCheckbox('closeParentOnEsc', 'closeParentOnEsc')}
      </div>
      <div>
        <strong>Positioning</strong>
        <label style={{ display: 'block' }}>
          side{' '}
          <select
            value={settings.side}
            onChange={(event) => setSetting('side', event.target.value as PopupSide)}
          >
            {SIDES.map((side) => (
              <option key={side} value={side}>
                {side}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: 'block' }}>
          align{' '}
          <select
            value={settings.align}
            onChange={(event) => setSetting('align', event.target.value as PopupAlign)}
          >
            {ALIGNS.map((align) => (
              <option key={align} value={align}>
                {align}
              </option>
            ))}
          </select>
        </label>
        {renderNumber('sideOffset', 'sideOffset', 4)}
        {renderNumber('alignOffset', 'alignOffset', 4)}
        {renderCheckbox('keepMounted', 'keepMounted')}
      </div>
      <div>
        <strong>Appearance (RFC open questions)</strong>
        <label style={{ display: 'block' }}>
          elevation{' '}
          <select
            value={settings.elevation}
            onChange={(event) => setSetting('elevation', Number(event.target.value))}
          >
            {ELEVATIONS.map((elevation) => (
              <option key={elevation} value={elevation}>
                {elevation}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: 'block' }}>
          animation{' '}
          <select
            value={settings.animation}
            onChange={(event) => setSetting('animation', event.target.value as 'none' | 'grow')}
          >
            <option value="none">none (PoC default)</option>
            <option value="grow">CSS Grow approximation</option>
          </select>
        </label>
        {renderCheckbox('dense', 'dense items')}
        {renderCheckbox('dividers', 'item dividers')}
        {renderCheckbox('rtl', 'RTL direction')}
      </div>
    </Box>
  );
}

export default function MenuRfcExperiment() {
  const [settings, setSettings] = React.useState<PlaygroundSettings>(defaultSettings);
  const [log, setLog] = React.useState<string[]>([]);

  const pushLog = React.useCallback((entry: string) => {
    setLog((currentLog) => [...currentLog.slice(-11), entry]);
  }, []);

  const playgroundTheme = settings.rtl ? rtlTheme : theme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head title="Menu RFC playground" description="Base UI-based Menu successor RFC playground" />
      <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
        <Stack spacing={4}>
          <Typography component="h2" variant="h4">
            Menu RFC playground
          </Typography>
          <Typography>
            Companion experiment for the Menu successor RFC. Every knob maps to a prop or an RFC
            open question. See also the{' '}
            <NextLink href="/experiments/menu-preview/">Unstable_Menu2 experiment</NextLink> for
            Tooltip, PreviewCard, and ContextMenu recipes.
          </Typography>

          <SettingsPanel settings={settings} onChange={setSettings} />

          <section>
            <h3 id="playground">Kitchen sink</h3>
            <p>
              Nested submenus (three levels), groups with labels, checkbox and radio items, a
              disabled item, a visual-only selected item, and a link item. All knobs apply.
            </p>
            <ThemeProvider theme={playgroundTheme}>
              <DirectionProvider direction={settings.rtl ? 'rtl' : 'ltr'}>
                <Box dir={settings.rtl ? 'rtl' : 'ltr'}>
                  <PlaygroundDemo settings={settings} onLog={pushLog} />
                </Box>
              </DirectionProvider>
            </ThemeProvider>
            <Box
              component="pre"
              sx={{
                mt: 2,
                p: 1.5,
                minHeight: 96,
                maxHeight: 200,
                overflow: 'auto',
                bgcolor: 'action.hover',
                borderRadius: 1,
                fontSize: 12,
              }}
            >
              {log.length === 0
                ? 'Event log: interact with the menu to see onOpenChange reasons.'
                : log.join('\n')}
            </Box>
            <Button size="small" onClick={() => setLog([])}>
              Clear log
            </Button>
          </section>

          <section>
            <h3 id="classic-parity">Classic vs successor</h3>
            <p>
              The same item set rendered by the classic Menu and the successor, for visual parity
              checks (dense, dividers, selected, disabled, elevation knobs apply to both). Both
              expose a top-level <code>elevation</code> prop; the successor forwards it to the Paper
              slot.
            </p>
            <ClassicVersusSuccessorDemo settings={settings} />
          </section>

          <section>
            <h3 id="controlled-anchor">Classic-style controlled usage</h3>
            <p>
              No Trigger part: external anchor element plus controlled <code>open</code> /{' '}
              <code>onOpenChange</code>, approximating the classic <code>anchorEl</code> pattern.
            </p>
            <ControlledAnchorDemo />
          </section>

          <section>
            <h3 id="typeahead">Typeahead and scrolling</h3>
            <p>
              Open the menu and type to jump between items (for example type &quot;sw&quot;). The
              popup constrains height via <code>slotProps.paper</code>.
            </p>
            <TypeaheadScrollDemo />
          </section>

          <a href="https://base-ui.com/react/components/menu">Base UI Menu API</a>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
