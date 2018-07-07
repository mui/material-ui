import * as React from 'react';
import { AnyComponent, PassthruProps, StandardProps } from '..';

export type AvatarProps<C extends AnyComponent = AnyComponent> = StandardProps<
  PassthruProps<C, 'div'>,
  AvatarClassKey
> & {
  alt?: string;
  childrenClassName?: string;
  component?: C;
  imgProps?: React.HtmlHTMLAttributes<HTMLImageElement>;
  sizes?: string;
  src?: string;
  srcSet?: string;
};

export type AvatarClassKey = 'root' | 'colorDefault' | 'img';

declare class Avatar<C extends AnyComponent> extends React.Component<AvatarProps<C>> {}

export default Avatar;
