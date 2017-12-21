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
  const escapeRegex = /([[\].#*$><+~=|^:(),"'`])/g;
  let ruleCounter = 0;

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
      if (styleSheet && styleSheet.options.meta) {
        let meta = styleSheet.options.meta;
        // Sanitize the string as will be used to prefix the generated class name.
        meta = meta.replace(escapeRegex, '-');

        if (meta.match(/^Mui/)) {
          return `${meta}-${rule.key}`;
        }

        if (process.env.NODE_ENV !== 'production') {
          return `${meta}-${rule.key}-${ruleCounter}`;
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

    if (styleSheet && styleSheet.options.meta) {
      let meta = styleSheet.options.meta;
      // Sanitize the string as will be used to prefix the generated class name.
      meta = meta.replace(escapeRegex, '-');

      return `${meta}-${rule.key}-${ruleCounter}`;
    }

    return `${rule.key}-${ruleCounter}`;
  };
}
