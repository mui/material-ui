import {createSelector, createWrapper} from 'react-memo';

function transformToSelector(styles) {
  const selectors = [];

  Object.keys(styles).forEach((key) => {
    const selector = styles[key];

    if (Array.isArray(selector)) {

      const valueSelectors = selector.slice(0, -1);
      const propertySelector = selector[selector.length - 1];
      selectors.push(createSelector(key, valueSelectors, propertySelector));

    } else if (typeof selector === 'function') {

      selectors.push(createSelector(key, selector));

    } else {

      selectors.push(createSelector(key, () => selector));

    }
  });

  return selectors;
}

function memoizeStyles(styles) {
  return (Component) => createWrapper(transformToSelector(styles))(Component);
}

export default memoizeStyles;
