const pages = [
  {
    pathname: '/joy-ui/getting-started',
    icon: 'DescriptionIcon',
    children: [
      { pathname: '/joy-ui/getting-started/quick-start' },
      { pathname: '/joy-ui/getting-started/tutorial' },
    ],
  },
  {
    pathname: '/joy-ui/react-',
    title: 'Components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/joy-ui/components/inputs',
        subheader: 'inputs',
        children: [{ pathname: '/joy-ui/react-button' }],
      },
    ],
  },
];

export default pages;
