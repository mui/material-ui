import warning from 'warning';
import hash from '@emotion/hash';

const escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;

function safePrefix(classNamePrefix) {
  const prefix = String(classNamePrefix);
  warning(prefix.length < 256, `Material-UI: the class name prefix is too long: ${prefix}.`);
  // Sanitize the string as will be used to prefix the generated class name.
  return prefix.replace(escapeRegex, '-');
}

const themeHashCache = {};

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

    let suffix;

    // It's a static rule.
    if (isStatic) {
      let themeHash = themeHashCache[styleSheet.options.theme];
      if (!themeHash) {
        themeHash = hash(JSON.stringify(styleSheet.options.theme));
        themeHashCache[styleSheet.theme] = themeHash;
      }
      const raw = styleSheet.rules.raw[rule.key];
      suffix = hash(`${themeHash}${rule.key}${JSON.stringify(raw)}`);
    }

    if (!suffix) {
      ruleCounter += 1;
      warning(
        ruleCounter < 1e10,
        [
          'Material-UI: you might have a memory leak.',
          'The ruleCounter is not supposed to grow that much.',
        ].join(''),
      );

      suffix = ruleCounter;
    }

    if (process.env.NODE_ENV === 'production') {
      return `${productionPrefix}${seed}${suffix}`;
    }

    // Help with debuggability.
    if (styleSheet && styleSheet.options.classNamePrefix) {
      return `${safePrefix(styleSheet.options.classNamePrefix)}-${rule.key}-${seed}${suffix}`;
    }

    return `${rule.key}-${seed}${suffix}`;
  };
}
