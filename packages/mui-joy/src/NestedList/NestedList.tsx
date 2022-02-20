import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { NestedListProps, NestedListTypeMap } from './NestedListProps';
import { getNestedListUtilityClass } from './nestedListClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getNestedListUtilityClass, {});
};

const NestedListRoot = styled('ul', {
  name: 'MuiNestedList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: NestedListProps }>(() => ({
  '--List-padding': `var(--NestedList-padding)`,
  '--List-radius': `var(--NestedList-radius)`,
  '--List-gap': `var(--NestedList-gap)`,
  '--List-background': `var(--NestedList-background)`, // TODO, remove
  '--List-item-minHeight': `var(--NestedList-item-minHeight)`,
  '--List-item-paddingX': `var(--NestedList-item-paddingX)`,
  '--List-decorator-width': `var(--NestedList-decorator-width)`,
  '--List-divider-gap': `var(--NestedList-divider-gap)`,
  '--List-item-radius': 'var(--NestedList-item-radius)',
  '--List-item-paddingY': 'var(--NestedList-item-paddingY)',
  '--List-insetStart': 'var(--NestedList-insetStart)',
  '--List-nestedItem-startGap': 'var(--NestedList-nestedItem-startGap)',
  '--List-itemButton-margin': '0px',
  '--List-item-margin': '0px',
  padding: 0,
  margin: 'var(--NestedList-margin)',
  marginTop: 'var(--List-gap)',
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  position: 'relative', // for sticky ListItem
}));

const NestedList = React.forwardRef(function NestedList(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiNestedList',
  });

  const { component, className, children, ...other } = props;

  const ownerState = {
    ...props,
  };

  const classes = useUtilityClasses();

  return (
    <NestedListRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      {children}
    </NestedListRoot>
  );
}) as OverridableComponent<NestedListTypeMap>;

NestedList.propTypes /* remove-proptypes */ = {
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
} as any;

export default NestedList;
