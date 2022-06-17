import FEATURE_TOGGLE from './featureToggle';

const ROUTES = {
  home: '/',
  productCore: '/core/',
  productAdvanced: '/x/',
  productTemplates: '/templates/',
  productDesignKits: '/design-kits/',
  careers: '/careers/',
  pricing: '/pricing/',
  about: '/about/',
  handbook: 'https://mui-org.notion.site/Handbook-f086d47e10794d5e839aef9dc67f324b',
  baseDocs: '/base/getting-started/overview/',
  materialDocs: '/material-ui/getting-started/overview/',
  joyDocs: '/joy-ui/getting-started/overview/',
  systemDocs: '/system/basics/',
  materialIcons: FEATURE_TOGGLE.enable_redirects
    ? '/material-ui/material-icons/'
    : '/components/material-icons/',
  freeTemplates: FEATURE_TOGGLE.enable_redirects
    ? '/material-ui/getting-started/templates/'
    : '/getting-started/templates/',
  components: FEATURE_TOGGLE.enable_redirects
    ? '/material-ui/getting-started/supported-components/'
    : '/getting-started/supported-components/',
  customization: FEATURE_TOGGLE.enable_redirects
    ? '/material-ui/customization/how-to-customize/'
    : '/customization/how-to-customize/',
  theming: FEATURE_TOGGLE.enable_redirects
    ? '/material-ui/customization/theming/'
    : '/customization/theming/',
  documentation: '/material-ui/getting-started/overview/',
  communityHelp: FEATURE_TOGGLE.enable_redirects
    ? '/material-ui/getting-started/support/#community-help-free'
    : '/getting-started/support/#community-help-free',
  blog: '/blog/',
  showcase: FEATURE_TOGGLE.enable_redirects
    ? '/material-ui/discover-more/showcase/'
    : '/discover-more/showcase/',
  roadmap: 'https://github.com/mui/mui-x/projects/1',
  languages: FEATURE_TOGGLE.enable_redirects
    ? '/material-ui/discover-more/languages/'
    : '/discover-more/languages/',
  vision: FEATURE_TOGGLE.enable_redirects
    ? '/material-ui/discover-more/vision/'
    : '/discover-more/vision/',
  support: FEATURE_TOGGLE.enable_redirects
    ? '/material-ui/getting-started/support/#professional-support-premium'
    : '/getting-started/support/#professional-support-premium',
  privacyPolicy: 'https://mui.com/store/privacy/',
  goldSponsor: FEATURE_TOGGLE.enable_redirects
    ? '/material-ui/discover-more/backers/#gold'
    : '/discover-more/backers/#gold/',
  store: 'https://mui.com/store/',
  advancedComponents: '/x/introduction/',
  dataGridSpace: '/x/react-data-grid/getting-started/',
  dataGridDocs: FEATURE_TOGGLE.enable_redirects
    ? '/x/react-data-grid/getting-started/'
    : '/components/data-grid/getting-started/',
  dataGridFeatures: FEATURE_TOGGLE.enable_redirects
    ? '/x/react-data-grid/#features'
    : '/components/data-grid/#features',
  dataGridFeaturesComparison: FEATURE_TOGGLE.enable_redirects
    ? '/x/react-data-grid/getting-started/#feature-comparison'
    : '/components/data-grid/getting-started/#feature-comparison',
};

export default ROUTES;
