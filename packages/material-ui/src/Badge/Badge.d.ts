import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface BadgeProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, BadgeClassKey> {
  /**
   * The content rendered within the badge.
   */
  badgeContent?: React.ReactNode;
  /**
   * The badge will be added relative to this node.
   */
  children: React.ReactNode;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'primary' | 'secondary' | 'default' | 'error';
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  /**
   * If `true`, the badge will be invisible.
   */
  invisible?: boolean;
  /**
   * Max count to show.
   */
  max?: number;
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   */
  showZero?: boolean;
  /**
   * The variant to use.
   */
  variant?: 'standard' | 'dot';
}

export type BadgeClassKey =
  | 'root'
  | 'badge'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorError'
  | 'invisible'
  | 'dot';

export default function Badge(props: BadgeProps): JSX.Element | null;
