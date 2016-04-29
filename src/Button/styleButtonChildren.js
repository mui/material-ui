import React, {Children} from 'react';

export default function styleButtonChildren(context, children, styles) {
  return Children.toArray(children).map((currentChild, index, array) => {
    if (!currentChild) {
      return null;
    }

    const childInfo = {};

    // If the current child is a label
    if (!currentChild.type) {
      // Check if the adjacent element is an icon
      if (array.length >= 2 && (array[1 - index].type.muiName === 'FontIcon' ||
        array[1 - index].type.muiName === 'SvgIcon')) {
        childInfo.hasIcon = true;
        if (index === 0) {
          childInfo.labelBefore = true;
        }
      }
      return (
        <span style={context.muiTheme.prepareStyles(Object.assign({}, styles.label(childInfo)))} key={index}>
          {currentChild}
        </span>
      );
      // Otherwise, if the current child is an icon
    } else if (currentChild.type.muiName === 'FontIcon' || currentChild.type.muiName === 'SvgIcon') {
      // Check if the adjacent element is a label
      if (array.length >= 2 && !array[1 - index].type) {
        childInfo.hasLabel = true;
        if (index === 1) {
          childInfo.labelBefore = true;
        }
      }
      return React.cloneElement(currentChild, {
        style: Object.assign({}, styles.icon(childInfo), currentChild.props.style),
        color: currentChild.props.color || styles.icon(childInfo).color,
        key: index,
      });
    } else {
      return currentChild;
    }
  }, this);
}
