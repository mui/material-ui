import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { OverridableComponent, OverridableTypeMap, OverrideProps } from '../OverridableComponent';
import { ListClasses } from './listClasses';

export interface ListTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'ul',
> {
  props: AdditionalProps & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ListClasses>;
    /**
     * If `true`, compact vertical padding designed for keyboard and mouse input is used for
     * the list and list items.
     * The prop is available to descendant components as the `dense` context.
     * @default false
     */
    dense?: boolean;
    /**
     * If `true`, vertical padding is removed from the list.
     * @default false
     */
    disablePadding?: boolean;
    /**
     * The content of the subheader, normally `ListSubheader`.
     */
    subheader?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: DefaultComponent;
}

/**
 * utility to create component types that inherit props from List.
 */
export interface ExtendListTypeMap<TypeMap extends OverridableTypeMap> {
  props: TypeMap['props'] & ListTypeMap['props'];
  defaultComponent: TypeMap['defaultComponent'];
}

export type ExtendList<TypeMap extends OverridableTypeMap> = OverridableComponent<
  ExtendListTypeMap<TypeMap>
>;

/**
 *
 * Demos:
 *
 * - [Lists](https://mui.com/material-ui/react-list/)
 * - [Transfer List](https://mui.com/material-ui/react-transfer-list/)
 *
 * API:
 *
 * - [List API](https://mui.com/material-ui/api/list/)
 */
declare const List: ExtendList<ListTypeMap>;

export type ListProps<
  RootComponent extends React.ElementType = ListTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ListTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default List;
