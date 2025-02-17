import labRemovedComponents from '../lab-removed-components';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function v7All(file, api, options) {
  labRemovedComponents(file, api, options);
  return file.source;
}
