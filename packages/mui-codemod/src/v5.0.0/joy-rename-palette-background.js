/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return file.source
    .replace(/background\.body/gm, 'background.level0')
    .replace(/background\.surface/gm, 'background.level1')
    .replace(/background\.popup/gm, 'background.level0')
    .replace(/^(\s*)body:([^,]+),$/gm, '$1level0:$2,')
    .replace(/^(\s*)surface:([^,]+),$/gm, '$1level1:$2,');
}
