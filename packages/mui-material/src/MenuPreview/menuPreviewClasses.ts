import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export interface MenuPreviewTriggerClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if the menu is open. */
  open: string;
}

export type MenuPreviewTriggerClassKey = keyof MenuPreviewTriggerClasses;

export function getMenuPreviewTriggerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewTrigger', slot);
}

export const menuPreviewTriggerClasses: MenuPreviewTriggerClasses = generateUtilityClasses(
  'MuiMenuPreviewTrigger',
  ['root', 'disabled', 'open'],
);

export interface MenuPreviewPopupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the Material Paper element. */
  paper: string;
  /** Styles applied to the Material List element. */
  list: string;
}

export type MenuPreviewPopupClassKey = keyof MenuPreviewPopupClasses;

export function getMenuPreviewPopupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewPopup', slot);
}

export const menuPreviewPopupClasses: MenuPreviewPopupClasses = generateUtilityClasses(
  'MuiMenuPreviewPopup',
  ['root', 'paper', 'list'],
);

export interface MenuPreviewSubmenuPopupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the Material Paper element. */
  paper: string;
  /** Styles applied to the Material List element. */
  list: string;
}

export type MenuPreviewSubmenuPopupClassKey = keyof MenuPreviewSubmenuPopupClasses;

export function getMenuPreviewSubmenuPopupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewSubmenuPopup', slot);
}

export const menuPreviewSubmenuPopupClasses: MenuPreviewSubmenuPopupClasses =
  generateUtilityClasses('MuiMenuPreviewSubmenuPopup', ['root', 'paper', 'list']);

export interface MenuPreviewItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if highlighted. */
  highlighted: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `dense={true}`. */
  dense: string;
  /** Styles applied to the root element if `divider={true}`. */
  divider: string;
  /** Styles applied to the root element unless `disableGutters={true}`. */
  gutters: string;
  /** State class applied to the root element if `selected={true}`. */
  selected: string;
}

export type MenuPreviewItemClassKey = keyof MenuPreviewItemClasses;

export function getMenuPreviewItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewItem', slot);
}

export const menuPreviewItemClasses: MenuPreviewItemClasses = generateUtilityClasses(
  'MuiMenuPreviewItem',
  ['root', 'highlighted', 'disabled', 'dense', 'divider', 'gutters', 'selected'],
);

export interface MenuPreviewLinkItemClasses extends MenuPreviewItemClasses {}

export type MenuPreviewLinkItemClassKey = keyof MenuPreviewLinkItemClasses;

export function getMenuPreviewLinkItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewLinkItem', slot);
}

export const menuPreviewLinkItemClasses: MenuPreviewLinkItemClasses = generateUtilityClasses(
  'MuiMenuPreviewLinkItem',
  ['root', 'highlighted', 'disabled', 'dense', 'divider', 'gutters', 'selected'],
);

export interface MenuPreviewCheckboxItemClasses extends MenuPreviewItemClasses {
  /** State class applied to the root element if `checked={true}`. */
  checked: string;
}

export type MenuPreviewCheckboxItemClassKey = keyof MenuPreviewCheckboxItemClasses;

export function getMenuPreviewCheckboxItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewCheckboxItem', slot);
}

export const menuPreviewCheckboxItemClasses: MenuPreviewCheckboxItemClasses =
  generateUtilityClasses('MuiMenuPreviewCheckboxItem', [
    'root',
    'highlighted',
    'disabled',
    'dense',
    'divider',
    'gutters',
    'selected',
    'checked',
  ]);

export interface MenuPreviewCheckboxItemIndicatorClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `checked={true}`. */
  checked: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if highlighted. */
  highlighted: string;
}

export type MenuPreviewCheckboxItemIndicatorClassKey =
  keyof MenuPreviewCheckboxItemIndicatorClasses;

export function getMenuPreviewCheckboxItemIndicatorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewCheckboxItemIndicator', slot);
}

export const menuPreviewCheckboxItemIndicatorClasses: MenuPreviewCheckboxItemIndicatorClasses =
  generateUtilityClasses('MuiMenuPreviewCheckboxItemIndicator', [
    'root',
    'checked',
    'disabled',
    'highlighted',
  ]);

export interface MenuPreviewRadioGroupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
}

export type MenuPreviewRadioGroupClassKey = keyof MenuPreviewRadioGroupClasses;

export function getMenuPreviewRadioGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewRadioGroup', slot);
}

export const menuPreviewRadioGroupClasses: MenuPreviewRadioGroupClasses = generateUtilityClasses(
  'MuiMenuPreviewRadioGroup',
  ['root', 'disabled'],
);

export interface MenuPreviewRadioItemClasses extends MenuPreviewItemClasses {
  /** State class applied to the root element if `checked={true}`. */
  checked: string;
}

export type MenuPreviewRadioItemClassKey = keyof MenuPreviewRadioItemClasses;

export function getMenuPreviewRadioItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewRadioItem', slot);
}

export const menuPreviewRadioItemClasses: MenuPreviewRadioItemClasses = generateUtilityClasses(
  'MuiMenuPreviewRadioItem',
  ['root', 'highlighted', 'disabled', 'dense', 'divider', 'gutters', 'selected', 'checked'],
);

export interface MenuPreviewRadioItemIndicatorClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `checked={true}`. */
  checked: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if highlighted. */
  highlighted: string;
}

export type MenuPreviewRadioItemIndicatorClassKey = keyof MenuPreviewRadioItemIndicatorClasses;

export function getMenuPreviewRadioItemIndicatorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewRadioItemIndicator', slot);
}

export const menuPreviewRadioItemIndicatorClasses: MenuPreviewRadioItemIndicatorClasses =
  generateUtilityClasses('MuiMenuPreviewRadioItemIndicator', [
    'root',
    'checked',
    'disabled',
    'highlighted',
  ]);

export interface MenuPreviewGroupClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MenuPreviewGroupClassKey = keyof MenuPreviewGroupClasses;

export function getMenuPreviewGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewGroup', slot);
}

export const menuPreviewGroupClasses: MenuPreviewGroupClasses = generateUtilityClasses(
  'MuiMenuPreviewGroup',
  ['root'],
);

export interface MenuPreviewGroupLabelClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MenuPreviewGroupLabelClassKey = keyof MenuPreviewGroupLabelClasses;

export function getMenuPreviewGroupLabelUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewGroupLabel', slot);
}

export const menuPreviewGroupLabelClasses: MenuPreviewGroupLabelClasses = generateUtilityClasses(
  'MuiMenuPreviewGroupLabel',
  ['root'],
);

export interface MenuPreviewSeparatorClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MenuPreviewSeparatorClassKey = keyof MenuPreviewSeparatorClasses;

export function getMenuPreviewSeparatorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewSeparator', slot);
}

export const menuPreviewSeparatorClasses: MenuPreviewSeparatorClasses = generateUtilityClasses(
  'MuiMenuPreviewSeparator',
  ['root'],
);

export interface MenuPreviewSubmenuTriggerClasses extends MenuPreviewItemClasses {
  /** State class applied to the root element if the submenu is open. */
  open: string;
}

export type MenuPreviewSubmenuTriggerClassKey = keyof MenuPreviewSubmenuTriggerClasses;

export function getMenuPreviewSubmenuTriggerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuPreviewSubmenuTrigger', slot);
}

export const menuPreviewSubmenuTriggerClasses: MenuPreviewSubmenuTriggerClasses =
  generateUtilityClasses('MuiMenuPreviewSubmenuTrigger', [
    'root',
    'highlighted',
    'disabled',
    'dense',
    'divider',
    'gutters',
    'selected',
    'open',
  ]);
