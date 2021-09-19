/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return file.source.replace(
    /(theme\.breakpoints|breakpoints)\.width\(['"](.*)['"]\)/gm,
    '$1.values.$2',
  );
}
