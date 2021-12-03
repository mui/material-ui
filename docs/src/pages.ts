import pagesApi from './pagesApi';

export interface MuiPage {
  pathname: string;
  children?: MuiPage[];
  disableDrawer?: boolean;
  icon?: string;
  /**
   * Pages are considered to be ordered depth-first.
   * If a page should be excluded from this order, set `order: false`.
   * You want to set `ordered: false` if you don't want the page to appear in an ordered list e.g. for previous/next page navigation.
   */
  ordered?: boolean;
  /**
   * Props spread to the Link component
   */
  linkProps?: Record<string, unknown>;
  subheader?: string;
  /**
   * Overrides the default page title.
   */
  title?: string;
}

export interface OrderedMuiPage extends MuiPage {
  ordered?: true;
}

export const materialPages: readonly MuiPage[] = [
  {
    pathname: '/material/getting-started',
    icon: 'DescriptionIcon',
    children: [
      { pathname: '/material/getting-started/installation' },
      { pathname: '/material/getting-started/usage' },
      { pathname: '/material/getting-started/example-projects' },
      { pathname: '/material/getting-started/templates' },
      { pathname: '/material/getting-started/learn' },
      { pathname: '/material/getting-started/faq', title: 'FAQs' },
      { pathname: '/material/getting-started/supported-components' },
      { pathname: '/material/getting-started/supported-platforms' },
      { pathname: '/material/getting-started/support' },
    ],
  },
  {
    pathname: '/material/components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/material/components',
        subheader: '/material/components/inputs',
        children: [
          { pathname: '/material/components/autocomplete' },
          { pathname: '/material/components/buttons', title: 'Button' },
          { pathname: '/material/components/button-group' },
          { pathname: '/material/components/checkboxes', title: 'Checkbox' },
          { pathname: '/material/components/floating-action-button' },
          { pathname: '/material/components/radio-buttons', title: 'Radio button' },
          { pathname: '/material/components/rating' },
          { pathname: '/material/components/selects', title: 'Select' },
          { pathname: '/material/components/slider' },
          { pathname: '/material/components/switches', title: 'Switch' },
          { pathname: '/material/components/text-fields', title: 'Text field' },
          { pathname: '/material/components/transfer-list' },
          { pathname: '/material/components/toggle-button' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/data-display',
        children: [
          { pathname: '/material/components/avatars', title: 'Avatar' },
          { pathname: '/material/components/badges', title: 'Badge' },
          { pathname: '/material/components/chips', title: 'Chip' },
          { pathname: '/material/components/dividers', title: 'Divider' },
          { pathname: '/material/components/icons' },
          { pathname: '/material/components/material-icons' },
          { pathname: '/material/components/lists', title: 'List' },
          { pathname: '/material/components/tables', title: 'Table' },
          { pathname: '/material/components/tooltips', title: 'Tooltip' },
          { pathname: '/material/components/typography' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/feedback',
        children: [
          { pathname: '/material/components/alert' },
          { pathname: '/material/components/backdrop' },
          { pathname: '/material/components/dialogs' },
          { pathname: '/material/components/progress' },
          { pathname: '/material/components/skeleton' },
          { pathname: '/material/components/snackbars', title: 'Snackbar' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/surfaces',
        children: [
          { pathname: '/material/components/accordion' },
          { pathname: '/material/components/app-bar' },
          { pathname: '/material/components/cards', title: 'Card' },
          { pathname: '/material/components/paper' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/navigation',
        children: [
          { pathname: '/material/components/bottom-navigation' },
          { pathname: '/material/components/breadcrumbs' },
          { pathname: '/material/components/drawers', title: 'Drawer' },
          { pathname: '/material/components/links', title: 'Link' },
          { pathname: '/material/components/menus', title: 'Menu' },
          { pathname: '/material/components/pagination' },
          { pathname: '/material/components/speed-dial' },
          { pathname: '/material/components/steppers', title: 'Stepper' },
          { pathname: '/material/components/tabs' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/layout',
        children: [
          { pathname: '/material/components/box' },
          { pathname: '/material/components/container' },
          { pathname: '/material/components/grid' },
          { pathname: '/material/components/stack' },
          { pathname: '/material/components/image-list' },
          { pathname: '/material/components/hidden' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/utils',
        children: [
          { pathname: '/material/components/click-away-listener' },
          { pathname: '/material/components/css-baseline', title: 'CSS Baseline' },
          { pathname: '/material/components/modal' },
          { pathname: '/material/components/no-ssr', title: 'No SSR' },
          { pathname: '/material/components/popover' },
          { pathname: '/material/components/popper' },
          { pathname: '/material/components/portal' },
          { pathname: '/material/components/textarea-autosize' },
          { pathname: '/material/components/transitions' },
          { pathname: '/material/components/use-media-query', title: 'useMediaQuery' },
        ],
      },
      {
        pathname: '/material/components',
        subheader: '/material/components/lab',
        children: [
          { pathname: '/material/components/about-the-lab', title: 'About the lab 🧪' },
          {
            pathname: '/material/components',
            subheader: '/material/components/lab-pickers',
            title: 'Date / Time',
            children: [
              { pathname: '/material/components/pickers', title: 'Introduction' },
              { pathname: '/material/components/date-picker' },
              {
                pathname: '/material/components/date-range-picker',
                title: 'Date Range Picker ⚡️',
              },
              { pathname: '/material/components/date-time-picker' },
              { pathname: '/material/components/time-picker' },
            ],
          },
          { pathname: '/material/components/masonry' },
          { pathname: '/material/components/timeline' },
          { pathname: '/material/components/trap-focus' },
          { pathname: '/material/components/tree-view' },
        ],
      },
    ],
  },
  {
    title: 'Component API',
    pathname: '/material/api-docs',
    icon: 'CodeIcon',
    children: [
      ...pagesApi,
      {
        pathname: '/material/api-docs/data-grid',
        title: 'Data Grid',
        children: [
          { pathname: '/material/api-docs/data-grid', title: 'API Reference' },
          { pathname: '/material/api-docs/data-grid/data-grid', title: 'DataGrid' },
          { pathname: '/material/api-docs/data-grid/data-grid-pro', title: 'DataGridPro' },
          { pathname: '/material/api-docs/data-grid/grid-api', title: 'GridApi' },
          { pathname: '/material/api-docs/data-grid/grid-col-def', title: 'GridColDef' },
          { pathname: '/material/api-docs/data-grid/grid-cell-params', title: 'GridCellParams' },
          { pathname: '/material/api-docs/data-grid/grid-row-params', title: 'GridRowParams' },
          {
            pathname: '/material/api-docs/data-grid/grid-csv-export-options',
            title: 'GridCSVExportOptions',
          },
          {
            pathname: '/material/api-docs/data-grid/grid-print-export-options',
            title: 'GridPrintExportOptions',
          },
        ].map((page) => {
          return {
            ...page,
            linkProps: {
              linkAs: `${page.pathname.replace(/^\/material\/api-docs/, '/material/api')}/`,
            },
          };
        }),
      },
    ]
      .sort((a, b) =>
        a.pathname
          .replace('/material/api-docs/', '')
          .localeCompare(b.pathname.replace('/material/api-docs/', '')),
      )
      .map((page) => {
        return {
          ...page,
          linkProps: {
            linkAs: `${page.pathname.replace(/^\/material\/api-docs/, '/material/api')}/`,
          },
        };
      }),
  },
  {
    pathname: '/material/customization',
    icon: 'CreateIcon',
    children: [
      {
        pathname: '/material/customization',
        subheader: '/material/customization/theme',
        children: [
          { pathname: '/material/customization/theming' },
          { pathname: '/material/customization/palette' },
          { pathname: '/material/customization/dark-mode', title: 'Dark mode' },
          { pathname: '/material/customization/typography' },
          { pathname: '/material/customization/spacing' },
          { pathname: '/material/customization/breakpoints' },
          { pathname: '/material/customization/density' },
          { pathname: '/material/customization/z-index', title: 'z-index' },
          { pathname: '/material/customization/transitions' },
          { pathname: '/material/customization/theme-components', title: 'Components' },
          { pathname: '/material/customization/default-theme', title: 'Default Theme' },
        ],
      },
      { pathname: '/material/customization/how-to-customize' },
      { pathname: '/material/customization/color' },
      { pathname: '/material/customization/unstyled-components' },
    ],
  },
  {
    pathname: '/material/guides',
    title: 'How To Guides',
    icon: 'VisibilityIcon',
    children: [
      { pathname: '/material/guides/api', title: 'API Design Approach' },
      { pathname: '/material/guides/classname-generator', title: 'ClassName Generator' },
      { pathname: '/material/guides/understand-mui-packages', title: 'Understand MUI packages' },
      { pathname: '/material/guides/typescript', title: 'TypeScript' },
      { pathname: '/material/guides/interoperability', title: 'Style Library Interoperability' },
      { pathname: '/material/guides/styled-engine' },
      { pathname: '/material/guides/minimizing-bundle-size' },
      { pathname: '/material/guides/composition' },
      { pathname: '/material/guides/routing' },
      { pathname: '/material/guides/server-rendering' },
      { pathname: '/material/guides/responsive-ui', title: 'Responsive UI' },
      {
        pathname: '/material/guides/pickers-migration',
        title: 'Migration from @material-ui/pickers',
      },
      { pathname: '/material/guides/migration-v4', title: 'Migration From v4' },
      { pathname: '/material/guides/migration-v3', title: 'Migration From v3' },
      { pathname: '/material/guides/migration-v0x', title: 'Migration From v0.x' },
      { pathname: '/material/guides/testing' },
      { pathname: '/material/guides/localization' },
      { pathname: '/material/guides/content-security-policy', title: 'Content Security Policy' },
      { pathname: '/material/guides/right-to-left', title: 'Right-to-left' },
      { pathname: '/material/guides/flow' },
    ],
  },
  {
    pathname: '/material/discover-more',
    icon: 'AddIcon',
    children: [
      { pathname: '/material/discover-more/showcase' },
      { pathname: '/material/discover-more/related-projects' },
      { pathname: '/material/discover-more/roadmap' },
      { pathname: '/material/discover-more/backers', title: 'Sponsors & Backers' },
      { pathname: '/material/discover-more/vision' },
      { pathname: '/material/discover-more/changelog' },
      { pathname: '/material/discover-more/languages' },
      { pathname: '/about', title: 'About us' },
    ],
  },
  {
    pathname: 'https://material-ui.com/store/',
    title: 'Templates',
    icon: 'ReaderIcon',
    linkProps: {
      'data-ga-event-category': 'store',
      'data-ga-event-action': 'click',
      'data-ga-event-label': 'sidenav',
    },
  },
];

export const systemPages: readonly MuiPage[] = [
  {
    pathname: '/system',
    icon: 'BuildIcon',
    children: [
      { pathname: '/system/basics' },
      { pathname: '/system/properties' },
      { pathname: '/system/the-sx-prop', title: 'The sx prop' },
      { pathname: '/system/borders' },
      { pathname: '/system/display' },
      { pathname: '/system/flexbox' },
      { pathname: '/system/grid' },
      { pathname: '/system/palette' },
      { pathname: '/system/positions' },
      { pathname: '/system/shadows' },
      { pathname: '/system/sizing' },
      { pathname: '/system/spacing' },
      { pathname: '/system/screen-readers' },
      { pathname: '/system/typography' },
      { pathname: '/system/advanced' },
      { pathname: '/system/box' },
      { pathname: '/system/styled', title: 'styled' },
    ],
  },
];

const pages: readonly MuiPage[] = [
  {
    pathname: '/getting-started',
    icon: 'DescriptionIcon',
    children: [
      { pathname: '/getting-started/installation' },
      { pathname: '/getting-started/usage' },
      { pathname: '/getting-started/example-projects' },
      { pathname: '/getting-started/templates' },
      { pathname: '/getting-started/learn' },
      { pathname: '/getting-started/faq', title: 'FAQs' },
      { pathname: '/getting-started/supported-components' },
      { pathname: '/getting-started/supported-platforms' },
      { pathname: '/getting-started/support' },
    ],
  },
  {
    pathname: '/components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/components',
        subheader: '/components/inputs',
        children: [
          { pathname: '/components/autocomplete' },
          { pathname: '/components/buttons', title: 'Button' },
          { pathname: '/components/button-group' },
          { pathname: '/components/checkboxes', title: 'Checkbox' },
          { pathname: '/components/floating-action-button' },
          { pathname: '/components/radio-buttons', title: 'Radio button' },
          { pathname: '/components/rating' },
          { pathname: '/components/selects', title: 'Select' },
          { pathname: '/components/slider' },
          { pathname: '/components/switches', title: 'Switch' },
          { pathname: '/components/text-fields', title: 'Text field' },
          { pathname: '/components/transfer-list' },
          { pathname: '/components/toggle-button' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/data-display',
        children: [
          { pathname: '/components/avatars', title: 'Avatar' },
          { pathname: '/components/badges', title: 'Badge' },
          { pathname: '/components/chips', title: 'Chip' },
          { pathname: '/components/dividers', title: 'Divider' },
          { pathname: '/components/icons' },
          { pathname: '/components/material-icons' },
          { pathname: '/components/lists', title: 'List' },
          { pathname: '/components/tables', title: 'Table' },
          { pathname: '/components/tooltips', title: 'Tooltip' },
          { pathname: '/components/typography' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/feedback',
        children: [
          { pathname: '/components/alert' },
          { pathname: '/components/backdrop' },
          { pathname: '/components/dialogs' },
          { pathname: '/components/progress' },
          { pathname: '/components/skeleton' },
          { pathname: '/components/snackbars', title: 'Snackbar' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/surfaces',
        children: [
          { pathname: '/components/accordion' },
          { pathname: '/components/app-bar' },
          { pathname: '/components/cards', title: 'Card' },
          { pathname: '/components/paper' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/navigation',
        children: [
          { pathname: '/components/bottom-navigation' },
          { pathname: '/components/breadcrumbs' },
          { pathname: '/components/drawers', title: 'Drawer' },
          { pathname: '/components/links', title: 'Link' },
          { pathname: '/components/menus', title: 'Menu' },
          { pathname: '/components/pagination' },
          { pathname: '/components/speed-dial' },
          { pathname: '/components/steppers', title: 'Stepper' },
          { pathname: '/components/tabs' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/layout',
        children: [
          { pathname: '/components/box' },
          { pathname: '/components/container' },
          { pathname: '/components/grid' },
          { pathname: '/components/stack' },
          { pathname: '/components/image-list' },
          { pathname: '/components/hidden' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/utils',
        children: [
          { pathname: '/components/click-away-listener' },
          { pathname: '/components/css-baseline', title: 'CSS Baseline' },
          { pathname: '/components/modal' },
          { pathname: '/components/no-ssr', title: 'No SSR' },
          { pathname: '/components/popover' },
          { pathname: '/components/popper' },
          { pathname: '/components/portal' },
          { pathname: '/components/textarea-autosize' },
          { pathname: '/components/transitions' },
          { pathname: '/components/use-media-query', title: 'useMediaQuery' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/data-grid',
        children: [
          {
            pathname: '/components/data-grid',
            subheader: '/components/data-grid/overview',
            title: 'Overview',
          },
          { pathname: '/components/data-grid/demo' },
          { pathname: '/components/data-grid/getting-started' },
          { pathname: '/components/data-grid/layout' },
          { pathname: '/components/data-grid/columns' },
          { pathname: '/components/data-grid/rows' },
          { pathname: '/components/data-grid/editing' },
          { pathname: '/components/data-grid/sorting' },
          { pathname: '/components/data-grid/filtering' },
          { pathname: '/components/data-grid/pagination' },
          { pathname: '/components/data-grid/selection' },
          { pathname: '/components/data-grid/events' },
          { pathname: '/components/data-grid/export' },
          { pathname: '/components/data-grid/components' },
          { pathname: '/components/data-grid/style' },
          { pathname: '/components/data-grid/localization' },
          { pathname: '/components/data-grid/virtualization' },
          { pathname: '/components/data-grid/accessibility' },
          { pathname: '/components/data-grid/group-pivot', title: '🚧 Group & Pivot' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/lab',
        children: [
          { pathname: '/components/about-the-lab', title: 'About the lab 🧪' },
          {
            pathname: '/components',
            subheader: '/components/lab-pickers',
            title: 'Date / Time',
            children: [
              { pathname: '/components/pickers', title: 'Introduction' },
              { pathname: '/components/date-picker' },
              { pathname: '/components/date-range-picker', title: 'Date Range Picker ⚡️' },
              { pathname: '/components/date-time-picker' },
              { pathname: '/components/time-picker' },
            ],
          },
          { pathname: '/components/masonry' },
          { pathname: '/components/timeline' },
          { pathname: '/components/trap-focus' },
          { pathname: '/components/tree-view' },
        ],
      },
    ],
  },
  {
    title: 'Component API',
    pathname: '/api-docs',
    icon: 'CodeIcon',
    children: [
      ...pagesApi,
      {
        pathname: '/api-docs/data-grid',
        title: 'Data Grid',
        children: [
          { pathname: '/api-docs/data-grid', title: 'API Reference' },
          { pathname: '/api-docs/data-grid/data-grid', title: 'DataGrid' },
          { pathname: '/api-docs/data-grid/data-grid-pro', title: 'DataGridPro' },
          { pathname: '/api-docs/data-grid/grid-api', title: 'GridApi' },
          { pathname: '/api-docs/data-grid/grid-col-def', title: 'GridColDef' },
          { pathname: '/api-docs/data-grid/grid-cell-params', title: 'GridCellParams' },
          { pathname: '/api-docs/data-grid/grid-row-params', title: 'GridRowParams' },
          {
            pathname: '/api-docs/data-grid/grid-csv-export-options',
            title: 'GridCSVExportOptions',
          },
          {
            pathname: '/api-docs/data-grid/grid-print-export-options',
            title: 'GridPrintExportOptions',
          },
        ].map((page) => {
          return {
            ...page,
            linkProps: { linkAs: `${page.pathname.replace(/^\/api-docs/, '/api')}/` },
          };
        }),
      },
    ]
      .sort((a, b) =>
        a.pathname.replace('/api-docs/', '').localeCompare(b.pathname.replace('/api-docs/', '')),
      )
      .map((page) => {
        return {
          ...page,
          linkProps: { linkAs: `${page.pathname.replace(/^\/api-docs/, '/api')}/` },
        };
      }),
  },
  {
    pathname: '/system',
    icon: 'BuildIcon',
    children: [
      { pathname: '/system/basics' },
      { pathname: '/system/properties' },
      { pathname: '/system/the-sx-prop', title: 'The sx prop' },
      { pathname: '/system/borders' },
      { pathname: '/system/display' },
      { pathname: '/system/flexbox' },
      { pathname: '/system/grid' },
      { pathname: '/system/palette' },
      { pathname: '/system/positions' },
      { pathname: '/system/shadows' },
      { pathname: '/system/sizing' },
      { pathname: '/system/spacing' },
      { pathname: '/system/screen-readers' },
      { pathname: '/system/typography' },
      { pathname: '/system/advanced' },
      { pathname: '/system/box' },
      { pathname: '/system/styled', title: 'styled' },
    ],
  },
  {
    pathname: '/customization',
    icon: 'CreateIcon',
    children: [
      {
        pathname: '/customization',
        subheader: '/customization/theme',
        children: [
          { pathname: '/customization/theming' },
          { pathname: '/customization/palette' },
          { pathname: '/customization/dark-mode', title: 'Dark mode' },
          { pathname: '/customization/typography' },
          { pathname: '/customization/spacing' },
          { pathname: '/customization/breakpoints' },
          { pathname: '/customization/density' },
          { pathname: '/customization/z-index', title: 'z-index' },
          { pathname: '/customization/transitions' },
          { pathname: '/customization/theme-components', title: 'Components' },
          { pathname: '/customization/default-theme', title: 'Default Theme' },
        ],
      },
      { pathname: '/customization/how-to-customize' },
      { pathname: '/customization/color' },
      { pathname: '/customization/unstyled-components' },
    ],
  },
  {
    pathname: '/guides',
    title: 'How To Guides',
    icon: 'VisibilityIcon',
    children: [
      { pathname: '/guides/api', title: 'API Design Approach' },
      { pathname: '/guides/classname-generator', title: 'ClassName Generator' },
      { pathname: '/guides/understand-mui-packages', title: 'Understand MUI packages' },
      { pathname: '/guides/typescript', title: 'TypeScript' },
      { pathname: '/guides/interoperability', title: 'Style Library Interoperability' },
      { pathname: '/guides/styled-engine' },
      { pathname: '/guides/minimizing-bundle-size' },
      { pathname: '/guides/composition' },
      { pathname: '/guides/routing' },
      { pathname: '/guides/server-rendering' },
      { pathname: '/guides/responsive-ui', title: 'Responsive UI' },
      { pathname: '/guides/pickers-migration', title: 'Migration from @material-ui/pickers' },
      { pathname: '/guides/migration-v4', title: 'Migration From v4' },
      { pathname: '/guides/migration-v3', title: 'Migration From v3' },
      { pathname: '/guides/migration-v0x', title: 'Migration From v0.x' },
      { pathname: '/guides/testing' },
      { pathname: '/guides/localization' },
      { pathname: '/guides/content-security-policy', title: 'Content Security Policy' },
      { pathname: '/guides/right-to-left', title: 'Right-to-left' },
      { pathname: '/guides/flow' },
    ],
  },
  {
    pathname: '/styles',
    title: 'Styles (legacy)',
    icon: 'StyleIcon',
    children: [
      { pathname: '/styles/basics' },
      { pathname: '/styles/advanced' },
      { pathname: '/styles/api', title: 'API' },
    ],
  },
  {
    pathname: '/discover-more',
    icon: 'AddIcon',
    children: [
      { pathname: '/discover-more/showcase' },
      { pathname: '/discover-more/related-projects' },
      { pathname: '/discover-more/roadmap' },
      { pathname: '/discover-more/backers', title: 'Sponsors & Backers' },
      { pathname: '/discover-more/vision' },
      { pathname: '/discover-more/changelog' },
      { pathname: '/discover-more/languages' },
      { pathname: '/about', title: 'About us' },
    ],
  },
  {
    pathname: 'https://material-ui.com/store/',
    title: 'Templates',
    icon: 'ReaderIcon',
    linkProps: {
      'data-ga-event-category': 'store',
      'data-ga-event-action': 'click',
      'data-ga-event-label': 'sidenav',
    },
  },
  { pathname: '/versions', ordered: false },
  { pathname: '/', ordered: false, disableDrawer: true },
  { pathname: 'https://medium.com/material-ui', title: 'Blog', icon: 'BookIcon' },
];

export default pages;
