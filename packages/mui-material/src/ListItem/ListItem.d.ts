import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ListItemClasses } from './listItemClasses';

export interface ListItemComponentsPropsOverrides {}

/**
 * This type is kept for compatibility. Use `ListItemOwnProps` instead.
 */
export interface ListItemBaseProps {
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems?: 'flex-start' | 'center';
  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemClasses>;
  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   * @default 'li'
   * @deprecated Use the `component` or `slots.root` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  ContainerComponent?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  /**
   * Props applied to the container component if used.
   * @default {}
   * @deprecated Use the `slotProps.root` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  ContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense?: boolean;
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters?: boolean;
  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding?: boolean;
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider?: boolean;
  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface ListItemOwnProps extends ListItemBaseProps {
  /**
   * The components used for each slot inside.
   *
   * @deprecated Use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated Use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  componentsProps?: {
    root?: React.HTMLAttributes<HTMLDivElement> & ListItemComponentsPropsOverrides;
  };
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps?: {
    root?: React.HTMLAttributes<HTMLDivElement> & ListItemComponentsPropsOverrides;
  };
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots?: {
    root?: React.ElementType;
  };
}

export interface ListItemTypeMap<AdditionalProps, RootComponent extends React.ElementType> {
  props: AdditionalProps & ListItemOwnProps;
  defaultComponent: RootComponent;
}

/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 *
 * Demos:
 *
 * - [Lists](https://v6.mui.com/material-ui/react-list/)
 * - [Transfer List](https://v6.mui.com/material-ui/react-transfer-list/)
 *
 * API:
 *
 * - [ListItem API](https://v6.mui.com/material-ui/api/list-item/)
 */
declare const ListItem: OverridableComponent<ListItemTypeMap<{}, 'li'>>;

export type ListItemProps<
  RootComponent extends React.ElementType = 'li',
  AdditionalProps = {},
> = OverrideProps<ListItemTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default ListItem;
