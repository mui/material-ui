'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getTableFooterUtilityClass } from './tableFooterClasses';
import type { Theme } from '../styles';
import type { OverridableComponent, OverrideProps } from '../OverridableComponent';
import type { TableFooterClasses } from './tableFooterClasses';

export interface TableFooterOwnProps {
  /**
   * The content of the component, normally `TableRow`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TableFooterClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface TableFooterTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'tfoot',
> {
  props: AdditionalProps & TableFooterOwnProps;
  defaultComponent: RootComponent;
}

export type TableFooterProps<
  RootComponent extends React.ElementType = TableFooterTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableFooterTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

type OwnerState = TableFooterProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableFooterUtilityClass, classes);
};

const TableFooterRoot = styled('tfoot', {
  name: 'MuiTableFooter',
  slot: 'Root',
})<{ ownerState: OwnerState }>({
  display: 'table-footer-group',
});

const tablelvl2 = {
  variant: 'footer',
} as const;

const defaultComponent = 'tfoot';

/**
 *
 * Demos:
 *
 * - [Table](https://mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TableFooter API](https://mui.com/material-ui/api/table-footer/)
 */
const TableFooter = React.forwardRef(function TableFooter(
  inProps: TableFooterProps,
  ref: React.Ref<HTMLTableSectionElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTableFooter' });
  const { className, component = defaultComponent, ...other } = props;

  const ownerState = {
    ...props,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <Tablelvl2Context.Provider value={tablelvl2}>
      <TableFooterRoot
        as={component}
        className={clsx(classes.root, className)}
        ref={ref}
        role={(component === defaultComponent ? null : 'rowgroup') as React.AriaRole | undefined}
        ownerState={ownerState}
        {...other}
      />
    </Tablelvl2Context.Provider>
  );
}) as OverridableComponent<TableFooterTypeMap>;

TableFooter.propTypes /* remove-proptypes */ = {
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

export default TableFooter;
