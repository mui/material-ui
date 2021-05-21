/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return (
    file.source
      // `${theme.spacing(2)}px` -> theme.spacing(2)
      .replace(/`\${(theme\.spacing\([^{}]*\))}px`/gm, '$1')
      // `${theme.spacing(2)}px ${theme.spacing(4)}px` -> `${theme.spacing(2)} ${theme.spacing(4)}`
      .replace(/(?<={theme.spacing\(.*\)})px/gm, '')
  );
}
