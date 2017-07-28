// @flow

import warning from 'warning';
import type StyleSheet from 'jss/lib/StyleSheet';
import type { Rule, generateClassName } from 'jss/lib/types';

// Returns a function which generates unique class names based on counters.
// When new generator function is created, rule counter is reseted.
// We need to reset the rule counter for SSR for each request.
//
// It's an improved version of
// https://github.com/cssinjs/jss/blob/4e6a05dd3f7b6572fdd3ab216861d9e446c20331/src/utils/createGenerateClassName.js
export default function createGenerateClassName(): generateClassName {
  let ruleCounter = 0;

  return (rule: Rule, sheet?: StyleSheet): string => {
    ruleCounter += 1;
    warning(
      ruleCounter < 1e10,
      [
        'Material-UI: You might have a memory leak.',
        'The ruleCounter is not supposed to grow that much.',
      ].join(''),
    );

    if (process.env.NODE_ENV === 'production') {
      return `c${ruleCounter}`;
    }

    if (sheet && sheet.options.meta) {
      return `${sheet.options.meta}-${rule.key}-${ruleCounter}`;
    }

    return `${rule.key}-${ruleCounter}`;
  };
}
