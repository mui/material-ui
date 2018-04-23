// flow-typed signature: c30f67b0b88c8cea0ad8d876abb8d42e
// flow-typed version: f6dc3bf38d/material-ui_v1.x.x/flow_>=v0.58.x

declare module "material-ui/AppBar/AppBar" {
  declare type Color = "inherit" | "primary" | "secondary" | "default";
  declare type Position = "fixed" | "absolute" | "sticky" | "static";

  declare module.exports: React$ComponentType<{
    children?: React$Node,
    className?: string,
    classes?: Object,
    color?: Color,
    position?: Position
  }>;
}

declare module "material-ui/AppBar" {
  declare module.exports: $Exports<"material-ui/AppBar/AppBar">;
}

declare module "material-ui/Avatar/Avatar" {
  declare module.exports: React$ComponentType<{
    alt?: string,
    children?: string | React$Element<any>,
    childrenClassName?: string,
    className?: string,
    classes?: Object,
    component?: React$ElementType,
    imgProps?: Object,
    sizes?: string,
    src?: string,
    srcSet?: string
  }>;
}

declare module "material-ui/Avatar" {
  declare module.exports: $Exports<"material-ui/Avatar/Avatar">;
}

declare module "material-ui/Badge/Badge" {
  declare type Color = "default" | "primary" | "accent";

  declare module.exports: React$ComponentType<{
    badgeContent: React$Node,
    children: React$Node,
    className?: string,
    classes?: Object,
    color?: Color
  }>;
}

declare module "material-ui/Badge" {
  declare module.exports: $Exports<"material-ui/Badge/Badge">;
}

declare module "material-ui/BottomNavigation/BottomNavigation" {
  declare module.exports: React$ComponentType<{
    children: React$Node,
    className?: string,
    classes?: Object,
    onChange?: Function,
    showLabels?: boolean,
    value: any
  }>;
}

declare module "material-ui/BottomNavigation/BottomNavigationAction" {
  declare module.exports: React$ComponentType<{
    className?: string,
    classes?: Object,
    icon?: string | React$Element<any>,
    label?: React$Node,
    onChange?: Function,
    onClick?: Function,
    selected?: boolean,
    showLabel?: boolean,
    value?: any
  }>;
}

declare module "material-ui/BottomNavigation" {
  declare export var BottomNavigationAction: $Exports<
    "material-ui/BottomNavigation/BottomNavigationAction"
  >;
  declare export default $Exports<
    "material-ui/BottomNavigation/BottomNavigation"
  >;
}

declare module "material-ui/Button/Button" {
  declare type Color = "default" | "inherit" | "primary" | "secondary";

  declare module.exports: React$ComponentType<{
    children: React$Node,
    className?: string,
    classes?: Object,
    color?: Color,
    component?: React$ElementType,
    dense?: boolean,
    disableFocusRipple?: boolean,
    disabled?: boolean,
    disableRipple?: boolean,
    fab?: boolean,
    href?: string,
    raised?: boolean,
    type?: string
  }>;
}

declare module "material-ui/Button" {
  declare module.exports: $Exports<"material-ui/Button/Button">;
}

declare module "material-ui/ButtonBase/ButtonBase" {
  declare module.exports: React$ComponentType<{
    centerRipple?: boolean,
    children?: React$Node,
    className?: string,
    classes?: Object,
    component?: React$ElementType,
    disableRipple?: boolean,
    disabled?: boolean,
    focusRipple?: boolean,
    keyboardFocusedClassName?: string,
    onBlur?: Function,
    onClick?: Function,
    onFocus?: Function,
    onKeyDown?: Function,
    onKeyUp?: Function,
    onKeyboardFocus?: (event: SyntheticEvent<>) => void,
    onMouseDown?: Function,
    onMouseLeave?: Function,
    onMouseUp?: Function,
    onTouchEnd?: Function,
    onTouchMove?: Function,
    onTouchStart?: Function,
    role?: string,
    rootRef?: Function,
    tabIndex?: number | string,
    type?: string
  }>;
}

declare module "material-ui/ButtonBase/createRippleHandler" {
  declare function handleEvent(event: SyntheticUIEvent<>): void;
  declare module.exports: (
    instance: Object,
    eventName: string,
    action: string,
    cb: ?Function
  ) => handleEvent;
}

declare module "material-ui/ButtonBase" {
  declare module.exports: $Exports<"material-ui/ButtonBase/ButtonBase">;
}

declare module "material-ui/ButtonBase/Ripple" {
  declare module.exports: React$ComponentType<{
    className?: string,
    classes?: Object,
    pulsate?: boolean,
    rippleSize: number,
    rippleX: number,
    rippleY: number
  }>;
}

declare module "material-ui/ButtonBase/TouchRipple" {
  declare module.exports: React$ComponentType<{
    center?: boolean,
    className?: string,
    classes?: Object
  }>;
}

declare module "material-ui/Card/Card" {
  declare module.exports: React$ComponentType<{
    className?: string,
    raised?: boolean
  }>;
}

declare module "material-ui/Card/CardActions" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    className?: string,
    classes?: Object,
    disableActionSpacing?: boolean
  }>;
}

declare module "material-ui/Card/CardContent" {
  declare module.exports: React$ComponentType<{
    className?: string,
    classes?: Object
  }>;
}

declare module "material-ui/Card/CardHeader" {
  declare module.exports: React$ComponentType<{
    action?: React$Node,
    avatar?: React$Node,
    className?: string,
    classes?: Object,
    subheader?: React$Node,
    title?: React$Node
  }>;
}

declare module "material-ui/Card/CardMedia" {
  declare module.exports: React$ComponentType<{
    className?: string,
    classes?: Object,
    component?: React$ElementType,
    image?: string,
    src?: string,
    style?: Object
  }>;
}

declare module "material-ui/Card" {
  declare export var CardActions: $Exports<"material-ui/Card/CardActions">;
  declare export var CardContent: $Exports<"material-ui/Card/CardContent">;
  declare export var CardHeader: $Exports<"material-ui/Card/CardHeader">;
  declare export var CardMedia: $Exports<"material-ui/Card/CardMedia">;
  declare export default $Exports<"material-ui/Card/Card">;
}

declare module "material-ui/Checkbox/Checkbox" {
  declare module.exports: React$ComponentType<{
    checked?: boolean | string,
    checkedIcon?: React$Node,
    className?: string,
    classes?: Object,
    defaultChecked?: boolean,
    disableRipple?: boolean,
    disabled?: boolean,
    icon?: React$Node,
    indeterminate?: boolean,
    indeterminateIcon?: React$Node,
    inputProps?: Object,
    inputRef?: Function,
    name?: string,
    onChange?: Function,
    tabIndex?: number | string,
    value?: string
  }>;
}

declare module "material-ui/Checkbox" {
  declare module.exports: $Exports<"material-ui/Checkbox/Checkbox">;
}

declare module "material-ui/Chip/Chip" {
  import typeof Avatar from "material-ui/Avatar/Avatar";

  declare module.exports: React$ComponentType<{
    avatar?: React$Element<Avatar>,
    className?: string,
    classes?: Object,
    deleteIcon?: React$Element<any>,
    label?: React$Node,
    onClick?: Function,
    onDelete?: (event: SyntheticEvent<>) => void,
    onKeyDown?: Function,
    tabIndex?: number | string
  }>;
}

declare module "material-ui/Chip" {
  declare module.exports: $Exports<"material-ui/Chip/Chip">;
}

declare module "material-ui/CssBaseline/CssBaseline" {
  declare module.exports: React$ComponentType<{ children?: React$Node }>;
}

declare module "material-ui/CssBaseline" {
  declare module.exports: $Exports<"material-ui/CssBaseline/CssBaseline">;
}

declare module "material-ui/colors/amber" {
  declare module.exports: any;
}

declare module "material-ui/colors/blue" {
  declare module.exports: any;
}

declare module "material-ui/colors/blueGrey" {
  declare module.exports: any;
}

declare module "material-ui/colors/brown" {
  declare module.exports: any;
}

declare module "material-ui/colors/common" {
  declare module.exports: any;
}

declare module "material-ui/colors/cyan" {
  declare module.exports: any;
}

declare module "material-ui/colors/deepOrange" {
  declare module.exports: any;
}

declare module "material-ui/colors/deepPurple" {
  declare module.exports: any;
}

declare module "material-ui/colors/green" {
  declare module.exports: any;
}

declare module "material-ui/colors/grey" {
  declare module.exports: any;
}

declare module "material-ui/colors" {
  declare module.exports: any;
}

declare module "material-ui/colors/indigo" {
  declare module.exports: any;
}

declare module "material-ui/colors/lightBlue" {
  declare module.exports: any;
}

declare module "material-ui/colors/lightGreen" {
  declare module.exports: any;
}

declare module "material-ui/colors/lime" {
  declare module.exports: any;
}

declare module "material-ui/colors/orange" {
  declare module.exports: any;
}

declare module "material-ui/colors/pink" {
  declare module.exports: any;
}

declare module "material-ui/colors/purple" {
  declare module.exports: any;
}

declare module "material-ui/colors/red" {
  declare module.exports: any;
}

declare module "material-ui/colors/teal" {
  declare module.exports: any;
}

declare module "material-ui/colors/yellow" {
  declare module.exports: any;
}

declare module "material-ui/Dialog/Dialog" {
  import type {
    TransitionCallback,
    TransitionDuration
  } from "material-ui/internal/transition";
  declare type MaxWidth = "xs" | "sm" | "md" | false;

  declare module.exports: React$ComponentType<{
    children?: React$Node,
    className?: string,
    classes?: Object,
    fullScreen?: boolean,
    fullWidth?: boolean,
    ignoreBackdropClick?: boolean,
    ignoreEscapeKeyUp?: boolean,
    maxWidth?: MaxWidth,
    onBackdropClick?: Function,
    onClose?: Function,
    onEnter?: TransitionCallback,
    onEntered?: TransitionCallback,
    onEntering?: TransitionCallback,
    onEscapeKeyUp?: Function,
    onExit?: TransitionCallback,
    onExited?: TransitionCallback,
    onExiting?: TransitionCallback,
    open?: boolean,
    transition?: React$ComponentType<*>,
    transitionDuration?: TransitionDuration
  }>;
}

declare module "material-ui/Dialog/DialogActions" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    className?: string,
    classes?: Object
  }>;
}

declare module "material-ui/Dialog/DialogContent" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    className?: string,
    classes?: Object
  }>;
}

declare module "material-ui/Dialog/DialogContentText" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    className?: string,
    classes?: Object
  }>;
}

declare module "material-ui/Dialog/DialogTitle" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    className?: string,
    classes?: Object,
    disableTypography?: boolean
  }>;
}

declare module "material-ui/Dialog" {
  declare export var DialogActions: $Exports<
    "material-ui/Dialog/DialogActions"
  >;
  declare export var DialogContent: $Exports<
    "material-ui/Dialog/DialogContent"
  >;
  declare export var DialogContentText: $Exports<
    "material-ui/Dialog/DialogContentText"
  >;
  declare export var DialogTitle: $Exports<"material-ui/Dialog/DialogTitle">;
  declare export var withMobileDialog: $Exports<
    "material-ui/Dialog/withMobileDialog"
  >;
  declare export default $Exports<"material-ui/Dialog/Dialog">;
}

declare module "material-ui/Dialog/withMobileDialog" {
  declare module.exports: any;
}

declare module "material-ui/Divider/Divider" {
  declare module.exports: React$ComponentType<{
    absolute?: boolean,
    className?: string,
    classes?: Object,
    inset?: boolean,
    light?: boolean
  }>;
}

declare module "material-ui/Divider" {
  declare module.exports: $Exports<"material-ui/Divider/Divider">;
}

declare module "material-ui/Drawer/Drawer" {
  import type { TransitionDuration } from "material-ui/internal/transition";

  declare type Anchor = "left" | "top" | "right" | "bottom";
  declare type Type = "permanent" | "persistent" | "temporary";

  declare module.exports: React$ComponentType<{
    ModalProps?: Object,
    SlideProps?: Object,
    anchor?: Anchor,
    children: React$Node,
    className?: string,
    classes?: Object,
    elevation?: number,
    onClose?: Function,
    open?: boolean,
    transitionDuration?: TransitionDuration,
    type?: Type
  }>;
}
declare module "material-ui/Drawer" {
  declare module.exports: $Exports<"material-ui/Drawer/Drawer">;
}

