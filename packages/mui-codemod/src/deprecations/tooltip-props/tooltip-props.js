import { EOL } from 'os';

import replaceComponentsWithSlots from '../utils/replaceComponentsWithSlots';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  replaceComponentsWithSlots(j, { root, componentName: 'Tooltip' });

  // I've tried { lineTerminator } option here, but still get wrong line endings on my Windows machine
  const result = root.toSource(printOptions);

  if (EOL !== '\n') {
    return result.replace(/\n/g, EOL);
  }

  return result;
}
