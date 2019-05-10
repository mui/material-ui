import * as React from 'react';
import { ConsistentWith, Omit } from '@material-ui/types';
import { StyledComponentProps } from './styles';
export { StyledComponentProps };

/**
 * @deprecated
 * Import from `@material-ui/types` instead
 */
export { Omit };

/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 */
export type StandardProps<
  C,
  ClassKey extends string,
  Removals extends keyof C = never,
  AcceptsRef = true
> = Omit<C, 'classes' | Removals> &
  StyledComponentProps<ClassKey> & {
    className?: string;
    style?: React.CSSProperties;
  } & {
    ref?: AcceptsRef extends true
      ? C extends { ref?: infer RefType }
        ? RefType
        : React.Ref<unknown>
      : never;
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

export namespace PropTypes {
  type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
  type Color = 'inherit' | 'primary' | 'secondary' | 'default';
  type Margin = 'none' | 'dense' | 'normal';
}

// From index.js
import * as colors from './colors';

export { colors };
export {
  createMuiTheme,
  createStyles,
  makeStyles,
  StyleRulesCallback,
  Theme,
  useTheme,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
} from './styles';

export { default as AppBar } from './AppBar';
export { default as Avatar } from './Avatar';
export { default as Backdrop } from './Backdrop';
export { default as Badge } from './Badge';
export { default as BottomNavigation } from './BottomNavigation';
export { default as BottomNavigationAction } from './BottomNavigationAction';
export { default as Box } from './Box';
export { default as Breadcrumbs } from './Breadcrumbs';
export { default as Button } from './Button';
export { default as ButtonBase } from './ButtonBase';
export { default as Card } from './Card';
export { default as CardActionArea } from './CardActionArea';
export { default as CardActions } from './CardActions';
export { default as CardContent } from './CardContent';
export { default as CardHeader } from './CardHeader';
export { default as CardMedia } from './CardMedia';
export { default as Checkbox } from './Checkbox';
export { default as Chip } from './Chip';
export { default as CircularProgress } from './CircularProgress';
export { default as ClickAwayListener } from './ClickAwayListener';
export { default as Collapse } from './Collapse';
export { default as Container } from './Container';
export { default as CssBaseline } from './CssBaseline';
export { default as Dialog } from './Dialog';
export { default as DialogActions } from './DialogActions';
export { default as DialogContent } from './DialogContent';
export { default as DialogContentText } from './DialogContentText';
export { default as DialogTitle } from './DialogTitle';
export { default as Divider } from './Divider';
export { default as Drawer } from './Drawer';
export { default as ExpansionPanel } from './ExpansionPanel';
export { default as ExpansionPanelActions } from './ExpansionPanelActions';
export { default as ExpansionPanelDetails } from './ExpansionPanelDetails';
export { default as ExpansionPanelSummary } from './ExpansionPanelSummary';
export { default as Fab } from './Fab';
export { default as Fade } from './Fade';
export { default as FilledInput } from './FilledInput';
export { default as FormControl } from './FormControl';
export { default as FormControlLabel } from './FormControlLabel';
export { default as FormGroup } from './FormGroup';
export { default as FormHelperText } from './FormHelperText';
export { default as FormLabel } from './FormLabel';
export { default as Grid } from './Grid';
export { default as GridList } from './GridList';
export { default as GridListTile } from './GridListTile';
export { default as GridListTileBar } from './GridListTileBar';
export { default as Grow } from './Grow';
export { default as Hidden } from './Hidden';
export { default as Icon } from './Icon';
export { default as IconButton } from './IconButton';
export { default as Input } from './Input';
export { default as InputAdornment } from './InputAdornment';
export { default as InputBase } from './InputBase';
export { default as InputLabel } from './InputLabel';
export { default as LinearProgress } from './LinearProgress';
export { default as Link } from './Link';
export { default as List } from './List';
export { default as ListItem } from './ListItem';
export { default as ListItemAvatar } from './ListItemAvatar';
export { default as ListItemIcon } from './ListItemIcon';
export { default as ListItemSecondaryAction } from './ListItemSecondaryAction';
export { default as ListItemText } from './ListItemText';
export { default as ListSubheader } from './ListSubheader';
export { default as Menu } from './Menu';
export { default as MenuItem } from './MenuItem';
export { default as MenuList } from './MenuList';
export { default as MobileStepper } from './MobileStepper';
export { default as Modal, ModalManager } from './Modal';
export { default as NativeSelect } from './NativeSelect';
export { default as NoSsr } from './NoSsr';
export { default as OutlinedInput } from './OutlinedInput';
export { default as Paper } from './Paper';
export { default as Popover } from './Popover';
export { default as Popper } from './Popper';
export { default as Portal } from './Portal';
export { default as Radio } from './Radio';
export { default as RadioGroup } from './RadioGroup';
export { default as RootRef } from './RootRef';
export { default as Select } from './Select';
export { default as Slide } from './Slide';
export { default as Snackbar } from './Snackbar';
export { default as SnackbarContent } from './SnackbarContent';
export { default as Step } from './Step';
export { default as StepButton } from './StepButton';
export { default as StepConnector } from './StepConnector';
export { default as StepContent } from './StepContent';
export { default as StepIcon } from './StepIcon';
export { default as StepLabel } from './StepLabel';
export { default as Stepper } from './Stepper';
export { default as SvgIcon } from './SvgIcon';
export { default as SwipeableDrawer } from './SwipeableDrawer';
export { default as Switch } from './Switch';
export { default as Tab } from './Tab';
export { default as Table } from './Table';
export { default as TableBody } from './TableBody';
export { default as TableCell } from './TableCell';
export { default as TableFooter } from './TableFooter';
export { default as TableHead } from './TableHead';
export { default as TablePagination } from './TablePagination';
export { default as TableRow } from './TableRow';
export { default as TableSortLabel } from './TableSortLabel';
export { default as Tabs } from './Tabs';
export { default as TextField } from './TextField';
export { default as Toolbar } from './Toolbar';
export { default as Tooltip } from './Tooltip';
export { default as Typography } from './Typography';
export { default as withMobileDialog } from './withMobileDialog';
export { default as withWidth } from './withWidth';
export { default as Zoom } from './Zoom';
