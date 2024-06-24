import transformerListItemButtonProps from '../list-item-button-prop/list-item-button-prop';
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function v6All(file) {
  file.source = transformerListItemButtonProps(file, api, options);

  return file.source;
}
