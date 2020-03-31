import * as React from 'react';
import { Omit } from '@material-ui/types';
import { StyledComponentProps } from './styles';
export { StyledComponentProps };

/**
 * @deprecated
 * Import from `@material-ui/types` instead
 *
 * TODO: to remove in v5
 */
export { Omit };

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
    ref?: C extends { ref?: infer RefType } ? RefType : React.Ref<unknown>;
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

export namespace PropTypes {
  type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
  type Color = 'inherit' | 'primary' | 'secondary' | 'default';
  type Margin = 'none' | 'dense' | 'normal';
}

// From index.js
import * as colors from './colors';

export { colors };
export * from './styles';

export * from './utils';

export { default as AppBar } from './AppBar';
export * from './AppBar';

export { default as Avatar } from './Avatar';
export * from './Avatar';

export { default as Backdrop } from './Backdrop';
export * from './Backdrop';

export { default as Badge } from './Badge';
export * from './Badge';

export { default as BottomNavigation } from './BottomNavigation';
export * from './BottomNavigation';

export { default as BottomNavigationAction } from './BottomNavigationAction';
export * from './BottomNavigationAction';

export { default as Box } from './Box';
export * from './Box';

export { default as Breadcrumbs } from './Breadcrumbs';
export * from './Breadcrumbs';

export { default as Button } from './Button';
export * from './Button';

export { default as ButtonBase } from './ButtonBase';
export * from './ButtonBase';

export { default as ButtonGroup } from './ButtonGroup';
export * from './ButtonGroup';

export { default as Card } from './Card';
export * from './Card';

export { default as CardActionArea } from './CardActionArea';
export * from './CardActionArea';

export { default as CardActions } from './CardActions';
export * from './CardActions';

export { default as CardContent } from './CardContent';
export * from './CardContent';

export { default as CardHeader } from './CardHeader';
export * from './CardHeader';

export { default as CardMedia } from './CardMedia';
export * from './CardMedia';

export { default as Checkbox } from './Checkbox';
export * from './Checkbox';

export { default as Chip } from './Chip';
export * from './Chip';

export { default as CircularProgress } from './CircularProgress';
export * from './CircularProgress';

export { default as ClickAwayListener } from './ClickAwayListener';
export * from './ClickAwayListener';

export { default as Collapse } from './Collapse';
export * from './Collapse';

export { default as Container } from './Container';
export * from './Container';

export { default as CssBaseline } from './CssBaseline';
export * from './CssBaseline';

export { default as Dialog } from './Dialog';
export * from './Dialog';

export { default as DialogActions } from './DialogActions';
export * from './DialogActions';

export { default as DialogContent } from './DialogContent';
export * from './DialogContent';

export { default as DialogContentText } from './DialogContentText';
export * from './DialogContentText';

export { default as DialogTitle } from './DialogTitle';
export * from './DialogTitle';

export { default as Divider } from './Divider';
export * from './Divider';

export { default as Drawer } from './Drawer';
export * from './Drawer';

export { default as ExpansionPanel } from './ExpansionPanel';
export * from './ExpansionPanel';

export { default as ExpansionPanelActions } from './ExpansionPanelActions';
export * from './ExpansionPanelActions';

export { default as ExpansionPanelDetails } from './ExpansionPanelDetails';
export * from './ExpansionPanelDetails';

export { default as ExpansionPanelSummary } from './ExpansionPanelSummary';
export * from './ExpansionPanelSummary';

export { default as Fab } from './Fab';
export * from './Fab';

export { default as Fade } from './Fade';
export * from './Fade';

export { default as FilledInput } from './FilledInput';
export * from './FilledInput';

export { default as FormControl } from './FormControl';
export * from './FormControl';

export { default as FormControlLabel } from './FormControlLabel';
export * from './FormControlLabel';

export { default as FormGroup } from './FormGroup';
export * from './FormGroup';

export { default as FormHelperText } from './FormHelperText';
export * from './FormHelperText';

export { default as FormLabel } from './FormLabel';
export * from './FormLabel';

export { default as Grid } from './Grid';
export * from './Grid';

export { default as GridList } from './GridList';
export * from './GridList';

export { default as GridListTile } from './GridListTile';
export * from './GridListTile';

export { default as GridListTileBar } from './GridListTileBar';
export * from './GridListTileBar';

export { default as Grow } from './Grow';
export * from './Grow';

export { default as Hidden } from './Hidden';
export * from './Hidden';

export { default as Icon } from './Icon';
export * from './Icon';

export { default as IconButton } from './IconButton';
export * from './IconButton';

export { default as Input } from './Input';
export * from './Input';

