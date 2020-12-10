import * as React from 'react';
import PropTypes from 'prop-types';

let injectFirstNode;

export function StylesProvider({ injectFirst, children }) {

  React.useEffect(() => {
    if (injectFirst && !injectFirstNode) {
      const head = document.head;
      injectFirstNode = document.createElement('style');
      injectFirstNode.setAttribute('data-styled', 'active');
      injectFirstNode.setAttribute('data-styled-version', "5.2.1")
      head.insertBefore(injectFirstNode, head.firstChild);
    }
  
  }, [injectFirst]);

  return children;
}

StylesProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * By default, the styles are injected last in the <head> element of the page.
   * As a result, they gain more specificity than any other style sheet.
   * If you want to override Material-UI's styles, set this prop.
   */
  injectFirst: PropTypes.bool,
};

export default StylesProvider;
