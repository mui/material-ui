'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import ListContext from '../List/ListContext';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getListItemAvatarUtilityClass } from './listItemAvatarClasses';
import type { Theme } from '../styles';
import type { InternalStandardProps as StandardProps } from '../internal';
import type { ListItemAvatarClasses } from './listItemAvatarClasses';

export interface ListItemAvatarProps extends StandardProps<React.ComponentPropsWithRef<'div'>> {
  /**
   * The content of the component, normally an `Avatar`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemAvatarClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

type OwnerState = ListItemAvatarProps & {
  alignItems?: 'flex-start' | 'center' | undefined;
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const { alignItems, classes } = ownerState;

  const slots = {
    root: ['root', alignItems === 'flex-start' && 'alignItemsFlexStart'],
  };

  return composeClasses(slots, getListItemAvatarUtilityClass, classes);
};

const ListItemAvatarRoot = styled('div', {
  name: 'MuiListItemAvatar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.alignItems === 'flex-start' && styles.alignItemsFlexStart];
  },
})<{ ownerState: OwnerState }>({
  minWidth: 56,
  flexShrink: 0,
  variants: [
    {
      props: {
        alignItems: 'flex-start',
      },
      style: {
        marginTop: 8,
      },
    },
  ],
});

/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 *
 * Demos:
 *
 * - [Lists](https://mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [ListItemAvatar API](https://mui.com/material-ui/api/list-item-avatar/)
 */
const ListItemAvatar = React.forwardRef(function ListItemAvatar(
  inProps: ListItemAvatarProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiListItemAvatar',
  });

  const { className, ...other } = props;
  const context = React.useContext(ListContext);
  const ownerState = { ...props, alignItems: context.alignItems };
  const classes = useUtilityClasses(ownerState);

  return (
    <ListItemAvatarRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
}) as React.ForwardRefExoticComponent<ListItemAvatarProps>;

ListItemAvatar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `Avatar`.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default ListItemAvatar;
