import { AppBarProps } from '../AppBar/AppBar';
import { AvatarProps } from '../Avatar/Avatar';
import { BackdropProps } from '../Modal/Backdrop';
import { BadgeProps } from '../Badge/Badge';
import { BottomNavigationProps } from '../BottomNavigation/BottomNavigation';
import { BottomNavigationActionProps } from '../BottomNavigation/BottomNavigationAction';
import { ButtonProps } from '../Button/Button';
import { ButtonBaseProps } from '../ButtonBase/ButtonBase';
import { CardProps } from '../Card/Card';
import { CardActionsProps } from '../Card/CardActions';
import { CardContentProps } from '../Card/CardContent';
import { CardHeaderProps } from '../Card/CardHeader';
import { CardMediaProps } from '../Card/CardMedia';
import { CheckboxProps } from '../Checkbox/Checkbox';
import { ChipProps } from '../Chip/Chip';
import { CircularProgressProps } from '../Progress/CircularProgress';
import { CollapseProps } from '../transitions/Collapse';
import { CssBaselineProps } from '../CssBaseline/CssBaseline';
import { DialogActionsProps } from '../Dialog/DialogActions';
import { DialogProps } from '../Dialog/Dialog';
import { DialogContentProps } from '../Dialog/DialogContent';
import { DialogContentTextProps } from '../Dialog/DialogContentText';
import { DialogTitleProps } from '../Dialog/DialogTitle';
import { DividerProps } from '../Divider/Divider';
import { DrawerProps } from '../Drawer/Drawer';
import { ExpansionPanelActionsProps } from '../ExpansionPanel/ExpansionPanelActions';
import { ExpansionPanelProps } from '../ExpansionPanel/ExpansionPanel';
import { ExpansionPanelDetailsProps } from '../ExpansionPanel/ExpansionPanelDetails';
import { ExpansionPanelSummaryProps } from '../ExpansionPanel/ExpansionPanelSummary';
import { FormControlProps } from '../Form/FormControl';
import { FormControlLabelProps } from '../Form/FormControlLabel';
import { FormGroupProps } from '../Form/FormGroup';
import { FormHelperTextProps } from '../Form/FormHelperText';
import { FormLabelProps } from '../Form/FormLabel';
import { GridProps } from '../Grid/Grid';
import { GridListProps } from '../GridList/GridList';
import { GridListTileBarProps } from '../GridList/GridListTileBar';
import { GridListTileProps } from '../GridList/GridListTile';
import { IconButtonProps } from '../IconButton/IconButton';
import { IconProps } from '../Icon/Icon';
import { InputAdornmentProps } from '../Input/InputAdornment';
import { InputProps } from '../Input/Input';
import { InputLabelProps } from '../Input/InputLabel';
import { LinearProgressProps } from '../Progress/LinearProgress';
import { ListProps } from '../List/List';
import { ListItemAvatarProps } from '../List/ListItemAvatar';
import { ListItemProps } from '../List/ListItem';
import { ListItemIconProps } from '../List/ListItemIcon';
import { ListItemSecondaryActionProps } from '../List/ListItemSecondaryAction';
import { ListItemTextProps } from '../List/ListItemText';
import { ListSubheaderProps } from '../List/ListSubheader';
import { MenuProps } from '../Menu/Menu';
import { MenuItemProps } from '../Menu/MenuItem';
import { MenuListProps } from '../Menu/MenuList';
import { MobileStepperProps } from '../MobileStepper/MobileStepper';
import { ModalProps } from '../Modal/Modal';
import { PaperProps } from '../Paper/Paper';
import { PopoverProps } from '../Popover/Popover';
import { RadioProps } from '../Radio/Radio';
import { RadioGroupProps } from '../Radio/RadioGroup';
import { SelectProps } from '../Select/Select';
import { SelectInputProps } from '../Select/SelectInput';
import { SnackbarProps } from '../Snackbar/Snackbar';
import { ContentProps } from '../Snackbar/SnackbarContent';
import { StepProps } from '../Stepper/Step';
import { StepButtonProps } from '../Stepper/StepButton';
import { StepContentProps } from '../Stepper/StepContent';
import { StepIconProps } from '../Stepper/StepIcon';
import { StepLabelProps } from '../Stepper/StepLabel';
import { StepperProps } from '../Stepper/Stepper';
import { StyleRules } from './withStyles';
import { SvgIconProps } from '../SvgIcon/SvgIcon';
import { SwitchBaseProps } from '../internal/SwitchBase';
import { SwitchProps } from '../Switch/Switch';
import { TabProps } from '../Tabs/Tab';
import { TableProps } from '../Table/Table';
import { TableCellProps } from '../Table/TableCell';
import { TablePaginationProps } from '../Table/TablePagination';
import { TableRowProps } from '../Table/TableRow';
import { TableSortLabelProps } from '../Table/TableSortLabel';
import { TabsProps } from '../Tabs/Tabs';
import { ToolbarProps } from '../Toolbar/Toolbar';
import { TooltipProps } from '../Tooltip/Tooltip';
import { TouchRippleProps } from '../ButtonBase/TouchRipple';
import { TypographyProps } from '../Typography/Typography';


