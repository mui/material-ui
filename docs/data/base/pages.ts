import standardNavIcons from 'docs/src/modules/components/AppNavIcons';
<<<<<<< HEAD
import pagesApi from 'docs/data/base/pagesApi';

const pages = [
  {
    pathname: '/base/getting-started',
    icon: standardNavIcons.DescriptionIcon,
    children: [
      { pathname: '/base/getting-started/overview', title: 'Overview' },
      { pathname: '/base/getting-started/quickstart', title: 'Quickstart' },
      { pathname: '/base/getting-started/usage', title: 'Usage' },
      { pathname: '/base/getting-started/customization', title: 'Customization' },
    ],
  },
  {
    pathname: '/base/react-',
=======
import pagesApi from 'docs/data/base-ui/pagesApi';

const pages = [
  {
    pathname: '/base-ui/getting-started',
    icon: standardNavIcons.DescriptionIcon,
    children: [
      { pathname: '/base-ui/getting-started/overview', title: 'Overview' },
      { pathname: '/base-ui/getting-started/quickstart', title: 'Quickstart' },
      { pathname: '/base-ui/getting-started/usage', title: 'Usage' },
      { pathname: '/base-ui/getting-started/customization', title: 'Customization' },
    ],
  },
  {
    pathname: '/base-ui/react-',
>>>>>>> 36ed3faeea (don't rename docs/data/base)
    title: 'Components',
    icon: standardNavIcons.ToggleOnIcon,
    children: [
      {
<<<<<<< HEAD
        pathname: '/base/components/inputs',
        subheader: 'inputs',
        children: [
          { pathname: '/base/react-autocomplete', title: 'Autocomplete' },
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
=======
        pathname: '/base-ui/components/inputs',
        subheader: 'inputs',
        children: [
          { pathname: '/base-ui/react-button', title: 'Button' },
          { pathname: '/base-ui/react-input', title: 'Input' },
          { pathname: '/base-ui/react-select', title: 'Select' },
          { pathname: '/base-ui/react-slider', title: 'Slider' },
          { pathname: '/base-ui/react-switch', title: 'Switch' },
        ],
      },
      {
        pathname: '/base-ui/components/data-display',
        subheader: 'data-display',
        children: [
          {
            pathname: '/base-ui/react-badge',
>>>>>>> 36ed3faeea (don't rename docs/data/base)
            title: 'Badge',
          },
        ],
      },
      {
<<<<<<< HEAD
        pathname: '/base/components/feedback',
        subheader: 'feedback',
        children: [
          {
            pathname: '/base/react-snackbar',
=======
        pathname: '/base-ui/components/feedback',
        subheader: 'feedback',
        children: [
          {
            pathname: '/base-ui/react-snackbar',
>>>>>>> 36ed3faeea (don't rename docs/data/base)
            title: 'Snackbar',
          },
        ],
      },
      {
<<<<<<< HEAD
        pathname: '/base/components/navigation',
        subheader: 'navigation',
        children: [
          { pathname: '/base/react-menu', title: 'Menu' },
          { pathname: '/base/react-table-pagination', title: 'Table Pagination' },
          { pathname: '/base/react-tabs', title: 'Tabs' },
        ],
      },
      {
        pathname: '/base/components/utils',
        subheader: 'utils',
        children: [
          { pathname: '/base/react-click-away-listener', title: 'Click-Away Listener' },
          { pathname: '/base/react-focus-trap', title: 'Focus Trap' },
          { pathname: '/base/react-form-control', title: 'Form Control' },
          { pathname: '/base/react-modal', title: 'Modal' },
          { pathname: '/base/react-no-ssr', title: 'No-SSR' },
          { pathname: '/base/react-popper', title: 'Popper' },
          { pathname: '/base/react-portal', title: 'Portal' },
          { pathname: '/base/react-textarea-autosize', title: 'Textarea Autosize' },
=======
        pathname: '/base-ui/components/navigation',
        subheader: 'navigation',
        children: [
          { pathname: '/base-ui/react-menu', title: 'Menu' },
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
          { pathname: '/base-ui/react-portal', title: 'Portal' },
          { pathname: '/base-ui/react-textarea-autosize', title: 'Textarea Autosize' },
>>>>>>> 36ed3faeea (don't rename docs/data/base)
        ],
      },
    ],
  },
  {
    title: 'APIs',
<<<<<<< HEAD
    pathname: '/base/api',
=======
    pathname: '/base-ui/api',
>>>>>>> 36ed3faeea (don't rename docs/data/base)
    icon: standardNavIcons.CodeIcon,
    children: pagesApi,
  },
  {
<<<<<<< HEAD
    pathname: '/base/guides',
=======
    pathname: '/base-ui/guides',
>>>>>>> 36ed3faeea (don't rename docs/data/base)
    title: 'How-to guides',
    icon: standardNavIcons.VisibilityIcon,
    children: [
      {
<<<<<<< HEAD
        pathname: '/base/guides/working-with-tailwind-css',
        title: 'Working with Tailwind CSS',
      },
      {
        pathname: '/base/guides/overriding-component-structure',
=======
        pathname: '/base-ui/guides/working-with-tailwind-css',
        title: 'Working with Tailwind CSS',
      },
      {
        pathname: '/base-ui/guides/overriding-component-structure',
>>>>>>> 36ed3faeea (don't rename docs/data/base)
        title: 'Overriding component structure',
      },
    ],
  },
];

export default pages;
