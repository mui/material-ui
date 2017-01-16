// @flow weak

import React, { PropTypes } from 'react';
import { camelCase, kebabCase } from 'docs/site/src/utils/helpers';
import ApiIconMenu from './ApiIconMenu';
import { apiMenus, componentMap } from './apiMenuData.js';

const ApiMenu = (props, context) => {
  const path = window.location.hash.split('/');

  // Return if we're on the home page.
  if (path.length < 3) {
    return null;
  }

  // component is the last part of the path
  const component = path[path.length - 1];
  let baseComponent;

  // Check if the component is in the exceptions map
  if (componentMap[component]) {
    baseComponent = componentMap[component];
  } else {
    // Otherwise extract and pluralise the base component
    baseComponent = `${(component.split('-'))[0]}s`;
  }

  let menuItems;

  if (apiMenus[baseComponent]) {
    menuItems = apiMenus[baseComponent];
  } else {
    const baseComponentName = camelCase(baseComponent.slice(0, -1));
    menuItems = context.apiDocs
      .filter((entry) => (entry.name.substr(0, baseComponentName.length) === baseComponentName))
      .map((item) => (kebabCase(item.name)));
  }

  return (
    menuItems &&
    // Only show the menu on an api page if there's more than one entry
    (path[1] !== 'component-api' || menuItems.length > 1) &&
    <ApiIconMenu menuItems={menuItems} {...props} />
  );
};

ApiMenu.contextTypes = {
  apiDocs: PropTypes.array.isRequired,
  demos: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
};

export default ApiMenu;
