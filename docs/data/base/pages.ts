import pagesApi from './pagesApi';

const pages = [
  {
    title: 'Component API',
    pathname: '/base/api',
    icon: 'CodeIcon',
    children: pagesApi,
  },
];

export default pages;
