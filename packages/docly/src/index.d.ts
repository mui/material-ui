import * as React from 'react';
import { StyledComponentProps } from './styles';
export { StyledComponentProps };

export type PropsOf<C> = C extends new (props: infer P) => React.Component
  ? P
  : C extends (props: infer P) => React.ReactElement<any> | null ? P : never;

/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 */
export type StandardProps<C, ClassKey extends string, Removals extends keyof C = never> = Omit<
  C,
  'classes' | Removals
> &
  StyledComponentProps<ClassKey> & {
    className?: string;
    style?: React.CSSProperties;
  };

export type PaletteType = 'light' | 'dark';
export interface Color {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

/**
 * Remove properties `K` from `T`.
 *
 * @internal
 */
export type Omit<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;

/**
 * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
 * `U`, their value types do not conflict.
 *
 * @internal
 */
export type ConsistentWith<DecorationTargetProps, InjectedProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P]
};

/**
 * a function that takes {component} and returns a component that passes along
 * all the props to {component} except the {InjectedProps} and will accept
 * additional {AdditionalProps}
 */
export type PropInjector<InjectedProps, AdditionalProps = {}> = <
  C extends React.ComponentType<ConsistentWith<PropsOf<C>, InjectedProps>>
>(
  component: C,
) => React.ComponentType<
  Omit<JSX.LibraryManagedAttributes<C, PropsOf<C>>, keyof InjectedProps> & AdditionalProps
>;

/**
 * Like `T & U`, but using the value types from `U` where their properties overlap.
 *
 * @internal
 */
export type Overwrite<T, U> = Omit<T, keyof U> & U;

export namespace PropTypes {
  type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
  type Color = 'inherit' | 'primary' | 'secondary' | 'default';
  type Margin = 'none' | 'dense' | 'normal';
}

// From index.js
import * as colors from './colors';

export { colors };
export {
  createGenerateClassName,
  createMuiTheme,
  jssPreset,
  MuiThemeProvider,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
  createStyles,
  withTheme,
  WithTheme,
} from './styles';

