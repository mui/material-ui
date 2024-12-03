/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  // Add negative lookahead to the regexes below to prevent ReDoS
  return file.source
    .replace(/\n?import(?!import).*core\/RootRef['"];?/gm, '')
    .replace(/\n?import {\s?RootRef\s?} from ['"]@material-ui\/core\/?['"];?/gm, '')
    .replace(/({.*)(RootRef,?)(.*})/gm, '$1$3')
    .replace(/<RootRef(?!<RootRef).*>/gm, '<>')
    .replace(/<\/RootRef>/gm, '</>');
}
