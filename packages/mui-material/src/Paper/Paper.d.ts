import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { OverrideProps, OverridableComponent, OverridableTypeMap } from '../OverridableComponent';
import { PaperClasses } from './paperClasses';

export interface PaperPropsVariantOverrides {}

export interface PaperOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<PaperClasses>;
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation?: number;
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant?: OverridableStringUnion<'elevation' | 'outlined', PaperPropsVariantOverrides>;
}

export interface PaperTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & PaperOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Card](https://mui.com/material-ui/react-card/)
 * - [Paper](https://mui.com/material-ui/react-paper/)
 *
 * API:
 *
 * - [Paper API](https://mui.com/material-ui/api/paper/)
 */
declare const Paper: OverridableComponent<PaperTypeMap>;

export interface ExtendPaperTypeMap<TypeMap extends OverridableTypeMap, Keys extends string = ''> {
  props: TypeMap['props'] & Omit<PaperTypeMap['props'], Keys>;
  defaultComponent: TypeMap['defaultComponent'];
}

export type PaperProps<
  RootComponent extends React.ElementType = PaperTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<PaperTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Paper;
