import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';


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
  const { classes, className: classNameProp, separatorText } = props;
  const className = classNames(classes.root, classNameProp,);

  return <div className={className}>{separatorText}</div>;
}

BreadcrumbSeparator.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  separatorText: PropTypes.string.isRequired,
};

export default withStyles(styles, { name: 'MuiBreadcrumbSeparator' })(BreadcrumbSeparator);
