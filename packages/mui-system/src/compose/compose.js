import fastDeepAssign from '@mui/utils/fastDeepAssign';

function compose(...styles) {
  const handlers = styles.reduce((acc, style) => {
    style.filterProps.forEach((prop) => {
      acc[prop] = style;
    });

    return acc;
  }, {});

  // eslint-disable-next-line react/function-component-definition
  const fn = (props) => {
    const result = {};
    for (const prop in props) {
      if (handlers[prop]) {
        fastDeepAssign(result, handlers[prop](props));
      }
    }
    return result;
  };

  fn.propTypes =
    process.env.NODE_ENV !== 'production'
      ? styles.reduce((acc, style) => Object.assign(acc, style.propTypes), {})
      : {};

  fn.filterProps = styles.reduce((acc, style) => acc.concat(style.filterProps), []);

  return fn;
}

export default compose;
