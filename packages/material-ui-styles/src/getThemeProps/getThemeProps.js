/* eslint-disable no-restricted-syntax */

function getThemeProps(params) {
  const { theme, name, props } = params;

  if (!theme || !theme.props || !theme.props[name]) {
    return props;
  }

  // Resolve default props, code borrow from React source.
  // https://github.com/facebook/react/blob/15a8f031838a553e41c0b66eb1bcf1da8448104d/packages/react/src/ReactElement.js#L221
  const defaultProps = theme.props[name];
  let propName;

  for (propName in defaultProps) {
    if (props[propName] === undefined) {
      props[propName] = defaultProps[propName];
    }
  }

  return props;
}

export default getThemeProps;
