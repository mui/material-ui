/* eslint-disable no-restricted-syntax, no-console */
import * as fs from 'fs';
import * as path from 'path';

const componentAreas: Record<string, string> = {
  Accordion: 'surfaces',
  AccordionActions: 'surfaces',
  AccordionDetails: 'surfaces',
  AccordionSummary: 'surfaces',
  Alert: 'feedback',
  AlertTitle: 'feedback',
  AppBar: 'surfaces',
  Autocomplete: 'inputs',
  Avatar: 'dataDisplay',
  AvatarGroup: 'dataDisplay',
  Backdrop: 'feedback',
  Badge: 'dataDisplay',
  BottomNavigation: 'navigation',
  BottomNavigationAction: 'navigation',
  Box: 'layout',
  Breadcrumbs: 'navigation',
  Button: 'inputs',
  ButtonBase: 'inputs',
  ButtonGroup: 'inputs',
  Card: 'surfaces',
  CardActionArea: 'surfaces',
  CardActions: 'surfaces',
  CardContent: 'surfaces',
  CardHeader: 'surfaces',
  CardMedia: 'surfaces',
  Checkbox: 'inputs',
  Chip: 'dataDisplay',
  CircularProgress: 'feedback',
  ClickAwayListener: 'utils',
  Collapse: 'utils',
  Container: 'layout',
  CssBaseline: 'utils',
  Dialog: 'feedback',
  DialogActions: 'feedback',
  DialogContent: 'feedback',
  DialogContentText: 'feedback',
  DialogTitle: 'feedback',
  Divider: 'dataDisplay',
  Drawer: 'navigation',
  Fab: 'inputs',
  Fade: 'utils',
  FilledInput: 'inputs',
  FormControl: 'inputs',
  FormControlLabel: 'inputs',
  FormGroup: 'inputs',
  FormHelperText: 'inputs',
  FormLabel: 'inputs',
  GlobalStyles: 'utils',
  Grid: 'layout',
  Grow: 'utils',
  Hidden: 'layout',
  Icon: 'dataDisplay',
  IconButton: 'inputs',
  ImageList: 'layout',
  ImageListItem: 'layout',
  ImageListItemBar: 'layout',
  Input: 'inputs',
  InputAdornment: 'inputs',
  InputBase: 'inputs',
  InputLabel: 'inputs',
  LinearProgress: 'feedback',
  Link: 'navigation',
  List: 'dataDisplay',
  ListItem: 'dataDisplay',
  ListItemAvatar: 'dataDisplay',
  ListItemButton: 'dataDisplay',
  ListItemIcon: 'dataDisplay',
  ListItemSecondaryAction: 'dataDisplay',
  ListItemText: 'dataDisplay',
  ListSubheader: 'dataDisplay',
  Menu: 'navigation',
  MenuItem: 'navigation',
  MenuList: 'navigation',
  MobileStepper: 'navigation',
  Modal: 'utils',
  NativeSelect: 'inputs',
  NoSsr: 'utils',
  OutlinedInput: 'inputs',
  Pagination: 'navigation',
  PaginationItem: 'navigation',
  Paper: 'surfaces',
  Popover: 'utils',
  Popper: 'utils',
  Portal: 'utils',
  Radio: 'inputs',
  RadioGroup: 'inputs',
  Rating: 'inputs',
  ScopedCssBaseline: 'utils',
  Select: 'inputs',
  MultiSelect: 'inputs',
  Skeleton: 'feedback',
  Slide: 'utils',
  Slider: 'inputs',
  Snackbar: 'feedback',
  SnackbarContent: 'feedback',
  SpeedDial: 'navigation',
  SpeedDialAction: 'navigation',
  SpeedDialIcon: 'navigation',
  Stack: 'layout',
  Step: 'navigation',
  StepButton: 'navigation',
  StepConnector: 'navigation',
  StepContent: 'navigation',
  StepIcon: 'navigation',
  StepLabel: 'navigation',
  Stepper: 'navigation',
  SvgIcon: 'dataDisplay',
  SwipeableDrawer: 'navigation',
  Switch: 'inputs',
  Tab: 'navigation',
  TabPanel: 'navigation',
  TabsList: 'navigation',
  TabList: 'navigation',
  Table: 'dataDisplay',
  TableBody: 'dataDisplay',
  TableCell: 'dataDisplay',
  TableContainer: 'dataDisplay',
  TableFooter: 'dataDisplay',
  TableHead: 'dataDisplay',
  TablePagination: 'dataDisplay',
  TableRow: 'dataDisplay',
  TableSortLabel: 'dataDisplay',
  Tabs: 'navigation',
  TabScrollButton: 'navigation',
  TextareaAutosize: 'utils',
  Textarea: 'inputs',
  TextField: 'inputs',
  ToggleButton: 'inputs',
  ToggleButtonGroup: 'inputs',
  Toolbar: 'surfaces',
  Tooltip: 'dataDisplay',
  transitions: 'utils',
  TrapFocus: 'utils',
  Typography: 'dataDisplay',
  Unstable_Grid2: 'layout',
  Unstable_TrapFocus: 'utils',
  MediaQuery: 'utils',
  ScrollTrigger: 'surfaces',
  TouchRipple: 'inputs',
  Zoom: 'utils',
  Listbox: 'utils',
  Option: 'inputs',
  OptionGroup: 'inputs',
  AspectRatio: 'dataDisplay',
  CardCover: 'surfaces',
  CardOverflow: 'surfaces',
  ChipDelete: 'dataDisplay',
  ListDivider: 'dataDisplay',
  ListItemContent: 'dataDisplay',
  ListItemDecorator: 'dataDisplay',
  Sheet: 'surfaces',
};

