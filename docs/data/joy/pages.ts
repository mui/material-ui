import pagesApi from './pagesApi';

const pages = [
  {
    pathname: '/joy-ui/react-',
    title: 'Components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/joy-ui/react-button',
      },
    ],
  },
  {
    title: 'Component API',
    pathname: '/joy-ui/api',
    icon: 'CodeIcon',
    children: pagesApi,
  },
];

export default pages;
