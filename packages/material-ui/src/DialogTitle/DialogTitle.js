import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Typography from '../Typography';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { getDialogTitleUtilityClass } from './dialogTitleClasses';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getDialogTitleUtilityClass, classes);
};

const DialogTitleRoot = experimentalStyled('div', {
  name: 'MuiDialogTitle',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(() => {
  return {
    /* Styles applied to the root element. */
    margin: 0,
    padding: '16px 24px',
    flex: '0 0 auto',
  };
});

const DialogTitle = React.forwardRef(function DialogTitle(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDialogTitle',
  });

  const { children, className, disableTypography = false, ...other } = props;
  const styleProps = { ...props, disableTypography };
  const classes = useUtilityClasses(styleProps);

  return (
    <DialogTitleRoot
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    >
      {disableTypography ? (
        children
      ) : (
        <Typography component="h2" variant="h6">
          {children}
        </Typography>
      )}
    </DialogTitleRoot>
  );
});

DialogTitle.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, this can be useful to render an h4 instead of the default h2.
   * @default false
   */
  disableTypography: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default DialogTitle;
