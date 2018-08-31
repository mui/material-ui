/**
 * these variants will be removed in the next major
 */
export const deprecatedVariants = [
  'display4',
  'display3',
  'display2',
  'display1',
  'headline',
  'title',
  'subheading',
];

/**
 * these variants will change appearance in the next major
 * to get the new style use set `useNewVariants` in Typography props
 */
export const restyledVariants = ['body1', 'body2', 'caption', 'button'];

export const dangerousVariants = [...deprecatedVariants, ...restyledVariants];

/**
 * @param {string} variant - typography v1 or v2 variant
 * @returns {string} typography v2 variant
 */
export function nextVariantMapping(variant) {
  const nextVariant = {
    display4: 'headline1',
    display3: 'headline2',
    display2: 'headline3',
    display1: 'headline4',
    headline: 'headline5',
    title: 'headline6',
    subheading: 'subtitle1',
  }[variant];

  if (nextVariant === undefined) {
    // already v2
    return variant;
  }
  return nextVariant;
}

export const migrationGuideMessage =
  '\nPlease read the migration guide under https://material-ui.com/style/typography#migration-to-typography-v2';
