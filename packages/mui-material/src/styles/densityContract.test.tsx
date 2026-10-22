import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import PaginationItem from '@mui/material/PaginationItem';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import TableFooter from '@mui/material/TableFooter';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
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
import Check from '@mui/icons-material/Check';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import enhanceDensity from './enhanceDensity';
import { DEFAULT_SIZING_PX, DEFAULT_STEP_PX, type DensityKey } from './densityScale';

/* eslint-disable vitest/valid-title -- one case per density x component x size, so
   every title is generated from the matrix rather than written out. */

/**
 * The density contract, measured in a real engine: every control's box is a
 * stated function of `touchTarget`, and every glyph of `iconSize`. The
 * expectations are arithmetic on the recipe's own numbers — never the
 * expressions `enhanceDensity` writes — so a hardcoded px passes at
 * one level and fails at the others.
 *
 * Only boxes are asserted here. Padding, margin and gap are design values that
 * move with the mapping; pinning them would make this a change-detector.
 */

/** The ladder's shape comes from the implementation, not a second list. */
type Steps = Record<DensityKey, number>;
type Density = {
  id: string;
  step: Steps;
  touchTarget: number;
  iconSize: number;
  typography: Record<string, Record<string, string | number>>;
};

// The three published recipes, each paired with the type ramp a design system
// would compose alongside it — heights derive from `1lh`, so the ramp is part
// of the contract rather than decoration.
const DENSITIES: Density[] = [
  {
    id: 'high',
    step: { xxSmall: 2, xSmall: 4, small: 8, medium: 12, large: 16, xLarge: 24, xxLarge: 32 },
    touchTarget: 24,
    iconSize: 16,
    typography: {
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
      button: {
        fontSize: '0.75rem',
        lineHeight: '16px',
        textTransform: 'initial',
        letterSpacing: 0,
      },
    },
  },
  {
    // The shipped ladder itself — an input to the enhancer, so it is read from
    // the implementation; the expectations below stay computed independently.
    id: 'medium',
    step: DEFAULT_STEP_PX,
    touchTarget: DEFAULT_SIZING_PX.touchTarget,
    iconSize: DEFAULT_SIZING_PX.iconSize,
    typography: {
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
      button: {
        fontSize: '0.875rem',
        lineHeight: '20px',
        textTransform: 'initial',
        letterSpacing: 0,
      },
    },
  },
  {
    id: 'low',
    step: { xxSmall: 8, xSmall: 12, small: 16, medium: 24, large: 32, xLarge: 48, xxLarge: 64 },
    touchTarget: 44,
    iconSize: 24,
    typography: {
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
  },
];

// Three themes, not one per case: `enhanceDensity` walks the whole emission map.
const THEMES = new Map(
  DENSITIES.map((density) => [
    density.id,
    enhanceDensity(createTheme({ typography: density.typography }), {
      spacing: density.step,
      touchTarget: density.touchTarget,
      iconSize: density.iconSize,
    }),
  ]),
);

/**
 * The used height of the first match. Read off `getComputedStyle` rather than
 * the bounding rect: the rect adds borders the box itself doesn't own — a
 * collapsed table border lands half a pixel on each cell.
 */
const sideOf = (selector: string, axis: Spec['axis'] | 'height' = 'height') => {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`no element for ${selector}`);
  }
  return Math.round(parseFloat(getComputedStyle(element)[axis]) * 100) / 100;
};

type Spec = {
  /** Sizes this family ships; `undefined` renders once, unsized. */
  sizes?: (string | undefined)[];
  render: (size?: any) => React.ReactElement;
  selector: string;
  /**
   * Which computed box property the contract names; height unless stated. A
   * component that declares a floor is asserted on that floor: its used height
   * also answers to the text inside it, which differs between engines.
   */
  axis?: 'width' | 'minWidth' | 'minHeight';
  /** Expected box height in px, from the density's own numbers. */
  height: (density: Density, size: string | undefined) => number;
};

/** The shared control ramp: one step under the box, the box, one step over. */
const ramp = (density: Density, size: string | undefined) => {
  if (size === 'small') {
    return density.touchTarget - density.step.xxSmall;
  }
  if (size === 'large') {
    return density.touchTarget + density.step.small;
  }
  return density.touchTarget;
};

