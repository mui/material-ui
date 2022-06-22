import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { ButtonBaseTypeMap, ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { CardActionAreaClasses } from './cardActionAreaClasses';

export type CardActionAreaTypeMap<P, D extends React.ElementType> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<CardActionAreaClasses>;
    focusVisibleClassName?: string;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}>;

/**
 *
 * Demos:
 *
 * - [Cards](https://mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardActionArea API](https://mui.com/material-ui/api/card-action-area/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
declare const CardActionArea: ExtendButtonBase<
  CardActionAreaTypeMap<{}, ButtonBaseTypeMap['defaultComponent']>
>;

export type CardActionAreaProps<
  D extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<CardActionAreaTypeMap<P, D>, D>;

export default CardActionArea;
