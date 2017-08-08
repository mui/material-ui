/**
 * Type definitions for "material-ui" v1.0.0-beta.2
 * Project: https://github.com/callemall/material-ui/
 * TypeScript Version: 2.4
 */

///<reference types="react" />
///<reference types="enzyme" />

declare namespace MaterialUI {
  /**
   * Component exposed by `material-ui` are usually wrapped
   * with the `withStyles` HOC and allow customization via
   * the following props:
   *
   * - `className`
   * - `classes`
   * - `style`
   */
  interface MaterialComponentProps<StyleClasses> {
    className?: string;
    classes?: StyleClasses;
    style?: Partial<React.CSSProperties>;
  }
  class Component<P, C = Object> extends React.Component<
    P & MaterialComponentProps<C>
  > {}

  interface InputEventEmitter<T> {
    onBlur: React.ReactEventHandler<T>;
    onChange: React.ReactEventHandler<T>;
    onClean: React.ReactEventHandler<T>;
    onDirty: React.ReactEventHandler<T>;
    onFocus: React.ReactEventHandler<T>;
    onKeyDown: React.ReactEventHandler<T>;
    onKeyUp: React.ReactEventHandler<T>;
  }
}

declare namespace MaterialUI.PropTypes {
  type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
  type Color = 'inherit' | 'primary' | 'accent' | 'default';
  type Margin = 'none' | 'dense' | 'normal';
}

declare module 'material-ui' {
  export { default as AppBar } from 'material-ui/AppBar';
  export { default as Avatar } from 'material-ui/Avatar';
  export { default as Badge } from 'material-ui/Badge';

  export {
    default as BottomNavigation,
    BottomNavigationButton,
  } from 'material-ui/BottomNavigation';

  export { default as Button } from 'material-ui/Button';

  export {
    default as Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
  } from 'material-ui/Card';

  export { default as Checkbox } from 'material-ui/Checkbox';
  export { default as Chip } from 'material-ui/Chip';

  export {
    default as Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog';

  export { default as Divider } from 'material-ui/Divider';
  export { default as Drawer } from 'material-ui/Drawer';

  export {
    FormControl,
    FormGroup,
    FormLabel,
    FormHelperText,
    FormControlLabel,
  } from 'material-ui/Form';

  export { default as Hidden } from 'material-ui/Hidden';
  export { default as Icon } from 'material-ui/Icon';
  export { default as IconButton } from 'material-ui/IconButton';

  export { default as Input, InputLabel } from 'material-ui/Input';

  export { default as Grid } from 'material-ui/Grid';

  export {
    default as List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
  } from 'material-ui/List';

  export { default as Menu, MenuItem, MenuList } from 'material-ui/Menu';

  export { default as Paper } from 'material-ui/Paper';

  export { CircularProgress, LinearProgress } from 'material-ui/Progress';

  export { default as Radio, RadioGroup } from 'material-ui/Radio';

  export { default as Snackbar, SnackbarContent } from 'material-ui/Snackbar';

  export { MuiThemeProvider } from 'material-ui/styles';

  import * as colors from 'material-ui/colors';
  export { colors };

  export { default as SvgIcon } from 'material-ui/SvgIcon';

  export { default as Switch } from 'material-ui/Switch';

  export {
    default as Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
  } from 'material-ui/Table';

  export { default as Tabs, Tab } from 'material-ui/Tabs';

  export { default as Typography } from 'material-ui/Typography';

  export { default as TextField } from 'material-ui/TextField';

  export { default as Toolbar } from 'material-ui/Toolbar';
}

/* ============================================= */
/*                                               */
/*                   COMPONENTS                  */
/*                                               */
/* ============================================= */

declare module 'material-ui/AppBar' {
  export { default } from 'material-ui/AppBar/AppBar';
  export * from 'material-ui/AppBar/AppBar';
}

declare module 'material-ui/AppBar/AppBar' {
  export interface AppBarProps {
    color?: MaterialUI.PropTypes.Color;
    position?: 'static' | 'fixed' | 'absolute';
  }

  export default class AppBar extends MaterialUI.Component<AppBarProps> {}
}

declare module 'material-ui/Avatar' {
  export { default } from 'material-ui/Avatar/Avatar';
  export * from 'material-ui/Avatar/Avatar';
}

declare module 'material-ui/Avatar/Avatar' {
  export interface AvatarProps {
    alt?: string;
    childrenClassName?: string;
    component?: React.ReactNode;
    imgProps?: Object;
    sizes?: string;
    src?: string;
    srcSet?: string;
  }

  export default class Avatar extends MaterialUI.Component<AvatarProps> {}
}

declare module 'material-ui/Badge' {
  export { default } from 'material-ui/Badge/Badge';
  export * from 'material-ui/Badge/Badge';
}

declare module 'material-ui/Badge/Badge' {
  export interface BadgeProps {
    badgeContent: React.ReactNode;
    children: React.ReactNode;
    color?: 'default' | 'primary' | 'accent';
  }

  export default class Badge extends MaterialUI.Component<BadgeProps> {}
}

declare module 'material-ui/BottomNavigation' {
  export { default } from 'material-ui/BottomNavigation/BottomNavigation';
  export * from 'material-ui/BottomNavigation/BottomNavigation';
  export {
    default as BottomNavigationButton,
  } from 'material-ui/BottomNavigation/BottomNavigationButton';
  export * from 'material-ui/BottomNavigation/BottomNavigationButton';
}

declare module 'material-ui/BottomNavigation/BottomNavigation' {
  export interface BottomNavigationProps {
    children: React.ReactNode;
    onChange?: React.ReactEventHandler<any>;
    showLabels?: boolean;
    value?: any;
  }

  export default class BottomNavigation extends MaterialUI.Component<
    BottomNavigationProps
  > {}
}

declare module 'material-ui/BottomNavigation/BottomNavigationButton' {
  import { ButtonBaseProps } from 'material-ui/internal/ButtonBase';

  export interface BottomNavigationButtonProps extends ButtonBaseProps {
    icon?: React.ReactNode;
    label?: React.ReactNode;
    onChange?: (event: React.ChangeEvent<{}>, value: number) => void;
    onClick?: React.ReactEventHandler<any>;
    selected?: boolean;
    showLabel?: boolean;
    value?: number;
  }

  export default class BottomNavigationButton extends MaterialUI.Component<
    BottomNavigationButtonProps
  > {}
}

declare module 'material-ui/Button' {
  export { default } from 'material-ui/Button/Button';
  export * from 'material-ui/Button/Button';
}

declare module 'material-ui/Button/Button' {
  import { ButtonBaseProps } from 'material-ui/internal/ButtonBase';

  export interface ButtonProps extends ButtonBaseProps {
    color?: MaterialUI.PropTypes.Color | 'contrast';
    component?: React.ReactNode;
    dense?: boolean;
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    fab?: boolean;
    href?: string;
    raised?: boolean;
    type?: string;
  }

