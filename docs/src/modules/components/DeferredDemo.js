import * as React from 'react';
import PropTypes from 'prop-types';
import { useRunner } from 'react-runner';

/**
 * Removes leading spaces (indentation) present in the `.tsx` previews
 * to be able to replace the existing code with the incoming dynamic code
 * @param {string} input
 */
function trimLeadingSpaces(input = '') {
  return input.replace(/^\s+/gm, '');
}

function DeferredDemo({ usePreview, code, raw, jsxPreview, scope, onError }) {
  const { element, error } = useRunner({
    code: usePreview ? trimLeadingSpaces(raw).replace(trimLeadingSpaces(jsxPreview), code) : code,
    scope,
  });

  React.useEffect(() => {
    onError(error);
  }, [error, onError]);

  return element;
}

DeferredDemo.PropTypes = {
  code: PropTypes.string.isRequired,
  jsxPreview: PropTypes.string.isRequired,
  raw: PropTypes.string.isRequired,
  scope: PropTypes.object.isRequired,
  onError: PropTypes.func.isRequired,
  usePreview: PropTypes.bool.isRequired,
};

export default DeferredDemo;
