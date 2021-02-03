const map = { xs: 'sm', sm: 'md', md: 'lg', lg: 'xl', xl: 'xl' };

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  return (
    file.source
      // `${theme.spacing(2)}px` -> theme.spacing(2)
      .replace(/`\${(theme\.spacing\([^{}]*\))}px`/gm, '$1')
      // `${theme.spacing(2)}px ${theme.spacing(4)}px` -> `${theme.spacing(2)} ${theme.spacing(4)}`
      .replace(/(?<={theme.spacing\(.*\)})px/gm, '')
  );
}
