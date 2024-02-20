import { GlobalStateSlot } from '@mui/utils';
import { CSSInterpolation } from '@mui/system';
import { AccordionProps, AccordionOwnerState, AccordionSlot } from '../Accordion/AccordionProps';
import {
  AccordionGroupProps,
  AccordionGroupOwnerState,
  AccordionGroupSlot,
} from '../AccordionGroup/AccordionGroupProps';
import {
  AccordionSummaryProps,
  AccordionSummaryOwnerState,
  AccordionSummarySlot,
} from '../AccordionSummary/AccordionSummaryProps';
import {
  AccordionDetailsProps,
  AccordionDetailsOwnerState,
  AccordionDetailsSlot,
} from '../AccordionDetails/AccordionDetailsProps';
import {
  AspectRatioProps,
  AspectRatioOwnerState,
  AspectRatioSlot,
} from '../AspectRatio/AspectRatioProps';
import {
  AutocompleteProps,
  AutocompleteOwnerState,
  AutocompleteSlot,
} from '../Autocomplete/AutocompleteProps';
import {
  AutocompleteListboxProps,
  AutocompleteListboxOwnerState,
  AutocompleteListboxSlot,
} from '../AutocompleteListbox/AutocompleteListboxProps';
import {
  AutocompleteOptionProps,
  AutocompleteOptionOwnerState,
  AutocompleteOptionSlot,
} from '../AutocompleteOption/AutocompleteOptionProps';
import { AvatarProps, AvatarOwnerState, AvatarSlot } from '../Avatar/AvatarProps';
import {
  AvatarGroupProps,
  AvatarGroupOwnerState,
  AvatarGroupSlot,
} from '../AvatarGroup/AvatarGroupProps';
import { BadgeProps, BadgeOwnerState, BadgeSlot } from '../Badge/BadgeProps';
import { AlertProps, AlertOwnerState, AlertSlot } from '../Alert/AlertProps';
import { BoxProps, BoxSlot } from '../Box/BoxProps';
import {
  BreadcrumbsProps,
  BreadcrumbsOwnerState,
  BreadcrumbsSlot,
} from '../Breadcrumbs/BreadcrumbsProps';
import { ButtonProps, ButtonOwnerState, ButtonSlot } from '../Button/ButtonProps';
import {
  ButtonGroupProps,
  ButtonGroupOwnerState,
  ButtonGroupSlot,
} from '../ButtonGroup/ButtonGroupProps';
import { CardProps, CardOwnerState, CardSlot } from '../Card/CardProps';
import {
  CardActionsProps,
  CardActionsOwnerState,
  CardActionsSlot,
} from '../CardActions/CardActionsProps';
import {
  CardContentProps,
  CardContentOwnerState,
  CardContentSlot,
} from '../CardContent/CardContentProps';
import { CardCoverProps, CardCoverOwnerState, CardCoverSlot } from '../CardCover/CardCoverProps';
import {
  CardOverflowProps,
  CardOverflowOwnerState,
  CardOverflowSlot,
} from '../CardOverflow/CardOverflowProps';
import { CheckboxProps, CheckboxOwnerState, CheckboxSlot } from '../Checkbox/CheckboxProps';
import { ChipProps, ChipOwnerState, ChipSlot } from '../Chip/ChipProps';
import {
  ChipDeleteProps,
  ChipDeleteOwnerState,
  ChipDeleteSlot,
} from '../ChipDelete/ChipDeleteProps';
import {
  CircularProgressProps,
  CircularProgressOwnerState,
  CircularProgressSlot,
} from '../CircularProgress/CircularProgressProps';
import { ContainerProps, ContainerSlot } from '../Container/ContainerProps';
import {
  DialogActionsProps,
  DialogActionsOwnerState,
  DialogActionsSlot,
} from '../DialogActions/DialogActionsProps';
import {
  DialogContentProps,
  DialogContentOwnerState,
  DialogContentSlot,
} from '../DialogContent/DialogContentProps';
import {
  DialogTitleProps,
  DialogTitleOwnerState,
  DialogTitleSlot,
} from '../DialogTitle/DialogTitleProps';
import { DrawerProps, DrawerOwnerState, DrawerSlot } from '../Drawer/DrawerProps';
import {
  ScopedCssBaselineProps,
  ScopedCssBaselineOwnerState,
  ScopedCssBaselineSlot,
} from '../ScopedCssBaseline/ScopedCssBaselineProps';
import { DividerProps, DividerOwnerState, DividerSlot } from '../Divider/DividerProps';
import {
  FormControlProps,
  FormControlOwnerState,
  FormControlSlot,
} from '../FormControl/FormControlProps';
import {
  FormHelperTextProps,
  FormHelperTextOwnerState,
  FormHelperTextSlot,
} from '../FormHelperText/FormHelperTextProps';
import { FormLabelProps, FormLabelOwnerState, FormLabelSlot } from '../FormLabel/FormLabelProps';
import { GridProps, GridSlot } from '../Grid/GridProps';
import {
  IconButtonProps,
  IconButtonOwnerState,
  IconButtonSlot,
} from '../IconButton/IconButtonProps';
import { InputProps, InputOwnerState, InputSlot } from '../Input/InputProps';
import {
  LinearProgressProps,
  LinearProgressOwnerState,
  LinearProgressSlot,
} from '../LinearProgress/LinearProgressProps';
import { LinkProps, LinkOwnerState, LinkSlot } from '../Link/LinkProps';
import { ListProps, ListOwnerState, ListSlot } from '../List/ListProps';
import {
  ListDividerProps,
  ListDividerOwnerState,
  ListDividerSlot,
} from '../ListDivider/ListDividerProps';
import {
  ListSubheaderProps,
  ListSubheaderOwnerState,
  ListSubheaderSlot,
} from '../ListSubheader/ListSubheaderProps';
import { ListItemProps, ListItemOwnerState, ListItemSlot } from '../ListItem/ListItemProps';
import {
  ListItemButtonProps,
  ListItemButtonOwnerState,
  ListItemButtonSlot,
} from '../ListItemButton/ListItemButtonProps';
import {
  ListItemContentProps,
  ListItemContentOwnerState,
  ListItemContentSlot,
} from '../ListItemContent/ListItemContentProps';
import {
  ListItemDecoratorOwnerState,
  ListItemDecoratorProps,
  ListItemDecoratorSlot,
} from '../ListItemDecorator/ListItemDecoratorProps';
import { MenuProps, MenuOwnerState, MenuSlot } from '../Menu/MenuProps';
import {
  type MenuButtonOwnerState,
  type MenuButtonProps,
  type MenuButtonSlot,
} from '../MenuButton/MenuButtonProps';
import { MenuItemProps, MenuItemOwnerState, MenuItemSlot } from '../MenuItem/MenuItemProps';
import { MenuListProps, MenuListOwnerState, MenuListSlot } from '../MenuList/MenuListProps';
import { ModalProps, ModalOwnerState, ModalSlot } from '../Modal/ModalProps';
import {
  ModalCloseProps,
  ModalCloseOwnerState,
  ModalCloseSlot,
} from '../ModalClose/ModalCloseProps';
import {
  ModalDialogProps,
  ModalDialogOwnerState,
  ModalDialogSlot,
} from '../ModalDialog/ModalDialogProps';
import {
  ModalOverflowProps,
  ModalOverflowOwnerState,
  ModalOverflowSlot,
} from '../ModalOverflow/ModalOverflowProps';
import { RadioProps, RadioOwnerState, RadioSlot } from '../Radio/RadioProps';
import {
  RadioGroupProps,
  RadioGroupOwnerState,
  RadioGroupSlot,
} from '../RadioGroup/RadioGroupProps';
import { SheetProps, SheetOwnerState, SheetSlot } from '../Sheet/SheetProps';
import { SkeletonProps, SkeletonOwnerState, SkeletonSlot } from '../Skeleton/SkeletonProps';
import { SelectProps, SelectOwnerState, SelectSlot } from '../Select/SelectProps';
import { OptionProps, OptionOwnerState, OptionSlot } from '../Option/OptionProps';
import { SliderProps, SliderOwnerState, SliderSlot } from '../Slider/SliderProps';
import { SnackbarProps, SnackbarOwnerState, SnackbarSlot } from '../Snackbar/SnackbarProps';
import { StackProps, StackSlot } from '../Stack/StackProps';
import { StepperProps, StepperOwnerState, StepperSlot } from '../Stepper/StepperProps';
import { StepProps, StepOwnerState, StepSlot } from '../Step/StepProps';
import {
  StepButtonProps,
  StepButtonOwnerState,
  StepButtonSlot,
} from '../StepButton/StepButtonProps';
import {
  StepIndicatorProps,
  StepIndicatorOwnerState,
  StepIndicatorSlot,
} from '../StepIndicator/StepIndicatorProps';
import { SvgIconProps, SvgIconOwnerState, SvgIconSlot } from '../SvgIcon/SvgIconProps';
import { SwitchProps, SwitchOwnerState, SwitchSlot } from '../Switch/SwitchProps';
import {
  ToggleButtonGroupProps,
  ToggleButtonGroupOwnerState,
  ToggleButtonGroupSlot,
} from '../ToggleButtonGroup/ToggleButtonGroupProps';
import { TabProps, TabOwnerState, TabSlot } from '../Tab/TabProps';
import { TabListProps, TabListOwnerState, TabListSlot } from '../TabList/TabListProps';
import { TabPanelProps, TabPanelOwnerState, TabPanelSlot } from '../TabPanel/TabPanelProps';
import { TabsProps, TabsOwnerState, TabsSlot } from '../Tabs/TabsProps';
import { TableProps, TableOwnerState, TableSlot } from '../Table/TableProps';
import { TooltipProps, TooltipOwnerState, TooltipSlot } from '../Tooltip/TooltipProps';
import {
  TypographyProps,
  TypographyOwnerState,
  TypographySlot,
} from '../Typography/TypographyProps';
import { TextareaProps, TextareaOwnerState, TextareaSlot } from '../Textarea/TextareaProps';

