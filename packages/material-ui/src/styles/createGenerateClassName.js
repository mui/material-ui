/* eslint-disable no-underscore-dangle */

import warning from 'warning';

// People might bundle this classname generator twice.
// We need to use a global.
global.__MUI_GENERATOR_COUNTER__ = 0;

const escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;

function safePrefix(classNamePrefix) {
  const prefix = String(classNamePrefix);
  warning(prefix.length < 256, `Material-UI: the class name prefix is too long: ${prefix}.`);
  // Sanitize the string as will be used to prefix the generated class name.
  return prefix.replace(escapeRegex, '-');
}

// Returns a function which generates unique class names based on counters.
// When new generator function is created, rule counter is reset.
// We need to reset the rule counter for SSR for each request.
//
// It's inspired by
// https://github.com/cssinjs/jss/blob/4e6a05dd3f7b6572fdd3ab216861d9e446c20331/src/utils/createGenerateClassName.js
export default function createGenerateClassName(options = {}) {
  const { dangerouslyUseGlobalCSS = false, productionPrefix = 'jss' } = options;
  let ruleCounter = 0;

  // - HMR can lead to many class name generators being instantiated,
  // so the warning is only triggered in production.
  // - We expect a class name generator to be instantiated per new request on the server,
  // so the warning is only triggered client side.
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    global.__MUI_GENERATOR_COUNTER__ += 1;

    if (global.__MUI_GENERATOR_COUNTER__ > 2) {
      // eslint-disable-next-line no-console
      console.error(
        [
          'Material-UI: we have detected more than needed creation of the class name generator.',
          'You should only use one class name generator on the client side.',
          'If you do otherwise, you take the risk to have conflicting class names in production.',
        ].join('\n'),
      );
    }
  }

  return (rule, styleSheet) => {
    ruleCounter += 1;
    warning(
      ruleCounter < 1e10,
      [
        'Material-UI: you might have a memory leak.',
        'The ruleCounter is not supposed to grow that much.',
      ].join(''),
    );

    // Code branch the whole block at the expense of more code.
    if (dangerouslyUseGlobalCSS) {
      if (styleSheet && styleSheet.options.classNamePrefix) {
        const prefix = safePrefix(styleSheet.options.classNamePrefix);

        if (prefix.match(/^Mui/)) {
          return `${prefix}-${rule.key}`;
        }

        if (process.env.NODE_ENV !== 'production') {
          return `${prefix}-${rule.key}-${ruleCounter}`;
        }
      }

      if (process.env.NODE_ENV === 'production') {
        return `${productionPrefix}${ruleCounter}`;
      }

      return `${rule.key}-${ruleCounter}`;
    }

    if (process.env.NODE_ENV === 'production') {
      return `${productionPrefix}${ruleCounter}`;
    }

    if (styleSheet && styleSheet.options.classNamePrefix) {
      const prefix = safePrefix(styleSheet.options.classNamePrefix);

      return `${prefix}-${rule.key}-${ruleCounter}`;
    }

    return `${rule.key}-${ruleCounter}`;
  };
}
