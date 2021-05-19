import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '..';

export interface CardContentTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
    };
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
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

export type CardContentClassKey = keyof NonNullable<CardContentTypeMap['props']['classes']>;

export type CardContentProps<
  D extends React.ElementType = CardContentTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<CardContentTypeMap<P, D>, D>;

export default CardContent;