declare module "material-ui/SwipeableDrawer/SwipeableDrawer" {
  import type { TransitionDuration } from "material-ui/internal/transition";

  declare type Anchor = "left" | "top" | "right" | "bottom";
  declare type Type = "permanent" | "persistent" | "temporary";

  declare module.exports: React$ComponentType<{
    ModalProps?: Object,
    SlideProps?: Object,
    anchor?: Anchor,
    children: React$Node,
    className?: string,
    classes?: Object,
    elevation?: number,
    onClose?: Function,
    open?: boolean,
    transitionDuration?: TransitionDuration,
    type?: Type
  }>;
}

declare module "material-ui/SwipeableDrawer" {
  declare module.exports: $Exports<
    "material-ui/SwipeableDrawer/SwipeableDrawer"
  >;
}

declare module "material-ui/ExpansionPanel/ExpansionPanel" {
  declare module.exports: React$ComponentType<{
    CollapseProps?: Object,
    children?: React$Node,
    className?: string,
    classes?: Object,
    defaultExpanded?: boolean,
    disabled?: boolean,
    expanded?: boolean,
    onChange?: Function
  }>;
}

declare module "material-ui/ExpansionPanel/ExpansionPanelActions" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    className?: string,
    classes?: Object
  }>;
}

declare module "material-ui/ExpansionPanel/ExpansionPanelDetails" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    className?: string,
    classes?: Object
  }>;
}

declare module "material-ui/ExpansionPanel/ExpansionPanelSummary" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    className?: string,
    classes?: Object,
    disabled?: boolean,
    expanded?: boolean,
    expandIcon?: React$Node,
    onChange?: Function,
    onClick?: Function
  }>;
}

declare module "material-ui/ExpansionPanel" {
  declare export default $Exports<"material-ui/ExpansionPanel/ExpansionPanel">;
  declare export var ExpansionPanelActions: $Exports<
    "material-ui/ExpansionPanel/ExpansionPanelActions"
  >;
  declare export var ExpansionPanelDetails: $Exports<
    "material-ui/ExpansionPanel/ExpansionPanelDetails"
  >;
  declare export var ExpansionPanelSummary: $Exports<
    "material-ui/ExpansionPanel/ExpansionPanelSummary"
  >;
}

declare module "material-ui/Form/FormControl" {
  declare type Margin = "none" | "dense" | "normal";

  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType,
    disabled?: boolean,
    error?: boolean,
    fullWidth?: boolean,
    margin?: Margin,
    onBlur?: Function,
    onFocus?: Function,
    required?: boolean
  }>;
}

declare module "material-ui/Form/FormControlLabel" {
  declare module.exports: React$ComponentType<{
    checked?: boolean | string,
    classes?: Object,
    className?: string,
    control: React$Element<any>,
    disabled?: boolean,
    inputRef?: Function,
    label: React$Node,
    name?: string,
    onChange?: Function,
    value?: string
  }>;
}

declare module "material-ui/Form/FormGroup" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    row?: boolean
  }>;
}

declare module "material-ui/Form/FormHelperText" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    disabled?: boolean,
    error?: boolean,
    margin?: "dense"
  }>;
}

declare module "material-ui/Form/FormLabel" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType,
    disabled?: boolean,
    error?: boolean,
    focused?: boolean,
    required?: boolean
  }>;
}

declare module "material-ui/Form" {
  declare module.exports: {
    FormGroup: $Exports<"material-ui/Form/FormGroup">,
    FormLabel: $Exports<"material-ui/Form/FormLabel">,
    FormControl: $Exports<"material-ui/Form/FormControl">,
    FormHelperText: $Exports<"material-ui/Form/FormHelperText">,
    FormControlLabel: $Exports<"material-ui/Form/FormControlLabel">
  };
}

declare module "material-ui/Grid/Grid" {
  declare type GridSizes =
    | boolean
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12;
  declare type AlignContent =
    | "stretch"
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around";
  declare type AlignItems =
    | "flex-start"
    | "center"
    | "flex-end"
    | "stretch"
    | "baseline";
  declare type Direction = "row" | "row-reverse" | "column" | "column-reverse";
  declare type Justify =
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  declare type Spacing = 0 | 8 | 16 | 24 | 40;
  declare type Wrap = "nowrap" | "wrap" | "wrap-reverse";

  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType,
    container?: boolean,
    item?: boolean,
    alignContent?: AlignContent,
    alignItems?: AlignItems,
    direction?: Direction,
    spacing?: Spacing,
    hidden?: any,
    justify?: Justify,
    wrap?: Wrap,
    xs?: GridSizes,
    sm?: GridSizes,
    md?: GridSizes,
    lg?: GridSizes,
    xl?: GridSizes
  }>;
}

declare module "material-ui/Grid" {
  declare module.exports: $Exports<"material-ui/Grid/Grid">;
}

declare module "material-ui/GridList/GridList" {
  declare type CellHeight = number | "auto";

  declare module.exports: React$ComponentType<{
    cellHeight?: CellHeight,
    children: React$Node,
    classes?: Object,
    className?: string,
    cols?: number,
    component?: React$ElementType,
    spacing?: number,
    style?: Object
  }>;
}

declare module "material-ui/GridList/GridListTile" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    cols?: number,
    component?: React$ElementType,
    rows?: number
  }>;
}

declare module "material-ui/GridList/GridListTileBar" {
  declare type TitlePosition = "top" | "bottom";
  declare type ActionPosition = "left" | "right";

  declare module.exports: React$ComponentType<{
    actionIcon?: React$Node,
    actionPosition?: ActionPosition,
    classes?: Object,
    className?: string,
    subtitle?: React$Node,
    title: React$Node,
    titlePosition?: TitlePosition
  }>;
}

declare module "material-ui/GridList" {
  declare export default $Exports<"material-ui/GridList/GridList">;
  declare export var GridList: $Exports<"material-ui/GridList/GridList">;
  declare export var GridListTile: $Exports<
    "material-ui/GridList/GridListTile"
  >;
  declare export var GridListTileBar: $Exports<
    "material-ui/GridList/GridListTileBar"
  >;
}

declare module "material-ui/Hidden/Hidden" {
  import type { Breakpoint } from "material-ui/styles/createBreakpoints";

  declare module.exports: React$ComponentType<{
    children: React$Node,
    className?: string,
    only?: Breakpoint | Array<Breakpoint>,
    xsUp?: boolean,
    smUp?: boolean,
    mdUp?: boolean,
    lgUp?: boolean,
    xlUp?: boolean,
    xsDown?: boolean,
    smDown?: boolean,
    mdDown?: boolean,
    lgDown?: boolean,
    xlDown?: boolean,
    implementation?: "js" | "css",
    initialWidth?: number
  }>;
}

declare module "material-ui/Hidden/HiddenCss" {
  import typeof Hidden from "material-ui/Hidden/Hidden";

  declare module.exports: React$ComponentType<React$ElementProps<Hidden>>;
}

declare module "material-ui/Hidden/HiddenJs" {
  import typeof Hidden from "material-ui/Hidden/Hidden";

  declare module.exports: React$ComponentType<React$ElementProps<Hidden>>;
}

declare module "material-ui/Hidden" {
  declare export default $Exports<"material-ui/Hidden/Hidden">;
  declare export var HiddenJs: $Exports<"material-ui/Hidden/HiddenJs">;
}

declare module "material-ui/Hidden/types" {
  declare module.exports: any;
}

declare module "material-ui/Icon/Icon" {
  declare type Color =
    | "inherit"
    | "accent"
    | "action"
    | "contrast"
    | "disabled"
    | "error"
    | "primary";

  declare module.exports: React$ComponentType<{
    children?: React$Node,
    className?: string,
    classes?: Object,
    color?: Color
  }>;
}

declare module "material-ui/Icon" {
  declare module.exports: $Exports<"material-ui/Icon/Icon">;
}

declare module "material-ui/IconButton/IconButton" {
  declare type Color =
    | "default"
    | "inherit"
    | "primary"
    | "contrast"
    | "accent";

  declare module.exports: React$ComponentType<{
    buttonRef?: Function,
    children?: React$Node,
    classes?: Object,
    className?: string,
    color?: Color,
    disabled?: boolean,
    disableRipple?: boolean,
    rootRef?: Function
  }>;
}

declare module "material-ui/IconButton" {
  declare module.exports: $Exports<"material-ui/IconButton/IconButton">;
}

declare module "material-ui/Input" {
  declare export default $Exports<"material-ui/Input/Input">;
  declare export var InputAdornment: $Exports<
    "material-ui/Input/InputAdornment"
  >;
  declare export var InputLabel: $Exports<"material-ui/Input/InputLabel">;
}

declare module "material-ui/Input/Input" {
  declare module.exports: React$ComponentType<{
    autoComplete?: string,
    autoFocus?: boolean,
    classes?: Object,
    className?: string,
    defaultValue?: string | number,
    disabled?: boolean,
    disableUnderline?: boolean,
    endAdornment?: React$Node,
    error?: boolean,
    fullWidth?: boolean,
    id?: string,
    inputComponent?: string | React$ComponentType<*>,
    inputProps?: Object,
    inputRef?: Function,
    margin?: "dense" | "none",
    multiline?: boolean,
    name?: string,
    readOnly?: boolean,
    onBlur?: (event: SyntheticFocusEvent<>) => void,
    onChange?: (event: SyntheticInputEvent<>) => void,
    onClean?: () => void,
    onDirty?: () => void,
    onFocus?: (event: SyntheticFocusEvent<>) => void,
    onKeyDown?: (event: SyntheticKeyboardEvent<>) => void,
    onKeyUp?: (event: SyntheticKeyboardEvent<>) => void,
    placeholder?: string,
    rows?: string | number,
    rowsMax?: string | number,
    startAdornment?: React$Node,
    type?: string,
    value?: string | number | Array<string | number>
  }>;
}

declare module "material-ui/Input/InputAdornment" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType,
    disableTypography?: boolean,
    position: "start" | "end"
  }>;
}

declare module "material-ui/Input/InputLabel" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    disableAnimation?: boolean,
    disabled?: boolean,
    error?: boolean,
    FormControlClasses?: Object,
    focused?: boolean,
    margin?: "dense",
    required?: boolean,
    shrink?: boolean
  }>;
}

declare module "material-ui/Input/Textarea" {
  declare type Rows = string | number;

  declare module.exports: React$ComponentType<{
    classes?: Object,
    className?: string,
    defaultValue?: string | number,
    disabled?: boolean,
    onChange?: Function,
    rows: Rows,
    rowsMax?: string | number,
    textareaRef?: Function,
    value?: string | number
  }>;
}

declare module "material-ui/internal/dom" {
  declare module.exports: any;
}

declare module "material-ui/Portal/Portal" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    open?: boolean
  }>;
}

declare module "material-ui/Portal" {
  declare module.exports: $Exports<"material-ui/Portal/Portal">;
}

declare module "material-ui/internal/SwitchBase" {
  declare module.exports: React$ComponentType<{
    checked?: boolean | string,
    checkedIcon?: React$Node,
    children?: React$Node,
    classes?: Object,
    className?: string,
    defaultChecked?: boolean,
    disabled?: boolean,
    disableRipple?: boolean,
    icon?: React$Node,
    indeterminate?: boolean,
    indeterminateIcon?: React$Node,
    inputProps?: Object,
    inputRef?: Function,
    inputType?: string,
    name?: string,
    onChange?: Function,
    tabIndex?: number | string,
    value?: string
  }>;
}

declare module "material-ui/internal/transition" {
  declare type TransitionDuration = number | { enter: number, exit: number };
  declare type TransitionCallback = (element: HTMLElement) => void;
  declare type TransitionClasses = {
    appear?: string,
    appearActive?: string,
    enter?: string,
    enterActive?: string,
    exit?: string,
    exitActive?: string
  };
}

declare module "material-ui/List" {
  declare module.exports: {
    ListItem: $Exports<"material-ui/List/ListItem">,
    ListItemAvatar: $Exports<"material-ui/List/ListItemAvatar">,
    ListItemText: $Exports<"material-ui/List/ListItemText">,
    ListItemIcon: $Exports<"material-ui/List/ListItemIcon">,
    ListItemSecondaryAction: $Exports<
      "material-ui/List/ListItemSecondaryAction"
    >,
    ListSubheader: $Exports<"material-ui/List/ListSubheader">
  };
}

