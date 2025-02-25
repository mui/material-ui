import gridPropsTransform from '../grid-props';
import labRemovedComponentsTransform from '../lab-removed-components';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function v7All(file, api, options) {
  gridPropsTransform(file, api, options);
  labRemovedComponentsTransform(file, api, options);
  return file.source;
}