const CONTROLS: Record<string, Spec> = {
  Button: {
    sizes: ['small', 'medium', 'large'],
    render: (size) => <Button size={size}>Label</Button>,
    selector: '.MuiButton-root',
    height: ramp,
  },
  IconButton: {
    sizes: ['small', 'medium', 'large'],
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
    sizes: ['small', 'medium', 'large'],
    render: (size) => (
      <ToggleButton size={size} value="a">
        A
      </ToggleButton>
    ),
    selector: '.MuiToggleButton-root',
    height: ramp,
  },
  PaginationItem: {
    sizes: ['small', 'medium', 'large'],
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
    height: (density) => density.touchTarget,
  },
  Badge: {
    sizes: ['standard', 'dot'],
    render: (variant) => (
      <Badge badgeContent={4} variant={variant} color="primary">
        <Avatar>A</Avatar>
      </Badge>
    ),
    selector: '.MuiBadge-badge',
    height: (density, variant) =>
      variant === 'dot' ? density.step.small : density.touchTarget - density.step.xSmall,
  },
  Fab: {
    // Circular only — the extended variant is width-led, not a box.
    sizes: ['small', 'medium', 'large'],
    render: (size) => (
      <Fab size={size}>
        <AddIcon />
      </Fab>
    ),
    selector: '.MuiFab-root',
    height: (density, size) => {
      if (size === 'small') {
        return density.touchTarget + density.step.xxSmall;
      }
      if (size === 'large') {
        return density.touchTarget + density.step.medium;
      }
      return density.touchTarget + density.step.xSmall;
    },
  },
  Chip: {
    sizes: ['small', 'medium'],
    render: (size) => <Chip size={size} label="Chip" />,
    selector: '.MuiChip-root',
    // Chip authors its own small box; medium sits on the target itself.
    height: (density, size) =>
      size === 'small' ? density.touchTarget - density.step.xxSmall : density.touchTarget,
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
  FilledInput: {
    // Filled keeps room for the floating label; the box contract applies
    // without one.
    sizes: ['small', 'medium'],
    render: (size) => <TextField variant="filled" hiddenLabel size={size} defaultValue="Ada" />,
    selector: '.MuiFilledInput-root',
    height: ramp,
  },
  StandaloneFilledInput: {
    sizes: ['small', 'medium'],
    render: (size) => <FilledInput hiddenLabel size={size} defaultValue="Ada" />,
    selector: '.MuiFilledInput-root',
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
    axis: 'minHeight',
    height: (density) => density.touchTarget,
  },
  Toolbar: {
    sizes: ['regular', 'dense'],
    render: (size) => <Toolbar variant={size}>Title</Toolbar>,
    selector: '.MuiToolbar-root',
    axis: 'minHeight',
    height: (density, size) =>
      size === 'dense'
        ? density.touchTarget + 2 * density.step.xxSmall
        : density.touchTarget + 2 * density.step.xSmall,
  },
  Tabs: {
    render: () => (
      <Tabs value={0}>
        <Tab label="One" />
      </Tabs>
    ),
    selector: '.MuiTabs-root',
    axis: 'minHeight',
    height: (density) => density.touchTarget,
  },
  Tab: {
    render: () => (
      <Tabs value={0}>
        <Tab label="One" />
      </Tabs>
    ),
    selector: '.MuiTab-root',
    axis: 'minHeight',
    height: (density) => density.touchTarget,
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
    height: (density, size) =>
      size === 'small'
        ? density.touchTarget + density.step.xxSmall
        : density.touchTarget + 2 * density.step.xxSmall,
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
    axis: 'minHeight',
    height: (density) => density.touchTarget + density.step.medium,
  },
  BottomNavigation: {
    render: () => (
      <BottomNavigation>
        <BottomNavigationAction label="A" />
      </BottomNavigation>
    ),
    selector: '.MuiBottomNavigation-root',
    height: (density) => density.step.xxLarge,
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
    height: (density) => density.touchTarget,
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
    height: (density) => density.touchTarget,
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
    axis: 'minHeight',
    height: (density) => density.touchTarget,
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
    axis: 'minHeight',
    height: (density) => density.touchTarget,
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
    height: (density) => density.step.medium,
  },
  TabScrollButton: {
    render: () => (
      <Tabs value={0} variant="scrollable" scrollButtons>
        <Tab label="One" />
      </Tabs>
    ),
    selector: '.MuiTabScrollButton-root',
    axis: 'width',
    height: (density) => density.touchTarget,
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
    height: (density) => density.touchTarget,
  },
  MenuItem: {
    render: () => (
      <MenuList>
        <MenuItem>Item</MenuItem>
      </MenuList>
    ),
    selector: '.MuiMenuItem-root',
    axis: 'minHeight',
    height: (density) => density.touchTarget,
  },
  ListItemButton: {
    render: () => <ListItemButton>Item</ListItemButton>,
    selector: '.MuiListItemButton-root',
    axis: 'minHeight',
    height: (density) => density.touchTarget,
  },
};

/** The glyph ramp, read as a used font-size. */
const ICONS: Record<
  string,
  { render: (size: any) => React.ReactElement; expect: (density: Density, size: string) => number }
> = {
  SvgIcon: {
    render: (size) => (
      <SvgIcon fontSize={size}>
        <path d="M0 0h24v24H0z" />
      </SvgIcon>
    ),
    expect: (density, size) => {
      if (size === 'small') {
        return density.iconSize - 2;
      }
      if (size === 'large') {
        return density.iconSize + 4;
      }
      return density.iconSize;
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

  DENSITIES.forEach((density) => {
    describe(density.id, () => {
      Object.entries(ICONS).forEach(([name, spec]) => {
        ['small', 'medium', 'large'].forEach((size) => {
          const title = `${name} ${size}`;
          test(title, () => {
            render(
              <ThemeProvider theme={THEMES.get(density.id)!}>{spec.render(size)}</ThemeProvider>,
            );
            const icon = document.querySelector('.MuiSvgIcon-root') as HTMLElement;
            expect(parseFloat(getComputedStyle(icon).fontSize)).to.equal(
              spec.expect(density, size),
            );
          });
        });
      });
      Object.entries(CONTROLS).forEach(([name, spec]) => {
        const sizes = spec.sizes ?? [undefined];
        sizes.forEach((size) => {
          test(`${name}${size ? ` ${size}` : ''}`, () => {
            render(
              <ThemeProvider theme={THEMES.get(density.id)!}>{spec.render(size)}</ThemeProvider>,
            );
            expect(sideOf(spec.selector, spec.axis)).to.equal(spec.height(density, size));
          });
        });
      });
    });
  });
});

describe.skipIf(isJsdom())('filled input label room', () => {
  const { render } = createRenderer();

  DENSITIES.forEach((density) => {
    (['small', 'medium'] as const).forEach((size) => {
      test(`${density.id} ${size}: a standalone FilledInput matches a labeled TextField`, () => {
        render(
          <ThemeProvider theme={THEMES.get(density.id)!}>
            <FilledInput size={size} defaultValue="Ada" />
            <TextField variant="filled" size={size} label="Label" defaultValue="Ada" />
          </ThemeProvider>,
        );
        const [standalone, field] = document.querySelectorAll('.MuiFilledInput-root');
        expect(standalone.getBoundingClientRect().height).to.equal(
          field.getBoundingClientRect().height,
        );
      });
    });
  });
});

describe.skipIf(isJsdom())('density without the matching input', () => {
  const { render } = createRenderer();
  const plain = createTheme();
  const enhanced = THEMES.get('medium')!;

  function renderBoth(node: React.ReactNode) {
    render(
      <React.Fragment>
        <div data-testid="plain">
          <ThemeProvider theme={plain}>{node}</ThemeProvider>
        </div>
        <div data-testid="enhanced">
          <ThemeProvider theme={enhanced}>{node}</ThemeProvider>
        </div>
      </React.Fragment>,
    );
    const pick = (id: string, selector: string) =>
      document.querySelector(`[data-testid="${id}"] ${selector}`) as HTMLElement;
    return {
      plain: (selector: string) => pick('plain', selector),
      enhanced: (selector: string) => pick('enhanced', selector),
    };
  }

  (['standard', 'filled', 'outlined'] as const).forEach((variant) => {
    (['small', 'medium'] as const).forEach((size) => {
      (variant === 'filled' ? [false, true] : [false]).forEach((shrink) => {
        test(`a ${variant} ${size}${shrink ? ' shrunk' : ''} label keeps master's position when the input does not set it`, () => {
          const { plain: inPlain, enhanced: inEnhanced } = renderBoth(
            <FormControl variant={variant} size={size}>
              <InputLabel shrink={shrink}>Label</InputLabel>
              <InputBase />
            </FormControl>,
          );
          expect(getComputedStyle(inEnhanced('label')).transform).to.equal(
            getComputedStyle(inPlain('label')).transform,
          );
        });
      });
    });
  });

  test('helper text with inline elements flows as text', () => {
    const { plain: inPlain, enhanced: inEnhanced } = renderBoth(
      <TextField
        sx={{ width: 220 }}
        helperText={
          <React.Fragment>
            Use <strong>letters only</strong> and read the <a href="#rules">naming rules</a> before
            you continue.
          </React.Fragment>
        }
      />,
    );
    const linkWidth = (el: HTMLElement) => el.getBoundingClientRect().width;
    expect(linkWidth(inEnhanced('.MuiFormHelperText-root a'))).to.equal(
      linkWidth(inPlain('.MuiFormHelperText-root a')),
    );
  });

  test('DialogContent keeps block padding without a title, and none under one', () => {
    const { enhanced: inEnhanced } = renderBoth(
      <React.Fragment>
        <div data-testid="alone">
          <DialogContent>Body</DialogContent>
        </div>
        <div data-testid="titled">
          <DialogTitle>Title</DialogTitle>
          <DialogContent>Body</DialogContent>
        </div>
      </React.Fragment>,
    );
    const alone = getComputedStyle(inEnhanced('[data-testid="alone"] .MuiDialogContent-root'));
    const titled = getComputedStyle(inEnhanced('[data-testid="titled"] .MuiDialogContent-root'));
    expect(parseFloat(alone.paddingTop)).to.be.greaterThan(0);
    expect(parseFloat(alone.paddingBottom)).to.be.greaterThan(0);
    expect(titled.paddingTop).to.equal('0px');
  });

  test('wrapped TableCell and AccordionSummary content keeps an xxSmall inset', () => {
    const longText = 'A value long enough to wrap onto several lines in a narrow column';
    const { enhanced: inEnhanced } = renderBoth(
      <React.Fragment>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: 120 }}>
                <span data-testid="cell-text">{longText}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Accordion sx={{ width: 200 }}>
          <AccordionSummary>
            <span data-testid="summary-text">{longText}</span>
          </AccordionSummary>
        </Accordion>
      </React.Fragment>,
    );
    const inset = (outer: string, inner: string) => {
      const outerBox = inEnhanced(outer).getBoundingClientRect();
      const innerBox = inEnhanced(inner).getBoundingClientRect();
      return [innerBox.top - outerBox.top, outerBox.bottom - innerBox.bottom];
    };
    const xxSmall = DEFAULT_STEP_PX.xxSmall;
    inset('.MuiTableCell-root', '[data-testid="cell-text"]').forEach((side) => {
      expect(side).to.be.at.least(xxSmall);
    });
    inset('.MuiAccordionSummary-root', '[data-testid="summary-text"]').forEach((side) => {
      expect(side).to.be.at.least(xxSmall);
    });
  });

  test('CardActions keeps top padding below a CardMedia', () => {
    const { enhanced: inEnhanced } = renderBoth(
      <Card>
        <CardMedia sx={{ height: 40 }} />
        <CardActions>
          <Button>Share</Button>
        </CardActions>
      </Card>,
    );
    expect(
      parseFloat(getComputedStyle(inEnhanced('.MuiCardActions-root')).paddingTop),
    ).to.be.greaterThan(0);
  });
});

