import hash from '@emotion/hash';

function safePrefix(classNamePrefix) {
  const prefix = String(classNamePrefix);
  if (process.env.NODE_ENV !== 'production') {
    if (prefix.length >= 256) {
      console.error(`Material-UI: The class name prefix is too long: ${prefix}.`);
    }
  }

  return prefix;
}

const themeHashCache = {};

/**
 * Beta feature.
 *
 * This is an alternative to createGenerateClassName.js.
 * Instead of using a index counter, it hash the style sheets to generate the class name.
 * The class name call order invariant. With this property, we can cache the style sheets on the server.
 */
export default function createGenerateClassNameHash(options = {}) {
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
      if (process.env.NODE_ENV !== 'production') {
        if (ruleCounter >= 1e10) {
          console.warn(
            [
              'Material-UI: You might have a memory leak.',
              'The ruleCounter is not supposed to grow that much.',
            ].join(''),
          );
        }
      }

      suffix = ruleCounter;
    }

    if (process.env.NODE_ENV === 'production') {
      return `${productionPrefix}${seed}${suffix}`;
    }

    // Help with debuggability.
    if (styleSheet.options.classNamePrefix) {
      return `${safePrefix(styleSheet.options.classNamePrefix)}-${rule.key}-${seed}${suffix}`;
    }

    return `${rule.key}-${seed}${suffix}`;
  };
}
