// @flow weak

import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutlineIcon from 'material-ui/svg-icons/play-circle-outline';
import { componentMap, demoPaths } from './apiMenuData.js';

const DemoButton = (props, context) => {
  const { router, demos } = context;

  const handleDemoButtonClick = (component) => {
    // If the component has a non-standard demo path, use it
    if (demoPaths[component]) {
      router.push(`${demoPaths[component]}`);
    } else {
      router.push(`component-demos/${component}`);
    }
  };

  let hasDemo = false;
  const path = window.location.hash.split('/');

  // Return if we're on the home page.
  if (path.length < 3) {
    return null;
  }

  let baseComponent;

  // If we're on an api page
  if (path[1] === 'component-api') {
    // component is the last part of the path
    const component = path[path.length - 1];
    // Check if the component is in the exceptions map
    if (componentMap[component]) {
      baseComponent = componentMap[component];
    } else {
      // Otherwise extract and pluralise the base component
      baseComponent = `${(component.split('-'))[0]}s`;
    }

    // Is the component in the list of demos?
    hasDemo = demos.some((demo) => demo.name === baseComponent) ||
      !!componentMap[baseComponent];
  }

  return (
  hasDemo &&
  <IconButton
    contrast
    onClick={() => handleDemoButtonClick(baseComponent)}
  >
    <PlayCircleOutlineIcon />
  </IconButton>
  );
};

DemoButton.contextTypes = {
  demos: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
  styleManager: PropTypes.object.isRequired,
};

export default DemoButton;
