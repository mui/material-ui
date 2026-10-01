'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getDialogContentUtilityClass } from './dialogContentClasses';
import dialogTitleClasses from '../DialogTitle/dialogTitleClasses';
import type { Theme } from '../styles';
import type { InternalStandardProps as StandardProps } from '../internal';
import type { DialogContentClasses } from './dialogContentClasses';

export interface DialogContentProps extends StandardProps<React.ComponentPropsWithRef<'div'>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogContentClasses> | undefined;
  /**
   * Display the top and bottom dividers.
   * @default false
   */
  dividers?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

type OwnerState = DialogContentProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes, dividers } = ownerState;

  const slots = {
    root: ['root', dividers && 'dividers'],
  };

  return composeClasses(slots, getDialogContentUtilityClass, classes);
};

const DialogContentRoot = styled('div', {
  name: 'MuiDialogContent',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.dividers && styles.dividers];
  },
})<{ ownerState: OwnerState }>(
  memoTheme(({ theme }) => ({
    flex: '1 1 auto',
    // Add iOS momentum scrolling for iOS < 13.0
    WebkitOverflowScrolling: 'touch',
    overflowY: 'auto',
    padding: '20px 24px',
    variants: [
      {
        props: ({ ownerState }: { ownerState: OwnerState }) => ownerState.dividers,
        style: {
          padding: '16px 24px',
          borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
          borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
        },
      },
      {
        props: ({ ownerState }: { ownerState: OwnerState }) => !ownerState.dividers,
        style: {
          [`.${dialogTitleClasses.root} + &`]: {
            paddingTop: 0,
          },
        },
      },
    ],
  })),
);

/**
 *
 * Demos:
 *
 * - [Dialog](https://mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogContent API](https://mui.com/material-ui/api/dialog-content/)
 */
const DialogContent = React.forwardRef(function DialogContent(
  inProps: DialogContentProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiDialogContent',
  });

  const { className, dividers = false, ...other } = props;
  const ownerState = { ...props, dividers };
  const classes = useUtilityClasses(ownerState);

  return (
    <DialogContentRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
}) as React.ForwardRefExoticComponent<DialogContentProps>;

DialogContent.propTypes /* remove-proptypes */ = {
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
   * Display the top and bottom dividers.
   * @default false
   */
  dividers: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default DialogContent;
