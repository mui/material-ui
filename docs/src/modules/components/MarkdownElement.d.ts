import React from 'react';
import { StandardProps } from '@material-ui/core';

export type MarkdownElementClassKey = 'root';

export interface MarkdownElementProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    MarkdownElementClassKey,
    never,
    false
  > {
  dispatch?: () => void;
  text?: string;
  userLanguage?: string;
}

declare const MarkdownElement: React.ComponentType<MarkdownElementProps>;

export default MarkdownElement;