declare module "material-ui/List/List" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType,
    dense?: boolean,
    disablePadding?: boolean,
    rootRef?: Function,
    subheader?: React$Node
  }>;
}

declare module "material-ui/List/ListItem" {
  declare module.exports: React$ComponentType<{
    button?: boolean,
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType,
    dense?: boolean,
    disabled?: boolean,
    disableGutters?: boolean,
    divider?: boolean
  }>;
}

declare module "material-ui/List/ListItemAvatar" {
  declare module.exports: React$ComponentType<{
    children: React$Element<any>,
    classes?: Object,
    className?: string
  }>;
}

declare module "material-ui/List/ListItemIcon" {
  declare module.exports: React$ComponentType<{
    children: React$Element<any>,
    classes?: Object,
    className?: string
  }>;
}

declare module "material-ui/List/ListItemSecondaryAction" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string
  }>;
}

declare module "material-ui/List/ListItemText" {
  declare module.exports: React$ComponentType<{
    classes?: Object,
    className?: string,
    disableTypography?: boolean,
    inset?: boolean,
    primary?: React$Node,
    secondary?: React$Node
  }>;
}

declare module "material-ui/List/ListSubheader" {
  declare type Color = "default" | "primary" | "inherit";

  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType,
    color?: Color,
    disableSticky?: boolean,
    inset?: boolean
  }>;
}

declare module "material-ui/Menu" {
  declare export default $Exports<"material-ui/Menu/Menu">;
  declare export var MenuList: $Exports<"material-ui/Menu/MenuList">;
  declare export var MenuItem: $Exports<"material-ui/Menu/MenuItem">;
}

declare module "material-ui/Menu/Menu" {
  import type { TransitionCallback } from "material-ui/internal/transition";

  declare type TransitionDuration =
    | number
    | { enter?: number, exit?: number }
    | "auto";

  declare module.exports: React$ComponentType<{
    anchorEl?: ?HTMLElement,
    children?: React$Node,
    classes?: Object,
    MenuListProps?: Object,
    onEnter?: TransitionCallback,
    onEntering?: TransitionCallback,
    onEntered?: TransitionCallback,
    onExit?: TransitionCallback,
    onExiting?: TransitionCallback,
    onExited?: TransitionCallback,
    onClose?: Function,
    open?: boolean,
    PaperProps?: Object,
    PopoverClasses?: Object,
    transitionDuration?: TransitionDuration
  }>;
}

declare module "material-ui/Menu/MenuItem" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType,
    role?: string,
    selected?: boolean
  }>;
}

declare module "material-ui/Menu/MenuList" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    className?: string,
    onBlur?: Function,
    onKeyDown?: (event: SyntheticUIEvent<>, key: string) => void
  }>;
}

declare module "material-ui/MobileStepper" {
  declare module.exports: $Exports<"material-ui/MobileStepper/MobileStepper">;
}

declare module "material-ui/MobileStepper/MobileStepper" {
  declare type Position = "bottom" | "top" | "static";
  declare type Type = "text" | "dots" | "progress";

  declare module.exports: React$ComponentType<{
    activeStep?: number,
    backButton: React$Element<any>,
    classes?: Object,
    className?: string,
    nextButton: React$Element<any>,
    position?: Position,
    steps: number,
    type?: Type
  }>;
}

declare module "material-ui/Modal/Backdrop" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    invisible?: boolean
  }>;
}

declare module "material-ui/Modal/ModalManager" {
  declare class ModalManager {
    constructor(Object): ModalManager;
    add(any, any): void;
    remove(any): number;
    isTopModal(modal: any): boolean;
  }
  declare export default typeof ModalManager;
}

declare module "material-ui/Modal" {
  declare export var Backdrop: $Exports<"material-ui/Modal/Backdrop">;
  declare export var ModalManager: $Exports<"material-ui/Modal/ModalManager">;
  declare export default $Exports<"material-ui/Modal/Modal">;
}

declare module "material-ui/Modal/Modal" {
  import type {
    TransitionDuration,
    TransitionCallback
  } from "material-ui/internal/transition";

  declare module.exports: React$ComponentType<{
    BackdropClassName?: string,
    BackdropComponent?: React$ElementType,
    BackdropInvisible?: boolean,
    BackdropTransitionDuration?: TransitionDuration,
    children?: React$Element<any>,
    classes?: Object,
    className?: string,
    keepMounted?: boolean,
    disableBackdrop?: boolean,
    ignoreBackdropClick?: boolean,
    ignoreEscapeKeyUp?: boolean,
    modalManager: Object,
    onBackdropClick?: Function,
    onEnter?: TransitionCallback,
    onEntering?: TransitionCallback,
    onEntered?: TransitionCallback,
    onEscapeKeyUp?: Function,
    onExit?: TransitionCallback,
    onExiting?: TransitionCallback,
    onExited?: TransitionCallback,
    onClose?: Function,
    show: boolean
  }>;
}

declare module "material-ui/Modal/modalManager" {
  declare module.exports: any;
}

declare module "material-ui/Paper" {
  declare module.exports: $Exports<"material-ui/Paper/Paper">;
}

declare module "material-ui/Paper/Paper" {
  declare module.exports: React$ComponentType<{
    classes?: Object,
    className?: string,
    children?: React$Node,
    component?: React$ElementType,
    elevation?: number,
    square?: boolean
  }>;
}

declare module "material-ui/Popover" {
  declare module.exports: $Exports<"material-ui/Popover/Popover">;
}

declare module "material-ui/Popover/Popover" {
  import type {
    TransitionCallback,
    TransitionClasses
  } from "material-ui/internal/transition";

  declare type Position = {
    top: number,
    left: number
  };

  declare type Origin = {
    horizontal: "left" | "center" | "right" | number,
    vertical: "top" | "center" | "bottom" | number
  };

  declare module.exports: React$ComponentType<{
    anchorEl?: ?HTMLElement,
    anchorPosition?: Position,
    anchorReference?: "anchorEl" | "anchorPosition",
    anchorOrigin?: Origin,
    children: React$Node,
    classes?: Object,
    elevation?: number,
    getContentAnchorEl?: Function,
    marginThreshold?: number,
    onEnter?: TransitionCallback,
    onEntering?: TransitionCallback,
    onEntered?: TransitionCallback,
    onExit?: TransitionCallback,
    onExiting?: TransitionCallback,
    onExited?: TransitionCallback,
    onClose?: Function,
    open: boolean,
    PaperProps?: Object,
    role?: string,
    transformOrigin?: Origin,
    transitionClasses?: TransitionClasses,
    transitionDuration?: number | { enter?: number, exit?: number } | "auto"
  }>;
}

declare module "material-ui/Progress/CircularProgress" {
  declare type Color = "primary" | "accent" | "inherit";
  declare type Mode = "determinate" | "indeterminate";

  declare module.exports: React$ComponentType<{
    classes?: Object,
    className?: string,
    color?: Color,
    max?: number,
    min?: number,
    mode?: Mode,
    size?: number,
    style?: Object,
    thickness?: number,
    value?: number
  }>;
}

declare module "material-ui/Progress" {
  declare module.exports: {
    CircularProgress: $Exports<"material-ui/Progress/CircularProgress">,
    LinearProgress: $Exports<"material-ui/Progress/LinearProgress">
  };
}

declare module "material-ui/Progress/LinearProgress" {
  declare type Color = "primary" | "accent";
  declare type Mode = "determinate" | "indeterminate" | "buffer" | "query";

  declare module.exports: React$ComponentType<{
    classes?: Object,
    className?: string,
    color?: Color,
    mode?: Mode,
    value?: number,
    valueBuffer?: number
  }>;
}

declare module "material-ui/Radio" {
  declare export default $Exports<"material-ui/Radio/Radio">;
  declare export var RadioGroup: $Exports<"material-ui/Radio/RadioGroup">;
}

declare module "material-ui/Radio/Radio" {
  declare module.exports: React$ComponentType<{
    checked?: boolean | string,
    checkedIcon?: React$Node,
    children?: React$Node,
    classes?: Object,
    className?: string,
    defaultChecked?: boolean,
    disabled?: boolean,
    disableRipple?: boolean,
    icon?: React$Node,
    inputProps?: Object,
    inputRef?: Function,
    name?: string,
    onChange?: Function,
    tabIndex?: number | string,
    value?: string
  }>;
}

declare module "material-ui/Radio/RadioGroup" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    name?: string,
    onBlur?: Function,
    onChange?: Function,
    onKeyDown?: Function,
    value?: string
  }>;
}

declare module "material-ui/Select" {
  declare module.exports: $Exports<"material-ui/Select/Select">;
}

declare module "material-ui/Select/Select" {
  import type { ChildrenArray } from "react";

  declare module.exports: React$ComponentType<{
    autoWidth?: boolean,
    children: ChildrenArray<*>,
    classes?: Object,
    displayEmpty?: boolean,
    input?: React$Element<any>,
    inputProps?: Object,
    native?: boolean,
    multiple?: boolean,
    onChange?: (event: SyntheticUIEvent<*>, child: Object) => void,
    onClose?: (event: SyntheticUIEvent<*>) => void,
    onOpen?: (event: SyntheticUIEvent<*>) => void,
    open?: boolean,
    MenuProps?: Object,
    renderValue?: Function,
    value?: $ReadOnlyArray<string | number> | string | number
  }>;
}

declare module "material-ui/Select/SelectInput" {
  declare module.exports: React$ComponentType<{
    autoWidth: boolean,
    children: React$Node,
    classes?: Object,
    className?: string,
    disabled?: boolean,
    displayEmpty: boolean,
    native: boolean,
    multiple: boolean,
    MenuProps?: Object,
    name?: string,
    onBlur?: Function,
    onChange?: (event: SyntheticUIEvent<*>, child: React$Element<any>) => void,
    onFocus?: Function,
    readOnly?: boolean,
    renderValue?: Function,
    selectRef?: Function,
    value?: string | number | $ReadOnlyArray<string | number>
  }>;
}

declare module "material-ui/Snackbar" {
  declare export default $Exports<"material-ui/Snackbar/Snackbar">;
  declare export var SnackbarContent: $Exports<
    "material-ui/Snackbar/SnackbarContent"
  >;
}

declare module "material-ui/Snackbar/Snackbar" {
  import type {
    TransitionDuration,
    TransitionCallback
  } from "material-ui/internal/transition";

  declare type Origin = {
    horizontal?: "left" | "center" | "right" | number,
    vertical?: "top" | "center" | "bottom" | number
  };

  declare module.exports: React$ComponentType<{
    action?: React$Node,
    anchorOrigin?: Origin,
    autoHideDuration?: ?number,
    resumeHideDuration?: number,
    children?: React$Element<any>,
    classes?: Object,
    className?: string,
    key?: any,
    message?: React$Node,
    onEnter?: TransitionCallback,
    onEntering?: TransitionCallback,
    onEntered?: TransitionCallback,
    onExit?: TransitionCallback,
    onExiting?: TransitionCallback,
    onExited?: TransitionCallback,
    onMouseEnter?: Function,
    onMouseLeave?: Function,
    onClose?: (event: ?Event, reason: string) => void,
    open: boolean,
    SnackbarContentProps?: Object,
    transition?: React$ComponentType<*>,
    transitionDuration?: TransitionDuration
  }>;
}

declare module "material-ui/Snackbar/SnackbarContent" {
  declare module.exports: React$ComponentType<{
    action?: React$Node,
    classes?: Object,
    className?: string,
    message: React$Node
  }>;
}

declare module "material-ui/Stepper" {
  declare export default $Exports<"material-ui/Stepper/Stepper">;
  declare export var Step: $Exports<"material-ui/Stepper/Step">;
  declare export var StepButton: $Exports<"material-ui/Stepper/StepButton">;
  declare export var StepContent: $Exports<"material-ui/Stepper/StepContent">;
  declare export var StepIcon: $Exports<"material-ui/Stepper/StepIcon">;
  declare export var StepLabel: $Exports<"material-ui/Stepper/StepLabel">;
}

