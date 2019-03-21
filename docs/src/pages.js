import findPages from /* preval */ 'docs/src/modules/utils/findPages';

const pages = [
  {
    pathname: '/getting-started',
    children: [
      {
        pathname: '/getting-started/installation',
      },
      {
        pathname: '/getting-started/usage',
      },
      {
        pathname: '/getting-started/example-projects',
      },
      {
        pathname: '/getting-started/page-layout-examples',
      },
      {
        pathname: '/getting-started/learn',
      },
      {
        pathname: '/getting-started/faq',
        title: 'Frequently Asked Questions',
      },
      {
        pathname: '/getting-started/supported-components',
      },
      {
        pathname: '/getting-started/supported-platforms',
      },
    ],
  },
  {
    pathname: '/style',
    title: 'Content',
    children: [
      {
        pathname: '/style/icons',
      },
      {
        pathname: '/style/color',
      },
      {
        pathname: '/style/typography',
      },
      {
        pathname: '/style/links',
      },
      {
        pathname: '/style/css-baseline',
        title: 'CSS Baseline',
      },
    ],
  },
  {
    pathname: '/layout',
    children: [
      {
        pathname: '/layout/basics',
      },
      {
        pathname: '/layout/grid',
      },
      {
        pathname: '/layout/breakpoints',
      },
      {
        pathname: '/layout/use-media-query',
        title: 'useMediaQuery',
      },
      {
        pathname: '/layout/hidden',
      },
    ],
  },
  {
    pathname: '/utils',
    children: [
      {
        pathname: '/utils/modal',
      },
      {
        pathname: '/utils/transitions',
      },
      {
        pathname: '/utils/popover',
      },
      {
        pathname: '/utils/popper',
      },
      {
        pathname: '/utils/portal',
      },
      {
        pathname: '/utils/no-ssr',
        title: 'No SSR',
      },
      {
        pathname: '/utils/click-away-listener',
      },
      {
        pathname: '/utils/box',
        title: 'Box',
      },
    ],
  },
  {
    ...findPages[1],
    title: 'Component Demos',
  },
  {
    ...findPages[0],
    title: 'Component API',
  },
  {
    pathname: '/css-in-js',
    title: 'Styles',
    children: [
      {
        pathname: '/css-in-js/basics',
      },
      {
        pathname: '/css-in-js/advanced',
      },
      {
        pathname: '/css-in-js/api',
        title: 'API',
      },
    ],
  },
  {
    pathname: '/system',
    children: [
      {
        pathname: '/system/basics',
      },
      {
        pathname: '/system/borders',
      },
      {
        pathname: '/system/display',
      },
      {
        pathname: '/system/flexbox',
      },
      {
        pathname: '/system/palette',
      },
      {
        pathname: '/system/positions',
      },
      {
        pathname: '/system/shadows',
      },
      {
        pathname: '/system/sizing',
      },
      {
        pathname: '/system/spacing',
      },
      {
        pathname: '/system/typography',
      },
      {
        pathname: '/system/api',
        title: 'API',
      },
    ],
  },
  {
    pathname: '/customization',
    children: [
      {
        pathname: '/customization/themes',
      },
      {
        pathname: '/customization/overrides',
      },
      {
        pathname: '/customization/default-theme',
        title: 'Default Theme',
      },
    ],
  },
  {
    pathname: '/guides',
    children: [
      {
        pathname: '/guides/api',
        title: 'API Design Approach',
      },
      {
        pathname: '/guides/typescript',
        title: 'TypeScript',
      },
      {
        pathname: '/guides/interoperability',
        title: 'Style Library Interoperability',
      },
      {
        pathname: '/guides/minimizing-bundle-size',
      },
      {
        pathname: '/guides/composition',
      },
      {
        pathname: '/guides/server-rendering',
      },
      {
        pathname: '/guides/migration-v3',
        title: 'Migration From v3',
      },
      {
        pathname: '/guides/migration-v0x',
        title: 'Migration From v0.x',
      },
      {
        pathname: '/guides/testing',
      },
      {
        pathname: '/guides/right-to-left',
        title: 'Right-to-left',
      },
      {
        pathname: '/guides/flow',
      },
    ],
  },
  {
    pathname: '/premium-themes',
  },
  {
    pathname: '/lab',
    children: [
      {
        pathname: '/lab/about',
        title: 'About The Lab',
      },
      {
        pathname: '/lab/slider',
      },
      {
        pathname: '/lab/speed-dial',
      },
      {
        pathname: '/lab/toggle-button',
      },
      {
        pathname: '/lab/layout',
      },
      {
        ...findPages[2].children[1],
        title: 'API',
      },
    ],
  },
  {
    pathname: '/discover-more',
    children: [
      {
        pathname: '/discover-more/showcase',
      },
      {
        pathname: '/discover-more/related-projects',
      },
      {
        pathname: '/discover-more/roadmap',
      },
      {
        pathname: '/discover-more/backers',
        title: 'Sponsors & Backers',
      },
      {
        pathname: '/discover-more/vision',
      },
      {
        pathname: '/discover-more/team',
      },
      {
        pathname: '/discover-more/community',
      },
      {
        pathname: '/discover-more/changelog',
      },
      {
        pathname: '/discover-more/languages',
      },
      {
        pathname: '/discover-more/governance',
      },
    ],
  },
  {
    pathname: '/versions',
    displayNav: false,
  },
  {
    pathname: '/',
    displayNav: false,
    title: false,
  },
];

export default pages;
