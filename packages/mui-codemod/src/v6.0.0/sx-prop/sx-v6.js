import getReturnExpression from '../../util/getReturnExpression';
import migrateToVariants from '../../util/migrateToVariants';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function sxV6(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  let shouldTransform = false;

  root.find(j.JSXAttribute).forEach((path) => {
    const styles = [];
    let args = [];

    if (
      path.node.name.name === 'sx' &&
      path.node.value.type === 'JSXExpressionContainer' &&
      path.node.value.expression.type === 'ArrowFunctionExpression'
    ) {
      args = [path.node.value.expression];
    }

    // 1. collecting styles that should be tranformed
    args.forEach((arg) => {
      if (arg.type === 'ArrowFunctionExpression') {
        styles.push(arg);
      }
    });

    if (!shouldTransform && styles.length > 0) {
      shouldTransform = true;
    }

    migrateToVariants(j, styles);
  });

  const transformed = root.toSource(printOptions);

  if (shouldTransform) {
    // recast adds extra newlines that we don't want, https://github.com/facebook/jscodeshift/issues/249
    // need to remove them manually
    const lines = [];
    let isInStyled = false;
    let spaceMatch;
    transformed.split('\n').forEach((line) => {
      if (!isInStyled) {
        lines.push(line);
      } else if (line !== '') {
        if (spaceMatch && line.match(/^\s+/)?.[0] === spaceMatch?.[0]) {
          isInStyled = false;
          spaceMatch = null;
        }
        lines.push(line);
      }
      if (line.includes('sx=')) {
        isInStyled = true;
        spaceMatch = line.match(/^\s+/);
      }
    });
    return lines.join('\n');
  }

  return transformed;
}
