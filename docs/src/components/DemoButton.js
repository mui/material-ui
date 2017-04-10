// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutlineIcon from 'material-ui-icons/PlayCircleOutline';
import { kebabCase } from 'docs/src/utils/helpers';
import { demoComponentsTree } from 'docs/src/components/files';

function DemoButton(props) {
  const currentRoute = props.routes[props.routes.length - 1];

  if (!currentRoute.componentAPI) {
    return null;
  }

  const item = demoComponentsTree.find((item2) => {
    return item2.components.find((component) => component === currentRoute.componentAPI.name);
  });

  if (!item) {
    return null;
  }

  return (
    <IconButton
      contrast
      component={Link}
      to={`/component-demos/${kebabCase(item.demo.name)}`}
    >
      <PlayCircleOutlineIcon />
    </IconButton>
  );
}

DemoButton.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default DemoButton;
