import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { getDialogContentUtilityClass } from './dialogContentClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, dividers } = styleProps;

  const slots = {
    root: ['root', dividers && 'dividers'],
  };

  return composeClasses(slots, getDialogContentUtilityClass, classes);
};

const DialogContentRoot = experimentalStyled('div', {
  name: 'MuiDialogContent',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return {
      ...styles.root,
      ...(styleProps.dividers && styles.dividers),
    };
  },
})(({ theme, styleProps }) => ({
  /* Styles applied to the root element. */
  flex: '1 1 auto',
  WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
  overflowY: 'auto',
  padding: '8px 24px',
  '&:first-of-type': {
    // dialog without title
    paddingTop: 20,
  },
  /* Styles applied to the root element if `dividers={true}`. */
  ...(styleProps.dividers && {
    padding: '16px 24px',
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
}));

const DialogContent = React.forwardRef(function DialogContent(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDialogContent',
  });

  const { className, dividers = false, ...other } = props;
  const styleProps = { ...props, dividers };
  const classes = useUtilityClasses(styleProps);

  return (
    <DialogContentRoot
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    />
  );
});

DialogContent.propTypes /* remove-proptypes */ = {
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
   * Display the top and bottom dividers.
   * @default false
   */
  dividers: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default DialogContent;
