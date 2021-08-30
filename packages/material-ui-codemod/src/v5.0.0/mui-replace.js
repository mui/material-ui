/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return file.source
    .replace(/@material-ui\/unstyled/gm, '@mui/core')
    .replace(/@material-ui\/core/gm, '@mui/material')
    .replace(/@material-ui\/lab/gm, '@mui/lab-material')
    .replace(/@material-ui\/icons/gm, '@mui/icons-material')
    .replace(/@material-ui\//gm, '@mui/');
}
