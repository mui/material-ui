// @inheritedComponent CardContent

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import CardContent from './CardContent';

export const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    flex: '0 0 auto',
    marginRight: theme.spacing.unit * 2,
  },
  action: {
    flex: '0 0 auto',
    alignSelf: 'flex-start',
    marginTop: theme.spacing.unit * -1,
    marginRight: theme.spacing.unit * -2,
  },
  content: {
    flex: '1 1 auto',
  },
  title: {},
  subheader: {},
});

function CardHeader(props) {
  const { avatar, action, classes, className: classNameProp, subheader, title, ...other } = props;

  return (
    <CardContent className={classNames(classes.root, classNameProp)} {...other}>
      {avatar && <div className={classes.avatar}>{avatar}</div>}
      <div className={classes.content}>
        <Typography type={avatar ? 'body2' : 'headline'} component="span" className={classes.title}>
          {title}
        </Typography>
        {subheader && (
          <Typography
            type={avatar ? 'body2' : 'body1'}
            component="span"
            color="secondary"
            className={classes.subheader}
          >
            {subheader}
          </Typography>
        )}
      </div>
      {action && <div className={classes.action}>{action}</div>}
    </CardContent>
  );
}

CardHeader.propTypes = {
  /**
   * The action to display in the card header.
   */
  action: PropTypes.node,
  /**
   * The Avatar for the Card Header.
   */
  avatar: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The content of the component.
   */
  subheader: PropTypes.node,
  /**
   * The content of the Card Title.
   */
  title: PropTypes.node,
};

export default withStyles(styles, { name: 'MuiCardHeader' })(CardHeader);
