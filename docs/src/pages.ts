import type { MuiPage, OrderedMuiPage } from 'docs/src/MuiPage';

const pages: readonly MuiPage[] = [
  { pathname: '/versions' },
  { pathname: '/docs/callouts', title: 'Callouts' },
  {
    pathname: '/about',
    title: 'Main parent',
    children: [
      {
        pathname: '/x/react-data-grid-group',
        title: 'First-level child',
        children: [
          { pathname: '/x/react-data-grid/editing', title: 'Second-level child' },
          { pathname: '/x/react-data-grid', title: 'Second-level child' },
          {
            pathname: '/x/api/data-grid-group',
            title: 'Second-level child parent',
            children: [
              { pathname: '/x/api/data-grid', title: 'Third-level child' },
              {
                pathname: '/x/api/data-grid-components-group',
                subheader: 'Subheader divider',
                children: [
                  { pathname: '/x/api/data-grid/data-grid', title: 'Fourth-level child' },
                  { pathname: '/x/api/data-grid/grid-api', title: 'Fourth-level child' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export type { MuiPage, OrderedMuiPage };
export default pages;
