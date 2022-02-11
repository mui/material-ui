import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListItemSeparatorProps, ListItemSeparatorTypeMap } from './ListItemSeparatorProps';
import { getListItemSeparatorUtilityClass } from './listItemSeparatorClasses';

const useUtilityClasses = (ownerState: ListItemSeparatorProps) => {
  const slots = {
    root: ['root', ownerState.inset && `inset${capitalize(ownerState.inset)}`],
  };

  return composeClasses(slots, getListItemSeparatorUtilityClass, {});
};

const ListItemSeparatorRoot = styled('li', {
  name: 'MuiListItemSeparator',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListItemSeparatorProps }>(({ theme, ownerState }) => ({
  border: 'none', // reset the border for `hr` tag
  borderBottom: '1px solid',
  borderColor: theme.vars.palette.neutral.outlinedBorder,
  // by default, the separator line is stretched from edge-to-edge of the List
  // spacing between ListItem can be controlled by `--List-separatorGap` on the List
  margin: 'calc(var(--List-separatorGap) / 2) calc(-1 * var(--List-padding))',
  ...(ownerState.inset === 'gutter' && {
    margin: 'calc(var(--List-separatorGap) / 2)',
    marginRight: 'var(--List-itemGutter)',
    marginLeft: 'var(--List-insetStart)',
  }),
  ...(ownerState.inset === 'startAdornment' && {
    marginLeft: 'var(--List-insetStart)',
  }),
  ...(ownerState.inset === 'startContent' && {
    marginLeft: 'calc(var(--List-insetStart) + var(--List-startAdornmentWidth))',
  }),
}));

const ListItemSeparator = React.forwardRef(function ListItemSeparator(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiListItemSeparator',
  });

  const { component, className, children, inset, ...other } = props;

  const ownerState = {
    inset,
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ListItemSeparatorRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      role="separator"
      {...other}
    >
      {children}
    </ListItemSeparatorRoot>
  );
}) as OverridableComponent<ListItemSeparatorTypeMap>;

ListItemSeparator.propTypes /* remove-proptypes */ = {
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
   * The empty space on the side(s) of the separator.
   */
  inset: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['gutter', 'startAdornment', 'startContent']),
    PropTypes.string,
  ]),
} as any;

export default ListItemSeparator;
