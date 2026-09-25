'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getListItemIconUtilityClass } from './listItemIconClasses';
import ListContext from '../List/ListContext';
import type { Theme } from '../styles';
import type { InternalStandardProps as StandardProps } from '../internal';
import type { ListItemIconClasses } from './listItemIconClasses';

export interface ListItemIconProps extends StandardProps<React.ComponentPropsWithRef<'div'>> {
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@mui/icons-material` SVG icon element.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemIconClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

type OwnerState = ListItemIconProps & {
  alignItems?: 'flex-start' | 'center' | undefined;
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const { alignItems, classes } = ownerState;

  const slots = {
    root: ['root', alignItems === 'flex-start' && 'alignItemsFlexStart'],
  };

  return composeClasses(slots, getListItemIconUtilityClass, classes);
};

const ListItemIconRoot = styled('div', {
  name: 'MuiListItemIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.alignItems === 'flex-start' && styles.alignItemsFlexStart];
  },
})<{ ownerState: OwnerState }>(
  memoTheme(({ theme }) => ({
    minWidth: theme.spacing(4.5),
    color: (theme.vars || theme).palette.action.active,
    flexShrink: 0,
    display: 'inline-flex',
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
  })),
);

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 *
 * Demos:
 *
 * - [Lists](https://mui.com/material-ui/react-list/)
 * - [Menubar](https://mui.com/material-ui/react-menubar/)
 *
 * API:
 *
 * - [ListItemIcon API](https://mui.com/material-ui/api/list-item-icon/)
 */
const ListItemIcon = React.forwardRef(function ListItemIcon(
  inProps: ListItemIconProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiListItemIcon',
  });

  const { className, ...other } = props;
  const context = React.useContext(ListContext);
  const ownerState = { ...props, alignItems: context.alignItems };
  const classes = useUtilityClasses(ownerState);

  return (
    <ListItemIconRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
}) as React.ForwardRefExoticComponent<ListItemIconProps>;

ListItemIcon.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@mui/icons-material` SVG icon element.
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

export default ListItemIcon;
