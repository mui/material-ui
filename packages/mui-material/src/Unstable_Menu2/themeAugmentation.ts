import type { ComponentsProps, ComponentsOverrides, ComponentsVariants } from '../styles';
import type { Menu2Props } from './Menu2';
import type {
  Menu2CheckboxItemProps,
  Menu2CheckboxItemClassKey,
} from '../Unstable_Menu2CheckboxItem';
import type { Menu2GroupProps, Menu2GroupClassKey } from '../Unstable_Menu2Group';
import type { Menu2GroupLabelProps, Menu2GroupLabelClassKey } from '../Unstable_Menu2GroupLabel';
import type { Menu2ItemProps, Menu2ItemClassKey } from '../Unstable_Menu2Item';
import type { Menu2LinkItemProps, Menu2LinkItemClassKey } from '../Unstable_Menu2LinkItem';
import type { Menu2RadioGroupProps, Menu2RadioGroupClassKey } from '../Unstable_Menu2RadioGroup';
import type { Menu2RadioItemProps, Menu2RadioItemClassKey } from '../Unstable_Menu2RadioItem';
import type { Menu2SeparatorProps, Menu2SeparatorClassKey } from '../Unstable_Menu2Separator';
import type { Menu2SubmenuProps } from '../Unstable_Menu2Submenu';
import type {
  Menu2SubmenuTriggerProps,
  Menu2SubmenuTriggerClassKey,
} from '../Unstable_Menu2SubmenuTrigger';
import type { Menu2ClassKey, Menu2SubmenuClassKey } from './menu2Classes';

// Import this module explicitly to add Menu2 theme types without changing
// the TypeScript requirement for classic Material UI components.
declare module '@mui/material/styles' {
  interface ComponentsPropsList {
    MuiMenu2: Menu2Props;
    MuiMenu2CheckboxItem: Menu2CheckboxItemProps;
    MuiMenu2Group: Menu2GroupProps;
    MuiMenu2GroupLabel: Menu2GroupLabelProps;
    MuiMenu2Item: Menu2ItemProps;
    MuiMenu2LinkItem: Menu2LinkItemProps;
    MuiMenu2RadioGroup: Menu2RadioGroupProps;
    MuiMenu2RadioItem: Menu2RadioItemProps;
    MuiMenu2Separator: Menu2SeparatorProps;
    MuiMenu2Submenu: Menu2SubmenuProps;
    MuiMenu2SubmenuTrigger: Menu2SubmenuTriggerProps;
  }

  interface ComponentNameToClassKey {
    MuiMenu2: Menu2ClassKey;
    MuiMenu2Submenu: Menu2SubmenuClassKey;
    MuiMenu2SubmenuTrigger: Exclude<Menu2SubmenuTriggerClassKey, 'highlighted'>;
    MuiMenu2CheckboxItem: Exclude<Menu2CheckboxItemClassKey, 'highlighted'>;
    MuiMenu2Group: Menu2GroupClassKey;
    MuiMenu2GroupLabel: Menu2GroupLabelClassKey;
    MuiMenu2Item: Exclude<Menu2ItemClassKey, 'highlighted'>;
    MuiMenu2LinkItem: Exclude<Menu2LinkItemClassKey, 'highlighted'>;
    MuiMenu2RadioGroup: Menu2RadioGroupClassKey;
    MuiMenu2RadioItem: Exclude<Menu2RadioItemClassKey, 'highlighted'>;
    MuiMenu2Separator: Menu2SeparatorClassKey;
  }

  interface Components<Theme = unknown> {
    MuiMenu2?:
      | {
          defaultProps?: ComponentsProps['MuiMenu2'] | undefined;
          styleOverrides?: ComponentsOverrides<Theme>['MuiMenu2'] | undefined;
          variants?: ComponentsVariants<Theme>['MuiMenu2'] | undefined;
        }
      | undefined;
    MuiMenu2CheckboxItem?:
      | {
          defaultProps?: ComponentsProps['MuiMenu2CheckboxItem'] | undefined;
          styleOverrides?: ComponentsOverrides<Theme>['MuiMenu2CheckboxItem'] | undefined;
          variants?: ComponentsVariants<Theme>['MuiMenu2CheckboxItem'] | undefined;
        }
      | undefined;
    MuiMenu2Group?:
      | {
          defaultProps?: ComponentsProps['MuiMenu2Group'] | undefined;
          styleOverrides?: ComponentsOverrides<Theme>['MuiMenu2Group'] | undefined;
          variants?: ComponentsVariants<Theme>['MuiMenu2Group'] | undefined;
        }
      | undefined;
    MuiMenu2GroupLabel?:
      | {
          defaultProps?: ComponentsProps['MuiMenu2GroupLabel'] | undefined;
          styleOverrides?: ComponentsOverrides<Theme>['MuiMenu2GroupLabel'] | undefined;
          variants?: ComponentsVariants<Theme>['MuiMenu2GroupLabel'] | undefined;
        }
      | undefined;
    MuiMenu2Item?:
      | {
          defaultProps?: ComponentsProps['MuiMenu2Item'] | undefined;
          styleOverrides?: ComponentsOverrides<Theme>['MuiMenu2Item'] | undefined;
          variants?: ComponentsVariants<Theme>['MuiMenu2Item'] | undefined;
        }
      | undefined;
    MuiMenu2LinkItem?:
      | {
          defaultProps?: ComponentsProps['MuiMenu2LinkItem'] | undefined;
          styleOverrides?: ComponentsOverrides<Theme>['MuiMenu2LinkItem'] | undefined;
          variants?: ComponentsVariants<Theme>['MuiMenu2LinkItem'] | undefined;
        }
      | undefined;
    MuiMenu2RadioGroup?:
      | {
          defaultProps?: ComponentsProps['MuiMenu2RadioGroup'] | undefined;
          styleOverrides?: ComponentsOverrides<Theme>['MuiMenu2RadioGroup'] | undefined;
          variants?: ComponentsVariants<Theme>['MuiMenu2RadioGroup'] | undefined;
        }
      | undefined;
    MuiMenu2RadioItem?:
      | {
          defaultProps?: ComponentsProps['MuiMenu2RadioItem'] | undefined;
          styleOverrides?: ComponentsOverrides<Theme>['MuiMenu2RadioItem'] | undefined;
          variants?: ComponentsVariants<Theme>['MuiMenu2RadioItem'] | undefined;
        }
      | undefined;
    MuiMenu2Separator?:
      | {
          defaultProps?: ComponentsProps['MuiMenu2Separator'] | undefined;
          styleOverrides?: ComponentsOverrides<Theme>['MuiMenu2Separator'] | undefined;
          variants?: ComponentsVariants<Theme>['MuiMenu2Separator'] | undefined;
        }
      | undefined;
    MuiMenu2Submenu?:
      | {
          defaultProps?: ComponentsProps['MuiMenu2Submenu'] | undefined;
          styleOverrides?: ComponentsOverrides<Theme>['MuiMenu2Submenu'] | undefined;
          variants?: ComponentsVariants<Theme>['MuiMenu2Submenu'] | undefined;
        }
      | undefined;
    MuiMenu2SubmenuTrigger?:
      | {
          defaultProps?: ComponentsProps['MuiMenu2SubmenuTrigger'] | undefined;
          styleOverrides?: ComponentsOverrides<Theme>['MuiMenu2SubmenuTrigger'] | undefined;
          variants?: ComponentsVariants<Theme>['MuiMenu2SubmenuTrigger'] | undefined;
        }
      | undefined;
  }
}
