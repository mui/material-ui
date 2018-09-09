/* eslint-disable no-underscore-dangle */

import warning from 'warning';
// The counter-based approach doesn't tolerate any mistake.
// It's much safer to use the same counter everywhere.
// However, because we allow people to get started without any configuration,
// we need to handle the generator duplication case. It can happen when more than one
// generator is used.
// We are avoiding class name collisions with a seed, one per package installation.
import packageId from './packageId';

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
  const {
    dangerouslyUseGlobalCSS = false,
    productionPrefix = 'jss',
    seed = `${packageId}-`,
  } = options;
  let ruleCounter = 0;

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
      if (styleSheet) {
        if (styleSheet.options.name) {
          return `${styleSheet.options.name}-${rule.key}`;
        }

        if (styleSheet.options.classNamePrefix && process.env.NODE_ENV !== 'production') {
          const prefix = safePrefix(styleSheet.options.classNamePrefix);
          return `${prefix}-${rule.key}-${seed}${ruleCounter}`;
        }
      }

      if (process.env.NODE_ENV === 'production') {
        return `${productionPrefix}${seed}${ruleCounter}`;
      }

      return `${rule.key}-${seed}${ruleCounter}`;
    }

    if (process.env.NODE_ENV === 'production') {
      return `${productionPrefix}${seed}${ruleCounter}`;
    }

    if (styleSheet && styleSheet.options.classNamePrefix) {
      const prefix = safePrefix(styleSheet.options.classNamePrefix);

      return `${prefix}-${rule.key}-${seed}${ruleCounter}`;
    }

    return `${rule.key}-${seed}${ruleCounter}`;
  };
}
