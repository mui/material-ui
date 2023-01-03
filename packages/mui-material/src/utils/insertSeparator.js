import * as React from 'react';

/**
 * It takes a React element and an array of React elements, and returns a new array of React elements
 * with the separator element inserted between each of the original elements
 * @param children - The children to add separators to.
 * @param separator - The separator component to be used.
 */
export default function insertSeparator(children, separator) {
  const childrens = React.Children.toArray(children).filter(Boolean);

  return childrens.reduce((output, child, index) => {
    output.push(child);
    if (index < childrens.length - 1) {
      output.push(React.cloneElement(separator, { key: `separator-${index}` }));
    }
    return output;
  }, []);
}
