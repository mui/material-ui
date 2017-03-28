// @flow weak

import React, { PropTypes } from 'react';
import ApiMenuComponents from 'docs/src/components/ApiMenuComponents';
import { demoComponentsTree } from 'docs/src/components/files';

function ApiMenu(props) {
  const currentRoute = props.routes[props.routes.length - 1];

  if (!currentRoute.demo) {
    return null;
  }

  const item = demoComponentsTree.find((item2) => item2.demo.name === currentRoute.demo.name);

  if (!item) {
    return null;
  }

  return <ApiMenuComponents components={item.components} />;
}

ApiMenu.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default ApiMenu;
