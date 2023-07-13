import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface TypographyClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `level="h1"`. */
  h1: string;
  /** Class name applied to the root element if `level="h2"`. */
  h2: string;
  /** Class name applied to the root element if `level="h3"`. */
  h3: string;
  /** Class name applied to the root element if `level="h4"`. */
  h4: string;
  /** Class name applied to the root element if `level="h5"`. */
  h5: string;
  /** Class name applied to the root element if `level="h6"`. */
  h6: string;
  /** Class name applied to the root element if `level="body1"`. */
  body1: string;
  /** Class name applied to the root element if `level="body2"`. */
  body2: string;
  /** Class name applied to the root element if `level="body3"`. */
  body3: string;
  /** Class name applied to the root element if `nowrap={true}`. */
  noWrap: string;
  /** Class name applied to the root element if `gutterBottom={true}`. */
  gutterBottom: string;
  /** Class name applied to the startDecorator element */
  startDecorator: string;
  /** Class name applied to the endDecorator element */
  endDecorator: string;
  /** Class name applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Class name applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the root element if `color="info"`. */
  colorInfo: string;
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
}

export type TypographyClassKey = keyof TypographyClasses;

export function getTypographyUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTypography', slot);
}

const typographyClasses: TypographyClasses = generateUtilityClasses('MuiTypography', [
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
  'colorContext',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default typographyClasses;
