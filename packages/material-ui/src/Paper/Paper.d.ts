import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { OverridableStringUnion } from '@material-ui/types';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '..';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';

export interface PaperPropsVariantOverrides {}
export type PaperVariantDefaults = Record<'elevation' | 'outlined', true>;

export interface PaperTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    StandardProps<React.HTMLAttributes<HTMLElement>> & {
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
        /** Styles applied to the root element unless `square={true}`. */
        rounded?: string;
        /** Styles applied to the root element if `variant="outlined"`. */
        outlined?: string;
        /** Styles applied to the root element if `variant="elevation"`. */
        elevation?: string;
        elevation0?: string;
        elevation1?: string;
        elevation2?: string;
        elevation3?: string;
        elevation4?: string;
        elevation5?: string;
        elevation6?: string;
        elevation7?: string;
        elevation8?: string;
        elevation9?: string;
        elevation10?: string;
        elevation11?: string;
        elevation12?: string;
        elevation13?: string;
        elevation14?: string;
        elevation15?: string;
        elevation16?: string;
        elevation17?: string;
        elevation18?: string;
        elevation19?: string;
        elevation20?: string;
        elevation21?: string;
        elevation22?: string;
        elevation23?: string;
        elevation24?: string;
      };
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
      variant?: OverridableStringUnion<PaperVariantDefaults, PaperPropsVariantOverrides>;
    };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 * - [Paper](https://material-ui.com/components/paper/)
 *
 * API:
 *
 * - [Paper API](https://material-ui.com/api/paper/)
 */
declare const Paper: OverridableComponent<PaperTypeMap>;

export type PaperProps<
  D extends React.ElementType = PaperTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<PaperTypeMap<P, D>, D>;

export type PaperClassKey = keyof NonNullable<PaperProps['classes']>;

export default Paper;
