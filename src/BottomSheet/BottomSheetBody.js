import React, {PropTypes} from 'react';
import transitions from '../styles/transitions';
import withWidth, {SMALL} from '../utils/withWidth';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';

function getStyles(props, context) {
  const {
    open,
    modal,
    persistent,
    inset,
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
      maxWidth: isSmall && modal ? 'inherit' : inset ? 960 : '100%',
      minWidth: isSmall && modal ? 'inherit' : 288,
      width: isSmall && modal ? `100vw` : modal ? 'auto' : '100vw',
      flexGrow: isSmall && modal ? 1 : 0,
    },
    content: {
      fontSize: 14,
      color: textColor,
      paddingTop: 0,
      paddingRight: isSmall && modal ? 16 : persistent ? 24 : 0,
      paddingLeft: isSmall && modal ? 16 : persistent ? 24 : 0,
      opacity: open ? 1 : 0,
      transition: open ?
        transitions.easeOut('500ms', 'opacity', '100ms') :
        transitions.easeOut('400ms', 'opacity'),
    },
    action: {
      position: 'absolute',
      color: actionColor,
      right: 32,
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
    modal,
    persistent,
    inset,
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
   * Controls whether the `BottomSheet` is modular
   */
  modal: PropTypes.bool,
  /**
   * Controls whether the `BottomSheet` is persistent
   */
  persistent: PropTypes.bool,
  /**
   * Controls whether the `BottomSheet` is inset
   */
  inset: PropTypes.bool,
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
