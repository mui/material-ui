import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const height = 24;

const styles = theme => ({
  root: {
    userSelect: 'none',
    display: 'inline-block',
    height,
    lineHeight: `${height}px`,
    color: theme.palette.grey[400],
    marginLeft: 4,
    marginRight: 4,
    paddingLeft: 2,
    paddingRight: 2,
  },
});

/**
 * @ignore - internal component.
 */
function BreadcrumbSeparator(props) {
  const { classes, separator: Separator, separatorText, ...other } = props;

  return Separator ? (
    React.cloneElement(Separator, { className: classes.root, ...other })
  ) : (
    <div className={classes.root} {...other}>
      {separatorText}
    </div>
  );
}

BreadcrumbSeparator.propTypes = {
  classes: PropTypes.object.isRequired,
  separator: PropTypes.element,
  separatorText: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiBreadcrumbSeparator' })(BreadcrumbSeparator);
