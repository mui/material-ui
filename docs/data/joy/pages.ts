const pages: Array<any> = [
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