describe.skipIf(isJsdom())('Autocomplete matches TextField', () => {
  const { render } = createRenderer();
  const cases = [
    ...(['outlined', 'filled', 'standard'] as const).flatMap((variant) =>
      (['small', 'medium'] as const).map((size) => ({ variant, size })),
    ),
  ];

  DENSITIES.forEach((density) => {
    cases.forEach(({ variant, size }) => {
      test(`${density.id} ${variant} ${size}: same height`, () => {
        render(
          <ThemeProvider theme={THEMES.get(density.id)!}>
            <div data-testid="autocomplete">
              <Autocomplete
                options={['One', 'Two']}
                size={size}
                defaultValue="One"
                renderInput={(params) => <TextField {...params} variant={variant} label="Label" />}
              />
            </div>
            <div data-testid="textfield">
              <TextField variant={variant} size={size} label="Label" defaultValue="One" />
            </div>
          </ThemeProvider>,
        );
        const height = (id: string) =>
          (
            document.querySelector(`[data-testid="${id}"] .MuiInputBase-root`) as HTMLElement
          ).getBoundingClientRect().height;
        expect(height('autocomplete')).to.be.closeTo(height('textfield'), 0.5);
      });
    });
  });
});

describe.skipIf(isJsdom())('Autocomplete end buttons', () => {
  const { render } = createRenderer();

  DENSITIES.forEach((density) => {
    (['outlined', 'filled', 'standard'] as const).forEach((variant) => {
      [false, true].forEach((disableClearable) => {
        test(`${density.id} ${variant}${disableClearable ? ' popup only' : ''}: text stops before the buttons`, () => {
          render(
            <ThemeProvider theme={THEMES.get(density.id)!}>
              <Autocomplete
                sx={{ width: 300 }}
                options={['A long option value that fills the field']}
                defaultValue="A long option value that fills the field"
                disableClearable={disableClearable}
                renderInput={(params) => <TextField {...params} variant={variant} label="Label" />}
              />
            </ThemeProvider>,
          );
          const input = document.querySelector('.MuiAutocomplete-input') as HTMLElement;
          const textEnd =
            input.getBoundingClientRect().right - parseFloat(getComputedStyle(input).paddingRight);
          const buttons = (
            document.querySelector('.MuiAutocomplete-endAdornment') as HTMLElement
          ).getBoundingClientRect();
          expect(textEnd).to.be.at.most(buttons.left + 0.5);
        });
      });
    });
  });
});

