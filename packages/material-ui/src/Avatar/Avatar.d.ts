import * as React from 'react';
import { OverridableComponent, PropsOf, OverridableTypeMap } from '..';

declare const Avatar: OverridableComponent<{
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
