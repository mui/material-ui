import * as React from 'react';
import { StandardProps } from '..';

export interface AvatarProps<C = {}>
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AvatarClassKey> {
  alt?: string;
  childrenClassName?: string;
  component?: React.ReactType<C>;
  imgProps?: React.HtmlHTMLAttributes<HTMLImageElement>;
  sizes?: string;
  src?: string;
  srcSet?: string;
}

export type AvatarClassKey = 'root' | 'colorDefault' | 'img';

declare class Avatar<C> extends React.Component<C & AvatarProps<C>> {}

export default Avatar;
