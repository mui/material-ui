import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { TypographyProps } from '../Typography';

export interface LinkProps
  extends StandardProps<
    React.HTMLAttributes<HTMLAnchorElement> & TypographyProps,
    LinkClassKey,
    'component'
  > {
  color?: PropTypes.Color;
  component?: React.ReactType<LinkProps>;
  TypographyClasses?: TypographyProps['classes'];
}

export type LinkClassKey = 'root';

declare const Link: React.ComponentType<LinkProps>;

export default Link;
