import * as React from 'react';
import { StandardProps } from '..';

export interface AvatarProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  AvatarClassKey
> {
  alt?: string;
  childrenClassName?: string;
  component?: React.ReactType;
  imgProps?: Object;
  sizes?: string;
  src?: string;
  srcSet?: string;
}

export type AvatarClassKey =
  | 'root'
  | 'colorDefault'
  | 'img'
  ;

declare const Avatar: React.ComponentType<AvatarProps>;

export default Avatar;
