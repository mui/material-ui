import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '@material-ui/core/styles';
import { ButtonBaseProps } from '../ButtonBase';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ListItemButtonClasses } from './listItemButtonClasses';

interface ListItemButtonBaseProps {
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems?: 'flex-start' | 'center';
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Pass a ref to the `button` element.
   */
  buttonBaseRef?: React.Ref<any>;
  /**
   * These props will be forwarded to the ButtonBase
   * @default {}
   */
  ButtonBaseProps?: Partial<ButtonBaseProps & { component: React.ElementType; href: string }>;
  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemButtonClasses>;
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense?: boolean;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * This prop can help identify which element has keyboard focus. The class name will be applied when the element gains the focus through keyboard interaction. It&#39;s a polyfill for the <a href=\"https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo\">CSS :focus-visible selector</a>. The rationale for using this feature <a href=\"https://github.com/WICG/focus-visible/blob/master/explainer.md\">is explained here</a>. A <a href=\"https://github.com/WICG/focus-visible\">polyfill can be used</a> to apply a <code>focus-visible</code> class to other components if needed.
   */
  focusVisibleClassName?: string;
  /**
   * A function to be called when user click the Button
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
  /**
   * The secondary action component.
   */
  secondaryAction?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface ListItemButtonTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & ListItemButtonBaseProps;
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemButton API](https://material-ui.com/api/list-item-button/)
 */
declare const ListItemButton: OverridableComponent<ListItemButtonTypeMap>;

export type ListItemButtonProps<
  D extends React.ElementType = ListItemButtonTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ListItemButtonTypeMap<P, D>, D>;

export default ListItemButton;
