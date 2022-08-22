import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps, styled } from '../styles';
import { getModalDialogTitleUtilityClass } from './modalDialogTitleClasses';
import { ModalDialogTitleProps, ModalDialogTitleTypeMap } from './ModalDialogTitleProps';
import ModalDialogSizeContext from '../ModalDialog/ModalDialogSizeContext';
import ModalDialogTitleContext from '../ModalDialog/ModalDialogTitleContext';

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
})<{ ownerState: ModalDialogTitleProps & { dialogSize?: string } }>(({ theme, ownerState }) => ({
  margin: 0,
  fontFamily: theme.vars.fontFamily.body,
  fontWeight: theme.vars.fontWeight.lg,
  ...(ownerState.dialogSize === 'sm' && {
    fontSize: theme.vars.fontSize.md,
    marginBlockEnd: theme.spacing(1), // a gap between title-content or title-divider
    marginInlineEnd: theme.spacing(3), // reserve space for ModalClose
    lineHeight: theme.vars.lineHeight.md,
  }),
  ...(ownerState.dialogSize === 'md' && {
    fontSize: theme.vars.fontSize.lg,
    marginBlockEnd: theme.spacing(1.5),
    marginInlineEnd: theme.spacing(4),
    lineHeight: theme.vars.lineHeight.sm,
  }),
  ...(ownerState.dialogSize === 'lg' && {
    fontSize: theme.vars.fontSize.xl,
    marginInlineEnd: theme.spacing(4),
    marginBlockStart: theme.spacing(-0.5),
    marginBlockEnd: theme.spacing(2),
    lineHeight: theme.vars.lineHeight.sm,
  }),
}));

const ModalDialogTitle = React.forwardRef(function ModalDialogTitle(inProps, ref) {
  const props = useThemeProps<typeof inProps & ModalDialogTitleProps>({
    props: inProps,
    name: 'JoyModalDialogTitle',
  });

  const { className, component = 'h2', ...other } = props;

  const dialogSize = React.useContext(ModalDialogSizeContext);
  const titleId = React.useContext(ModalDialogTitleContext);

  const ownerState = {
    ...props,
    component,
    dialogSize,
  };

  const classes = useUtilityClasses();

  return (
    <ModalDialogTitleRoot
      ref={ref}
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      id={titleId}
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
