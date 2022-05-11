import * as React from 'react';
import { SxProps } from '@mui/system';
import { ComponentWithComponentProp, PropsWithComponentProp } from '../ComponentWithComponentProp';
import { Theme } from '..';
import { CardContentUpdatedClasses } from './cardContentUpdatedClasses';

export interface CardContentUpdatedOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CardContentUpdatedClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}
/**
 *
 * Demos:
 *
 * - [Cards](https://mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardContentUpdated API](https://mui.com/material-ui/api/card-content-updated/)
 */
declare const CardContentUpdated: ComponentWithComponentProp<CardContentUpdatedOwnProps, 'div'>;

export type CardContentUpdatedProps<
  D extends React.ElementType = 'div',
  P = {},
> = PropsWithComponentProp<P & CardContentUpdatedOwnProps, D>;

export default CardContentUpdated;