export { default as AppBar } from '../../../material-ui/src/AppBar';
export { default as Avatar } from '../../../material-ui/src/Avatar';
export { default as Backdrop } from '../../../material-ui/src/Backdrop';
export { default as Badge } from '../../../material-ui/src/Badge';
export { default as BottomNavigation } from '../../../material-ui/src/BottomNavigation';
export { default as BottomNavigationAction } from '../../../material-ui/src/BottomNavigationAction';
export { default as Button } from '../../../material-ui/src/Button';
export { default as ButtonBase } from '../../../material-ui/src/ButtonBase';
export { default as Card } from '../../../material-ui/src/Card';
export { default as CardActionArea } from '../../../material-ui/src/CardActionArea';
export { default as CardActions } from '../../../material-ui/src/CardActions';
export { default as CardContent } from '../../../material-ui/src/CardContent';
export { default as CardHeader } from '../../../material-ui/src/CardHeader';
export { default as CardMedia } from '../../../material-ui/src/CardMedia';
export { default as Checkbox } from '../../../material-ui/src/Checkbox';
export { default as Chip } from '../../../material-ui/src/Chip';
export { default as CircularProgress } from '../../../material-ui/src/CircularProgress';
export { default as ClickAwayListener } from '../../../material-ui/src/ClickAwayListener';
export { default as Collapse } from '../../../material-ui/src/Collapse';
export { default as CssBaseline } from '../../../material-ui/src/CssBaseline';
export { default as Dialog } from '../../../material-ui/src/Dialog';
export { default as DialogActions } from '../../../material-ui/src/DialogActions';
export { default as DialogContent } from '../../../material-ui/src/DialogContent';
export { default as DialogContentText } from '../../../material-ui/src/DialogContentText';
export { default as DialogTitle } from '../../../material-ui/src/DialogTitle';
export { default as Divider } from '../../../material-ui/src/Divider';
export { default as Drawer } from '../../../material-ui/src/Drawer';
export { default as ExpansionPanel } from '../../../material-ui/src/ExpansionPanel';
export { default as ExpansionPanelActions } from '../../../material-ui/src/ExpansionPanelActions';
export { default as ExpansionPanelDetails } from '../../../material-ui/src/ExpansionPanelDetails';
export { default as ExpansionPanelSummary } from '../../../material-ui/src/ExpansionPanelSummary';
export { default as Fade } from '../../../material-ui/src/Fade';
export { default as FilledInput } from '../../../material-ui/src/FilledInput';
export { default as FormControl } from '../../../material-ui/src/FormControl';
export { default as FormControlLabel } from '../../../material-ui/src/FormControlLabel';
export { default as FormGroup } from '../../../material-ui/src/FormGroup';
export { default as FormHelperText } from '../../../material-ui/src/FormHelperText';
export { default as FormLabel } from '../../../material-ui/src/FormLabel';
export { default as Grid } from '../../../material-ui/src/Grid';
export { default as GridList } from '../../../material-ui/src/GridList';
export { default as GridListTile } from '../../../material-ui/src/GridListTile';
export { default as GridListTileBar } from '../../../material-ui/src/GridListTileBar';
export { default as Grow } from '../../../material-ui/src/Grow';
export { default as Hidden } from '../../../material-ui/src/Hidden';
export { default as Icon } from '../../../material-ui/src/Icon';
export { default as IconButton } from '../../../material-ui/src/IconButton';
export { default as Input } from '../../../material-ui/src/Input';
export { default as InputAdornment } from '../../../material-ui/src/InputAdornment';
export { default as InputBase } from '../../../material-ui/src/InputBase';
export { default as InputLabel } from '../../../material-ui/src/InputLabel';
export { default as LinearProgress } from '../../../material-ui/src/LinearProgress';
export { default as List } from '../../../material-ui/src/List';
export { default as ListItem } from '../../../material-ui/src/ListItem';
export { default as ListItemAvatar } from '../../../material-ui/src/ListItemAvatar';
export { default as ListItemIcon } from '../../../material-ui/src/ListItemIcon';
export { default as ListItemSecondaryAction } from '../../../material-ui/src/ListItemSecondaryAction';
export { default as ListItemText } from '../../../material-ui/src/ListItemText';
export { default as ListSubheader } from '../../../material-ui/src/ListSubheader';
export { default as Menu } from '../../../material-ui/src/Menu';
export { default as MenuItem } from '../../../material-ui/src/MenuItem';
export { default as MenuList } from '../../../material-ui/src/MenuList';
export { default as MobileStepper } from '../../../material-ui/src/MobileStepper';
export { default as Modal, ModalManager } from '../../../material-ui/src/Modal';
export { default as NativeSelect } from '../../../material-ui/src/NativeSelect';
export { default as NoSsr } from '../../../material-ui/src/NoSsr';
export { default as OutlinedInput } from '../../../material-ui/src/OutlinedInput';
export { default as Paper } from '../../../material-ui/src/Paper';
export { default as Popover } from '../../../material-ui/src/Popover';
export { default as Popper } from '../../../material-ui/src/Popper';
export { default as Portal } from '../../../material-ui/src/Portal';
export { default as Radio } from '../../../material-ui/src/Radio';
export { default as RadioGroup } from '../../../material-ui/src/RadioGroup';
export { default as RootRef } from '../../../material-ui/src/RootRef';
export { default as Select } from '../../../material-ui/src/Select';
export { default as Slide } from '../../../material-ui/src/Slide';
export { default as Snackbar } from '../../../material-ui/src/Snackbar';
export { default as SnackbarContent } from '../../../material-ui/src/SnackbarContent';
export { default as Step } from '../../../material-ui/src/Step';
export { default as StepButton } from '../../../material-ui/src/StepButton';
export { default as StepConnector } from '../../../material-ui/src/StepConnector';
export { default as StepContent } from '../../../material-ui/src/StepContent';
export { default as StepIcon } from '../../../material-ui/src/StepIcon';
export { default as StepLabel } from '../../../material-ui/src/StepLabel';
export { default as Stepper } from '../../../material-ui/src/Stepper';
export { default as SvgIcon } from '../../../material-ui/src/SvgIcon';
export { default as SwipeableDrawer } from '../../../material-ui/src/SwipeableDrawer';
export { default as Switch } from '../../../material-ui/src/Switch';
export { default as Tab } from '../../../material-ui/src/Tab';
export { default as Table } from '../../../material-ui/src/Table';
export { default as TableBody } from '../../../material-ui/src/TableBody';
export { default as TableCell } from '../../../material-ui/src/TableCell';
export { default as TableFooter } from '../../../material-ui/src/TableFooter';
export { default as TableHead } from '../../../material-ui/src/TableHead';
export { default as TablePagination } from '../../../material-ui/src/TablePagination';
export { default as TableRow } from '../../../material-ui/src/TableRow';
export { default as TableSortLabel } from '../../../material-ui/src/TableSortLabel';
export { default as Tabs } from '../../../material-ui/src/Tabs';
export { default as TextField } from '../../../material-ui/src/TextField';
export { default as Toolbar } from '../../../material-ui/src/Toolbar';
export { default as Tooltip } from '../../../material-ui/src/Tooltip';
export { default as Typography } from '../../../material-ui/src/Typography';
export { default as withMobileDialog } from '../../../material-ui/src/withMobileDialog';
export { default as withWidth } from '../../../material-ui/src/withWidth';
export { default as Zoom } from '../../../material-ui/src/Zoom';
