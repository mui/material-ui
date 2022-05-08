/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-syntax */

/** Copy pasted from
 * https://github.com/emotion-js/emotion/blob/23f43ab9f24d44219b0b007a00f4ac681fe8712e/packages/react/src/class-names.js#L17-L63
 * */
export const classnames = (args) => {
  const len = args.length;
  let i = 0;
  let cls = '';
  for (; i < len; i++) {
    const arg = args[i];
    if (arg == null) {
      continue;
    }

    let toAdd;
    switch (typeof arg) {
      case 'boolean':
        break;
      case 'object': {
        if (Array.isArray(arg)) {
          toAdd = classnames(arg);
        } else {
          toAdd = '';
          for (const k in arg) {
            if (arg[k] && k) {
              toAdd && (toAdd += ' ');
              toAdd += k;
            }
          }
        }
        break;
      }
      default: {
        toAdd = arg;
      }
    }
    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }
  return cls;
};
