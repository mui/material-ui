'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getTableContainerUtilityClass } from './tableContainerClasses';
import type { Theme } from '../styles';
import type { OverridableComponent, OverrideProps } from '../OverridableComponent';
import type { TableContainerClasses } from './tableContainerClasses';

export interface TableContainerOwnProps {
  /**
   * The content of the component, normally `Table`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TableContainerClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface TableContainerTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & TableContainerOwnProps;
  defaultComponent: RootComponent;
}

export type TableContainerProps<
  RootComponent extends React.ElementType = TableContainerTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableContainerTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

type OwnerState = TableContainerProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableContainerUtilityClass, classes);
};

const TableContainerRoot = styled('div', {
  name: 'MuiTableContainer',
  slot: 'Root',
})<{ ownerState: OwnerState }>({
  width: '100%',
  overflowX: 'auto',
});

/**
 *
 * Demos:
 *
 * - [Table](https://mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TableContainer API](https://mui.com/material-ui/api/table-container/)
 */
const TableContainer = React.forwardRef(function TableContainer(
  inProps: TableContainerProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTableContainer' });
  const { className, component = 'div', ...other } = props;

  const ownerState = {
    ...props,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <TableContainerRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    />
  );
}) as OverridableComponent<TableContainerTypeMap>;

TableContainer.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally `Table`.
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

export default TableContainer;
