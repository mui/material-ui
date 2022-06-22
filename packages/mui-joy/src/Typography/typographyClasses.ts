import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface TypographyClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `level="h1"`. */
  h1: string;
  /** Styles applied to the root element if `level="h2"`. */
  h2: string;
  /** Styles applied to the root element if `level="h3"`. */
  h3: string;
  /** Styles applied to the root element if `level="h4"`. */
  h4: string;
  /** Styles applied to the root element if `level="h5"`. */
  h5: string;
  /** Styles applied to the root element if `level="h6"`. */
  h6: string;
  /** Styles applied to the root element if `level="body1"`. */
  body1: string;
  /** Styles applied to the root element if `level="body2"`. */
  body2: string;
  /** Styles applied to the root element if `level="body3"`. */
  body3: string;
  /** Styles applied to the root element if `nowrap={true}`. */
  noWrap: string;
  /** Styles applied to the root element if `gutterBottom={true}`. */
  gutterBottom: string;
  /** Styles applied to the startDecorator element */
  startDecorator: string;
  /** Styles applied to the endDecorator element */
  endDecorator: string;
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
  /** Styles applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type TypographyClassKey = keyof TypographyClasses;

export function getTypographyUtilityClass(slot: string): string {
  return generateUtilityClass('JoyTypography', slot);
}

const typographyClasses: TypographyClasses = generateUtilityClasses('JoyTypography', [
  'root',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body1',
  'body2',
  'body3',
  'noWrap',
  'gutterBottom',
  'startDecorator',
  'endDecorator',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default typographyClasses;
