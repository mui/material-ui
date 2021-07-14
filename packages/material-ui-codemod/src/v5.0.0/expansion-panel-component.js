/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file) {
  return file.source.replace(/([^a-zA-Z])ExpansionPanel/gm, '$1Accordion');
}
