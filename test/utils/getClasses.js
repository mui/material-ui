import * as React from 'react';
import createShallow from './createShallow';

const shallow = createShallow();

/**
 * Extracts the available classes for the `classes` prop of the given component
 * @param {React.ReactElement} element - An element created from a Material-UI component that implements the `classes` prop.
 * @returns {Record<string, string>}
 */
export default function getClasses(element) {
  const { useStyles } = element.type;

  let classes;
  function Listener() {
    classes = useStyles(element.props);
    return null;
  }
  shallow(<Listener />);

  return classes;
}
