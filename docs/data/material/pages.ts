import standardNavIcons from 'docs/src/modules/components/AppNavIcons';
import pagesApi from 'docs/data/material/pagesApi';
import { MuiPage } from 'docs/src/MuiPage';

const pages: MuiPage[] = [
  {
    pathname: '/material-ui/getting-started',
    icon: standardNavIcons.DescriptionIcon,
    children: [
      { pathname: '/material-ui/getting-started/overview' },
      { pathname: '/material-ui/getting-started/installation' },
      { pathname: '/material-ui/getting-started/usage' },
      { pathname: '/material-ui/getting-started/example-projects' },
      { pathname: '/material-ui/getting-started/templates' },
      { pathname: '/material-ui/getting-started/learn' },
      { pathname: '/material-ui/getting-started/design-resources' },
      { pathname: '/material-ui/getting-started/faq', title: 'FAQs' },
      { pathname: '/material-ui/getting-started/supported-components' },
      { pathname: '/material-ui/getting-started/supported-platforms' },
      { pathname: '/material-ui/getting-started/support' },
    ],
  },
  {
    pathname: '/material-ui/react-',
    title: 'Components',
    icon: standardNavIcons.ToggleOnIcon,
    children: [
      {
        pathname: '/material-ui/components/inputs',
        subheader: 'inputs',
        children: [
          { pathname: '/material-ui/react-autocomplete' },
          { pathname: '/material-ui/react-button' },
          { pathname: '/material-ui/react-button-group', title: 'Button Group' },
          { pathname: '/material-ui/react-checkbox' },
          {
            pathname: '/material-ui/react-floating-action-button',
            title: 'Floating Action Button',
          },
          { pathname: '/material-ui/react-radio-button', title: 'Radio Group' },
          { pathname: '/material-ui/react-rating' },
          { pathname: '/material-ui/react-select' },
          { pathname: '/material-ui/react-slider' },
          { pathname: '/material-ui/react-switch' },
          { pathname: '/material-ui/react-text-field', title: 'Text Field' },
          { pathname: '/material-ui/react-transfer-list', title: 'Transfer List' },
          { pathname: '/material-ui/react-toggle-button', title: 'Toggle Button' },
        ],
      },
      {
        pathname: '/material-ui/components/data-display',
        subheader: 'data-display',
        children: [
          { pathname: '/material-ui/react-avatar' },
          { pathname: '/material-ui/react-badge' },
          { pathname: '/material-ui/react-chip' },
          { pathname: '/material-ui/react-divider' },
          { pathname: '/material-ui/icons' },
          { pathname: '/material-ui/material-icons', title: 'Material Icons' },
          { pathname: '/material-ui/react-list' },
          { pathname: '/material-ui/react-table' },
          { pathname: '/material-ui/react-tooltip' },
          { pathname: '/material-ui/react-typography' },
        ],
      },
      {
        pathname: '/material-ui/components/feedback',
        subheader: 'feedback',
        children: [
          { pathname: '/material-ui/react-alert' },
          { pathname: '/material-ui/react-backdrop' },
          { pathname: '/material-ui/react-dialog' },
          { pathname: '/material-ui/react-progress' },
          { pathname: '/material-ui/react-skeleton' },
          { pathname: '/material-ui/react-snackbar' },
        ],
      },
      {
        pathname: '/material-ui/components/surfaces',
        subheader: 'surfaces',
        children: [
          { pathname: '/material-ui/react-accordion' },
          { pathname: '/material-ui/react-app-bar', title: 'App Bar' },
          { pathname: '/material-ui/react-card' },
          { pathname: '/material-ui/react-paper' },
        ],
      },
      {
        pathname: '/material-ui/components/navigation',
        subheader: 'navigation',
        children: [
          { pathname: '/material-ui/react-bottom-navigation', title: 'Bottom Navigation' },
          { pathname: '/material-ui/react-breadcrumbs' },
          { pathname: '/material-ui/react-drawer' },
          { pathname: '/material-ui/react-link' },
          { pathname: '/material-ui/react-menu' },
          { pathname: '/material-ui/react-pagination' },
          { pathname: '/material-ui/react-speed-dial', title: 'Speed Dial' },
          { pathname: '/material-ui/react-stepper' },
          { pathname: '/material-ui/react-tabs' },
        ],
      },
      {
        pathname: '/material-ui/components/layout',
        subheader: 'layout',
        children: [
          { pathname: '/material-ui/react-box' },
          { pathname: '/material-ui/react-container' },
          { pathname: '/material-ui/react-grid' },
          { pathname: '/material-ui/react-grid2', title: 'Grid v2', newFeature: true },
          { pathname: '/material-ui/react-stack' },
          { pathname: '/material-ui/react-image-list', title: 'Image List' },
          { pathname: '/material-ui/react-hidden' },
        ],
      },
      {
        pathname: '/material-ui/components/utils',
        subheader: 'utils',
        children: [
          { pathname: '/material-ui/react-click-away-listener', title: 'Click-Away Listener' },
          { pathname: '/material-ui/react-css-baseline', title: 'CSS Baseline' },
          { pathname: '/material-ui/react-modal' },
          { pathname: '/material-ui/react-no-ssr', title: 'No SSR' },
          { pathname: '/material-ui/react-popover' },
          { pathname: '/material-ui/react-popper' },
          { pathname: '/material-ui/react-portal' },
          { pathname: '/material-ui/react-textarea-autosize', title: 'Textarea Autosize' },
          { pathname: '/material-ui/transitions' },
          { pathname: '/material-ui/react-use-media-query', title: 'useMediaQuery' },
        ],
      },
      {
        pathname: '/mui-x', // the pathname does not matter here because the links to MUI X are outbound.
        subheader: 'MUI X',
        children: [
          { pathname: '/x/react-data-grid', title: 'Data Grid' },
          { pathname: '/x/react-date-pickers/getting-started', title: 'Date & Time Pickers' },
        ],
      },
      {
        pathname: '/material-ui',
        subheader: 'lab',
        children: [
          { pathname: '/material-ui/about-the-lab', title: 'About the lab 🧪' },
          { pathname: '/material-ui/react-masonry' },
          { pathname: '/material-ui/react-timeline' },
          { pathname: '/material-ui/react-tree-view', title: 'Tree View' },
        ],
      },
    ],
  },
  {
    title: 'Component API',
    pathname: '/material-ui/api',
    icon: standardNavIcons.CodeIcon,
    children: pagesApi,
  },
  {
    pathname: '/material-ui/customization',
    icon: standardNavIcons.CreateIcon,
    children: [
      {
        pathname: '/material-ui/customization/theme',
        subheader: '/material-ui/customization/theme',
        children: [
          { pathname: '/material-ui/customization/theming' },
          { pathname: '/material-ui/customization/palette' },
          { pathname: '/material-ui/customization/dark-mode' },
          { pathname: '/material-ui/customization/typography' },
          { pathname: '/material-ui/customization/spacing' },
          { pathname: '/material-ui/customization/breakpoints' },
          { pathname: '/material-ui/customization/density' },
          { pathname: '/material-ui/customization/z-index', title: 'z-index' },
          { pathname: '/material-ui/customization/transitions' },
          { pathname: '/material-ui/customization/theme-components', title: 'Components' },
          { pathname: '/material-ui/customization/default-theme', title: 'Default theme viewer' },
        ],
      },
      { pathname: '/material-ui/customization/how-to-customize' },
      { pathname: '/material-ui/customization/color' },
    ],
  },
  {
    pathname: '/material-ui/guides',
    title: 'How-to guides',
    icon: standardNavIcons.VisibilityIcon,
    children: [
      { pathname: '/material-ui/guides/api', title: 'API design approach' },
      { pathname: '/material-ui/guides/understand-mui-packages', title: 'Understand MUI packages' },
      { pathname: '/material-ui/guides/typescript', title: 'TypeScript' },
      { pathname: '/material-ui/guides/interoperability', title: 'Style library interoperability' },
      { pathname: '/material-ui/guides/styled-engine' },
      { pathname: '/material-ui/guides/minimizing-bundle-size' },
      { pathname: '/material-ui/guides/composition' },
      { pathname: '/material-ui/guides/routing' },
      { pathname: '/material-ui/guides/server-rendering' },
      { pathname: '/material-ui/guides/responsive-ui', title: 'Responsive UI' },
      {
        pathname: '/material-ui/guides/pickers-migration',
        title: 'Migration from @material-ui/pickers',
      },
      { pathname: '/material-ui/guides/testing' },
      { pathname: '/material-ui/guides/localization' },
      { pathname: '/material-ui/guides/content-security-policy', title: 'Content Security Policy' },
      { pathname: '/material-ui/guides/right-to-left', title: 'Right-to-left' },
      { pathname: '/material-ui/guides/shadow-dom', title: 'Shadow DOM' },
    ],
  },
  {
    pathname: '/material-ui/experimental-api',
    title: 'Experimental APIs',
    icon: standardNavIcons.ExperimentIcon,
    children: [
      {
        pathname: '/material-ui/experimental-api/classname-generator',
        title: 'ClassName generator',
      },
      {
        pathname: '/material-ui/experimental-api/css-theme-variables',
        subheader: 'CSS theme variables',
        children: [
          { pathname: '/material-ui/experimental-api/css-theme-variables/overview' },
          { pathname: '/material-ui/experimental-api/css-theme-variables/usage' },
          { pathname: '/material-ui/experimental-api/css-theme-variables/customization' },
          {
            pathname: '/material-ui/experimental-api/css-theme-variables/migration',
            title: 'Migrating to CSS variables',
          },
          {
            pathname: '/material-ui/experimental-api/css-variables',
            title: 'TODO merge with other pages',
          },
        ],
      },
    ],
  },
  {
    pathname: '/material-ui/discover-more',
    icon: standardNavIcons.AddIcon,
    children: [
      { pathname: '/material-ui/discover-more/showcase' },
      { pathname: '/material-ui/discover-more/related-projects' },
      { pathname: '/material-ui/discover-more/design-kits' },
      { pathname: '/material-ui/discover-more/roadmap' },
      { pathname: '/material-ui/discover-more/backers', title: 'Sponsors & Backers' },
      { pathname: '/material-ui/discover-more/vision' },
      { pathname: '/material-ui/discover-more/changelog' },
      { pathname: '/material-ui/discover-more/languages' },
    ],
  },
  {
    pathname: '/material-ui/migration',
    title: 'Migration',
    icon: standardNavIcons.BookIcon,
    children: [
      {
        pathname: '/material-ui/migration/migration-grid-v2',
        title: 'Migrating to Grid v2',
      },
      {
        pathname: '/material-ui/migration/v5',
        subheader: 'Upgrade to v5',
        children: [
          {
            pathname: '/material-ui/migration/migration-v4',
            title: 'Migrating to v5: getting started',
          },
          {
            pathname: '/material-ui/migration/v5-style-changes',
            title: 'Breaking changes: style and theme',
          },
          {
            pathname: '/material-ui/migration/v5-component-changes',
            title: 'Breaking changes: components',
          },
          {
            pathname: '/material-ui/migration/migrating-from-jss',
            title: 'Migrating from JSS (optional)',
          },
          {
            pathname: '/material-ui/migration/troubleshooting',
            title: 'Troubleshooting',
          },
        ],
      },
      {
        pathname: '/material-ui/migration/earlier',
        subheader: 'Earlier versions',
        children: [
          { pathname: '/material-ui/migration/migration-v3', title: 'Migration from v3 to v4' },
          { pathname: '/material-ui/migration/migration-v0x', title: 'Migration from v0.x to v1' },
        ],
      },
    ],
  },
  {
    pathname: 'https://mui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=sidenav',
    title: 'Templates',
    icon: standardNavIcons.ReaderIcon,
  },
];

export default pages;
