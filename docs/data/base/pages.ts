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
        pathname: '/base/components/navigation',
        subheader: 'navigation',
        children: [{ pathname: '/base/react-menu', title: 'Menu' }],
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
