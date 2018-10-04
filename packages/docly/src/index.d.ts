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

export { default as AppBar } from '../material-core/AppBar';
export { default as Avatar } from '../material-core/Avatar';
export { default as Backdrop } from '../material-core/Backdrop';
export { default as Badge } from '../material-core/Badge';
export { default as BottomNavigation } from '../material-core/BottomNavigation';
export { default as BottomNavigationAction } from '../material-core/BottomNavigationAction';
export { default as Button } from '../material-core/Button';
export { default as ButtonBase } from '../material-core/ButtonBase';
export { default as Card } from '../material-core/Card';
export { default as CardActionArea } from '../material-core/CardActionArea';
export { default as CardActions } from '../material-core/CardActions';
export { default as CardContent } from '../material-core/CardContent';
export { default as CardHeader } from '../material-core/CardHeader';
export { default as CardMedia } from '../material-core/CardMedia';
export { default as Checkbox } from '../material-core/Checkbox';
export { default as Chip } from '../material-core/Chip';
export { default as CircularProgress } from '../material-core/CircularProgress';
export { default as ClickAwayListener } from '../material-core/ClickAwayListener';
export { default as Collapse } from '../material-core/Collapse';
export { default as CssBaseline } from '../material-core/CssBaseline';
export { default as Dialog } from '../material-core/Dialog';
export { default as DialogActions } from '../material-core/DialogActions';
export { default as DialogContent } from '../material-core/DialogContent';
export { default as DialogContentText } from '../material-core/DialogContentText';
export { default as DialogTitle } from '../material-core/DialogTitle';
export { default as Divider } from '../material-core/Divider';
export { default as Drawer } from '../material-core/Drawer';
export { default as ExpansionPanel } from '../material-core/ExpansionPanel';
export { default as ExpansionPanelActions } from '../material-core/ExpansionPanelActions';
export { default as ExpansionPanelDetails } from '../material-core/ExpansionPanelDetails';
export { default as ExpansionPanelSummary } from '../material-core/ExpansionPanelSummary';
export { default as Fade } from '../material-core/Fade';
export { default as FilledInput } from '../material-core/FilledInput';
export { default as FormControl } from '../material-core/FormControl';
export { default as FormControlLabel } from '../material-core/FormControlLabel';
export { default as FormGroup } from '../material-core/FormGroup';
export { default as FormHelperText } from '../material-core/FormHelperText';
export { default as FormLabel } from '../material-core/FormLabel';
export { default as Grid } from '../material-core/Grid';
export { default as GridList } from '../material-core/GridList';
export { default as GridListTile } from '../material-core/GridListTile';
export { default as GridListTileBar } from '../material-core/GridListTileBar';
export { default as Grow } from '../material-core/Grow';
export { default as Hidden } from '../material-core/Hidden';
export { default as Icon } from '../material-core/Icon';
export { default as IconButton } from '../material-core/IconButton';
export { default as Input } from '../material-core/Input';
export { default as InputAdornment } from '../material-core/InputAdornment';
export { default as InputBase } from '../material-core/InputBase';
export { default as InputLabel } from '../material-core/InputLabel';
export { default as LinearProgress } from '../material-core/LinearProgress';
export { default as List } from '../material-core/List';
export { default as ListItem } from '../material-core/ListItem';
export { default as ListItemAvatar } from '../material-core/ListItemAvatar';
export { default as ListItemIcon } from '../material-core/ListItemIcon';
export { default as ListItemSecondaryAction } from '../material-core/ListItemSecondaryAction';
export { default as ListItemText } from '../material-core/ListItemText';
export { default as ListSubheader } from '../material-core/ListSubheader';
export { default as Menu } from '../material-core/Menu';
export { default as MenuItem } from '../material-core/MenuItem';
export { default as MenuList } from '../material-core/MenuList';
export { default as MobileStepper } from '../material-core/MobileStepper';
export { default as Modal, ModalManager } from '../material-core/Modal';
export { default as NativeSelect } from '../material-core/NativeSelect';
export { default as NoSsr } from '../material-core/NoSsr';
export { default as OutlinedInput } from '../material-core/OutlinedInput';
export { default as Paper } from '../material-core/Paper';
export { default as Popover } from '../material-core/Popover';
export { default as Popper } from '../material-core/Popper';
export { default as Portal } from '../material-core/Portal';
export { default as Radio } from '../material-core/Radio';
export { default as RadioGroup } from '../material-core/RadioGroup';
export { default as RootRef } from '../material-core/RootRef';
export { default as Select } from '../material-core/Select';
export { default as Slide } from '../material-core/Slide';
export { default as Snackbar } from '../material-core/Snackbar';
export { default as SnackbarContent } from '../material-core/SnackbarContent';
export { default as Step } from '../material-core/Step';
export { default as StepButton } from '../material-core/StepButton';
export { default as StepConnector } from '../material-core/StepConnector';
export { default as StepContent } from '../material-core/StepContent';
export { default as StepIcon } from '../material-core/StepIcon';
export { default as StepLabel } from '../material-core/StepLabel';
export { default as Stepper } from '../material-core/Stepper';
export { default as SvgIcon } from '../material-core/SvgIcon';
export { default as SwipeableDrawer } from '../material-core/SwipeableDrawer';
export { default as Switch } from '../material-core/Switch';
export { default as Tab } from '../material-core/Tab';
export { default as Table } from '../material-core/Table';
export { default as TableBody } from '../material-core/TableBody';
export { default as TableCell } from '../material-core/TableCell';
export { default as TableFooter } from '../material-core/TableFooter';
export { default as TableHead } from '../material-core/TableHead';
export { default as TablePagination } from '../material-core/TablePagination';
export { default as TableRow } from '../material-core/TableRow';
export { default as TableSortLabel } from '../material-core/TableSortLabel';
export { default as Tabs } from '../material-core/Tabs';
export { default as TextField } from '../material-core/TextField';
export { default as Toolbar } from '../material-core/Toolbar';
export { default as Tooltip } from '../material-core/Tooltip';
export { default as Typography } from '../material-core/Typography';
export { default as withMobileDialog } from '../material-core/withMobileDialog';
export { default as withWidth } from '../material-core/withWidth';
export { default as Zoom } from '../material-core/Zoom';