export type ComponentsProps = {
  [Name in keyof ComponentsPropsList]?: Partial<ComponentsPropsList[Name]>
}

type ComponentsPropsList = {
  MuiAppBar: AppBarProps,
  MuiAvatar: AvatarProps,
  MuiBackdrop: BackdropProps,
  MuiBadge: BadgeProps,
  MuiBottomNavigation: BottomNavigationProps,
  MuiBottomNavigationAction: BottomNavigationActionProps,
  MuiButton: ButtonProps,
  MuiButtonBase: ButtonBaseProps,
  MuiCard: CardProps,
  MuiCardActions: CardActionsProps,
  MuiCardContent: CardContentProps,
  MuiCardHeader: CardHeaderProps,
  MuiCardMedia: CardMediaProps,
  MuiCheckbox: CheckboxProps,
  MuiChip: ChipProps,
  MuiCircularProgress: CircularProgressProps,
  MuiCollapse: CollapseProps,
  MuiCssBaseline: CssBaselineProps,
  MuiDialog: DialogProps,
  MuiDialogActions: DialogActionsProps,
  MuiDialogContent: DialogContentProps,
  MuiDialogContentText: DialogContentTextProps,
  MuiDialogTitle: DialogTitleProps,
  MuiDivider: DividerProps,
  MuiDrawer: DrawerProps,
  MuiExpansionPanel: ExpansionPanelProps,
  MuiExpansionPanelActions: ExpansionPanelActionsProps,
  MuiExpansionPanelDetails: ExpansionPanelDetailsProps,
  MuiExpansionPanelSummary: ExpansionPanelSummaryProps,
  MuiFormControl: FormControlProps,
  MuiFormControlLabel: FormControlLabelProps,
  MuiFormGroup: FormGroupProps,
  MuiFormHelperText: FormHelperTextProps,
  MuiFormLabel: FormLabelProps,
  MuiGrid: GridProps,
  MuiGridList: GridListProps,
  MuiGridListTile: GridListTileProps,
  MuiGridListTileBar: GridListTileBarProps,
  MuiIcon: IconProps,
  MuiIconButton: IconButtonProps,
  MuiInput: InputProps,
  MuiInputAdornment: InputAdornmentProps,
  MuiInputLabel: InputLabelProps,
  MuiLinearProgress: LinearProgressProps,
  MuiList: ListProps,
  MuiListItem: ListItemProps,
  MuiListItemAvatar: ListItemAvatarProps,
  MuiListItemIcon: ListItemIconProps,
  MuiListItemSecondaryAction: ListItemSecondaryActionProps,
  MuiListItemText: ListItemTextProps,
  MuiListSubheader: ListSubheaderProps,
  MuiMenu: MenuProps,
  MuiMenuItem: MenuItemProps,
  MuiMobileStepper: MobileStepperProps,
  MuiModal: ModalProps,
  MuiPaper: PaperProps,
  MuiPopover: PopoverProps,
  MuiRadio: RadioProps,
  MuiSelect: SelectProps,
  MuiSnackbar: SnackbarProps,
  MuiSnackbarContent: ContentProps,
  MuiStep: StepProps,
  MuiStepButton: StepButtonProps,
  MuiStepContent: StepContentProps,
  MuiStepIcon: StepIconProps,
  MuiStepLabel: StepLabelProps,
  MuiStepper: StepperProps,
  MuiSvgIcon: SvgIconProps,
  MuiSwitchBase: SwitchBaseProps,
  MuiSwitch: SwitchProps,
  MuiTab: TabProps,
  MuiTable: TableProps,
  MuiTableCell: TableCellProps,
  MuiTablePagination: TablePaginationProps,
  MuiTableRow: TableRowProps,
  MuiTableSortLabel: TableSortLabelProps,
  MuiTabs: TabsProps,
  MuiToolbar: ToolbarProps,
  MuiTooltip: TooltipProps,
  MuiTouchRipple: TouchRippleProps,
  MuiTypography: TypographyProps,
}
