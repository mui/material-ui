import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiTypography from '@material-ui/core/Typography';

export let TypographyMarkType;
(function (TypographyMarkType) {
  TypographyMarkType['Center'] = 'center';
  TypographyMarkType['Left'] = 'left';
  TypographyMarkType['None'] = 'none';
})(TypographyMarkType || (TypographyMarkType = {}));

const markSyleMapping = {
  [TypographyMarkType.Center]: {
    h1: '',
    h2: 'markedH2Center',
    h3: 'markedH3Center',
    h4: 'markedH4Center',
    h5: '',
    h6: '',
  },
  [TypographyMarkType.Left]: {
    h1: '',
    h2: '',
    h3: '',
    h4: '',
    h5: '',
    h6: 'markedH6Left',
  },
  [TypographyMarkType.None]: {
    h1: '',
    h2: '',
    h3: '',
    h4: '',
    h5: '',
    h6: '',
  },
};

const styles = (theme) => ({
  [markSyleMapping[TypographyMarkType.Center]['h2']]: {
    height: 4,
    width: 73,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  [markSyleMapping[TypographyMarkType.Center]['h3']]: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  [markSyleMapping[TypographyMarkType.Center]['h4']]: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  [markSyleMapping[TypographyMarkType.Left]['h6']]: {
    height: 2,
    width: 28,
    display: 'block',
    marginTop: theme.spacing(0.5),
    background: 'currentColor',
  },
});

const variantMapping = {
  h1: 'h1',
  h2: 'h1',
  h3: 'h1',
  h4: 'h1',
  h5: 'h3',
  h6: 'h2',
  subtitle1: 'h3',
};

function Typography(props) {
  const { children, variant, classes, marked, ...other } = props;

  let className = '';
  if (marked && variant && variant in markSyleMapping[marked]) {
    className = classes[markSyleMapping[marked][variant]];
  }

  return (
    <MuiTypography variantMapping={variantMapping} variant={variant} {...other}>
      {children}
      {marked ? <span className={className} /> : null}
    </MuiTypography>
  );
}

Typography.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  marked: PropTypes.oneOf(['center', 'left', 'none']),
  /**
   * Applies the theme typography styles.
   */
  variant: PropTypes.oneOf([
    'body1',
    'body2',
    'button',
    'caption',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'inherit',
    'overline',
    'subtitle1',
    'subtitle2',
  ]),
};

Typography.defaultProps = {
  marked: TypographyMarkType.None,
};

export default withStyles(styles)(Typography);
