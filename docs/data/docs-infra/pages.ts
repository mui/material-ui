import type { MuiPage } from 'docs/src/MuiPage';
import standardNavIcons from 'docs/src/modules/components/AppNavIcons';

const pages: readonly MuiPage[] = [
  {
    pathname: '/about',
    title: 'Main parent',
    icon: standardNavIcons.DescriptionIcon,
    children: [
      {
        pathname: '/x/react-data-grid-group',
        title: 'First-level child',
        children: [
          { pathname: '/x/react-data-grid/editing', title: 'Second-level child' },
          { pathname: '/x/react-data-grid', subheader: 'Subheader divider' },
          {
            pathname: '/x/api/data-grid-group',
            title: 'Second-level child parent',
            children: [
              { pathname: '/experiments/docs/callouts', title: 'Third-level child' },
              {
                pathname: '/x/api/data-grid-components-group',
                subheader: 'Subheader divider',
                children: [{ pathname: '/x/api/data-grid/data-grid', title: 'Fourth-level child' }],
              },
            ],
          },
        ],
      },
    ],
  },
  { pathname: '/versions', icon: standardNavIcons.DescriptionIcon },
  { pathname: '/docs/callouts', title: 'Callouts', icon: standardNavIcons.DescriptionIcon },
];

export default pages;
