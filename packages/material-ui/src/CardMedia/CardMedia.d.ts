import * as React from 'react';
import { StandardProps } from '..';

export interface CardMediaProps<C>
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CardMediaClassKey> {
  component?: React.ReactType<C>;
  image?: string;
  src?: string;
}

export type CardMediaClassKey = 'root' | 'media';

declare class CardMedia<C> extends React.Component<C & CardMediaProps<C>> {}

export default CardMedia;
