import * as React from 'react';
import createShallow from './createShallow';

const shallow = createShallow();

// Helper function to extract the classes from a styleSheet.
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
