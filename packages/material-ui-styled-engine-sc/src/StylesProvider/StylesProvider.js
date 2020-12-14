import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';

let injectFirstNode;

export function StylesProvider(props) {
  const { injectFirst, children } = props;

  React.useEffect(() => {
    if (injectFirst && !injectFirstNode) {
      const head = document.head;
      injectFirstNode = document.createElement('style');
      injectFirstNode.setAttribute('data-styled', 'active');
      head.insertBefore(injectFirstNode, head.firstChild);
    }

    return () => {
      const head = document.head;
      head.removeChild(injectFirstNode);
      injectFirstNode = null;
    };
  }, [injectFirst]);

  return injectFirst ? (
    <StyleSheetManager target={injectFirstNode}>{children}</StyleSheetManager>
  ) : (
    children
  );
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
