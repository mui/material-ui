import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps, styled } from '../styles';
import { getModalDialogTitleUtilityClass } from './modalDialogTitleClasses';
import {
  ModalDialogTitleProps,
  ModalDialogTitleOwnerState,
  ModalDialogTitleTypeMap,
} from './ModalDialogTitleProps';
import ModalDialogSizeContext from '../ModalDialog/ModalDialogSizeContext';
import ModalDialogAriaContext from '../ModalDialog/ModalDialogAriaContext';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getModalDialogTitleUtilityClass, {});
};

export const ModalDialogTitleRoot = styled('h2', {
  name: 'JoyModalDialogTitle',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ModalDialogTitleOwnerState }>(({ theme, ownerState }) => ({
  margin: 0,
  fontFamily: theme.vars.fontFamily.body,
  fontWeight: theme.vars.fontWeight.lg,
  ...(ownerState.size === 'sm' && {
    fontSize: theme.vars.fontSize.md,
    marginBlockEnd: theme.spacing(1), // a gap between title-content or title-divider
    lineHeight: theme.vars.lineHeight.sm,
  }),
  ...(ownerState.size === 'md' && {
    fontSize: theme.vars.fontSize.lg,
    marginBlockStart: theme.spacing(-0.375),
    marginBlockEnd: theme.spacing(1.5),
    lineHeight: theme.vars.lineHeight.md,
  }),
  ...(ownerState.size === 'lg' && {
    fontSize: theme.vars.fontSize.xl,
    marginBlockStart: theme.spacing(-1.25),
    marginBlockEnd: theme.spacing(1.5),
    lineHeight: theme.vars.lineHeight.lg,
  }),
}));

const ModalDialogTitle = React.forwardRef(function ModalDialogTitle(inProps, ref) {
  const props = useThemeProps<typeof inProps & ModalDialogTitleProps>({
    props: inProps,
    name: 'JoyModalDialogTitle',
  });

  const { className, component = 'h2', ...other } = props;

  const size = React.useContext(ModalDialogSizeContext);
  const modalDialog = React.useContext(ModalDialogAriaContext);

  const ownerState = {
    ...props,
    component,
    size,
  };

  const classes = useUtilityClasses();

  return (
    <ModalDialogTitleRoot
      ref={ref}
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      id={modalDialog?.labelId}
      {...other}
    />
  );
}) as OverridableComponent<ModalDialogTitleTypeMap>;

ModalDialogTitle.propTypes /* remove-proptypes */ = {
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default ModalDialogTitle;
