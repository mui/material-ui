import * as React from 'react';
import { StandardProps } from '../MuiProps';

export interface CardContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CardContentClassKey> {}

export type CardContentClassKey = 'root';

declare const CardContent: React.ComponentType<CardContentProps>;

export default CardContent;
