/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file) {
  return file.source
    .replace(/GridListTileBar/gm, 'ImageListItemBar')
    .replace(/GridListTile/gm, 'ImageListItem')
    .replace(/GridList/gm, 'ImageList');
}
