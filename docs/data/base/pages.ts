import pagesApi from './pagesApi';

const pages = [
  {
    pathname: '/base/getting-started',
    icon: 'DescriptionIcon',
    children: [
      { pathname: '/base/getting-started/overview', title: 'Overview' },
      { pathname: '/base/getting-started/installation', title: 'Installation' },
      { pathname: '/base/getting-started/usage', title: 'Usage' },
      { pathname: '/base/getting-started/customization', title: 'Customization' },
    ],
  },
  {
    pathname: '/base/react-',
    title: 'Components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/base/components/inputs',
        subheader: 'inputs',
        children: [
          { pathname: '/base/react-button', title: 'Button' },
          { pathname: '/base/react-input', title: 'Input' },
          { pathname: '/base/react-select', title: 'Select' },
          { pathname: '/base/react-slider', title: 'Slider' },
          { pathname: '/base/react-switch', title: 'Switch' },
        ],
      },
      {
        pathname: '/base/components/data-display',
        subheader: 'data-display',
        children: [
          {
            pathname: '/base/react-badge',
            title: 'Badge',
          },
        ],
      },
      {
        pathname: '/base/components/feedback',
        subheader: 'feedback',
        children: [
          {
            pathname: '/base/react-snackbar',
            title: 'Snackbar',
          },
        ],
      },
      {
        pathname: '/base/components/navigation',
        subheader: 'navigation',
        children: [
          { pathname: '/base/react-menu', title: 'Menu' },
          { pathname: '/base/react-table-pagination', title: 'Table pagination' },
          { pathname: '/base/react-tabs', title: 'Tabs' },
        ],
      },
      {
        pathname: '/base/components/utils',
        subheader: 'utils',
        children: [
          { pathname: '/base/react-click-away-listener', title: 'Click-away listener' },
          { pathname: '/base/react-form-control', title: 'Form control' },
          { pathname: '/base/react-modal', title: 'Modal' },
          { pathname: '/base/react-no-ssr', title: 'No SSR' },
          { pathname: '/base/react-popper', title: 'Popper' },
          { pathname: '/base/react-portal', title: 'Portal' },
          { pathname: '/base/react-textarea-autosize', title: 'Textarea autosize' },
          { pathname: '/base/react-trap-focus', title: 'Trap focus' },
        ],
      },
    ],
  },
  {
    title: 'Component API',
    pathname: '/base/api',
    icon: 'CodeIcon',
    children: pagesApi,
  },
  {
    pathname: '/base/guides',
    title: 'How To Guides',
    icon: 'VisibilityIcon',
    children: [
      {
        pathname: '/base/guides/working-with-tailwind-css',
        title: 'Working with Tailwind CSS',
      },
    ],
  },
];

export default pages;
