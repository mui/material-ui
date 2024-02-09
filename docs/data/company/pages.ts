import type { MuiPage } from 'docs/src/MuiPage';

const pages: readonly MuiPage[] = [
  {
    pathname: '/company/docs/products',
    title: 'Products',
    children: [
      { pathname: '/company/docs/product-ecosystem' },
      { pathname: '/company/docs/roadmap' },
      { pathname: '/company/docs/vision' },
    ],
  },
  {
    pathname: '/company/docs/operational',
    title: 'Operational',
    children: [
      { pathname: '/company/docs/branding' },
      { pathname: '/company/docs/contact' },
      { pathname: '/company/docs/sponsors' },
    ],
  },
];

export default pages;
