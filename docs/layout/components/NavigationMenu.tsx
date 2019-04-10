import React from 'react';
import NavItem from './NavItem';
import { List } from '@material-ui/core';

const navItems = [
  {
    title: 'Getting Started',
    children: [
      { title: 'Installation', href: '/getting-started/installation' },
      { title: 'Usage', href: '/getting-started/usage' },
      { title: 'Parsing dates', href: '/getting-started/parsing' },
    ],
  },
  {
    title: 'Localization',
    children: [
      { title: 'Using date-fns', href: '/localization/date-fns' },
      { title: 'Using moment', href: '/localization/moment' },
      { title: 'Persian Calendar System', href: '/localization/persian' },
    ],
  },
  {
    title: 'Components',
    children: [
      { title: 'Date Picker', href: '/api/datepicker' },
      { title: 'Time Picker', href: '/api/timepicker' },
      { title: 'Date & Time Picker', href: '/api/datetime-picker' },
    ],
  },
  {
    title: 'Guides',
    children: [
      { title: 'Form integration', href: '/guides/form-integration' },
      { title: 'CSS overrides', href: '/guides/css-overrides' },
      { title: 'Global format customization', href: '/guides/formats' },
      {
        title: 'Open pickers programmatically',
        href: '/guides/controlling-programmatically',
      },
      { title: 'Static picker`s components', href: '/guides/static-components' },
      { title: 'Updating to v3', href: '/guides/upgrading-to-v3' },
    ],
  },
];

class NavigationMenu extends React.Component<any> {
  mapNavigation(depth: number) {
    return ({ title, children, href }: any) => {
      const open =
        children && children.length > 0 ? children.some((item: any) => item.href === true) : false;

      return (
        <NavItem key={href || title} title={title} depth={depth} href={href} open={open}>
          {children && children.length > 0 && children.map(this.mapNavigation(depth + 1))}
        </NavItem>
      );
    };
  }

  render() {
    return <List component="nav">{navItems.map(this.mapNavigation(0))}</List>;
  }
}

export default NavigationMenu;
