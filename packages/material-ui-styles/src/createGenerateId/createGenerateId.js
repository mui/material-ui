import warning from 'warning';
import hyphenate from 'hyphenate-style-name';

const escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;

function globalClassName(className) {
  return hyphenate(className.charAt(0).toLowerCase() + className.slice(1));
}

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
// https://github.com/cssinjs/jss/blob/4e6a05dd3f7b6572fdd3ab216861d9e446c20331/src/utils/createGenerateId.js
export default function createGenerateId(options = {}) {
  const { globalClassNames = false, productionPrefix = '', seed = '' } = options;
  let ruleCounter = 0;

  return (rule, styleSheet) => {
    const isStatic = !styleSheet.options.link;

    if (globalClassNames && styleSheet && styleSheet.options.name && isStatic) {
      return globalClassName(
        `${safePrefix(styleSheet.options.name)}${rule.key === 'root' ? '' : `-${rule.key}`}${seed}`,
      );
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

    // Help with debuggability.
    if (styleSheet.options.classNamePrefix) {
      return `${safePrefix(styleSheet.options.classNamePrefix)}-${rule.key}-${seed}${ruleCounter}`;
    }

    return `${rule.key}-${seed}${ruleCounter}`;
  };
}