  export default class Button extends MaterialUI.Component<ButtonProps> {}
}

declare module 'material-ui/Card' {
  export { default } from 'material-ui/Card/Card';
  export * from 'material-ui/Card/Card';
  export { default as CardActions } from 'material-ui/Card/CardActions';
  export * from 'material-ui/Card/CardActions';
  export { default as CardContent } from 'material-ui/Card/CardContent';
  export * from 'material-ui/Card/CardContent';
  export { default as CardHeader } from 'material-ui/Card/CardHeader';
  export * from 'material-ui/Card/CardHeader';
  export { default as CardMedia } from 'material-ui/Card/CardMedia';
  export * from 'material-ui/Card/CardMedia';
}

declare module 'material-ui/Card/Card' {
  export interface CardProps {
    raised?: boolean;
  }

  export default class Card extends MaterialUI.Component<CardProps> {}
}

declare module 'material-ui/Card/CardActions' {
  export interface CardActionsProps {
    disableActionSpacing?: boolean;
  }

  export default class CardActions extends MaterialUI.Component<
    CardActionsProps
  > {}
}

declare module 'material-ui/Card/CardContent' {
  export interface CardContentProps {}

  export default class CardContent extends MaterialUI.Component<
    CardContentProps
  > {}
}

declare module 'material-ui/Card/CardHeader' {
  export interface CardHeaderProps {
    avatar?: React.ReactNode;
    subheader?: React.ReactNode;
    title?: React.ReactNode;
  }

  export default class CardHeader extends MaterialUI.Component<
    CardHeaderProps
  > {}
}

declare module 'material-ui/Card/CardMedia' {
  export interface CardMediaProps {}

  export default class CardMedia extends MaterialUI.Component<CardMediaProps> {}
}

declare module 'material-ui/Checkbox' {
  export { default } from 'material-ui/Checkbox/Checkbox';
  export * from 'material-ui/Checkbox/Checkbox';
}

declare module 'material-ui/Checkbox/Checkbox' {
  export interface CheckboxProps {
    checked?: boolean | string;
    checkedClassName?: string;
    checkedIcon?: React.ReactNode;
    defaultChecked?: boolean;
    disabled?: boolean;
    disabledClassName?: string;
    disabledRipple?: boolean;
    icon?: React.ReactNode;
    indeterminate?: boolean;
    indeterminateIcon?: React.ReactNode;
    inputProps?: Object;
    inputRef?: Function;
    name?: string;
    onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
    tabIndex?: string;
    value?: string;
  }

  export default class Checkbox extends MaterialUI.Component<CheckboxProps> {}
}

declare module 'material-ui/Chip' {
  export { default } from 'material-ui/Chip/Chip';
  export * from 'material-ui/Chip/Chip';
}

declare module 'material-ui/Chip/Chip' {
  export interface ChipProps {
    avatar?: React.ReactNode;
    label?: React.ReactNode;
    onClick?: React.EventHandler<any>;
    onKeyDown?: React.EventHandler<React.KeyboardEvent<any>>;
    onRequestDelete?: React.EventHandler<any>;
    tabIndex?: number;
  }

  export default class Chip extends MaterialUI.Component<ChipProps> {}
}

declare module 'material-ui/Dialog' {
  export { default } from 'material-ui/Dialog/Dialog';
  export * from 'material-ui/Dialog/Dialog';
  export { default as DialogActions } from 'material-ui/Dialog/DialogActions';
  export * from 'material-ui/Dialog/DialogActions';
  export { default as DialogTitle } from 'material-ui/Dialog/DialogTitle';
  export * from 'material-ui/Dialog/DialogTitle';
  export { default as DialogContent } from 'material-ui/Dialog/DialogContent';
  export * from 'material-ui/Dialog/DialogContent';
  export {
    default as DialogContentText,
  } from 'material-ui/Dialog/DialogContentText';
  export * from 'material-ui/Dialog/DialogContentText';
  export {
    default as withResponsiveFullScreen,
  } from 'material-ui/Dialog/withResponsiveFullScreen';
  export * from 'material-ui/Dialog/withResponsiveFullScreen';
}

declare module 'material-ui/Dialog/Dialog' {
  import { TransitionHandlers } from 'material-ui/internal/Transition';

  export interface DialogProps extends Partial<TransitionHandlers> {
    fullScreen?: boolean;
    ignoreBackdropClick?: boolean;
    ignoreEscapeKeyUp?: boolean;
    enterTransitionDuration?: number;
    leaveTransitionDuration?: number;
    maxWidth?: 'xs' | 'sm' | 'md';
    onBackdropClick?: Function;
    onEscapeKeyUp?: Function;
    onRequestClose?: React.EventHandler<any>;
    open?: boolean;
    transition?: Function | React.ReactElement<any>;
  }

  export default class Dialog extends MaterialUI.Component<DialogProps> {}
}

declare module 'material-ui/Dialog/DialogActions' {
  export interface DialogActionsProps {}

  export default class DialogActions extends MaterialUI.Component<
    DialogActionsProps
  > {}
}

declare module 'material-ui/Dialog/DialogContent' {
  export interface DialogContentProps {}

  export default class DialogContent extends MaterialUI.Component<
    DialogContentProps
  > {}
}

declare module 'material-ui/Dialog/DialogContentText' {
  export interface DialogContentTextProps {}

  export default class DialogContentText extends MaterialUI.Component<
    DialogContentTextProps
  > {}
}

declare module 'material-ui/Dialog/DialogTitle' {
  export interface DialogTitleProps {
    disableTypography?: boolean;
  }

  export default class DialogTitle extends MaterialUI.Component<
    DialogTitleProps
  > {}
}

declare module 'material-ui/Dialog/withResponsiveFullScreen' {
  import { Breakpoint } from 'material-ui/styles/breakpoints';
  import { WithWidthEnhancement } from 'material-ui/utils/withWidth';

  export interface WithResponsiveFullScreenOptions {
    breakpoint: Breakpoint;
  }

  export default function withResponsiveFullScreen<P>(
    options: WithResponsiveFullScreenOptions
  ): React.ComponentClass<P & WithWidthEnhancement>;
}

declare module 'material-ui/Divider' {
  export { default } from 'material-ui/Divider/Divider';
  export * from 'material-ui/Divider/Divider';
}

declare module 'material-ui/Divider/Divider' {
  export interface DividerProps {
    absolute?: boolean;
    inset?: boolean;
    light?: boolean;
  }

  export default class Divider extends MaterialUI.Component<DividerProps> {}
}

declare module 'material-ui/Drawer' {
  export { default } from 'material-ui/Drawer/Drawer';
  export * from 'material-ui/Drawer/Drawer';
}

declare module 'material-ui/Drawer/Drawer' {
  import { Theme } from 'material-ui/styles/theme';

  export interface DrawerProps {
    anchor?: 'left' | 'top' | 'right' | 'bottom';
    docked?: boolean;
    elevation?: number;
    enterTransitionDuration?: number;
    leaveTransitionDuration?: number;
    onRequestClose?: React.EventHandler<any>;
    open?: boolean;
    SlideProps?: Object;
    theme: Theme;
  }

