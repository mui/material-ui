import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListDividerClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `inset="gutter"`. */
  insetGutter: string;
  /** Styles applied to the root element if `inset="startDecorator"`. */
  insetStartDecorator: string;
  /** Styles applied to the root element if `inset="startContent"`. */
  insetStartContent: string;
}

export type ListDividerClassKey = keyof ListDividerClasses;

export function getListDividerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListDivider', slot);
}

const listDividerClasses: ListDividerClasses = generateUtilityClasses('MuiListDivider', [
  'root',
  'insetGutter',
  'insetStartDecorator',
  'insetStartContent',
]);

export default listDividerClasses;
