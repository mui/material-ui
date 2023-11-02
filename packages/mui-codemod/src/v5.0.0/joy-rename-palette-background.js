/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return file.source
    .replace(/background\.body/gm, 'background.level0')
    .replace(/palette-background-body/gm, 'palette-background-level0')
    .replace(/background\.surface/gm, 'background.level1')
    .replace(/palette-background-surface/gm, 'palette-background-level1')
    .replace(/background\.popup/gm, 'background.level0')
    .replace(/palette-background-popup/gm, 'palette-background-level0')
    .replace(/background\.backdrop/gm, 'background.translucent')
    .replace(/palette-background-backdrop/gm, 'palette-background-translucent')
    .replace(/^(\s*)body:([^,]+),$/gm, '$1level0:$2,')
    .replace(/^(\s*)surface:([^,]+),$/gm, '$1level1:$2,')
    .replace(/^(\s*)backdrop:([^,]+),$/gm, '$1translucent:$2,');
}
