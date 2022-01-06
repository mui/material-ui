// need to use commonjs export so that docs/packages/markdown can use
module.exports = {
  nav_products: true,
  enable_website_banner: false,
  enable_blog_index: process.env.NODE_ENV !== 'production' || process.env.PULL_REQUEST === 'true',
  // TODO: cleanup once migration is done
  enable_product_scope: false, // related to new structure change
  enable_redirects: false, // related to new structure change
};
