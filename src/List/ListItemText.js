// @flow weak

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = (theme: Object) => ({
  root: {
    flex: '1 1 auto',
    padding: '0 16px',
    '&:first-child': {
      paddingLeft: 0,
    },
  },
  inset: {
    '&:first-child': {
      paddingLeft: theme.spacing.unit * 7,
    },
  },
  dense: {
    fontSize: 13,
  },
  text: {}, // Present to allow external customization
  textDense: {
    fontSize: 'inherit',
  },
});

function ListItemText(props, context) {
  const {
    classes,
    className: classNameProp,
    disableTypography,
    primary,
    secondary,
    inset,
    ...other
  } = props;
  const { dense } = context;
  const className = classNames(
    classes.root,
    {
      [classes.dense]: dense,
      [classes.inset]: inset,
    },
    classNameProp,
  );

  return (
    <div className={className} {...other}>
      {primary &&
        (disableTypography
          ? primary
          : <Typography
              type="subheading"
              className={classNames(classes.text, { [classes.textDense]: dense })}
            >
              {primary}
            </Typography>)}
      {secondary &&
        (disableTypography
          ? secondary
          : <Typography
              color="secondary"
              type="body1"
              className={classNames(classes.text, { [classes.textDense]: dense })}
            >
              {secondary}
            </Typography>)}
    </div>
  );
}

ListItemText.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, that can be useful to can render an h4 instead of a
   */
  disableTypography: PropTypes.bool,
  /**
   * If `true`, the children will be indented.
   * This should be used if there is no left avatar or left icon.
   */
  inset: PropTypes.bool,
  primary: PropTypes.node,
  secondary: PropTypes.node,
};

ListItemText.defaultProps = {
  disableTypography: false,
  primary: false,
  secondary: false,
  inset: false,
};

ListItemText.contextTypes = {
  dense: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiListItemText' })(ListItemText);
