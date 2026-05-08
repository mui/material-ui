import * as React from 'react';
import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import { Menu } from '@base-ui/react/menu';
import { SxProps, Theme } from '@mui/material/styles';

export interface MenuBarProps extends React.ComponentProps<typeof BaseMenubar> {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface MenuBarTriggerProps extends React.ComponentProps<typeof Menu.Trigger> {
  sx?: SxProps<Theme> | undefined;
}

export interface MenuBarPopupProps extends React.ComponentProps<typeof Menu.Popup> {
  sx?: SxProps<Theme> | undefined;
}

export interface MenuBarItemProps extends React.ComponentProps<typeof Menu.Item> {
  sx?: SxProps<Theme> | undefined;
  icon?: React.ReactNode;
  secondary?: React.ReactNode;
  hint?: React.ReactNode;
}

export interface MenuBarSubmenuTriggerProps
  extends React.ComponentProps<typeof Menu.SubmenuTrigger> {
  sx?: SxProps<Theme> | undefined;
  icon?: React.ReactNode;
  hint?: React.ReactNode;
}

export interface MenuBarSeparatorProps extends React.ComponentProps<typeof Menu.Separator> {
  sx?: SxProps<Theme> | undefined;
}

export interface MenuBarCheckboxItemProps extends React.ComponentProps<typeof Menu.CheckboxItem> {
  sx?: SxProps<Theme> | undefined;
  hint?: React.ReactNode;
}

export interface MenuBarRadioItemProps extends React.ComponentProps<typeof Menu.RadioItem> {
  sx?: SxProps<Theme> | undefined;
  hint?: React.ReactNode;
}

export interface MenuBarGroupLabelProps extends React.ComponentProps<typeof Menu.GroupLabel> {
  sx?: SxProps<Theme> | undefined;
}
