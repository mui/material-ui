import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getTableContainerUtilityClass } from './tableContainerClasses';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableContainerUtilityClass, classes);
};

const TableContainerRoot = styled('div', {
  name: 'MuiTableContainer',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  width: '100%',
  overflowX: 'auto',
});

const TableContainer = React.forwardRef(function TableContainer(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTableContainer' });
  const { className, component = 'div', ...other } = props;

  const styleProps = {
    ...props,
    component,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <TableContainerRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      {...other}
    />
  );
});

TableContainer.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
  sx: PropTypes.object,
};

export default TableContainer;
