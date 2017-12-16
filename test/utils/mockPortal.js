/* eslint-disable func-names */

import reactDOM from 'react-dom';
import Portal from '../../src/internal/Portal';

const portalOrigin = {};

const mockPortal = {
  init: () => {
    portalOrigin.render = Portal.prototype.render;
    Portal.prototype.render = function() {
      return this.props.children;
    };

    portalOrigin.getLayer = Portal.prototype.getLayer;
    Portal.prototype.getLayer = function() {
      return reactDOM.findDOMNode(this);
    };
  },
  reset: () => {
    if (portalOrigin.render) {
      Portal.prototype.render = portalOrigin.render;
    }

    if (portalOrigin.getLayer) {
      Portal.prototype.getLayer = portalOrigin.getLayer;
    }
  },
};

export default mockPortal;
