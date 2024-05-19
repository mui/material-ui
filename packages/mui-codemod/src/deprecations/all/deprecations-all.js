import transformAccordionProps from '../accordion-props';
import transformAutocompleteProps from '../autocomplete-props';
import transformFormControlLabelProps from '../form-control-label-props';
import transformAvatarProps from '../avatar-props';
import transformDividerProps from '../divider-props';
import transformAccordionClasses from '../accordion-summary-classes';
import transformButtonClasses from '../button-classes';
import transformButtonGroupClasses from '../button-group-classes';
import transformChipClasses from '../chip-classes';
import transformPaginationItemClasses from '../pagination-item-classes';
import transformAlertClasses from '../alert-classes';
import transformToggleButtonGroupClasses from '../toggle-button-group-classes';
import transformStepLabelProps from '../step-label-props';
import transformBackdropProps from '../backdrop-props';
import transformStepConnectorClasses from '../step-connector-classes';
import transformCircularProgressClasses from '../circular-progress-classes';
import transformSpeedDialProps from '../speed-dial-props';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function deprecationsAll(file, api, options) {
  file.source = transformAccordionProps(file, api, options);
  file.source = transformAutocompleteProps(file, api, options);
  file.source = transformFormControlLabelProps(file, api, options);
  file.source = transformAvatarProps(file, api, options);
  file.source = transformDividerProps(file, api, options);
  file.source = transformAccordionClasses(file, api, options);
  file.source = transformButtonClasses(file, api, options);
  file.source = transformButtonGroupClasses(file, api, options);
  file.source = transformChipClasses(file, api, options);
  file.source = transformPaginationItemClasses(file, api, options);
  file.source = transformAlertClasses(file, api, options);
  file.source = transformToggleButtonGroupClasses(file, api, options);
  file.source = transformStepLabelProps(file, api, options);
  file.source = transformBackdropProps(file, api, options);
  file.source = transformStepConnectorClasses(file, api, options);
  file.source = transformCircularProgressClasses(file, api, options);
  file.source = transformSpeedDialProps(file, api, options);

  return file.source;
}