describe.skipIf(isJsdom())('menu inset rows', () => {
  const { render } = createRenderer();
  const themes: [string, ReturnType<typeof enhanceDensity>][] = [
    ...DENSITIES.map((density): [string, ReturnType<typeof enhanceDensity>] => [
      density.id,
      THEMES.get(density.id)!,
    ]),
    ...(['1.5', '22px', 'normal'] as const).map(
      (lineHeight): [string, ReturnType<typeof enhanceDensity>] => [
        `body2 lineHeight ${lineHeight}`,
        enhanceDensity(createTheme({ typography: { body2: { lineHeight } } })),
      ],
    ),
  ];

  themes.forEach(([name, theme]) => {
    [false, true].forEach((dense) => {
      test(`${name}${dense ? ' dense' : ''}: inset text and inset divider line up with the icon row text`, () => {
        render(
          <ThemeProvider theme={theme}>
            <MenuList dense={dense} sx={{ fontFamily: 'serif', fontSize: 16, lineHeight: 1.5 }}>
              <MenuItem data-testid="inset">
                <ListItemText inset>Single</ListItemText>
              </MenuItem>
              <MenuItem data-testid="icon">
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
                <ListItemText>Custom</ListItemText>
              </MenuItem>
              <Divider variant="inset" component="li" />
            </MenuList>
          </ThemeProvider>,
        );
        const left = (selector: string) =>
          (document.querySelector(selector) as HTMLElement).getBoundingClientRect().left;
        const iconText = left('[data-testid="icon"] .MuiListItemText-root');
        expect(left('[data-testid="inset"] .MuiTypography-root')).to.be.closeTo(iconText, 0.5);
        expect(left('.MuiDivider-root')).to.be.closeTo(iconText, 0.5);
      });
    });
  });
});

