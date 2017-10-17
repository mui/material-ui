// @flow

import warning from 'warning';
import type StyleSheet from 'jss/lib/StyleSheet';
import type { Rule, generateClassName } from 'jss/lib/types';

let generatorCounter = 0;

// Returns a function which generates unique class names based on counters.
// When new generator function is created, rule counter is reset.
// We need to reset the rule counter for SSR for each request.
//
// It's an improved version of
// https://github.com/cssinjs/jss/blob/4e6a05dd3f7b6572fdd3ab216861d9e446c20331/src/utils/createGenerateClassName.js
export default function createGenerateClassName(): generateClassName {
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

  return (rule: Rule, sheet?: StyleSheet): string => {
    ruleCounter += 1;
    warning(
      ruleCounter < 1e10,
      [
        'Material-UI: you might have a memory leak.',
        'The ruleCounter is not supposed to grow that much.',
      ].join(''),
    );

    if (process.env.NODE_ENV === 'production') {
      return `c${ruleCounter}`;
    }

    if (sheet && sheet.options.meta) {
      let meta = sheet.options.meta;
      // Sanitize the string as will be used in development to prefix the generated
      // class name.
      meta = meta.replace(new RegExp(/[!"#$%&'()*+,./:; <=>?@[\\\]^`{|}~]/g), '-');

      return `${meta}-${rule.key}-${ruleCounter}`;
    }

    return `${rule.key}-${ruleCounter}`;
  };
}
