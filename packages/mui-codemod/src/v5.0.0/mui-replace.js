/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return file.source
    .replace(/@material-ui\/unstyled/gm, '@mui/base')
    .replace(/@material-ui\/core/gm, '@mui/material')
    .replace(/@material-ui\/icons/gm, '@mui/icons-material')
    .replace(/@material-ui\/(?!(pickers|data-grid|x-grid))/gm, '@mui/');
}
