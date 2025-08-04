import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ImageListClasses } from './imageListClasses';

export interface ImageListPropsVariantOverrides {}

export interface ImageListOwnProps {
  /**
   * The content of the component, normally `ImageListItem`s.
   */
  children: NonNullable<React.ReactNode>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ImageListClasses>;
  /**
   * Number of columns.
   * @default 2
   */
  cols?: number;
  /**
   * The gap between items in px.
   * @default 4
   */
  gap?: number;
  /**
   * The height of one row in px.
   * @default 'auto'
   */
  rowHeight?: number | 'auto';
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant?: OverridableStringUnion<
    'masonry' | 'quilted' | 'standard' | 'woven',
    ImageListPropsVariantOverrides
  >;
}

export interface ImageListTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'ul',
> {
  props: AdditionalProps & ImageListOwnProps;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Image List](https://mui.com/material-ui/react-image-list/)
 *
 * API:
 *
 * - [ImageList API](https://mui.com/material-ui/api/image-list/)
 */
declare const ImageList: OverridableComponent<ImageListTypeMap>;

export type ImageListProps<
  RootComponent extends React.ElementType = ImageListTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ImageListTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default ImageList;
