import React, {PropTypes} from 'react';
import transitions from '../styles/transitions';
import withWidth, {SMALL} from '../utils/withWidth';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';

function getStyles(props, context) {
  const {
    open,
    action,
    width,
  } = props;

  const {
    muiTheme: {
      baseTheme: {
        spacing: {
          desktopGutter,
        },
        fontFamily,
      },
      bottomSheet: {
        actionColor,
        backgroundColor,
        textColor,
      },
      floatingActionButton: {
        buttonSize
      }
    },
  } = context;

  const isSmall = width === SMALL;

  const styles = {
    root: {
      fontFamily: fontFamily,
      backgroundColor: backgroundColor,
      maxWidth: isSmall ? 'inherit' : 568,
      minWidth: isSmall ? 'inherit' : 288,
      width: isSmall ? `calc(100vw - ${desktopGutter * 2}px)` : 'auto',
      flexGrow: isSmall ? 1 : 0,
    },
    content: {
      fontSize: 14,
      color: textColor,
      paddingTop: action ? 16 : 0,
    },
    action: {
      position: 'absolute',
      color: actionColor,
      right: 16,
      top: -29,
      transform: open ?
        'scale(1)' :
        `scale(0)`,
      transition: `${transitions.easeOut('500ms', 'transform')}`,
      transitionDelay: open ? '200ms' : '0ms',
    },

  };

  return styles;
}

export const BottomSheetBody = (props, context) => {
  const {
    action,
    children,
    contentStyle,
    open, // eslint-disable-line no-unused-vars
    onActionTouchTap,
    style,
    ...other,
  } = props;

  const {prepareStyles} = context.muiTheme;
  const styles = getStyles(props, context);

  const actionButton = action && (
      <FloatingActionButton
        zDepth={2}
        style={styles.action}
        onTouchTap={onActionTouchTap}
        disableTouchRipple={true}
      >
        <FontIcon className="material-icons">{action}</FontIcon>
      </FloatingActionButton>
    );

  return (
    <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
      {actionButton}
      <div style={prepareStyles(Object.assign(styles.content, contentStyle))}>
        {children}
      </div>
    </div>
  );
};

BottomSheetBody.propTypes = {
   /**
   * The contents of the `BottomSheet`
   */
  children: PropTypes.node,
  /**
   * The name for the floating action button on the bottom sheet. Can be any Material Design Icon: https://design.google.com/icons/ . Note: substitute spaces with `_`
   */
  action: PropTypes.string,
  /**
   * Override the inline-styles of the content element.
   */
  contentStyle: PropTypes.object,
  /**
   * Fired when the action button is touchtapped.
   *
   * @param {object} event Action button event.
   */
  onActionTouchTap: PropTypes.func,
  /**
   * Controls whether the `BottomSheet` is opened or not.
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

BottomSheetBody.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default withWidth()(BottomSheetBody);