const areaMaintainers: Record<string, string[]> = {
  inputs: ['michaldudak', 'mnajdova'],
  dataDisplay: ['siriwatknp', 'michaldudak'],
  feedback: ['siriwatknp', 'hbjORbj'],
  surfaces: ['siriwatknp', 'hbjORbj'],
  navigation: ['mnajdova', 'michaldudak'],
  layout: ['siriwatknp', 'hbjORbj'],
  utils: ['mnajdova', 'michaldudak'],
};

const packageOwners = {
  'mui-base': ['michaldudak'],
  'mui-joy': ['siriwatknp'],
  'mui-material': ['mnajdova'],
};

type Package = keyof typeof packageOwners;

const packageMaintainers = {
  'mui-base': ['michaldudak', 'mnajdova'],
  'mui-icons-material': ['michaldudak', 'siriwatknp'],
  'mui-joy': ['siriwatknp', 'danilo-leal'],
  'mui-material': ['mnajdova', 'danilo-leal'],
  'mui-system': ['mnajdova', 'siriwatknp'],
};

const additionalRules = {
  '/scripts/': ['michaldudak', 'm4theushw'],
};

const buffer: string[] = [];

function write(text: string) {
  buffer.push(text);
}

function save() {
  const fileContents = [...buffer, ''].join('\n');
  fs.writeFileSync(path.join(__dirname, '../.github/CODEOWNERS'), fileContents);
}

function normalizeComponentName(componentName: string): string {
  return componentName.replace(/^(use)?(.*?)(Unstyled)?$/gm, '$2');
}

function getCodeowners(mapping: Record<string, string[]>) {
  return Object.entries(mapping)
    .map(([directory, maintainers]) => `${directory} @${maintainers.join(' @')}`)
    .join('\n');
}

function processComponents(directory: string, packageName: Package) {
  const componentDirectories = fs.readdirSync(path.join(__dirname, '..', directory));
  const result = [];

  for (const componentDirectory of componentDirectories) {
    const componentPath = path.join(__dirname, '..', directory, componentDirectory);
    if (!fs.statSync(componentPath).isDirectory()) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const componentName = normalizeComponentName(componentDirectory);
    const componentArea = componentAreas[componentName];
    if (componentArea) {
      const maintainers = Array.from(
        new Set([
          ...areaMaintainers[componentArea],
          ...(packageName === 'mui-material' ? [] : packageOwners[packageName]),
        ]),
      )
        .map((name) => `@${name}`)
        .join(' ');
      const codeowners = `/${directory}/${componentDirectory}/ ${maintainers}`;

      result.push(codeowners);
    } else {
      console.info(`No explicit owner defined for "${componentDirectory}" in ${packageName}.`);
    }
  }

  return result.join('\n');
}

function processPackages() {
  return Object.entries(packageMaintainers)
    .map(([packageName, maintainers]) => `/packages/${packageName}/ @${maintainers.join(' @')}`)
    .join('\n');
}

write(getCodeowners(additionalRules));

write('\n# Packages\n');
write(processPackages());

write('\n# Components - Material UI\n');
write(processComponents('packages/mui-material/src', 'mui-material'));

write('\n# Components - MUI Base\n');
write(processComponents('packages/mui-base/src', 'mui-base'));

write('\n# Components - Joy UI\n');
write(processComponents('packages/mui-joy/src', 'mui-joy'));

save();
