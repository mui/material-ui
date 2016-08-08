import React, {PropTypes} from 'react';
import transitions from '../styles/transitions';
import withWidth, {SMALL} from '../utils/withWidth';
import FlatButton from '../FlatButton';

function getStyles(props, context) {
  const {
    open,
    width,
  } = props;

  const {
    muiTheme: {
      baseTheme: {
        spacing: {
          desktopGutter,
          desktopSubheaderHeight,
        },
        fontFamily,
      },
      snackbar: {
        backgroundColor,
        textColor,
        actionColor,
      },
    },
  } = context;

  const isSmall = width === SMALL;

  const styles = {
    root: {
      fontFamily: fontFamily,
      backgroundColor: backgroundColor,
      padding: `0 ${desktopGutter}px`,
      height: desktopSubheaderHeight,
      lineHeight: `${desktopSubheaderHeight}px`,
      borderRadius: isSmall ? 0 : 2,
      maxWidth: isSmall ? 'inherit' : 568,
      minWidth: isSmall ? 'inherit' : 288,
      flexGrow: isSmall ? 1 : 0,
      margin: 'auto',
    },
    content: {
      fontSize: 14,
      color: textColor,
      opacity: open ? 1 : 0,
      transition: open ?
        transitions.easeOut('500ms', 'opacity', '100ms') :
        transitions.easeOut('400ms', 'opacity'),
    },
    action: {
      color: actionColor,
      float: 'right',
      marginTop: 6,
      marginRight: -16,
      marginLeft: desktopGutter,
      backgroundColor: 'transparent',
    },
  };

  return styles;
}

export const SnackbarBody = (props, context) => {
  const {
    open, // eslint-disable-line no-unused-vars
    action,
    message,
    onActionTouchTap,
    style,
    ...other,
  } = props;

  const {prepareStyles} = context.muiTheme;
  const styles = getStyles(props, context);

  const actionButton = action && (
    <FlatButton
      style={styles.action}
      label={action}
      onTouchTap={onActionTouchTap}
    />
  );

  return (
    <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
      <div style={prepareStyles(styles.content)}>
        <span>{message}</span>
        {actionButton}
      </div>
    </div>
  );
};

SnackbarBody.propTypes = {
  /**
   * The label for the action on the snackbar.
   */
  action: PropTypes.node,
  /**
   * The message to be displayed.
   *
   * (Note: If the message is an element or array, and the `Snackbar` may re-render while it is still open,
   * ensure that the same object remains as the `message` property if you want to avoid the `Snackbar` hiding and
   * showing again)
   */
  message: PropTypes.node.isRequired,
  /**
   * Fired when the action button is touchtapped.
   *
   * @param {object} event Action button event.
   */
  onActionTouchTap: PropTypes.func,
  /**
   * @ignore
   * Controls whether the `Snackbar` is opened or not.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * @ignore
   * Width of the screen.
   */
  width: PropTypes.number.isRequired,
};

SnackbarBody.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default withWidth()(SnackbarBody);
