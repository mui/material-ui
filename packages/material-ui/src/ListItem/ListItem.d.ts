import * as React from 'react';
import { ExtendButtonBase } from '../ButtonBase';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ListItemTypeMap<P, D extends React.ElementType> {
  props: P & {
    /**
     * Defines the `align-items` style property.
     * @default 'center'
     */
    alignItems?: 'flex-start' | 'center';
    /**
     * If `true`, the list item will be focused during the first mount.
     * Focus will also be triggered if the value changes from false to true.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * The content of the component. If a `ListItemSecondaryAction` is used it must
     * be the last child.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the (normally root) `component` element. May be wrapped by a `container`. */
      root?: string;
      /** Styles applied to the `container` element if `children` includes `ListItemSecondaryAction`. */
      container?: string;
      /** Pseudo-class applied to the `component`'s `focusVisibleClassName` prop if `button={true}`. */
      focusVisible?: string;
      /** Styles applied to the `component` element if dense. */
      dense?: string;
      /** Styles applied to the `component` element if `alignItems="flex-start"`. */
      alignItemsFlexStart?: string;
      /** Pseudo-class applied to the inner `component` element if `disabled={true}`. */
      disabled?: string;
      /** Styles applied to the inner `component` element if `divider={true}`. */
      divider?: string;
      /** Styles applied to the inner `component` element if `disableGutters={false}`. */
      gutters?: string;
      /** Styles applied to the inner `component` element if `button={true}`. */
      button?: string;
      /** Styles applied to the `component` element if `children` includes `ListItemSecondaryAction`. */
      secondaryAction?: string;
      /** Pseudo-class applied to the root element if `selected={true}`. */
      selected?: string;
    };
    /**
     * The container component used when a `ListItemSecondaryAction` is the last child.
     * @default 'li'
     */
    ContainerComponent?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Props applied to the container component if used.
     * @default {}
     */
    ContainerProps?: React.HTMLAttributes<HTMLDivElement>;
    /**
     * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
     * The prop defaults to the value inherited from the parent List component.
     * @default false
     */
    dense?: boolean;
    /**
     * If `true`, the list item will be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, the left and right padding is removed.
     * @default false
     */
    disableGutters?: boolean;
    /**
     * If `true`, a 1px light border is added to the bottom of the list item.
     * @default false
     */
    divider?: boolean;
    /**
     * Use to apply selected styling.
     * @default false
     */
    selected?: boolean;
  };
  defaultComponent: D;
}

/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 *
 * - [ListItem API](https://material-ui.com/api/list-item/)
 */
declare const ListItem: OverridableComponent<
  ListItemTypeMap<
    {
      /**
       * If `true`, the list item will be a button (using `ButtonBase`). Props intended
       * for `ButtonBase` can then be applied to `ListItem`.
       * @default false
       */
      button?: false;
    },
    'li'
  >
> &
  ExtendButtonBase<
    ListItemTypeMap<
      {
        /**
         * If `true`, the list item will be a button (using `ButtonBase`). Props intended
         * for `ButtonBase` can then be applied to `ListItem`.
         * @default false
         */
        button: true;
      },
      'div'
    >
  >;

export type ListItemClassKey = keyof NonNullable<ListItemProps['classes']>;

export type ListItemProps<D extends React.ElementType = 'li', P = {}> = OverrideProps<
  ListItemTypeMap<P, D>,
  D
>;

export default ListItem;
