import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ImageListItemClasses } from './imageListItemClasses';

export interface ImageListItemTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * The content of the component, normally an `<img>`.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ImageListItemClasses>;
    /**
     * Width of the item in number of grid columns.
     * @default 1
     */
    cols?: number;
    /**
     * Height of the item in number of grid rows.
     * @default 1
     */
    rows?: number;
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
 * - [Image List](https://mui.com/material-ui/react-image-list/)
 *
 * API:
 *
 * - [ImageListItem API](https://mui.com/material-ui/api/image-list-item/)
 */
declare const ImageListItem: OverridableComponent<ImageListItemTypeMap>;

export type ImageListItemProps<
  D extends React.ElementType = ImageListItemTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ImageListItemTypeMap<P, D>, D>;

export default ImageListItem;
