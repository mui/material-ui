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
  enable_joy_scope: process.env.NODE_ENV === 'development' || process.env.STAGING === true,
};