  export default class Drawer extends MaterialUI.Component<DrawerProps> {}
}

declare module 'material-ui/Form' {
  export { default as FormGroup } from 'material-ui/Form/FormGroup';
  export * from 'material-ui/Form/FormGroup';
  export { default as FormLabel } from 'material-ui/Form/FormLabel';
  export * from 'material-ui/Form/FormLabel';
  export { default as FormControl } from 'material-ui/Form/FormControl';
  export * from 'material-ui/Form/FormControl';
  export { default as FormHelperText } from 'material-ui/Form/FormHelperText';
  export * from 'material-ui/Form/FormHelperText';
  export {
    default as FormControlLabel,
  } from 'material-ui/Form/FormControlLabel';
  export * from 'material-ui/Form/FormControlLabel';
}

declare module 'material-ui/Form/FormControl' {
  export interface FormControlProps {
    disabled?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    margin?: MaterialUI.PropTypes.Margin;
    onBlur?: React.EventHandler<any>;
    onFocus?: React.EventHandler<any>;
    required?: boolean;
  }

  export default class FormControl extends MaterialUI.Component<
    FormControlProps
  > {}
}

declare module 'material-ui/Form/FormControlLabel' {
  export interface FormControlLabelProps {
    checked?: boolean | string;
    control: React.ReactElement<any>;
    disabled?: boolean;
    inputRef?: Function;
    label: React.ReactNode;
    name?: string;
    onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
    value?: string;
  }

  export default class FormControlLabel extends MaterialUI.Component<
    FormControlLabelProps
  > {}
}

declare module 'material-ui/Form/FormGroup' {
  export interface FormGroupProps {
    row: boolean;
  }

  export default class FormGroup extends MaterialUI.Component<FormGroupProps> {}
}

declare module 'material-ui/Form/FormHelperText' {
  export interface FormHelperTextProps {
    disabled?: boolean;
    error?: boolean;
    margin?: 'dense';
  }

  export default class FormHelperText extends MaterialUI.Component<
    FormHelperTextProps
  > {}
}

declare module 'material-ui/Form/FormLabel' {
  export interface FormLabelProps {
    disabled?: boolean;
    error?: boolean;
    focused?: boolean;
    required?: boolean;
  }

  export default class FormLabel extends MaterialUI.Component<FormLabelProps> {}
}

declare module 'material-ui/Grid' {
  export { default } from 'material-ui/Grid/Grid';
  export * from 'material-ui/Grid/Grid';
}

declare module 'material-ui/Grid/Grid' {
  import { HiddenProps } from 'material-ui/Hidden/Hidden';
  import { Breakpoint } from 'material-ui/styles/breakpoints';

  export type GridAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch';

  export type GridDirection =
    | 'row'
    | 'row-reverse'
    | 'column'
    | 'column-reverse';

  export type GridSpacing = 0 | 8 | 16 | 24 | 40;

  export type GridJustification =
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';

  export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

  export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  export type GridProps = {
    component?: React.ReactNode;
    container?: boolean;
    item?: boolean;
    align?: GridAlignment;
    direction?: GridDirection;
    spacing?: GridSpacing;
    hidden?: HiddenProps;
    justify?: GridJustification;
    wrap?: GridWrap;
  } & Partial<{ [key in Breakpoint]: boolean | GridSize }>;

  export default class Grid extends MaterialUI.Component<GridProps> {}
}

declare module 'material-ui/Hidden' {
  export { default } from 'material-ui/Hidden/Hidden';
  export * from 'material-ui/Hidden/Hidden';
  export { default as HiddenJs } from 'material-ui/Hidden/HiddenJs';
  export * from 'material-ui/Hidden/HiddenJs';
}

declare module 'material-ui/Hidden/Hidden' {
  import { Breakpoint } from 'material-ui/styles/breakpoints';

  export interface HiddenProps {
    only?: Breakpoint | Array<Breakpoint>;
    xsUp?: boolean;
    smUp?: boolean;
    mdUp?: boolean;
    lgUp?: boolean;
    xlUp?: boolean;
    xsDown?: boolean;
    smDown?: boolean;
    mdDown?: boolean;
    lgDown?: boolean;
    xlDown?: boolean;
    implementation?: 'js' | 'css';
  }

  export default class Hidden extends MaterialUI.Component<HiddenProps> {}
}

declare module 'material-ui/Hidden/HiddenJs' {
  import { Breakpoint } from 'material-ui/styles/breakpoints';

  export interface HiddenJsProps {
    only?: Breakpoint | Array<Breakpoint>;
    xsUp?: boolean;
    smUp?: boolean;
    mdUp?: boolean;
    lgUp?: boolean;
    xlUp?: boolean;
    xsDown?: boolean;
    smDown?: boolean;
    mdDown?: boolean;
    lgDown?: boolean;
    xlDown?: boolean;
  }

  export default class HiddenJs extends MaterialUI.Component<HiddenJsProps> {}
}

declare module 'material-ui/Icon' {
  export { default } from 'material-ui/Icon/Icon';
  export * from 'material-ui/Icon/Icon';
}

declare module 'material-ui/Icon/Icon' {
  export interface IconProps {
    color?:
      | 'inherit'
      | 'accent'
      | 'action'
      | 'contrast'
      | 'disabled'
      | 'error'
      | 'primary';
  }

  export default class Icon extends MaterialUI.Component<IconProps> {}
}

declare module 'material-ui/IconButton' {
  export { default } from 'material-ui/IconButton/IconButton';
  export * from 'material-ui/IconButton/IconButton';
}

declare module 'material-ui/IconButton/IconButton' {
  import { ButtonBaseProps } from 'material-ui/internal/ButtonBase';

  export interface IconButtonProps extends ButtonBaseProps {
    color?: MaterialUI.PropTypes.Color | 'contrast';
    disabled?: boolean;
    disableRipple?: boolean;
    rootRef?: Function;
  }

  export default class IconButton extends MaterialUI.Component<
    IconButtonProps
  > {}
}

declare module 'material-ui/Input' {
  export { default } from 'material-ui/Input/Input';
  export * from 'material-ui/Input/Input';
  export { default as InputLabel } from 'material-ui/Input/InputLabel';
  export * from 'material-ui/Input/InputLabel';
  // NOTE: Textarea is missing from exports (intentional?)
}

declare module 'material-ui/Input/Input' {
  export interface InputProps
    extends Partial<MaterialUI.InputEventEmitter<HTMLElement>> {
    autoComplete?: string;
    autoFocus?: boolean;
    component?: React.ReactNode;
    defaultValue?: string | number;
    disabled?: boolean;
    disableUnderline?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    id?: string;
    inputProps?: Object;
    inputRef?: Function;
    margin?: 'dense';
    multiline?: boolean;
    name?: string;
    placeholder?: string;
    rows?: string | number;
    rowsMax?: string | number;
    type?: string;
    value?: string | number;
  }

  export default class Input extends MaterialUI.Component<InputProps> {}
}

declare module 'material-ui/Input/InputLabel' {
  export interface InputLabelProps {
    disableAnimation?: boolean;
    disabled?: boolean;
    error?: boolean;
    focused?: boolean;
    required?: boolean;
    shrink?: boolean;
  }

