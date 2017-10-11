import * as React from 'react';

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

/**
 * Component exposed by `material-ui` are usually wrapped
 * with the `withStyles` HOC and allow customization via
 * the following props:
 *
 * - `className`
 * - `classes`
 * - `style`
 * - `innerRef`
 */
export interface StyledComponentProps<ClassKey extends string = string> {
  className?: string;
  classes?: Partial<ClassNameMap<ClassKey>>;
  style?: Partial<React.CSSProperties>;
  innerRef?: React.Ref<any>;
}
export type StyledComponent<P = {}, ClassKey extends string = string> =
  React.ComponentType<P & StyledComponentProps<ClassKey>>

export type Contrast = 'light' | 'dark' | 'brown';
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
  contrastDefaultColor: Contrast;
}

/**
 * Utilies types based on:
 * https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-307871458
 */
export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export namespace PropTypes {
  type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
  type Color = 'inherit' | 'primary' | 'accent' | 'default';
  type Margin = 'none' | 'dense' | 'normal';
}

// From index.js
export { default as AppBar } from './AppBar';
export { default as Avatar } from './Avatar';
export { default as Badge } from './Badge';
export { default as BottomNavigation, BottomNavigationButton } from './BottomNavigation';
export { default as Button } from './Button';
export { default as ButtonBase } from './ButtonBase';
export { default as Card, CardActions, CardContent, CardHeader, CardMedia } from './Card';
export { default as Checkbox } from './Checkbox';
export { default as Chip } from './Chip';
export {
  default as Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from './Dialog';
export { default as Divider } from './Divider';
export { default as Drawer } from './Drawer';
export { FormControl, FormGroup, FormLabel, FormHelperText, FormControlLabel } from './Form';
export { default as Hidden } from './Hidden';
export { default as Icon } from './Icon';
export { default as IconButton } from './IconButton';
export { default as Input, InputLabel } from './Input';
export { default as Grid } from './Grid';
export {
  default as List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from './List';
export { default as Menu, MenuItem, MenuList } from './Menu';
export { default as Paper } from './Paper';
export { default as Popover } from './Popover';
export { CircularProgress, LinearProgress } from './Progress';
export { default as Radio, RadioGroup } from './Radio';
export { default as Select } from './Select';
export { default as Snackbar, SnackbarContent } from './Snackbar';
export { MuiThemeProvider, withStyles, WithStyles, withTheme, createMuiTheme } from './styles';

import * as colors from './colors';

export { colors };

export { default as SvgIcon } from './SvgIcon';
export { default as Switch } from './Switch';
export {
  default as Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from './Table';
export { default as Tabs, Tab } from './Tabs';
export { default as Typography } from './Typography';
export { default as TextField } from './TextField';
export { default as Toolbar } from './Toolbar';

export { default as Tooltip } from './Tooltip';

export { default as withWidth } from './utils/withWidth';
