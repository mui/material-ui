/**
 * The CLI passes this file to jscodeshift as the transform, and the codemod to run as the
 * `muiTransform` option.
 *
 * recast prints every line with the line ending of the OS it runs on, so on Windows a file with
 * LF line endings comes back with CRLF, and a CRLF file comes back with LF on macOS and Linux.
 * jscodeshift then rewrites every file it visits, even the ones the codemod didn't change.
 * This gives the output the line endings of the input file.
 */
export default function transformer(file, api, options) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const transformModule = require(options.muiTransform);
  const transform =
    typeof transformModule.default === 'function' ? transformModule.default : transformModule;

  // Read it first: codemods that run other codemods, like `deprecations/all`, replace `file.source`.
  const { source } = file;
  const output = transform(file, api, options);
  // Leave the line endings alone when they were asked for with `--printOptions`.
  if (typeof output !== 'string' || output === source || options.printOptions?.lineTerminator) {
    return output;
  }

  const lineTerminator = source.includes('\r\n') ? '\r\n' : '\n';
  return output.replace(/\r?\n/g, lineTerminator);
}
