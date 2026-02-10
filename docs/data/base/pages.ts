import type { MuiPage } from 'docs/src/MuiPage';
import pagesApi from 'docs/data/base/pagesApi';

const pages: readonly MuiPage[] = [
  {
    pathname: '/base-ui/getting-started-group',
    title: 'Getting started',
    children: [
      { pathname: '/base-ui/getting-started', title: 'Overview' },
      { pathname: '/base-ui/getting-started/quickstart', title: 'Quickstart' },
      { pathname: '/base-ui/getting-started/usage', title: 'Usage' },
      { pathname: '/base-ui/getting-started/customization', title: 'Customization' },
      { pathname: '/base-ui/getting-started/accessibility', title: 'Accessibility' },
      { pathname: '/base-ui/getting-started/roadmap', title: 'Roadmap' },
      { pathname: '/base-ui/getting-started/support' },
    ],
  },
  {
    pathname: '/base-ui/react-',
    title: 'Components',
    children: [
      { pathname: '/base-ui/all-components', title: 'All components' },
      {
        pathname: '/base-ui/components/inputs',
        subheader: 'inputs',
        children: [
          { pathname: '/base-ui/react-autocomplete', title: 'Autocomplete' },
          { pathname: '/base-ui/react-button', title: 'Button' },
          { pathname: '/base-ui/react-checkbox', title: 'Checkbox', planned: true },
          { pathname: '/base-ui/react-input', title: 'Input' },
          { pathname: '/base-ui/react-number-input', title: 'Number Input', unstable: true },
          { pathname: '/base-ui/react-radio-group', title: 'Radio Group', planned: true },
          { pathname: '/base-ui/react-rating', title: 'Rating', planned: true },
          { pathname: '/base-ui/react-select', title: 'Select' },
          { pathname: '/base-ui/react-slider', title: 'Slider' },
          { pathname: '/base-ui/react-switch', title: 'Switch' },
          {
            pathname: '/base-ui/react-toggle-button-group',
            title: 'Toggle Button Group',
            planned: true,
          },
        ],
      },
      {
        pathname: '/base-ui/components/data-display',
        subheader: 'data-display',
        children: [
          { pathname: '/base-ui/react-badge', title: 'Badge' },
          { pathname: '/base-ui/react-tooltip', title: 'Tooltip', planned: true },
        ],
      },
      {
        pathname: '/base-ui/components/feedback',
        subheader: 'feedback',
        children: [
          {
            pathname: '/base-ui/react-snackbar',
            title: 'Snackbar',
          },
        ],
      },
      {
        pathname: '/base-ui/components/surfaces',
        subheader: 'surfaces',
        children: [
          {
            pathname: '/base-ui/react-accordion',
            title: 'Accordion',
            planned: true,
          },
        ],
      },
      {
        pathname: '/base-ui/components/navigation',
        subheader: 'navigation',
        children: [
          { pathname: '/base-ui/react-drawer', title: 'Drawer', planned: true },
          { pathname: '/base-ui/react-menu', title: 'Menu' },
          { pathname: '/base-ui/react-pagination', title: 'Pagination', planned: true },
          { pathname: '/base-ui/react-table-pagination', title: 'Table Pagination' },
          { pathname: '/base-ui/react-tabs', title: 'Tabs' },
        ],
      },
      {
        pathname: '/base-ui/components/utils',
        subheader: 'utils',
        children: [
          { pathname: '/base-ui/react-click-away-listener', title: 'Click-Away Listener' },
          { pathname: '/base-ui/react-focus-trap', title: 'Focus Trap' },
          { pathname: '/base-ui/react-form-control', title: 'Form Control' },
          { pathname: '/base-ui/react-modal', title: 'Modal' },
          { pathname: '/base-ui/react-no-ssr', title: 'No-SSR' },
          { pathname: '/base-ui/react-popper', title: 'Popper' },
          { pathname: '/base-ui/react-popup', title: 'Popup', unstable: true },
          { pathname: '/base-ui/react-portal', title: 'Portal' },
          { pathname: '/base-ui/react-textarea-autosize', title: 'Textarea Autosize' },
          { pathname: '/base-ui/react-transitions', title: 'Transitions' },
        ],
      },
    ],
  },
  {
    title: 'APIs',
    pathname: '/base-ui/api',
    children: pagesApi,
  },
  {
    pathname: '/base-ui/guides',
    title: 'How-to guides',
    children: [
      {
        pathname: '/base-ui/guides/working-with-tailwind-css',
        title: 'Working with Tailwind CSS',
      },
      {
        pathname: '/base-ui/guides/overriding-component-structure',
        title: 'Overriding component structure',
      },
      {
        pathname: '/base-ui/guides/next-js-app-router',
        title: 'Next.js App Router',
      },
    ],
  },
];

export default pages;