declare module "material-ui/Stepper/Step" {
  import type { Orientation } from "material-ui/Stepper/Stepper";

  declare module.exports: React$ComponentType<{
    active?: boolean,
    alternativeLabel?: boolean,
    children?: React$Node,
    classes?: Object,
    className?: string,
    completed?: boolean,
    connector?: React$Element<any>,
    disabled?: boolean,
    index?: number,
    last?: boolean,
    optional?: boolean,
    orientation?: Orientation
  }>;
}

declare module "material-ui/Stepper/StepButton" {
  import type { Orientation } from "material-ui/Stepper/Stepper";

  declare type Icon = React$Element<any> | string | number;

  declare module.exports: React$ComponentType<{
    active?: boolean,
    alternativeLabel?: boolean,
    children: React$Element<any>,
    classes?: Object,
    className?: string,
    completed?: boolean,
    disabled?: boolean,
    icon?: Icon,
    last?: boolean,
    optional?: boolean,
    orientation: Orientation
  }>;
}

declare module "material-ui/Stepper/StepConnector" {
  import type { Orientation } from "material-ui/Stepper/Stepper";

  declare module.exports: React$ComponentType<{
    alternativeLabel?: boolean,
    classes?: Object,
    className?: string,
    orientation?: Orientation
  }>;
}

declare module "material-ui/Stepper/StepContent" {
  import type { TransitionDuration } from "material-ui/transitions/Collapse";
  import type { Orientation } from "material-ui/Stepper/Stepper";

  declare module.exports: React$ComponentType<{
    active?: boolean,
    alternativeLabel?: boolean,
    children: React$Node,
    classes?: Object,
    className?: string,
    completed?: boolean,
    last?: boolean,
    optional?: boolean,
    orientation?: Orientation,
    transition?: Function,
    transitionDuration?: TransitionDuration
  }>;
}

declare module "material-ui/Stepper/StepIcon" {
  import type { Icon } from "material-ui/Stepper/StepButton";

  declare module.exports: React$ComponentType<{
    active?: boolean,
    classes?: Object,
    completed?: boolean,
    icon?: Icon
  }>;
}

declare module "material-ui/Stepper/StepLabel" {
  import type { Orientation } from "material-ui/Stepper/Stepper";
  import type { Icon } from "material-ui/Stepper/StepButton";

  declare module.exports: React$ComponentType<{
    active?: boolean,
    alternativeLabel?: boolean,
    children: React$Node,
    classes?: Object,
    className?: string,
    completed?: boolean,
    disabled?: boolean,
    icon?: Icon,
    last?: boolean,
    optional?: boolean,
    orientation?: Orientation
  }>;
}

declare module "material-ui/Stepper/Stepper" {
  import type { ChildrenArray } from "react";
  import typeof Step from "material-ui/Stepper/Step";
  import typeof StepConnector from "material-ui/Stepper/StepConnector";

  declare type Orientation = "horizontal" | "vertical";

  declare module.exports: React$ComponentType<{
    activeStep?: number,
    alternativeLabel?: boolean,
    children: ChildrenArray<Element<Step>>,
    classes?: Object,
    className?: string,
    connector?: React$Element<StepConnector> | Node,
    nonLinear?: boolean,
    orientation?: Orientation
  }>;
}

declare module "material-ui/Stepper/StepPositionIcon" {
  import type { Icon } from "material-ui/Stepper/StepButton";

  declare module.exports: React$ComponentType<{
    active?: boolean,
    classes?: Object,
    className?: string,
    position?: Icon
  }>;
}

declare module "material-ui/styles/colorManipulator" {
  declare module.exports: {
    convertColorToString: (color: Object) => any,
    convertHexToRGB: (color: string) => any,
    decomposeColor: (color: string) => any,
    getContrastRatio: (foreground: string, background: string) => any,
    getLuminance: (color: string) => any,
    emphasize: (color: string, coefficient: number) => any,
    fade: (color: string, value: number) => any,
    darken: (color: string, coefficient: number) => any,
    ligthen: (color: string, coefficient: number) => any
  };
}

declare module "material-ui/styles/createBreakpoints" {
  declare type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

  declare module.exports: {
    keys: Array<Breakpoint>,
    default: (breakpoints: Object) => any
  };
}

declare module "material-ui/styles/createGenerateClassName" {
  declare module.exports: () => any;
}

declare module "material-ui/styles/createMixins" {
  declare module.exports: (
    breakpoints: Object,
    spacing: Object,
    mixins: Object
  ) => any;
}

declare module "material-ui/styles/createMuiTheme" {
  declare module.exports: (options: Object) => any;
}

declare module "material-ui/styles/createPalette" {
  declare export var light: Object;
  declare export var dark: Object;
  declare export default (palette: Object) => any;
}

declare module "material-ui/styles/createTypography" {
  declare module.exports: (
    palette: Object,
    typography: Object | Function
  ) => any;
}

declare module "material-ui/styles/jssPreset" {
  declare module.exports: () => any;
}

declare module "material-ui/styles/getStylesCreator" {
  declare module.exports: (stylesOrCreator: Object | (Object => Object)) => any;
}

declare module "material-ui/styles" {
  declare module.exports: {
    MuiThemeProvider: $Exports<"material-ui/styles/MuiThemeProvider">,
    withStyles: $Exports<"material-ui/styles/withStyles">,
    withTheme: $Exports<"material-ui/styles/withTheme">,
    createMuiTheme: $Exports<"material-ui/styles/createMuiTheme">,
    jssPreset: $Exports<"material-ui/styles/jssPreset">
  };
}

declare module "material-ui/styles/MuiThemeProvider" {
  declare module.exports: React$ComponentType<Object>;
}

declare module "material-ui/styles/shadows" {
  declare module.exports: Array<any>;
}

declare module "material-ui/styles/spacing" {
  declare module.exports: Object;
}

declare module "material-ui/styles/themeListener" {
  declare export var CHANNEL: string;
  declare export default Object;
}

declare module "material-ui/styles/transitions" {
  declare export var easing: Object;
  declare export var duration: Object;
  declare export var formatMs: (milliseconds: number) => string;
  declare export var isString: (value: any) => boolean;
  declare export var isNumber: (value: any) => boolean;
  declare export default Object;
}

declare module "material-ui/styles/withStyles" {
  declare type Options = {
    flip?: boolean,
    withTheme?: boolean,
    name?: string,
    media?: string,
    meta?: string,
    index?: number,
    link?: boolean,
    element?: HTMLStyleElement,
    generateClassName?: Function
  };

  declare module.exports: (
    stylesOrCreator: Object,
    options?: Options
  ) => <
    OwnProps: {},
    Props: $Supertype<
      OwnProps & {
        classes: { +[string]: string },
        innerRef: React$Ref<React$ElementType>
      }
    >
  >(
    Component: React$ComponentType<Props>
  ) => React$ComponentType<OwnProps>;
}

declare module "material-ui/styles/withTheme" {
  declare module.exports: () => <Props: {}>(
    Component: React$ComponentType<Props>
  ) => React$ComponentType<Props>;
}

declare module "material-ui/styles/zIndex" {
  declare module.exports: Object;
}

declare module "material-ui/svg-icons/ArrowDownward" {
  declare module.exports: React$ComponentType<Object>;
}

declare module "material-ui/svg-icons/ArrowDropDown" {
  declare module.exports: React$ComponentType<Object>;
}

declare module "material-ui/svg-icons/Cancel" {
  declare module.exports: React$ComponentType<Object>;
}

declare module "material-ui/svg-icons/CheckBox" {
  declare module.exports: React$ComponentType<Object>;
}

declare module "material-ui/svg-icons/CheckBoxOutlineBlank" {
  declare module.exports: React$ComponentType<Object>;
}

declare module "material-ui/svg-icons/CheckCircle" {
  declare module.exports: React$ComponentType<Object>;
}

declare module "material-ui/svg-icons/IndeterminateCheckBox" {
  declare module.exports: React$ComponentType<Object>;
}

declare module "material-ui/svg-icons/KeyboardArrowLeft" {
  declare module.exports: React$ComponentType<Object>;
}

declare module "material-ui/svg-icons/KeyboardArrowRight" {
  declare module.exports: React$ComponentType<Object>;
}

declare module "material-ui/svg-icons/RadioButtonChecked" {
  declare module.exports: React$ComponentType<Object>;
}

declare module "material-ui/svg-icons/RadioButtonUnchecked" {
  declare module.exports: React$ComponentType<Object>;
}

declare module "material-ui/SvgIcon" {
  declare module.exports: $Exports<"material-ui/SvgIcon/SvgIcon">;
}

declare module "material-ui/SvgIcon/SvgIcon" {
  declare module.exports: React$ComponentType<{
    children: React$Node,
    classes?: Object,
    className?: string,
    titleAccess?: string,
    viewBox?: string
  }>;
}

declare module "material-ui/Switch" {
  declare module.exports: $Exports<"material-ui/Switch/Switch">;
}

declare module "material-ui/Switch/Switch" {
  declare module.exports: React$ComponentType<{
    checked?: boolean | string,
    checkedIcon?: React$Node,
    classes?: Object,
    className?: string,
    defaultChecked?: boolean,
    disabled?: boolean,
    disableRipple?: boolean,
    icon?: React$Node,
    inputProps?: Object,
    inputRef?: Function,
    name?: string,
    onChange?: Function,
    tabIndex?: number | string,
    value?: string
  }>;
}

declare module "material-ui/Table" {
  declare export default $Exports<"material-ui/Table/Table">;
  declare export var TableBody: $Exports<"material-ui/Table/TableBody">;
  declare export var TableCell: $Exports<"material-ui/Table/TableCell">;
  declare export var TableFooter: $Exports<"material-ui/Table/TableFooter">;
  declare export var TableHead: $Exports<"material-ui/Table/TableHead">;
  declare export var TablePagination: $Exports<
    "material-ui/Table/TablePagination"
  >;
  declare export var TableRow: $Exports<"material-ui/Table/TableRow">;
  declare export var TableSortLabel: $Exports<
    "material-ui/Table/TableSortLabel"
  >;
}

declare module "material-ui/Table/Table" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType
  }>;
}

declare module "material-ui/Table/TableBody" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType
  }>;
}

declare module "material-ui/Table/TableCell" {
  declare type Padding = "default" | "checkbox" | "dense" | "none";

  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType,
    numeric?: boolean,
    padding?: Padding
  }>;
}

declare module "material-ui/Table/TableFooter" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType
  }>;
}

declare module "material-ui/Table/TableHead" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType
  }>;
}

declare module "material-ui/Table/TablePagination" {
  declare type LabelDisplayedRowsArgs = {
    from: number,
    to: number,
    count: number,
    page: number
  };
  declare type LabelDisplayedRows = (
    paginationInfo: LabelDisplayedRowsArgs
  ) => Node;

  declare module.exports: React$ComponentType<{
    classes?: Object,
    component?: React$ElementType,
    colSpan?: number,
    count: number,
    labelDisplayedRows?: LabelDisplayedRows,
    labelRowsPerPage?: React$Node,
    onChangePage: (event: SyntheticInputEvent<> | null, page: number) => void,
    onChangeRowsPerPage: (event: SyntheticInputEvent<>) => void,
    page: number,
    rowsPerPage: number,
    rowsPerPageOptions?: Array<number>
  }>;
}

declare module "material-ui/Table/TableRow" {
  declare module.exports: React$ComponentType<{
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType,
    hover?: boolean,
    selected?: boolean
  }>;
}

declare module "material-ui/Table/TableSortLabel" {
  declare type Direction = "asc" | "desc";

  declare module.exports: React$ComponentType<{
    active?: boolean,
    children?: React$Node,
    classes?: Object,
    className?: string,
    direction?: Direction
  }>;
}

declare module "material-ui/Tabs" {
  declare export default $Exports<"material-ui/Tabs/Tabs">;
  declare export var Tab: $Exports<"material-ui/Tabs/Tab">;
}

declare module "material-ui/Tabs/Tab" {
  declare module.exports: React$ComponentType<{
    classes?: Object,
    className?: string,
    disabled?: boolean,
    fullWidth?: boolean,
    icon?: string | React$Element<any>,
    indicator?: string | React$Element<any>,
    label?: string | React$Element<any>,
    onChange?: (event: SyntheticEvent<>, value: any) => void,
    onClick?: (event: SyntheticEvent<>) => void,
    selected?: boolean,
    style?: Object,
    textColor?: "accent" | "primary" | "inherit" | string,
    value?: any
  }>;
}

