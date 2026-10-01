'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import ListContext from '../List/ListContext';
import { getListItemSecondaryActionClassesUtilityClass } from './listItemSecondaryActionClasses';
import type { OverridableComponent, OverrideProps } from '../OverridableComponent';
import type { Theme } from '../styles';
import type { ListItemSecondaryActionClasses } from './listItemSecondaryActionClasses';

export interface ListItemSecondaryActionOwnProps {
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemSecondaryActionClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface ListItemSecondaryActionTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & ListItemSecondaryActionOwnProps;
  defaultComponent: RootComponent;
}

export type ListItemSecondaryActionProps<
  RootComponent extends React.ElementType = ListItemSecondaryActionTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ListItemSecondaryActionTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

type OwnerState = ListItemSecondaryActionProps & {
  disableGutters: boolean;
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const { disableGutters, classes } = ownerState;

  const slots = {
    root: ['root', disableGutters && 'disableGutters'],
  };

  return composeClasses(slots, getListItemSecondaryActionClassesUtilityClass, classes);
};

const ListItemSecondaryActionRoot = styled('div', {
  name: 'MuiListItemSecondaryAction',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.disableGutters && styles.disableGutters];
  },
})<{ ownerState: OwnerState }>({
  position: 'absolute',
  right: 16,
  top: '50%',
  transform: 'translateY(-50%)',
  variants: [
    {
      props: ({ ownerState }: { ownerState: OwnerState }) => ownerState.disableGutters,
      style: {
        right: 0,
      },
    },
  ],
});

/**
 * Must be used as the last child of ListItem to function properly.
 *
 * Demos:
 *
 * - [Lists](https://mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [ListItemSecondaryAction API](https://mui.com/material-ui/api/list-item-secondary-action/)
 */
const ListItemSecondaryAction = React.forwardRef(function ListItemSecondaryAction(
  inProps: ListItemSecondaryActionProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiListItemSecondaryAction' });
  const { className, component, ...other } = props;
  const context = React.useContext(ListContext);
  const ownerState = { ...props, disableGutters: context.disableGutters } as OwnerState;
  const classes = useUtilityClasses(ownerState);

  return (
    <ListItemSecondaryActionRoot
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
}) as unknown as OverridableComponent<ListItemSecondaryActionTypeMap> & { muiName: string };

ListItemSecondaryAction.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `IconButton` or selection control.
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

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';

export default ListItemSecondaryAction;
