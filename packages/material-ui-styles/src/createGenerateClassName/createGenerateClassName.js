import warning from 'warning';

function safePrefix(classNamePrefix) {
  const prefix = String(classNamePrefix);
  warning(prefix.length < 256, `Material-UI: the class name prefix is too long: ${prefix}.`);
  return prefix;
}

// Returns a function which generates unique class names based on counters.
// When new generator function is created, rule counter is reset.
// We need to reset the rule counter for SSR for each request.
//
// It's inspired by
// https://github.com/cssinjs/jss/blob/4e6a05dd3f7b6572fdd3ab216861d9e446c20331/src/utils/createGenerateClassName.js
export default function createGenerateClassName(options = {}) {
  const { dangerouslyUseGlobalCSS = false, productionPrefix = 'jss', seed = '' } = options;
  let ruleCounter = 0;

  return (rule, styleSheet) => {
    const isStatic = !styleSheet.options.link;

    if (dangerouslyUseGlobalCSS && styleSheet && styleSheet.options.name && isStatic) {
      return `${safePrefix(styleSheet.options.name)}-${rule.key}`;
    }

    ruleCounter += 1;
    warning(
      ruleCounter < 1e10,
      [
        'Material-UI: you might have a memory leak.',
        'The ruleCounter is not supposed to grow that much.',
      ].join(''),
    );

    if (process.env.NODE_ENV === 'production') {
      return `${productionPrefix}${seed}${ruleCounter}`;
    }

    // Help with debuggability.
    if (styleSheet.options.classNamePrefix) {
      return `${safePrefix(styleSheet.options.classNamePrefix)}-${rule.key}-${seed}${ruleCounter}`;
    }

    return `${rule.key}-${seed}${ruleCounter}`;
  };
}
