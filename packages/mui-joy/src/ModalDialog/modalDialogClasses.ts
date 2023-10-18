import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ModalDialogClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Class name applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Class name applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Class name applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Class name applied to the root element if `layout="center"`. */
  layoutCenter: string;
  /** Class name applied to the root element if `layout="fullscreen"`. */
  layoutFullscreen: string;
}

export type ModalDialogClassKey = keyof ModalDialogClasses;

export function getModalDialogUtilityClass(slot: string): string {
  return generateUtilityClass('MuiModalDialog', slot);
}

const modalDialogClasses: ModalDialogClasses = generateUtilityClasses('MuiModalDialog', [
  'root',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'layoutCenter',
  'layoutFullscreen',
]);

export default modalDialogClasses;
