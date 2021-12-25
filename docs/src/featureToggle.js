module.exports = {
  nav_products: true,
  enable_product_scope: false,
  enable_website_banner: false,
  enable_blog_index: process.env.NODE_ENV !== 'production' || process.env.PULL_REQUEST === 'true',
};
