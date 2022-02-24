import { CSSInterpolation } from '@mui/system';
import { GlobalStateSlot } from '@mui/base';
import { ButtonProps, ButtonSlot } from '../Button/ButtonProps';
import { SwitchProps, SwitchSlot } from '../Switch/SwitchProps';
import { TypographyProps, TypographySlot } from '../Typography/TypographyProps';
import { SvgIconProps, SvgIconSlot } from '../SvgIcon/SvgIconProps';
import { ListProps, ListSlot } from '../List/ListProps';
import { ListDividerProps, ListDividerSlot } from '../ListDivider/ListDividerProps';
import { ListItemProps, ListItemSlot } from '../ListItem/ListItemProps';
import { ListItemContentProps, ListItemContentSlot } from '../ListItemContent/ListItemContentProps';
import { ListItemButtonProps, ListItemButtonSlot } from '../ListItemButton/ListItemButtonProps';
import {
  ListItemDecoratorProps,
  ListItemDecoratorSlot,
} from '../ListItemDecorator/ListItemDecoratorProps';
import { NestedListProps, NestedListSlot } from '../NestedList/NestedListProps';
import { NestedListItemProps, NestedListItemSlot } from '../NestedListItem/NestedListItemProps';
import { InputProps, InputSlot } from '../Input/InputProps';

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
  MuiButton?: {
    defaultProps?: Partial<ButtonProps>;
    styleOverrides?: OverridesStyleRules<ButtonSlot, ButtonProps, Theme>;
  };
  MuiSwitch?: {
    defaultProps?: Partial<SwitchProps>;
    styleOverrides?: OverridesStyleRules<SwitchSlot, SwitchProps, Theme>;
  };
  MuiTypography?: {
    defaultProps?: Partial<TypographyProps>;
    styleOverrides?: OverridesStyleRules<TypographySlot, TypographyProps, Theme>;
  };
  MuiSvgIcon?: {
    defaultProps?: Partial<SvgIconProps>;
    styleOverrides?: OverridesStyleRules<SvgIconSlot, SvgIconProps, Theme>;
  };
  MuiList?: {
    defaultProps: Partial<ListProps>;
    styleOverrides?: OverridesStyleRules<ListSlot, ListProps, Theme>;
  };
  MuiListDivider?: {
    defaultProps: Partial<ListDividerProps>;
    styleOverrides?: OverridesStyleRules<ListDividerSlot, ListDividerProps, Theme>;
  };
  MuiListItem?: {
    defaultProps: Partial<ListItemProps>;
    styleOverrides?: OverridesStyleRules<ListItemSlot, ListItemProps, Theme>;
  };
  MuiListItemContent?: {
    defaultProps: Partial<ListItemContentProps>;
    styleOverrides?: OverridesStyleRules<ListItemContentSlot, ListItemContentProps, Theme>;
  };
  MuiListItemDecorator?: {
    defaultProps: Partial<ListItemDecoratorProps>;
    styleOverrides?: OverridesStyleRules<ListItemDecoratorSlot, ListItemDecoratorProps, Theme>;
  };
  MuiListItemButton?: {
    defaultProps: Partial<ListItemButtonProps>;
    styleOverrides?: OverridesStyleRules<ListItemButtonSlot, ListItemButtonProps, Theme>;
  };
  MuiNestedList?: {
    defaultProps: Partial<NestedListProps>;
    styleOverrides?: OverridesStyleRules<NestedListSlot, NestedListProps, Theme>;
  };
  MuiNestedListItem?: {
    defaultProps: Partial<NestedListItemProps>;
    styleOverrides?: OverridesStyleRules<NestedListItemSlot, NestedListItemProps, Theme>;
  };
  MuiInput?: {
    defaultProps?: Partial<InputProps>;
    styleOverrides?: OverridesStyleRules<InputSlot, InputProps, Theme>;
  };
}
