/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return file.source.replace(/(\s|:|\{)ThemeOptions/gm, '$1DeprecatedThemeOptions');
}
