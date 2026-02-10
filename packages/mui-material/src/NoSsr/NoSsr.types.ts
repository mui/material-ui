import * as React from 'react';

export interface NoSsrProps {
  /**
   * You can wrap a node.
   */
  children?: React.ReactNode;
  /**
   * If `true`, the component will not only prevent server-side rendering.
   * It will also defer the rendering of the children into a different screen frame.
   * @default false
   */
  defer?: boolean;
  /**
   * The fallback content to display.
   * @default null
   */
  fallback?: React.ReactNode;
}
