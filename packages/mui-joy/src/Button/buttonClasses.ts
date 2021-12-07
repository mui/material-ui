import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Styles applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element if `shadow="xs"`. */
  shadowXs: string;
  /** Styles applied to the root element if `shadow="sm"`. */
  shadowSm: string;
  /** Styles applied to the root element if `shadow="md"`. */
  shadowMd: string;
  /** Styles applied to the root element if `shadow="lg"`. */
  shadowLg: string;
  /** Styles applied to the root element if `shadow="xl"`. */
  shadowXl: string;
  /** Styles applied to the root element if `variant="text"`. */
  variantText: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="light"`. */
  variantLight: string;
  /** Styles applied to the root element if `variant="contained"`. */
  variantContained: string;
  /** State class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `radius="xs"`. */
  radiusXs: string;
  /** Styles applied to the root element if `radius="sm"`. */
  radiusSm: string;
  /** Styles applied to the root element if `radius="md"`. */
  radiusMd: string;
  /** Styles applied to the root element if `radius="lg"`. */
  radiusLg: string;
  /** Styles applied to the root element if `radius="xl"`. */
  radiusXl: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="large"`. */
  sizeLarge: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
}

export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiButton', slot);
}

const buttonClasses: ButtonClasses = generateUtilityClasses('MuiButton', [
  'root',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'shadowXs',
  'shadowSm',
  'shadowMd',
  'shadowLg',
  'shadowXl',
  'variantText',
  'variantOutlined',
  'variantLight',
  'variantContained',
  'focusVisible',
  'disabled',
  'radiusXs',
  'radiusSm',
  'radiusMd',
  'radiusLg',
  'radiusXl',
  'sizeSmall',
  'sizeLarge',
  'fullWidth',
]);

export default buttonClasses;
