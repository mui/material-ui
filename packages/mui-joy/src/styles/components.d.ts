import { GlobalStateSlot } from '@mui/base';
import { CSSInterpolation } from '@mui/system';
import { AspectRatioProps, AspectRatioSlot } from '../AspectRatio/AspectRatioProps';
import { AvatarProps, AvatarSlot } from '../Avatar/AvatarProps';
import { AvatarGroupProps, AvatarGroupSlot } from '../AvatarGroup/AvatarGroupProps';
import { BadgeProps, BadgeSlot } from '../Badge/BadgeProps';
import { BoxProps, BoxSlot } from '../Box/BoxProps';
import { BreadcrumbsProps, BreadcrumbsSlot } from '../Breadcrumbs/BreadcrumbsProps';
import { ButtonProps, ButtonSlot } from '../Button/ButtonProps';
import { CardProps, CardSlot } from '../Card/CardProps';
import { CardContentProps, CardContentSlot } from '../CardContent/CardContentProps';
import { CardCoverProps, CardCoverSlot } from '../CardCover/CardCoverProps';
import { CardOverflowProps, CardOverflowSlot } from '../CardOverflow/CardOverflowProps';
import { CheckboxProps, CheckboxSlot } from '../Checkbox/CheckboxProps';
import { ChipProps, ChipSlot } from '../Chip/ChipProps';
import { ChipDeleteProps, ChipDeleteSlot } from '../ChipDelete/ChipDeleteProps';
import { ContainerProps, ContainerSlot } from '../Container/ContainerProps';
import { FormHelperTextProps, FormHelperTextSlot } from '../FormHelperText/FormHelperTextProps';
import { FormLabelProps, FormLabelSlot } from '../FormLabel/FormLabelProps';
import { GridProps, GridSlot } from '../Grid/GridProps';
import { IconButtonProps, IconButtonSlot } from '../IconButton/IconButtonProps';
import { InputProps, InputSlot } from '../Input/InputProps';
import { LinkProps, LinkSlot } from '../Link/LinkProps';
import { ListProps, ListSlot } from '../List/ListProps';
import { ListDividerProps, ListDividerSlot } from '../ListDivider/ListDividerProps';
import { ListItemProps, ListItemSlot } from '../ListItem/ListItemProps';
import { ListItemButtonProps, ListItemButtonSlot } from '../ListItemButton/ListItemButtonProps';
import { ListItemContentProps, ListItemContentSlot } from '../ListItemContent/ListItemContentProps';
import {
  ListItemDecoratorProps,
  ListItemDecoratorSlot,
} from '../ListItemDecorator/ListItemDecoratorProps';
import { MenuProps, MenuSlot } from '../Menu/MenuProps';
import { MenuItemProps, MenuItemSlot } from '../MenuItem/MenuItemProps';
import { MenuListProps, MenuListSlot } from '../MenuList/MenuListProps';
import { RadioProps, RadioSlot } from '../Radio/RadioProps';
import { RadioGroupProps, RadioGroupSlot } from '../RadioGroup/RadioGroupProps';
import { SheetProps, SheetSlot } from '../Sheet/SheetProps';
import { SliderProps, SliderSlot } from '../Slider/SliderProps';
import { SvgIconProps, SvgIconSlot } from '../SvgIcon/SvgIconProps';
import { SwitchProps, SwitchSlot } from '../Switch/SwitchProps';
import { TabOwnerState, TabProps, TabSlot } from '../Tab/TabProps';
import { TabListOwnerState, TabListProps, TabListSlot } from '../TabList/TabListProps';
import { TabPanelOwnerState, TabPanelProps, TabPanelSlot } from '../TabPanel/TabPanelProps';
import { TabsOwnerState, TabsProps, TabsSlot } from '../Tabs/TabsProps';
import { TextFieldProps, TextFieldSlot } from '../TextField/TextFieldProps';
import { TypographyProps, TypographySlot } from '../Typography/TypographyProps';

export type OverridesStyleRules<
  ClassKey extends string = string,
  ComponentProps = Record<string, unknown>,
  Theme = unknown,
> = Partial<
  Record<
    Exclude<ClassKey, GlobalStateSlot>,
    | CSSInterpolation
    | ((
        // Record<string, unknown> is for other props that the slot receive internally
        // Documenting all ownerStates could be a huge work, let's wait until we have a real needs from developers.
        props: {
          ownerState: ComponentProps & Record<string, unknown>;
          theme: Theme;
        } & Record<string, unknown>,
      ) => CSSInterpolation)
  >
