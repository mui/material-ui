import merge from './merge';

function compose(...styles) {
  const fn = props => styles.reduce((acc, style) => merge(acc, style(props)), {});

  fn.propTypes =
    process.env.NODE_ENV !== 'production'
      ? styles.reduce((acc, style) => Object.assign(acc, style.propTypes), {})
      : {};

  fn.filterProps = styles.reduce((acc, style) => acc.concat(style.filterProps), []);

  return fn;
}

export default compose;
