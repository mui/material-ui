// @inheritedComponent GridList

import React from 'react';
import warning from 'warning';
import ImageList from '../ImageList';

/**
 * Deprecated, use ImageList instead.
 */
export default function GridList(props) {
  warning(
    false,
    [
      'Material-UI: the GridList component is deprecated.',
      'The component was renamed to ImageList.',
    ].join('\n'),
  );
  return <ImageList {...props} />;
}
