import merge from './merge';
import style from './style';

function compose(...styles) {
  const configs = styles.reduce((acc, style) => ({...acc, ...style.config}), {});
  const fn = style(configs);

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

  return fn;
}

export default compose;
