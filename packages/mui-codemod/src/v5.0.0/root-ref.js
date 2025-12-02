/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  // The regexes below have a negative lookahead to prevent ReDoS
  // See https://github.com/mui/material-ui/issues/44078
  return file.source
    .replace(/\n?import(?!import).*core\/RootRef['"];?/gm, '')
    .replace(/\n?import {\s?RootRef\s?} from ['"]@material-ui\/core\/?['"];?/gm, '')
    .replace(/({.*)(RootRef,?)(.*})/gm, '$1$3')
    .replace(/<RootRef(?!<RootRef).*>/gm, '<>')
    .replace(/<\/RootRef>/gm, '</>');
}