declare module "material-ui/Tabs/TabIndicator" {
  declare type IndicatorStyle = {
    left: number,
    width: number
  };

  declare module.exports: React$ComponentType<{
    classes?: Object,
    className?: string,
    color: "accent" | "primary" | string,
    style: IndicatorStyle
  }>;
}

declare module "material-ui/Tabs/Tabs" {
  import type { IndicatorStyle } from "material-ui/Tabs/TabIndicator";

  declare type IndicatorColor = "accent" | "primary" | string;
  declare type ScrollButtons = "auto" | "on" | "off";
  declare type TextColor = "accent" | "primary" | "inherit";

  declare module.exports: React$ComponentType<{
    buttonClassName?: string,
    centered?: boolean,
    children?: React$Node,
    classes?: Object,
    className?: string,
    fullWidth?: boolean,
    indicatorClassName?: string,
    indicatorColor?: IndicatorColor,
    onChange?: (event: SyntheticEvent<>, value: any) => void,
    scrollable?: boolean,
    scrollButtons?: ScrollButtons,
    TabScrollButton?: React$ComponentType<*>,
    textColor?: TextColor,
    value: any
  }>;
}

declare module "material-ui/Tabs/TabScrollButton" {
  declare module.exports: React$ComponentType<{
    classes?: Object,
    className?: string,
    direction: "left" | "right",
    onClick?: Function,
    visible?: boolean
  }>;
}

declare module "material-ui/TextField" {
  declare module.exports: $Exports<"material-ui/TextField/TextField">;
}

declare module "material-ui/TextField/TextField" {
  import type { ChildrenArray } from "react";

  declare module.exports: React$ComponentType<{
    autoComplete?: string,
    autoFocus?: boolean,
    children?: ChildrenArray<*>,
    className?: string,
    defaultValue?: string,
    disabled?: boolean,
    error?: boolean,
    FormHelperTextProps?: Object,
    fullWidth?: boolean,
    helperText?: React$Node,
    helperTextClassName?: string,
    id?: string,
    InputLabelProps?: Object,
    InputProps?: Object,
    inputRef?: Function,
    label?: React$Node,
    labelClassName?: string,
    multiline?: boolean,
    name?: string,
    onChange?: (event: SyntheticInputEvent<>) => void,
    placeholder?: string,
    required?: boolean,
    rootRef?: Function,
    rows?: string | number,
    rowsMax?: string | number,
    select?: boolean,
    SelectProps?: Object,
    type?: string,
    value?: string | number,
    margin?: "none" | "dense" | "normal"
  }>;
}

declare module "material-ui/Toolbar" {
  declare module.exports: $Exports<"material-ui/Toolbar/Toolbar">;
}

declare module "material-ui/Toolbar/Toolbar" {
  declare module.exports: React$ComponentType<{
    classes?: Object,
    children?: React$Node,
    className?: string,
    disableGutters?: boolean
  }>;
}

declare module "material-ui/Tooltip" {
  declare module.exports: $Exports<"material-ui/Tooltip/Tooltip">;
}

declare module "material-ui/Tooltip/Tooltip" {
  declare type Placement =
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";

  declare module.exports: React$ComponentType<{
    children: React$Element<any>,
    classes?: Object,
    className?: string,
    disableTriggerFocus?: boolean,
    disableTriggerHover?: boolean,
    disableTriggerTouch?: boolean,
    id?: string,
    onClose?: Function,
    onRequestOpen?: Function,
    open?: boolean,
    title: React$Node,
    enterDelay?: number,
    leaveDelay?: number,
    placement?: Placement,
    PopperProps?: Object
  }>;
}

declare module "material-ui/transitions/Collapse" {
  import type { TransitionCallback } from "material-ui/internal/transition";

  declare type TransitionDuration =
    | number
    | { enter?: number, exit?: number }
    | "auto";

  declare module.exports: React$ComponentType<{
    appear?: boolean,
    children: React$Node,
    classes?: Object,
    className?: String,
    component?: React$ElementType,
    collapsedHeight?: string,
    containerProps?: Object,
    in: boolean,
    onEnter?: TransitionCallback,
    onEntering?: TransitionCallback,
    onEntered?: TransitionCallback,
    onExit?: TransitionCallback,
    onExiting?: TransitionCallback,
    style?: Object,
    timeout?: TransitionDuration,
    unmountOnExit?: boolean
  }>;
}

declare module "material-ui/transitions/Fade" {
  import type {
    TransitionDuration,
    TransitionCallback
  } from "material-ui/internal/transition";

  declare module.exports: React$ComponentType<{
    appear?: boolean,
    children: React$Element<any>,
    in: boolean,
    onEnter?: TransitionCallback,
    onEntering?: TransitionCallback,
    onExit?: TransitionCallback,
    style?: Object,
    timeout?: TransitionDuration
  }>;
}

declare module "material-ui/transitions/Zoom" {
  import type {
    TransitionDuration,
    TransitionCallback
  } from "material-ui/internal/transition";

  declare module.exports: React$ComponentType<{
    children: React$Element<any>,
    in: boolean,
    onEnter?: TransitionCallback,
    onExit?: TransitionCallback,
    style?: Object,
    timeout?: TransitionDuration
  }>;
}

declare module "material-ui/transitions/Grow" {
  import type {
    TransitionCallback,
    TransitionClasses
  } from "material-ui/internal/transition";

  declare type TransitionDuration =
    | number
    | { enter?: number, exit?: number }
    | "auto";

  declare module.exports: React$ComponentType<{
    appear?: boolean,
    children: React$Element<any>,
    in: boolean,
    onEnter?: TransitionCallback,
    onEntering?: TransitionCallback,
    onEntered?: TransitionCallback,
    onExit?: TransitionCallback,
    onExiting?: TransitionCallback,
    onExited?: TransitionCallback,
    rootRef?: Function,
    style?: Object,
    transitionClasses?: TransitionClasses,
    timeout?: TransitionDuration
  }>;
}

declare module "material-ui/transitions" {
  declare module.exports: {
    Slide: $Exports<"material-ui/transitions/Slide">,
    Grow: $Exports<"material-ui/transitions/Grow">,
    Fade: $Exports<"material-ui/transitions/Fade">,
    Collapse: $Exports<"material-ui/transitions/Collapse">,
    Zoom: $Exports<"material-ui/transitions/Zoom">
  };
}

declare module "material-ui/transitions/Slide" {
  import type {
    TransitionDuration,
    TransitionCallback
  } from "material-ui/internal/transition";

  declare type Direction = "left" | "right" | "up" | "down";

  declare function setTranslateValue(
    props: Object,
    node: HTMLElement | Object
  ): void;

  declare module.exports: React$ComponentType<{
    children: React$Element<any>,
    direction: Direction,
    in: boolean,
    onEnter?: TransitionCallback,
    onEntering?: TransitionCallback,
    onEntered?: TransitionCallback,
    onExit?: TransitionCallback,
    onExiting?: TransitionCallback,
    onExited?: TransitionCallback,
    style?: Object,
    timeout?: TransitionDuration
  }>;
}

declare module "material-ui/Typography" {
  declare module.exports: $Exports<"material-ui/Typography/Typography">;
}

declare module "material-ui/Typography/Typography" {
  declare type Align = "inherit" | "left" | "center" | "right" | "justify";
  declare type Color =
    | "inherit"
    | "primary"
    | "secondary"
    | "accent"
    | "error"
    | "default";
  declare type Type =
    | "display4"
    | "display3"
    | "display2"
    | "display1"
    | "headline"
    | "title"
    | "subheading"
    | "body2"
    | "body1"
    | "caption"
    | "button";

  declare module.exports: React$ComponentType<{
    align?: Align,
    children?: React$Node,
    classes?: Object,
    className?: string,
    component?: React$ElementType,
    color?: Color,
    gutterBottom?: boolean,
    headlineMapping?: { [key: Type]: string },
    noWrap?: boolean,
    paragraph?: boolean,
    type?: Type
  }>;
}

declare module "material-ui/utils/addEventListener" {
  declare module.exports: (
    node: React$Node,
    event: string,
    handler: EventHandler,
    capture?: boolean
  ) => any;
}

declare module "material-ui/utils/ClickAwayListener" {
  declare module.exports: React$ComponentType<{
    children: React$Node,
    onClickAway: (event: Event) => void
  }>;
}

declare module "material-ui/utils/exactProp" {
  declare module.exports: (
    propTypes: Object,
    componentNameInError: string
  ) => any;
}

declare module "material-ui/utils/helpers" {
  declare module.exports: {
    capitalizeFirstLetter: Function,
    contains: (obj: Object, pred: Object) => any,
    findIndex: (arr: Array<any>, pred: any) => any,
    find: (arr: Array<any>, pred: any) => any,
    createChainedFunction: (...funcs: Array<any>) => any
  };
}

declare module "material-ui/utils/keyboardFocus" {
  declare module.exports: {
    focusKeyPressed: Function,
    detectKeyboardFocus: Function,
    listenForFocusKeys: Function
  };
}

declare module "material-ui/utils/manageAriaHidden" {
  declare module.exports: {
    ariaHidden: Function,
    hideSiblings: Function,
    showSiblings: Function
  };
}

declare module "material-ui/utils/reactHelpers" {
  declare module.exports: {
    cloneChildrenWithClassName: (
      children?: React$Node,
      className: string
    ) => any,
    isMuiElement: (element: any, muiNames: Array<string>) => any,
    isMuiComponent: (element: any, muiNames: Array<string>) => any
  };
}

declare module "material-ui/utils/requirePropFactory" {
  declare module.exports: (componentNameInError: string) => any;
}

declare module "material-ui/utils/withWidth" {
  declare module.exports: (
    options: Object
  ) => <Props: {}>(
    Component: React$ComponentType<Props>
  ) => React$ComponentType<Props>;
}

declare module "material-ui/colors" {
  declare export var withWidth: $Exports<"material-ui/utils/withWidth">;
  declare export var common: $Exports<"material-ui/colors/common">;
  declare export var red: $Exports<"material-ui/colors/red">;
  declare export var pink: $Exports<"material-ui/colors/pink">;
  declare export var purple: $Exports<"material-ui/colors/purple">;
  declare export var deepPurple: $Exports<"material-ui/colors/deepPurple">;
  declare export var indigo: $Exports<"material-ui/colors/indigo">;
  declare export var blue: $Exports<"material-ui/colors/blue">;
  declare export var lightBlue: $Exports<"material-ui/colors/lightBlue">;
  declare export var cyan: $Exports<"material-ui/colors/cyan">;
  declare export var teal: $Exports<"material-ui/colors/teal">;
  declare export var green: $Exports<"material-ui/colors/green">;
  declare export var lightGreen: $Exports<"material-ui/colors/lightGreen">;
  declare export var lime: $Exports<"material-ui/colors/lime">;
  declare export var yellow: $Exports<"material-ui/colors/yellow">;
  declare export var amber: $Exports<"material-ui/colors/amber">;
  declare export var orange: $Exports<"material-ui/colors/orange">;
  declare export var deepOrange: $Exports<"material-ui/colors/deepOrange">;
  declare export var brown: $Exports<"material-ui/colors/brown">;
  declare export var grey: $Exports<"material-ui/colors/grey">;
  declare export var blueGrey: $Exports<"material-ui/colors/blueGrey">;
}

