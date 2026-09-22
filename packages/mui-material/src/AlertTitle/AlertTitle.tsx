'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Typography from '../Typography';
import type { TypographyProps } from '../Typography';
import type { Theme } from '../styles';
import { getAlertTitleUtilityClass } from './alertTitleClasses';
import type { AlertTitleClasses } from './alertTitleClasses';

export interface AlertTitleProps extends TypographyProps<'div'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AlertTitleClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

type OwnerState = AlertTitleProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getAlertTitleUtilityClass, classes);
};

const AlertTitleRoot = styled(Typography, {
  name: 'MuiAlertTitle',
  slot: 'Root',
})<{ ownerState: OwnerState }>(
  memoTheme(({ theme }) => {
    return {
      fontWeight: theme.typography.fontWeightMedium,
      marginTop: -2,
    };
  }),
);

/**
 *
 * Demos:
 *
 * - [Alert](https://mui.com/material-ui/react-alert/)
 *
 * API:
 *
 * - [AlertTitle API](https://mui.com/material-ui/api/alert-title/)
 * - inherits [Typography API](https://mui.com/material-ui/api/typography/)
 */
const AlertTitle = React.forwardRef(function AlertTitle(
  inProps: AlertTitleProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiAlertTitle',
  });

  const { className, ...other } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  return (
    <AlertTitleRoot
      gutterBottom
      component="div"
      ownerState={ownerState}
      ref={ref}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
}) as React.ForwardRefExoticComponent<AlertTitleProps>;

AlertTitle.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default AlertTitle;
