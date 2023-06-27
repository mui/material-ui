import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { darken, alpha, lighten } from '@mui/system';
import capitalize from '../utils/capitalize';
import TableContext from '../Table/TableContext';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import tableCellClasses, { getTableCellUtilityClass } from './tableCellClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, variant, align, padding, size, stickyHeader } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      stickyHeader && 'stickyHeader',
      align !== 'inherit' && `align${capitalize(align)}`,
      padding !== 'normal' && `padding${capitalize(padding)}`,
      `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getTableCellUtilityClass, classes);
};

const TableCellRoot = styled('td', {
  name: 'MuiTableCell',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      styles[`size${capitalize(ownerState.size)}`],
      ownerState.padding !== 'normal' && styles[`padding${capitalize(ownerState.padding)}`],
      ownerState.align !== 'inherit' && styles[`align${capitalize(ownerState.align)}`],
      ownerState.stickyHeader && styles.stickyHeader,
    ];
  },
})(({ theme, ownerState }) => ({
  ...theme.typography.body2,
  display: 'table-cell',
  verticalAlign: 'inherit',
  // Workaround for a rendering bug with spanned columns in Chrome 62.0.
  // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
  borderBottom: theme.vars
    ? `1px solid ${theme.vars.palette.TableCell.border}`
    : `1px solid
    ${
      theme.palette.mode === 'light'
        ? lighten(alpha(theme.palette.divider, 1), 0.88)
        : darken(alpha(theme.palette.divider, 1), 0.68)
    }`,
  textAlign: 'left',
  padding: 16,
  ...(ownerState.variant === 'head' && {
    color: (theme.vars || theme).palette.text.primary,
    lineHeight: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightMedium,
  }),
  ...(ownerState.variant === 'body' && {
    color: (theme.vars || theme).palette.text.primary,
  }),
  ...(ownerState.variant === 'footer' && {
    color: (theme.vars || theme).palette.text.secondary,
    lineHeight: theme.typography.pxToRem(21),
    fontSize: theme.typography.pxToRem(12),
  }),
  ...(ownerState.size === 'small' && {
    padding: '6px 16px',
    [`&.${tableCellClasses.paddingCheckbox}`]: {
      width: 24, // prevent the checkbox column from growing
      padding: '0 12px 0 16px',
      '& > *': {
        padding: 0,
      },
    },
  }),
  ...(ownerState.padding === 'checkbox' && {
    width: 48, // prevent the checkbox column from growing
    padding: '0 0 0 4px',
  }),
  ...(ownerState.padding === 'none' && {
    padding: 0,
  }),
  ...(ownerState.align === 'left' && {
    textAlign: 'left',
  }),
  ...(ownerState.align === 'center' && {
    textAlign: 'center',
  }),
  ...(ownerState.align === 'right' && {
    textAlign: 'right',
    flexDirection: 'row-reverse',
  }),
  ...(ownerState.align === 'justify' && {
    textAlign: 'justify',
  }),
  ...(ownerState.stickyHeader && {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: (theme.vars || theme).palette.background.default,
  }),
}));

/**
 * The component renders a `<th>` element when the parent context is a header
 * or otherwise a `<td>` element.
 */
const TableCell = React.forwardRef(function TableCell(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTableCell' });
  const {
    align = 'inherit',
    className,
    component: componentProp,
    padding: paddingProp,
    scope: scopeProp,
    size: sizeProp,
    sortDirection,
    variant: variantProp,
    ...other
  } = props;

  const table = React.useContext(TableContext);
  const tablelvl2 = React.useContext(Tablelvl2Context);

  const isHeadCell = tablelvl2 && tablelvl2.variant === 'head';

  let component;
  if (componentProp) {
    component = componentProp;
  } else {
    component = isHeadCell ? 'th' : 'td';
  }

  let scope = scopeProp;
  // scope is not a valid attribute for <td/> elements.
  // source: https://html.spec.whatwg.org/multipage/tables.html#the-td-element
  if (component === 'td') {
    scope = undefined;
  } else if (!scope && isHeadCell) {
    scope = 'col';
  }

  const variant = variantProp || (tablelvl2 && tablelvl2.variant);

  const ownerState = {
    ...props,
    align,
    component,
    padding: paddingProp || (table && table.padding ? table.padding : 'normal'),
    size: sizeProp || (table && table.size ? table.size : 'medium'),
    sortDirection,
    stickyHeader: variant === 'head' && table && table.stickyHeader,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  let ariaSort = null;
  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return (
    <TableCellRoot
      as={component}
      ref={ref}
      className={clsx(classes.root, className)}
      aria-sort={ariaSort}
      scope={scope}
      ownerState={ownerState}
      {...other}
    />
  );
});

TableCell.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Set the text-align on the table cell content.
   *
   * Monetary or generally number fields **should be right aligned** as that allows
   * you to add them up quickly in your head without having to worry about decimals.
   * @default 'inherit'
   */
  align: PropTypes.oneOf(['center', 'inherit', 'justify', 'left', 'right']),
  /**
   * The content of the component.
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
   * Sets the padding applied to the cell.
   * The prop defaults to the value (`'default'`) inherited from the parent Table component.
   */
  padding: PropTypes.oneOf(['checkbox', 'none', 'normal']),
  /**
   * Set scope attribute.
   */
  scope: PropTypes.string,
  /**
   * Specify the size of the cell.
   * The prop defaults to the value (`'medium'`) inherited from the parent Table component.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * Set aria-sort direction.
   */
  sortDirection: PropTypes.oneOf(['asc', 'desc', false]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Specify the cell type.
   * The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components.
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['body', 'footer', 'head']),
    PropTypes.string,
  ]),
};

export default TableCell;