// Filename aliases
declare module "material-ui/AppBar/AppBar.js" {
  declare module.exports: $Exports<"material-ui/AppBar/AppBar">;
}
declare module "material-ui/AppBar/index.js" {
  declare module.exports: $Exports<"material-ui/AppBar">;
}
declare module "material-ui/Avatar/Avatar.js" {
  declare module.exports: $Exports<"material-ui/Avatar/Avatar">;
}
declare module "material-ui/Avatar/index.js" {
  declare module.exports: $Exports<"material-ui/Avatar">;
}
declare module "material-ui/Badge/Badge.js" {
  declare module.exports: $Exports<"material-ui/Badge/Badge">;
}
declare module "material-ui/Badge/index.js" {
  declare module.exports: $Exports<"material-ui/Badge">;
}
declare module "material-ui/BottomNavigation/BottomNavigation.js" {
  declare module.exports: $Exports<
    "material-ui/BottomNavigation/BottomNavigation"
  >;
}
declare module "material-ui/BottomNavigation/BottomNavigationAction.js" {
  declare module.exports: $Exports<
    "material-ui/BottomNavigation/BottomNavigationAction"
  >;
}
declare module "material-ui/BottomNavigation/index.js" {
  declare module.exports: $Exports<"material-ui/BottomNavigation">;
}
declare module "material-ui/Button/Button.js" {
  declare module.exports: $Exports<"material-ui/Button/Button">;
}
declare module "material-ui/Button/index.js" {
  declare module.exports: $Exports<"material-ui/Button">;
}
declare module "material-ui/ButtonBase/ButtonBase.js" {
  declare module.exports: $Exports<"material-ui/ButtonBase/ButtonBase">;
}
declare module "material-ui/ButtonBase/createRippleHandler.js" {
  declare module.exports: $Exports<
    "material-ui/ButtonBase/createRippleHandler"
  >;
}
declare module "material-ui/ButtonBase/index.js" {
  declare module.exports: $Exports<"material-ui/ButtonBase">;
}
declare module "material-ui/ButtonBase/Ripple.js" {
  declare module.exports: $Exports<"material-ui/ButtonBase/Ripple">;
}
declare module "material-ui/ButtonBase/TouchRipple.js" {
  declare module.exports: $Exports<"material-ui/ButtonBase/TouchRipple">;
}
declare module "material-ui/Card/Card.js" {
  declare module.exports: $Exports<"material-ui/Card/Card">;
}
declare module "material-ui/Card/CardActions.js" {
  declare module.exports: $Exports<"material-ui/Card/CardActions">;
}
declare module "material-ui/Card/CardContent.js" {
  declare module.exports: $Exports<"material-ui/Card/CardContent">;
}
declare module "material-ui/Card/CardHeader.js" {
  declare module.exports: $Exports<"material-ui/Card/CardHeader">;
}
declare module "material-ui/Card/CardMedia.js" {
  declare module.exports: $Exports<"material-ui/Card/CardMedia">;
}
declare module "material-ui/Card/index.js" {
  declare module.exports: $Exports<"material-ui/Card">;
}
declare module "material-ui/Checkbox/Checkbox.js" {
  declare module.exports: $Exports<"material-ui/Checkbox/Checkbox">;
}
declare module "material-ui/Checkbox/index.js" {
  declare module.exports: $Exports<"material-ui/Checkbox">;
}
declare module "material-ui/Chip/Chip.js" {
  declare module.exports: $Exports<"material-ui/Chip/Chip">;
}
declare module "material-ui/Chip/index.js" {
  declare module.exports: $Exports<"material-ui/Chip">;
}
declare module "material-ui/colors/amber.js" {
  declare module.exports: $Exports<"material-ui/colors/amber">;
}
declare module "material-ui/colors/blue.js" {
  declare module.exports: $Exports<"material-ui/colors/blue">;
}
declare module "material-ui/colors/blueGrey.js" {
  declare module.exports: $Exports<"material-ui/colors/blueGrey">;
}
declare module "material-ui/colors/brown.js" {
  declare module.exports: $Exports<"material-ui/colors/brown">;
}
declare module "material-ui/colors/common.js" {
  declare module.exports: $Exports<"material-ui/colors/common">;
}
declare module "material-ui/colors/cyan.js" {
  declare module.exports: $Exports<"material-ui/colors/cyan">;
}
declare module "material-ui/colors/deepOrange.js" {
  declare module.exports: $Exports<"material-ui/colors/deepOrange">;
}
declare module "material-ui/colors/deepPurple.js" {
  declare module.exports: $Exports<"material-ui/colors/deepPurple">;
}
declare module "material-ui/colors/green.js" {
  declare module.exports: $Exports<"material-ui/colors/green">;
}
declare module "material-ui/colors/grey.js" {
  declare module.exports: $Exports<"material-ui/colors/grey">;
}
declare module "material-ui/colors/index.js" {
  declare module.exports: $Exports<"material-ui/colors">;
}
declare module "material-ui/colors/indigo.js" {
  declare module.exports: $Exports<"material-ui/colors/indigo">;
}
declare module "material-ui/colors/lightBlue.js" {
  declare module.exports: $Exports<"material-ui/colors/lightBlue">;
}
declare module "material-ui/colors/lightGreen.js" {
  declare module.exports: $Exports<"material-ui/colors/lightGreen">;
}
declare module "material-ui/colors/lime.js" {
  declare module.exports: $Exports<"material-ui/colors/lime">;
}
declare module "material-ui/colors/orange.js" {
  declare module.exports: $Exports<"material-ui/colors/orange">;
}
declare module "material-ui/colors/pink.js" {
  declare module.exports: $Exports<"material-ui/colors/pink">;
}
declare module "material-ui/colors/purple.js" {
  declare module.exports: $Exports<"material-ui/colors/purple">;
}
declare module "material-ui/colors/red.js" {
  declare module.exports: $Exports<"material-ui/colors/red">;
}
declare module "material-ui/colors/teal.js" {
  declare module.exports: $Exports<"material-ui/colors/teal">;
}
declare module "material-ui/colors/yellow.js" {
  declare module.exports: $Exports<"material-ui/colors/yellow">;
}
declare module "material-ui/Dialog/Dialog.js" {
  declare module.exports: $Exports<"material-ui/Dialog/Dialog">;
}
declare module "material-ui/Dialog/DialogActions.js" {
  declare module.exports: $Exports<"material-ui/Dialog/DialogActions">;
}
declare module "material-ui/Dialog/DialogContent.js" {
  declare module.exports: $Exports<"material-ui/Dialog/DialogContent">;
}
declare module "material-ui/Dialog/DialogContentText.js" {
  declare module.exports: $Exports<"material-ui/Dialog/DialogContentText">;
}
declare module "material-ui/Dialog/DialogTitle.js" {
  declare module.exports: $Exports<"material-ui/Dialog/DialogTitle">;
}
declare module "material-ui/Dialog/index.js" {
  declare module.exports: $Exports<"material-ui/Dialog">;
}
declare module "material-ui/Dialog/withMobileDialog.js" {
  declare module.exports: $Exports<"material-ui/Dialog/withMobileDialog">;
}
declare module "material-ui/Divider/Divider.js" {
  declare module.exports: $Exports<"material-ui/Divider/Divider">;
}
declare module "material-ui/Divider/index.js" {
  declare module.exports: $Exports<"material-ui/Divider">;
}
declare module "material-ui/Drawer/Drawer.js" {
  declare module.exports: $Exports<"material-ui/Drawer/Drawer">;
}
declare module "material-ui/Drawer/index.js" {
  declare module.exports: $Exports<"material-ui/Drawer">;
}
declare module "material-ui/ExpansionPanel/ExpansionPanel.js" {
  declare module.exports: $Exports<"material-ui/ExpansionPanel/ExpansionPanel">;
}
declare module "material-ui/ExpansionPanel/ExpansionPanelActions.js" {
  declare module.exports: $Exports<
    "material-ui/ExpansionPanel/ExpansionPanelActions"
  >;
}
declare module "material-ui/ExpansionPanel/ExpansionPanelDetails.js" {
  declare module.exports: $Exports<
    "material-ui/ExpansionPanel/ExpansionPanelDetails"
  >;
}
declare module "material-ui/ExpansionPanel/ExpansionPanelSummary.js" {
  declare module.exports: $Exports<
    "material-ui/ExpansionPanel/ExpansionPanelSummary"
  >;
}
declare module "material-ui/ExpansionPanel/index.js" {
  declare module.exports: $Exports<"material-ui/ExpansionPanel">;
}
declare module "material-ui/Form/FormControl.js" {
  declare module.exports: $Exports<"material-ui/Form/FormControl">;
}
declare module "material-ui/Form/FormControlLabel.js" {
  declare module.exports: $Exports<"material-ui/Form/FormControlLabel">;
}
declare module "material-ui/Form/FormGroup.js" {
  declare module.exports: $Exports<"material-ui/Form/FormGroup">;
}
declare module "material-ui/Form/FormHelperText.js" {
  declare module.exports: $Exports<"material-ui/Form/FormHelperText">;
}
declare module "material-ui/Form/FormLabel.js" {
  declare module.exports: $Exports<"material-ui/Form/FormLabel">;
}
declare module "material-ui/Form/index.js" {
  declare module.exports: $Exports<"material-ui/Form">;
}
declare module "material-ui/Grid/Grid.js" {
  declare module.exports: $Exports<"material-ui/Grid/Grid">;
}
declare module "material-ui/Grid/index.js" {
  declare module.exports: $Exports<"material-ui/Grid">;
}
declare module "material-ui/GridList/GridList.js" {
  declare module.exports: $Exports<"material-ui/GridList/GridList">;
}
declare module "material-ui/GridList/GridListTile.js" {
  declare module.exports: $Exports<"material-ui/GridList/GridListTile">;
}
declare module "material-ui/GridList/GridListTileBar.js" {
  declare module.exports: $Exports<"material-ui/GridList/GridListTileBar">;
}
declare module "material-ui/GridList/index.js" {
  declare module.exports: $Exports<"material-ui/GridList">;
}
declare module "material-ui/Hidden/Hidden.js" {
  declare module.exports: $Exports<"material-ui/Hidden/Hidden">;
}
declare module "material-ui/Hidden/HiddenCss.js" {
  declare module.exports: $Exports<"material-ui/Hidden/HiddenCss">;
}
declare module "material-ui/Hidden/HiddenJs.js" {
  declare module.exports: $Exports<"material-ui/Hidden/HiddenJs">;
}
declare module "material-ui/Hidden/index.js" {
  declare module.exports: $Exports<"material-ui/Hidden">;
}
declare module "material-ui/Hidden/types.js" {
  declare module.exports: $Exports<"material-ui/Hidden/types">;
}
declare module "material-ui/Icon/Icon.js" {
  declare module.exports: $Exports<"material-ui/Icon/Icon">;
}
declare module "material-ui/Icon/index.js" {
  declare module.exports: $Exports<"material-ui/Icon">;
}
declare module "material-ui/IconButton/IconButton.js" {
  declare module.exports: $Exports<"material-ui/IconButton/IconButton">;
}
declare module "material-ui/IconButton/index.js" {
  declare module.exports: $Exports<"material-ui/IconButton">;
}
declare module "material-ui/Input/index.js" {
  declare module.exports: $Exports<"material-ui/Input">;
}
declare module "material-ui/Input/Input.js" {
  declare module.exports: $Exports<"material-ui/Input/Input">;
}
declare module "material-ui/Input/InputAdornment.js" {
  declare module.exports: $Exports<"material-ui/Input/InputAdornment">;
}
declare module "material-ui/Input/InputLabel.js" {
  declare module.exports: $Exports<"material-ui/Input/InputLabel">;
}
declare module "material-ui/Input/Textarea.js" {
  declare module.exports: $Exports<"material-ui/Input/Textarea">;
}
declare module "material-ui/internal/dom.js" {
  declare module.exports: $Exports<"material-ui/internal/dom">;
}
declare module "material-ui/Portal/Portal.js" {
  declare module.exports: $Exports<"material-ui/Portal">;
}
declare module "material-ui/internal/SwitchBase.js" {
  declare module.exports: $Exports<"material-ui/internal/SwitchBase">;
}
declare module "material-ui/internal/transition.js" {
  declare module.exports: $Exports<"material-ui/internal/transition">;
}
declare module "material-ui/List/index.js" {
  declare module.exports: $Exports<"material-ui/List">;
}
declare module "material-ui/List/List.js" {
  declare module.exports: $Exports<"material-ui/List/List">;
}
declare module "material-ui/List/ListItem.js" {
  declare module.exports: $Exports<"material-ui/List/ListItem">;
}
declare module "material-ui/List/ListItemAvatar.js" {
  declare module.exports: $Exports<"material-ui/List/ListItemAvatar">;
}
declare module "material-ui/List/ListItemIcon.js" {
  declare module.exports: $Exports<"material-ui/List/ListItemIcon">;
}
declare module "material-ui/List/ListItemSecondaryAction.js" {
  declare module.exports: $Exports<"material-ui/List/ListItemSecondaryAction">;
}
declare module "material-ui/List/ListItemText.js" {
  declare module.exports: $Exports<"material-ui/List/ListItemText">;
}
declare module "material-ui/List/ListSubheader.js" {
  declare module.exports: $Exports<"material-ui/List/ListSubheader">;
}
declare module "material-ui/Menu/index.js" {
  declare module.exports: $Exports<"material-ui/Menu">;
}
declare module "material-ui/Menu/Menu.js" {
  declare module.exports: $Exports<"material-ui/Menu/Menu">;
}
declare module "material-ui/Menu/MenuItem.js" {
  declare module.exports: $Exports<"material-ui/Menu/MenuItem">;
}
declare module "material-ui/Menu/MenuList.js" {
  declare module.exports: $Exports<"material-ui/Menu/MenuList">;
}
declare module "material-ui/MobileStepper/index.js" {
  declare module.exports: $Exports<"material-ui/MobileStepper">;
}
declare module "material-ui/MobileStepper/MobileStepper.js" {
  declare module.exports: $Exports<"material-ui/MobileStepper/MobileStepper">;
}
declare module "material-ui/Modal/Backdrop.js" {
  declare module.exports: $Exports<"material-ui/Modal/Backdrop">;
}
declare module "material-ui/Modal/index.js" {
  declare module.exports: $Exports<"material-ui/Modal">;
}
declare module "material-ui/Modal/Modal.js" {
  declare module.exports: $Exports<"material-ui/Modal/Modal">;
}
declare module "material-ui/Modal/modalManager.js" {
  declare module.exports: $Exports<"material-ui/Modal/modalManager">;
}
declare module "material-ui/Paper/index.js" {
  declare module.exports: $Exports<"material-ui/Paper">;
}
declare module "material-ui/Paper/Paper.js" {
  declare module.exports: $Exports<"material-ui/Paper/Paper">;
}
declare module "material-ui/Popover/index.js" {
  declare module.exports: $Exports<"material-ui/Popover">;
}
declare module "material-ui/Popover/Popover.js" {
  declare module.exports: $Exports<"material-ui/Popover/Popover">;
}
declare module "material-ui/Progress/CircularProgress.js" {
  declare module.exports: $Exports<"material-ui/Progress/CircularProgress">;
}
declare module "material-ui/Progress/index.js" {
  declare module.exports: $Exports<"material-ui/Progress">;
}
declare module "material-ui/Progress/LinearProgress.js" {
  declare module.exports: $Exports<"material-ui/Progress/LinearProgress">;
}
declare module "material-ui/Radio/index.js" {
  declare module.exports: $Exports<"material-ui/Radio">;
}
declare module "material-ui/Radio/Radio.js" {
  declare module.exports: $Exports<"material-ui/Radio/Radio">;
}
declare module "material-ui/Radio/RadioGroup.js" {
  declare module.exports: $Exports<"material-ui/Radio/RadioGroup">;
}
declare module "material-ui/Select/index.js" {
  declare module.exports: $Exports<"material-ui/Select">;
}
declare module "material-ui/Select/Select.js" {
  declare module.exports: $Exports<"material-ui/Select/Select">;
}
declare module "material-ui/Select/SelectInput.js" {
  declare module.exports: $Exports<"material-ui/Select/SelectInput">;
}
declare module "material-ui/Snackbar/index.js" {
  declare module.exports: $Exports<"material-ui/Snackbar">;
}
declare module "material-ui/Snackbar/Snackbar.js" {
  declare module.exports: $Exports<"material-ui/Snackbar/Snackbar">;
}
declare module "material-ui/Snackbar/SnackbarContent.js" {
  declare module.exports: $Exports<"material-ui/Snackbar/SnackbarContent">;
}
declare module "material-ui/Stepper/index.js" {
  declare module.exports: $Exports<"material-ui/Stepper">;
}
declare module "material-ui/Stepper/Step.js" {
  declare module.exports: $Exports<"material-ui/Stepper/Step">;
}
declare module "material-ui/Stepper/StepButton.js" {
  declare module.exports: $Exports<"material-ui/Stepper/StepButton">;
}
declare module "material-ui/Stepper/StepConnector.js" {
  declare module.exports: $Exports<"material-ui/Stepper/StepConnector">;
}
declare module "material-ui/Stepper/StepContent.js" {
  declare module.exports: $Exports<"material-ui/Stepper/StepContent">;
}
declare module "material-ui/Stepper/StepIcon.js" {
  declare module.exports: $Exports<"material-ui/Stepper/StepIcon">;
}
declare module "material-ui/Stepper/StepLabel.js" {
  declare module.exports: $Exports<"material-ui/Stepper/StepLabel">;
}
declare module "material-ui/Stepper/Stepper.js" {
  declare module.exports: $Exports<"material-ui/Stepper/Stepper">;
}
declare module "material-ui/Stepper/StepPositionIcon.js" {
  declare module.exports: $Exports<"material-ui/Stepper/StepPositionIcon">;
}
declare module "material-ui/styles/colorManipulator.js" {
  declare module.exports: $Exports<"material-ui/styles/colorManipulator">;
}
declare module "material-ui/styles/createBreakpoints.js" {
  declare module.exports: $Exports<"material-ui/styles/createBreakpoints">;
}
declare module "material-ui/styles/createGenerateClassName.js" {
  declare module.exports: $Exports<
    "material-ui/styles/createGenerateClassName"
  >;
}
declare module "material-ui/styles/createMixins.js" {
  declare module.exports: $Exports<"material-ui/styles/createMixins">;
}
declare module "material-ui/styles/createMuiTheme.js" {
  declare module.exports: $Exports<"material-ui/styles/createMuiTheme">;
}
declare module "material-ui/styles/createPalette.js" {
  declare module.exports: $Exports<"material-ui/styles/createPalette">;
}
declare module "material-ui/styles/createTypography.js" {
  declare module.exports: $Exports<"material-ui/styles/createTypography">;
}
declare module "material-ui/styles/getStylesCreator.js" {
  declare module.exports: $Exports<"material-ui/styles/getStylesCreator">;
}
declare module "material-ui/styles/index.js" {
  declare module.exports: $Exports<"material-ui/styles">;
}
declare module "material-ui/styles/MuiThemeProvider.js" {
  declare module.exports: $Exports<"material-ui/styles/MuiThemeProvider">;
}
declare module "material-ui/styles/shadows.js" {
  declare module.exports: $Exports<"material-ui/styles/shadows">;
}
declare module "material-ui/styles/spacing.js" {
  declare module.exports: $Exports<"material-ui/styles/spacing">;
}
declare module "material-ui/styles/themeListener.js" {
  declare module.exports: $Exports<"material-ui/styles/themeListener">;
}
declare module "material-ui/styles/transitions.js" {
  declare module.exports: $Exports<"material-ui/styles/transitions">;
}
declare module "material-ui/styles/withStyles.js" {
  declare module.exports: $Exports<"material-ui/styles/withStyles">;
}
declare module "material-ui/styles/withTheme.js" {
  declare module.exports: $Exports<"material-ui/styles/withTheme">;
}
declare module "material-ui/styles/zIndex.js" {
  declare module.exports: $Exports<"material-ui/styles/zIndex">;
}
declare module "material-ui/svg-icons/ArrowDownward.js" {
  declare module.exports: $Exports<"material-ui/svg-icons/ArrowDownward">;
}
declare module "material-ui/svg-icons/ArrowDropDown.js" {
  declare module.exports: $Exports<"material-ui/svg-icons/ArrowDropDown">;
}
declare module "material-ui/svg-icons/Cancel.js" {
  declare module.exports: $Exports<"material-ui/svg-icons/Cancel">;
}
declare module "material-ui/svg-icons/CheckBox.js" {
  declare module.exports: $Exports<"material-ui/svg-icons/CheckBox">;
}
declare module "material-ui/svg-icons/CheckBoxOutlineBlank.js" {
  declare module.exports: $Exports<
    "material-ui/svg-icons/CheckBoxOutlineBlank"
  >;
}
declare module "material-ui/svg-icons/CheckCircle.js" {
  declare module.exports: $Exports<"material-ui/svg-icons/CheckCircle">;
}
declare module "material-ui/svg-icons/IndeterminateCheckBox.js" {
  declare module.exports: $Exports<
    "material-ui/svg-icons/IndeterminateCheckBox"
  >;
}
declare module "material-ui/svg-icons/KeyboardArrowLeft.js" {
  declare module.exports: $Exports<"material-ui/svg-icons/KeyboardArrowLeft">;
}
declare module "material-ui/svg-icons/KeyboardArrowRight.js" {
  declare module.exports: $Exports<"material-ui/svg-icons/KeyboardArrowRight">;
}
declare module "material-ui/svg-icons/RadioButtonChecked.js" {
  declare module.exports: $Exports<"material-ui/svg-icons/RadioButtonChecked">;
}
declare module "material-ui/svg-icons/RadioButtonUnchecked.js" {
  declare module.exports: $Exports<
    "material-ui/svg-icons/RadioButtonUnchecked"
  >;
}
declare module "material-ui/SvgIcon/index.js" {
  declare module.exports: $Exports<"material-ui/SvgIcon">;
}
declare module "material-ui/SvgIcon/SvgIcon.js" {
  declare module.exports: $Exports<"material-ui/SvgIcon/SvgIcon">;
}
declare module "material-ui/Switch/index.js" {
  declare module.exports: $Exports<"material-ui/Switch">;
}
declare module "material-ui/Switch/Switch.js" {
  declare module.exports: $Exports<"material-ui/Switch/Switch">;
}
declare module "material-ui/Table/index.js" {
  declare module.exports: $Exports<"material-ui/Table">;
}
declare module "material-ui/Table/Table.js" {
  declare module.exports: $Exports<"material-ui/Table/Table">;
}
declare module "material-ui/Table/TableBody.js" {
  declare module.exports: $Exports<"material-ui/Table/TableBody">;
}
declare module "material-ui/Table/TableCell.js" {
  declare module.exports: $Exports<"material-ui/Table/TableCell">;
}
declare module "material-ui/Table/TableFooter.js" {
  declare module.exports: $Exports<"material-ui/Table/TableFooter">;
}
declare module "material-ui/Table/TableHead.js" {
  declare module.exports: $Exports<"material-ui/Table/TableHead">;
}
declare module "material-ui/Table/TablePagination.js" {
  declare module.exports: $Exports<"material-ui/Table/TablePagination">;
}
declare module "material-ui/Table/TableRow.js" {
  declare module.exports: $Exports<"material-ui/Table/TableRow">;
}
declare module "material-ui/Table/TableSortLabel.js" {
  declare module.exports: $Exports<"material-ui/Table/TableSortLabel">;
}
declare module "material-ui/Tabs/index.js" {
  declare module.exports: $Exports<"material-ui/Tabs">;
}
declare module "material-ui/Tabs/Tab.js" {
  declare module.exports: $Exports<"material-ui/Tabs/Tab">;
}
declare module "material-ui/Tabs/TabIndicator.js" {
  declare module.exports: $Exports<"material-ui/Tabs/TabIndicator">;
}
declare module "material-ui/Tabs/Tabs.js" {
  declare module.exports: $Exports<"material-ui/Tabs/Tabs">;
}
declare module "material-ui/Tabs/TabScrollButton.js" {
  declare module.exports: $Exports<"material-ui/Tabs/TabScrollButton">;
}
declare module "material-ui/TextField/index.js" {
  declare module.exports: $Exports<"material-ui/TextField">;
}
declare module "material-ui/TextField/TextField.js" {
  declare module.exports: $Exports<"material-ui/TextField/TextField">;
}
declare module "material-ui/Toolbar/index.js" {
  declare module.exports: $Exports<"material-ui/Toolbar">;
}
declare module "material-ui/Toolbar/Toolbar.js" {
  declare module.exports: $Exports<"material-ui/Toolbar/Toolbar">;
}
declare module "material-ui/Tooltip/index.js" {
  declare module.exports: $Exports<"material-ui/Tooltip">;
}
declare module "material-ui/Tooltip/Tooltip.js" {
  declare module.exports: $Exports<"material-ui/Tooltip/Tooltip">;
}
declare module "material-ui/transitions/Collapse.js" {
  declare module.exports: $Exports<"material-ui/transitions/Collapse">;
}
declare module "material-ui/transitions/Fade.js" {
  declare module.exports: $Exports<"material-ui/transitions/Fade">;
}
declare module "material-ui/transitions/Grow.js" {
  declare module.exports: $Exports<"material-ui/transitions/Grow">;
}
declare module "material-ui/transitions/index.js" {
  declare module.exports: $Exports<"material-ui/transitions">;
}
declare module "material-ui/transitions/Slide.js" {
  declare module.exports: $Exports<"material-ui/transitions/Slide">;
}
declare module "material-ui/Typography/index.js" {
  declare module.exports: $Exports<"material-ui/Typography">;
}
declare module "material-ui/Typography/Typography.js" {
  declare module.exports: $Exports<"material-ui/Typography/Typography">;
}
declare module "material-ui/utils/addEventListener.js" {
  declare module.exports: $Exports<"material-ui/utils/addEventListener">;
}
declare module "material-ui/utils/ClickAwayListener.js" {
  declare module.exports: $Exports<"material-ui/utils/ClickAwayListener">;
}
declare module "material-ui/utils/exactProp.js" {
  declare module.exports: $Exports<"material-ui/utils/exactProp">;
}
declare module "material-ui/utils/helpers.js" {
  declare module.exports: $Exports<"material-ui/utils/helpers">;
}
declare module "material-ui/utils/keyboardFocus.js" {
  declare module.exports: $Exports<"material-ui/utils/keyboardFocus">;
}
declare module "material-ui/utils/manageAriaHidden.js" {
  declare module.exports: $Exports<"material-ui/utils/manageAriaHidden">;
}
declare module "material-ui/utils/reactHelpers.js" {
  declare module.exports: $Exports<"material-ui/utils/reactHelpers">;
}
declare module "material-ui/utils/requirePropFactory.js" {
  declare module.exports: $Exports<"material-ui/utils/requirePropFactory">;
}
declare module "material-ui/utils/withWidth.js" {
  declare module.exports: $Exports<"material-ui/utils/withWidth">;
}