  export default class InputLabel extends MaterialUI.Component<
    InputLabelProps
  > {}
}

declare module 'material-ui/Input/Textarea' {
  export interface TextareaProps {
    defaultValue?: any;
    disabled?: boolean;
    onChange?: React.EventHandler<React.ChangeEvent<{}>>;
    rows?: string | number;
    rowsMax?: string | number;
    textareaRef?: Function;
    value?: string;
  }

  export default class Textarea extends MaterialUI.Component<TextareaProps> {}
}

declare module 'material-ui/List' {
  export { default } from 'material-ui/List/List';
  export * from 'material-ui/List/List';
  export { default as ListItem } from 'material-ui/List/ListItem';
  export * from 'material-ui/List/ListItem';
  export { default as ListItemAvatar } from 'material-ui/List/ListItemAvatar';
  export * from 'material-ui/List/ListItemAvatar';
  export { default as ListItemText } from 'material-ui/List/ListItemText';
  export * from 'material-ui/List/ListItemText';
  export { default as ListItemIcon } from 'material-ui/List/ListItemIcon';
  export * from 'material-ui/List/ListItemIcon';
  export {
    default as ListItemSecondaryAction,
  } from 'material-ui/List/ListItemSecondaryAction';
  export * from 'material-ui/List/ListItemSecondaryAction';
  export { default as ListSubheader } from 'material-ui/List/ListSubheader';
  export * from 'material-ui/List/ListSubheader';
}

declare module 'material-ui/List/List' {
  export interface ListProps {
    component?: React.ReactNode;
    dense?: boolean;
    disablePadding?: boolean;
    rootRef?: Function;
    subheader?: React.ReactElement<any>;
  }

  export default class List extends MaterialUI.Component<ListProps> {}
}

declare module 'material-ui/List/ListItem' {
  import { ButtonBaseProps } from 'material-ui/internal/ButtonBase';

  type ListItemCommonProps = {
    component?: React.ReactNode;
    dense?: boolean;
    disabled?: boolean;
    disableGutters?: boolean;
    divider?: boolean;
  };

  type ListItemDefaultProps = {
    button?: false;
  } & ListItemCommonProps;

  type ListItemButtonProps = {
    button?: true;
  } & ListItemCommonProps &
    ButtonBaseProps;

  export type ListItemProps = ListItemDefaultProps | ListItemButtonProps;

  export default class ListItem extends MaterialUI.Component<ListItemProps> {}
}

declare module 'material-ui/List/ListItemAvatar' {
  export interface ListItemAvatarProps {}

  export default class ListItemAvatar extends MaterialUI.Component<
    ListItemAvatarProps
  > {}
}

declare module 'material-ui/List/ListItemIcon' {
  export interface ListItemIconProps {}

  export default class ListItemIcon extends MaterialUI.Component<
    ListItemIconProps
  > {}
}

declare module 'material-ui/List/ListItemSecondaryAction' {
  export interface ListItemSecondaryActionProps {}

  export default class ListItemSecondaryAction extends MaterialUI.Component<
    ListItemSecondaryActionProps
  > {}
}

declare module 'material-ui/List/ListItemText' {
  export interface ListItemTextProps {
    disableTypography?: boolean;
    inset?: boolean;
    primary?: React.ReactNode;
    secondary?: React.ReactNode;
  }

  export default class ListItemText extends MaterialUI.Component<
    ListItemTextProps
  > {}
}

declare module 'material-ui/List/ListSubheader' {
  export interface ListSubheaderProps {
    color?: 'default' | 'primary' | 'inherit';
    inset?: boolean;
  }

  export default class ListSubheader extends MaterialUI.Component<
    ListSubheaderProps
  > {}
}

declare module 'material-ui/Menu' {
  export { default } from 'material-ui/Menu/Menu';
  export * from 'material-ui/Menu/Menu';
  export { default as MenuList } from 'material-ui/Menu/MenuList';
  export * from 'material-ui/Menu/MenuList';
  export { default as MenuItem } from 'material-ui/Menu/MenuItem';
  export * from 'material-ui/Menu/MenuItem';
}

declare module 'material-ui/Menu/Menu' {
  import { TransitionHandlers } from 'material-ui/internal/Transition';
  export interface MenuProps extends Partial<TransitionHandlers> {
    anchorEl?: HTMLElement;
    MenuListProps?: Object;
    onRequestClose?: React.EventHandler<any>;
    open?: boolean;
    transitionDuration?: number | 'auto';
  }

  export default class Menu extends MaterialUI.Component<MenuProps> {}
}

declare module 'material-ui/Menu/MenuItem' {
  export interface MenuItemProps {
    component?: React.ReactNode;
    role?: string;
    selected?: boolean;
  }

  export default class MenuItem extends MaterialUI.Component<MenuItemProps> {}
}

declare module 'material-ui/Menu/MenuList' {
  export interface MenuListProps {
    onBlur?: Function;
    onKeyDown?: React.ReactEventHandler<React.KeyboardEvent<any>>;
  }

  export default class MenuList extends MaterialUI.Component<MenuListProps> {}
}

declare module 'material-ui/MobileStepper' {
  export { default } from 'material-ui/MobileStepper/MobileStepper';
  export * from 'material-ui/MobileStepper/MobileStepper';
}

declare module 'material-ui/MobileStepper/MobileStepper' {
  export interface MobileStepperProps {
    activeStep?: number;
    backButtonText?: React.ReactNode;
    disableBack?: boolean;
    disableNext?: boolean;
    nextButtonText?: React.ReactNode;
    onBack: React.EventHandler<any>;
    onNext: React.EventHandler<any>;
    position?: 'bottom' | 'top' | 'static';
    steps: number;
    type?: 'text' | 'dots' | 'progress';
  }

  export default class MobileStepper extends MaterialUI.Component<
    MobileStepperProps
  > {}
}

declare module 'material-ui/Paper' {
  export { default } from 'material-ui/Paper/Paper';
  export * from 'material-ui/Paper/Paper';
}

declare module 'material-ui/Paper/Paper' {
  export interface PaperProps {
    component?: React.ReactNode;
    elevation?: number;
    square?: boolean;
  }

  export default class Paper extends MaterialUI.Component<PaperProps> {}
}

declare module 'material-ui/Progress' {
  export {
    default as CircularProgress,
  } from 'material-ui/Progress/CircularProgress';
  export * from 'material-ui/Progress/CircularProgress';
  export {
    default as LinearProgress,
  } from 'material-ui/Progress/LinearProgress';
  export * from 'material-ui/Progress/LinearProgress';
}

declare module 'material-ui/Progress/CircularProgress' {
  export interface CircularProgressProps {
    color?: 'primary' | 'accent';
    max?: number;
    min?: number;
    mode?: 'determinate' | 'indeterminate';
    size?: number;
    value?: number;
  }

  export default class CircularProgress extends MaterialUI.Component<
    CircularProgressProps
  > {}
}

declare module 'material-ui/Progress/LinearProgress' {
  export interface LinearProgressProps {
    color?: 'primary' | 'accent';
    mode?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
    value?: number;
    valueBuffer?: number;
  }

