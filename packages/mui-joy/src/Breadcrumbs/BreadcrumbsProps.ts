import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SlotComponentProps } from '@mui/base/utils';
import { SxProps } from '../styles/types';

export type BreadcrumbsSlot = 'root' | 'ol' | 'li' | 'separator';

export interface BreadcrumbsPropsSizeOverrides {}

interface ComponentsProps {
  root?: SlotComponentProps<'nav', { sx?: SxProps }, BreadcrumbsOwnerState>;
  ol?: SlotComponentProps<'ol', { sx?: SxProps }, BreadcrumbsOwnerState>;
  li?: SlotComponentProps<'li', { sx?: SxProps }, BreadcrumbsOwnerState>;
  separator?: SlotComponentProps<'li', { sx?: SxProps }, BreadcrumbsOwnerState>;
}

export interface BreadcrumbsTypeMap<P = {}, D extends React.ElementType = 'nav'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The props used for each slot inside the component.
     * @default {}
     */
    componentsProps?: ComponentsProps;
    /**
     * Custom separator node.
     * @default '/'
     */
    separator?: React.ReactNode;
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', BreadcrumbsPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type BreadcrumbsProps<
  D extends React.ElementType = BreadcrumbsTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<BreadcrumbsTypeMap<P, D>, D>;

export interface BreadcrumbsOwnerState extends BreadcrumbsProps {}
