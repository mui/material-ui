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
    disableTypography,
    titleTypographyProps,
    subHeaderTypographyProps,
    ...other
  } = props;

  let titleComponent = title;
  if (!disableTypography && !!title) {
    titleComponent = (<Typography
      variant={avatar ? 'body2' : 'headline'}
      component="span"
      className={classes.title}
      {...titleTypographyProps}
    >
      {title}
    </Typography>);
  }

  let subHeaderComponent = subheader;
  if (!disableTypography && !!subheader) {
    subHeaderComponent = (
      <Typography
        variant={avatar ? 'body2' : 'body1'}
        component="span"
        color="textSecondary"
        className={classes.subheader}
        {...subHeaderTypographyProps}
      >
        {subheader}
      </Typography>
    )
  }

  return (
    <Component className={classNames(classes.root, classNameProp)} {...other}>
      {avatar && <div className={classes.avatar}>{avatar}</div>}
      <div className={classes.content}>
        {title &&
          {titleComponent}
        }
        {subheader &&
          {subHeaderComponent}
        }
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
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `title`) text, and optional `subheader` text
   * with the Typography component.
   */
  disableTypography: PropTypes.bool,
  /**
   * These props will be forwarded to the title
   * (as long as disableTypography is not `true`).
   */
  titleTypographyProps: PropTypes.object,
  /**
   * These props will be forwarded to the subHeader
   * (as long as disableTypography is not `true`).
   */
  subHeaderTypographyProps: PropTypes.object,
};

CardHeader.defaultProps = {
  disableTypography: false,
  component: 'div',
};

export default withStyles(styles, { name: 'MuiCardHeader' })(CardHeader);
