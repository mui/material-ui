import React from 'react';
import clsx from 'clsx';
import {
  borders,
  compose,
  display,
  flexbox,
  grid,
  palette,
  positions,
  shadows,
  sizing,
  spacing,
  typography,
  css,
  styleFunctionInversed,
} from '@material-ui/system';
import styled from '../styles/experimentalStyled';

export const styleFunction = css(
  compose(
    borders,
    display,
    flexbox,
    grid,
    positions,
    palette,
    shadows,
    sizing,
    spacing,
    typography,
  ),
);

function omit(input, fields) {
  const output = {};

  Object.keys(input).forEach((prop) => {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });

  return output;
}

const boxProps = [
  // borders
  'border',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borderColor',
  'borderRadius',

  // display
  'display',
  'displayPrint',
  'overflow',
  'textOverflow',
  'visibility',
  'whiteSpace',

  // flexbox
  'flexBasis',
  'flexDirection',
  'flexWrap',
  'justifyContent',
  'alignItems',
  'alignContent',
  'order',
  'flex',
  'flexGrow',
  'flexShrink',
  'alignSelf',
  'justifyItems',
  'justifySelf',

  // grid
  'gridGap',
  'gridColumnGap',
  'gridRowGap',
  'gridColumn',
  'gridRow',
  'gridAutoFlow',
  'gridAutoColumns',
  'gridAutoRows',
  'gridTemplateColumns',
  'gridTemplateRows',
  'gridTemplateAreas',
  'gridArea',

  // positions
  'zIndex',
  'position',
  'top',
  'right',
  'bottom',
  'left',

  // palette
  'bgcolor',
  'color',

  // shadows
  'boxShadow',

  // sizing
  'width',
  'maxWidth',
  'minWidth',
  'height',
  'maxHeight',
  'minHeight',
  'sizeWidth',
  'sizeHeight',
  'boxSizing',

  // spacing
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingX',
  'paddingY',

  // typography
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'textAlign',
];

/**
 * @ignore - do not document.
 */
const BoxRoot = React.forwardRef(function StyledComponent(props, ref) {
  const { children, clone, className, component: Component = 'div', ...other } = props;

  const spread = omit(other, boxProps);

  if (clone) {
    return React.cloneElement(children, {
      className: clsx(children.props.className, className),
      ...spread,
    });
  }

  if (typeof children === 'function') {
    return children({ className, ...spread });
  }

  return (
    <Component ref={ref} className={className} {...spread}>
      {children}
    </Component>
  );
});

const shouldForwardProp = (prop) => boxProps.indexOf(prop) === -1;

/**
 * @ignore - do not document.
 */
const Box = styled(BoxRoot, { shouldForwardProp }, { muiName: 'MuiBox' })(styleFunctionInversed);

export default Box;
