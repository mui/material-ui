import * as React from 'react';
import { StyledComponent } from '..';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  alt?: string;
  childrenClassName?: string;
  component?: React.ReactNode;
  imgProps?: Object;
  sizes?: string;
  src?: string;
  srcSet?: string;
}

export default class Avatar extends StyledComponent<AvatarProps> {}