describe.skipIf(isJsdom())('density with modularCssLayers', () => {
  const { render } = createRenderer();
  const unlayered = THEMES.get('medium')!;
  const layered = enhanceDensity(createTheme({ modularCssLayers: true }));

  const cases: Record<string, { node: React.ReactNode; selector: string; property: string }[]> = {
    'Select caret padding': [
      {
        node: (
          <Select value="a" sx={{ width: 160 }}>
            <MenuItem value="a">A long selected option</MenuItem>
          </Select>
        ),
        selector: '.MuiSelect-select',
        property: 'padding-right',
      },
    ],
    'DialogContent under a DialogTitle': [
      {
        node: (
          <div>
            <DialogTitle>Title</DialogTitle>
            <DialogContent>Body</DialogContent>
          </div>
        ),
        selector: '.MuiDialogContent-root',
        property: 'padding-top',
      },
    ],
    'Chip avatar and delete icon': (['small', 'medium'] as const).flatMap((size) => [
      {
        node: <Chip size={size} avatar={<Avatar>M</Avatar>} label="Chip" onDelete={() => {}} />,
        selector: '.MuiChip-avatar',
        property: 'font-size',
      },
      {
        node: <Chip size={size} label="Chip" onDelete={() => {}} />,
        selector: '.MuiChip-deleteIcon',
        property: 'font-size',
      },
    ]),
    'TablePagination cell and toolbar padding': ['padding-right', 'padding-left'].flatMap(
      (property) =>
        ['.MuiTablePagination-root', '.MuiTablePagination-toolbar'].map((selector) => ({
          node: (
            <Table>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={100}
                    page={0}
                    rowsPerPage={10}
                    onPageChange={() => {}}
                    onRowsPerPageChange={() => {}}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          ),
          selector,
          property,
        })),
    ),
    'Pagination icon': (['small', 'medium', 'large'] as const).map((size) => ({
      node: <Pagination size={size} count={3} />,
      selector: '.MuiPaginationItem-icon',
      property: 'font-size',
    })),
  };

  Object.entries(cases).forEach(([title, list]) => {
    test(`${title} renders the same with and without layers`, () => {
      list.forEach(({ node, selector, property }) => {
        const { unmount } = render(
          <React.Fragment>
            <div data-testid="unlayered">
              <ThemeProvider theme={unlayered}>{node}</ThemeProvider>
            </div>
            <div data-testid="layered">
              <ThemeProvider theme={layered}>{node}</ThemeProvider>
            </div>
          </React.Fragment>,
        );
        const read = (id: string) =>
          getComputedStyle(
            document.querySelector(`[data-testid="${id}"] ${selector}`) as HTMLElement,
          ).getPropertyValue(property);
        expect(read('layered'), `${selector} ${property}`).to.equal(read('unlayered'));
        unmount();
      });
    });
  });
});

