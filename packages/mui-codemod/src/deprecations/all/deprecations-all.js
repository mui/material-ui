import transformAccordionProps from '../accordion-props';
import transformAvatarProps from '../avatar-props';
import transformDividerProps from '../divider-props';
import transformAccordionClasses from '../accordion-summary-classes';
import transformButtonClasses from '../button-classes';
import transformChipClasses from '../chip-classes';
import transformPaginationItemClasses from '../pagination-item-classes';
import transformAlertClasses from '../alert-classes';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function deprecationsAll(file, api, options) {
  file.source = transformAccordionProps(file, api, options);
  file.source = transformAvatarProps(file, api, options);
  file.source = transformDividerProps(file, api, options);
  file.source = transformAccordionClasses(file, api, options);
  file.source = transformButtonClasses(file, api, options);
  file.source = transformChipClasses(file, api, options);
  file.source = transformPaginationItemClasses(file, api, options);
  file.source = transformAlertClasses(file, api, options);

  return file.source;
}
