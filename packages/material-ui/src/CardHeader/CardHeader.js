import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = theme => ({
  root: theme.mixins.gutters({
    display: 'flex',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  }),
  avatar: {
    flex: '0 0 auto',
    marginRight: 16,
  },
  action: {
    flex: '0 0 auto',
    alignSelf: 'flex-start',
    marginTop: -8,
    marginRight: -16,
  },
  content: {
    flex: '1 1 auto',
  },
  title: {},
  subheader: {},
});

function CardHeader(props) {
  const {
    action,
    avatar,
    classes,
    className: classNameProp,
    component: Component,
    subheader,
    title,
    primaryTypographyProps,
    secondaryTypographyProps,
    ...other
  } = props;

  return (
    <Component className={classNames(classes.root, classNameProp)} {...other}>
      {avatar && <div className={classes.avatar}>{avatar}</div>}
      <div className={classes.content}>
        <Typography
          variant={avatar ? 'body2' : 'headline'}
          component="span"
          className={classes.title}
          {...primaryTypographyProps}
        >
          {title}
        </Typography>
        {subheader && (
          <Typography
            variant={avatar ? 'body2' : 'body1'}
            component="span"
            color="textSecondary"
            className={classes.subheader}
            {...secondaryTypographyProps}
          >
            {subheader}
          </Typography>
        )}
      </div>
      {action && <div className={classes.action}>{action}</div>}
    </Component>
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
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  /**
   * The content of the component.
   */
  subheader: PropTypes.node,
  /**
   * The content of the Card Title.
   */
  title: PropTypes.node,
  /**
   * These props will be forwarded to the title
   * (as long as disableTypography is not `true`).
   */
  primaryTypographyProps: PropTypes.object,
  /**
   * These props will be forwarded to the subheader
   * (as long as disableTypography is not `true`).
   */
  secondaryTypographyProps: PropTypes.object,
};

CardHeader.defaultProps = {
  component: 'div',
};

export default withStyles(styles, { name: 'MuiCardHeader' })(CardHeader);
