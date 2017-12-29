import warning from 'warning';

let generatorCounter = 0;

// Returns a function which generates unique class names based on counters.
// When new generator function is created, rule counter is reset.
// We need to reset the rule counter for SSR for each request.
//
// It's inspired by
// https://github.com/cssinjs/jss/blob/4e6a05dd3f7b6572fdd3ab216861d9e446c20331/src/utils/createGenerateClassName.js
export default function createGenerateClassName(options = {}) {
  const { dangerouslyUseGlobalCSS = false } = options;
  const escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
  let ruleCounter = 0;

  // HMR can lead us to instantiating many class name generator.
  // The warning is only triggered in production.
  // We expect people from instantiating a class name generator per new request on the server.
  // The warning is only triggered client side.
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    generatorCounter += 1;

    if (generatorCounter > 2) {
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
        let classNamePrefix = styleSheet.options.classNamePrefix;
        // Sanitize the string as will be used to prefix the generated class name.
        classNamePrefix = classNamePrefix.replace(escapeRegex, '-');

        if (classNamePrefix.match(/^Mui/)) {
          return `${classNamePrefix}-${rule.key}`;
        }

        if (process.env.NODE_ENV !== 'production') {
          return `${classNamePrefix}-${rule.key}-${ruleCounter}`;
        }
      }

      if (process.env.NODE_ENV === 'production') {
        return `c${ruleCounter}`;
      }

      return `${rule.key}-${ruleCounter}`;
    }

    if (process.env.NODE_ENV === 'production') {
      return `c${ruleCounter}`;
    }

    if (styleSheet && styleSheet.options.classNamePrefix) {
      let classNamePrefix = styleSheet.options.classNamePrefix;
      // Sanitize the string as will be used to prefix the generated class name.
      classNamePrefix = classNamePrefix.replace(escapeRegex, '-');

      return `${classNamePrefix}-${rule.key}-${ruleCounter}`;
    }

    return `${rule.key}-${ruleCounter}`;
  };
}
