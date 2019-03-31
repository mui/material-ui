import warning from 'warning';
import { nested } from '../ThemeProvider/ThemeProvider';

function safePrefix(classNamePrefix) {
  const prefix = String(classNamePrefix);
  warning(prefix.length < 256, `Material-UI: the class name prefix is too long: ${prefix}.`);
  return prefix;
}

/**
 * This is the list of the style rule name we use as drop in replacement for the built-in
 * pseudo classes (:checked, :disabled, :focused, etc.).
 *
 * Why do they exist in the first place?
 * These classes are used at a specificity of 2.
 * It allows them to override previously definied styles as well as
 * being untouched by simple user overrides.
 */
const pseudoClasses = [
  'checked',
  'disabled',
  'error',
  'focused',
  'focusVisible',
  'required',
  'expanded',
  'selected',
];

// Returns a function which generates unique class names based on counters.
// When new generator function is created, rule counter is reset.
// We need to reset the rule counter for SSR for each request.
//
// It's inspired by
// https://github.com/cssinjs/jss/blob/4e6a05dd3f7b6572fdd3ab216861d9e446c20331/src/utils/createGenerateClassName.js
export default function createGenerateClassName(options = {}) {
  const { disableGlobal = false, productionPrefix = 'jss', seed = '' } = options;
  let ruleCounter = 0;

  return (rule, styleSheet) => {
    const isGlobal =
      !styleSheet.options.link &&
      styleSheet.options.name &&
      styleSheet.options.name.indexOf('Mui') === 0 &&
      !disableGlobal;

    if (isGlobal) {
      if (pseudoClasses.indexOf(rule.key) !== -1) {
        return rule.key;
      }

      if (!styleSheet.options.theme[nested]) {
        const prefix = `${safePrefix(styleSheet.options.name)}${seed}`;

        if (rule.key === 'root') {
          return prefix;
        }
        return `${prefix}-${rule.key}`;
      }
    }

    ruleCounter += 1;
    warning(
      ruleCounter < 1e10,
      [
        'Material-UI: you might have a memory leak.',
        'The ruleCounter is not supposed to grow that much.',
      ].join(''),
    );

    if (process.env.NODE_ENV === 'production' && productionPrefix !== '') {
      return `${productionPrefix}${seed}${ruleCounter}`;
    }

    const suffix = `${rule.key}-${seed}${ruleCounter}`;

    // Help with debuggability.
    if (styleSheet.options.classNamePrefix) {
      return `${safePrefix(styleSheet.options.classNamePrefix)}-${suffix}`;
    }

    return suffix;
  };
}