  export default class LinearProgress extends MaterialUI.Component<
    LinearProgressProps
  > {}
}

declare module 'material-ui/Radio' {
  export { default } from 'material-ui/Radio/Radio';
  export * from 'material-ui/Radio/Radio';
  export { default as RadioGroup } from 'material-ui/Radio/RadioGroup';
  export * from 'material-ui/Radio/RadioGroup';
}

declare module 'material-ui/Radio/Radio' {
  export interface RadioProps {
    checked?: boolean | string;
    checkedClassName?: string;
    checkedIcon?: React.ReactNode;
    defaultChecked?: boolean;
    disabled?: boolean;
    disabledClassName?: string;
    disableRipple?: boolean;
    icon?: React.ReactNode;
    inputProps?: Object;
    inputRef?: Function;
    name?: string;
    onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
    tabIndex?: string;
    value?: string;
  }

  export default class Radio extends MaterialUI.Component<RadioProps> {}
}

declare module 'material-ui/Radio/RadioGroup' {
  export interface RadioGroupProps {
    className?: string;
    name?: string;
    onBlur?: React.EventHandler<any>;
    onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
    onKeyDown?: React.EventHandler<any>;
    selectedValue?: string;
  }

  export default class RadioGroup extends MaterialUI.Component<
    RadioGroupProps
  > {}
}

declare module 'material-ui/Snackbar' {
  export { default } from 'material-ui/Snackbar/Snackbar';
  export * from 'material-ui/Snackbar/Snackbar';
  export {
    default as SnackbarContent,
  } from 'material-ui/Snackbar/SnackbarContent';
  export * from 'material-ui/Snackbar/SnackbarContent';
}

declare module 'material-ui/Snackbar/Snackbar' {
  import { TransitionHandlers } from 'material-ui/internal/Transition';
  export type Origin = {
    horizontal?: 'left' | 'center' | 'right' | number;
    vertical?: 'top' | 'center' | 'bottom' | number;
  };

  export interface SnackbarProps extends Partial<TransitionHandlers> {
    action?: React.ReactElement<any>;
    anchorOrigin?: Origin;
    autoHideDuration?: number;
    enterTransitionDuration?: number;
    key?: number;
    leaveTransitionDuration?: number;
    message?: React.ReactElement<any>;
    onMouseEnter?: React.MouseEventHandler<any>;
    onMouseLeave?: React.MouseEventHandler<any>;
    onRequestClose?: (event: React.SyntheticEvent<any>, reason: string) => void;
    open: boolean;
    SnackbarContentProps?: Object;
    transition?: React.ReactNode;
  }

  export default class Snackbar extends MaterialUI.Component<SnackbarProps> {}
}

declare module 'material-ui/Snackbar/SnackbarContent' {
  export interface SnackbarContentProps {
    action?: React.ReactElement<any>;
    message: React.ReactElement<any>;
  }

  export default class SnackbarContent extends MaterialUI.Component<
    SnackbarContentProps
  > {}
}

declare module 'material-ui/SvgIcon' {
  export { default } from 'material-ui/SvgIcon/SvgIcon';
  export * from 'material-ui/SvgIcon/SvgIcon';
}

declare module 'material-ui/SvgIcon/SvgIcon' {
  export interface SvgIconProps {
    titleAccess?: string;
    viewBox?: string;
  }

  export default class SvgIcon extends MaterialUI.Component<SvgIconProps> {}
}

declare module 'material-ui/Switch' {
  export { default } from 'material-ui/Switch/Switch';
  export * from 'material-ui/Switch/Switch';
}

declare module 'material-ui/Switch/Switch' {
  export interface SwitchProps {
    checked?: boolean | string;
    checkedClassName?: string;
    checkedIcon?: React.ReactNode;
    defaultChecked?: boolean;
    disabled?: boolean;
    disabledClassName?: string;
    disableRipple?: boolean;
    icon?: React.ReactNode;
    inputProps?: object;
    name?: string;
    onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
    tabIndex?: string;
    value?: string;
  }

  export default class Switch extends MaterialUI.Component<SwitchProps> {}
}

declare module 'material-ui/Table' {
  export { default } from 'material-ui/Table/Table';
  export * from 'material-ui/Table/Table';
  export { default as TableHead } from 'material-ui/Table/TableHead';
  export * from 'material-ui/Table/TableHead';
  export { default as TableBody } from 'material-ui/Table/TableBody';
  export * from 'material-ui/Table/TableBody';
  export { default as TableRow } from 'material-ui/Table/TableRow';
  export * from 'material-ui/Table/TableRow';
  export { default as TableCell } from 'material-ui/Table/TableCell';
  export * from 'material-ui/Table/TableCell';
  export { default as TableSortLabel } from 'material-ui/Table/TableSortLabel';
  export * from 'material-ui/Table/TableSortLabel';
}

declare module 'material-ui/Table/Table' {
  export interface TableProps {}

  export default class Table extends MaterialUI.Component<TableProps> {}
}

declare module 'material-ui/Table/TableBody' {
  export interface TableBodyProps {}

  export default class TableBody extends MaterialUI.Component<TableBodyProps> {}
}

declare module 'material-ui/Table/TableCell' {
  export interface TableCellProps {
    checkbox?: boolean;
    compact?: boolean;
    disablePadding?: boolean;
    numeric?: boolean;
  }

  export default class TableCell extends MaterialUI.Component<TableCellProps> {}
}

declare module 'material-ui/Table/TableHead' {
  export interface TableHeadProps {}

  export default class TableHead extends MaterialUI.Component<TableHeadProps> {}
}

declare module 'material-ui/Table/TableRow' {
  export interface TableRowProps {
    hover?: boolean;
    selected?: boolean;
  }

  export default class TableRow extends MaterialUI.Component<TableRowProps> {}
}

declare module 'material-ui/Table/TableSortLabel' {
  import { ButtonBaseProps } from 'material-ui/internal/ButtonBase';

  export interface TableSortLabelProps extends ButtonBaseProps {
    active?: boolean;
    direction?: 'asc' | 'desc';
  }

  export default class TableSortLabel extends MaterialUI.Component<
    TableSortLabelProps
  > {}
}

declare module 'material-ui/Tabs' {
  export { default } from 'material-ui/Tabs/Tabs';
  export * from 'material-ui/Tabs/Tabs';
  export { default as Tab } from 'material-ui/Tabs/Tab';
  export * from 'material-ui/Tabs/Tab';
}

declare module 'material-ui/Tabs/Tab' {
  export interface TabProps {
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    index?: number;
    label?: React.ReactNode;
    onChange?: (
      event: React.ChangeEvent<{ checked: boolean }>,
      index: number
    ) => void;
    onClick?: React.EventHandler<any>;
    selected?: boolean;
    style?: object;
    textColor?: string | 'accent' | 'primary' | 'inherit';
  }

