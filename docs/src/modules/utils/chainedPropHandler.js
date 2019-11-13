import { utils } from 'react-docgen';
import { parse } from '@babel/core';
import { visit } from 'ast-types';
/**
 * mutates the given descriptor to be more accurate about its chaining nature
 */
function refineAsChained(type) {
  const ast = parse(type.raw, { filename: process.cwd() });
  visit(ast, {
    visitProgram(path) {
      const consideredPath = path
        .get('body')
        .get(0)
        .get('expression')
        .get('arguments')
        .get(0);

      const consideredType = utils.getPropType(consideredPath);
      type.chained = consideredType;
      type.name = 'chained';

      return false;
    },
  });
}

export default function propJsdocHandler(documentation) {
  const { props } = documentation.toObject();

  Object.keys(props).forEach(propName => {
    const descriptor = documentation.getPropDescriptor(propName);
    const marker = 'chainPropTypes';

    if (descriptor.type.name === 'custom' && descriptor.type.raw.indexOf(marker) !== -1) {
      refineAsChained(descriptor.type);
    }
  });
}
