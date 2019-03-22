// @inheritedComponent GridListTile

import React from 'react';
import warning from 'warning';
import ImageListTile from '../ImageListTile';

/**
 * Deprecated, use ImageListTile instead.
 */
export default function GridListTile(props) {
  warning(
    false,
    [
      'Material-UI: the GridListTile component is deprecated.',
      'The component was renamed to ImageListTile.',
    ].join('\n'),
  );
  return <ImageListTile {...props} />;
}
