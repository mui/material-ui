import merge from '../merge';

function compose(...styles) {
  const handlers = {};
  const filterProps = [];
  const propTypes = {};
  for (const style of styles) {
    style.filterProps.forEach((prop) => {
      handlers[prop] = style;
    });
    filterProps.push(...style.filterProps);
    if (process.env.NODE_ENV !== 'production') Object.assign(propTypes, style.propTypes);
  }

  // false positive
  // eslint-disable-next-line react/function-component-definition
  const fn = (props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge(acc, handlers[prop](props));
      }

      return acc;
    }, {});
  };

  fn.propTypes = process.env.NODE_ENV !== 'production' ? propTypes : {};

  fn.filterProps = filterProps;

  return fn;
}

export default compose;
