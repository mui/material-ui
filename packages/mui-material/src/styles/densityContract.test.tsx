import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
import PaginationItem from '@mui/material/PaginationItem';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import SvgIcon from '@mui/material/SvgIcon';
import ButtonGroup from '@mui/material/ButtonGroup';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Autocomplete from '@mui/material/Autocomplete';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LinearProgress from '@mui/material/LinearProgress';
import Slider from '@mui/material/Slider';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import enhanceDensity from './enhanceDensity';
import { DEFAULT_SIZING_PX, DEFAULT_STEP_PX, type DensityKey } from './densityScale';

/* eslint-disable vitest/valid-title -- one case per level x component x size, so
   every title is generated from the matrix rather than written out. */

/**
 * The density contract, measured in a real engine: every control's box is a
 * stated function of `touchTarget`, and every glyph of `iconSize`. The
 * expectations are arithmetic on the recipe's own numbers — never the
 * expressions `sharedDensityComponents` writes — so a hardcoded px passes at
 * one level and fails at the others.
 *
 * Only boxes are asserted here. Padding, margin and gap are design values that
 * move with the mapping; pinning them would make this a change-detector.
 */

/** The ladder's shape comes from the implementation, not a second list. */
type Steps = Record<DensityKey, number>;
type Level = {
  id: string;
  step: Steps;
  touchTarget: number;
  iconSize: number;
  typography: Record<string, Record<string, string | number>>;
};

const level = (
  id: string,
  step: Steps,
  touchTarget: number,
  iconSize: number,
  typography: Record<string, Record<string, string | number>>,
): Level => ({ id, step, touchTarget, iconSize, typography });

// The three published recipes, each paired with the type ramp a design system
// would compose alongside it — heights derive from `1lh`, so the ramp is part
// of the contract rather than decoration.
const LEVELS: Level[] = [
  level(
    'high',
    { xxSmall: 2, xSmall: 4, small: 8, medium: 12, large: 16, xLarge: 24, xxLarge: 32 },
    24,
    16,
    {
      h1: { fontSize: '1.5rem', lineHeight: '30px' },
      h2: { fontSize: '1.25rem', lineHeight: '26px' },
      h3: { fontSize: '0.875rem', lineHeight: '22px' },
      h4: { fontSize: '0.8125rem', lineHeight: '20px' },
      h5: { fontSize: '0.75rem', lineHeight: '18px' },
      h6: { fontSize: '0.6875rem', lineHeight: '16px' },
      subtitle1: { fontSize: '0.75rem', lineHeight: '18px' },
      subtitle2: { fontSize: '0.6875rem', lineHeight: '16px' },
      body1: { fontSize: '0.75rem', lineHeight: '16px' },
      body2: { fontSize: '0.6875rem', lineHeight: '14px' },
      caption: { fontSize: '0.6875rem', lineHeight: '14px' },
      button: { fontSize: '0.75rem', lineHeight: '16px', textTransform: 'initial', letterSpacing: 0 },
    },
  ),
  level(
    // The shipped ladder itself — an input to the enhancer, so it is read from
    // the implementation; the expectations below stay computed independently.
    'medium',
    DEFAULT_STEP_PX,
    DEFAULT_SIZING_PX.touchTarget,
    DEFAULT_SIZING_PX.iconSize,
    {
      h1: { fontSize: '1.75rem', lineHeight: '36px' },
      h2: { fontSize: '1.5rem', lineHeight: '30px' },
      h3: { fontSize: '1rem', lineHeight: '26px' },
      h4: { fontSize: '0.9375rem', lineHeight: '24px' },
      h5: { fontSize: '0.875rem', lineHeight: '22px' },
      h6: { fontSize: '0.8125rem', lineHeight: '20px' },
      subtitle1: { fontSize: '0.875rem', lineHeight: '22px' },
      subtitle2: { fontSize: '0.8125rem', lineHeight: '20px' },
      body1: { fontSize: '0.875rem', lineHeight: '20px' },
      body2: { fontSize: '0.8125rem', lineHeight: '18px' },
      caption: { fontSize: '0.75rem', lineHeight: '16px' },
      button: { fontSize: '0.875rem', lineHeight: '20px', textTransform: 'initial', letterSpacing: 0 },
    },
  ),
  level(
    'low',
    { xxSmall: 8, xSmall: 12, small: 16, medium: 24, large: 32, xLarge: 48, xxLarge: 64 },
    44,
    24,
    {
      h1: { fontSize: '1.875rem', lineHeight: '38px' },
      h2: { fontSize: '1.625rem', lineHeight: '32px' },
      h3: { fontSize: '1.25rem', lineHeight: '28px' },
      h4: { fontSize: '1.125rem', lineHeight: '26px' },
      h5: { fontSize: '1rem', lineHeight: '24px' },
      h6: { fontSize: '0.9375rem', lineHeight: '22px' },
      subtitle1: { fontSize: '1rem', lineHeight: '24px' },
      subtitle2: { fontSize: '0.9375rem', lineHeight: '22px' },
      body1: { fontSize: '1rem', lineHeight: '22px' },
      body2: { fontSize: '0.9375rem', lineHeight: '20px' },
      caption: { fontSize: '0.875rem', lineHeight: '20px' },
      button: { fontSize: '1rem', lineHeight: '22px', textTransform: 'initial', letterSpacing: 0 },
    },
  ),
];