declare module "material-ui" {
  declare export var AppBar: $Exports<"material-ui/AppBar/AppBar">;
  declare export var Avatar: $Exports<"material-ui/Avatar/Avatar">;
  declare export var Badge: $Exports<"material-ui/Badge/Badge">;
  declare export var BottomNavigationAction: $Exports<
    "material-ui/BottomNavigation/BottomNavigationAction"
  >;

  declare export var BottomNavigation: $Exports<
    "material-ui/BottomNavigation/BottomNavigation"
  >;
  declare export var Button: $Exports<"material-ui/Button/Button">;
  declare export var ButtonBase: $Exports<"material-ui/ButtonBase/ButtonBase">;
  declare export var Card: $Exports<"material-ui/Card/Card">;
  declare export var CardActions: $Exports<"material-ui/Card/CardActions">;
  declare export var CardContent: $Exports<"material-ui/Card/CardContent">;
  declare export var CardHeader: $Exports<"material-ui/Card/CardHeader">;
  declare export var CardMedia: $Exports<"material-ui/Card/CardMedia">;
  declare export var Checkbox: $Exports<"material-ui/Checkbox/Checkbox">;
  declare export var Chip: $Exports<"material-ui/Chip/Chip">;
  declare export var ClickAwayListener: $Exports<
    "material-ui/utils/ClickAwayListener"
  >;
  declare export var CssBaseline: $Exports<
    "material-ui/CssBaseline/CssBaseline"
  >;

