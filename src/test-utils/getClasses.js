// @flow

import * as ns from 'react-jss/lib/ns';
import { SheetsRegistry } from 'jss';
import createShallow from './createShallow';
import { sheetsManager } from '../styles/withStyles';

const shallow = createShallow();

// Helper function to extract the classes from a styleSheet.
export default function getClasses(element: Object, options: Object = {}) {
  const sheetsRegistry = new SheetsRegistry();

  sheetsManager.clear();
  shallow(element, {
    ...options,
    context: {
      [ns.sheetsRegistry]: sheetsRegistry,
      ...options.context,
    },
  });

  return sheetsRegistry.registry[0].classes;
}