const themeFor = (l: Level) =>
  enhanceDensity(createTheme({ typography: l.typography, shape: { borderRadius: 4 } }), {
    spacing: l.step,
    touchTarget: l.touchTarget,
    iconSize: l.iconSize,
  });

// Three themes, not one per case: `enhanceDensity` walks the whole emission map.
const THEMES = new Map(LEVELS.map((l) => [l.id, themeFor(l)]));

/**
 * The used height of the first match. Read off `getComputedStyle` rather than
 * the bounding rect: the rect adds borders the box itself doesn't own — a
 * collapsed table border lands half a pixel on each cell.
 */
const sideOf = (selector: string, axis: Spec['axis'] | 'height' = 'height') => {
  const el = document.querySelector(selector);
  if (!el) {
    throw new Error(`no element for ${selector}`);
  }
  return Math.round(parseFloat(getComputedStyle(el)[axis]) * 100) / 100;
};

type Spec = {
  /** Sizes this family ships; `undefined` renders once, unsized. */
  sizes?: (string | undefined)[];
  render: (size?: any) => React.ReactElement;
  selector: string;
  /** Which computed box property the contract names; height unless stated. */
  axis?: 'width' | 'minWidth' | 'minHeight';
  /** Expected box height in px, from the level's own numbers. */
  height: (l: Level, size: string | undefined) => number;
};

const SIZED = ['small', 'medium', 'large'];
/** The shared control ramp: one step under the box, the box, one step over. */
const ramp = (l: Level, size: string | undefined) => {
  if (size === 'small') {
    return l.touchTarget - l.step.xxSmall;
  }
  if (size === 'large') {
    return l.touchTarget + l.step.small;
  }
  return l.touchTarget;
};

