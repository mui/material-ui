const typographyMigration =
  process.env.NODE_ENV === 'production'
    ? {}
    : {
        // these variants will be removed in the next major
        deprecatedVariants: [
          'display4',
          'display3',
          'display2',
          'display1',
          'headline',
          'title',
          'subheading',
        ],
        // these variants will change appearance in the next major
        // to get the new style use set `useNewVariants` in Typography props
        restyledVariants: ['body1', 'body2', 'caption', 'button'],
        migrationGuideMessage:
          '\nPlease read the migration guide under https://material-ui.com/style/typography#migration-to-typography-v2',
      };

export default typographyMigration;
