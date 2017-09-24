import * as React from 'react';
import { StyledComponent } from '..';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
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

declare const Avatar: StyledComponent<AvatarProps, AvatarClassKey>;

export default Avatar;
