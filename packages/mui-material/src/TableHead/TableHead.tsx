'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getTableHeadUtilityClass } from './tableHeadClasses';
import type { Theme } from '../styles';
import type { OverridableComponent, OverrideProps } from '../OverridableComponent';
import type { TableHeadClasses } from './tableHeadClasses';

export interface TableHeadOwnProps {
  /**
   * The content of the component, normally `TableRow`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TableHeadClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface TableHeadTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'thead',
> {
  props: AdditionalProps & TableHeadOwnProps;
  defaultComponent: RootComponent;
}

export type TableHeadProps<
  RootComponent extends React.ElementType = TableHeadTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableHeadTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

type OwnerState = TableHeadProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableHeadUtilityClass, classes);
};

const TableHeadRoot = styled('thead', {
  name: 'MuiTableHead',
  slot: 'Root',
})<{ ownerState: OwnerState }>({
  display: 'table-header-group',
});

const tablelvl2 = {
  variant: 'head',
} as const;

const defaultComponent = 'thead';

/**
 *
 * Demos:
 *
 * - [Table](https://mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TableHead API](https://mui.com/material-ui/api/table-head/)
 */
const TableHead = React.forwardRef(function TableHead(
  inProps: TableHeadProps,
  ref: React.Ref<HTMLTableSectionElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTableHead' });
  const { className, component = defaultComponent, ...other } = props;

  const ownerState = {
    ...props,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <Tablelvl2Context.Provider value={tablelvl2}>
      <TableHeadRoot
        as={component}
        className={clsx(classes.root, className)}
        ref={ref}
        role={(component === defaultComponent ? null : 'rowgroup') as React.AriaRole | undefined}
        ownerState={ownerState}
        {...other}
      />
    </Tablelvl2Context.Provider>
  );
}) as OverridableComponent<TableHeadTypeMap>;

TableHead.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally `TableRow`.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default TableHead;
