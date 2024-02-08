import transformAccordionProps from '../accordion-props/accordion-props';
import transformAccordionClasses from '../accordion-summary-classes/accordion-summary-classes';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function deprecationsAll(file, api, options) {
  file.source = transformAccordionProps(file, api, options);
  file.source = transformAccordionClasses(file, api, options);

  return file.source;
}
