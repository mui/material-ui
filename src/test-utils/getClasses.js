import PropTypes from 'prop-types';
import * as ns from 'react-jss/lib/ns';
import { SheetsRegistry } from 'jss';
import createMount from './createMount';
import { sheetsManager } from '../styles/Styled';

const mount = createMount();

// Helper function to extract the classes from a styleSheet.
export default function getClasses(element, options = {}) {
  const sheetsRegistry = new SheetsRegistry();

  sheetsManager.clear();
  mount(element, {
    ...options,
    context: {
      [ns.sheetsRegistry]: sheetsRegistry,
      ...options.context,
    },
    childContextTypes: {
      [ns.sheetsRegistry]: PropTypes.object.isRequired,
    },
  });

  return sheetsRegistry.registry[0].classes;
}
