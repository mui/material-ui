import React from 'react';
import NavItem from './NavItem';
import { withRouter } from 'next/router';
import { List } from '@material-ui/core';
import { navItems } from './navigationMap';
import { stringToTestId } from 'utils/helpers';

class NavigationMenu extends React.Component<any> {
  mapNavigation(depth: number) {
    return ({ title, children, href, as }: any) => {
      const { asPath } = this.props.router;
      const hasChildren = children && children.length > 0;
      const open = hasChildren
        ? children.some((item: any) => item.href === asPath || item.as === asPath)
        : false;

      return (
        <NavItem
          as={as}
          href={href}
          open={open}
          depth={depth}
          title={title}
          key={href || title}
          data-nav={stringToTestId(title)}
        >
          {children && children.length > 0 && children.map(this.mapNavigation(depth + 1))}
        </NavItem>
      );
    };
  }

  render() {
    return <List component="nav">{navItems.map(this.mapNavigation(0))}</List>;
  }
}

export default withRouter(NavigationMenu);