  export default class Tab extends MaterialUI.Component<TabProps> {}
}

declare module 'material-ui/Tabs/TabIndicator' {
  export interface TabIndicatorProps {
    color: 'accent' | 'primary' | string;
    style: { left: number; width: number };
  }

  export default class TabIndicator extends MaterialUI.Component<
    TabIndicatorProps
  > {}
}

declare module 'material-ui/Tabs/TabScrollButton' {
  import { ButtonBaseProps } from 'material-ui/internal/ButtonBase';

  export interface TabScrollButtonProps extends ButtonBaseProps {
    direction?: 'left' | 'right';
    visible?: boolean;
  }

  export default class TabScrollButton extends MaterialUI.Component<
    TabScrollButtonProps
  > {}
}

declare module 'material-ui/Tabs/Tabs' {
  import { ButtonBaseProps } from 'material-ui/internal/ButtonBase';

  export interface TabsProps extends ButtonBaseProps {
    buttonClassName?: string;
    centered?: boolean;
    children?: React.ReactNode;
    fullWidth?: boolean;
    index: false | number;
    indicatorClassName?: string;
    indicatorColor?: 'accent' | 'primary' | string;
    onChange: (event: React.ChangeEvent<{}>, index: number) => void;
    scrollable?: boolean;
    scrollButtons?: 'auto' | 'on' | 'off';
    textColor?: 'accent' | 'primary' | 'inherit' | string;
    width?: string;
  }

  export default class Tabs extends MaterialUI.Component<TabsProps> {}
}

declare module 'material-ui/TextField' {
  export { default } from 'material-ui/TextField/TextField';
  export * from 'material-ui/TextField/TextField';
}

declare module 'material-ui/TextField/TextField' {
  export interface InputProps
    extends Partial<MaterialUI.InputEventEmitter<HTMLElement>> {
    autoComplete?: string;
    autoFocus?: boolean;
    defaultValue?: string | number;
    disabled?: boolean;
    error?: boolean;
    FormHelperTextProps?: Object;
    fullWidth?: boolean;
    helperText?: React.ReactNode;
    helperTextClassName?: string;
    id?: string;
    inputClassName?: string;
    InputClassName?: string;
    InputLabelProps?: Object;
    inputProps?: Object;
    InputProps?: Object;
    inputRef?: Function;
    label?: React.ReactElement<any> | string;
    labelClassName?: string;
    multiline?: boolean;
    name?: string;
    placeholder?: string;
    required?: boolean;
    rootRef?: Function;
    rows?: string | number;
    rowsMax?: string | number;
    type?: string;
    value?: string | number;
    margin?: MaterialUI.PropTypes.Margin;
  }

  export default class Input extends MaterialUI.Component<InputProps> {}
}

declare module 'material-ui/Toolbar' {
  export { default } from 'material-ui/Toolbar/Toolbar';
  export * from 'material-ui/Toolbar/Toolbar';
}

declare module 'material-ui/Toolbar/Toolbar' {
  export interface ToolbarProps {
    disableGutters?: boolean;
  }

  export default class Toolbar extends MaterialUI.Component<ToolbarProps> {}
}

declare module 'material-ui/Typography' {
  export { default } from 'material-ui/Typography/Typography';
  export * from 'material-ui/Typography/Typography';
}

declare module 'material-ui/Typography/Typography' {
  import { Style, TextStyle } from 'material-ui/styles/typography';
  export interface TypographyProps {
    align?: MaterialUI.PropTypes.Alignment;
    component?: React.ReactNode;
    color?: MaterialUI.PropTypes.Color | 'secondary';
    gutterBottom?: boolean;
    headlineMapping?: { [type in TextStyle]: string };
    noWrap?: boolean;
    paragraph?: boolean;
    type?: Style | 'caption' | 'button';
  }

  export default class Typography extends MaterialUI.Component<
    TypographyProps
  > {}
}

/* ============================================= */
/*                                               */
/*                     COLORS                    */
/*                                               */
/* ============================================= */

declare module 'material-ui/colors' {
  export type Contrast = 'light' | 'dark' | 'brown';
  export interface Color<C extends Contrast = 'light'> {
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
    contrastDefaultColor: C;
  }

  export const amber: Color<'dark'>;
  export const blue: Color;
  export const blueGrey: Color;
  export const brown: Color<'brown'>;
  export const cyan: Color<'dark'>;
  export const deepOrange: Color;
  export const deepPurple: Color;
  export const green: Color<'dark'>;
  export const grey: Color<'dark'>;
  export const indigo: Color;
  export const lightBlue: Color<'dark'>;
  export const lightGreen: Color<'dark'>;
  export const lime: Color<'dark'>;
  export const orange: Color<'dark'>;
  export const pink: Color;
  export const purple: Color;
  export const red: Color;
  export const teal: Color<'dark'>;
  export const yellow: Color<'dark'>;

  // From `/common`
  export const black: string;
  export const white: string;

  export const darkBlack: string;
  export const darkWhite: string;
  export const faintBlack: string;
  export const fullBlack: string;
  export const fullWhite: string;
  export const lightBlack: string;
  export const lightWhite: string;
  export const minBlack: string;
  export const transparent: string;
}

/* ============================================= */
/*                                               */
/*                   INTERNAL                    */
/*                                               */
/* ============================================= */

declare module 'material-ui/internal' {
  /**
   * NOTE: There is much more inside this module,
   * but not sure if this should be exposed or not.
   */
}

declare module 'material-ui/internal/Transition' {
  export type TransitionCallback = (element: HTMLElement) => void;
  export type TransitionRequestTimeout = (element: HTMLElement) => number;

  export type TransitionHandlers = {
    onEnter: TransitionCallback;
    onEntering: TransitionCallback;
    onEntered: TransitionCallback;
    onExit: TransitionCallback;
    onExiting: TransitionCallback;
    onExited: TransitionCallback;
  };

  export interface TransitionProps extends Partial<TransitionHandlers> {
    children?: React.ReactElement<any>;
    className?: string;
    enteredClassName?: string;
    enteringClassName?: string;
    exitedClassName?: string;
    exitingClassName?: string;
    in?: boolean;
    onRequestTimeout?: TransitionRequestTimeout;
    timeout?: number;
    transitionAppear?: boolean;
    unmountOnExit?: boolean;
  }

  export default class Transition extends React.Component<TransitionProps> {}
}

declare module 'material-ui/internal/ButtonBase' {
  export interface ButtonBaseProps {
    centerRipple?: boolean;
    component?: React.ReactNode;
    disabled?: boolean;
    disableRipple?: boolean;
    focusRipple?: boolean;
    keyboardFocusedClassName?: string;
    onBlur?: React.FocusEventHandler<{}>;
    onClick?: React.MouseEventHandler<{}>;
    onFocus?: React.FocusEventHandler<{}>;
    onKeyboardFocus?: React.FocusEventHandler<{}>;
    onKeyDown?: React.KeyboardEventHandler<{}>;
    onKeyUp?: React.KeyboardEventHandler<{}>;
    onMouseDown?: React.MouseEventHandler<{}>;
    onMouseLeave?: React.MouseEventHandler<{}>;
    onMouseUp?: React.MouseEventHandler<{}>;
    onTouchEnd?: React.TouchEventHandler<{}>;
    onTouchStart?: React.TouchEventHandler<{}>;
    role?: string;
    tabIndex?: string;
    type?: string;
  }

