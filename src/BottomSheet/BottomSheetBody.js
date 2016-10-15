import React, {PropTypes} from 'react';
import transitions from '../styles/transitions';
import withWidth, {SMALL} from '../utils/withWidth';

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

  };

  return styles;
}

export const BottomSheetBody = (props, context) => {
  const {
    children,
    contentStyle,
    open, // eslint-disable-line no-unused-vars
    style,
    ...other,
  } = props;

  const {prepareStyles} = context.muiTheme;
  const styles = getStyles(props, context);



  return (
    <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>

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