  declare export var Dialog: $Exports<"material-ui/Dialog/Dialog">;
  declare export var DialogActions: $Exports<
    "material-ui/Dialog/DialogActions"
  >;
  declare export var DialogContent: $Exports<
    "material-ui/Dialog/DialogContent"
  >;
  declare export var DialogContentText: $Exports<
    "material-ui/Dialog/DialogContentText"
  >;
  declare export var DialogTitle: $Exports<"material-ui/Dialog/DialogTitle">;
  declare export var withMobileDialog: $Exports<
    "material-ui/Dialog/withMobileDialog"
  >;
  declare export var Divider: $Exports<"material-ui/Divider/Divider">;
  declare export var Drawer: $Exports<"material-ui/Drawer/Drawer">;
  declare export var ExpansionPanel: $Exports<
    "material-ui/ExpansionPanel/ExpansionPanel"
  >;
  declare export var ExpansionPanelActions: $Exports<
    "material-ui/ExpansionPanel/ExpansionPanelActions"
  >;
  declare export var ExpansionPanelDetails: $Exports<
    "material-ui/ExpansionPanel/ExpansionPanelDetails"
  >;
  declare export var ExpansionPanelSummary: $Exports<
    "material-ui/ExpansionPanel/ExpansionPanelSummary"
  >;

  declare export var FormControl: $Exports<"material-ui/Form/FormControl">;
  declare export var FormGroup: $Exports<"material-ui/Form/FormGroup">;
  declare export var FormLabel: $Exports<"material-ui/Form/FormLabel">;
  declare export var FormHelperText: $Exports<
    "material-ui/Form/FormHelperText"
  >;
  declare export var FormControlLabel: $Exports<
    "material-ui/Form/FormControlLabel"
  >;
  declare export var Hidden: $Exports<"material-ui/Hidden/Hidden">;
  declare export var Icon: $Exports<"material-ui/Icon/Icon">;
  declare export var IconButton: $Exports<"material-ui/IconButton/IconButton">;
  declare export var Input: $Exports<"material-ui/Input/Input">;
  declare export var InputLabel: $Exports<"material-ui/Input/InputLabel">;
  declare export var InputAdornment: $Exports<
    "material-ui/Input/InputAdornment"
  >;
  declare export var Grid: $Exports<"material-ui/Grid/Grid">;
  declare export var GridList: $Exports<"material-ui/GridList/GridList">;
  declare export var GridListTile: $Exports<
    "material-ui/GridList/GridListTile"
  >;
  declare export var GridListTileBar: $Exports<
    "material-ui/GridList/GridListTileBar"
  >;
  declare export var List: $Exports<"material-ui/List/List">;
  declare export var ListItem: $Exports<"material-ui/List/ListItem">;
  declare export var ListItemAvatar: $Exports<
    "material-ui/List/ListItemAvatar"
  >;
  declare export var ListItemIcon: $Exports<"material-ui/List/ListItemIcon">;
  declare export var ListItemSecondaryAction: $Exports<
    "material-ui/List/ListItemSecondaryAction"
  >;
  declare export var ListItemText: $Exports<"material-ui/List/ListItemText">;
  declare export var ListSubheader: $Exports<"material-ui/List/ListSubheader">;
  declare export var Menu: $Exports<"material-ui/Menu/Menu">;
  declare export var MenuItem: $Exports<"material-ui/Menu/MenuItem">;
  declare export var MenuList: $Exports<"material-ui/Menu/MenuList">;
  declare export var MobileStepper: $Exports<
    "material-ui/MobileStepper/MobileStepper"
  >;
  declare export var Modal: $Exports<"material-ui/Modal/Modal">;
  declare export var Backdrop: $Exports<"material-ui/Modal/Backdrop">;
  declare export var ModalManager: $Exports<"material-ui/Modal/ModalManager">;
  declare export var Paper: $Exports<"material-ui/Paper/Paper">;
  declare export var Popover: $Exports<"material-ui/Popover/Popover">;
  declare export var Portal: $Exports<"material-ui/Portal/Portal">;
  declare export var CircularProgress: $Exports<
    "material-ui/Progress/CircularProgress"
  >;
  declare export var LinearProgress: $Exports<
    "material-ui/Progress/LinearProgress"
  >;
  declare export var Radio: $Exports<"material-ui/Radio/Radio">;
  declare export var RadioGroup: $Exports<"material-ui/Radio/RadioGroup">;
  declare export var Select: $Exports<"material-ui/Select/Select">;
  declare export var Snackbar: $Exports<"material-ui/Snackbar/Snackbar">;
  declare export var SnackbarContent: $Exports<
    "material-ui/Snackbar/SnackbarContent"
  >;
  declare export var Stepper: $Exports<"material-ui/Stepper/Stepper">;
  declare export var Step: $Exports<"material-ui/Stepper/Step">;
  declare export var StepButton: $Exports<"material-ui/Stepper/StepButton">;
  declare export var StepIcon: $Exports<"material-ui/Stepper/StepIcon">;
  declare export var StepContent: $Exports<"material-ui/Stepper/StepContent">;
  declare export var StepLabel: $Exports<"material-ui/Stepper/StepLabel">;
  declare export var MuiThemeProvider: $Exports<
    "material-ui/styles/MuiThemeProvider"
  >;
  declare export var withStyles: $Exports<"material-ui/styles/withStyles">;
  declare export var withTheme: $Exports<"material-ui/styles/withTheme">;
  declare export var createMuiTheme: $Exports<
    "material-ui/styles/createMuiTheme"
  >;
  declare export var jssPreset: $Exports<"material-ui/styles/jssPreset">;
  declare export var SvgIcon: $Exports<"material-ui/SvgIcon/SvgIcon">;
  declare export var SwipeableDrawer: $Exports<"material-ui/SwipeableDrawer">;
  declare export var Switch: $Exports<"material-ui/Switch/Switch">;
  declare export var Table: $Exports<"material-ui/Table/Table">;
  declare export var TableBody: $Exports<"material-ui/Table/TableBody">;
  declare export var TableCell: $Exports<"material-ui/Table/TableCell">;
  declare export var TableFooter: $Exports<"material-ui/Table/TableFooter">;
  declare export var TableHead: $Exports<"material-ui/Table/TableHead">;
  declare export var TablePagination: $Exports<
    "material-ui/Table/TablePagination"
  >;
  declare export var TableRow: $Exports<"material-ui/Table/TableRow">;
  declare export var TableSortLabel: $Exports<
    "material-ui/Table/TableSortLabel"
  >;
  declare export var Tabs: $Exports<"material-ui/Tabs/Tab">;
  declare export var Tab: $Exports<"material-ui/Tabs/Tab">;
  declare export var Typography: $Exports<"material-ui/Typography/Typography">;
  declare export var TextField: $Exports<"material-ui/TextField/TextField">;
  declare export var Toolbar: $Exports<"material-ui/Toolbar/Toolbar">;
  declare export var Tooltip: $Exports<"material-ui/Tooltip/Tooltip">;
  declare export var Slide: $Exports<"material-ui/transitions/Slide">;
  declare export var Grow: $Exports<"material-ui/transitions/Grow">;
  declare export var Fade: $Exports<"material-ui/transitions/Fade">;
  declare export var Collapse: $Exports<"material-ui/transitions/Collapse">;
  declare export var Zoom: $Exports<"material-ui/transitions/Zoom">;

  declare export var withWidth: $Exports<"material-ui/utils/withWidth">;
  declare export var common: $Exports<"material-ui/colors/common">;
  declare export var red: $Exports<"material-ui/colors/red">;
  declare export var pink: $Exports<"material-ui/colors/pink">;
  declare export var purple: $Exports<"material-ui/colors/purple">;
  declare export var deepPurple: $Exports<"material-ui/colors/deepPurple">;
  declare export var indigo: $Exports<"material-ui/colors/indigo">;
  declare export var blue: $Exports<"material-ui/colors/blue">;
  declare export var lightBlue: $Exports<"material-ui/colors/lightBlue">;
  declare export var cyan: $Exports<"material-ui/colors/cyan">;
  declare export var teal: $Exports<"material-ui/colors/teal">;
  declare export var green: $Exports<"material-ui/colors/green">;
  declare export var lightGreen: $Exports<"material-ui/colors/lightGreen">;
  declare export var lime: $Exports<"material-ui/colors/lime">;
  declare export var yellow: $Exports<"material-ui/colors/yellow">;
  declare export var amber: $Exports<"material-ui/colors/amber">;
  declare export var orange: $Exports<"material-ui/colors/orange">;
  declare export var deepOrange: $Exports<"material-ui/colors/deepOrange">;
  declare export var brown: $Exports<"material-ui/colors/brown">;
  declare export var grey: $Exports<"material-ui/colors/grey">;
  declare export var blueGrey: $Exports<"material-ui/colors/blueGrey">;
}
