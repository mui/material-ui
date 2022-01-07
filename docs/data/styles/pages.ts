const pages = [
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
];

export default pages;
