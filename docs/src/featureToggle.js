// need to use commonjs export so that docs/packages/markdown can use
module.exports = {
  nav_products: true,
  enable_website_banner: false,
  enable_toc_banner: true,
  enable_docsnav_banner: false,
  // TODO: cleanup once migration is done
  enable_product_scope: true, // related to new structure change
  enable_redirects: true, // related to new structure change
  enable_mui_base_scope: true, // will be enabled after the migration
  enable_system_scope: true, // will be enabled after the migration
  enable_joy_scope:
    process.env.NODE_ENV === 'development' ||
    // material-ui site, works for all branches and pull requests
    // ref: https://app.netlify.com/sites/material-ui/settings/general
    process.env.SITE_ID === '64f32322-7c26-4008-b886-60800cd747b0',
};
