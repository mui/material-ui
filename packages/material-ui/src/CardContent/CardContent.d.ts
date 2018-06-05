import * as React from 'react';
import { StandardProps } from '..';

export interface CardContentProps<C>
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CardContentClassKey> {
  component?: React.ReactType<C>;
}

export type CardContentClassKey = 'root';

declare class CardContent<C> extends React.Component<C & CardContentProps<C>> {}

export default CardContent;
