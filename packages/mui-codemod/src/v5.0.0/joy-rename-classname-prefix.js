/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return file.source.replace(/Joy([A-Z]+)/gm, 'Mui$1');
}
