import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ImageListItemTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * The content of the component, normally an `<img>`.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /* Styles applied to an `img` element to ensure it covers the item. */
      img?: string;
      /* Styles applied to the root element if `variant="standard"`. */
      standard?: string;
      /* Styles applied to the root element if `variant="woven"`. */
      woven?: string;
      /** Styles applied to the root element if `variant="masonry"`. */
      masonry?: string;
      /** Styles applied to the root element if `variant="quilted"`. */
      quilted?: string;
    };
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
 * - [Image List](https://material-ui.com/components/image-list/)
 *
 * API:
 *
 * - [ImageListItem API](https://material-ui.com/api/image-list-item/)
 */
declare const ImageListItem: OverridableComponent<ImageListItemTypeMap>;

export type ImageListItemClassKey = keyof NonNullable<ImageListItemProps['classes']>;

export type ImageListItemProps<
  D extends React.ElementType = ImageListItemTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ImageListItemTypeMap<P, D>, D>;

export default ImageListItem;