const CONTROLS: Record<string, Spec> = {
  Button: {
    sizes: SIZED,
    render: (size) => <Button size={size}>Label</Button>,
    selector: '.MuiButton-root',
    height: ramp,
  },
  IconButton: {
    sizes: SIZED,
    render: (size) => (
      <IconButton size={size}>
        <AddIcon />
      </IconButton>
    ),
    selector: '.MuiIconButton-root',
    height: ramp,
  },
  Checkbox: {
    sizes: ['small', 'medium'],
    render: (size) => <Checkbox size={size} />,
    selector: '.MuiCheckbox-root',
    height: ramp,
  },
  Radio: {
    sizes: ['small', 'medium'],
    render: (size) => <Radio size={size} />,
    selector: '.MuiRadio-root',
    height: ramp,
  },
  ToggleButton: {
    sizes: SIZED,
    render: (size) => (
      <ToggleButton size={size} value="a">
        A
      </ToggleButton>
    ),
    selector: '.MuiToggleButton-root',
    height: ramp,
  },
  PaginationItem: {
    sizes: SIZED,
    render: (size) => <PaginationItem size={size} page={1} />,
    selector: '.MuiPaginationItem-root',
    height: ramp,
  },
  Switch: {
    sizes: ['small', 'medium'],
    render: (size) => <Switch size={size} />,
    selector: '.MuiSwitch-root',
    height: ramp,
  },
  Avatar: {
    render: () => <Avatar>A</Avatar>,
    selector: '.MuiAvatar-root',
    height: (l) => l.touchTarget,
  },
  Fab: {
    // Circular only — the extended variant is width-led, not a box.
    sizes: SIZED,
    render: (size) => (
      <Fab size={size}>
        <AddIcon />
      </Fab>
    ),
    selector: '.MuiFab-root',
    height: (l, size) => {
      if (size === 'small') {
        return l.step.large + l.step.small;
      }
      if (size === 'large') {
        return l.step.xxLarge + l.step.xxSmall;
      }
      return l.touchTarget + l.step.xSmall;
    },
  },
  Chip: {
    sizes: ['small', 'medium'],
    render: (size) => <Chip size={size} label="Chip" />,
    selector: '.MuiChip-root',
    // Chip authors its own small box; medium sits on the target itself.
    height: (l, size) => (size === 'small' ? l.touchTarget - l.step.xxSmall : l.touchTarget),
  },

  // --- input boxes: the headline claim is that every variant lands on one box
  InputBase: {
    sizes: ['small', 'medium'],
    render: (size) => <InputBase size={size} defaultValue="Ada" />,
    selector: '.MuiInputBase-root',
    height: ramp,
  },
  Input: {
    sizes: ['small', 'medium'],
    render: (size) => <TextField variant="standard" size={size} defaultValue="Ada" />,
    selector: '.MuiInput-root',
    height: ramp,
  },
  OutlinedInput: {
    sizes: ['small', 'medium'],
    render: (size) => <TextField variant="outlined" size={size} defaultValue="Ada" />,
    selector: '.MuiOutlinedInput-root',
    height: ramp,
  },
  Select: {
    sizes: ['small', 'medium'],
    render: (size) => (
      <Select variant="outlined" size={size} value="a">
        <MenuItem value="a">a</MenuItem>
      </Select>
    ),
    selector: '.MuiOutlinedInput-root',
    height: ramp,
  },

  // --- declared heights: boxes that are not the interactive target
  AccordionSummary: {
    render: () => (
      <Accordion>
        <AccordionSummary>Summary</AccordionSummary>
      </Accordion>
    ),
    selector: '.MuiAccordionSummary-root',
    height: (l) => l.touchTarget,
  },
  Toolbar: {
    sizes: ['regular', 'dense'],
    render: (size) => <Toolbar variant={size}>Title</Toolbar>,
    selector: '.MuiToolbar-root',
    height: (l, size) =>
      size === 'dense' ? l.touchTarget + 2 * l.step.xxSmall : l.touchTarget + 2 * l.step.xSmall,
  },
  Tabs: {
    render: () => (
      <Tabs value={0}>
        <Tab label="One" />
      </Tabs>
    ),
    selector: '.MuiTabs-root',
    height: (l) => l.touchTarget,
  },
  Tab: {
    render: () => (
      <Tabs value={0}>
        <Tab label="One" />
      </Tabs>
    ),
    selector: '.MuiTab-root',
    height: (l) => l.touchTarget,
  },
  TableCell: {
    sizes: ['small', 'medium'],
    render: (size) => (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell size={size}>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    selector: '.MuiTableCell-root',
    height: (l, size) =>
      size === 'small' ? l.step.large + l.step.xxSmall : l.step.xLarge + l.step.xSmall,
  },
  TablePagination: {
    render: () => (
      <Table>
        <TableBody>
          <TableRow>
            <TablePagination count={1} page={0} rowsPerPage={10} onPageChange={() => {}} />
          </TableRow>
        </TableBody>
      </Table>
    ),
    selector: '.MuiTablePagination-toolbar',
    height: (l) => l.touchTarget + l.step.medium,
  },
  BottomNavigation: {
    render: () => (
      <BottomNavigation>
        <BottomNavigationAction label="A" />
      </BottomNavigation>
    ),
    selector: '.MuiBottomNavigation-root',
    height: (l) => l.step.xxLarge,
  },

  // --- boxes outside the control ramp
  ButtonGroup: {
    render: () => (
      <ButtonGroup>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    ),
    selector: '.MuiButtonGroup-grouped',
    axis: 'minWidth',
    height: (l) => l.touchTarget,
  },
  Breadcrumbs: {
    // `maxItems` forces the collapsed button, which is the box density sizes.
    render: () => (
      <Breadcrumbs maxItems={2}>
        <span>One</span>
        <span>Two</span>
        <span>Three</span>
        <span>Four</span>
      </Breadcrumbs>
    ),
    selector: `.MuiBreadcrumbs-ol li > .MuiButtonBase-root`,
    height: (l) => l.touchTarget,
  },
  Autocomplete: {
    render: () => (
      <Autocomplete
        open
        options={['One', 'Two']}
        renderInput={(params) => <TextField {...params} />}
      />
    ),
    selector: '.MuiAutocomplete-option',
    height: (l) => l.touchTarget,
  },
  StepLabel: {
    render: () => (
      <Stepper activeStep={0}>
        <Step>
          <StepLabel>One</StepLabel>
        </Step>
      </Stepper>
    ),
    selector: '.MuiStepLabel-iconContainer',
    height: (l) => l.touchTarget,
  },
  StepConnector: {
    render: () => (
      <Stepper orientation="vertical" activeStep={0}>
        <Step>
          <StepLabel>One</StepLabel>
        </Step>
        <Step>
          <StepLabel>Two</StepLabel>
        </Step>
      </Stepper>
    ),
    selector: '.MuiStepConnector-line',
    height: (l) => l.step.medium,
  },
  TabScrollButton: {
    render: () => (
      <Tabs value={0} variant="scrollable" scrollButtons>
        <Tab label="One" />
      </Tabs>
    ),
    selector: '.MuiTabScrollButton-root',
    axis: 'width',
    height: (l) => l.touchTarget,
  },
  LinearProgress: {
    // A fixed bar thickness, not a scale step — asserted so it stays deliberate.
    render: () => <LinearProgress />,
    selector: '.MuiLinearProgress-root',
    height: () => 4,
  },
  Slider: {
    render: () => <Slider value={50} />,
    selector: '.MuiSlider-root',
    height: (l) => l.touchTarget,
  },
  MenuItem: {
    render: () => (
      <MenuList>
        <MenuItem>Item</MenuItem>
      </MenuList>
    ),
    selector: '.MuiMenuItem-root',
    height: (l) => l.touchTarget,
  },
  ListItemButton: {
    render: () => <ListItemButton>Item</ListItemButton>,
    selector: '.MuiListItemButton-root',
    height: (l) => l.touchTarget,
  },
};

/** The glyph ramp, read as a used font-size. */
const ICONS: Record<
  string,
  { render: (size: any) => React.ReactElement; expect: (l: Level, size: string) => number }
> = {
  SvgIcon: {
    render: (size) => (
      <SvgIcon fontSize={size}>
        <path d="M0 0h24v24H0z" />
      </SvgIcon>
    ),
    expect: (l, size) => {
      if (size === 'small') {
        return l.iconSize - 2;
      }
      if (size === 'large') {
        return l.iconSize + 4;
      }
      return l.iconSize;
    },
  },
};

/** Properties that state a box rather than space one. */
const BOX_PROPS = ['height', 'minHeight', 'width', 'minWidth', '--_size', '--_height'];

/** `0`, `auto` and the like reset a box; they don't claim one. */
const claimsABox = (value: unknown) =>
  value !== 0 && value !== 'auto' && value !== '0' && value !== 'none' && value !== '100%';

/** Does anything in this component's emission set a box? Walks nested variants,
 * selectors and slots, since a size variant is where most boxes are written. */
function emitsABox(node: unknown): boolean {
  if (Array.isArray(node)) {
    return node.some(emitsABox);
  }
  if (node === null || typeof node !== 'object') {
    return false;
  }
  return Object.entries(node as Record<string, unknown>).some(([key, value]) => {
    if (BOX_PROPS.includes(key)) {
      return claimsABox(value);
    }
    return emitsABox(value);
  });
}

describe.skipIf(isJsdom())('density contract', () => {
  const { render } = createRenderer();

  test('every component that sizes a box has a spec', () => {
    const components = (THEMES.get('medium')!.components ?? {}) as Record<string, any>;
    const asserted = new Set([
      ...Object.keys(CONTROLS).map((name) => `Mui${name}`),
      ...Object.keys(ICONS).map((name) => `Mui${name}`),
    ]);
    // Derived, not listed: a component that gains a height starts owing a spec
    // the moment it emits one, which a hand-kept exemption list would not catch.
    const unmeasured = Object.entries(components)
      .filter(([name, value]) => !asserted.has(name) && emitsABox(value?.styleOverrides))
      .map(([name]) => name);
    expect(unmeasured).to.deep.equal([]);
  });

  LEVELS.forEach((l) => {
    describe(l.id, () => {
      Object.entries(ICONS).forEach(([name, spec]) => {
        SIZED.forEach((size) => {
          const title = `${name} ${size}`;
          test(title, () => {
            render(<ThemeProvider theme={THEMES.get(l.id)!}>{spec.render(size)}</ThemeProvider>);
            const el = document.querySelector('.MuiSvgIcon-root') as HTMLElement;
            expect(parseFloat(getComputedStyle(el).fontSize)).to.equal(spec.expect(l, size));
          });
        });
      });
      Object.entries(CONTROLS).forEach(([name, spec]) => {
        const sizes = spec.sizes ?? [undefined];
        sizes.forEach((size) => {
          test(`${name}${size ? ` ${size}` : ''}`, () => {
            render(<ThemeProvider theme={THEMES.get(l.id)!}>{spec.render(size)}</ThemeProvider>);
            expect(sideOf(spec.selector, spec.axis)).to.equal(spec.height(l, size));
          });
        });
      });
    });
  });
});
