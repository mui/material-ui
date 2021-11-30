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
  /** Styles applied to the root element if `elevation="xs"`. */
  elevationXs: string;
  /** Styles applied to the root element if `elevation="sm"`. */
  elevationSm: string;
  /** Styles applied to the root element if `elevation="md"`. */
  elevationMd: string;
  /** Styles applied to the root element if `elevation="lg"`. */
  elevationLg: string;
  /** Styles applied to the root element if `elevation="xl"`. */
  elevationXl: string;
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
  /** Styles applied to the root element if `roundness="xs"`. */
  roundnessXs: string;
  /** Styles applied to the root element if `roundness="sm"`. */
  roundnessSm: string;
  /** Styles applied to the root element if `roundness="md"`. */
  roundnessMd: string;
  /** Styles applied to the root element if `roundness="lg"`. */
  roundnessLg: string;
  /** Styles applied to the root element if `roundness="xl"`. */
  roundnessXl: string;
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
  'elevationXs',
  'elevationSm',
  'elevationMd',
  'elevationLg',
  'elevationXl',
  'variantText',
  'variantOutlined',
  'variantLight',
  'variantContained',
  'focusVisible',
  'disabled',
  'roundnessXs',
  'roundnessSm',
  'roundnessMd',
  'roundnessLg',
  'roundnessXl',
  'sizeSmall',
  'sizeLarge',
  'fullWidth',
]);

export default buttonClasses;
