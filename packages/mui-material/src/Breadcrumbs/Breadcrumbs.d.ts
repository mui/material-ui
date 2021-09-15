import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { BreadcrumbsClasses } from './breadcrumbsClasses';

export interface BreadcrumbsTypeMap<P = {}, D extends React.ElementType = 'nav'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<BreadcrumbsClasses>;
    /**
     * Override the default label for the expand button.
     *
     * For localization purposes, you can use the provided [translations](/guides/localization/).
     * @default 'Show path'
     */
    expandText?: string;
    /**
     * If max items is exceeded, the number of items to show after the ellipsis.
     * @default 1
     */
    itemsAfterCollapse?: number;
    /**
     * If max items is exceeded, the number of items to show before the ellipsis.
     * @default 1
     */
    itemsBeforeCollapse?: number;
    /**
     * Specifies the maximum number of breadcrumbs to display. When there are more
     * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
     * will be shown, with an ellipsis in between.
     * @default 8
     */
    maxItems?: number;
    /**
     * Custom separator node.
     * @default '/'
     */
    separator?: React.ReactNode;
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
 * - [Breadcrumbs](https://mui.com/components/breadcrumbs/)
 *
 * API:
 *
 * - [Breadcrumbs API](https://mui.com/api/breadcrumbs/)
 */
declare const Breadcrumbs: OverridableComponent<BreadcrumbsTypeMap>;

export type BreadcrumbsProps<
  D extends React.ElementType = BreadcrumbsTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BreadcrumbsTypeMap<P, D>, D>;

export default Breadcrumbs;
