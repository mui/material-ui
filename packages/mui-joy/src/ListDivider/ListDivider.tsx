import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListDividerProps, ListDividerTypeMap } from './ListDividerProps';
import { getListDividerUtilityClass } from './listDividerClasses';

const useUtilityClasses = (ownerState: ListDividerProps) => {
  const slots = {
    root: ['root', ownerState.inset && `inset${capitalize(ownerState.inset)}`],
  };

  return composeClasses(slots, getListDividerUtilityClass, {});
};

const ListDividerRoot = styled('li', {
  name: 'MuiListDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListDividerProps }>(({ theme, ownerState }) => ({
  '--List-divider-marginY': 'calc(var(--List-gap) + var(--List-divider-gap))',
  border: 'none', // reset the border for `hr` tag
  borderBottom: '1px solid',
  borderColor: theme.vars.palette.divider,
  // by default, the divider line is stretched from edge-to-edge of the List
  // spacing between ListItem can be controlled by `--List-divider-gap` on the List
  margin: 'var(--List-divider-marginY) calc(-1 * var(--List-padding))',
  listStyle: 'none',
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
}));

const ListDivider = React.forwardRef(function ListDivider(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiListDivider',
  });

  const { component, className, children, inset, ...other } = props;

  const ownerState = {
    inset,
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
   */
  inset: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['gutter', 'startDecorator', 'startContent']),
    PropTypes.string,
  ]),
} as any;

export default ListDivider;
