import migrateToVariants from '../../util/migrateToVariants';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function styledV6(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  let shouldTransform = false;

  root.find(j.ArrowFunctionExpression).forEach((path) => {
    const styles = [];
    let args = [];

    if (path.parent.parent.parent.get('key', 'name').value === 'styleOverrides') {
      args = [path.node];
    }

    // 1. collecting styles that should be tranformed
    args.forEach((arg) => {
      if (
        arg.type === 'ArrowFunctionExpression' &&
        arg.params[0] &&
        arg.params[0].type === 'ObjectPattern'
      ) {
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
      if (line.includes('styleOverrides')) {
        isInStyled = true;
        spaceMatch = line.match(/^\s+/);
      }
    });
    return lines.join('\n');
  }

  return transformed;
}
