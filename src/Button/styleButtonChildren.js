import React, {Children} from 'react';

export default function styleButtonChildren(context, children, styles) {
  const {prepareStyles} = context.muiTheme;

  return Children.toArray(children).map((currentChild, index) => {
    if (!currentChild) {
      return null;
    }

    // If the current child is a label
    if (!currentChild.type) {
      return (
        <span style={prepareStyles(Object.assign({}, styles.label))} key={index}>
          {currentChild}
        </span>
      );
      // Otherwise, if the current child is an icon
    } else if (currentChild.type.muiName === 'FontIcon' || currentChild.type.muiName === 'SvgIcon') {
      return React.cloneElement(currentChild, {
        style: Object.assign({}, styles.icon, currentChild.props.style),
        color: currentChild.props.color || styles.icon.color,
        key: index,
      });
    } else {
      return currentChild;
    }
  }, this);
}
