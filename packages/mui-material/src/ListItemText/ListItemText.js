'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import Typography, { typographyClasses } from '../Typography';
import ListContext from '../List/ListContext';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import listItemTextClasses, { getListItemTextUtilityClass } from './listItemTextClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { classes, inset, primary, secondary, dense } = ownerState;

  const slots = {
    root: ['root', inset && 'inset', dense && 'dense', primary && secondary && 'multiline'],
    primary: ['primary'],
    secondary: ['secondary'],
  };

  return composeClasses(slots, getListItemTextUtilityClass, classes);
};

const ListItemTextRoot = styled('div', {
  name: 'MuiListItemText',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${listItemTextClasses.primary}`]: styles.primary },
      { [`& .${listItemTextClasses.secondary}`]: styles.secondary },
      styles.root,
      ownerState.inset && styles.inset,
      ownerState.primary && ownerState.secondary && styles.multiline,
      ownerState.dense && styles.dense,
    ];
  },
})({
  flex: '1 1 auto',
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4,
  [`.${typographyClasses.root}:where(& .${listItemTextClasses.primary})`]: {
    display: 'block',
  },
  [`.${typographyClasses.root}:where(& .${listItemTextClasses.secondary})`]: {
    display: 'block',
  },
  variants: [
    {
      props: ({ ownerState }) => ownerState.primary && ownerState.secondary,
      style: {
        marginTop: 6,
        marginBottom: 6,
      },
    },
    {
      props: ({ ownerState }) => ownerState.inset,
      style: {
        paddingLeft: 56,
      },
    },
  ],
});

const ListItemText = React.forwardRef(function ListItemText(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiListItemText' });
  const {
    children,
    className,
    disableTypography = false,
    inset = false,
    primary: primaryProp,
    primaryTypographyProps,
    secondary: secondaryProp,
    secondaryTypographyProps,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const { dense } = React.useContext(ListContext);

  let primary = primaryProp != null ? primaryProp : children;
  let secondary = secondaryProp;

  const ownerState = {
    ...props,
    disableTypography,
    inset,
    primary: !!primary,
    secondary: !!secondary,
    dense,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps: {
      primary: primaryTypographyProps,
      secondary: secondaryTypographyProps,
      ...slotProps,
    },
  };

  const [PrimarySlot, primarySlotProps] = useSlot('primary', {
    className: classes.primary,
    elementType: Typography,
    externalForwardedProps,
    ownerState,
  });
  const [SecondarySlot, secondarySlotProps] = useSlot('secondary', {
    className: classes.secondary,
    elementType: Typography,
    externalForwardedProps,
    ownerState,
  });

  if (primary != null && primary.type !== Typography && !disableTypography) {
    primary = (
      <PrimarySlot
        variant={dense ? 'body2' : 'body1'}
        component={primarySlotProps?.variant ? undefined : 'span'}
        {...primarySlotProps}
      >
        {primary}
      </PrimarySlot>
    );
  }

  if (secondary != null && secondary.type !== Typography && !disableTypography) {
    secondary = (
      <SecondarySlot variant="body2" color="textSecondary" {...secondarySlotProps}>
        {secondary}
      </SecondarySlot>
    );
  }

  return (
    <ListItemTextRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    >
      {primary}
      {secondary}
    </ListItemTextRoot>
  );
});

ListItemText.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Alias for the `primary` prop.
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
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography: PropTypes.bool,
  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset: PropTypes.bool,
  /**
   * The main content element.
   */
  primary: PropTypes.node,
  /**
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   * @deprecated Use `slotProps.primary` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  primaryTypographyProps: PropTypes.object,
  /**
   * The secondary content element.
   */
  secondary: PropTypes.node,
  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   * @deprecated Use `slotProps.secondary` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  secondaryTypographyProps: PropTypes.object,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    primary: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    secondary: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    primary: PropTypes.elementType,
    secondary: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default ListItemText;