  export default class ButtonBase extends MaterialUI.Component<
    ButtonBaseProps
  > {}
}

/* ============================================= */
/*                                               */
/*                     STYLES                    */
/*                                               */
/* ============================================= */

declare module 'material-ui/styles' {
  export {
    default as MuiThemeProvider,
  } from 'material-ui/styles/MuiThemeProvider';
  export { default as createBreakpoints } from 'material-ui/styles/breakpoints';
  export { default as createMuiTheme } from 'material-ui/styles/theme';
  export { default as createPalette } from 'material-ui/styles/palette';
  export {
    default as createStyleSheet,
  } from 'material-ui/styles/createStyleSheet';
  export { default as createTypography } from 'material-ui/styles/typography';
  export { default as withStyles } from 'material-ui/styles/withStyles';
  export { default as withTheme } from 'material-ui/styles/withTheme';
}

declare module 'material-ui/styles/MuiThemeProvider' {
  import { Theme } from 'material-ui/styles/theme';

  export interface MuiThemeProviderProps {
    theme?: Theme<any>;
    sheetsManager?: Object;
    children: React.ReactNode;
  }

  export default class MuiThemeProvider extends React.Component<
    MuiThemeProviderProps
  > {}
}

declare module 'material-ui/styles/breakpoints' {
  export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  export type BreakpointMap = { [key in Breakpoint]: number };
  export const keys: Breakpoint[];

  export interface BreakpointsOptions {
    breakpoints: BreakpointMap;
    unit: string;
    step: number;
  }

  export interface Breakpoints {
    keys: typeof keys;
    values: BreakpointMap;
    up: (key: Breakpoint) => string;
    down: (key: Breakpoint) => string;
    between: (start: Breakpoint, end: Breakpoint) => string;
    only: (key: Breakpoint) => string;
    getWidth: (key: Breakpoint) => number;
  }

  function createBreakpoints(
    options?: Partial<BreakpointsOptions>
  ): Breakpoints;

  export default createBreakpoints;
}

declare module 'material-ui/styles/colorManipulator' {
  export type ColorFormat = 'rgb' | 'rgba' | 'hsl' | 'hsla';
  export type ColorObject = {
    type: ColorFormat;
    color: [number, number, number] | [number, number, number, number];
  };

  export function convertColorToString(color: ColorObject): string;
  export function convertHexToRGB(hex: string): string;
  export function decomposeColor(color: string): ColorObject;
  export function getContrastRatio(
    foreground: string,
    background: string
  ): number;
  export function getLuminance(color: string): number;
  export function emphasize(color: string, coefficient?: number): string;
  export function fade(color: string, value: number): string;
  export function darken(color: string, coefficient?: number): string;
  export function lighten(color: string, coefficient?: number): string;
}

declare module 'material-ui/styles/createGenerateClassName' {
  /**
   * FIXME: `jss` TS typings are bad and incomplete ...
   *        So the following typigns are not really good.
   */
  export default function createGenerateClassName(): (
    rule: Object,
    stylesheet?: Object
  ) => string;
}

declare module 'material-ui/styles/createStyleSheet' {
  import { Theme } from 'material-ui/styles/theme';

  export interface StyleRules {
    [displayName: string]: Partial<React.CSSProperties>;
  }

  export interface StyleRulesCallback<Theme> {
    (theme: Theme): StyleRules;
  }

  export interface StyleSheet {
    name: string | false;
    createStyles<T extends Theme = Theme>(theme: T): StyleRules;
    options: Object;
    themingEnabled: boolean;
  }

  export default function createStyleSheet<T extends Theme = Theme>(
    callback: StyleRulesCallback<Theme> | StyleRules
  ): StyleSheet;
  export default function createStyleSheet<T extends Theme = Theme>(
    name: string,
    callback: StyleRulesCallback<Theme> | StyleRules,
    options?: Object
  ): StyleSheet;
}

declare module 'material-ui/styles/mixins' {
  import { Spacing } from 'material-ui/styles/spacing';
  import { Breakpoints } from 'material-ui/styles/breakpoints';

  export interface Mixins {
    gutters: (styles: Object) => Object;
  }

  export default function createMixins(
    breakpoints: Breakpoints,
    spacing: Spacing
  ): Mixins;
}

declare module 'material-ui/styles/palette' {
  import { grey, Color, Contrast } from 'material-ui/colors';

  export type Shade = {
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      hint: string;
      icon: string;
      divider: string;
      lightDivider: string;
    };
    input: {
      bottomLine: string;
      helperText: string;
      labelText: string;
      inputText: string;
      disabled: string;
    };
    action: {
      active: string;
      disabled: string;
    };
    background: {
      default: string;
      paper: string;
      appBar: string;
      contentFrame: string;
      status: string;
    };
  };

  export const light: Shade;
  export const dark: Shade;

  type PaletteOptions = {
    primary: Color;
    accent: Color;
    error: Color;
    type: Contrast;
  };

  export type Palette = {
    grey: typeof grey;
    getContrastText: (color: string) => string;
  } & PaletteOptions &
    Shade;

  export default function createPalette(
    options?: Partial<PaletteOptions>
  ): Palette;
}

declare module 'material-ui/styles/shadows' {
  const shadows: [
    'none',
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];

  export type Shadows = typeof shadows;
  export default shadows;
}

declare module 'material-ui/styles/spacing' {
  const spacing: {
    unit: number;
  };

  export type Spacing = typeof spacing;
  export default spacing;
}

declare module 'material-ui/styles/theme' {
  import { Breakpoints } from 'material-ui/styles/breakpoints';
  import { Mixins } from 'material-ui/styles/mixins';
  import { Palette } from 'material-ui/styles/palette';
  import { Shadows } from 'material-ui/styles/shadows';
  import { Spacing } from 'material-ui/styles/spacing';
  import { Transitions } from 'material-ui/styles/transitions';
  import { Typography } from 'material-ui/styles/typography';
  import { ZIndex } from 'material-ui/styles/zIndex';

  export interface ThemeOptions {
    breakpoints: Breakpoints;
    mixins: Mixins;
    palette: Palette;
    typography: Typography;
  }

  export type Theme<T = {}> = {
    direction: 'ltr';
    shadows: Shadows;
    spacing: Spacing;
    transitions: Transitions;
    zIndex: ZIndex;
  } & ThemeOptions &
    T;

  export default function createMuiTheme<T = {}>(
    options?: Partial<ThemeOptions> & T
  ): Theme<T>;
}

declare module 'material-ui/styles/themeListener' {
  // This is using this API: https://github.com/vesparny/brcast
  interface MuiContext {
    getState(): Object;
    subscribe(callback: Function): Function;
  }

  export interface ThemeListener {
    contextTypes: {
      'material-ui': object;
    };
    initial(context: Object): Object;
    subscribe(context: Object, callback: Function): Function;
  }

