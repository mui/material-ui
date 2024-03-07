import merge from '../merge';

function compose(...styles) {
  const handlers = styles.reduce((acc, style) => {
    style.filterProps.forEach((prop) => {
      acc[prop] = style;
    });

    return acc;
  }, {});

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

  fn.propTypes =
    process.env.NODE_ENV !== 'production'
      ? styles.reduce((acc, style) => Object.assign(acc, style.propTypes), {})
      : {};

  fn.filterProps = styles.reduce((acc, style) => acc.concat(style.filterProps), []);

  return fn;
}

export default compose;
