import type { MuiPage, OrderedMuiPage } from 'docs/src/MuiPage';
import standardNavIcons from 'docs/src/modules/components/AppNavIcons';

const pages: readonly MuiPage[] = [
  { pathname: '/versions' },
  {
    pathname: 'https://mui.com/store/',
    title: 'Templates',
    icon: standardNavIcons.ReaderIcon,
    linkProps: {
      'data-ga-event-category': 'store',
      'data-ga-event-action': 'click',
      'data-ga-event-label': 'sidenav',
    },
  },
  { pathname: '/blog', title: 'Blog', icon: standardNavIcons.BookIcon },
  {
    pathname: '/x/react-data-grid-group',
    title: 'Data Grid',
    children: [
      { pathname: '/x/react-data-grid', title: 'Overview' },
      { pathname: '/x/react-data-grid/demo' },
      {
        pathname: '/x/react-data-grid/columns',
        children: [
          { pathname: '/x/react-data-grid/column-definition' },
          { pathname: '/x/react-data-grid/column-dimensions' },
          { pathname: '/x/react-data-grid/column-visibility' },
        ],
      },
      {
        pathname: '/x/react-data-grid/rows',
        children: [
          { pathname: '/x/react-data-grid/row-definition' },
          { pathname: '/x/react-data-grid/row-updates' },
          { pathname: '/x/react-data-grid/row-height' },
        ],
      },
      { pathname: '/x/react-data-grid/editing' },
      {
        pathname: '/x/api/data-grid-group',
        title: 'API Reference',
        children: [
          { pathname: '/x/api/data-grid', title: 'Index' },
          {
            pathname: '/x/api/data-grid-components-group',
            subheader: 'Components',
            children: [
              { pathname: '/x/api/data-grid/data-grid', title: 'DataGrid' },
              {
                pathname: '/x/api/data-grid/data-grid-premium',
                title: 'DataGridPremium',
                plan: 'premium',
              },
              { pathname: '/x/api/data-grid/data-grid-pro', title: 'DataGridPro', plan: 'pro' },
            ],
          },
          {
            pathname: '/x/api/data-grid-interfaces-group',
            subheader: 'Interfaces',
            children: [
              { pathname: '/x/api/data-grid/grid-api', title: 'GridApi' },
              { pathname: '/x/api/data-grid/grid-cell-params', title: 'GridCellParams' },
              { pathname: '/x/api/data-grid/grid-col-def', title: 'GridColDef' },
            ],
          },
        ],
      },
    ],
  },
];

export type { MuiPage, OrderedMuiPage };
export default pages;
