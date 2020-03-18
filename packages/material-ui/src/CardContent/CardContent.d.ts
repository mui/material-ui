import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface CardContentTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P;
  defaultComponent: D;
  classKey: CardContentClassKey;
}
/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 *
 * API:
 *
 * - [CardContent API](https://material-ui.com/api/card-content/)
 */
declare const CardContent: OverridableComponent<CardContentTypeMap>;

export type CardContentClassKey = 'root';

export type CardContentProps<
  D extends React.ElementType = CardContentTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<CardContentTypeMap<P, D>, D>;

export default CardContent;
