/* eslint-disable func-names */

import reactDOM from 'react-dom';
import Portal from '../../src/Portal';

const portalOrigin = {};

const mockPortal = {
  init: () => {
    portalOrigin.render = Portal.prototype.render;
    Portal.prototype.render = function() {
      return this.props.children;
    };

    portalOrigin.getMountNode = Portal.prototype.getMountNode;
    Portal.prototype.getMountNode = function() {
      return reactDOM.findDOMNode(this);
    };
  },
  reset: () => {
    if (portalOrigin.render) {
      Portal.prototype.render = portalOrigin.render;
    }

    if (portalOrigin.getMountNode) {
      Portal.prototype.getMountNode = portalOrigin.getMountNode;
    }
  },
};

export default mockPortal;