>;
export interface Components<Theme = unknown> {
  // alphabetical order
  JoyAspectRatio?: {
    defaultProps?: Partial<AspectRatioProps>;
    styleOverrides?: OverridesStyleRules<AspectRatioSlot, AspectRatioProps, Theme>;
  };
  JoyAvatar?: {
    defaultProps?: Partial<AvatarProps>;
    styleOverrides?: OverridesStyleRules<AvatarSlot, AvatarProps, Theme>;
  };
  JoyAvatarGroup?: {
    defaultProps?: Partial<AvatarGroupProps>;
    styleOverrides?: OverridesStyleRules<AvatarGroupSlot, AvatarGroupProps, Theme>;
  };
  JoyBadge?: {
    defaultProps?: Partial<BadgeProps>;
    styleOverrides?: OverridesStyleRules<BadgeSlot, BadgeProps, Theme>;
  };
  JoyBox?: {
    defaultProps?: Partial<BoxProps>;
    styleOverrides?: OverridesStyleRules<BoxSlot, BoxProps, Theme>;
  };
  JoyButton?: {
    defaultProps?: Partial<ButtonProps>;
    styleOverrides?: OverridesStyleRules<ButtonSlot, ButtonProps, Theme>;
  };
  JoyCard?: {
    defaultProps?: Partial<CardProps>;
    styleOverrides?: OverridesStyleRules<CardSlot, CardProps, Theme>;
  };
  JoyCardContent?: {
    defaultProps?: Partial<CardContentProps>;
    styleOverrides?: OverridesStyleRules<CardContentSlot, CardContentProps, Theme>;
  };
  JoyCardCover?: {
    defaultProps?: Partial<CardCoverProps>;
    styleOverrides?: OverridesStyleRules<CardCoverSlot, CardCoverProps, Theme>;
  };
  JoyCardOverflow?: {
    defaultProps?: Partial<CardOverflowProps>;
    styleOverrides?: OverridesStyleRules<CardOverflowSlot, CardOverflowProps, Theme>;
  };
  JoyCheckbox?: {
    defaultProps?: Partial<CheckboxProps>;
    styleOverrides?: OverridesStyleRules<CheckboxSlot, CheckboxProps, Theme>;
  };
  JoyChip?: {
    defaultProps?: Partial<ChipProps>;
    styleOverrides?: OverridesStyleRules<ChipSlot, ChipProps, Theme>;
  };
  JoyChipDelete?: {
    defaultProps?: Partial<ChipDeleteProps>;
    styleOverrides?: OverridesStyleRules<ChipDeleteSlot, ChipDeleteProps, Theme>;
  };
  JoyContainer?: {
    defaultProps?: Partial<ContainerProps>;
    styleOverrides?: OverridesStyleRules<ContainerSlot, ContainerProps, Theme>;
  };
  JoyFormHelperText?: {
    defaultProps?: Partial<FormHelperTextProps>;
    styleOverrides?: OverridesStyleRules<FormHelperTextSlot, FormHelperTextProps, Theme>;
  };
  JoyFormLabel?: {
    defaultProps?: Partial<FormLabelProps>;
    styleOverrides?: OverridesStyleRules<FormLabelSlot, FormLabelProps, Theme>;
  };
  JoyGrid?: {
    defaultProps?: Partial<GridProps>;
    styleOverrides?: OverridesStyleRules<GridSlot, GridProps, Theme>;
  };
  JoyIconButton?: {
    defaultProps?: Partial<IconButtonProps>;
    styleOverrides?: OverridesStyleRules<IconButtonSlot, IconButtonProps, Theme>;
  };
  JoyInput?: {
    defaultProps?: Partial<InputProps>;
    styleOverrides?: OverridesStyleRules<InputSlot, InputProps, Theme>;
  };
  JoyLink?: {
    defaultProps?: Partial<LinkProps>;
    styleOverrides?: OverridesStyleRules<LinkSlot, LinkProps, Theme>;
  };
  JoyList?: {
    defaultProps: Partial<ListProps>;
    styleOverrides?: OverridesStyleRules<ListSlot, ListProps, Theme>;
  };
  JoyListDivider?: {
    defaultProps: Partial<ListDividerProps>;
    styleOverrides?: OverridesStyleRules<ListDividerSlot, ListDividerProps, Theme>;
  };
  JoyListItem?: {
    defaultProps: Partial<ListItemProps>;
    styleOverrides?: OverridesStyleRules<ListItemSlot, ListItemProps, Theme>;
  };
  JoyListItemButton?: {
    defaultProps: Partial<ListItemButtonProps>;
    styleOverrides?: OverridesStyleRules<ListItemButtonSlot, ListItemButtonProps, Theme>;
  };
  JoyListItemContent?: {
    defaultProps: Partial<ListItemContentProps>;
    styleOverrides?: OverridesStyleRules<ListItemContentSlot, ListItemContentProps, Theme>;
  };
  JoyListItemDecorator?: {
    defaultProps: Partial<ListItemDecoratorProps>;
    styleOverrides?: OverridesStyleRules<ListItemDecoratorSlot, ListItemDecoratorProps, Theme>;
  };
  JoyRadio?: {
    defaultProps?: Partial<RadioProps>;
    styleOverrides?: OverridesStyleRules<RadioSlot, RadioProps, Theme>;
  };
  JoyRadioGroup?: {
    defaultProps?: Partial<RadioGroupProps>;
    styleOverrides?: OverridesStyleRules<RadioGroupSlot, RadioGroupProps, Theme>;
  };
  JoySheet?: {
    defaultProps?: Partial<SheetProps>;
    styleOverrides?: OverridesStyleRules<SheetSlot, SheetProps, Theme>;
  };
  JoySwitch?: {
    defaultProps?: Partial<SwitchProps>;
    styleOverrides?: OverridesStyleRules<SwitchSlot, SwitchProps, Theme>;
  };
  MuiLink?: {
    defaultProps?: Partial<LinkProps>;
    styleOverrides?: OverridesStyleRules<LinkSlot, LinkProps, Theme>;
  };
  MuiBreadcrumbs?: {
    defaultProps?: Partial<BreadcrumbsProps>;
    styleOverrides?: OverridesStyleRules<BreadcrumbsSlot, BreadcrumbsProps, Theme>;
  };
  MuiCheckbox?: {
    defaultProps?: Partial<CheckboxProps>;
    styleOverrides?: OverridesStyleRules<CheckboxSlot, CheckboxProps, Theme>;
  };
  MuiChip?: {
    defaultProps?: Partial<ChipProps>;
    styleOverrides?: OverridesStyleRules<ChipSlot, ChipProps, Theme>;
  };
  MuiChipDelete?: {
    defaultProps?: Partial<ChipDeleteProps>;
    styleOverrides?: OverridesStyleRules<ChipDeleteSlot, ChipDeleteProps, Theme>;
  };
  // Temporary for Material UI icons usage
  MuiSvgIcon?: {
    defaultProps?: Partial<SvgIconProps>;
    styleOverrides?: OverridesStyleRules<SvgIconSlot, SvgIconProps, Theme>;
  };
  JoySvgIcon?: {
    defaultProps?: Partial<SvgIconProps>;
    styleOverrides?: OverridesStyleRules<SvgIconSlot, SvgIconProps, Theme>;
  };
  JoySlider?: {
    defaultProps?: Partial<SliderProps>;
    styleOverrides?: OverridesStyleRules<SliderSlot, SliderProps, Theme>;
  };
  JoyTabs?: {
    defaultProps?: Partial<TabsProps>;
    styleOverrides?: OverridesStyleRules<TabsSlot, TabsOwnerState, Theme>;
  };
  JoyTabList?: {
    defaultProps?: Partial<TabListProps>;
    styleOverrides?: OverridesStyleRules<TabListSlot, TabListOwnerState, Theme>;
  };
  JoyTab?: {
    defaultProps?: Partial<TabProps>;
    styleOverrides?: OverridesStyleRules<TabSlot, TabOwnerState, Theme>;
  };
  JoyTabPanel?: {
    defaultProps?: Partial<TabPanelProps>;
    styleOverrides?: OverridesStyleRules<TabPanelSlot, TabPanelOwnerState, Theme>;
  };
  JoyTextField?: {
    defaultProps?: Partial<TextFieldProps>;
    styleOverrides?: OverridesStyleRules<TextFieldSlot, TextFieldProps, Theme>;
  };
  JoyTypography?: {
    defaultProps?: Partial<TypographyProps>;
    styleOverrides?: OverridesStyleRules<TypographySlot, TypographyProps, Theme>;
  };
  JoyMenu?: {
    defaultProps?: Partial<MenuProps>;
    styleOverrides?: OverridesStyleRules<MenuSlot, MenuProps, Theme>;
  };
  JoyMenuList?: {
    defaultProps?: Partial<MenuListProps>;
    styleOverrides?: OverridesStyleRules<MenuListSlot, MenuListProps, Theme>;
  };
  JoyMenuItem?: {
    defaultProps?: Partial<MenuItemProps>;
    styleOverrides?: OverridesStyleRules<MenuItemSlot, MenuItemProps, Theme>;
  };
}
