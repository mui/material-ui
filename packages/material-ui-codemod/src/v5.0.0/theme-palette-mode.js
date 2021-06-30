/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return file.source.replace(/(theme\.palette|palette)\.type/gm, '$1.mode');
}
