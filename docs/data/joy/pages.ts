import type { MuiPage } from 'docs/src/MuiPage';
import pagesApi from 'docs/data/joy/pagesApi';

const pages: readonly MuiPage[] = [
  {
    pathname: '/joy-ui/getting-started-group',
    title: 'Getting started',
    children: [
      { pathname: '/joy-ui/getting-started', title: 'Overview' },
      { pathname: '/joy-ui/getting-started/installation' },
      { pathname: '/joy-ui/getting-started/usage' },
      { pathname: '/joy-ui/getting-started/tutorial' },
      { pathname: '/joy-ui/getting-started/templates' },
      { pathname: '/joy-ui/getting-started/roadmap' },
      { pathname: '/joy-ui/getting-started/support' },
      {
        pathname: '/joy-ui/main-features',
        subheader: 'main-features',
        children: [
          { pathname: '/joy-ui/main-features/global-variants' },
          { pathname: '/joy-ui/main-features/color-inversion' },
          { pathname: '/joy-ui/main-features/automatic-adjustment' },
          { pathname: '/joy-ui/main-features/dark-mode-optimization' },
        ],
      },
    ],
  },
  {
    pathname: '/joy-ui/react-',
    title: 'Components',
    children: [
      {
        pathname: '/joy-ui/components/inputs',
        subheader: 'inputs',
        children: [
          { pathname: '/joy-ui/react-autocomplete' },
          { pathname: '/joy-ui/react-button' },
          { pathname: '/joy-ui/react-button-group', title: 'Button Group' },
          { pathname: '/joy-ui/react-checkbox' },
          { pathname: '/joy-ui/react-input' },
          { pathname: '/joy-ui/react-radio-button', title: 'Radio Button' },
          { pathname: '/joy-ui/react-select' },
          { pathname: '/joy-ui/react-slider' },
          { pathname: '/joy-ui/react-switch' },
          { pathname: '/joy-ui/react-textarea' },
          { pathname: '/joy-ui/react-text-field', title: 'Text Field' },
          {
            pathname: '/joy-ui/react-toggle-button-group',
            title: 'Toggle Button Group',
          },
        ],
      },
      {
        pathname: '/joy-ui/components/data-display',
        subheader: 'data-display',
        children: [
          { pathname: '/joy-ui/react-aspect-ratio', title: 'Aspect Ratio' },
          { pathname: '/joy-ui/react-avatar' },
          { pathname: '/joy-ui/react-badge' },
          { pathname: '/joy-ui/react-chip' },
          { pathname: '/joy-ui/react-divider' },
          { pathname: '/joy-ui/react-list' },
          { pathname: '/joy-ui/react-table' },
          { pathname: '/joy-ui/react-tooltip' },
          { pathname: '/joy-ui/react-typography' },
        ],
      },
      {
        pathname: '/joy-ui/components/feedback',
        subheader: 'feedback',
        children: [
          { pathname: '/joy-ui/react-alert' },
          { pathname: '/joy-ui/react-circular-progress', title: 'Circular Progress' },
          { pathname: '/joy-ui/react-linear-progress', title: 'Linear Progress' },
          { pathname: '/joy-ui/react-modal' },
          { pathname: '/joy-ui/react-skeleton' },
          { pathname: '/joy-ui/react-snackbar' },
        ],
      },
      {
        pathname: '/joy-ui/components/surfaces',
        subheader: 'surfaces',
        children: [
          { pathname: '/joy-ui/react-accordion' },
          { pathname: '/joy-ui/react-card' },
          { pathname: '/joy-ui/react-sheet' },
        ],
      },
      {
        pathname: '/joy-ui/components/navigation',
        subheader: 'navigation',
        children: [
          { pathname: '/joy-ui/react-breadcrumbs' },
          { pathname: '/joy-ui/react-drawer' },
          { pathname: '/joy-ui/react-link' },
          { pathname: '/joy-ui/react-menu' },
          { pathname: '/joy-ui/react-stepper' },
          { pathname: '/joy-ui/react-tabs' },
        ],
      },
      {
        pathname: '/joy-ui/components/layout',
        subheader: 'layout',
        children: [
          { pathname: '/joy-ui/react-box' },
          { pathname: '/joy-ui/react-grid' },
          { pathname: '/joy-ui/react-stack' },
        ],
      },
      {
        pathname: '/joy-ui/components/utils',
        subheader: 'utils',
        children: [{ pathname: '/joy-ui/react-css-baseline', title: 'CSS Baseline' }],
      },
    ],
  },
  {
    title: 'APIs',
    pathname: '/joy-ui/api',
    children: pagesApi,
  },
  {
    pathname: '/joy-ui/customization',
    children: [
      { pathname: '/joy-ui/customization/approaches' },
      {
        pathname: '/joy-ui/customization/theme',
        subheader: 'Theme',
        children: [
          { pathname: '/joy-ui/customization/theme-colors', title: 'Colors' },
          { pathname: '/joy-ui/customization/theme-shadow', title: 'Shadow' },
          { pathname: '/joy-ui/customization/theme-typography', title: 'Typography' },
          { pathname: '/joy-ui/customization/themed-components', title: 'Components' },
        ],
      },
      {
        pathname: '/joy-ui/customization/guides',
        subheader: 'Guides',
        children: [
          { pathname: '/joy-ui/customization/dark-mode' },
          { pathname: '/joy-ui/customization/using-css-variables', title: 'Using CSS variables' },
          {
            pathname: '/joy-ui/customization/creating-themed-components',
            title: 'Creating themed components',
          },
          {
            pathname: '/joy-ui/customization/overriding-component-structure',
            title: 'Overriding the component structure',
          },
          {
            pathname: '/joy-ui/customization/right-to-left',
            title: 'Right-to-left support',
          },
        ],
      },
      {
        subheader: 'Tools',
        pathname: '/joy-ui/customization/tool',
        children: [
          { pathname: '/joy-ui/customization/default-theme-viewer' },
          { pathname: '/joy-ui/customization/theme-builder' },
        ],
      },
    ],
  },
  {
    pathname: '/joy-ui/integrations',
    title: 'Integrations',
    children: [
      {
        pathname: '/joy-ui/integrations/next-js-app-router',
        title: 'Next.js App Router',
      },
      {
        pathname: '/joy-ui/integrations/material-ui',
        title: 'Usage with Material UI',
      },
      {
        pathname: '/joy-ui/integrations/icon-libraries',
        title: 'Using other icon libraries',
      },
    ],
  },
  {
    pathname: '/joy-ui/migration',
    title: 'Migration',
    children: [
      {
        pathname: '/joy-ui/migration/migrating-default-theme',
        title: 'Migrating the default theme',
      },
    ],
  },
];

export default pages;
