import pagesApi from './pagesApi';

const pages = [
  {
    pathname: '/base/getting-started',
    icon: 'DescriptionIcon',
    children: [{ pathname: '/base/getting-started/installation' }],
  },
  {
    title: 'Component API',
    pathname: '/base/api',
    icon: 'CodeIcon',
    children: pagesApi,
  },
];

export default pages;
