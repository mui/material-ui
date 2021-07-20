import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getTableFooterUtilityClass } from './tableFooterClasses';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableFooterUtilityClass, classes);
};

const TableFooterRoot = styled('tfoot', {
  name: 'MuiTableFooter',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  display: 'table-footer-group',
});

const tablelvl2 = {
  variant: 'footer',
};

const defaultComponent = 'tfoot';

const TableFooter = React.forwardRef(function TableFooter(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTableFooter' });
  const { className, component = defaultComponent, ...other } = props;

  const styleProps = {
    ...props,
    component,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <Tablelvl2Context.Provider value={tablelvl2}>
      <TableFooterRoot
        as={component}
        className={clsx(classes.root, className)}
        ref={ref}
        role={component === defaultComponent ? null : 'rowgroup'}
        styleProps={styleProps}
        {...other}
      />
    </Tablelvl2Context.Provider>
  );
});

TableFooter.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
  sx: PropTypes.object,
};

export default TableFooter;
