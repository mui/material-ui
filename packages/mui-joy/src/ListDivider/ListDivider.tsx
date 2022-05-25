import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListDividerProps, ListDividerTypeMap } from './ListDividerProps';
import { getListDividerUtilityClass } from './listDividerClasses';
import RowListContext from '../List/RowListContext';

const useUtilityClasses = (ownerState: ListDividerProps) => {
  const slots = {
    root: ['root', ownerState.inset && `inset${capitalize(ownerState.inset)}`],
  };

  return composeClasses(slots, getListDividerUtilityClass, {});
};

const ListDividerRoot = styled('li', {
  name: 'JoyListDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListDividerProps & { row: boolean } }>(({ theme, ownerState }) => ({
  border: 'none', // reset the border for `hr` tag
  ...(ownerState.row && {
    '--List-divider-marginX': 'calc(var(--List-gap) + var(--List-divider-gap))',
    borderRight: '1px solid',
    margin: '0px var(--List-divider-marginX)',
  }),
  ...(!ownerState.row && {
    '--List-divider-marginY': 'calc(var(--List-gap) + var(--List-divider-gap))',
    // by default, the divider line is stretched from edge-to-edge of the List
    // spacing between ListItem can be controlled by `--List-divider-gap` on the List
    margin: 'var(--List-divider-marginY) calc(-1 * var(--List-padding))',
    ...(ownerState.inset === 'gutter' && {
      margin: 'var(--List-divider-marginY)',
      marginRight: 'var(--List-item-paddingRight)',
      marginLeft: 'var(--List-item-paddingLeft)',
    }),
    ...(ownerState.inset === 'startDecorator' && {
      marginLeft: 'var(--List-item-paddingLeft)',
    }),
    ...(ownerState.inset === 'startContent' && {
      marginLeft: 'calc(var(--List-item-paddingLeft) + var(--List-decorator-width))',
    }),
    borderBottom: '1px solid',
  }),
  borderColor: theme.vars.palette.divider,
  listStyle: 'none',
}));

const ListDivider = React.forwardRef(function ListDivider(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyListDivider',
  });

  const row = React.useContext(RowListContext);

  const { component, className, children, inset, ...other } = props;

  const ownerState = {
    inset,
    row,
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ListDividerRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      role="separator"
      aria-orientation={row ? 'horizontal' : 'vertical'}
      {...other}
    >
      {children}
    </ListDividerRoot>
  );
}) as OverridableComponent<ListDividerTypeMap>;

ListDivider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
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
   * The empty space on the side(s) of the divider.
   * This prop has no effect on the divider if the nearest parent List has `row` prop set to `true`.
   */
  inset: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['gutter', 'startDecorator', 'startContent']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default ListDivider;