describe.skipIf(isJsdom())('density and user overrides', () => {
  const { render } = createRenderer();
  const theme = THEMES.get('medium')!;
  const label = () => document.querySelector('[data-testid="label"]') as HTMLElement;

  test('Alert icon and action styleOverrides win over density', () => {
    const overridden = enhanceDensity(
      createTheme({
        components: {
          MuiAlert: {
            styleOverrides: { icon: { paddingTop: 20 }, action: { paddingTop: 20 } },
          },
        },
      }),
    );
    render(
      <ThemeProvider theme={overridden}>
        <Alert onClose={() => {}}>Message</Alert>
      </ThemeProvider>,
    );
    const paddingTop = (selector: string) =>
      getComputedStyle(document.querySelector(selector) as HTMLElement).paddingTop;
    expect(paddingTop('.MuiAlert-icon')).to.equal('20px');
    expect(paddingTop('.MuiAlert-action')).to.equal('20px');
  });

  test('a control pulls its label in through the label root', () => {
    render(
      <ThemeProvider theme={theme}>
        <FormControlLabel data-testid="label" control={<Checkbox />} label="a" />
      </ThemeProvider>,
    );
    expect(parseFloat(getComputedStyle(label()).marginLeft)).to.equal(
      -(DEFAULT_SIZING_PX.touchTarget - DEFAULT_SIZING_PX.iconSize) / 2,
    );
  });

  test('sx on the label wins over the pull-in', () => {
    render(
      <ThemeProvider theme={theme}>
        <FormControlLabel data-testid="label" sx={{ ml: 0 }} control={<Checkbox />} label="a" />
      </ThemeProvider>,
    );
    expect(getComputedStyle(label()).marginLeft).to.equal('0px');
  });

  test('a styleOverrides margin on the label wins over the pull-in', () => {
    const custom = enhanceDensity(
      createTheme({
        components: { MuiFormControlLabel: { styleOverrides: { root: { marginLeft: 4 } } } },
      }),
    );
    render(
      <ThemeProvider theme={custom}>
        <FormControlLabel data-testid="label" control={<Checkbox />} label="a" />
      </ThemeProvider>,
    );
    expect(getComputedStyle(label()).marginLeft).to.equal('4px');
  });

  test('a Switch inside a label keeps its offset and a user margin still wins', () => {
    render(
      <ThemeProvider theme={theme}>
        <FormControlLabel data-testid="plain" control={<Switch />} label="a" />
        <FormControlLabel data-testid="with-sx" control={<Switch sx={{ ml: 0 }} />} label="b" />
      </ThemeProvider>,
    );
    // `data-testid` on a Switch lands on its inner SwitchBase, so read the root
    // through the label.
    const root = (id: string) =>
      document.querySelector(`[data-testid="${id}"] .MuiSwitch-root`) as HTMLElement;
    expect(parseFloat(getComputedStyle(root('plain')).marginLeft)).to.be.lessThan(0);
    expect(getComputedStyle(root('with-sx')).marginLeft).to.equal('0px');
  });
});
