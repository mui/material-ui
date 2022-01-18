const pages = [
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
    pathname: '/system/styles',
    title: 'Styles (legacy)',
    icon: 'StyleIcon',
    children: [
      { pathname: '/system/styles/basics' },
      { pathname: '/system/styles/advanced' },
      { pathname: '/system/styles/api', title: 'API' },
    ],
  },
];

export default pages;
