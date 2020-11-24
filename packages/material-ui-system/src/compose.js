import merge from './merge';

function compose(...styles) {
  const fn = (props) =>
    styles.reduce((acc, style) => {
      const output = style(props);

      if (output) {
        return merge(acc, output);
      }

      return acc;
    }, {});

  // Alternative approach that doesn't yield any performance gain.
  // const handlers = styles.reduce((acc, style) => {
  //   style.filterProps.forEach(prop => {
  //     acc[prop] = style;
  //   });

  //   return acc;
  // }, {});

  // const fn = props => {
  //   return Object.keys(props).reduce((acc, prop) => {
  //     if (handlers[prop]) {
  //       return merge(acc, handlers[prop](props));
  //     }

  //     return acc;
  //   }, {});
  // };

  fn.propTypes =
    process.env.NODE_ENV !== 'production'
      ? styles.reduce((acc, style) => Object.assign(acc, style.propTypes), {})
      : {};

  fn.filterProps = styles.reduce((acc, style) => acc.concat(style.filterProps), []);

  return fn;
}

export default compose;
