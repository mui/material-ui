import pagesApi from './pagesApi';

const pages = [
  {
    pathname: '/base/getting-started',
    icon: 'DescriptionIcon',
    children: [{ pathname: '/base/getting-started/installation' }],
  },
  {
    pathname: '/base/react-',
    title: 'Components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/base/components/inputs',
        subheader: 'inputs',
        children: [{ pathname: '/base/react-button', title: 'Button' }],
      },
      {
        pathname: '/base/components/navigation',
        subheader: 'navigation',
        children: [{ pathname: '/base/react-menu', title: 'Menu' }],
      },
      {
        pathname: '/base/components/utils',
        subheader: 'utils',
        children: [
          { pathname: '/base/react-click-away-listener', title: 'Click-away listener' },
          { pathname: '/base/react-portal', title: 'Portal' },
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
];

export default pages;
