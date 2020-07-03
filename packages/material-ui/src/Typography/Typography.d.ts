import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { OverrideProps, OverridableTypeMap, OverridableComponent } from '../OverridableComponent';
import { Variant } from '../styles/createTypography';

export interface TypographyTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * Set the text-align on the component.
     */
    align?: PropTypes.Alignment;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?:
      | 'initial'
      | 'inherit'
      | 'primary'
      | 'secondary'
      | 'textPrimary'
      | 'textSecondary'
      | 'error';
    /**
     * Controls the display type
     */
    display?: 'initial' | 'block' | 'inline';
    /**
     * If `true`, the text will have a bottom margin.
     */
    gutterBottom?: boolean;
    /**
     * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
     *
     * Note that text overflow can only happen with block or inline-block level elements
     * (the element needs to have a width in order to overflow).
     */
    noWrap?: boolean;
    /**
     * If `true`, the text will have a bottom margin.
     */
    paragraph?: boolean;
    /**
     * Applies the theme typography styles.
     */
    variant?: Variant | 'inherit';
    /**
     * The component maps the variant prop to a range of different HTML element types.
     * For instance, subtitle1 to `<h6>`.
     * If you wish to change that mapping, you can provide your own.
     * Alternatively, you can use the `component` prop.
     */
    variantMapping?: Partial<Record<Variant, string>>;
  };
  defaultComponent: D;
  classKey: TypographyClassKey;
}

/**
 *
 * Demos:
 *
 * - [Breadcrumbs](https://material-ui.com/components/breadcrumbs/)
 * - [Typography](https://material-ui.com/components/typography/)
 *
 * API:
 *
 * - [Typography API](https://material-ui.com/api/typography/)
 */
declare const Typography: OverridableComponent<TypographyTypeMap>;

export type TypographyProps<
  D extends React.ElementType = TypographyTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TypographyTypeMap<P, D>, D>;

export type TypographyClassKey =
  | 'root'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline'
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'
  | 'noWrap'
  | 'gutterBottom'
  | 'paragraph'
  | 'colorInherit'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorTextPrimary'
  | 'colorTextSecondary'
  | 'colorError'
  | 'displayInline'
  | 'displayBlock';

export default Typography;
