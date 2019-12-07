import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface AvatarTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    alt?: string;
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    sizes?: string;
    src?: string;
    srcSet?: string;
    variant?: 'circle' | 'rounded' | 'square';
  };
  defaultComponent: D;
  classKey: AvatarClassKey;
}

declare const Avatar: OverridableComponent<AvatarTypeMap>;

export type AvatarClassKey =
  | 'root'
  | 'colorDefault'
  | 'circle'
  | 'rounded'
  | 'square'
  | 'img'
  | 'fallback';

export type AvatarProps<
  D extends React.ElementType = AvatarTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<AvatarTypeMap<P, D>, D>;

export default Avatar;
