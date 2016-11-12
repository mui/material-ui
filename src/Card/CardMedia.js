// @flow weak
import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import { lightBlack } from '../styles/colors';
export const styleSheet = createStyleSheet('CardMedia', () => ({
  cardMedia: {
    position: 'relative',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  overlay: {
    height: '100%',
    position: 'relative',
  },
  overlayContent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingTop: 8,
    background: lightBlack,
  },
  media: {},
  mediaChild: {
    verticalAlign: 'top',
    maxWidth: '100%',
    minWidth: '100%',
    width: '100%',
  }
}));
export default function CardMedia(props, context) {
  const {
    className: classNameProp,
    children,
    mediaCls,
    overlay,
    overlayContainerCls,
    overlayContentCls,
    overlayCls,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.cardMedia, classNameProp);
  const extendedOverlayContainerCls = classNames(classes.overlayContainer, overlayContainerCls);
  const extendedOverlayContentCls = classNames(classes.overlayContent, overlayContentCls);
  const extendedOverlayCls = classNames(classes.overlay, overlayCls);

  let myChildren;
  if (typeof children === "string") {
    myChildren = children;
  } else {
    myChildren = React.Children.map(children, (child) => {
      const extendedmediaChildCls = classNames(child.props.className, classes.mediaChild, mediaCls);
      const props = {
        style: (child.props.style) ? child.props.style : {},
        className: extendedmediaChildCls
      };
      console.log(props)
      return React.cloneElement(child, props);
    });
  }
  return (
    <div className={className} {...other}>
      {myChildren}
      {overlay ?
        <div className={extendedOverlayContainerCls}>
          <div className={extendedOverlayCls}>
            <div className={extendedOverlayContentCls}>
              {overlay}
            </div>
          </div>
        </div> : ''}
    </div>
  );
}
CardMedia.propTypes = {
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  children: PropTypes.node,
  /**
   * Override the inline-styles of the Card Media.
   */
  mediaCls: PropTypes.object,
  /**
   * Can be used to render overlay element in Card Media.
   */
  overlay: PropTypes.node,
  /**
   * Override the inline-styles of the overlay container.
   */
  overlayContainerCls: PropTypes.object,
  /**
   * Override the inline-styles of the overlay content.
   */
  overlayContentCls: PropTypes.object,
  /**
   * Override the inline-styles of the overlay element.
   */
  overlayCls: PropTypes.object
};
CardMedia.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
