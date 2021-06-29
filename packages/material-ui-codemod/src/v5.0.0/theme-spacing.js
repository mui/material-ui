/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return (
    file.source
      // `${theme.spacing(2)}px` -> theme.spacing(2)
      .replace(/`\${((theme\.spacing|spacing)\([^{}]*\))}px`/gm, '$1')
      // `${theme.spacing(2)}px ${theme.spacing(4)}px` -> `${theme.spacing(2)} ${theme.spacing(4)}`
      .replace(/(?<={(theme\.spacing|spacing)\(.*\)})px/gm, '')
      .replace(/((theme\.spacing|spacing)\(.*\))\s*\+\s*'px'/gm, '$1')
  );
}
