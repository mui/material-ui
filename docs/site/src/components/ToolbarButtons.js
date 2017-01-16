// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutlineIcon from 'material-ui/svg-icons/play-circle-outline';
import { camelCase, kebabCase } from 'docs/site/src/utils/helpers';
import ApiMenu from './ApiMenu';
import { apiMenus, componentMap, demoPaths } from './apiMenuData.js';

const ToolbarButtons = (props, context) => {
  const styleSheet = createStyleSheet('ToolbarButtons', () => (
    {
      container: {
        display: 'flex',
      },
      icon: {
        marginLeft: -12,
      },
    }
  ));

  const handleDemoButtonClick = (component) => {
    // If the component has a non-standard demo path, use it
    if (demoPaths[component]) {
      context.router.push(`${demoPaths[component]}`);
    } else {
      context.router.push(`component-demos/${component}`);
    }
  };

  let hasDemo = false;
  const path = window.location.hash.split('/');

  if (path.length < 3) {
    return null;
  }

  // component is the last part of the path
  let baseComponent = path[path.length - 1];

  // If we're on an api page
  if (path[1] === 'component-api') {
    // Check if the component is in the exceptions map
    if (componentMap[baseComponent]) {
      baseComponent = componentMap[baseComponent];
    } else {
      // Otherwise extract and pluralise the base component
      baseComponent = `${(baseComponent.split('-'))[0]}s`;
    }

    // Is the component in the list of demos?
    hasDemo = context.demos.some((demo) => demo.name === baseComponent) ||
      !!componentMap[baseComponent];
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

  const classes = context.styleManager.render(styleSheet);

  const demoButton = hasDemo &&
    <IconButton
      contrast
      onClick={() => handleDemoButtonClick(baseComponent)}
      className={classes.icon}
    >
      <PlayCircleOutlineIcon />
    </IconButton>;

  const apiMenu = menuItems &&
    // Only show the menu on an api page if there's more than one entry
    (path[1] !== 'component-api' || menuItems.length > 1) &&
    <ApiMenu menuItems={menuItems} className={classes.icon} />;


  return (
    <div className={classes.container}>
      {demoButton}
      {apiMenu}
    </div>
  );
};

ToolbarButtons.contextTypes = {
  apiDocs: PropTypes.array.isRequired,
  demos: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
  styleManager: PropTypes.object.isRequired,
};

export default ToolbarButtons;