  const themeListener: ThemeListener;
  export default themeListener;
}

declare module 'material-ui/styles/transitions' {
  export interface Easing {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
  }
  export const easing: Easing;

  export interface Duration {
    shortest: number;
    shorter: number;
    short: number;
    standard: number;
    complex: number;
    enteringScreen: number;
    leavingScreen: number;
  }
  export const duration: Duration;

  export function formatMs(milliseconds: number): string;

  export interface Transitions {
    easing: Easing;
    duration: Duration;
    create(
      props: string | string[],
      options?: Partial<{ duration: number; easing: string; delay: number }>
    ): string;
    getAutoHeightDuration(height: number): number;
  }
  const transitions: Transitions;
  export default transitions;
}

declare module 'material-ui/styles/typography' {
  import { Palette } from 'material-ui/styles/palette';

  export type TextStyle =
    | 'display1'
    | 'display2'
    | 'display3'
    | 'display4'
    | 'headline'
    | 'title'
    | 'subheading'
    | 'body1'
    | 'body2'
    | 'caption';

  export type Style = TextStyle | 'button';

  export interface FontStyle {
    fontFamily: string;
    fontSize: number | string;
    fontWeightLight: number | string;
    fontWeightRegular: number | string;
    fontWeightMedium: number | string;
  }

  export interface TypographyStyle {
    color: string;
    fontFamily: string;
    fontSize: number | string;
    fontWeight: number | string;
    letterSpacing: string;
    lineHeight: number | string;
  }

  export type Typography = { [type in Style]: TypographyStyle } & FontStyle;

  function createTypography(
    palette: Palette,
    constants?: FontStyle
  ): Typography;

  export default createTypography;
}

declare module 'material-ui/styles/withStyles' {
  import { Theme } from 'material-ui/styles/theme';
  import { StyleSheet } from 'material-ui/styles/createStyleSheet';

  const withStyles: <P = {}, ClassNames = {}>(
    stylesheets: StyleSheet | StyleSheet[],
    options?: Partial<{ withTheme: boolean }>
  ) => (
    component: React.ComponentType<P & { classes: ClassNames }>
  ) => React.ComponentClass<P>;

  export default withStyles;
}

declare module 'material-ui/styles/withTheme' {
  import { Theme } from 'material-ui/styles/theme';

  const withTheme: <P = {}, T extends Theme = Theme>(
    component: React.ComponentType<P & { theme: T }>
  ) => React.ComponentClass<P>;

  export default withTheme;
}

declare module 'material-ui/styles/zIndex' {
  export interface ZIndex {
    mobileStepper: number;
    menu: number;
    appBar: number;
    drawerOverlay: number;
    navDrawer: number;
    dialogOverlay: number;
    dialog: number;
    layer: number;
    popover: number;
    snackbar: number;
    tooltip: number;
  }

  const zIndex: ZIndex;
  export default zIndex;
}

/* ============================================= */
/*                                               */
/*                    TESTING                    */
/*                                               */
/* ============================================= */

declare module 'material-ui/test-utils' {
  export {
    default as createShallow,
  } from 'material-ui/test-utils/createShallow';
  export { default as createMount } from 'material-ui/test-utils/createMount';
  export { default as createRender } from 'material-ui/test-utils/createRender';
  export { default as getClasses } from 'material-ui/test-utils/getClasses';
}

declare module 'material-ui/test-utils/createMount' {
  import { mount } from 'enzyme';

  export interface MountOptions {
    mount: typeof mount;
  }

  export default function createMount(
    options?: Partial<MountOptions>
  ): typeof mount & {
    attachTo: HTMLElement;
    cleanUp: Function;
  };
}

declare module 'material-ui/test-utils/createRender' {
  import { render } from 'enzyme';

  export interface RenderOptions {
    render: typeof render;
  }

  export default function createRender(
    options?: Partial<RenderOptions>
  ): typeof render & { cleanUp: Function };
}

declare module 'material-ui/test-utils/createShallow' {
  import { shallow } from 'enzyme';

  export interface ShallowOptions {
    shallow: typeof shallow;
    otherContext: Object;
    dive: boolean;
    untilSelector: boolean;
  }

  export default function createShallow(
    options?: Partial<ShallowOptions>
  ): typeof shallow;
}

declare module 'material-ui/test-utils/getClasses' {
  import { StyleSheet } from 'material-ui/styles/createStyleSheet';

  export default function getClasses<T = { [name: string]: string }>(
    stylesheets: StyleSheet | StyleSheet[],
    options?: Partial<{ withTheme: boolean }>
  ): T;
}

declare module 'material-ui/test-utils/until' {
  import { CommonWrapper } from 'enzyme';

  export default function until<P = any, S = any>(
    selector: string,
    options: { context: Object }
  ): CommonWrapper<P, S>;
}

/* ============================================= */
/*                                               */
/*                     UTILS                     */
/*                                               */
/* ============================================= */

declare module 'material-ui/utils/addEventListener' {
  export default function addEventListener(
    node: Node,
    event: string,
    handler: (e: Event) => never,
    capture?: boolean
  ): { remove(): void };
}

declare module 'material-ui/utils/helpers' {
  export function capitalizeFirstLetter(str: string): string;
  export function contains(obj: Object, pred: Object): boolean;
  export function findIndex(arr: any[], pred: any): number;
  export function find<T>(arr: T[], pred: any): T;
  export function createChainedFunction(
    ...funcs: Function[]
  ): (...args: any[]) => never;
}

declare module 'material-ui/utils/keyboardFocus' {
  export function focusKeyPressed(pressed: boolean): boolean;
  export function detectKeyboardFocus(
    instance: {
      keyboardFocusTimeout: any;
      keyboardFocusCheckTime: number;
      keyboardFocusMaxCheckTimes: number;
    },
    element: Element,
    cb: Function,
    attempt: number
  ): never;
  export function listenForFocusKeys(): never;
}

declare module 'material-ui/utils/manageAriaHidden' {
  export function ariaHidden(show: boolean, node: Node): never;
  export function hideSiblings(container: Element, mountNode: Node): never;
  export function showSiblings(container: Element, mountNode: Node): never;
}

declare module 'material-ui/utils/reactHelpers' {
  export function cloneChildrenWithClassName<T>(
    children: React.ReactNode,
    className: string
  ): T[];
}

declare module 'material-ui/utils/requirePropFactory' {
  // Internal anyway ...
  export default function requirePropFactory(componentNameInError: string): any;
}

declare module 'material-ui/utils/withWidth' {
  import { Breakpoint } from 'material-ui/styles/breakpoints';
  export interface WithWidthOptions {
    resizeInterval: number;
  }

  export interface WithWidthEnhancement {
    width: number;
  }

  export function isWidthUp(
    breakpoint: Breakpoint,
    screenWidth: number,
    inclusive?: boolean
  ): boolean;

  export default function withWidth<P = {}>(
    options?: WithWidthOptions
  ): (
    component: React.ComponentType<P>
  ) => React.ComponentClass<P & WithWidthEnhancement>;
}