export { default as InputAdornment } from './InputAdornment';
export * from './InputAdornment';

export { default as InputBase } from './InputBase';
export * from './InputBase';

export { default as InputLabel } from './InputLabel';
export * from './InputLabel';

export { default as LinearProgress } from './LinearProgress';
export * from './LinearProgress';

export { default as Link } from './Link';
export * from './Link';

export { default as List } from './List';
export * from './List';

export { default as ListItem } from './ListItem';
export * from './ListItem';

export { default as ListItemAvatar } from './ListItemAvatar';
export * from './ListItemAvatar';

export { default as ListItemIcon } from './ListItemIcon';
export * from './ListItemIcon';

export { default as ListItemSecondaryAction } from './ListItemSecondaryAction';
export * from './ListItemSecondaryAction';

export { default as ListItemText } from './ListItemText';
export * from './ListItemText';

export { default as ListSubheader } from './ListSubheader';
export * from './ListSubheader';

export { default as Menu } from './Menu';
export * from './Menu';

export { default as MenuItem } from './MenuItem';
export * from './MenuItem';

export { default as MenuList } from './MenuList';
export * from './MenuList';

export { default as MobileStepper } from './MobileStepper';
export * from './MobileStepper';

export { default as Modal } from './Modal';
export * from './Modal';

export { default as NativeSelect } from './NativeSelect';
export * from './NativeSelect';

export { default as NoSsr } from './NoSsr';
export * from './NoSsr';

export { default as OutlinedInput } from './OutlinedInput';
export * from './OutlinedInput';

export { default as Paper } from './Paper';
export * from './Paper';

export { default as Popover } from './Popover';
export * from './Popover';

export { default as Popper } from './Popper';
export * from './Popper';

export { default as Portal } from './Portal';
export * from './Portal';

export { default as Radio } from './Radio';
export * from './Radio';

export { default as RadioGroup } from './RadioGroup';
export * from './RadioGroup';

export { default as RootRef } from './RootRef';
export * from './RootRef';

export { default as Select } from './Select';
export * from './Select';

export { default as Slide } from './Slide';
export * from './Slide';

export { default as Slider } from './Slider';
export * from './Slider';

export { default as Snackbar } from './Snackbar';
export * from './Snackbar';

export { default as SnackbarContent } from './SnackbarContent';
export * from './SnackbarContent';

export { default as Step } from './Step';
export * from './Step';

export { default as StepButton } from './StepButton';
export * from './StepButton';

export { default as StepConnector } from './StepConnector';
export * from './StepConnector';

export { default as StepContent } from './StepContent';
export * from './StepContent';

export { default as StepIcon } from './StepIcon';
export * from './StepIcon';

export { default as StepLabel } from './StepLabel';
export * from './StepLabel';

export { default as Stepper } from './Stepper';
export * from './Stepper';

export { default as SvgIcon } from './SvgIcon';
export * from './SvgIcon';

export { default as SwipeableDrawer } from './SwipeableDrawer';
export * from './SwipeableDrawer';

export { default as Switch } from './Switch';
export * from './Switch';

export { default as Tab } from './Tab';
export * from './Tab';

export { default as Table } from './Table';
export * from './Table';

export { default as TableBody } from './TableBody';
export * from './TableBody';

export { default as TableCell } from './TableCell';
export * from './TableCell';

export { default as TableContainer } from './TableContainer';
export * from './TableContainer';

export { default as TableFooter } from './TableFooter';
export * from './TableFooter';

export { default as TableHead } from './TableHead';
export * from './TableHead';

export { default as TablePagination } from './TablePagination';
export * from './TablePagination';

export { default as TableRow } from './TableRow';
export * from './TableRow';

export { default as TableSortLabel } from './TableSortLabel';
export * from './TableSortLabel';

export { default as Tabs } from './Tabs';
export * from './Tabs';

export { default as TextField } from './TextField';
export * from './TextField';

export { default as TextareaAutosize } from './TextareaAutosize';
export * from './TextareaAutosize';

export { default as Toolbar } from './Toolbar';
export * from './Toolbar';

export { default as Tooltip } from './Tooltip';
export * from './Tooltip';

export { default as Typography } from './Typography';
export * from './Typography';

export { default as useMediaQuery } from './useMediaQuery';
export * from './useMediaQuery';

export { default as useScrollTrigger } from './useScrollTrigger';
export * from './useScrollTrigger';

export { default as withMobileDialog } from './withMobileDialog';
export * from './withMobileDialog';

export { default as withWidth } from './withWidth';
export * from './withWidth';

export { default as Zoom } from './Zoom';
export * from './Zoom';
