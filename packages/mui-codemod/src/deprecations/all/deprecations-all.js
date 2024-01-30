import transformAccordionProps from '../accordion-props';
import transformAvatarProps from '../avatar-props';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function deprecationsAll(file, api, options) {
  file.source = transformAccordionProps(file, api, options);
  file.source = transformAvatarProps(file, api, options);

  return file.source;
}