export type StyleOverrides<
  SlotName extends string = string,
  ComponentOwnerState = Record<string, unknown>,
  Theme = unknown,
> = Partial<
  Record<
    Exclude<SlotName, GlobalStateSlot>,
    | CSSInterpolation
    | ((
        // Record<string, unknown> is for other props that the slot receive internally
        // Documenting all ownerStates could be a huge work, let's wait until we have a real needs from developers.
        props: {
          ownerState: ComponentOwnerState & Record<string, unknown>;
          theme: Theme;
        } & Record<string, unknown>,
      ) => CSSInterpolation)
  >
>;
export interface Components<Theme = unknown> {
  // alphabetical order
  JoyAccordion?: {
    defaultProps?: Partial<AccordionProps>;
    styleOverrides?: StyleOverrides<AccordionSlot, AccordionOwnerState, Theme>;
  };
  JoyAccordionGroup?: {
    defaultProps?: Partial<AccordionGroupProps>;
    styleOverrides?: StyleOverrides<AccordionGroupSlot, AccordionGroupOwnerState, Theme>;
  };
  JoyAccordionSummary?: {
    defaultProps?: Partial<AccordionSummaryProps>;
    styleOverrides?: StyleOverrides<AccordionSummarySlot, AccordionSummaryOwnerState, Theme>;
  };
  JoyAccordionDetails?: {
    defaultProps?: Partial<AccordionDetailsProps>;
    styleOverrides?: StyleOverrides<AccordionDetailsSlot, AccordionDetailsOwnerState, Theme>;
  };
  JoyAlert?: {
    defaultProps?: Partial<AlertProps>;
    styleOverrides?: StyleOverrides<AlertSlot, AlertOwnerState, Theme>;
  };
  JoyAspectRatio?: {
    defaultProps?: Partial<AspectRatioProps>;
    styleOverrides?: StyleOverrides<AspectRatioSlot, AspectRatioOwnerState, Theme>;
  };
  JoyAutocomplete?: {
    defaultProps?: Partial<AutocompleteProps<any, any, any, any>>;
    styleOverrides?: StyleOverrides<
      AutocompleteSlot,
      AutocompleteOwnerState<any, any, any, any>,
      Theme
    >;
  };
  JoyAutocompleteListbox?: {
    defaultProps?: Partial<AutocompleteListboxProps>;
    styleOverrides?: StyleOverrides<AutocompleteListboxSlot, AutocompleteListboxOwnerState, Theme>;
  };
  JoyAutocompleteOption?: {
    defaultProps?: Partial<AutocompleteOptionProps>;
    styleOverrides?: StyleOverrides<AutocompleteOptionSlot, AutocompleteOptionOwnerState, Theme>;
  };
  JoyAvatar?: {
    defaultProps?: Partial<AvatarProps>;
    styleOverrides?: StyleOverrides<AvatarSlot, AvatarOwnerState, Theme>;
  };
  JoyAvatarGroup?: {
    defaultProps?: Partial<AvatarGroupProps>;
    styleOverrides?: StyleOverrides<AvatarGroupSlot, AvatarGroupOwnerState, Theme>;
  };
  JoyBadge?: {
    defaultProps?: Partial<BadgeProps>;
    styleOverrides?: StyleOverrides<BadgeSlot, BadgeOwnerState, Theme>;
  };
  JoyBox?: {
    defaultProps?: Partial<BoxProps>;
    styleOverrides?: StyleOverrides<BoxSlot, BoxProps, Theme>;
  };
  JoyButton?: {
    defaultProps?: Partial<ButtonProps>;
    styleOverrides?: StyleOverrides<ButtonSlot, ButtonOwnerState, Theme>;
  };
  JoyButtonGroup?: {
    defaultProps?: Partial<ButtonGroupProps>;
    styleOverrides?: StyleOverrides<ButtonGroupSlot, ButtonGroupOwnerState, Theme>;
  };
  JoyBreadcrumbs?: {
    defaultProps?: Partial<BreadcrumbsProps>;
    styleOverrides?: StyleOverrides<BreadcrumbsSlot, BreadcrumbsOwnerState, Theme>;
  };
  JoyCircularProgress?: {
    defaultProps?: Partial<CircularProgressProps>;
    styleOverrides?: StyleOverrides<CircularProgressSlot, CircularProgressOwnerState, Theme>;
  };
  JoyCard?: {
    defaultProps?: Partial<CardProps>;
    styleOverrides?: StyleOverrides<CardSlot, CardOwnerState, Theme>;
  };
  JoyCardActions?: {
    defaultProps?: Partial<CardActionsProps>;
    styleOverrides?: StyleOverrides<CardActionsSlot, CardActionsOwnerState, Theme>;
  };
  JoyCardContent?: {
    defaultProps?: Partial<CardContentProps>;
    styleOverrides?: StyleOverrides<CardContentSlot, CardContentOwnerState, Theme>;
  };
  JoyCardCover?: {
    defaultProps?: Partial<CardCoverProps>;
    styleOverrides?: StyleOverrides<CardCoverSlot, CardCoverOwnerState, Theme>;
  };
  JoyCardOverflow?: {
    defaultProps?: Partial<CardOverflowProps>;
    styleOverrides?: StyleOverrides<CardOverflowSlot, CardOverflowOwnerState, Theme>;
  };
  JoyCheckbox?: {
    defaultProps?: Partial<CheckboxProps>;
    styleOverrides?: StyleOverrides<CheckboxSlot, CheckboxOwnerState, Theme>;
  };
  JoyChip?: {
    defaultProps?: Partial<ChipProps>;
    styleOverrides?: StyleOverrides<ChipSlot, ChipOwnerState, Theme>;
  };
  JoyChipDelete?: {
    defaultProps?: Partial<ChipDeleteProps>;
    styleOverrides?: StyleOverrides<ChipDeleteSlot, ChipDeleteOwnerState, Theme>;
  };
  JoyContainer?: {
    defaultProps?: Partial<ContainerProps>;
    styleOverrides?: StyleOverrides<ContainerSlot, ContainerProps, Theme>;
  };
  JoyDialogActions?: {
    defaultProps?: Partial<DialogActionsProps>;
    styleOverrides?: StyleOverrides<DialogActionsSlot, DialogActionsOwnerState, Theme>;
  };
  JoyDialogContent?: {
    defaultProps?: Partial<DialogContentProps>;
    styleOverrides?: StyleOverrides<DialogContentSlot, DialogContentOwnerState, Theme>;
  };
  JoyDialogTitle?: {
    defaultProps?: Partial<DialogTitleProps>;
    styleOverrides?: StyleOverrides<DialogTitleSlot, DialogTitleOwnerState, Theme>;
  };
  JoyDrawer?: {
    defaultProps?: Partial<DrawerProps>;
    styleOverrides?: StyleOverrides<DrawerSlot, DrawerOwnerState, Theme>;
  };
  JoyScopedCssBaseline?: {
    defaultProps?: Partial<ScopedCssBaselineProps>;
    styleOverrides?: StyleOverrides<ScopedCssBaselineSlot, ScopedCssBaselineOwnerState, Theme>;
  };
  JoyDivider?: {
    defaultProps?: Partial<DividerProps>;
    styleOverrides?: StyleOverrides<DividerSlot, DividerOwnerState, Theme>;
  };
  JoyFormControl?: {
    defaultProps?: Partial<FormControlProps>;
    styleOverrides?: StyleOverrides<FormControlSlot, FormControlOwnerState, Theme>;
  };
  JoyFormHelperText?: {
    defaultProps?: Partial<FormHelperTextProps>;
    styleOverrides?: StyleOverrides<FormHelperTextSlot, FormHelperTextOwnerState, Theme>;
  };
  JoyFormLabel?: {
    defaultProps?: Partial<FormLabelProps>;
    styleOverrides?: StyleOverrides<FormLabelSlot, FormLabelOwnerState, Theme>;
  };
  JoyGrid?: {
    defaultProps?: Partial<GridProps>;
    styleOverrides?: StyleOverrides<GridSlot, GridProps, Theme>;
  };
  JoyIconButton?: {
    defaultProps?: Partial<IconButtonProps>;
    styleOverrides?: StyleOverrides<IconButtonSlot, IconButtonOwnerState, Theme>;
  };
  JoyInput?: {
    defaultProps?: Partial<InputProps>;
    styleOverrides?: StyleOverrides<InputSlot, InputOwnerState, Theme>;
  };
  JoyLinearProgress?: {
    defaultProps?: Partial<LinearProgressProps>;
    styleOverrides?: StyleOverrides<LinearProgressSlot, LinearProgressOwnerState, Theme>;
  };
  JoyLink?: {
    defaultProps?: Partial<LinkProps>;
    styleOverrides?: StyleOverrides<LinkSlot, LinkOwnerState, Theme>;
  };
  JoyList?: {
    defaultProps?: Partial<ListProps>;
    styleOverrides?: StyleOverrides<ListSlot, ListOwnerState, Theme>;
  };
  JoyListDivider?: {
    defaultProps?: Partial<ListDividerProps>;
    styleOverrides?: StyleOverrides<ListDividerSlot, ListDividerOwnerState, Theme>;
  };
  JoyListSubheader?: {
    defaultProps?: Partial<ListSubheaderProps>;
    styleOverrides?: StyleOverrides<ListSubheaderSlot, ListSubheaderOwnerState, Theme>;
  };
  JoyListItem?: {
    defaultProps?: Partial<ListItemProps>;
    styleOverrides?: StyleOverrides<ListItemSlot, ListItemOwnerState, Theme>;
  };
  JoyListItemButton?: {
    defaultProps?: Partial<ListItemButtonProps>;
    styleOverrides?: StyleOverrides<ListItemButtonSlot, ListItemButtonOwnerState, Theme>;
  };
  JoyListItemContent?: {
    defaultProps?: Partial<ListItemContentProps>;
    styleOverrides?: StyleOverrides<ListItemContentSlot, ListItemContentOwnerState, Theme>;
  };
  JoyListItemDecorator?: {
    defaultProps?: Partial<ListItemDecoratorProps>;
    styleOverrides?: StyleOverrides<ListItemDecoratorSlot, ListItemDecoratorOwnerState, Theme>;
  };
  JoyRadio?: {
    defaultProps?: Partial<RadioProps>;
    styleOverrides?: StyleOverrides<RadioSlot, RadioOwnerState, Theme>;
  };
  JoyRadioGroup?: {
    defaultProps?: Partial<RadioGroupProps>;
    styleOverrides?: StyleOverrides<RadioGroupSlot, RadioGroupOwnerState, Theme>;
  };
  JoySelect?: {
    defaultProps?: Partial<SelectProps<any, any>>;
    styleOverrides?: StyleOverrides<SelectSlot, SelectOwnerState<any, any>, Theme>;
  };
  JoyOption?: {
    defaultProps?: Partial<OptionProps>;
    styleOverrides?: StyleOverrides<OptionSlot, OptionOwnerState, Theme>;
  };
  JoySheet?: {
    defaultProps?: Partial<SheetProps>;
    styleOverrides?: StyleOverrides<SheetSlot, SheetOwnerState, Theme>;
  };
  JoySkeleton?: {
    defaultProps?: Partial<SkeletonProps>;
    styleOverrides?: StyleOverrides<SkeletonSlot, SkeletonOwnerState, Theme>;
  };
  JoyStack?: {
    defaultProps?: Partial<StackProps>;
    styleOverrides?: StyleOverrides<StackSlot, StackProps, Theme>;
  };
  JoyStepper?: {
    defaultProps?: Partial<StepperProps>;
    styleOverrides?: StyleOverrides<StepperSlot, StepperOwnerState, Theme>;
  };
  JoyStep?: {
    defaultProps?: Partial<StepProps>;
    styleOverrides?: StyleOverrides<StepSlot, StepOwnerState, Theme>;
  };
  JoyStepButton?: {
    defaultProps?: Partial<StepButtonProps>;
    styleOverrides?: StyleOverrides<StepButtonSlot, StepButtonOwnerState, Theme>;
  };
  JoyStepIndicator?: {
    defaultProps?: Partial<StepIndicatorProps>;
    styleOverrides?: StyleOverrides<StepIndicatorSlot, StepIndicatorOwnerState, Theme>;
  };
  JoySwitch?: {
    defaultProps?: Partial<SwitchProps>;
    styleOverrides?: StyleOverrides<SwitchSlot, SwitchOwnerState, Theme>;
  };
  // Temporary for Material UI icons usage
  MuiSvgIcon?: {
    defaultProps?: Partial<SvgIconProps>;
    styleOverrides?: StyleOverrides<SvgIconSlot, SvgIconOwnerState, Theme>;
  };
  JoySvgIcon?: {
    defaultProps?: Partial<SvgIconProps>;
    styleOverrides?: StyleOverrides<SvgIconSlot, SvgIconOwnerState, Theme>;
  };
  JoySlider?: {
    defaultProps?: Partial<SliderProps>;
    styleOverrides?: StyleOverrides<SliderSlot, SliderOwnerState, Theme>;
  };
  JoySnackbar?: {
    defaultProps?: Partial<SnackbarProps>;
    styleOverrides?: StyleOverrides<SnackbarSlot, SnackbarOwnerState, Theme>;
  };
  JoyTabs?: {
    defaultProps?: Partial<TabsProps>;
    styleOverrides?: StyleOverrides<TabsSlot, TabsOwnerState, Theme>;
  };
  JoyTable?: {
    defaultProps?: Partial<TableProps>;
    styleOverrides?: StyleOverrides<TableSlot, TableOwnerState, Theme>;
  };
  JoyTabList?: {
    defaultProps?: Partial<TabListProps>;
    styleOverrides?: StyleOverrides<TabListSlot, TabListOwnerState, Theme>;
  };
  JoyTab?: {
    defaultProps?: Partial<TabProps>;
    styleOverrides?: StyleOverrides<TabSlot, TabOwnerState, Theme>;
  };
  JoyTabPanel?: {
    defaultProps?: Partial<TabPanelProps>;
    styleOverrides?: StyleOverrides<TabPanelSlot, TabPanelOwnerState, Theme>;
  };
  JoyTextarea?: {
    defaultProps?: Partial<TextareaProps>;
    styleOverrides?: StyleOverrides<TextareaSlot, TextareaOwnerState, Theme>;
  };
  JoyToggleButtonGroup?: {
    defaultProps?: Partial<ToggleButtonGroupProps>;
    styleOverrides?: StyleOverrides<ToggleButtonGroupSlot, ToggleButtonGroupOwnerState, Theme>;
  };
  JoyTooltip?: {
    defaultProps?: Partial<TooltipProps>;
    styleOverrides?: StyleOverrides<TooltipSlot, TooltipOwnerState, Theme>;
  };
  JoyTypography?: {
    defaultProps?: Partial<TypographyProps>;
    styleOverrides?: StyleOverrides<TypographySlot, TypographyOwnerState, Theme>;
  };
  JoyMenu?: {
    defaultProps?: Partial<MenuProps>;
    styleOverrides?: StyleOverrides<MenuSlot, MenuOwnerState, Theme>;
  };
  JoyMenuButton?: {
    defaultProps?: Partial<MenuButtonProps>;
    styleOverrides?: StyleOverrides<MenuButtonSlot, MenuButtonOwnerState, Theme>;
  };
  JoyMenuList?: {
    defaultProps?: Partial<MenuListProps>;
    styleOverrides?: StyleOverrides<MenuListSlot, MenuListOwnerState, Theme>;
  };
  JoyMenuItem?: {
    defaultProps?: Partial<MenuItemProps>;
    styleOverrides?: StyleOverrides<MenuItemSlot, MenuItemOwnerState, Theme>;
  };
  JoyModal?: {
    defaultProps?: Partial<ModalProps>;
    styleOverrides?: StyleOverrides<ModalSlot, ModalOwnerState, Theme>;
  };
  JoyModalClose?: {
    defaultProps?: Partial<ModalCloseProps>;
    styleOverrides?: StyleOverrides<ModalCloseSlot, ModalCloseOwnerState, Theme>;
  };
  JoyModalDialog?: {
    defaultProps?: Partial<ModalDialogProps>;
    styleOverrides?: StyleOverrides<ModalDialogSlot, ModalDialogOwnerState, Theme>;
  };
  JoyModalOverflow?: {
    defaultProps?: Partial<ModalOverflowProps>;
    styleOverrides?: StyleOverrides<ModalOverflowSlot, ModalOverflowOwnerState, Theme>;
  };
}
