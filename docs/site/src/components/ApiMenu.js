// @flow weak

import React, { PropTypes } from 'react';
import { camelCase, kebabCase } from 'docs/site/src/utils/helpers';
import ApiIconMenu from './ApiIconMenu';

const ApiMenu = (props) => {

  const componentRegexp = /---\n(.*)\n---/;

  const currentRoute = props.routes[props.routes.length -1];
  const path = currentRoute.path.split('/');

  const components = currentRoute.content.match(componentRegexp);

  // Return if we're on the home page.
  if (path.length < 3) {
    return null;
  }

  // component is the last part of the path
  const component = path[path.length - 1];

  const menuItems = components ? components[1].split(', ') : [];
  console.log('menuItems: ', menuItems);

  return (
    menuItems.length >= 1 &&
    // Only show the menu on an api page if there's more than one entry
    (path[1] !== 'component-api' || menuItems.length > 1) &&
    <ApiIconMenu menuItems={menuItems} selectedItem={component} {...props} />
  );
};

export default ApiMenu;
