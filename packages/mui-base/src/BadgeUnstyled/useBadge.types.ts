import * as React from 'react';

export interface UseBadgeReturnValue {
  /**
   * Defines the content that's displayed inside the badge.
   * @default false
   */
  badgeContent: React.ReactNode;
  /**
   * If `true`, the component will not be be visible.
   * @default false
   */
  invisible: boolean;
  /**
   * Maximum number to be displayed in the badge.
   * @default 99
   */
  max: number;
  /**
   * Value to be displayed in the badge. If badgeContent is greater that `max` it will return `max+`.
   * @default badgeContent
   */
  displayValue: React.ReactNode;
}
