'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import type { OverridableComponent, OverrideProps } from '../OverridableComponent';
import type { Theme } from '../styles';
import { getTableBodyUtilityClass } from './tableBodyClasses';
import type { TableBodyClasses } from './tableBodyClasses';

export interface TableBodyOwnProps {
  /**
   * The content of the component, normally `TableRow`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TableBodyClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface TableBodyTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'tbody',
> {
  props: AdditionalProps & TableBodyOwnProps;
  defaultComponent: RootComponent;
}

export type TableBodyProps<
  RootComponent extends React.ElementType = TableBodyTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableBodyTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

type OwnerState = TableBodyProps & {
  component: React.ElementType;
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableBodyUtilityClass, classes);
};

const TableBodyRoot = styled('tbody', {
  name: 'MuiTableBody',
  slot: 'Root',
})<{ ownerState: OwnerState }>({
  display: 'table-row-group',
});

const tablelvl2 = {
  variant: 'body',
} as const;

const defaultComponent = 'tbody';

/**
 *
 * Demos:
 *
 * - [Table](https://mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TableBody API](https://mui.com/material-ui/api/table-body/)
 */
const TableBody = React.forwardRef(function TableBody(
  inProps: TableBodyProps,
  ref: React.Ref<HTMLTableSectionElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTableBody' });
  const { className, component = defaultComponent, ...other } = props;

  const ownerState = {
    ...props,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <Tablelvl2Context.Provider value={tablelvl2}>
      <TableBodyRoot
        className={clsx(classes.root, className)}
        as={component}
        ref={ref}
        role={(component === defaultComponent ? null : 'rowgroup') as React.AriaRole | undefined}
        ownerState={ownerState}
        {...other}
      />
    </Tablelvl2Context.Provider>
  );
}) as OverridableComponent<TableBodyTypeMap>;

TableBody.propTypes /* remove-proptypes */ = {
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

export default TableBody;
