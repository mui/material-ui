import * as React from 'react';
import { MuiComponent, PropsOf, TypeMap } from '..';

declare const Avatar: MuiComponent<{
  outerProps: {
    alt?: string;
    childrenClassName?: string;
    imgProps?: React.HtmlHTMLAttributes<HTMLImageElement>;
    sizes?: string;
    src?: string;
    srcSet?: string;
  };
  defaultComponent: 'div';
  classKey: AvatarClassKey;
}>;

export type AvatarClassKey = 'root' | 'colorDefault' | 'img';

export type AvatarProps = PropsOf<typeof Avatar>;

export default Avatar;
