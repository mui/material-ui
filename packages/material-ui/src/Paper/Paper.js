import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import useTheme from '../styles/useTheme';
import { getPaperUtilityClass } from './paperClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(
    {
      ...styles[styleProps.variant],
      ...(!styleProps.square && styles.rounded),
      ...(styleProps.variant === 'elevation' && styles[`elevation${styleProps.elevation}`]),
    },
    styles.root || {},
  );
};

const useUtilityClasses = (styleProps) => {
  const { square, elevation, variant, classes } = styleProps;

  const slots = {
    root: [
      'root',
      variant,
      !square && 'rounded',
      variant === 'elevation' && `elevation${elevation}`,
    ],
  };

  return composeClasses(slots, getPaperUtilityClass, classes);
};

const PaperRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiPaper',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme, styleProps }) => {
  return {
    /* Styles applied to the root element. */
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    transition: theme.transitions.create('box-shadow'),
    /* Styles applied to the root element unless `square={true}`. */
    ...(!styleProps.square && {
      borderRadius: theme.shape.borderRadius,
    }),
    /* Styles applied to the root element if `variant="outlined"`. */
    ...(styleProps.variant === 'outlined' && {
      border: `1px solid ${theme.palette.divider}`,
    }),
    /* Styles applied to the root element if `variant="elevation"`. */
    ...(styleProps.variant === 'elevation' && {
      boxShadow: theme.shadows[styleProps.elevation],
    }),
  };
});

const Paper = React.forwardRef(function Paper(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiPaper' });

  const {
    className,
    component = 'div',
    elevation = 1,
    square = false,
    variant = 'elevation',
    ...other
  } = props;

  const styleProps = {
    ...props,
    component,
    elevation,
    square,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme();
    if (theme.shadows[elevation] === undefined) {
      console.error(
        [
          `Material-UI: The elevation provided <Paper elevation={${elevation}}> is not available in the theme.`,
          `Please make sure that \`theme.shadows[${elevation}]\` is defined.`,
        ].join('\n'),
      );
    }
  }

  return (
    <PaperRoot
      as={component}
      styleProps={styleProps}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    />
  );
});

Paper.propTypes = {
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: chainPropTypes(PropTypes.number, (props) => {
    const { elevation, variant } = props;
    if (elevation > 0 && variant === 'outlined') {
      return new Error(
        `Material-UI: Combining \`elevation={${elevation}}\` with \`variant="${variant}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`,
      );
    }

    return null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['elevation', 'outlined']),
    PropTypes.string,
  ]),
};

export default Paper;
