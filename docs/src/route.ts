const prefix = '/branding'; // change to "/" later

const ROUTES = {
  home: '/',
  productCore: '/products/core/',
  productAdvanced: '/products/advanced/',
  productTemplates: '/products/templates/',
  productDesignKits: '/products/design-kits/',
  materialIcons: '/resources/material-icons/',
  freeTemplates: '/resources/free-templates/',
  components: '/resources/components/',
  customization: '/resources/customization/',
  styling: '/resources/styling/',
  documentation: '/documentation/',
  pricing: '/pricing/',
  blog: '/blog/',
  showcase: '/showcase/',
  roadmap: '/roadmap/',
  languages: '/languages/',
  about: '/about/',
  vision: '/vision/',
  careers: '/careers/',
  support: '/support/',
  contactUs: '/contact-us/',
};

(Object.keys(ROUTES) as Array<keyof typeof ROUTES>).forEach((key) => {
  ROUTES[key] = `${prefix}${ROUTES[key]}`;
});

export default ROUTES;
